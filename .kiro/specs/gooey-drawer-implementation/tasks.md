# Implementation Plan

- [x] 1. Set up component file structure and core types





  - Create `packages/ghostui/src/components/GooeyDrawer.tsx` with 'use client' directive
  - Define TypeScript interfaces: `GooeyDrawerProps`, `Placement` type, `DripConfig` interface
  - Add imports for React, Framer Motion, Lucide icons, and utility functions
  - Set up component skeleton with React.forwardRef (if needed) or functional component
  - _Requirements: 1.1, 15.1, 15.3, 15.5, 15.6_



- [x] 2. Implement DrawerStyles component for global CSS



  - Create `DrawerStyles` functional component that returns style tag
  - Add Google Fonts import for Creepster font
  - Define CSS custom properties (--goo-bg, --goo-bg-dark, --goo-highlight) with violet defaults
  - Add .font-creep utility class
  - Add .no-scrollbar utility class with webkit and standard scrollbar hiding

  - _Requirements: 10.2, 10.3, 9.3_


- [x] 3. Implement GooeyMesh component with drip generation



  - Create `GooeyMesh` functional component
  - Generate array of 12 drip configurations with randomized properties:
    - Width: 15-45px (Math.random() * 30 + 15)
    - Initial height: 20-60px (Math.random() * 40 + 20)
    - Left position: 10-90% (Math.random() * 80 + 10)
    - Duration: 2-4s (Math.random() * 2 + 2)
    - Delay: 0-2s (Math.random() * 2)
    - Stretch: 30-80px (Math.random() * 50 + 30)
  - Render main background shape with rounded-[2rem] and bg-[var(--goo-bg)]
  - Map over drip configs to render motion.div elements with animation
  - Add 2 static bulge elements at bottom with varied sizes
  - _Requirements: 4.1, 4.3, 4.4, 4.6, 4.7, 4.8, 4.9_

- [ ]* 3.1 Write property test for drip timing variation
  - **Property 5: Drip timing variation**
  - **Validates: Requirements 4.3, 4.4**
  - Generate: Render GooeyDrawer and extract drip configurations from GooeyMesh
  - Test: All delays are between 0-2s, all durations are between 2-4s
  - Verify: Each drip has unique timing values for natural variation
  - Use fast-check with 100+ iterations

- [ ]* 3.2 Write property test for drip positioning constraints
  - **Property 6: Drip positioning constraints**
  - **Validates: Requirements 4.7**
  - Generate: Render GooeyDrawer and extract drip left positions
  - Test: All left positions are between 10% and 90%
  - Use fast-check with 100+ iterations

- [ ]* 3.3 Write property test for drip dimension constraints
  - **Property 7: Drip dimension constraints**
  - **Validates: Requirements 4.8, 4.9**

  - Generate: Render GooeyDrawer and extract drip widths and stretch values
  - Test: All widths are 15-45px, all stretch values are 30-80px
  - Use fast-check with 100+ iterations


- [x] 4. Implement SVG filter definition



  - Create SVG element with absolute positioning and w-0 h-0 (hidden)
  - Add aria-hidden="true" to SVG element
  - Generate unique filter ID using React.useId() with sanitization (replace colons)
  - Define filter with id="goo-drawer-{filterId}"
  - Implement filter pipeline stages:
    - feGaussianBlur: stdDeviation="10", result="blur"
    - feColorMatrix: values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9", result="goo"
    - feGaussianBlur: in="goo", stdDeviation="2", result="smoothGoo"
    - feSpecularLighting: surfaceScale="4", specularConstant="1.3", specularExponent="30", result="specular"
    - feDistantLight: azimuth="225", elevation="55"
    - feComposite stages for combining effects
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [ ]* 4.1 Write property test for unique filter IDs
  - **Property 8: Unique filter IDs**
  - **Validates: Requirements 5.1**
  - Generate: Random number of GooeyDrawer instances (2-10)
  - Test: All filter IDs are unique across instances
  - Use fast-check with 100+ iterations

