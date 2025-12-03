# Implementation Plan

- [x] 1. Set up project structure and dependencies





  - Create CodeBlock directory structure with sub-components
  - Install Prism.js and fast-check dependencies
  - Set up TypeScript types for Prism.js
  - _Requirements: All requirements depend on proper setup_



- [x] 2. Implement core CodeBlock component with theme integration



  - Create main CodeBlock component with props interface
  - Integrate CSS custom properties for theme-aware styling
  - Apply border, shadow, and background styles matching ComponentPlayground
  - Add responsive padding and border radius
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 2.1 Write property test for theme color application
  - **Property 9: Component name accent color override**

  - **Validates: Requirements 4.7**
-

- [x] 3. Implement Prism.js syntax highlighting



  - Integrate Prism.js with TypeScript, TSX, JSX, CSS, JSON support
  - Create custom GhostUI Prism theme with design system colors
  - Implement useMemo for performance optimization
  - Add support for language prop with default to 'tsx'
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ]* 3.1 Write unit tests for syntax highlighting
  - Test import statement highlighting
  - Test string literal highlighting
  - Test JSX tag highlighting
  - Test comment highlighting
  - _Requirements: 4.3, 4.4, 4.5, 4.6_

-

- [x] 4. Implement component name highlighting



  - Create PascalCase detection regex pattern
  - Implement post-processing function to highlight component names
  - Ensure component names use theme accent color
  - Exclude component names within string literals
  - Preserve original code structure and whitespace
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.7_

- [ ]* 4.1 Write property test for component name highlighting consistency
  - **Property 1: Component name highlighting consistency**
  - **Validates: Requirements 3.1, 3.2, 3.4**

- [ ]* 4.2 Write property test for whitespace preservation
  - **Property 2: Whitespace preservation**
  - **Validates: Requirements 3.3**

- [ ]* 4.3 Write property test for string literal exclusion
  - **Property 3: String literal component exclusion**

  - **Validates: Requirements 3.5**
-

- [x] 5. Implement LanguageBadge component


  - Create LanguageBadge sub-component with language prop
  - Transform language string to uppercase
  - Style with theme accent color border and subtle background
  - Position in top-left corner
  - Default to "TSX" when language prop not provided
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 5.1 Write property test for language badge transformation
  - **Property 5: Language badge transformation**
  - **Validates: Requirements 7.2**

- [ ]* 5.2 Write unit tests for LanguageBadge
  - Test uppercase transformation
  - Test default "TSX" value

  - Test positioning and styling
  - _Requirements: 7.1, 7.3, 7.4_


- [x] 6. Implement CopyButton component with animations


  - Create CopyButton sub-component with copy functionality
  - Implement clipboard API with fallback for older browsers
  - Add Copy and Check icons from lucide-react
  - Implement hover animations (scale 1.05x, increased glow)
  - Add smooth state transitions with cubic-bezier easing
  - Position in top-right corner
  - Ensure no overlap with language badge
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.7, 7.5_

- [ ]* 6.1 Write property test for copy functionality
  - **Property 4: Copy functionality**
  - **Validates: Requirements 2.3**

- [ ]* 6.2 Write unit tests for CopyButton
  - Test copy button idle state
  - Test hover state animations
  - Test success state with 2000ms timeout

  - Test clipboard API fallback
  - Test timer cleanup on unmount
  - _Requirements: 2.1, 2.2, 2.4, 9.4, 9.5_

- [x] 7. Implement accessibility features



  - Add dynamic aria-label to copy button (idle/copied states)
  - Add aria-live="polite" for screen reader announcements
  - Implement keyboard navigation (Enter/Space key support)
  - Add visible focus indicators with theme accent color
  - Implement prefers-reduced-motion support
  - _Requirements: 2.6, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 7.1 Write property test for keyboard interaction equivalence
  - **Property 6: Keyboard interaction equivalence**
  - **Validates: Requirements 6.4**

- [ ]* 7.2 Write property test for aria-label synchronization
  - **Property 7: Aria-label state synchronization**
  - **Validates: Requirements 6.2**

- [ ]* 7.3 Write unit tests for accessibility
  - Test aria-label presence and updates

  - Test keyboard navigation
  - Test focus indicators
  - Test reduced motion preferences
  - _Requirements: 6.1, 6.3, 6.5_

- [x] 8. Implement expand/collapse functionality



  - Create ExpandCollapseButton sub-component
  - Implement height calculation with useEffect and useRef
  - Add conditional rendering based on 400px threshold
  - Implement expand/collapse state management
  - Add smooth animations with 300ms duration
  - Add gradient fade effect for collapsed state
  - Implement scroll to top on collapse
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ]* 8.1 Write unit tests for expand/collapse
  - Test height calculation and conditional rendering
  - Test expand button shows for tall code blocks
  - Test expand button hidden for short code blocks

  - Test expand/collapse state transitions
  - Test button text updates
  - Test scroll to top on collapse
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Implement edge case handling




  - Handle empty code string gracefully
  - Implement special character escaping
  - Enable horizontal scrolling for long code
  - Maintain fixed positioning for buttons during scroll
  - Add error boundaries for height calculation
  - _Requirements: 9.1, 9.2, 9.3_

- [ ]* 9.1 Write property test for special character handling
  - **Property 8: Special character handling**
  - **Validates: Requirements 9.2**

- [ ]* 9.2 Write unit tests for edge cases

  - Test empty code string
  - Test very long code with horizontal scroll
  - Test button positioning during scroll
  - _Requirements: 9.1, 9.3_
- [x] 10. Implement performance optimizations




- [ ] 10. Implement performance optimizations
  - Add useMemo for syntax highlighting caching
  - Implement Intersection Observer for lazy highlighting
  - Debounce height calculations
  - Optimize re-renders with React.memo for sub-components
  - _Requirements: Performance considerations from design_

- [ ]* 10.1 Write unit tests for performance optimizations

  - Test memoization prevents unnecessary re-highlighting
  - Test Intersection Observer triggers highlighting
  - Test debounced height calculations
  - _Requirements: Performance considerations from design_

- [x] 11. Update ComponentPlayground integration



  - Remove inline code styling from ComponentPlayground
  - Update ComponentPlayground to use new CodeBlock component
  - Ensure visual consistency between standalone and playground usage
  - Test theme switching in ComponentPlayground context
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 11.1 Write integration tests

  - Test CodeBlock in ComponentPlayground
  - Test theme switching updates CodeBlock colors
  - Test visual consistency with ComponentPlayground
  - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.2, 5.3, 5.4, 5.5_
-

- [x] 12. Update documentation pages



  - Update all component documentation pages to use new CodeBlock

  - Verify syntax highlighting works across all pages
  - Test expand/collapse on pages with long code examples
  - Verify theme switching works on all pages
  - _Requirements: All requirements in production context_
- [x] 13. Final checkpoint - Ensure all tests pass




- [ ] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
