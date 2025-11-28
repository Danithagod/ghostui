# Implementation Plan

- [x] 1. Create shared tooltip props interface and utilities





  - Create `WithTooltipProps` interface in a shared types file
  - Export the interface for use across all components
  - Create utility function for wrapping components with tooltips
  - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.4_
-

- [x] 2. Enhance SpookyTooltip component with accessibility features




  - Add ARIA attributes (aria-describedby, role="tooltip") to SpookyTooltip
  - Ensure focus and blur events properly trigger tooltip visibility
  - Add unique ID generation for aria-describedby linking
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 2.1 Write property test for SpookyTooltip ARIA attributes
  - **Property 5: ARIA attributes**
  - **Validates: Requirements 3.1, 3.4**

- [ ]* 2.2 Write property test for keyboard focus interaction
  - **Property 6: Keyboard focus interaction**
  - **Validates: Requirements 3.2, 3.3**

- [x] 3. Integrate tooltip support into GooeyButton component





  - Add `WithTooltipProps` to `GooeyButtonProps` interface
  - Implement conditional tooltip wrapper in GooeyButton
  - Ensure ref forwarding works correctly through tooltip wrapper
  - Test with various tooltip content and positions
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.5_

- [ ]* 3.1 Write property test for GooeyButton tooltip wrapper presence
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**

- [ ]* 3.2 Write property test for GooeyButton tooltip positioning
  - **Property 2: Tooltip positioning**
  - **Validates: Requirements 1.2**

- [ ]* 3.3 Write property test for GooeyButton backward compatibility
  - **Property 4: Backward compatibility**
  - **Validates: Requirements 1.5, 2.5, 8.1, 8.2, 8.3**
- [x] 4. Integrate tooltip support into BatToggle component




- [ ] 4. Integrate tooltip support into BatToggle component

  - Add `WithTooltipProps` to `BatToggleProps` interface
  - Implement conditional tooltip wrapper in BatToggle
  - Ensure toggle functionality works correctly with tooltip
  - Test keyboard navigation with tooltip
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.5_

- [ ]* 4.1 Write property test for BatToggle tooltip integration
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**

- [ ]* 4.2 Write property test for BatToggle keyboard navigation preservation
  - **Property 7: Keyboard navigation preservation**
  - **Validates: Requirements 3.5**
-

- [x] 5. Integrate tooltip support into MoonlightSwitch component




  - Add `WithTooltipProps` to `MoonlightSwitchProps` interface
  - Implement conditional tooltip wrapper in MoonlightSwitch
  - Ensure switch functionality works correctly with tooltip
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.5_

- [ ]* 5.1 Write property test for MoonlightSwitch tooltip integration
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**
- [x] 6. Integrate tooltip support into SpiritInput component




- [ ] 6. Integrate tooltip support into SpiritInput component

  - Add `WithTooltipProps` to `SpiritInputProps` interface
  - Implement conditional tooltip wrapper in SpiritInput
  - Ensure input functionality and error states work with tooltip
  - Test focus/blur behavior with tooltip
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.2, 2.5_

- [ ]* 6.1 Write property test for SpiritInput tooltip integration
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**

- [ ]* 6.2 Write property test for string content rendering
  - **Property 8: String content rendering**
  - **Validates: Requirements 4.1**

- [x] 7. Integrate tooltip support into CoffinCard component





  - Add `WithTooltipProps` to `CoffinCardProps` interface
  - Implement conditional tooltip wrapper in CoffinCard
  - Ensure card interactions work correctly with tooltip
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.3, 2.5_

- [ ]* 7.1 Write property test for CoffinCard tooltip integration
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**

- [x] 8. Integrate tooltip support into SpectralTabs component





  - Add `WithTooltipProps` to individual tab item props
  - Implement conditional tooltip wrapper for tab items
  - Ensure tab switching works correctly with tooltips
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.4, 2.5_

- [ ]* 8.1 Write property test for SpectralTabs tooltip integration
  - **Property 1: Tooltip wrapper presence**
  - **Validates: Requirements 1.1, 1.4, 5.1**
-

- [x] 9. Test complex tooltip content rendering




  - Test tooltips with React nodes (formatted text, icons, etc.)
  - Test tooltips with multiline content
  - Verify layout and styling preservation
  - _Requirements: 4.2, 4.3, 4.4_

- [ ]* 9.1 Write property test for React node content rendering
  - **Property 9: React node content rendering**
  - **Validates: Requirements 4.2, 4.3**

- [ ]* 9.2 Write property test for multiline content layout
  - **Property 10: Multiline content layout**
  - **Validates: Requirements 4.4**
-

- [x] 10. Test tooltip custom styling




  - Test tooltipClassName prop across multiple components
  - Verify custom styles are applied correctly
  - Test style conflicts and resolution
  - _Requirements: 1.3_

- [ ]* 10.1 Write property test for tooltip custom styling
  - **Property 3: Tooltip custom styling**
  - **Validates: Requirements 1.3**
-

- [x] 11. Test tooltip performance and DOM behavior




  - Verify tooltips only render when visible
  - Test conditional wrapper mounting
  - Verify no tooltip DOM when tooltip prop is omitted
  - _Requirements: 5.1, 5.3_

- [ ]* 11.1 Write property test for hidden tooltip DOM absence
  - **Property 11: Hidden tooltip DOM absence**
  - **Validates: Requirements 5.3**

- [x] 12. Update component documentation pages




  - Add tooltip usage examples to each component's documentation page
  - Document tooltip props (tooltip, tooltipPosition, tooltipClassName)
  - Include examples of simple and complex tooltip content
  - Add accessibility notes for tooltip usage
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 13. Update component exports and type definitions




  - Ensure WithTooltipProps is exported from main index
  - Update component prop type exports
  - Verify TypeScript types are accurate
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
