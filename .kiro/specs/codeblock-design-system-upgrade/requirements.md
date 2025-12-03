# Requirements Document

## Introduction

This specification defines the requirements for upgrading the CodeBlock component to align with the GhostUI design system. The current implementation uses hardcoded orange accent colors and lacks theme awareness. The upgrade will integrate the component with the theme system (spectral/blood themes), enhance the copy button with spooky animations, add syntax highlighting for component usage, and ensure consistent styling with other documentation components.

## Glossary

- **CodeBlock**: A React component that displays formatted code snippets with syntax highlighting and copy functionality
- **Theme System**: The GhostUI theming infrastructure supporting "spectral" (orange) and "blood" (red) theme variants via CSS custom properties
- **Accent Color**: The primary theme color used for borders, highlights, and interactive elements (orange for spectral, red for blood)
- **Copy Button**: An interactive button that copies code content to the clipboard and provides visual feedback
- **Syntax Highlighting**: Visual differentiation of code elements (keywords, strings, components, etc.) using color and styling
- **Component Playground**: The documentation container that displays component previews, code examples, and API documentation

## Requirements

### Requirement 1

**User Story:** As a documentation user, I want the CodeBlock component to respect the active theme, so that the visual experience is consistent across the entire documentation site.

#### Acceptance Criteria

