# Design Document

## Overview

The CodeBlock component will be upgraded to become a fully theme-aware, feature-rich code display component that integrates seamlessly with the GhostUI design system. The component will support both spectral (orange) and blood (red) themes, provide professional syntax highlighting via Prism.js, highlight GhostUI component names, and include enhanced interactions like an animated copy button and expand/collapse functionality for long code blocks.

The design prioritizes visual consistency with the existing ComponentPlayground, accessibility, and smooth animations that respect user preferences for reduced motion.

## Architecture

### Component Structure

```
CodeBlock (Container)
├── LanguageBadge (Top-left indicator)
├── CopyButton (Top-right with animations)
├── CodeContent (Scrollable container)
│   ├── PrismHighlighter (Syntax highlighting)
│   └── ComponentNameOverlay (PascalCase highlighting)
└── ExpandCollapseButton (Conditional, bottom)
```

### Theme Integration

The component will consume theme values through CSS custom properties rather than hardcoded colors:
- `--ghost-accent`: Primary theme color (orange or red)
- `--ghost-accent-rgb`: RGB values for rgba() usage
- `--ghost-bg`: Background color
- `--ghost-text`: Text color

The component will work standalone (defaulting to spectral theme) or integrate with the ThemeProvider context for dynamic theme switching.

### State Management

```typescript
interface CodeBlockState {
  copied: boolean;           // Copy button state
  isExpanded: boolean;       // Expand/collapse state
  shouldShowExpand: boolean; // Calculated based on content height
}
```

## Components and Interfaces

### CodeBlock Component

```typescript
interface CodeBlockProps {
  code: string;                    // Code content to display
  language?: string;               // Programming language (default: 'tsx')
  className?: string;              // Additional CSS classes
  maxCollapsedHeight?: number;     // Height threshold for collapse (default: 400)
  showLineNumbers?: boolean;       // Enable line numbers (default: false)
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  maxCollapsedHeight = 400,
  showLineNumbers = false
}: CodeBlockProps): JSX.Element
```

### CopyButton Component

```typescript
interface CopyButtonProps {
  code: string;
  copied: boolean;
  onCopy: () => void;
}

function CopyButton({ code, copied, onCopy }: CopyButtonProps): JSX.Element
```

### LanguageBadge Component

```typescript
interface LanguageBadgeProps {
  language: string;
}

function LanguageBadge({ language }: LanguageBadgeProps): JSX.Element
```

### ExpandCollapseButton Component

```typescript
interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

function ExpandCollapseButton({ isExpanded, onToggle }: ExpandCollapseButtonProps): JSX.Element
```

## Data Models

### Syntax Highlighting Configuration

```typescript
interface PrismThemeConfig {
  plain: {
    color: string;
    backgroundColor: string;
  };
  styles: Array<{
    types: string[];
    style: {
      color?: string;
      fontStyle?: string;
      fontWeight?: string;
    };
  }>;
}
```

### Component Name Pattern

```typescript
// Regex pattern for detecting PascalCase component names
const COMPONENT_NAME_PATTERN = /\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b/g;

// Examples that match:
// - GooeyButton
// - SpookyTooltip
// - ThemeProvider
// - ComponentPlayground

// Examples that don't match:
// - Button (single word)
// - I, A (single letter)
// - useState (starts with lowercase)
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following testable properties and eliminated redundancy:

**Properties to implement:**
- Component name highlighting (PascalCase detection and consistent application)
- Copy functionality across all valid code inputs
- Language badge transformation (uppercase)
- Whitespace preservation during highlighting
- String literal exclusion from component highlighting
- Keyboard interaction equivalence
- Aria-label state synchronization
- Special character handling

**Redundant/Combined:**
- Theme color tests (1.1, 1.2) are examples of the same theme system - keep as examples
- Reduced motion tests (2.6, 6.5) are duplicates - keep one
- Styling consistency tests (5.1-5.5) are all examples - keep as examples

**Properties:**

Property 1: Component name highlighting consistency
*For any* code string containing PascalCase words (matching /\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b/), all matching words should be highlighted with the theme accent color and medium font weight
**Validates: Requirements 3.1, 3.2, 3.4**

Property 2: Whitespace preservation
*For any* code string, after applying syntax highlighting and component name highlighting, the text content (excluding HTML tags) should be identical to the original input
**Validates: Requirements 3.3**

Property 3: String literal component exclusion
*For any* code string containing PascalCase words within string literals (single or double quotes), those words should NOT be highlighted as components
**Validates: Requirements 3.5**

Property 4: Copy functionality
*For any* valid code string, clicking the copy button should copy that exact string to the clipboard
**Validates: Requirements 2.3**

Property 5: Language badge transformation
*For any* language string provided, the language badge should display it in uppercase (e.g., "tsx" → "TSX", "css" → "CSS")
**Validates: Requirements 7.2**

Property 6: Keyboard interaction equivalence
*For any* user interaction (copy action), activating via keyboard (Enter or Space) should produce the same result as mouse click
**Validates: Requirements 6.4**

Property 7: Aria-label state synchronization
*For any* copy button state change (idle → copied → idle), the aria-label should accurately reflect the current state
**Validates: Requirements 6.2**

Property 8: Special character handling
*For any* code string containing special characters (<, >, &, ", '), the rendered output should display them correctly without breaking the HTML structure
**Validates: Requirements 9.2**

Property 9: Component name accent color override
*For any* code string with syntax highlighting applied, PascalCase component names should use the theme accent color, overriding any default syntax highlighting colors
**Validates: Requirements 4.7**

## Error Handling

### Clipboard API Errors

```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) {
      // Fallback for browsers without clipboard API
      return fallbackCopy(text);
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn('Failed to copy to clipboard:', error);
    return fallbackCopy(text);
  }
}

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
}
```

### Timer Cleanup

```typescript
useEffect(() => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  if (copied) {
    timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}, [copied]);
