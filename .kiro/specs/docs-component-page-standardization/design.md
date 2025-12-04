# Design Document

## Overview

This design document outlines the architecture and implementation strategy for analyzing and standardizing all component documentation pages in the GhostUI Docs application. The system will consist of three main components:

1. **Documentation Audit Tool** - Scans all component pages and identifies inconsistencies
2. **Standardization Report Generator** - Creates detailed reports with categorized issues and recommendations
3. **Documentation Fixer** - Applies automated fixes to bring pages into compliance with the style guide

The solution will be implemented as a Node.js script that can be run manually or integrated into CI/CD pipelines to ensure ongoing documentation quality.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Documentation System                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   File       │      │   Audit      │      │  Report   │ │
│  │   Scanner    │─────▶│   Engine     │─────▶│ Generator │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                     │       │
│         │                      │                     │       │
│         ▼                      ▼                     ▼       │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   TSX        │      │  Validation  │      │   JSON    │ │
│  │   Parser     │      │   Rules      │      │  Report   │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Component Interaction Flow

```
1. File Scanner discovers all component pages
2. TSX Parser extracts AST and component structure
3. Audit Engine applies validation rules
4. Report Generator creates categorized issue list
5. Documentation Fixer applies automated corrections
```

## Components and Interfaces

### 1. File Scanner

**Purpose**: Discovers and reads all component documentation pages

**Interface**:
```typescript
interface FileScanner {
  scanComponentPages(): Promise<ComponentPage[]>;
  readPageContent(filePath: string): Promise<string>;
}

interface ComponentPage {
  filePath: string;
  componentName: string;
  content: string;
}
```

**Responsibilities**:
- Scan `apps/docs/app/docs/components/*/page.tsx` directory
- Read file contents
- Extract component name from path
- Return list of pages for analysis

### 2. TSX Parser

**Purpose**: Parses TSX files and extracts structural information

**Interface**:
```typescript
interface TSXParser {
  parse(content: string): ParsedPage;
  extractElements(ast: any, selector: string): Element[];
}

interface ParsedPage {
  ast: any;
  headers: Header[];
  sections: Section[];
  componentPlaygrounds: ComponentPlayground[];
  propsTables: PropsTable[];
  codeBlocks: CodeBlock[];
}

interface Header {
  level: number; // 1, 2, 3, etc.
  text: string;
  className: string;
  lineNumber: number;
}

interface Section {
  type: string; // 'header', 'basic-usage', 'variants', etc.
  startLine: number;
  endLine: number;
  elements: Element[];
}

interface Element {
  type: string;
  className: string;
  lineNumber: number;
  props?: Record<string, any>;
}
```

**Responsibilities**:
- Parse TSX content into AST
- Extract headers (H1, H2, H3) with their classes
- Identify sections and their structure
- Find ComponentPlayground instances
- Locate PropsTable components
- Extract code blocks and inline code

### 3. Validation Rules Engine

**Purpose**: Defines and applies validation rules based on the style guide

**Interface**:
```typescript
interface ValidationRule {
  id: string;
  category: 'typography' | 'spacing' | 'structure' | 'api' | 'examples';
  description: string;
  validate(page: ParsedPage): ValidationIssue[];
}

interface ValidationIssue {
  ruleId: string;
  category: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  filePath: string;
  lineNumber?: number;
  currentValue?: string;
  expectedValue: string;
  recommendation: string;
  autoFixable: boolean;
}
```

**Validation Rules**:

1. **Typography Rules**
   - H1 must use: `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
   - H2 must use: `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
   - H3 must use: `text-xl md:text-2xl font-semibold text-ghost-white`
   - Lead paragraph must use: `lead text-ghost-white/90`
   - Inline code must use: `px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs`

2. **Spacing Rules**
   - Root container must have: `space-y-12`
   - Section containers must have: `space-y-6 mt-12`
   - Header-content groups must have: `space-y-4`
   - Preview containers must have: `py-12` or `p-8`

3. **Structure Rules**
   - Page must start with H1 + lead paragraph
   - Must have at least 3 ComponentPlayground instances
   - First ComponentPlayground must have preview, code, and api props
   - Must include PropsTable component
   - Sections should follow standard order

4. **API Documentation Rules**
   - PropsTable must be present
   - Props array must have name, type, default, description fields
   - Each prop must have non-empty description

5. **Preview Container Rules**
   - Must use consistent border: `border-ghost-orange/30`
   - Must use rounded corners: `rounded-lg`
   - Must use theme-aware backgrounds
   - Nested elements should use CSS variables for colors

### 4. Audit Engine

**Purpose**: Orchestrates the validation process