1. WHEN the theme is set to "spectral" THEN the CodeBlock SHALL use orange accent colors (--ghost-accent: #FF6F00) for borders, glows, and highlights
2. WHEN the theme is set to "blood" THEN the CodeBlock SHALL use red accent colors (--ghost-accent: #ef4444) for borders, glows, and highlights
3. WHEN the theme changes THEN the CodeBlock SHALL transition smoothly to the new accent color within 300ms
4. WHEN rendered THEN the CodeBlock SHALL use CSS custom properties (--ghost-accent, --ghost-accent-rgb) instead of hardcoded color values
5. WHERE the CodeBlock is used outside a ThemeProvider THEN the CodeBlock SHALL default to spectral theme colors

### Requirement 2

**User Story:** As a documentation user, I want an enhanced copy button with spooky visual effects, so that the interaction feels engaging and provides clear feedback.

#### Acceptance Criteria

1. WHEN the copy button is idle THEN the System SHALL display a copy icon with subtle theme-colored glow effect
2. WHEN a user hovers over the copy button THEN the System SHALL animate the button with a scale transformation (1.05x) and increased glow intensity
3. WHEN a user clicks the copy button THEN the System SHALL copy the code to clipboard and display a success icon with a fade-in animation
4. WHEN the copy succeeds THEN the System SHALL show a checkmark icon with theme-colored glow for 2000ms before reverting
5. WHEN the copy button transitions between states THEN the System SHALL use smooth animations with cubic-bezier easing functions
6. WHEN the user has reduced motion preferences THEN the System SHALL disable scale and glow animations while maintaining functionality
7. WHEN rendered THEN the System SHALL position the copy button in the top-right corner of the code block

### Requirement 3

**User Story:** As a documentation user, I want GhostUI component names highlighted in code examples, so that I can quickly identify which components are being used.

#### Acceptance Criteria

1. WHEN code contains a PascalCase word THEN the System SHALL highlight it with the theme accent color and medium font weight as a component name
2. WHEN parsing code THEN the System SHALL recognize component names matching the pattern: capital letter followed by alphanumeric characters with at least one more capital letter (e.g., GooeyButton, SpookyTooltip, ThemeProvider)
3. WHEN highlighting components THEN the System SHALL preserve the original code structure and whitespace
4. WHEN multiple components appear in the same code block THEN the System SHALL highlight all component instances consistently
5. WHERE a component name appears in a string literal THEN the System SHALL NOT highlight it as a component
6. WHEN code contains single capital letter words THEN the System SHALL NOT highlight them as components (e.g., "I", "A")

### Requirement 4

**User Story:** As a documentation user, I want syntax highlighting for common code elements using a full-featured syntax highlighting library, so that code examples are professional and easier to read.

#### Acceptance Criteria

1. WHEN the CodeBlock renders THEN the System SHALL use Prism.js or Shiki for syntax highlighting
2. WHEN code is highlighted THEN the System SHALL apply a dark theme that complements the GhostUI design system
3. WHEN code contains import statements THEN the System SHALL highlight keywords with appropriate syntax colors
4. WHEN code contains string literals THEN the System SHALL highlight them distinctly from other code elements
5. WHEN code contains JSX/HTML tags THEN the System SHALL highlight tag names and attributes appropriately
6. WHEN code contains comments THEN the System SHALL highlight them with reduced opacity and italic styling
7. WHEN the syntax highlighter applies colors THEN the System SHALL ensure GhostUI component names (PascalCase) use the theme accent color to stand out

### Requirement 5

**User Story:** As a documentation maintainer, I want the CodeBlock component to maintain visual consistency with ComponentPlayground, so that the documentation has a cohesive design language.

#### Acceptance Criteria

1. WHEN rendered THEN the CodeBlock SHALL use the same border styling as ComponentPlayground (1px solid with theme accent color)
2. WHEN rendered THEN the CodeBlock SHALL use the same background color as ComponentPlayground code sections (rgba(0, 0, 0, 0.6))
3. WHEN rendered THEN the CodeBlock SHALL use the same shadow effects as ComponentPlayground (0 0 20px with theme accent color at 20% opacity)
4. WHEN rendered THEN the CodeBlock SHALL use the same border radius as ComponentPlayground (0.75rem / rounded-xl)
5. WHEN rendered THEN the CodeBlock SHALL maintain consistent padding (1.5rem / p-6) with ComponentPlayground code sections

### Requirement 6

**User Story:** As a developer, I want the CodeBlock component to be accessible, so that all users can interact with the code examples regardless of their abilities.

#### Acceptance Criteria

1. WHEN the copy button is rendered THEN the System SHALL include an aria-label describing the button's purpose
2. WHEN the copy button state changes THEN the System SHALL update the aria-label to reflect the current state (e.g., "Copy code" vs "Code copied")
3. WHEN a user navigates with keyboard THEN the System SHALL provide visible focus indicators on the copy button
4. WHEN a user activates the copy button with keyboard THEN the System SHALL execute the copy action identically to mouse clicks
5. WHEN the user has reduced motion preferences THEN the System SHALL respect prefers-reduced-motion and disable decorative animations

### Requirement 7

**User Story:** As a documentation user, I want to see the programming language of each code block, so that I can quickly understand the context of the code example.

#### Acceptance Criteria

1. WHEN the CodeBlock renders THEN the System SHALL display a language badge in the top-left corner
2. WHEN the language prop is provided THEN the System SHALL display the language name in uppercase (e.g., "TSX", "CSS", "JSON")
3. WHEN the language badge is rendered THEN the System SHALL style it with theme accent color border and subtle background
4. WHEN the language prop is not provided THEN the System SHALL default to displaying "TSX"
5. WHEN both the language badge and copy button are visible THEN the System SHALL ensure they do not overlap

### Requirement 8

**User Story:** As a documentation user, I want to expand or collapse long code blocks, so that I can focus on relevant content without excessive scrolling.

#### Acceptance Criteria

1. WHEN a code block exceeds 400px in height THEN the System SHALL display it in a collapsed state with a maximum height of 400px
2. WHEN a code block is collapsed THEN the System SHALL display an "Expand" button at the bottom with a gradient fade effect
3. WHEN a user clicks the expand button THEN the System SHALL animate the code block to full height and change the button text to "Collapse"
4. WHEN a user clicks the collapse button THEN the System SHALL animate the code block back to 400px height and scroll to the top of the code block
5. WHEN a code block is shorter than 400px THEN the System SHALL NOT display the expand/collapse button
6. WHEN the expand/collapse animation runs THEN the System SHALL use smooth transitions with 300ms duration

### Requirement 9

**User Story:** As a developer, I want the CodeBlock component to handle edge cases gracefully, so that the documentation remains functional in all scenarios.

#### Acceptance Criteria

1. WHEN the code prop is an empty string THEN the System SHALL render an empty code block without errors
2. WHEN the code contains special characters THEN the System SHALL escape and display them correctly without breaking the layout
3. WHEN the code is very long THEN the System SHALL enable horizontal scrolling while maintaining the copy button and language badge positions
4. WHEN the clipboard API is unavailable THEN the System SHALL handle the error gracefully and provide fallback behavior
5. WHEN the component unmounts during a copy operation THEN the System SHALL clean up timers to prevent memory leaks
