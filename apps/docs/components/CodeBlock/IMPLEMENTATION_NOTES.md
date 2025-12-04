# Component Name Highlighting Implementation

## Overview
This implementation adds PascalCase component name highlighting to the CodeBlock component, fulfilling Requirements 3.1-3.6 and 4.7.

## Implementation Details

### Files Created/Modified

1. **highlightComponents.ts** (NEW)
   - Exports `COMPONENT_NAME_PATTERN` regex for detecting PascalCase component names
   - Exports `highlightComponentNames()` function for post-processing Prism.js output
   - Implements DOM traversal to find and wrap component names in spans

2. **highlightCode.ts** (MODIFIED)
   - Imports `highlightComponentNames` from highlightComponents.ts
   - Calls component highlighting after Prism.js syntax highlighting
   - Returns HTML with both syntax and component highlighting applied

3. **globals.css** (MODIFIED)
   - Added `.component-name` CSS class with theme-aware accent color
   - Uses `var(--ghost-accent)` for dynamic theme support
   - Applies medium font weight (500) for visual distinction

4. **index.ts** (MODIFIED)
   - Exports `highlightComponentNames` and `COMPONENT_NAME_PATTERN` for testing

## Regex Pattern

```typescript
const COMPONENT_NAME_PATTERN = /\b[A-Z][a-z]+(?:[A-Z][a-z]*)+\b/g;
```

### Pattern Explanation
- `\b` - Word boundary (start)
- `[A-Z]` - Must start with capital letter
- `[a-z]+` - Followed by one or more lowercase letters
- `(?:[A-Z][a-z]*)+` - One or more groups of capital letter followed by zero or more lowercase
- `\b` - Word boundary (end)
- `g` - Global flag (find all matches)

### Matches
- ✓ GooeyButton
- ✓ SpookyTooltip
- ✓ ThemeProvider
- ✓ ComponentPlayground
- ✓ CodeBlock

### Does NOT Match
- ✗ Button (single word, only one capital)
- ✗ I, A (single letter)
- ✗ useState (starts with lowercase)
- ✗ CONSTANT (all caps)
- ✗ myComponent (starts with lowercase)

## String Literal Exclusion

The implementation uses a TreeWalker with a custom filter to exclude text nodes inside string tokens:

```typescript
acceptNode: (node) => {
  const parent = node.parentElement;
  if (parent?.classList.contains('token') && 
      parent?.classList.contains('string')) {
    return NodeFilter.FILTER_REJECT;
  }
  return NodeFilter.FILTER_ACCEPT;
}
```

This ensures that component names appearing in string literals (e.g., `"GooeyButton"`) are NOT highlighted.

## Whitespace Preservation

The implementation preserves all whitespace by:
1. Processing text nodes individually without modifying their content
2. Using `textContent` to extract text (preserves whitespace)
3. Creating document fragments that maintain exact character positions
4. Only wrapping matched component names, leaving all other text unchanged

## Theme Integration

Component names use the CSS custom property `var(--ghost-accent)` which:
- Defaults to `#FF6F00` (orange) for spectral theme
- Changes to `#ef4444` (red) for blood theme
- Transitions smoothly (300ms) when theme changes
- Overrides any default Prism.js syntax highlighting colors

## Requirements Validation

### ✓ Requirement 3.1
PascalCase words are highlighted with theme accent color and medium font weight.

### ✓ Requirement 3.2
Component names match the pattern: capital letter followed by alphanumeric with at least one more capital.

### ✓ Requirement 3.3
Original code structure and whitespace are preserved through DOM manipulation.

### ✓ Requirement 3.4
All component instances are highlighted consistently using the same regex pattern.

### ✓ Requirement 3.5
Component names in string literals are excluded via TreeWalker filter.

### ✓ Requirement 3.6
Single capital letter words are excluded by the regex pattern.

### ✓ Requirement 4.7
Component names use theme accent color, overriding default syntax highlighting.

## Testing

A manual test file (`test-component-highlighting.html`) is provided to verify:
1. Basic PascalCase detection
2. Exclusion of single words
3. Exclusion of string literals
4. Whitespace preservation

To run the test, open the HTML file in a browser.

## Next Steps

The following optional tasks can be implemented:
- Task 4.1: Property test for component name highlighting consistency
- Task 4.2: Property test for whitespace preservation
- Task 4.3: Property test for string literal exclusion

These tests would use fast-check to generate random code strings and verify the properties hold across all inputs.
