# Design Document

## Overview

The BatBurst documentation page will be a comprehensive, interactive guide that showcases the component's features, demonstrates usage patterns, and provides developers with the knowledge needed to integrate and customize the effect. The documentation will follow the existing documentation site structure, using the ComponentPlayground component for interactive demos and maintaining visual consistency with the horror-themed design system.

The page will be structured into several key sections:
1. **Hero Section**: Title, description, and key features overview
2. **Interactive Demo**: Live preview with trigger button
3. **Basic Usage**: Code examples and integration patterns
4. **Intensity & Effects**: Detailed explanation of customization options
5. **Interactive Examples**: Multiple variations demonstrating different intensity levels
6. **API Reference**: Complete props documentation
7. **Physics Behavior**: Technical details about the repulsion system
8. **Best Practices**: Guidelines and recommendations
9. **Advanced Examples**: Complex integration patterns

## Architecture

### Component Structure

The documentation page will be implemented as a Next.js page component located at `apps/docs/app/docs/components/bat-burst/page.tsx`. It will follow the existing pattern used by other component documentation pages.

```
BatBurstDocPage (page.tsx)
├── Hero Section
│   ├── Title (h1)
│   ├── Description (p.lead)
│   └── Key Features List
├── ComponentPlayground (Interactive Demo)
│   ├── Preview Area
│   │   ├── Trigger Button
│   │   └── BatBurst Component
│   ├── Code Tab
│   └── API Tab
├── Intensity Section
│   ├── Explanation Text
│   ├── Physics Parameters Table
│   └── Visual Intensity Scale
├── Interactive Examples Section
│   ├── Subtle Example
│   ├── Moderate Example
│   └── Intense Example
├── Physics Behavior Section
│   ├── Repulsion Mechanics
│   ├── Spring Physics Explanation
│   └── Animation Details
├── Best Practices Section
│   ├── Usage Guidelines
│   ├── Performance Tips
│   └── Accessibility Recommendations
└── Advanced Examples Section
    ├── Custom Triggers
    ├── Component Integration
    └── Conditional Rendering
```

### State Management

The page will use React's `useState` hook to manage:
- **Active state for main demo**: Boolean flag controlling whether the BatBurst effect is currently active
- **Active states for example variations**: Separate boolean flags for each intensity example
- **Tab selection**: If implementing tabbed content for different sections

### Styling Approach

The page will use:
- **Tailwind CSS classes** for layout and styling, consistent with the existing documentation site
- **Ghost theme colors**: `ghost-purple`, `ghost-dark`, `ghost-white`, `ghost-green` for syntax highlighting
- **Responsive design**: Mobile-first approach with appropriate breakpoints
- **Dark theme**: Maintaining the horror aesthetic throughout

## Components and Interfaces

### Main Page Component

```typescript
export default function BatBurstPage() {
  // State for controlling demo activation
  const [isActive, setIsActive] = useState(false);
  const [subtleActive, setSubtleActive] = useState(false);
  const [moderateActive, setModerateActive] = useState(false);
  const [intenseActive, setIntenseActive] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {/* Interactive Demo */}
      {/* Content Sections */}
    </div>
  );
}
```

### Reusable Components

The page will leverage existing components:
- **ComponentPlayground**: For the main interactive demo with preview, code, and API tabs
- **PropsTable**: For displaying API reference (if available, otherwise custom table)
- **CodeBlock**: For syntax-highlighted code examples

### Custom Components (if needed)

**IntensityExample Component**: A reusable component for displaying intensity variations

```typescript
interface IntensityExampleProps {
  title: string;
  description: string;
  code: string;
  isActive: boolean;
  onActivate: () => void;
  onComplete: () => void;
}
```

## Data Models

### Documentation Content Structure

