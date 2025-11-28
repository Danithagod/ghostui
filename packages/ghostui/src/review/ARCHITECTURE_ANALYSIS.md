# Architecture Analysis

This document describes the architecture analysis capabilities implemented for the GhostUI code review system.

## Overview

The `ArchitectureAnalyzer` evaluates component structure and complexity, ensuring components follow best practices for maintainability and proper side effect management.

## Implemented Checks

### 1. Component Complexity (Property 26)

**Validates Requirement 8.1**

Checks that components don't exceed complexity limits:
- **File Limit**: 300 lines of code (excluding comments and empty lines)
- **Function Limit**: 150 lines for the main component function

**Why This Matters:**
- Large files and functions are harder to understand and maintain
- Excessive complexity often indicates a component has too many responsibilities
- Breaking down complex components improves testability and reusability

**Example Issue:**
```
[MEDIUM] Excessive file complexity in ComplexComponent
Description: Component file ComplexComponent contains 350 lines of code, exceeding 
the recommended limit of 300 lines. This may indicate the component should be 
decomposed into smaller, more focused components.

Recommendation: Consider breaking this component into smaller, more focused 
components. Extract complex logic into custom hooks, move utility functions to 
separate files, and split large components into smaller sub-components.
```

### 2. Side Effect Encapsulation (Property 27)

**Validates Requirement 8.4**

Verifies that side effects are properly encapsulated in `useEffect` hooks with appropriate cleanup:

**Detected Side Effects:**
- Event listener registration (`addEventListener`)
- Timers (`setTimeout`, `setInterval`)
- Direct DOM manipulation (`querySelector`, `getElementById`)
- Storage operations (`localStorage.setItem`, `sessionStorage.setItem`)
- Subscriptions and observers

**Why This Matters:**
- Side effects outside `useEffect` can cause unexpected behavior
- Missing cleanup functions lead to memory leaks
- Proper encapsulation ensures effects run at the right time in the component lifecycle

**Example Issues:**

```
[HIGH] Improperly encapsulated side effects in MyComponent
Description: Component MyComponent contains side effects (event listener 
registration, timeout timer) that may not be properly encapsulated in useEffect 
hooks. Side effects should be managed within useEffect to ensure proper lifecycle 
management.

Recommendation: Move all side effects into useEffect hooks. This ensures they run 
at the appropriate time in the component lifecycle and can be properly cleaned up.
Example: 
  useEffect(() => { 
    const handler = () => {};
    window.addEventListener("event", handler);
    return () => window.removeEventListener("event", handler);
  }, []);
```

```
[HIGH] Missing cleanup in useEffect in MyComponent
Description: Component MyComponent has useEffect hooks with side effects (event 
listeners, timers, subscriptions) that lack proper cleanup functions. This can 
lead to memory leaks and unexpected behavior.

Recommendation: Add cleanup functions to all useEffect hooks that register side 
effects. Return a cleanup function that removes event listeners, clears timers, 
cancels subscriptions, etc.
Example:
  useEffect(() => {
    const id = setInterval(...);
    return () => clearInterval(id);
  }, []);
```

## Usage

```typescript
import { FileScanner } from './fileScanner';
import { IssueCollector } from './issueCollector';
import { ArchitectureAnalyzer } from './architectureAnalyzer';

// Initialize
const scanner = new FileScanner();
const issueCollector = new IssueCollector();
const analyzer = new ArchitectureAnalyzer(issueCollector);

// Scan components
const components = scanner.scanComponents();

// Run all architecture analyses
const results = analyzer.analyzeAll(components);

// Access results
console.log(`Complexity issues: ${results.complexity.length}`);
console.log(`Side effect issues: ${results.sideEffects.length}`);
console.log(`Total issues: ${results.allIssues.length}`);
```

## Individual Analysis Methods

### Check Component Complexity

```typescript
const complexityIssues = analyzer.checkComponentComplexity(components);
```

Returns issues for components that exceed:
- 300 lines of code per file
- 150 lines for the main component function

### Verify Side Effect Encapsulation

```typescript
const sideEffectIssues = analyzer.verifySideEffectEncapsulation(components);
```

Returns issues for:
- Side effects not in `useEffect`
- `useEffect` hooks missing cleanup functions

## Test Coverage

The architecture analyzer includes comprehensive tests:

```bash
npm test architectureAnalyzer.test.ts
```

Tests cover:
- Component complexity detection
- Side effect encapsulation verification
- Combined analysis execution
- Edge cases (simple components, components without side effects)

## Example Output

Running the example analysis script:

```bash
npx tsx src/review/example-architecture-analysis.ts
```

Sample output:
```
=== Architecture Analysis ===
Analyzing 31 components...

--- Component Complexity Issues ---
✓ No complexity issues found

--- Side Effect Encapsulation Issues ---
Found 4 side effect issues:

[HIGH] Improperly encapsulated side effects in BatBurst
Location: packages/ghostui/src/components/BatBurst.tsx
Description: Component BatBurst contains side effects (timeout timer)...

=== Summary ===
Total architecture issues: 4
- Complexity issues: 0
- Side effect issues: 4

By severity:
- high: 4
```

## Integration

The architecture analyzer integrates with the broader code review system:

1. **File Scanner**: Discovers all component files
2. **Issue Collector**: Creates standardized issue objects
3. **Report Generator**: Includes architecture findings in the final report

## Future Enhancements

Potential additions to architecture analysis:

1. **Cyclomatic Complexity**: Measure code complexity beyond line count
2. **Dependency Analysis**: Detect tight coupling between components
3. **Hook Extraction**: Suggest custom hooks for complex logic
4. **Component Decomposition**: Recommend specific refactoring strategies
5. **Performance Impact**: Analyze architectural decisions affecting performance

## Related Properties

- **Property 26**: Component complexity limits (Requirement 8.1)
- **Property 27**: Side effect encapsulation (Requirement 8.4)

## References

- Design Document: `.kiro/specs/comprehensive-code-review/design.md`
- Requirements: `.kiro/specs/comprehensive-code-review/requirements.md`
- Implementation: `packages/ghostui/src/review/architectureAnalyzer.ts`
- Tests: `packages/ghostui/src/review/architectureAnalyzer.test.ts`