**Interface**:
```typescript
interface AuditEngine {
  audit(pages: ComponentPage[]): Promise<AuditResult>;
  applyRules(page: ParsedPage, rules: ValidationRule[]): ValidationIssue[];
}

interface AuditResult {
  totalPages: number;
  pagesWithIssues: number;
  totalIssues: number;
  issuesByCategory: Record<string, number>;
  issuesBySeverity: Record<string, number>;
  pageResults: PageAuditResult[];
}

interface PageAuditResult {
  filePath: string;
  componentName: string;
  issueCount: number;
  issues: ValidationIssue[];
  score: number; // 0-100 compliance score
}
```

**Responsibilities**:
- Apply all validation rules to each page
- Collect and categorize issues
- Calculate compliance scores
- Generate summary statistics

### 5. Report Generator

**Purpose**: Creates human-readable and machine-readable reports

**Interface**:
```typescript
interface ReportGenerator {
  generateReport(auditResult: AuditResult): Report;
  exportJSON(report: Report, outputPath: string): Promise<void>;
  exportMarkdown(report: Report, outputPath: string): Promise<void>;
  exportHTML(report: Report, outputPath: string): Promise<void>;
}

interface Report {
  timestamp: string;
  summary: ReportSummary;
  pageReports: PageReport[];
  recommendations: Recommendation[];
}

interface ReportSummary {
  totalPages: number;
  compliantPages: number;
  pagesWithIssues: number;
  totalIssues: number;
  autoFixableIssues: number;
  issuesByCategory: Record<string, number>;
  averageScore: number;
}

interface PageReport {
  componentName: string;
  filePath: string;
  score: number;
  issues: ValidationIssue[];
  status: 'compliant' | 'needs-review' | 'needs-fixes';
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  description: string;
  affectedPages: string[];
  estimatedEffort: string;
}
```

**Responsibilities**:
- Format audit results into readable reports
- Generate summary statistics
- Create prioritized recommendations
- Export in multiple formats (JSON, Markdown, HTML)

### 6. Documentation Fixer

**Purpose**: Applies automated fixes to component pages

**Interface**:
```typescript
interface DocumentationFixer {
  fix(page: ComponentPage, issues: ValidationIssue[]): Promise<FixResult>;
  applyFix(content: string, issue: ValidationIssue): string;
  validateFix(originalContent: string, fixedContent: string): boolean;
}

interface FixResult {
  filePath: string;
  fixedIssues: ValidationIssue[];
  unfixedIssues: ValidationIssue[];
  modifiedContent: string;
  success: boolean;
}
```

**Responsibilities**:
- Apply automated fixes for auto-fixable issues
- Preserve existing functionality
- Validate fixes don't break the page
- Generate modified file content
- Report which issues were fixed

## Data Models

### Style Guide Configuration

```typescript
interface StyleGuideConfig {
  typography: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    lead: string;
    body: string;
    inlineCode: string;
  };
  spacing: {
    pageContainer: string;
    sectionContainer: string;
    headerContent: string;
    list: string;
    previewContainer: string[];
  };
  colors: {
    accentColor: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
    backgroundColor: string;
  };
  structure: {
    requiredSections: string[];
    sectionOrder: string[];
    minimumExamples: number;
  };
}
```

### Validation Context

```typescript
interface ValidationContext {
  page: ParsedPage;
  filePath: string;
  componentName: string;
  styleGuide: StyleGuideConfig;
  issues: ValidationIssue[];
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: H1 Typography Consistency
*For any* component documentation page, the H1 element SHALL use the exact class string `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
**Validates: Requirements 1.1**

