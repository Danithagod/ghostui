# Implementation Plan

## Phase 1: Critical Fixes (P0)

- [x] 1. Remove duplicate `cn` utility definitions

  - [x] 1.1 Update GooeyButton.tsx to import cn from utils
    - Remove local `cn` function definition
    - Add `import { cn } from '../lib/utils';`
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Update GhostToast.tsx to import cn from utils
    - Remove local `cn` function definition
    - Add `import { cn } from '../lib/utils';`
    - _Requirements: 1.1, 1.2_

  - [x] 1.3 Update GooeySidebar.tsx to import cn from utils
    - Remove local `cn` function definition
    - Add `import { cn } from '../lib/utils';`
    - _Requirements: 1.1, 1.2_

  - [x] 1.4 Update GhostCursor.tsx to import cn from utils
    - Remove local `cn` function definition
    - Add `import { cn } from '../lib/utils';`
    - _Requirements: 1.1, 1.2_

  - [x] 1.5 Write property test for cn utility consistency
    - **Property 1: Shared utility import consistency**
    - **Validates: Requirements 1.1, 1.2**

- [x] 2. Add unique SVG filter IDs using useId()

  - [x] 2.1 Update GooeyCard.tsx filter ID
    - Add `const id = React.useId();`
    - Change `id="card-goo"` to use dynamic ID
    - Update filter reference in style attribute
    - _Requirements: 5.1, 5.2_

  - [x] 2.2 Update BloodSmear.tsx filter ID
    - Add `const id = React.useId();`
    - Change `id="blood-goo"` to use dynamic ID
    - Update filter reference in style attribute
    - _Requirements: 5.1, 5.2_

  - [x] 2.3 Update SpectralRiver.tsx filter ID
    - Add `const id = React.useId();`
    - Change `id="spectral-goo"` to use dynamic ID
    - Update filter reference in style attribute
    - _Requirements: 5.1, 5.2_

  - [x] 2.4 Update WhisperBox.tsx filter ID
    - Add `const id = React.useId();`
    - Change `id="ectoplasm-distortion"` to use dynamic ID
    - Update filter reference in style attribute
    - _Requirements: 5.1, 5.2_

  - [x] 2.5 Update GooeyProgressBar.tsx filter IDs
    - Add `const id = React.useId();`
    - Change static filter IDs to use dynamic ID with variant suffix
    - Update GooFilter component to accept dynamic ID
    - _Requirements: 5.1, 5.2_

  - [x] 2.6 Write property test for unique filter IDs
    - **Property 5: Unique SVG filter IDs**
    - **Validates: Requirements 5.1, 5.2**

- [x] 3. Checkpoint - Make sure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: forwardRef Implementation (P0/P1)

- [x] 4. Add forwardRef to interactive components

  - [x] 4.1 Add forwardRef to GooeyCard
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to root div
    - Update props interface to include ref type
    - _Requirements: 2.1, 2.2_

  - [x] 4.2 Add forwardRef to SpectralTabs
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to container div
    - Update props interface
    - _Requirements: 2.1, 2.2_

  - [x] 4.3 Add forwardRef to GooeyProgressBar
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to container div
    - Update props interface
    - _Requirements: 2.1, 2.2_

  - [x] 4.4 Add forwardRef to SpookyScrollbar
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to container div
    - Update props interface
    - _Requirements: 2.1, 2.2_

  - [x] 4.5 Add forwardRef to SpookyTooltip
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to wrapper div
    - Update props interface
    - _Requirements: 2.1, 2.2_

  - [x] 4.6 Add forwardRef to GraveModal
    - Wrap component with React.forwardRef
    - Add ref parameter and attach to modal content div
    - Update props interface
    - _Requirements: 2.1, 2.2_

  - [x] 4.7 Write property test for forwardRef implementation
    - **Property 2: forwardRef implementation**
    - **Validates: Requirements 2.1, 2.2**

- [x] 5. Checkpoint - Make sure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: displayName and Accessibility (P1)

