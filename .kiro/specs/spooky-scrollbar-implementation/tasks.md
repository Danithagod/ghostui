# Implementation Plan

- [x] 1. Create SpookyScrollbar component structure and ghost SVG components





  - Create SpookyScrollbar.tsx with component skeleton
  - Implement PeekingGhost SVG component with floating animation
  - Implement JumpScareGhost SVG component
  - Add inline CSS for scrollbar hiding and ghost-float keyframes
  - Set up component props interface (children, className)
  - _Requirements: 4.1, 4.2, 8.3_


- [x] 2. Implement core scrollbar functionality




  - Set up refs for content and track elements
  - Initialize state for thumbHeight, scrollTop, isHovering, isDragging, showJumpScare
  - Implement handleScroll callback with scroll calculations
  - Calculate thumb height based on content ratio with 40px minimum
  - Calculate thumb position based on scroll position
  - Render scrollable content area with hidden native scrollbar
  - Render custom scrollbar track and thumb with dynamic positioning
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 4.3, 4.4, 4.5_

- [ ]* 2.1 Write property test for thumb position calculation
  - **Property 1: Thumb position reflects scroll position**
  - **Validates: Requirements 1.2**

- [ ]* 2.2 Write property test for thumb height calculation
  - **Property 2: Thumb height proportional to content ratio**
  - **Validates: Requirements 1.3, 7.1**
-

- [x] 3. Implement ResizeObserver for dynamic content changes




  - Set up ResizeObserver in useEffect to watch content element
  - Call handleScroll when content dimensions change
  - Clean up observer on component unmount
  - Handle edge case when content is shorter than container
  - _Requirements: 7.1, 7.2, 7.3, 7.4_


- [x] 4. Implement hover interactions and visual feedback




  - Add onMouseEnter handler to track to set isHovering true
  - Add onMouseLeave handler to track to set isHovering false (when not dragging)
  - Apply hover styles to track (background color change)
  - Apply hover styles to thumb (purple-500/50 to purple-500)
  - Render conditional glow effect around thumb when hovering or dragging
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

-

- [x] 5. Implement drag functionality for scrollbar thumb



  - Add onMouseDown handler to thumb to activate dragging
  - Set up useEffect for mousemove and mouseup listeners during drag
  - Calculate scroll position from mouse Y position during drag
  - Update content scrollTop based on drag position
  - Prevent text selection during drag (set document.body.style.userSelect)
  - Restore text selection when drag ends
  - Clean up event listeners on drag end
  - _Requirements: 1.4, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 5.1 Write property test for drag scroll calculation
  - **Property 3: Dragging scrolls to correct position**
  - **Validates: Requirements 1.4, 6.2**

-

- [x] 6. Implement PeekingGhost with animations



  - Wrap PeekingGhost in AnimatePresence for mount/unmount animations
  - Show PeekingGhost when isHovering or isDragging is true
  - Configure framer-motion initial, animate, and exit props with spring animation
  - Position ghost to the left of thumb with absolute positioning
  - Add speech bubble with "Boo! Scrolled ya!" text
  - Style speech bubble with white background and pointer
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.1, 8.5_

-

- [x] 7. Implement jump scare effect


  - Calculate distance from bottom in handleScroll
  - Set showJumpScare to true when distance < 10px
  - Set showJumpScare to false when distance >= 10px
  - Wrap jump scare overlay in AnimatePresence
  - Render dark overlay with backdrop blur when showJumpScare is true
  - Render JumpScareGhost with framer-motion animations (spring from bottom, scale)
  - Add "The End Is Here" text above ghost
  - Configure exit animations for overlay and ghost
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.2, 8.5_

- [ ]* 7.1 Write property test for jump scare trigger
  - **Property 4: Jump scare appears near bottom**
  - **Validates: Requirements 3.1**

- [ ]* 7.2 Write property test for jump scare hide condition
  - **Property 5: Jump scare hides when scrolling away**
  - **Validates: Requirements 3.4**

- [ ]* 8. Write unit tests for SpookyScrollbar component
  - Test component renders with children
  - Test className prop is applied and merged
  - Test hover state changes on mouse enter/leave
  - Test drag state activation on mousedown
  - Test ghost components appear/disappear based on state
  - Test event listener cleanup on unmount
  - Test null ref handling
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 6.1, 6.3_

- [x] 9. Export component from package




  - Add SpookyScrollbar export to packages/ghostui/src/components/index.ts
  - Add SpookyScrollbar export to packages/ghostui/src/index.ts
  - Verify component is accessible from package imports
  - _Requirements: 4.1_

-

- [x] 10. Create documentation page



  - Create page.tsx at apps/docs/app/docs/components/spooky-scrollbar/
  - Add hero section with component name and description
  - Create interactive demo with SpookyScrollbar and scrollable content
  - Add placeholder text and content blocks to demo (10+ sections)
  - Include installation section with import statement
  - Add basic usage code example with CodeBlock component
  - Create PropsTable with children and className props
  - Style page consistent with other component documentation
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

-

- [x] 11. Update navigation



  - Add "Spooky Scrollbar" entry to apps/docs/lib/navigation.ts
  - Set href to '/docs/components/spooky-scrollbar'
  - Place in appropriate position in components list (alphabetically)
  - Verify navigation link appears in sidebar
  - _Requirements: 9.1_


- [x] 12. Checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
