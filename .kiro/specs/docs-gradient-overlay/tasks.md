# Implementation Plan

- [x] 1. Add gradient overlay CSS to globals.css





  - [x] 1.1 Add theme-aware gradient CSS custom properties to :root

    - Define `--ghost-gradient-start`, `--ghost-gradient-mid`, `--ghost-gradient-end` variables
    - _Requirements: 2.1_

  - [x] 1.2 Add Blood Moon theme gradient variables

    - Add gradient variables to `[data-theme="blood"]` selector with red-tinted values
    - _Requirements: 1.3, 2.1_

  - [x] 1.3 Implement body::before pseudo-element gradient overlay

    - Add fixed positioning with `inset: 0`
    - Apply linear gradient using CSS custom properties
    - Set `pointer-events: none` and `z-index: 0`
    - _Requirements: 1.1, 1.4, 2.2_




- [x] 2. Manual verification checkpoint


  - Ensure gradient displays correctly on page load
  - Verify gradient remains fixed during scroll
  - Test theme switching between Spectral and Blood Moon
  - Confirm text readability is maintained across all pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.2_
