# Implementation Plan

- [x] 1. Create SpectralRiver component file






  - [x] 1.1 Create SpectralRiver.tsx in packages/ghostui/src/components

    - Implement SpectralRiverProps interface with isActive and onComplete props
    - Implement SlimeDrip internal sub-component with organic variability logic
    - Implement SpectralRiver main component with SVG goo filter, drip rendering, and backing layer
    - Use cn utility from lib/utils for class name merging
    - Use Framer Motion AnimatePresence for enter/exit animations
    - Implement body scroll locking in useEffect with proper cleanup
    - Use exact code snippet provided with library adaptations
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 5.1, 5.2, 5.3_

  - [ ]* 1.2 Write property test for active state rendering
    - **Property 1: Active state renders overlay**
    - **Validates: Requirements 1.2**

  - [ ]* 1.3 Write property test for inactive state rendering
    - **Property 2: Inactive state renders nothing**
    - **Validates: Requirements 1.3**

  - [ ]* 1.4 Write property test for drip width bounds
    - **Property 3: Drip widths within bounds**
    - **Validates: Requirements 2.1**

  - [ ]* 1.5 Write property test for drip delay bounds
    - **Property 4: Drip delays within bounds**
    - **Validates: Requirements 2.3**

  - [ ]* 1.6 Write unit tests for SpectralRiver component
    - Test onComplete callback invocation after transition duration
    - Test body overflow is set to hidden when active
    - Test body overflow is restored on completion
    - Test cleanup occurs on unmount during active transition
    - Test SVG filter elements are present in DOM when active
    - _Requirements: 1.4, 3.1, 3.2, 3.3, 2.2_
-

- [x] 2. Export SpectralRiver from library





  - [x] 2.1 Update packages/ghostui/src/components/index.ts

    - Add export for SpectralRiver component
    - Add export for SpectralRiverProps type
    - Place export in Page Transitions section with other transition components
    - _Requirements: 1.1, 5.3_
-

- [x] 3. Checkpoint - Ensure component builds correctly




  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create documentation page




- [-] 4. Create documentation page

  - [x] 4.1 Create spectral-river documentation page

    - Create apps/docs/app/docs/components/spectral-river/page.tsx
    - Add interactive demo with trigger button using GooeyButton
    - Add props table documenting isActive and onComplete props
    - Add code example showing basic usage pattern
    - Follow existing documentation page patterns (CrackTransition as reference)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_


  - [x] 4.2 Update Sidebar navigation

    - Add SpectralRiver entry to Page Transitions section in apps/docs/components/Sidebar.tsx
    - Use href '/docs/components/spectral-river'
    - Use Sparkles icon consistent with other components
    - _Requirements: 5.4_

- [x] 5. Final Checkpoint - Verify integration





  - Ensure all tests pass, ask the user if questions arise.
