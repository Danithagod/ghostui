# Implementation Plan

- [x] 1. Set up inline utilities and remove external dependencies
  - Remove import of `cn` from `../lib/utils`
  - Define inline `cn` function within the component file using clsx and tailwind-merge
  - Remove `WithTooltipProps` interface import from `../types/tooltip`
  - Remove `SpookyTooltip` component import
  - Update `GooeyButtonProps` interface to remove tooltip-related properties
  - _Requirements: 10.1, 10.4, 8.1, 8.3_

- [x] 2. Update fluidity configuration values
  - Modify `fluiditySettings` object to use new displacement values: low=15, medium=25, high=35
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 3. Implement enhanced SVG filter with specular lighting
  - Add `feGaussianBlur` for goo blur result
  - Add `feSpecularLighting` element with surfaceScale=3, specularConstant=1.2, specularExponent=20
  - Add `feDistantLight` child element with azimuth=225, elevation=45
  - Add `feComposite` to composite specular onto goo using "in" operator
  - Add final `feComposite` to overlay specular on goo using "over" operator
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 4. Restructure component to layer-based architecture
  - Create outer container div with hover state management (onMouseEnter/onMouseLeave)
  - Move SVG filter definition to be first child of container
  - Create glow ring div as second child with negative z-index styling
  - Create filter layer div as third child with `filter: url(#${filterId})` style
  - Move button element outside filter layer as fourth child (content layer)
  - Ensure content layer button uses absolute positioning to overlap filter layer
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Implement body wobble animation
  - Create `bodyVariants` with initial, hover, and tap states
  - Apply wobble animation to button body div inside filter layer (not the button element)
  - Use motion.div for animated button body with scale oscillation [1, 1.02, 0.98, 1.01, 1]
  - Configure animation with duration=1.5s, repeat=Infinity, repeatType="mirror"
  - Apply tap variant with scale=0.95 on button interaction
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 5.1 Write property test for body wobble animation
  - **Property 1: Hover triggers body animation**
  - **Property 2: Hover off returns to initial state**
  - **Property 3: Tap applies scale feedback**
  - **Validates: Requirements 2.1, 2.4, 2.5**

- [x] 6. Implement click splash effect
  - Add `clickKey` state initialized to 0
  - Create `handleClick` function that increments clickKey and calls user onClick
  - Add `AnimatePresence` wrapper inside filter layer
  - Create splash motion.div keyed by clickKey
  - Configure splash animation: initial scale=0.8/opacity=1, animate scale=1.8/opacity=0
  - Set animation duration to 0.6s with easeOut easing
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 9.1, 9.2, 9.3, 9.4_

- [ ]* 6.1 Write property test for click splash effect
  - **Property 4: Click triggers splash animation**
  - **Property 5: Splash cleanup after animation**
  - **Property 6: Multiple clicks create independent splashes**
  - **Property 14: Click increments state**
  - **Property 15: onClick handler invoked with event**
  - **Property 16: Splash without onClick handler**
  - **Validates: Requirements 3.1, 3.3, 3.4, 9.1, 9.2, 9.3, 9.4**

- [x] 7. Update drip element positioning and animation
  - Move drip elements inside filter layer
  - Update drip positions to bottom: '50%' (inside button boundary)
  - Add transformOrigin: 'top' to drip style objects
  - Update `createDripVariants` to include scaleY: [1, 1.5, 1] and scaleX: [1, 0.8, 1]
  - Position drips at left: '25%', '50%', '75%'
  - Update drip sizes to w-4 h-4, w-6 h-6, w-4 h-4
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.4_

- [x] 8. Enhance glow ring with hover responsiveness
  - Update glow ring classes to include transition-all duration-300
  - Add conditional opacity classes: isHovered ? 'opacity-100' : 'opacity-60'
  - Add conditional scale classes: isHovered ? 'scale-105' : 'scale-100'
  - Ensure glow ring has pointer-events-none class
  - _Requirements: 7.1, 7.2, 7.3_

- [ ]* 8.1 Write property test for glow ring behavior
  - **Property 10: Glow ring initial state**
  - **Property 11: Glow ring hover state**
  - **Validates: Requirements 7.1, 7.2**

- [x] 9. Remove tooltip integration
  - Remove conditional tooltip wrapping logic at end of component
  - Remove tooltip-related props destructuring (tooltip, tooltipPosition, tooltipClassName)
  - Return button component directly without conditional wrapping
  - _Requirements: 8.2_

- [ ]* 9.1 Write unit test for tooltip removal
  - Verify GooeyButton doesn't render SpookyTooltip
  - Verify GooeyButton can be manually wrapped with SpookyTooltip
  - _Requirements: 8.2, 8.4_

- [x] 10. Update button element styling and structure
  - Move button element outside filter layer (as content layer)
  - Add relative positioning to button for proper layering
  - Update button classes to include block, w-full, h-full for proper overlay
  - Wrap button text in span with relative z-10 and drop-shadow-sm
  - Add inner highlight div inside button with gradient background
  - Remove motion-safe classes from button (animations now on body div)
  - _Requirements: 4.3_

- [x] 11. Update component documentation
  - Update JSDoc comments to reflect new architecture
  - Document layer-based rendering approach
  - Note removal of tooltip integration
  - Add examples of manual tooltip wrapping if needed
  - Document specular lighting parameters
  - _Requirements: 8.4_

- [ ]* 12. Write unit tests for component structure
  - Test SVG filter elements exist with correct attributes
  - Test filter layer and content layer both render
  - Test three drip elements render at correct positions
  - Test glow ring renders with correct classes
  - Test disabled state applies correct attributes
  - Test all three variants render correctly
  - Test all three fluidity levels configure correctly
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.5, 5.1, 5.4, 7.4_

- [ ]* 13. Write property tests for configuration mapping
  - **Property 7: Fluidity low uses correct displacement**
  - **Property 8: Fluidity medium uses correct displacement**
  - **Property 9: Fluidity high uses correct displacement**
  - **Property 12: Disabled button prevents interaction but shows glow**
  - **Validates: Requirements 6.1, 6.2, 6.3, 7.4**

- [ ]* 14. Write property test for cn utility function
  - **Property 17: cn function merges classes correctly**
  - Test with random combinations of Tailwind classes
  - Verify later classes override earlier conflicting classes
  - **Validates: Requirements 10.2**

- [ ]* 15. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
