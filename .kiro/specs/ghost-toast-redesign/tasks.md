# Implementation Plan

- [x] 1. Create the new GhostToast component with core structure





  - Replace the existing GhostToast.tsx file with the new implementation
  - Implement the SpookyGhostIcon SVG component with all required paths (body, eyes, mouth, hand, tail)
  - Add the blinking animation keyframes for the ghost eyes
  - Set up the basic component structure with proper TypeScript types
  - _Requirements: 1.1, 1.4, 6.1, 6.2_

-

- [x] 2. Implement toast state management and context



  - [x] 2.1 Create ToastContext with proper TypeScript types


    - Define ToastType interface with id, message, type, side, scale, rotation, offsetX
    - Define ToastContextType interface with addToast function
    - Create context with createContext
    - _Requirements: 1.1, 10.3, 10.4_

  - [x] 2.2 Implement GhostToastProvider component


    - Set up toast state array with useState
    - Implement addToast function with randomization logic
    - Implement removeToast function
    - Set up 5-second auto-dismiss timeout
    - Provide context value to children
    - _Requirements: 1.1, 1.2, 1.3, 3.1, 3.2, 3.3, 3.4_

  - [x]* 2.3 Write property test for toast creation


    - **Property 1: Toast creation adds to state**
    - **Validates: Requirements 1.2**

  - [x]* 2.4 Write property test for randomization bounds

    - **Property 4: Scale bounds**
    - **Property 5: Rotation bounds**
    - **Property 6: Offset bounds**
    - **Validates: Requirements 3.2, 3.3, 3.4**

  - [x] 2.5 Implement useGhostToast hook


    - Access ToastContext with useContext
    - Throw error if used outside provider
    - Return context value with proper types
    - _Requirements: 1.1, 10.2_

  - [ ]* 2.6 Write unit test for hook error handling


    - Verify error thrown when used outside provider
    - _Requirements: 1.1_

- [x] 3. Implement GhostToastItem component with animations





  - [x] 3.1 Create GhostToastItem component structure


    - Set up forwardRef component with proper props
    - Implement conditional flex-row/flex-row-reverse based on side
    - Apply randomized scale, rotation, and offsetX from toast object
    - Set up proper z-index layering
    - _Requirements: 3.5, 9.4_

  - [x] 3.2 Implement Framer Motion animations


    - Configure initial animation (150% offset, initial rotation)
    - Configure animate state with spring physics (stiffness 400, damping 25, mass 0.8)
    - Configure exit animation (150% offset, scale 0.8, backIn easing, 0.4s duration)
    - Add layout prop for stack repositioning
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 3.3 Write unit tests for animation configuration
    - Verify initial, animate, and exit props are set correctly
    - Verify spring configuration values
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 3.4 Implement ghost character rendering


    - Render SpookyGhostIcon with proper sizing (w-24 h-24)
    - Apply drop-shadow filter
    - Implement horizontal flip for left-side toasts using scale-x-[-1]
    - Apply negative margin for overlap effect
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 3.5 Write unit tests for ghost rendering
    - Verify SVG elements are present
    - Verify flip class applied for left side
    - Verify drop-shadow applied
    - _Requirements: 6.1, 6.3, 6.4, 6.5_
-

- [x] 4. Implement speech bubble and theming




  - [x] 4.1 Create speech bubble container


    - Implement rounded container with backdrop-blur
    - Apply max-w-xs constraint
    - Implement conditional rounded corner removal (rounded-tr-none or rounded-tl-none)
    - Add padding and shadow
    - _Requirements: 7.1_

  - [x] 4.2 Implement theme system


    - Create theme configuration for 'info' type (purple colors)
    - Create theme configuration for 'curse' type (red colors)
    - Apply theme colors to background, border, and text
    - Default to 'info' when type not specified
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 4.3 Write property test for theme consistency
    - **Property 2: Theme consistency**
    - **Validates: Requirements 2.4**

  - [x] 4.4 Implement connection arrow


    - Create triangular arrow div with absolute positioning
    - Position at vertical center (top-6)
    - Implement conditional positioning (left vs right edge)
    - Match arrow colors to speech bubble theme
    - Use rotate-45 transform with conditional border sides
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 4.5 Write property test for arrow color matching
    - **Property 9: Arrow color matching**
    - **Validates: Requirements 7.4**

  - [x] 4.6 Implement message content and close button


    - Render message text with proper styling
    - Implement close button with X icon from lucide-react
    - Add click handler to call removeToast
    - Implement hover opacity transition (40% to 100%)
    - Position button in top-right of speech bubble
    - _Requirements: 5.1, 5.2, 5.4_

  - [ ]* 4.7 Write unit test for manual dismissal
    - Verify clicking close button removes toast
    - _Requirements: 5.1_

  - [ ]* 4.8 Write property test for dismissal
    - **Property 8: Dismissal removes from state**
    - **Validates: Requirements 5.2**