- [ ]* 4.2 Write property test for accessibility attributes
  - **Property 9: Accessibility attributes**
  - **Validates: Requirements 5.8, 11.4**
  - Generate: Random drawer configuration
  - Test: SVG filter has aria-hidden="true", close button has accessible label
  - Use fast-check with 100+ iterations


- [x] 5. Implement placement-based positioning and animation variants




  - Define `positionClasses` object mapping placement to Tailwind classes:
    - right: "fixed top-1/2 right-8 h-[70vh] w-[350px] -translate-y-1/2"
    - left: "fixed top-1/2 left-8 h-[70vh] w-[350px] -translate-y-1/2"
    - bottom: "fixed bottom-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2"
    - top: "fixed top-8 left-1/2 w-[80vw] max-w-2xl h-[50vh] -translate-x-1/2"
  - Create animation variants object with hidden, visible, and exit states
  - Calculate x/y transforms based on placement (120% for off-screen)
  - Set scale transitions (0.8 ↔ 1.0) and opacity (0 ↔ 1)
  - Configure spring physics: damping=25, stiffness=180, mass=0.8
  - Configure exit transition: duration=0.3, ease="anticipate"
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 10.4_

- [ ]* 5.1 Write property test for placement positioning
  - **Property 4: Placement affects positioning**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 10.4**
  - Generate: Random placement value from ['right', 'left', 'top', 'bottom']
  - Test: Rendered drawer has appropriate positioning classes for that placement

  - Use fast-check with 100+ iterations


- [x] 6. Implement main GooeyDrawer component structure



  - Create main component function accepting GooeyDrawerProps
  - Destructure props with default placement="right"
  - Generate unique filter ID using React.useId()
  - Return AnimatePresence wrapper checking isOpen prop
  - Render backdrop motion.div when isOpen is true
  - Render drawer container motion.div with variants
  - Apply positionClasses based on placement prop
  - _Requirements: 1.2, 1.3, 2.5, 15.1, 15.2, 15.3_

- [ ]* 6.1 Write property test for drawer visibility
  - **Property 1: Drawer visibility matches isOpen prop**
  - **Validates: Requirements 1.2, 1.3**
  - Generate: Random isOpen boolean, random placement, random children

  - Test: When isOpen=true, drawer is in DOM; when isOpen=false, drawer is not in DOM
  - Use fast-check with 100+ iterations


- [x] 7. Implement backdrop with click-to-close


  - Create backdrop motion.div with fixed inset-0 positioning
  - Apply z-40 for proper stacking
  - Add background: bg-[#05020a]/60 (semi-transparent black)
  - Add backdrop-blur-sm for depth effect
  - Add cursor-pointer for UX feedback
  - Attach onClick handler that calls onClose callback
  - Configure fade animation: initial opacity=0, animate opacity=1, exit opacity=0
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ]* 7.1 Write property test for backdrop presence
  - **Property 11: Backdrop presence**
  - **Validates: Requirements 7.1**
  - Generate: Random drawer configuration with isOpen=true
  - Test: Backdrop element exists with fixed positioning and inset-0

  - Use fast-check with 100+ iterations


- [x] 8. Implement liquid layer with filter application



  - Create container div with absolute inset-0 positioning
  - Apply filter style: `filter: url(#goo-drawer-${filterId})`
  - Set z-index to 0 (behind content)
  - Render GooeyMesh component inside
  - Ensure overflow is visible for drips to extend beyond bounds
  - _Requirements: 6.1, 6.2_

- [ ]* 8.1 Write property test for layer separation
  - **Property 10: Layer separation**
  - **Validates: Requirements 6.1, 6.2**
  - Generate: Random drawer configuration
  - Test: Liquid layer has filter style, content layer doesn't, z-index ordering correct

  - Use fast-check with 100+ iterations


- [x] 9. Implement content layer with header and body


  - Create content container with relative positioning and z-10
  - Apply rounded-[2rem] to match liquid shape
  - Add border border-white/5 and bg-black/10
  - Apply backdrop-blur-[2px] for subtle depth
  - Structure as flex flex-col for header/body layout
  - Add padding p-1 to outer container
  - _Requirements: 6.3, 6.4, 6.5_

