# Design Document

## Overview

This design document outlines the architecture and implementation strategy for integrating SpookyTooltip functionality across all interactive components in the GhostUI library. The solution uses a Higher-Order Component (HOC) pattern combined with prop injection to provide a consistent, accessible, and performant tooltip experience.

The design prioritizes:
- Developer experience through simple prop-based API
- Backward compatibility with existing component usage
- Accessibility compliance with ARIA standards
- Performance optimization through conditional rendering
- Type safety with comprehensive TypeScript definitions

## Architecture

### High-Level Architecture

The tooltip integration follows a composition-based architecture:

```
┌─────────────────────────────────────────┐
│         Component Consumer              │
│  <GooeyButton tooltip="Click me!" />    │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│      withTooltip HOC (Optional)         │
│  - Checks for tooltip props             │
│  - Wraps with SpookyTooltip if present  │
│  - Passes through all other props       │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│       Base Component                    │
│  (GooeyButton, BatToggle, etc.)         │
└─────────────────────────────────────────┘
```

### Component Integration Strategy

Each interactive component will be enhanced with tooltip support through:

1. **Shared Tooltip Props Interface**: A common TypeScript interface defining tooltip-related props
2. **Conditional Wrapper Pattern**: Components check for tooltip props and conditionally wrap themselves
3. **Prop Forwarding**: All non-tooltip props are forwarded to the base component
4. **Accessibility Integration**: ARIA attributes are automatically added when tooltips are present

## Components and Interfaces

### Shared Tooltip Props Interface

```typescript
export interface WithTooltipProps {
  /** Content to display in the tooltip */
  tooltip?: React.ReactNode;
  
  /** Position of the tooltip relative to the component */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  /** Additional CSS classes for the tooltip */
  tooltipClassName?: string;
}
```

### Component Integration Pattern

Each component will follow this pattern:

```typescript
export interface ComponentProps extends WithTooltipProps {
  // Existing component props
}

export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ tooltip, tooltipPosition, tooltipClassName, ...props }, ref) => {
    const baseComponent = (
      <BaseComponentImplementation ref={ref} {...props} />
    );
    
    if (!tooltip) {
      return baseComponent;
    }
    
    return (
      <SpookyTooltip
        content={tooltip}
        position={tooltipPosition}
        className={tooltipClassName}
      >
        {baseComponent}
      </SpookyTooltip>
    );
  }
);
```

### Components to be Enhanced

The following interactive components will receive tooltip integration:

1. **Button Components**
   - GooeyButton
   - Standard buttons in other components

2. **Toggle/Switch Components**
   - BatToggle
   - MoonlightSwitch

3. **Input Components**
   - SpiritInput

4. **Card Components**
   - CoffinCard (interactive variants)

5. **Tab Components**
   - SpectralTabs (individual tab items)

6. **Other Interactive Elements**
   - Any component that accepts user interaction

## Data Models

### Tooltip Configuration

```typescript
interface TooltipConfig {
  content: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  isVisible: boolean;
}
```

### Component Enhancement Metadata