- [x] 5. Implement GhostToastContainer



- [ ] 5. Implement GhostToastContainer
  - Create fixed-position container component
  - Apply pointer-events-none to container
  - Apply pointer-events-auto to individual toasts
  - Set up flex-col with justify-end for bottom stacking
  - Set z-index to 9999
  - Wrap toast items in AnimatePresence with mode="popLayout"
  - Include inline style tag for blink animation keyframes
  - _Requirements: 1.5, 9.1, 9.4_

- [ ]* 5.1 Write unit tests for container structure
  - Verify pointer-events classes
  - Verify fixed positioning
  - Verify z-index
  - _Requirements: 1.5, 9.1, 9.4_
-

- [x] 6. Checkpoint - Ensure component tests pass




  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 6.1 Write property tests for randomization
  - **Property 3: Side randomization produces both values**
  - **Property 7: Independent randomization**
  - **Validates: Requirements 3.1, 3.5**

-

- [x] 7. Update package exports


  - Export GhostToastProvider as named export from component file
  - Export useGhostToast as named export from component file
  - Update src/components/index.ts to include new exports
  - Update src/index.ts to re-export from components
  - Verify TypeScript types are exported correctly
  - _Requirements: 10.1, 10.2_

- [ ]* 7.1 Write unit test for exports
  - Verify GhostToastProvider is exported
  - Verify useGhostToast is exported
  - _Requirements: 10.1, 10.2_



- [x] 8. Create documentation demo component


  - [x] 8.1 Create DemoControls component


    - Implement "Summon Spirit" button that triggers 'info' toast
    - Implement "Invoke Curse" button that triggers 'curse' toast
    - Style buttons with appropriate theme colors
    - Add descriptive heading and subtitle
    - _Requirements: 8.1, 8.5_

  - [x] 8.2 Create demo page layout


    - Set up full-screen container with dark background
    - Add background texture/gradient
    - Wrap DemoControls in GhostToastProvider
    - Center content vertically and horizontally
    - _Requirements: 8.1_

-

- [x] 9. Update documentation page


  - [x] 9.1 Update ghost-toast page.tsx


    - Replace old demo with new DemoControls component
    - Update code examples to show new API (addToast, useGhostToast)
    - Update import statements in examples
    - Remove references to old API (showToast, useToast)
    - _Requirements: 8.2_

  - [x] 9.2 Update API documentation


    - Document GhostToastProvider props (children)
    - Document useGhostToast hook return value (addToast function)
    - Document addToast function signature (message, type)
    - Document toast types ('info', 'curse')
    - Create PropsTable for provider props
    - Create PropsTable for hook API
    - _Requirements: 8.3, 8.4_

  - [x] 9.3 Add usage examples


    - Show basic provider setup example
    - Show hook usage example
    - Show both toast types in examples
    - Include TypeScript type annotations
    - _Requirements: 8.2_

  - [x] 9.4 Add migration guide section


    - Document API changes from old component
    - Provide before/after code examples
    - List breaking changes
    - Suggest migration strategies
    - _Requirements: 8.2_
-

- [x] 10. Accessibility improvements




  - Add aria-label to close button ("Dismiss notification" or similar)
  - Verify pointer-events configuration allows proper interaction
  - Test keyboard navigation doesn't break
  - Ensure sufficient color contrast in both themes
  - _Requirements: 9.1, 9.3_

- [ ]* 10.1 Write accessibility tests
  - Verify close button has aria-label
  - Verify pointer-events configuration
  - _Requirements: 9.3_

-

- [x] 11. Final checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.
  - Verify component builds successfully
  - Verify documentation site builds successfully
  - Test component in documentation demo
