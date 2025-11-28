# Error Handling Analysis

This document describes the error handling analysis capabilities of the GhostUI code review system.

## Overview

The Error Handling Analyzer evaluates components for proper error handling and edge case management. It validates Requirements 7.1, 7.2, 7.4, and 7.5 from the comprehensive code review specification.

## Analysis Categories

### 1. Prop Validation (Requirement 7.1)

**Property 22: Prop validation presence**

*For any* component with numeric props that have valid ranges, the component SHALL validate and clamp those values.

**What it checks:**
- Identifies components with numeric props
- Verifies presence of validation/clamping logic
- Reports components lacking proper prop validation

**Example issues:**
- Numeric props without range validation
- Missing Math.max/Math.min clamping
- No validation warnings for out-of-range values

**Recommendations:**
```typescript
// Bad: No validation
const MyComponent = ({ value }: { value: number }) => {
  return <div style={{ width: value }} />;
};

// Good: With validation
const MyComponent = ({ value }: { value: number }) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  return <div style={{ width: clampedValue }} />;
};
```

### 2. Null/Undefined Handling (Requirement 7.2)

**Property 23: Null/undefined handling**

*For any* component that accesses object properties or array elements, the component SHALL check for null/undefined before access or use optional chaining.

**What it checks:**
- Identifies unsafe property access patterns
- Verifies use of optional chaining (?.)
- Checks for null/undefined guards
- Reports unsafe array indexing

**Example issues:**
- Direct property access without null checks
- Array element access without bounds checking
- Missing optional chaining on potentially undefined values

**Recommendations:**
```typescript
// Bad: Unsafe access
const value = props.user.name;
const item = array[0].value;

// Good: Safe access
const value = props.user?.name ?? 'Default';
const item = array[0]?.value;

// Good: With explicit checks
if (props.user && props.user.name) {
  const value = props.user.name;
}
```

### 3. Invalid State Guards (Requirement 7.4)

**Property 24: Invalid state guards**

*For any* component with state that can be invalid, the component SHALL include guards that prevent or handle invalid states.

**What it checks:**
- Identifies components with complex state (objects, arrays, useReducer)
- Verifies presence of state validation logic
- Reports components lacking state guards

**Example issues:**
- Complex state without validation
- Missing guards in state setters
- No validation before state-dependent rendering

**Recommendations:**
```typescript
// Bad: No state validation
const [state, setState] = useState({ count: 0, items: [] });
setState({ count: -1, items: [] }); // Invalid state allowed

// Good: With validation
const [state, setState] = useState({ count: 0, items: [] });
const updateState = (newState: State) => {
  if (isValidState(newState)) {
    setState(newState);
  } else {
    console.warn('Invalid state prevented');
  }
};

// Good: With guards in setter
setState(prev => {
  const newCount = Math.max(0, prev.count + delta);
  return { ...prev, count: newCount };
});
```

### 4. Async Error Handling (Requirement 7.5)

**Property 25: Async error handling**

*For any* async function or promise in component code, the code SHALL include error handling via try-catch or .catch().

**What it checks:**
- Identifies async functions and Promise usage
- Verifies presence of try-catch blocks
- Checks for .catch() on promises
- Reports unhandled async errors

**Example issues:**
- Async functions without try-catch
- Promises without .catch() handlers
- Missing error boundaries for async operations

**Recommendations:**
```typescript
// Bad: No error handling
const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json();
  setData(data);
};

// Good: With try-catch
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    setError(error);
  }
};

// Good: With .catch()
fetch('/api/data')
  .then(response => response.json())
  .then(data => setData(data))
  .catch(error => {
    console.error('Failed to fetch data:', error);
    setError(error);
  });
```

## Usage

### Basic Usage

```typescript
import { ErrorHandlingAnalyzer } from './errorHandlingAnalyzer';
import { IssueCollector } from './issueCollector';
import { FileScanner } from './fileScanner';

// Initialize
const issueCollector = new IssueCollector();
const fileScanner = new FileScanner();
const analyzer = new ErrorHandlingAnalyzer(issueCollector);

// Scan components
const components = fileScanner.scanComponents();

// Run analysis
const results = analyzer.analyzeAll(components);

// Access results
console.log(`Prop validation issues: ${results.propValidation.length}`);
console.log(`Null handling issues: ${results.nullUndefinedHandling.length}`);
console.log(`State guard issues: ${results.stateGuards.length}`);
console.log(`Async error handling issues: ${results.asyncErrorHandling.length}`);
```

### Individual Checks

```typescript
// Check only prop validation
const propIssues = analyzer.checkPropValidation(components);

// Check only null/undefined handling
const nullIssues = analyzer.verifyNullUndefinedHandling(components);

// Check only state guards
const stateIssues = analyzer.checkInvalidStateGuards(components);

// Check only async error handling
const asyncIssues = analyzer.verifyAsyncErrorHandling(components);
```

## Issue Severity Levels

- **Critical**: Issues that could cause runtime crashes or data corruption
- **High**: Issues that could cause unexpected behavior or poor user experience
- **Medium**: Issues that reduce code quality or maintainability
- **Low**: Minor issues or style inconsistencies

## Integration with Review System

The Error Handling Analyzer integrates with the broader code review system:

1. **Issue Collection**: Uses IssueCollector to create standardized issue objects
2. **File Scanning**: Works with FileScanner to discover components
3. **Report Generation**: Issues feed into the comprehensive review report
4. **Categorization**: Issues are categorized under "Error Handling" in the final report

## Limitations

The analyzer uses static analysis and pattern matching, which has some limitations:

1. **False Positives**: May flag code that is actually safe due to context
2. **False Negatives**: May miss complex error handling patterns
3. **Context Awareness**: Cannot understand full program semantics
4. **Type Information**: Limited TypeScript type inference

Manual review is recommended for:
- Complex validation logic
- Domain-specific error handling requirements
- Performance-critical error paths
- Error recovery strategies

## Best Practices

1. **Validate Early**: Check props and inputs at component boundaries
2. **Fail Safely**: Provide sensible defaults and fallbacks
3. **Be Explicit**: Use optional chaining and nullish coalescing
4. **Handle Async**: Always wrap async operations in try-catch
5. **Guard State**: Validate state transitions and prevent invalid states
6. **Log Errors**: Use proper error logging for debugging
7. **User Feedback**: Provide meaningful error messages to users

## Related Documentation

- [TypeScript Analysis](./TYPESCRIPT_ANALYSIS.md)
- [Component API Analysis](./COMPONENT_API_ANALYSIS.md)
- [Testing Analysis](./TESTING_ANALYSIS.md)
- [Review System Overview](./README.md)