```typescript
interface BatBurstDocumentation {
  hero: {
    title: string;
    description: string;
    keyFeatures: string[];
  };
  
  basicUsage: {
    description: string;
    codeExample: string;
    notes: string[];
  };
  
  intensity: {
    description: string;
    parameters: PhysicsParameter[];
    visualScale: IntensityLevel[];
  };
  
  examples: IntensityExample[];
  
  apiReference: PropDefinition[];
  
  physicsBehavior: {
    repulsion: string;
    springPhysics: string;
    animations: string;
  };
  
  bestPractices: {
    guidelines: string[];
    performance: string[];
    accessibility: string[];
  };
  
  advancedExamples: AdvancedExample[];
}

interface PhysicsParameter {
  name: string;
  value: number | string;
  description: string;
}

interface IntensityLevel {
  level: 'subtle' | 'moderate' | 'intense';
  description: string;
  characteristics: string[];
}

interface IntensityExample {
  id: string;
  title: string;
  description: string;
  code: string;
  configuration: {
    batCount?: number;
    opacity?: number;
    size?: number;
    repulsionRadius?: number;
    repulsionStrength?: number;
  };
}

interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
}

interface AdvancedExample {
  title: string;
  description: string;
  code: string;
  useCase: string;
}
```

### Content Data

The documentation will include hardcoded content for:

**Physics Parameters**:
- Repulsion Radius: 300px
- Repulsion Strength: 150
- Spring Stiffness: 60
- Spring Damping: 15
- Spring Mass: 1
- Jumpscare Duration: 1500ms
- Flap Duration: 0.1-0.18s (varies by bat)

**Intensity Levels**:
- **Subtle**: Fewer bats (5-7), lower opacity (0.4-0.6), smaller sizes (80-150px)
- **Moderate**: Standard configuration (10 bats), medium opacity (0.6-0.9), medium sizes (120-220px)
- **Intense**: More bats (15-20), higher opacity (0.8-1.0), larger sizes (180-300px)


## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Since this feature is primarily about creating documentation content (a static page with interactive demos), most of the acceptance criteria are examples that verify specific content is present rather than universal properties that hold across all inputs. The testable criteria focus on ensuring the documentation page contains all required sections, content, and interactive elements.

### Property Reflection

After reviewing all acceptance criteria, the vast majority are content verification tests (checking that specific text, sections, or elements exist on the page). These are best tested as unit tests that verify the rendered output contains expected content. There are no universal properties that apply across a range of inputs, as documentation is largely static content.

The few behavioral aspects (like button state management and independent example activation) are specific examples rather than general properties.

### Content Verification Examples

Since this is a documentation page, we focus on verifying that all required content sections are present and properly structured. These are tested as examples rather than properties:

**Example 1: Hero section contains required elements**
The documentation page should render a title, description, and key features in the hero section.
**Validates: Requirements 1.1, 1.2**

**Example 2: Interactive demo is functional**
The documentation page should render a working BatBurst component with a trigger button that properly manages activation state.
**Validates: Requirements 2.1, 2.2, 2.3, 2.5**

**Example 3: Basic usage section contains complete code example**
The usage section should display a code example that includes imports, state management, component integration, and the onComplete callback.
**Validates: Requirements 3.1, 3.2, 3.3, 3.5**

**Example 4: Intensity section documents all parameters**
The intensity section should explain bat count, opacity, size, and all physics parameters (repulsion radius, repulsion strength, spring stiffness).
**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

**Example 5: Multiple intensity variations are shown**
The examples section should display at least three variations (subtle, moderate, intense) with labels, descriptions, and code snippets.
**Validates: Requirements 5.1, 5.2, 5.3, 5.5**

**Example 6: Each intensity example has independent state**
Each intensity example should have its own activation state that doesn't affect other examples.
**Validates: Requirements 5.4**

**Example 7: API reference documents all props**
The API section should display a table with className and onComplete props, including name, type, default value, and description for each.
**Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

**Example 8: Physics behavior is fully documented**
The behavior section should explain repulsion radius (300px), spring parameters (stiffness: 60, damping: 15, mass: 1), force calculation, flapping animation, and home positions.
**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

**Example 9: Best practices section is complete**
The guidelines section should include usage recommendations, container positioning guidance, state management examples, performance information, and accessibility recommendations.
**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

**Example 10: Advanced examples demonstrate complex patterns**
The advanced section should show custom triggers, component integration, conditional rendering, and viewport size considerations.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