### Property 2: H2 Typography Consistency
*For any* component documentation page, all H2 elements SHALL use the exact class string `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
**Validates: Requirements 1.2**

### Property 3: H3 Typography Consistency
*For any* component documentation page, all H3 elements SHALL use the exact class string `text-xl md:text-2xl font-semibold text-ghost-white`
**Validates: Requirements 1.3**

### Property 4: Lead Paragraph Styling
*For any* component documentation page, the first paragraph following the H1 SHALL include the classes `lead` and `text-ghost-white/90`
**Validates: Requirements 1.5**

### Property 5: Page Container Spacing
*For any* component documentation page, the root container div SHALL include the class `space-y-12`
**Validates: Requirements 2.1**

### Property 6: Section Container Spacing
*For any* section element in a component documentation page, the section SHALL include the classes `space-y-6` and `mt-12`
**Validates: Requirements 2.2**

### Property 7: Header-Content Group Spacing
*For any* div wrapping a header and its immediate content, the div SHALL include the class `space-y-4`
**Validates: Requirements 2.3**

### Property 8: Preview Container Padding
*For any* preview container div, the div SHALL include either `py-12` or `p-8` class
**Validates: Requirements 2.5**

### Property 9: Minimum Example Count
*For any* component documentation page, the page SHALL contain at least 3 ComponentPlayground instances
**Validates: Requirements 3.1**

### Property 10: Basic Usage ComponentPlayground Structure
*For any* component documentation page, the first ComponentPlayground SHALL have preview, code, and api props defined
**Validates: Requirements 3.2**

### Property 11: PropsTable Presence
*For any* component documentation page, the page SHALL contain at least one PropsTable component
**Validates: Requirements 4.1**

### Property 12: Prop Object Structure
*For any* prop object in a props array, the object SHALL have name, type, default, and description fields
**Validates: Requirements 4.2**

### Property 13: Page Structure Order
*For any* component documentation page, the sections SHALL appear in the order: Header (H1 + lead), Basic Usage (ComponentPlayground), Additional sections
**Validates: Requirements 6.1**

### Property 14: Header Section Structure
*For any* component documentation page, the page SHALL start with an H1 element followed by a paragraph with the lead class
**Validates: Requirements 6.2**

### Property 15: First ComponentPlayground Position
*For any* component documentation page, the first ComponentPlayground SHALL appear before any H2 section headers
**Validates: Requirements 6.3**

### Property 16: Preview Container Border Styling
*For any* preview container div, the div SHALL include the class `border-ghost-orange/30`
**Validates: Requirements 9.2**

### Property 17: Preview Container Border Radius
*For any* preview container div, the div SHALL include the class `rounded-lg`
**Validates: Requirements 9.3**

### Property 18: Theme Variable Usage
*For any* nested element within a preview container, color styles SHALL use CSS variables in the format `var(--ghost-*)`
**Validates: Requirements 9.5**

### Property 19: Inline Code Styling
*For any* inline code element, the element SHALL include the classes `px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs`
**Validates: Requirements 10.1**

### Property 20: Code Block Scrolling
*For any* code block container, the container SHALL include the class `overflow-x-auto`
**Validates: Requirements 10.4**

### Property 21: Fix Preservation
*For any* automated fix applied to a page, the fixed page SHALL still render without errors
**Validates: Requirements 8.5**

## Error Handling

### File System Errors

- **File Not Found**: Log warning and skip the file, continue with other files
- **Permission Denied**: Log error with file path, suggest checking permissions
- **Invalid Path**: Validate paths before processing, provide clear error messages

### Parsing Errors

- **Invalid TSX Syntax**: Catch parsing errors, log file path and error details, mark page as unparseable
- **Missing Required Elements**: Log as validation issue rather than error
- **Malformed AST**: Handle gracefully, attempt partial analysis

### Validation Errors

- **Rule Execution Failure**: Log rule ID and error, continue with other rules
- **Unexpected Page Structure**: Mark as structural issue, provide recommendations
- **Missing Dependencies**: Check for required imports, suggest additions

### Fix Application Errors

- **Fix Conflicts**: Detect when multiple fixes affect the same line, apply in order or skip
- **Syntax Breaking Fixes**: Validate syntax after each fix, rollback if broken
- **File Write Errors**: Log error, preserve original file, suggest manual intervention

### Report Generation Errors

- **Template Errors**: Use fallback plain text format
- **Export Errors**: Try alternative formats, ensure at least JSON export succeeds
- **Missing Data**: Use default values, mark sections as incomplete

## Testing Strategy

### Unit Testing

The testing strategy will use **Vitest** as the testing framework, following the existing test patterns in the codebase.

**Unit Tests** will cover:

1. **File Scanner Tests**
   - Test discovering component pages in the correct directory
   - Test reading file contents correctly
   - Test extracting component names from paths
   - Test handling missing directories gracefully

2. **TSX Parser Tests**
   - Test parsing valid TSX files into AST
   - Test extracting headers with correct line numbers
   - Test identifying ComponentPlayground instances
   - Test finding PropsTable components
   - Test extracting class names from elements
   - Test handling malformed TSX gracefully

3. **Validation Rules Tests**
   - Test each validation rule independently
   - Test rule execution with valid pages (should pass)
   - Test rule execution with invalid pages (should fail with correct issues)
   - Test issue message generation
   - Test recommendation generation

4. **Audit Engine Tests**
   - Test applying multiple rules to a page
   - Test collecting and categorizing issues
   - Test calculating compliance scores
   - Test generating summary statistics

5. **Report Generator Tests**
   - Test JSON report generation
   - Test Markdown report generation
   - Test report summary calculations
   - Test recommendation prioritization

6. **Documentation Fixer Tests**
   - Test applying simple fixes (class name changes)
   - Test applying complex fixes (structural changes)
   - Test fix validation
   - Test rollback on syntax errors
   - Test preserving functionality after fixes

### Property-Based Testing

**Property-Based Tests** will verify universal properties using **fast-check** (JavaScript property testing library):

Each property-based test will run a minimum of 100 iterations to ensure thorough coverage.

1. **Property 1: H1 Typography Consistency**
   - Generate random valid component pages
   - Verify all H1 elements have the required classes
   - **Feature: docs-component-page-standardization, Property 1: H1 Typography Consistency**

2. **Property 2: H2 Typography Consistency**
   - Generate random valid component pages
   - Verify all H2 elements have the required classes
   - **Feature: docs-component-page-standardization, Property 2: H2 Typography Consistency**

3. **Property 5: Page Container Spacing**
   - Generate random valid component pages
   - Verify root container has space-y-12 class
   - **Feature: docs-component-page-standardization, Property 5: Page Container Spacing**

4. **Property 9: Minimum Example Count**
   - Generate random valid component pages
   - Verify at least 3 ComponentPlayground instances exist
   - **Feature: docs-component-page-standardization, Property 9: Minimum Example Count**

5. **Property 11: PropsTable Presence**
   - Generate random valid component pages
   - Verify at least one PropsTable component exists
   - **Feature: docs-component-page-standardization, Property 11: PropsTable Presence**

6. **Property 21: Fix Preservation**
   - Generate random component pages with issues
   - Apply automated fixes
   - Verify fixed pages still parse without errors
   - **Feature: docs-component-page-standardization, Property 21: Fix Preservation**

### Integration Testing

Integration tests will verify the complete workflow:

1. **End-to-End Audit Test**
   - Run audit on a test directory with known issues
   - Verify all expected issues are detected
   - Verify report is generated correctly

2. **End-to-End Fix Test**
   - Run fixer on pages with known issues
   - Verify issues are resolved
   - Verify pages still render correctly

3. **Report Export Test**
   - Generate reports in all formats
   - Verify files are created
   - Verify content is correct

### Test Data

Create test fixtures:
- **Valid pages**: Pages that fully comply with style guide
- **Invalid pages**: Pages with known violations for each rule
- **Edge cases**: Pages with unusual but valid structures
- **Broken pages**: Pages with syntax errors or missing elements

## Implementation Notes

### Technology Stack

- **Language**: TypeScript/Node.js
- **Parser**: @babel/parser for TSX parsing
- **AST Traversal**: @babel/traverse
- **File System**: Node.js fs/promises
- **Testing**: Vitest + fast-check
- **Report Generation**: Markdown-it for Markdown, custom HTML templates

### Performance Considerations

- **Parallel Processing**: Process multiple pages concurrently using Promise.all
- **Caching**: Cache parsed ASTs to avoid re-parsing
- **Incremental Analysis**: Support analyzing only changed files
- **Memory Management**: Stream large files, avoid loading all content in memory

### Extensibility

- **Plugin System**: Allow custom validation rules to be added
- **Configuration**: Support custom style guide configurations
- **Rule Priorities**: Allow rules to be enabled/disabled
- **Custom Fixers**: Support custom fix implementations

### CLI Interface

```bash
# Run audit on all pages
npm run docs:audit

