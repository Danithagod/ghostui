# Implementation Plan

- [x] 1. Update BloodSmear component with new implementation
  - Replace the existing BloodSmear.tsx with the upgraded version
  - Implement the DripEdge SVG component inline
  - Implement the cn utility function for class merging
  - Update the BloodSmearProps interface (isNavigating, onComplete)
  - Implement the main animation with viscous easing [0.45, 0, 0.55, 1]
  - Set animation duration to 2.5 seconds with y: -100% to y: 200%
  - Add solid blood block layer with #991b1b color
  - Add DripEdge component at bottom with responsive height (h-48 md:h-64)
  - Add 3 droplet particles with unique speeds and positions
  - Use AnimatePresence with mode="wait" and onExitComplete callback
  - Apply z-index 100 and pointer-events-none to overlay
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4_

- [ ]* 1.1 Write property test for navigation state rendering
  - **Property 1: Navigation state controls rendering**
  - **Validates: Requirements 1.1, 1.3, 5.1**

- [ ]* 1.2 Write property test for callback invocation
  - **Property 2: Callback invocation on completion**
  - **Validates: Requirements 1.2, 5.2**

- [ ]* 1.3 Write property test for consistent blood color
  - **Property 3: Consistent blood color**
  - **Validates: Requirements 2.4**

- [ ]* 1.4 Write property test for droplet count
  - **Property 4: Minimum droplet count**
  - **Validates: Requirements 4.1**

- [ ]* 1.5 Write property test for unique droplet speeds
  - **Property 5: Unique droplet speeds**
  - **Validates: Requirements 4.2**

- [ ]* 1.6 Write property test for droplet vertical scaling
  - **Property 6: Droplet vertical scaling**
  - **Validates: Requirements 4.3**

- [ ]* 1.7 Write property test for infinite droplet animation
  - **Property 7: Infinite droplet animation**
  - **Validates: Requirements 4.4**

- [ ]* 1.8 Write unit tests for component configuration
  - Test z-index is 100
  - Test pointer-events-none is applied
  - Test animation duration is 2.5 seconds
  - Test easing function is [0.45, 0, 0.55, 1]
  - Test animation moves from y: -100% to y: 200%
  - Test AnimatePresence mode is "wait"
  - Test droplet positions are at 20%, 60%, 85%
  - Test DripEdge has preserveAspectRatio="none"
  - Test DripEdge has drop-shadow effect
  - _Requirements: 1.4, 1.5, 2.1, 2.2, 2.3, 3.3, 3.4, 3.5, 4.5, 5.3_

- [x] 2. Update component exports
  - Export BloodSmear component from packages/ghostui/src/components/index.ts
  - Export BloodSmearProps interface
  - Ensure DripEdge remains internal (not exported)
  - Verify backward compatibility of component name
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ]* 2.1 Write unit tests for exports
  - Test BloodSmear is exported from main index
  - Test BloodSmearProps interface is exported
  - Test DripEdge is not exported
  - Test component name is "BloodSmear"
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 3. Create demo application with page navigation
  - Define PAGES configuration with 'safe' and 'danger' pages
  - Implement page state management (currentPage, isNavigating)
  - Create handleNavigate function with timing coordination
  - Swap content at 1000ms (halfway through transition)
  - Reset navigation state at 2500ms (after completion)
  - Disable navigation buttons during active transitions
  - Add icons from lucide-react (ShieldAlert, Skull, HeartPulse)
  - Style pages with distinct themes (light/dark)
  - Add motion animations for page content (fade in/scale)
  - Add status indicator showing navigation state
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 3.1 Write property test for navigation triggering
  - **Property 8: Navigation triggers transition**
  - **Validates: Requirements 6.2**

- [ ]* 3.2 Write property test for navigation state reset
  - **Property 9: Navigation state reset**
  - **Validates: Requirements 6.4**

- [ ]* 3.3 Write property test for button disabling
  - **Property 10: Button disabling during transition**
  - **Validates: Requirements 6.5**

- [ ]* 3.4 Write unit tests for demo application
  - Test two page configurations exist
  - Test content swap timing occurs around 1000ms
  - _Requirements: 6.1, 6.3_

- [x] 4. Update documentation page
  - Update apps/docs/app/docs/components/blood-smear/page.tsx
  - Replace simple demo with full navigation demo application
  - Update component description to reflect page transition purpose
  - Update code example to show isNavigating/onComplete usage
  - Update props table with new props (remove old direction/duration props)
  - Add usage notes about timing content swaps during transitions
  - Include note about the 1000ms content swap timing
  - Add examples showing state management patterns
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 4.1 Write unit tests for documentation page
  - Test component description is present
  - Test interactive demo renders
  - Test code example is present
  - Test props table includes isNavigating and onComplete
  - Test usage notes about timing are present
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5. Implement cn utility function
  - Create cn function that combines clsx and twMerge
  - Ensure it handles conditional classes
  - Ensure it resolves Tailwind class conflicts
  - Add className prop support to BloodSmear (optional)
  - Add className prop support to DripEdge (optional)
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ]* 5.1 Write property test for class name merging
  - **Property 11: Class name merging**
  - **Validates: Requirements 9.2**

- [ ]* 5.2 Write property test for custom className application
  - **Property 12: Custom className application**
  - **Validates: Requirements 9.3, 9.4**

- [ ] 6. Install required dependencies
  - Verify framer-motion is installed (should already be present)
  - Verify clsx is installed
  - Verify tailwind-merge is installed
  - Verify lucide-react is installed (for demo icons)
  - Install fast-check for property-based testing (dev dependency)
  - Install vitest and testing libraries if not present
  - _Requirements: All (dependencies)_

- [ ]* 6.1 Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Final verification and cleanup
  - Build the ghostui package and verify no errors
  - Start the docs dev server and verify the component renders correctly
  - Test the interactive demo in the browser
  - Verify all navigation flows work as expected
  - Check that the blood animation appears smooth and viscous
  - Verify droplets animate independently
  - Test on different screen sizes (mobile/desktop)
  - _Requirements: All_
