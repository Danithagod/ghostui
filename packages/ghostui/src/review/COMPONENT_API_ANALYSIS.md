# Component API Consistency Analysis

This module provides automated analysis of component API consistency across the GhostUI library.

## Features

The `ComponentAPIAnalyzer` class provides five main analysis capabilities:

### 1. Prop Naming Consistency (Requirement 2.1)

Analyzes prop naming across similar components to identify inconsistencies.

**What it checks:**
- Groups components by type (toggles, inputs, modals, loaders, cards, backgrounds, effects)
- Compares prop names within each group
- Identifies inconsistent naming for similar concepts (e.g., `checked` vs `isChecked`, `onChange` vs `onToggle`)

**Example issues found:**
- Toggle components using different prop names for state (`checked` vs `isChecked`)
- Inconsistent change handler names (`onChange` vs `onToggle` vs `onValueChange`)

### 2. Event Handler Forwarding (Requirement 2.2)

Verifies that components properly forward user-provided event handlers.

**What it checks:**
- Identifies all event handler props (props starting with "on")
- Checks if handlers are called in the component code
- Reports handlers that are accepted but not forwarded

**Example issues found:**
- `BloodSmear` accepts `onComplete` but doesn't call it
- `ShadowCrawl` accepts `onComplete` but doesn't call it

### 3. Ref Forwarding (Requirement 2.3)

Checks if interactive components use `React.forwardRef` to expose DOM refs.

**What it checks:**
- Identifies components rendering interactive HTML elements (button, input, textarea, etc.)
- Verifies use of `React.forwardRef`
- Reports components missing ref forwarding

**Example issues found:**
- `BatToggle` renders a button but doesn't use forwardRef
- `GhostToast` has interactive elements but doesn't expose refs
- `GraveModal` should forward refs for focus management

### 4. ClassName Merging (Requirement 2.4)

Verifies that components properly merge user-provided className with internal classes.

**What it checks:**
- Identifies components accepting className prop
- Checks for use of `cn()` utility function
- Reports components not properly merging classNames

**Example issues found:**
- Several components accept className but don't use the `cn()` utility
- Some components don't pass className through to rendered elements

### 5. Controlled/Uncontrolled Support (Requirement 2.5)

Analyzes form-like components for dual mode support.

**What it checks:**
- Identifies form-like components (inputs, toggles, selects)
- Checks for both `value`/`defaultValue` or `checked`/`defaultChecked` support
- Reports components missing dual mode support

**Example issues found:**
- Some toggle components only support controlled mode
- Input components missing uncontrolled mode support

## Usage

```typescript
import { FileScanner } from './fileScanner';
import { ComponentAPIAnalyzer } from './componentAPIAnalyzer';
import { IssueCollector } from './issueCollector';

// Initialize
const fileScanner = new FileScanner();
const issueCollector = new IssueCollector();
const apiAnalyzer = new ComponentAPIAnalyzer(issueCollector);

// Scan components
const components = fileScanner.scanComponents();

// Run analyses
const namingIssues = apiAnalyzer.analyzePropNaming(components);
const handlerIssues = apiAnalyzer.verifyEventHandlerForwarding(components);
const refIssues = apiAnalyzer.checkRefForwarding(components);
const classNameIssues = apiAnalyzer.verifyClassNameMerging(components);
const controlledIssues = apiAnalyzer.analyzeControlledUncontrolledSupport(components);

// Collect all issues
const allIssues = [
  ...namingIssues,
  ...handlerIssues,
  ...refIssues,
  ...classNameIssues,
  ...controlledIssues,
];
```

## Running the Example

```bash
cd packages/ghostui
npx tsx src/review/example-api-analysis.ts
```

## Running Tests

```bash
cd packages/ghostui
npm test componentAPIAnalyzer.test.ts
```

## Current Results

As of the latest analysis:
- **Total issues found:** 17
- **High severity:** 8 (ref forwarding, event handler forwarding)
- **Medium severity:** 7 (className merging, controlled/uncontrolled support)
- **Low severity:** 2 (optional improvements)

## Issue Categories

All issues are categorized as "Component API Consistency" and reference specific requirements:
- **2.1**: Prop naming consistency
- **2.2**: Event handler forwarding
- **2.3**: Ref forwarding
- **2.4**: ClassName merging
- **2.5**: Controlled/uncontrolled support

## Next Steps

The issues identified by this analyzer should be:
1. Reviewed for accuracy
2. Prioritized based on severity and impact
3. Fixed systematically across the component library
4. Verified with the analyzer after fixes

This ensures consistent, predictable, and composable component APIs across the entire GhostUI library.