- [x] 10. Implement drawer header

  - Create header section with p-5 padding
  - Add border-b border-white/10 separator
  - Use flex items-center justify-between layout
  - Add left side: icon (Ghost from lucide-react) + "Possession" title
  - Style icon with p-2 bg-purple-900/40 rounded-lg
  - Style title with font-creep text-2xl text-white
  - Add right side: close button with X icon
  - Style close button with hover states
  - Attach onClick handler to close button calling onClose
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ]* 10.1 Write property test for header structure
  - **Property 12: Header structure**
  - **Validates: Requirements 8.1, 8.3**
  - Generate: Random drawer configuration
  - Test: Header element exists containing icon/title section and close button
  - Use fast-check with 100+ iterations


- [x] 11. Implement scrollable body area



  - Create body div with flex-1 to fill remaining space
  - Add overflow-y-auto for vertical scrolling
  - Apply no-scrollbar class to hide scrollbar
  - Add p-5 padding for content spacing
  - Add space-y-3 for spacing between children
  - Render {children} prop inside body
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 11.1 Write property test for scrollable content area
  - **Property 13: Scrollable content area**
  - **Validates: Requirements 9.1**
  - Generate: Random drawer configuration
  - Test: Content area has overflow-y-auto or similar scrolling capability
  - Use fast-check with 100+ iterations

- [ ]* 11.2 Write property test for children rendering
  - **Property 2: Children content is rendered**
  - **Validates: Requirements 1.4**
  - Generate: Random React children (strings, numbers, elements)
  - Test: All children appear in rendered output within content area
  - Use fast-check with 100+ iterations


- [x] 12. Implement border overlay for crisp edges



  - Create absolute inset-0 div with pointer-events-none
  - Apply rounded-[2rem] to match shape
  - Add border border-white/5 for subtle edge definition
  - Set z-20 to render above content
  - Add shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] for inner glow
  - Add mix-blend-overlay for blending effect
  - _Requirements: 6.5_



- [x] 13. Implement custom className support



  - Accept className prop in GooeyDrawerProps
  - Apply className to drawer container using cn() utility
  - Ensure custom classes merge properly with default classes
  - _Requirements: 10.1, 15.2_

- [ ]* 13.1 Write property test for custom className application
  - **Property 14: Custom className application**
  - **Validates: Requirements 10.1**
  - Generate: Random valid className strings
  - Test: className appears in rendered drawer container's class list
  - Use fast-check with 100+ iterations



- [x] 14. Implement keyboard event handling



  - Add useEffect hook to listen for Escape key
  - Attach keydown event listener to document when drawer is open
  - Check if event.key === 'Escape' and call onClose
  - Clean up event listener on unmount or when isOpen changes
  - _Requirements: 11.2_

- [ ]* 14.1 Write property test for close callback invocation
  - **Property 3: Close callback invocation**
  - **Validates: Requirements 1.5, 7.6, 8.4, 11.2**
  - Generate: Random mock callback function
  - Test: Callback is invoked for backdrop click, close button click, and Escape key

  - Use fast-check with 100+ iterations


- [x] 15. Add component exports to library



  - Open `packages/ghostui/src/components/index.ts`
  - Add export statement: `export { GooeyDrawer, type GooeyDrawerProps } from './GooeyDrawer';`
  - Verify TypeScript compilation succeeds
  - Verify component is available from 'ghostui-react' import
  - _Requirements: 13.1, 13.2, 13.3, 13.4_




- [x] 16. Add displayName for React DevTools


  - Set `GooeyDrawer.displayName = 'GooeyDrawer';` after component definition

  - _Requirements: 13.5, 15.1_


- [x] 17. Create documentation page structure



  - Create `apps/docs/app/docs/components/gooey-drawer/page.tsx`
  - Add 'use client' directive
  - Import GooeyDrawer from 'ghostui-react'
  - Import ComponentPlayground and PropsTable from docs components

  - Set up main page component with space-y-12 container
  - _Requirements: 12.1, 14.1, 14.3_