- [x] 6. Add displayName to all components

  - [x] 6.1 Add displayName to SpectralTabs
    - Add `SpectralTabs.displayName = 'SpectralTabs';`
    - _Requirements: 3.1_

  - [x] 6.2 Add displayName to SpookyTooltip
    - Add `SpookyTooltip.displayName = 'SpookyTooltip';`
    - _Requirements: 3.1_

  - [x] 6.3 Add displayName to GraveModal
    - Add `GraveModal.displayName = 'GraveModal';`
    - _Requirements: 3.1_

  - [x] 6.4 Add displayName to HauntedVignette, HauntedCard
    - Add displayName to both exported components
    - _Requirements: 3.1_

  - [x] 6.5 Add displayName to BloodSmear
    - Add `BloodSmear.displayName = 'BloodSmear';`
    - _Requirements: 3.1_

  - [x] 6.6 Add displayName to ShadowCrawl
    - Add `ShadowCrawl.displayName = 'ShadowCrawl';`
    - _Requirements: 3.1_

  - [x] 6.7 Add displayName to BatBurst
    - Add `BatBurst.displayName = 'BatBurst';`
    - _Requirements: 3.1_

  - [x] 6.8 Add displayName to SpectralRiver
    - Add `SpectralRiver.displayName = 'SpectralRiver';`
    - _Requirements: 3.1_

  - [x] 6.9 Add displayName to GhostCursor
    - Add `GhostCursor.displayName = 'GhostCursor';`
    - _Requirements: 3.1_

  - [x] 6.10 Add displayName to WispTrail
    - Add `WispTrail.displayName = 'WispTrail';`
    - _Requirements: 3.1_

  - [x] 6.11 Add displayName to SpookyScrollbar
    - Add `SpookyScrollbar.displayName = 'SpookyScrollbar';`
    - _Requirements: 3.1_

  - [x] 6.12 Write property test for displayName
    - **Property 3: displayName assignment**
    - **Validates: Requirements 3.1**

- [x] 7. Add ARIA attributes for accessibility
WWW
  - [x] 7.1 Add aria-live to GhostToast
    - Add `aria-live="polite"` to toast container
    - Add `role="status"` to individual toast items
    - _Requirements: 6.2_

  - [x] 7.2 Add aria-hidden to decorative elements
    - Add `aria-hidden="true"` to SVG filters in all components
    - Add `aria-hidden="true"` to BloodSmear overlay
    - Add `aria-hidden="true"` to ShadowCrawl overlay
    - Add `aria-hidden="true"` to BatBurst overlay
    - Add `aria-hidden="true"` to SpectralRiver overlay
    - _Requirements: 6.3_

  - [x] 7.3 Add ARIA to SpookyScrollbar
    - Add `role="scrollbar"` to thumb
    - Add `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
    - Add `aria-controls` referencing content area
    - _Requirements: 6.1_

  - [x] 7.4 Add ARIA to GooeyProgressBar
    - Add `role="progressbar"` to progress container
    - Add `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
    - Add `aria-label` for screen readers
    - _Requirements: 6.1_

  - [x] 7.5 Write property test for ARIA attributes
    - **Property 6: ARIA attributes for interactive elements**
    - **Property 7: ARIA live regions for status**
    - **Property 8: Decorative elements hidden from accessibility tree**
    - **Validates: Requirements 6.1, 6.2, 6.3**

- [x] 8. Checkpoint - Make sure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 4: Theme Integration (P1)

- [x] 9. Add theme support to hardcoded components

  - [x] 9.1 Add theme support to SpookyTooltip
    - Import `useThemeOptional` and `Theme` type
    - Add theme color configuration object
    - Replace hardcoded `ghost-purple` with theme colors
    - _Requirements: 4.1, 4.2_

  - [x] 9.2 Add theme support to GhostCursor
    - Import `useThemeOptional` and `Theme` type
    - Add theme color configuration object
    - Replace hardcoded purple colors with theme colors
    - _Requirements: 4.1, 4.2_

  - [x] 9.3 Add theme support to WhisperBox
    - Import `useThemeOptional` and `Theme` type
    - Add theme color configuration object
    - Replace hardcoded purple colors with theme colors
    - _Requirements: 4.1, 4.2_

  - [x] 9.4 Add theme support to WispTrail
    - Import `useThemeOptional` and `Theme` type
    - Use theme accent color as default instead of hardcoded green
    - _Requirements: 4.1, 4.2_

  - [x] 9.5 Write property test for theme integration
    - **Property 4: Theme integration**
    - **Validates: Requirements 4.1, 4.2**

- [x] 10. Checkpoint - Make sure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 5: Unit Tests (P2)

- [x] 11. Write unit tests for updated components








  - [x] 11.1 Write unit tests for GooeyCard



    - Test ref forwarding
    - Test unique filter IDs with multiple instances
    - Test displayName

    - _Requirements: 2.1, 5.1, 3.1_

-

  - [x] 11.2 Write unit tests for SpectralTabs






    - Test ref forwarding
    - Test displayName
    - Test ARIA attributes
    - _Requirements: 2.1, 3.1, 6.1_


  - [x] 11.3 Write unit tests for GooeyProgressBar


    - Test ref forwarding
    - Test unique filter IDs
    - Test ARIA progressbar attributes
    - _Requirements: 2.1, 5.1, 6.1_


  - [x] 11.4 Write unit tests for SpookyScrollbar


    - Test ref forwarding
    - Test displayName
    - Test ARIA scrollbar attributes
    - _Requirements: 2.1, 3.1, 6.1_


  - [x] 11.5 Write unit tests for GhostToast


    - Test aria-live region
    - Test cn import (no local definition)
    - _Requirements: 1.1, 6.2_

- [x] 12. Final Checkpoint - Make sure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
