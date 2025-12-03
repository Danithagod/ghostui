# Implementation Plan

- [x] 1. Update PropsTable component with standardized styling






  - [x] 1.1 Update `apps/docs/components/PropsTable.tsx` with consistent table styling

    - Add 4-column structure: Prop, Type, Required, Description
    - Apply dark background (bg-[#0a0412]) with purple border (border-ghost-purple/20)
    - Style header with bg-ghost-purple/10 and border-b border-ghost-purple/20
    - Style rows with divide-y divide-ghost-purple/10
    - Use font-mono for prop names and types
    - Use ghost-white/90 for prop names, ghost-white/70 for other columns
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  - [ ]* 1.2 Write property tests for PropsTable
    - **Property 1: PropsTable renders all four columns**
    - **Property 2: PropsTable applies correct header styling**
    - **Property 3: PropsTable applies correct row styling**
    - **Property 4: Prop names use monospace font**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**


- [x] 2. CreWate style constants




  - [x] 2.1 Create `apps/docs/lib/styles.ts` with centralized style constants

    - Define TABLE_STYLES for props table styling
    - Define PREVIEW_STYLES with container classes and size variants
    - Define PAGE_STYLES with h1, lead, h2, h3, prose classes
    - _Requirements: 1.2, 3.1, 3.2, 3.3, 4.1_

- [x] 3. Update ComponentPlayground component





  - [x] 3.1 Update `apps/docs/components/ComponentPlayground.tsx` with consistent preview styling

    - Import style constants
    - Apply standardized preview container styles (bg-black, border, rounded-lg, centering)
    - Add previewSize prop for height variants (sm/md/lg/xl)
    - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.2_
  - [ ]* 3.2 Write property tests for ComponentPlayground
    - **Property 5: Preview container applies base styles**
    - **Property 6: Custom className merges correctly**
    - **Validates: Requirements 1.2, 1.3, 4.3**

- [x] 4. Checkpoint - Ensure all tests pass



  - Ensure all tests pass, ask the user if questions arise.


- [x] 5. Update component documentation pages with standardized styling


  - [x] 5.1 Update GooeyButton page to use standardized PropsTable and page styles


    - Apply PAGE_STYLES to headings (text-5xl for h1, text-3xl for h2)
    - Use updated PropsTable component
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

  - [x] 5.2 Update GhostToast page with standardized styling

    - Apply PAGE_STYLES to headings
    - Update inline API table to use PropsTable component
    - _Requirements: 2.1, 3.1, 3.2_

  - [x] 5.3 Update SpiritInput page with standardized styling

    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

  - [x] 5.4 Update SpookyTooltip page with standardized styling

    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_

  - [x] 5.5 Update BatToggle page with standardized styling

    - Apply PAGE_STYLES to headings (change text-4xl to text-5xl)
    - Update inline API table to use PropsTable component
    - _Requirements: 2.1, 3.1, 3.2_
  - [x] 5.6 Update CauldronLoader page with standardized styling


    - Apply PAGE_STYLES to headings
    - Update inline API table to use PropsTable component
    - _Requirements: 2.1, 3.1, 3.2_


  - [x] 5.7 Update SpookySkeleton page with standardized styling
    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_
  - [x] 5.8 Update FogBackground page with standardized styling
    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_
  - [x] 5.9 Update HauntedSidebar page with standardized styling
    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_
  - [x] 5.10 Update WhisperBox page with standardized styling

    - Apply PAGE_STYLES to headings
    - Ensure PropsTable is used consistently
    - _Requirements: 2.1, 3.1, 3.2, 3.3_
-

- [x] 6. Final Checkpoint - Ensure all tests pass




  - Ensure all tests pass, ask the user if questions arise.
