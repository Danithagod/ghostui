# Implementation Plan

- [x] 1. Create HauntedSidebar component with core structure




  - Create HauntedSidebar.tsx file in packages/ghostui/src/components/
  - Define TypeScript interfaces for HauntedSidebarProps and MenuItem
  - Implement inline cn utility function for className merging
  - Set up component with basic props destructuring and default values
  - Create DEFAULT_MENU_ITEMS constant with themed navigation items
  - _Requirements: 1.1, 1.3, 2.1, 2.2, 2.3, 2.4, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

- [x] 2. Implement GooFilter SVG component





  - Create GooFilter sub-component with SVG filter definition
  - Implement feGaussianBlur with stdDeviation 8 for initial blur
  - Implement feColorMatrix for edge hardening
  - Implement feGaussianBlur with stdDeviation 2 for smooth goo
  - Implement feSpecularLighting with surfaceScale 5, specularConstant 1.2, specularExponent 20
  - Add fePointLight with coordinates x=-100, y=-200, z=300
  - Implement feComposite operations to layer highlights over goo
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

-

- [x] 3. Implement WanderingGhost background animation



  - Create WanderingGhost sub-component using Framer Motion
  - Set initial position to x: "-100%", y: "20%", scale: 0.5, rotate: 10
  - Animate x from -100% to 400% over 25 seconds
  - Animate y between ["20%", "40%", "10%"]
  - Animate rotation between [-5, 5, -5] degrees
  - Configure infinite repeat with linear easing
  - Render Ghost icon at size 120 with white/5 opacity
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 4. Build sidebar container and background layers





  - Create main container with w-72, h-[650px], bg-[#0c0a0f]
  - Apply rounded-r-2xl, border-r, border-white/5, shadow-2xl
  - Add wood texture overlay with 10% opacity
  - Add gradient overlay from black/80 via transparent to black/80
  - Position WanderingGhost in background layer
  - Set up relative positioning for layered architecture
  - _Requirements: 10.6, 10.7, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [x] 5. Implement header section



  - Create header with title prop (default "MANOR")
  - Add Skull icon next to title
  - Create subtitle with uppercase tracking (default "Navigation")
  - Apply font-serif and tracking-widest to title
  - Style with text-gray-200 for title, text-gray-600 for subtitle
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_


- [x] 6. Implement state management




  - Create internalActiveId state with useState
  - Create hoveredId state for hover tracking
  - Implement derived activeId (controlled or uncontrolled)
  - Handle activeId prop for controlled mode
  - Handle onActiveChange callback invocation
  - _Requirements: 3.1, 3.2, 3.3, 17.4_
-

- [x] 7. Implement blob position calculation




  - Create calculateBlobPosition function using index * 52
  - Calculate positions for Head, Tail, and Drip blobs
  - Apply top positioning using inline styles
  - Handle invalid activeId gracefully (no blob rendering)
  - _Requirements: 7.1, 7.5, 17.2_

- [x] 8. Build filter layer with blob system





  - Create absolute positioned container for filter layer
  - Apply CSS filter: url(#sidebar-goo-3d)
  - Render Head blob with layoutId="active-blob-head"
  - Configure Head blob: full width, left 0, spring stiffness 350, damping 30
  - Render Tail blob with layoutId="active-blob-tail"
  - Configure Tail blob: 75% width, left 16px, stiffness 120, damping 18, mass 3
  - Render Drip blob with layoutId="active-blob-drip"
  - Configure Drip blob: 40px width, left 40px, top offset +8px, stiffness 80, damping 20, mass 5, delay 0.05
  - Apply bg-gray-700 and rounded styles to all blobs
  - Only render blobs when activeId matches a menu item
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.5, 7.2, 7.3, 7.4_

- [x] 9. Build content layer with interactive buttons





  - Create relative positioned container for content layer (z-10)
  - Map over menuItems to render button elements
  - Apply semantic button element with proper accessibility
  - Implement onClick handler to update active state and call onActiveChange
  - Implement onMouseEnter to set hoveredId
  - Implement onMouseLeave to clear hoveredId
  - Apply conditional styling based on isActive state
  - Apply hover styles with text-gray-300 color
  - Ensure buttons are keyboard navigable with proper focus styles
  - _Requirements: 6.1, 6.3, 6.4, 8.1, 8.4, 8.5, 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 10. Implement menu item icon animations




  - Wrap icon in motion.div with animate prop
  - Apply scale 1.1 and translateX 4px when active
  - Apply translateX 2px when hovered but not active
  - Apply scale 1 and translateX 0 when neither active nor hovered
  - Add transition-colors class for smooth color changes
  - Handle menu items without icons gracefully
  - _Requirements: 9.1, 9.2, 9.3, 17.5_
-

- [x] 11. Implement hover indicator



  - Render hover indicator when isHovered && !isActive
  - Use motion.div with initial opacity 0, x: -5
  - Animate to opacity 1, x: 0
  - Position absolute on right side
  - Style as small dot: w-1.5, h-1.5, rounded-full, bg-gray-600
  - _Requirements: 8.2, 8.3_

- [x] 12. Implement footer section





  - Create footer with pt-6, border-t, border-white/5
  - Add Configuration button with Settings icon
  - Add Abandon button with LogOut icon
  - Apply hover styles: text color change and bg tint
  - Use red-900 color scheme for Abandon button
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 13. Export component from library





  - Add export to packages/ghostui/src/components/index.ts
  - Export both HauntedSidebar component and HauntedSidebarProps type
  - Verify component is available as named export from ghostui-react
  - _Requirements: 1.2, 1.4_

- [ ]* 14. Write unit tests for HauntedSidebar
  - Test component renders without crashing
  - Test default menu items render when no props provided
  - Test custom menu items render correctly
  - Test header and footer render with correct content
  - Test clicking menu item updates active state
  - Test clicking menu item calls onActiveChange callback
  - Test hovering menu item shows hover indicator
  - Test keyboard navigation (Tab, Enter, Space)
  - Test controlled mode with activeId prop
  - Test uncontrolled mode without activeId prop
  - Test custom title and subtitle render
  - Test className prop merges correctly
  - Test empty menuItems array edge case
  - Test invalid activeId edge case
  - Test menu items without icons
  - Test missing optional props

- [ ]* 15. Write property-based tests
  - Configure fast-check with menuItem and menuItems generators
  - Set all property tests to run minimum 100 iterations

- [ ]* 15.1 Write property test for menu item rendering
  - **Property 1: Menu item rendering completeness**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [ ]* 15.2 Write property test for active state highlighting
  - **Property 2: Active state highlighting**
  - **Validates: Requirements 3.1**

- [ ]* 15.3 Write property test for click callback
  - **Property 3: Click callback invocation**
  - **Validates: Requirements 3.2**

- [ ]* 15.4 Write property test for blob positioning
  - **Property 4: Blob position calculation**
  - **Validates: Requirements 7.1**

- [ ]* 15.5 Write property test for hover state
  - **Property 5: Hover state management**
  - **Validates: Requirements 8.1, 8.5**

- [ ]* 15.6 Write property test for hover indicator
  - **Property 6: Hover indicator visibility**
  - **Validates: Requirements 8.2**

- [ ]* 15.7 Write property test for hover text color
  - **Property 7: Hover text color change**
  - **Validates: Requirements 8.4**

- [ ]* 15.8 Write property test for custom title
  - **Property 11: Custom title rendering**
  - **Validates: Requirements 12.1**

- [ ]* 15.9 Write property test for uncontrolled mode
  - **Property 13: Uncontrolled mode state updates**
  - **Validates: Requirements 17.4**

- [ ]* 15.10 Write property test for keyboard navigation
  - **Property 15: Keyboard navigation**
  - **Validates: Requirements 18.2**

- [x] 16. Create documentation page




  - Create page.tsx at apps/docs/app/docs/components/haunted-sidebar/
  - Import HauntedSidebar from ghostui-react
  - Import ComponentPlayground and PropsTable components
  - Create props table data with all HauntedSidebarProps properties
  - Write component description and overview
  - Create basic usage code example
  - Create controlled mode example with activeId and onActiveChange
  - Create uncontrolled mode example
  - Create custom menu items example
  - Create custom title/subtitle example
  - Add section explaining the blob animation system
  - Add section explaining the goo filter technical details
  - Add section on accessibility features
  - Add section on customization options
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9_

- [x] 17. Update documentation navigation




  - Open apps/docs/components/Sidebar.tsx
  - Add HauntedSidebar entry to Components section navigation array
  - Use href: '/docs/components/haunted-sidebar'
  - Use Sparkles icon for consistency
  - Ensure alphabetical ordering within Components section
  - _Requirements: 15.1, 15.2, 15.3, 15.4_
-

- [x] 18. Final checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