```typescript
interface ComponentEnhancement {
  componentName: string;
  hasTooltipSupport: boolean;
  defaultTooltipPosition: 'top' | 'bottom' | 'left' | 'right';
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Acceptence Criteria Testing Prework

1.1 WHEN a developer adds a `tooltip` prop to any interactive GhostUI component, THEN the system SHALL render that component wrapped with SpookyTooltip functionality
  Thoughts: This is a rule that should apply to all components and all tooltip values. We can generate random components with random tooltip content and verify the SpookyTooltip wrapper is present in the rendered output.
  Testable: yes - property

1.2 WHEN a developer provides a `tooltipPosition` prop, THEN the system SHALL position the tooltip according to the specified value (top, bottom, left, or right)
  Thoughts: This should work for all position values across all components. We can generate random components with random positions and verify the tooltip receives the correct position prop.
  Testable: yes - property

1.3 WHEN a developer provides a `tooltipClassName` prop, THEN the system SHALL apply custom styling to the tooltip element
  Thoughts: This should work for any className string. We can generate random components with random className values and verify the className is applied to the tooltip.
  Testable: yes - property

1.4 WHEN a developer omits the `tooltip` prop, THEN the system SHALL render the component without any tooltip wrapper
  Thoughts: This is testing that components without tooltip props render normally. We can generate random components without tooltip props and verify no SpookyTooltip wrapper exists.
  Testable: yes - property

1.5 WHERE tooltip props are provided, WHEN the component renders, THEN the system SHALL maintain all existing component functionality and styling
  Thoughts: This is about ensuring tooltip integration doesn't break existing behavior. We can test that components with tooltips still respond to their normal props and events.
  Testable: yes - property

2.1 THE system SHALL support tooltip props on all button-like components (GooeyButton, BatToggle, MoonlightSwitch)
  Thoughts: This is verifying that specific components have tooltip support. We can test each component type to ensure they accept and render tooltips.
  Testable: yes - example

2.2 THE system SHALL support tooltip props on all input components (SpiritInput)
  Thoughts: This is verifying that input components have tooltip support.
  Testable: yes - example

2.3 THE system SHALL support tooltip props on all interactive card components (CoffinCard)
  Thoughts: This is verifying that card components have tooltip support.
  Testable: yes - example

2.4 THE system SHALL support tooltip props on all tab components (SpectralTabs)
  Thoughts: This is verifying that tab components have tooltip support.
  Testable: yes - example

2.5 WHEN tooltip functionality is added to a component, THEN the system SHALL preserve all existing props and behaviors
  Thoughts: This is about ensuring backward compatibility. For any component, adding tooltip support shouldn't change how existing props work.
  Testable: yes - property

3.1 WHEN a tooltip is displayed, THEN the system SHALL include proper ARIA attributes (aria-describedby, role="tooltip")
  Thoughts: This should hold for all tooltips regardless of content or component. We can generate random components with tooltips and verify ARIA attributes are present.
  Testable: yes - property

3.2 WHEN a user navigates using keyboard, THEN the system SHALL show tooltips on focus events
  Thoughts: This is about keyboard interaction working across all components. We can simulate focus events and verify tooltips appear.
  Testable: yes - property

3.3 WHEN a user leaves a component using keyboard, THEN the system SHALL hide tooltips on blur events
  Thoughts: This is about keyboard interaction working across all components. We can simulate blur events and verify tooltips disappear.
  Testable: yes - property

3.4 WHEN a tooltip is visible, THEN the system SHALL ensure the tooltip content is announced by screen readers
  Thoughts: This is about accessibility attributes being present. We can verify that visible tooltips have the correct ARIA attributes for screen reader announcement.
  Testable: yes - property

3.5 THE system SHALL maintain keyboard navigation functionality for all components with tooltips
  Thoughts: This is about ensuring tooltips don't break keyboard navigation. We can test that tab order and keyboard events still work correctly.
  Testable: yes - property

4.1 WHEN a developer provides a string as the `tooltip` prop, THEN the system SHALL render that string as tooltip content
  Thoughts: This should work for any string value. We can generate random strings and verify they render correctly.
  Testable: yes - property

4.2 WHEN a developer provides a React node as the `tooltip` prop, THEN the system SHALL render that node as tooltip content
  Thoughts: This should work for any valid React node. We can generate various React nodes and verify they render correctly.
  Testable: yes - property

4.3 WHEN tooltip content includes formatted text or icons, THEN the system SHALL preserve all styling and structure
  Thoughts: This is about complex content rendering correctly. We can create tooltips with nested elements and verify structure is preserved.
  Testable: yes - property

4.4 THE system SHALL support multiline tooltip content without breaking layout
  Thoughts: This is about layout handling for long content. We can test with multiline strings and verify layout remains correct.
  Testable: yes - property

5.1 WHEN a component with tooltip props renders, THEN the system SHALL only mount the tooltip wrapper when the tooltip prop is provided
  Thoughts: This is about conditional rendering. We can verify that components without tooltip props don't have tooltip wrappers in the DOM.
  Testable: yes - property

5.2 WHEN multiple components with tooltips are rendered, THEN the system SHALL not cause performance degradation
  Thoughts: This is a performance test about rendering many components. This is difficult to test in a unit test context.
  Testable: no

5.3 WHEN a tooltip is not visible, THEN the system SHALL not render the tooltip DOM elements
  Thoughts: This is about the SpookyTooltip component's behavior with AnimatePresence. We can verify that hidden tooltips don't exist in the DOM.
  Testable: yes - property

5.4 THE system SHALL use React best practices to prevent unnecessary re-renders
  Thoughts: This is about implementation quality and optimization. This is difficult to test as a property.
  Testable: no

6.1 THE system SHALL define a shared TypeScript interface for tooltip props
  Thoughts: This is about code organization, not runtime behavior.
  Testable: no

6.2 WHEN a developer uses tooltip props in TypeScript, THEN the system SHALL provide accurate type information
  Thoughts: This is about TypeScript compilation, not runtime behavior. TypeScript will enforce this at compile time.
  Testable: no

6.3 WHEN a developer provides invalid tooltip prop values, THEN the system SHALL show TypeScript errors
  Thoughts: This is about TypeScript compilation, not runtime behavior.
  Testable: no

6.4 THE system SHALL export tooltip prop types for reuse in custom components
  Thoughts: This is about code organization and exports, not runtime behavior.
  Testable: no

7.1 WHEN a developer views component documentation, THEN the system SHALL include examples of tooltip usage
  Thoughts: This is about documentation, not code behavior.
  Testable: no

7.2 THE documentation SHALL explain all tooltip-related props and their effects
  Thoughts: This is about documentation, not code behavior.
  Testable: no

7.3 THE documentation SHALL include examples of both simple and complex tooltip content
  Thoughts: This is about documentation, not code behavior.
  Testable: no

7.4 THE documentation SHALL demonstrate tooltip positioning options
  Thoughts: This is about documentation, not code behavior.
  Testable: no

8.1 WHEN existing code uses GhostUI components without tooltip props, THEN the system SHALL render components exactly as before
  Thoughts: This is about backward compatibility. We can compare rendering of components with and without tooltip props to ensure no changes when tooltip props are absent.
  Testable: yes - property

8.2 WHEN the library is updated with tooltip integration, THEN the system SHALL not introduce breaking changes to component APIs
  Thoughts: This is about API compatibility. We can verify that all existing prop interfaces still work.
  Testable: yes - property

8.3 THE system SHALL maintain all existing prop interfaces and behaviors
  Thoughts: This is similar to 8.2, about ensuring existing functionality works. This is covered by other properties.
  Testable: yes - property

### Property Reflection

After reviewing all testable properties, I've identified the following redundancies:

- Properties 1.5 and 2.5 both test that existing functionality is preserved - these can be combined
- Properties 8.1, 8.2, and 8.3 all test backward compatibility - these can be combined into one comprehensive property
- Properties 3.4 and 3.1 both test ARIA attributes - 3.1 is more specific and comprehensive
- Properties 5.1 and 1.4 both test conditional rendering - these can be combined

After consolidation, here are the unique properties:

### Property 1: Tooltip wrapper presence
*For any* interactive GhostUI component and any tooltip content, when the tooltip prop is provided, the rendered output should contain a SpookyTooltip wrapper, and when the tooltip prop is omitted, no SpookyTooltip wrapper should be present.
**Validates: Requirements 1.1, 1.4, 5.1**

### Property 2: Tooltip positioning
*For any* interactive GhostUI component and any valid position value (top, bottom, left, right), when a tooltipPosition prop is provided, the SpookyTooltip component should receive and apply that position.
**Validates: Requirements 1.2**

### Property 3: Tooltip custom styling
*For any* interactive GhostUI component and any CSS className string, when a tooltipClassName prop is provided, the SpookyTooltip component should apply that className.
**Validates: Requirements 1.3**

### Property 4: Backward compatibility
*For any* interactive GhostUI component and any set of existing props, adding tooltip support should not change the component's behavior when tooltip props are not provided, and all existing props should continue to work correctly when tooltip props are provided.
**Validates: Requirements 1.5, 2.5, 8.1, 8.2, 8.3**

### Property 5: ARIA attributes
*For any* component with a visible tooltip, the rendered output should include proper ARIA attributes (aria-describedby, role="tooltip") to ensure screen reader accessibility.
**Validates: Requirements 3.1, 3.4**

### Property 6: Keyboard focus interaction
*For any* component with tooltip support, simulating a focus event should make the tooltip visible, and simulating a blur event should hide the tooltip.
**Validates: Requirements 3.2, 3.3**

### Property 7: Keyboard navigation preservation
*For any* component with tooltip support, keyboard navigation (tab order, keyboard event handlers) should work identically to the same component without tooltip support.
**Validates: Requirements 3.5**

### Property 8: String content rendering
*For any* string value provided as tooltip content, the tooltip should render that exact string in its content area.
**Validates: Requirements 4.1**

### Property 9: React node content rendering
*For any* valid React node (including elements with children, formatted text, and icons) provided as tooltip content, the tooltip should render that node with all structure and styling preserved.
**Validates: Requirements 4.2, 4.3**

### Property 10: Multiline content layout
*For any* tooltip content containing newlines or multiple text elements, the tooltip should render without layout breaks or overflow issues.
**Validates: Requirements 4.4**

### Property 11: Hidden tooltip DOM absence
*For any* component with tooltip support, when the tooltip is not visible (not hovered/focused), the tooltip DOM elements should not be present in the rendered output.
**Validates: Requirements 5.3**

## Error Handling

### Invalid Prop Values

- **Invalid tooltipPosition**: Default to 'top' if an invalid position is provided
- **Invalid tooltip content**: Render nothing if tooltip content is null or undefined
- **Missing SpookyTooltip**: Log warning if SpookyTooltip component is not available

### Component Integration Errors

- **Ref forwarding issues**: Ensure refs are properly forwarded through the tooltip wrapper
- **Event handler conflicts**: Ensure tooltip hover/focus handlers don't interfere with component handlers
- **Z-index conflicts**: Ensure tooltips appear above other content with appropriate z-index

### Accessibility Errors

- **Missing ARIA attributes**: Automatically add required ARIA attributes if missing
- **Focus trap**: Ensure tooltips don't trap keyboard focus
- **Screen reader conflicts**: Ensure tooltip content doesn't duplicate existing labels

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Component Rendering Tests**
   - Test each component renders correctly with tooltip props
   - Test each component renders correctly without tooltip props
   - Test tooltip positioning for each position value
   - Test custom className application

2. **Accessibility Tests**
   - Test ARIA attributes are present when tooltip is visible
   - Test keyboard focus shows tooltip
   - Test keyboard blur hides tooltip
   - Test screen reader announcements

3. **Content Rendering Tests**
   - Test string content renders correctly
   - Test React node content renders correctly
   - Test multiline content renders correctly
   - Test empty/null content handling

4. **Edge Cases**
   - Test disabled components with tooltips
   - Test tooltips on components with existing event handlers
   - Test tooltips with very long content
   - Test rapid hover/unhover interactions

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using **fast-check** (JavaScript/TypeScript property-based testing library):

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage.

1. **Property Test: Tooltip wrapper presence**
   - Generate random components and tooltip content
   - Verify SpookyTooltip wrapper presence matches tooltip prop presence
   - **Feature: spooky-tooltip-integration, Property 1: Tooltip wrapper presence**

2. **Property Test: Tooltip positioning**
   - Generate random components and position values
   - Verify tooltip receives correct position prop
   - **Feature: spooky-tooltip-integration, Property 2: Tooltip positioning**

3. **Property Test: Tooltip custom styling**
   - Generate random components and className strings
   - Verify className is applied to tooltip
   - **Feature: spooky-tooltip-integration, Property 3: Tooltip custom styling**

4. **Property Test: Backward compatibility**
   - Generate random components with various prop combinations
   - Verify behavior is identical with and without tooltip support
   - **Feature: spooky-tooltip-integration, Property 4: Backward compatibility**

5. **Property Test: ARIA attributes**
   - Generate random components with tooltips
   - Verify ARIA attributes are present when visible
   - **Feature: spooky-tooltip-integration, Property 5: ARIA attributes**

6. **Property Test: Keyboard focus interaction**
   - Generate random components with tooltips
   - Simulate focus/blur events and verify visibility
   - **Feature: spooky-tooltip-integration, Property 6: Keyboard focus interaction**

7. **Property Test: Keyboard navigation preservation**
   - Generate random components with tooltips
   - Verify keyboard navigation works identically
   - **Feature: spooky-tooltip-integration, Property 7: Keyboard navigation preservation**

8. **Property Test: String content rendering**
   - Generate random string values
   - Verify strings render correctly in tooltips
   - **Feature: spooky-tooltip-integration, Property 8: String content rendering**

9. **Property Test: React node content rendering**
   - Generate random React nodes
   - Verify nodes render with structure preserved
   - **Feature: spooky-tooltip-integration, Property 9: React node content rendering**

10. **Property Test: Multiline content layout**
    - Generate random multiline content
    - Verify layout remains correct
    - **Feature: spooky-tooltip-integration, Property 10: Multiline content layout**

11. **Property Test: Hidden tooltip DOM absence**
    - Generate random components with tooltips
    - Verify tooltip DOM is absent when not visible
    - **Feature: spooky-tooltip-integration, Property 11: Hidden tooltip DOM absence**

### Integration Testing

Integration tests will verify the complete tooltip experience:

1. **User Interaction Flow**
   - Test hover → tooltip appears → hover away → tooltip disappears
   - Test keyboard navigation through multiple components with tooltips
   - Test tooltip positioning near viewport edges

2. **Component Interaction**
   - Test tooltips on components within modals
   - Test tooltips on components within tabs
   - Test multiple tooltips visible simultaneously

### Testing Framework Configuration

- **Unit Testing**: Jest + React Testing Library
- **Property-Based Testing**: fast-check
- **Test Configuration**: Each property-based test configured for minimum 100 iterations
- **Coverage Target**: 90%+ code coverage for tooltip integration code

## Implementation Notes

### Performance Considerations

1. **Conditional Rendering**: Only render SpookyTooltip wrapper when tooltip prop is provided
2. **Memoization**: Consider memoizing tooltip wrapper to prevent unnecessary re-renders
3. **Event Handler Optimization**: Use passive event listeners where appropriate

### Accessibility Considerations

1. **ARIA Attributes**: Automatically add aria-describedby linking component to tooltip
2. **Keyboard Support**: Ensure focus/blur events trigger tooltip visibility
3. **Screen Reader Support**: Ensure tooltip content is announced appropriately
4. **Focus Management**: Ensure tooltips don't interfere with focus order

### Browser Compatibility

- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for browsers without CSS filter support
- Ensure animations respect prefers-reduced-motion

### Documentation Requirements

Each component's documentation page should include:
1. Basic tooltip usage example
2. Tooltip positioning example
3. Custom styled tooltip example
4. Complex content tooltip example
5. Accessibility notes