- [x] 18. Write documentation: Header and overview




  - Add H1 with component name "GooeyDrawer" using style guide typography

  - Write lead paragraph describing the component's purpose
  - Highlight key features: liquid drips, SVG filters, four placements, spring animations
  - _Requirements: 12.1_

- [x] 19. Write documentation: Basic usage section



  - Create props data array with all GooeyDrawerProps

  - Write basic usage code example showing controlled component pattern
  - Create ComponentPlayground with interactive demo
  - Include PropsTable in api prop
  - _Requirements: 12.2, 12.3_

- [x] 20. Write documentation: Placement options section




  - Add H2 "Placement Options"
  - Write explanation of four placement values
  - Create interactive demo with buttons for each placement
  - Show code example demonstrating placement prop
  - _Requirements: 12.4_

- [x] 21. Write documentation: Custom content section




  - Add H2 "Custom Content"
  - Show examples with different content layouts (menu items, forms, notifications)
  - Demonstrate scrollable content with long lists
  - Provide code examples for each layout
  - _Requirements: 12.5_



- [x] 22. Write documentation: How it works section


  - Add H2 "How It Works"
  - Explain SVG filter pipeline with bullet points for each stage
  - Describe layer separation architecture
  - Explain drip animation system
  - Include visual diagram or code snippet showing filter stages
  - _Requirements: 12.6_

- [x] 23. Write documentation: Accessibility section





  - Add H2 "Accessibility"
  - Document keyboard navigation (Escape to close)
  - Explain screen reader support (aria-hidden on SVG)
  - Mention reduced motion support for drip animations
  - Provide accessibility best practices
  - _Requirements: 12.7_



- [x] 24. Write documentation: Real-world examples section



  - Add H2 "Real-World Examples"
  - Create navigation drawer example
  - Create notification panel example
  - Create settings panel example
  - Provide complete code for each example

  - _Requirements: 12.8_

- [x] 25. Add component to documentation navigation




  - Open `apps/docs/lib/navigation.ts`
  - Add "Gooey Drawer" entry to components array
  - Set path to '/docs/components/gooey-drawer'
  - Position alphabetically between other components

  - Verify navigation renders correctly
  - _Requirements: 14.1, 14.2, 14.4, 14.5_


- [x] 26. Write unit tests for component rendering



  - Create `packages/ghostui/src/components/GooeyDrawer.test.tsx`
  - Test: Drawer renders when isOpen is true
  - Test: Drawer does not render when isOpen is false
  - Test: Children content appears in output
  - Test: Header with close button is present
  - Test: Backdrop is rendered when open
  - Test: Correct placement classes applied for each placement
  - Test: Custom className is applied
  - Test: Default placement is 'right'
  - _Requirements: Testing Strategy - Unit Tests_


- [x] 27. Write unit tests for interactions



  - Test: Close button click invokes onClose
  - Test: Backdrop click invokes onClose
  - Test: Escape key press invokes onClose
  - Test: Multiple drawers have unique filter IDs
  - _Requirements: Testing Strategy - Unit Tests_



- [x] 28. Checkpoint - Ensure all tests pass



  - Run all unit tests and verify they pass
  - Run all property-based tests and verify they pass
  - Fix any failing tests
  - Ensure no TypeScript errors
  - Ask the user if questions arise


- [x] 29. Manual testing and polish




  - Test all four placements visually
  - Verify drip animations are smooth
  - Test backdrop click and close button
  - Test Escape key functionality
  - Verify scrolling works with long content
  - Test on different screen sizes
  - Verify documentation page renders correctly
  - Test navigation link works
  - _Requirements: All functional requirements_


- [x] 30. Final validation



  - Run full test suite (unit + property tests)
  - Verify TypeScript compilation with no errors
  - Check accessibility with automated tools
  - Verify documentation follows style guide
  - Confirm all exports work correctly
  - Test in documentation app
  - _Requirements: All requirements_