```

### Height Calculation Errors

```typescript
useEffect(() => {
  try {
    const codeElement = codeRef.current;
    if (!codeElement) return;
    
    const height = codeElement.scrollHeight;
    setShouldShowExpand(height > maxCollapsedHeight);
  } catch (error) {
    console.warn('Failed to calculate code block height:', error);
    setShouldShowExpand(false);
  }
}, [code, maxCollapsedHeight]);
```

## Testing Strategy

### Unit Testing

The CodeBlock component will use **Vitest** and **React Testing Library** for unit tests. Tests will focus on:

**Component Rendering:**
- Renders with default props
- Renders with custom language
- Renders language badge correctly
- Renders copy button in correct position

**Theme Integration:**
- Uses spectral theme colors by default
- Uses blood theme colors when theme is set
- Applies CSS custom properties correctly

**Copy Functionality:**
- Copy button copies code to clipboard
- Shows success state after copy
- Reverts to idle state after 2000ms
- Handles clipboard API errors gracefully

**Expand/Collapse:**
- Shows expand button for tall code blocks
- Hides expand button for short code blocks
- Expands and collapses on button click
- Updates button text correctly

**Accessibility:**
- Copy button has correct aria-label
- Aria-label updates on state change
- Button is keyboard accessible
- Respects prefers-reduced-motion

**Edge Cases:**
- Handles empty code string
- Handles very long code
- Cleans up timers on unmount

### Property-Based Testing

The component will use **fast-check** for property-based testing. Each property test will run a minimum of 100 iterations.

**Property Test 1: Component Name Highlighting**
- Generate random code strings with PascalCase words
- Verify all PascalCase words matching the pattern are highlighted
- Verify highlighting is consistent across all instances
- **Feature: codeblock-design-system-upgrade, Property 1: Component name highlighting consistency**

**Property Test 2: Whitespace Preservation**
- Generate random code strings with various whitespace patterns
- Apply highlighting and extract text content
- Verify text content matches original input
- **Feature: codeblock-design-system-upgrade, Property 2: Whitespace preservation**

**Property Test 3: String Literal Exclusion**
- Generate random code strings with PascalCase words in string literals
- Verify PascalCase words inside strings are not highlighted
- **Feature: codeblock-design-system-upgrade, Property 3: String literal component exclusion**

**Property Test 4: Copy Functionality**
- Generate random code strings
- Simulate copy button click
- Verify clipboard receives exact code string
- **Feature: codeblock-design-system-upgrade, Property 4: Copy functionality**

**Property Test 5: Language Badge Transformation**
- Generate random language strings (lowercase, mixed case)
- Verify badge displays uppercase version
- **Feature: codeblock-design-system-upgrade, Property 5: Language badge transformation**

**Property Test 6: Keyboard Interaction Equivalence**
- Generate random code strings
- Test copy via mouse click and keyboard
- Verify identical results
- **Feature: codeblock-design-system-upgrade, Property 6: Keyboard interaction equivalence**

**Property Test 7: Aria-label Synchronization**
- Generate random code strings
- Trigger state changes (idle → copied → idle)
- Verify aria-label matches state at each step
- **Feature: codeblock-design-system-upgrade, Property 7: Aria-label state synchronization**

**Property Test 8: Special Character Handling**
- Generate random code strings with special HTML characters
- Verify characters render correctly without breaking layout
- **Feature: codeblock-design-system-upgrade, Property 8: Special character handling**

**Property Test 9: Component Name Accent Color Override**
- Generate random code strings with PascalCase words
- Apply syntax highlighting
- Verify PascalCase words use accent color, not default syntax colors
- **Feature: codeblock-design-system-upgrade, Property 9: Component name accent color override**

### Integration Testing

Integration tests will verify the CodeBlock works correctly within the documentation system:

- CodeBlock integrates with ThemeProvider
- CodeBlock matches ComponentPlayground styling
- CodeBlock works in various documentation pages
- Theme switching updates CodeBlock colors in real-time

### Visual Regression Testing

Visual tests will ensure the component maintains consistent appearance:

- Spectral theme appearance
- Blood theme appearance
- Hover states and animations
- Expanded and collapsed states
- Language badge positioning
- Copy button positioning

## Implementation Details

### Syntax Highlighting with Prism.js

We'll use **Prism.js** with the following configuration:

```typescript
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

