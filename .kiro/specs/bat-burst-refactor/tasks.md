# Implementation Plan

- [x] 1. Create BatIcon SVG component





  - Extract BatIcon as a standalone component with exact SVG path from specification
  - Accept className prop for styling customization
  - Use currentColor for fill to support theming
  - Set viewBox to "0 0 512 512"
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 1.1 Write property test for BatIcon className application
  - **Property 2: BatIcon className prop**
  - **Validates: Requirements 7.2**


- [x] 2. Implement JumpscareBat component




  - Create JumpscareBat component with Framer Motion animations
  - Configure initial state: opacity 0, scale 0.2, y 300
  - Configure animate state: opacity 1, scale 5, y 0
  - Configure exit state: opacity 0, scale 8, y -200
  - Set animation duration to 600ms with easing [0.16, 1, 0.3, 1]
  - Apply drop shadow and blur styling effects
  - Position as fixed full-screen overlay with z-index 9999
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
-

- [x] 3. Implement AnimatedBat component with physics




- [x] 3.1 Create AnimatedBat component structure


  - Define AnimatedBatProps interface with id, size, homeX, homeY, opacity, blur, isHovered, mousePos, windowSize
  - Set up component with motion.div for animations
  - Configure spring animations for x, y, and rotate with stiffness 60, damping 15, mass 1
  - _Requirements: 3.3, 4.1, 4.2, 4.3, 4.4_

- [x] 3.2 Implement repulsion physics calculations

  - Convert home position from percentage to pixels using window dimensions
  - Calculate distance vector from bat home position to cursor
  - Implement repulsion logic with 300px radius and 150px strength
  - Calculate force as (repulsionRadius - distance) / repulsionRadius when within radius
  - Apply force to calculate moveX and moveY displacement
  - Calculate rotation based on direction (dx > 0 ? 1 : -1) * force * 45
  - Update spring values with calculated positions and rotation
  - _Requirements: 3.1, 3.2, 3.4, 3.5, 9.5_

- [ ]* 3.3 Write property test for repulsion force calculation
  - **Property 2: Repulsion force inversely proportional to distance**
  - **Validates: Requirements 3.1, 3.2**

- [ ]* 3.4 Write property test for rotation direction
  - **Property 4: Rotation direction matches repulsion**
  - **Validates: Requirements 3.5**

- [ ]* 3.5 Write property test for spring return to home
  - **Property 3: Spring animation returns to home**
  - **Validates: Requirements 3.4**

- [x] 3.6 Add flapping animation to AnimatedBat

  - Apply CSS animation with duration calculated as 0.1 + (id % 5) * 0.02 seconds
  - Reference flap keyframe animation
  - Apply conditional styling based on isHovered state (color, z-index, filter)
  - _Requirements: 5.1, 5.3, 5.5_

- [ ]* 3.7 Write property test for flapping duration variation
  - **Property 7: Flapping duration varies per bat**
  - **Validates: Requirements 5.3**


- [x] 4. Implement main BatBurst component

- [x] 4.1 Set up component state and structure


  - Create BatBurst component with className and onComplete props
  - Initialize state: triggerScare, isHovered, mousePos, windowSize
  - Set up AnimatePresence wrapper for enter/exit animations
  - _Requirements: 1.1, 1.5_


- [x] 4.2 Implement CSS keyframes injection

  - Create style tag with flap keyframe animation (scaleY 1 to 0.4, scaleX 1 to 0.8)
  - Inject styles using dangerouslySetInnerHTML
  - _Requirements: 5.2, 5.4_



- [x] 4.3 Implement mouse tracking
  - Add mousemove event listener when effect is active
  - Update mousePos state with cursor coordinates
  - Only track when isHovered is true
  - Clean up event listener on deactivation or unmount

  - _Requirements: 3.1, 10.1, 10.4_


- [x] 4.4 Implement window resize handling
  - Add resize event listener when effect is active
  - Update windowSize state with current viewport dimensions
  - Clean up event listener on deactivation or unmount
  - _Requirements: 9.1, 9.3, 9.4_

- [x]* 4.5 Write property test for window resize position recalculation

  - **Property 5: Window resize maintains relative positions**

  - **Validates: Requirements 9.1, 9.5**

- [x] 4.6 Implement jumpscare timing control
  - Set triggerScare to true on activation
  - Use setTimeout to reset triggerScare after 1500ms
  - Clear timeout on component unmount
  - _Requirements: 1.2, 1.3, 2.4, 10.2_


- [x]* 4.7 Write property test for jumpscare activation

  - **Property 1: Activation triggers jumpscare**
  - **Validates: Requirements 1.2, 2.4**

- [x] 4.8 Configure bat swarm
  - Define array of 10 bat configurations with varied sizes (100-350px)

  - Set home positions as percentages distributed across viewport
  - Set opacity values between 0.6 and 1.0

  - Map configurations to AnimatedBat components
  - _Requirements: 4.5_


- [x] 4.9 Implement backdrop overlay

  - Create fixed full-screen div with z-index 9990
  - Apply bg-red-950/30 color with backdrop-blur-[2px]
  - Wrap in motion.div with fade in/out over 300ms
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 4.10 Add pointer-events-none to all animated elements

  - Apply pointer-events-none class to JumpscareBat
  - Apply pointer-events-none class to AnimatedBat instances
  - Apply pointer-events-none class to backdrop overlay
  - _Requirements: 10.5_

- [ ]* 4.11 Write property test for event listener cleanup
  - **Property 6: Event listeners cleaned up on deactivation**
  - **Validates: Requirements 10.1, 10.2**

- [ ]* 4.12 Write property test for pointer events disabled
  - **Property 10: Pointer events disabled on animated elements**
  - **Validates: Requirements 10.5**


- [x] 5. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.


- [x] 6. Update documentation page




- [x] 6.1 Create new demo page structure


  - Set up page with dark background (bg-[#05020a])
  - Add centered layout with max-width container
  - Include title "The Colony" and descriptive text
  - _Requirements: 8.1_

- [x] 6.2 Add trigger button to demo


  - Create button that activates BatBurst effect on click
  - Style button appropriately for spooky theme
  - Wire button to trigger isActive state
  - _Requirements: 8.2_

- [x] 6.3 Update ComponentPlayground with new example


  - Replace old BatBurst usage with new implementation
  - Show simple trigger button example in code snippet
  - Update preview to demonstrate interactive cursor behavior
  - _Requirements: 8.4_

- [x] 6.4 Update API documentation table


  - Update props table to reflect new API (className, onComplete)
  - Remove deprecated props (batCount, duration) or mark as deprecated
  - Add description of interactive cursor repulsion behavior
  - _Requirements: 8.3, 8.5_

- [ ] 7. Replace old BatBurst implementation
  - Back up old BatBurst.tsx implementation
  - Replace with new implementation in packages/ghostui/src/components/BatBurst.tsx
  - Ensure exports are maintained in index.ts
  - Verify no breaking changes to public API

- [ ] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