# Run audit and generate report
npm run docs:audit --report

# Run audit and apply fixes
npm run docs:audit --fix

# Run audit on specific component
npm run docs:audit --component=gooey-button

# Generate report only (from previous audit)
npm run docs:report

# Export report in specific format
npm run docs:report --format=html
```

### Integration with CI/CD

- Add audit as a CI check
- Fail builds if compliance score is below threshold
- Generate reports as build artifacts
- Track compliance trends over time

## Migration Strategy

### Phase 1: Analysis (Week 1)
- Implement file scanner and TSX parser
- Implement validation rules
- Run initial audit on all pages
- Generate comprehensive report

### Phase 2: Manual Fixes (Week 2)
- Review audit report
- Prioritize high-impact issues
- Manually fix complex structural issues
- Document patterns and edge cases

### Phase 3: Automation (Week 3)
- Implement documentation fixer
- Test automated fixes on subset of pages
- Apply automated fixes to remaining pages
- Verify all pages still render correctly

### Phase 4: Validation (Week 4)
- Run final audit
- Verify 100% compliance
- Update style guide based on learnings
- Document maintenance procedures

## Future Enhancements

1. **Visual Regression Testing**: Capture screenshots before/after fixes
2. **Interactive Report**: Web-based report with filtering and sorting
3. **Real-time Validation**: VS Code extension for live validation
4. **Auto-fix on Save**: Automatically fix issues when saving files
5. **Compliance Dashboard**: Track compliance metrics over time
6. **AI-Powered Suggestions**: Use LLM to suggest content improvements