// Custom theme that integrates with GhostUI
const ghostUITheme = {
  'comment': { color: 'rgba(230, 230, 230, 0.5)', fontStyle: 'italic' },
  'prolog': { color: 'rgba(230, 230, 230, 0.5)' },
  'doctype': { color: 'rgba(230, 230, 230, 0.5)' },
  'cdata': { color: 'rgba(230, 230, 230, 0.5)' },
  'punctuation': { color: '#e9d5ff' },
  'property': { color: '#FBBF24' },
  'tag': { color: '#FBBF24' },
  'boolean': { color: '#a855f7' },
  'number': { color: '#a855f7' },
  'constant': { color: '#a855f7' },
  'symbol': { color: '#a855f7' },
  'deleted': { color: '#ef4444' },
  'selector': { color: '#10b981' },
  'attr-name': { color: '#10b981' },
  'string': { color: '#10b981' },
  'char': { color: '#10b981' },
  'builtin': { color: '#10b981' },
  'inserted': { color: '#10b981' },
  'operator': { color: '#e9d5ff' },
  'entity': { color: '#e9d5ff' },
  'url': { color: '#e9d5ff' },
  'variable': { color: '#e9d5ff' },
  'atrule': { color: '#a855f7' },
  'attr-value': { color: '#10b981' },
  'keyword': { color: '#a855f7' },
  'function': { color: '#FBBF24' },
  'class-name': { color: 'var(--ghost-accent)' }, // Theme-aware
  'regex': { color: '#10b981' },
  'important': { color: '#ef4444', fontWeight: 'bold' },
};
```

### Component Name Highlighting Post-Processing

After Prism.js applies syntax highlighting, we'll post-process the HTML to highlight component names:

```typescript
function highlightComponentNames(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Find all text nodes
  const walker = document.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip text nodes inside string tokens
        const parent = node.parentElement;
        if (parent?.classList.contains('token') && 
            parent?.classList.contains('string')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  const textNodes: Text[] = [];
  let currentNode: Node | null;
  while (currentNode = walker.nextNode()) {
    textNodes.push(currentNode as Text);
  }
  
  // Replace PascalCase words with highlighted spans
  textNodes.forEach(node => {
    const text = node.textContent || '';
    const matches = text.match(COMPONENT_NAME_PATTERN);
    
    if (matches && matches.length > 0) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      
      text.replace(COMPONENT_NAME_PATTERN, (match, index) => {
        // Add text before match
        if (index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, index))
          );
        }
        
        // Add highlighted component name
        const span = document.createElement('span');
        span.className = 'component-name';
        span.textContent = match;
        fragment.appendChild(span);
        
        lastIndex = index + match.length;
        return match;
      });
      
      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex))
        );
      }
      
      node.parentNode?.replaceChild(fragment, node);
    }
  });
  
  return doc.body.innerHTML;
}
```

### Animation Configuration

```typescript
// Tailwind classes for animations
const animations = {
  copyButton: {
    idle: 'transition-all duration-200 ease-out',
    hover: 'scale-105 shadow-lg',
    copied: 'scale-100',
  },
  expandCollapse: {
    transition: 'transition-all duration-300 ease-in-out',
    collapsed: 'max-h-[400px] overflow-hidden',
    expanded: 'max-h-none',
  },
  reducedMotion: {
    // Applied when prefers-reduced-motion is active
    copyButton: 'transition-opacity duration-200',
    expandCollapse: 'transition-none',
  },
};

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