**Example 11: Theme styling is applied**
The page should use ghost-themed colors (ghost-purple, ghost-dark, ghost-white), hover effects, transitions, and syntax highlighting.
**Validates: Requirements 10.1, 10.2, 10.3**


## Error Handling

### Missing Component Imports

If the BatBurst component fails to import:
- Display a clear error message in the development console
- Show a fallback message in the preview area
- Ensure the page doesn't crash and other sections remain functional

### State Management Errors

If state updates fail:
- Implement error boundaries around interactive components
- Log errors to console for debugging
- Gracefully degrade to non-interactive state

### Content Rendering Issues

If code examples or content fail to render:
- Use try-catch blocks around dynamic content
- Provide fallback content or error messages
- Ensure page structure remains intact

## Testing Strategy

### Unit Testing

Since this is a documentation page with primarily static content, unit tests will focus on:

**Content Verification Tests**:
- Test that all required sections are rendered (hero, demo, usage, intensity, examples, API, physics, best practices, advanced)
- Test that specific content elements exist (titles, descriptions, code blocks, tables)
- Test that all required props are documented in the API reference
- Test that physics parameters are correctly displayed
- Test that intensity variations are present

**Component Integration Tests**:
- Test that the BatBurst component renders in the preview area
- Test that the trigger button exists and has proper event handlers
- Test that state management works correctly (activation/deactivation)
- Test that each intensity example has independent state
- Test that the onComplete callback properly resets state

**Styling Tests**:
- Test that ghost-themed CSS classes are applied
- Test that code blocks have syntax highlighting classes
- Test that interactive elements have hover effect classes

### Manual Testing

Manual testing will be required for:
- Visual consistency with other documentation pages
- Readability and clarity of explanations
- Interactive demo functionality (actual BatBurst behavior)
- Responsive design across different screen sizes
- Accessibility features (keyboard navigation, screen readers)
- Code example accuracy and completeness

### Testing Tools

- **React Testing Library**: For component rendering and interaction tests
- **Jest**: For unit test execution
- **Manual browser testing**: For visual verification and interactive behavior

### Test Organization

Tests will be organized in a test file located at:
`apps/docs/app/docs/components/bat-burst/__tests__/page.test.tsx`

Test structure:
```typescript
describe('BatBurst Documentation Page', () => {
  describe('Hero Section', () => {
    // Tests for title, description, key features
  });

  describe('Interactive Demo', () => {
    // Tests for BatBurst component, trigger button, state management
  });

  describe('Content Sections', () => {
    // Tests for usage, intensity, examples, API, physics, best practices, advanced
  });

  describe('Styling', () => {
    // Tests for theme classes, syntax highlighting
  });
});
```

## Implementation Notes

### Content Organization

The documentation content will be organized inline within the page component for simplicity. For larger documentation sites, content could be extracted into separate content files or a CMS.

### Code Examples

All code examples should be:
- Syntactically correct and runnable
- Include all necessary imports
- Use realistic variable names and patterns
- Follow the project's coding standards
- Be kept up-to-date with component API changes

### Intensity Variations

The intensity examples will demonstrate conceptual variations rather than actual implementation, since the current BatBurst component has a fixed configuration. The examples will show:
- What code would look like if the component supported intensity props
- Explanations of how different parameters affect the visual result
- Guidance for developers who might fork or extend the component

### Performance Considerations

- Use React.memo for intensity example components if needed
- Ensure only one BatBurst instance is active at a time to prevent performance issues
- Lazy load heavy components if the page becomes too large
- Optimize images and assets used in examples

### Accessibility

- Ensure all interactive elements are keyboard accessible
- Provide ARIA labels for screen readers
- Include warnings about motion effects for users with vestibular disorders
- Ensure sufficient color contrast for text readability
- Provide text alternatives for visual demonstrations

### Maintenance

- Keep code examples synchronized with actual component API
- Update physics parameters if component implementation changes
- Review and update best practices as usage patterns evolve
- Maintain consistency with other component documentation pages
- Regular testing to ensure all interactive demos work correctly

