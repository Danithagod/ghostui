# Documentation Analysis

This module provides comprehensive documentation analysis for the GhostUI component library, checking for JSDoc comments, complex prop documentation, documentation file existence, and export documentation.

## Overview

The `DocumentationAnalyzer` class implements four key correctness properties related to documentation quality:

- **Property 28**: JSDoc presence on exported components and functions
- **Property 29**: Complex prop documentation
- **Property 30**: Documentation file existence
- **Property 31**: Export documentation in index files

## Features

### 1. JSDoc Presence Check (Property 28)

**Validates**: Requirements 9.1

Checks that all exported components and functions have JSDoc comments describing their purpose and usage.

**What it checks**:
- Main component exports have JSDoc comments
- Exported helper functions have JSDoc comments
- JSDoc comments are properly formatted with `/** */` syntax

**Example issue**:
```
Title: Missing JSDoc for BatBurst
Severity: medium
Description: Component BatBurst does not have a JSDoc comment describing its purpose and usage.
Recommendation: Add a JSDoc comment above the component definition explaining what the component does, its main props, and usage examples.
```

### 2. Complex Prop Documentation (Property 29)

**Validates**: Requirements 9.2

Verifies that props with complex types (objects, arrays, unions with >2 options) have JSDoc comments explaining their usage.

**What it checks**:
- Props with object types have documentation
- Props with array types have documentation
- Props with union types (>2 options) have documentation
- Documentation explains what values are accepted

**Example issue**:
```
Title: Complex prop 'tabs' lacks documentation in SpectralTabs
Severity: medium
Description: The prop 'tabs' has a complex type (Array<TabItem>) but does not have a JSDoc comment explaining its usage.
Recommendation: Add a JSDoc comment above the prop definition in the interface explaining what values are accepted and how the prop affects the component behavior.
```

### 3. Documentation File Existence (Property 30)

**Validates**: Requirements 9.3

Checks that each component has a corresponding documentation page in the docs application.

**What it checks**:
- Documentation directory exists
- Each component has a page at `apps/docs/app/docs/components/{component-name}/page.tsx`
- Component names are properly converted to kebab-case for directory names

**Example issue**:
```
Title: Missing documentation page for BatBurst
Severity: medium
Description: Component BatBurst does not have a corresponding documentation page at apps/docs/app/docs/components/bat-burst/page.tsx.
Recommendation: Create a documentation page at apps/docs/app/docs/components/bat-burst/page.tsx with usage examples, props table, and interactive demos.
```

### 4. Export Documentation (Property 31)

**Validates**: Requirements 9.5

Verifies that direct exports from the main index file have JSDoc comments.

**What it checks**:
- Direct exports (not re-exports) have JSDoc comments
- Named exports have documentation
- Default exports have documentation

**Example issue**:
```
Title: Undocumented export 'cn' in index
Severity: low
Description: The export 'cn' in the main index file does not have a JSDoc comment.
Recommendation: Add a JSDoc comment above the export statement explaining what 'cn' is and when to use it.
```

## Usage

```typescript
import { DocumentationAnalyzer } from './documentationAnalyzer';
import { FileScanner } from './fileScanner';
import { IssueCollector } from './issueCollector';

// Initialize components
const issueCollector = new IssueCollector();
const fileScanner = new FileScanner();
const analyzer = new DocumentationAnalyzer(issueCollector);

// Scan for components
const components = fileScanner.scanComponents();
const indexPath = fileScanner.getIndexPath();

// Run analyses
const jsDocIssues = analyzer.checkJSDocPresence(components);
const complexPropIssues = analyzer.verifyComplexPropDocumentation(components);
const docFileIssues = analyzer.checkDocumentationFileExistence(components);
const exportDocIssues = analyzer.verifyExportDocumentation(indexPath);

// Process issues
const allIssues = [
  ...jsDocIssues,
  ...complexPropIssues,
  ...docFileIssues,
  ...exportDocIssues
];

console.log(`Found ${allIssues.length} documentation issues`);
```

## API Reference

### `checkJSDocPresence(components: ComponentFile[]): Issue[]`

Checks for JSDoc comments on exported components and functions.

**Parameters**:
- `components`: Array of component files to analyze

**Returns**: Array of issues for missing JSDoc comments

### `verifyComplexPropDocumentation(components: ComponentFile[]): Issue[]`

Verifies that complex props have documentation.

**Parameters**:
- `components`: Array of component files to analyze

**Returns**: Array of issues for undocumented complex props

### `checkDocumentationFileExistence(components: ComponentFile[]): Issue[]`

Checks that documentation pages exist for all components.

**Parameters**:
- `components`: Array of component files to check

**Returns**: Array of issues for missing documentation files

### `verifyExportDocumentation(indexPath: string): Issue[]`

Verifies that exports from the index file have documentation.

**Parameters**:
- `indexPath`: Path to the main index.ts file

**Returns**: Array of issues for undocumented exports

## Implementation Details

### JSDoc Detection

The analyzer uses regular expressions to detect JSDoc comments:

```typescript
/\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\s*export\s+(?:default\s+)?(?:const|function|class|interface|type)?\s+${exportName}\b/
```

This pattern matches:
- JSDoc comment block (`/** ... */`)
- Followed by whitespace
- Followed by export statement with the target name

### Complex Type Detection

A type is considered complex if it:
- Contains object syntax (`{`, `Record<`, `Map<`)
- Contains array syntax (`[]`, `Array<`)
- Is a union type with more than 2 options

### Path Normalization

The analyzer handles different working directory scenarios:
- Running from workspace root
- Running from packages/ghostui directory
- Properly converts PascalCase component names to kebab-case for documentation paths

## Testing

The module includes comprehensive unit tests covering:
- JSDoc presence detection
- Complex prop identification
- Documentation file existence checking
- Export documentation verification

Run tests with:
```bash
npm test documentationAnalyzer.test.ts
```

## Integration

The DocumentationAnalyzer integrates with the broader code review system:

1. **IssueCollector**: Creates standardized issue objects with severity, category, and recommendations
2. **FileScanner**: Provides component file information
3. **Review Report**: Documentation issues are included in the final review report under the "Documentation" category

## Future Enhancements

Potential improvements:
- Check for outdated JSDoc comments
- Verify JSDoc examples are valid
- Check for consistent JSDoc formatting
- Validate @param and @returns tags
- Check for broken links in documentation