### CSS Custom Properties Integration

```css
.code-block {
  border: 1px solid var(--ghost-accent);
  box-shadow: 0 0 20px rgba(var(--ghost-accent-rgb), 0.2),
              0 10px 40px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.75rem;
  transition: border-color 300ms ease-in-out,
              box-shadow 300ms ease-in-out;
}

.copy-button {
  border: 1px solid rgba(var(--ghost-accent-rgb), 0.3);
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(230, 230, 230, 0.7);
}

.copy-button:hover {
  background-color: rgba(var(--ghost-accent-rgb), 0.2);
  color: #e6e6e6;
  box-shadow: 0 0 15px rgba(var(--ghost-accent-rgb), 0.4);
}

.component-name {
  color: var(--ghost-accent);
  font-weight: 500;
}

.language-badge {
  border: 1px solid rgba(var(--ghost-accent-rgb), 0.4);
  background-color: rgba(var(--ghost-accent-rgb), 0.1);
  color: var(--ghost-accent);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .code-block,
  .copy-button,
  .expand-collapse-button {
    transition: none;
  }
  
  .copy-button:hover {
    transform: none;
  }
}
```

## Performance Considerations

### Syntax Highlighting Optimization

- Use `useMemo` to cache highlighted code and avoid re-processing on every render
- Debounce height calculations for expand/collapse feature
- Lazy load Prism.js language modules only when needed

```typescript
const highlightedCode = useMemo(() => {
  const highlighted = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.tsx,
    language
  );
  return highlightComponentNames(highlighted);
}, [code, language]);
```

### Intersection Observer for Lazy Highlighting

For pages with many code blocks, use Intersection Observer to only highlight visible blocks:

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isHighlighted) {
          setIsHighlighted(true);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  if (codeRef.current) {
    observer.observe(codeRef.current);
  }
  
  return () => observer.disconnect();
}, []);
```

## Accessibility Features

### ARIA Labels

```typescript
const ariaLabel = copied ? 'Code copied to clipboard' : 'Copy code to clipboard';

<button
  onClick={handleCopy}
  aria-label={ariaLabel}
  aria-live="polite"
  className="copy-button"
>
  {/* Icon */}
</button>
```

### Keyboard Navigation

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleCopy();
  }
};

<button
  onClick={handleCopy}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  className="copy-button"
>
  {/* Icon */}
</button>
```

### Focus Management

```typescript
// Ensure focus is visible
.copy-button:focus-visible {
  outline: 2px solid var(--ghost-accent);
  outline-offset: 2px;
}

// When collapsing, scroll to top and maintain focus
const handleCollapse = () => {
  setIsExpanded(false);
  codeRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  expandButtonRef.current?.focus();
};
```

## Migration Path

### Backward Compatibility

The updated CodeBlock will maintain the same API surface:

```typescript
// Old usage - still works
<CodeBlock code={myCode} language="tsx" />

// New features - optional
<CodeBlock 
  code={myCode} 
  language="tsx"
  maxCollapsedHeight={500}
  showLineNumbers={true}
/>
```

### Gradual Rollout

1. Update CodeBlock component with new features
2. Test in isolation with Storybook
3. Update ComponentPlayground to use new CodeBlock
4. Update all documentation pages
5. Remove old inline code styling from ComponentPlayground

## Dependencies

### New Dependencies

```json
{
  "dependencies": {
    "prismjs": "^1.29.0"
  },
  "devDependencies": {
    "@types/prismjs": "^1.26.0",
    "fast-check": "^3.15.0"
  }
}
```

### Existing Dependencies

- React 18+
- Tailwind CSS
- Framer Motion (for animations)
- lucide-react (for icons)

## File Structure

```
apps/docs/components/
├── CodeBlock/
│   ├── CodeBlock.tsx           # Main component
│   ├── CopyButton.tsx          # Copy button sub-component
│   ├── LanguageBadge.tsx       # Language badge sub-component
│   ├── ExpandCollapseButton.tsx # Expand/collapse button
│   ├── highlightCode.ts        # Syntax highlighting logic
│   ├── highlightComponents.ts  # Component name highlighting
│   ├── CodeBlock.test.tsx      # Unit tests
│   ├── CodeBlock.properties.test.tsx # Property-based tests
│   └── index.ts                # Exports
```
