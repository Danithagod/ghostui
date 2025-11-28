# Design Document

## Overview

The HauntedSidebar component is a sophisticated navigation component that combines advanced SVG filtering, spring-based physics animations, and multi-layered rendering to create a unique liquid morphing effect. The component features a blob-based active state indicator that stretches and deforms when transitioning between menu items, creating an organic, viscous appearance.

The design separates concerns into distinct layers: a filter layer where SVG effects are applied to blob elements, and a content layer where interactive buttons and text remain crisp and unfiltered. This architecture ensures optimal visual quality while maintaining the dramatic liquid effects.

## Architecture

### Component Structure

```
HauntedSidebar (Main Component)
├── GooFilter (SVG Filter Definition)
├── WanderingGhost (Background Animation)
├── Background Layer (Textures & Gradients)
├── Filter Layer (Blob System with SVG Filter)
│   ├── Head Blob (Fast, High Stiffness)
│   ├── Tail Blob (Medium Speed, High Mass)
│   └── Drip Blob (Slow, Extreme Mass)
└── Content Layer (Interactive Buttons)
    ├── Header (Title & Subtitle)
    ├── Navigation (Menu Items)
    │   ├── Icon Animation
    │   ├── Label
    │   └── Hover Indicator
    └── Footer (Action Buttons)
```

### Layer Architecture

The component uses a three-layer rendering approach:

1. **Background Layer** (z-index: 0): Contains atmospheric elements including texture overlays, gradients, and the wandering ghost animation
2. **Filter Layer** (z-index: 1, absolute positioned): Contains blob elements with SVG filter applied, positioned to match button locations
3. **Content Layer** (z-index: 10, relative): Contains interactive button elements with text, icons, and event handlers

This separation ensures that:
- Text remains crisp and readable (not affected by blur filters)
- Liquid effects are dramatic and visible (full filter strength)
- Interactive elements remain functional (proper event handling)
- Layout is maintainable (blob positions calculated from button indices)

## Components and Interfaces

### HauntedSidebar Component

**Props Interface:**

```typescript
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface HauntedSidebarProps {
  menuItems?: MenuItem[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}
```

**Default Menu Items:**

```typescript
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'The Dashboard', icon: <BookOpen size={20} /> },
  { id: 'spirits', label: 'Restless Spirits', icon: <Ghost size={20} /> },
  { id: 'graveyard', label: 'Graveyard', icon: <Skull size={20} /> },
  { id: 'rituals', label: 'Dark Rituals', icon: <Scroll size={20} /> },
  { id: 'midnight', label: 'Midnight Zone', icon: <Moon size={20} /> },
  { id: 'scrying', label: 'Scrying Pool', icon: <Eye size={20} /> },
];
```

### GooFilter Component

A self-contained SVG filter definition component that creates the 3D liquid effect:

```typescript
const GooFilter = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      <filter id="sidebar-goo-3d" colorInterpolationFilters="sRGB">
        {/* Blur → Color Matrix → Specular Lighting → Composite */}
      </filter>
    </defs>
  </svg>
);
```

**Filter Pipeline:**
1. `feGaussianBlur`: stdDeviation=8, creates soft blob edges
2. `feColorMatrix`: Hardens edges with threshold matrix
3. `feGaussianBlur`: stdDeviation=2, smooths for lighting
4. `feSpecularLighting`: Creates 3D shine effect
5. `feComposite`: Layers highlights over goo

### WanderingGhost Component

Background animation element that adds atmospheric movement:

```typescript
const WanderingGhost = () => (
  <motion.div
    initial={{ x: "-100%", y: "20%", scale: 0.5, rotate: 10 }}
    animate={{ 
      x: "400%", 
      y: ["20%", "40%", "10%"],
      rotate: [-5, 5, -5] 
    }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
  >
    <Ghost size={120} />
  </motion.div>
);
```

## Data Models

### State Management

```typescript
// Internal state for uncontrolled mode
const [internalActiveId, setInternalActiveId] = useState<string>(
  menuItems[0]?.id || ''
);

// Hover state for interaction feedback
const [hoveredId, setHoveredId] = useState<string | null>(null);

// Derived active ID (controlled or uncontrolled)
const activeId = props.activeId ?? internalActiveId;
```

### Blob Position Calculation

```typescript
const calculateBlobPosition = (itemId: string): number => {
  const index = menuItems.findIndex(item => item.id === itemId);
  return index * 52; // 48px height + 4px gap
};
```

### Animation Configuration

```typescript
const BLOB_ANIMATIONS = {
  head: {
    stiffness: 350,
    damping: 30,
    mass: 1
  },
  tail: {
    stiffness: 120,
    damping: 18,
    mass: 3
  },
  drip: {
    stiffness: 80,
    damping: 20,
    mass: 5,
    delay: 0.05
  }
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Menu item rendering completeness

*For any* array of menu items provided to the component, all items should be rendered with their id, label, and icon (if provided) visible in the navigation list.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 2: Active state highlighting

*For any* valid activeId that matches a menu item id, the component should render the blob system positioned at that menu item's location.

**Validates: Requirements 3.1**

### Property 3: Click callback invocation

*For any* menu item, when clicked, the onActiveChange callback should be invoked with that menu item's id.

**Validates: Requirements 3.2**

### Property 4: Blob position calculation

*For any* menu item at index n, the blob top position should equal n * 52 pixels.

**Validates: Requirements 7.1**

### Property 5: Hover state management

*For any* menu item, when hovered, the hoveredId state should update to that item's id, and when mouse leaves, hoveredId should be cleared.

**Validates: Requirements 8.1, 8.5**

### Property 6: Hover indicator visibility

*For any* menu item that is hovered but not active, a hover indicator dot should be visible.

**Validates: Requirements 8.2**

### Property 7: Hover text color change

*For any* menu item, when hovered, the text color should change to gray-300.

**Validates: Requirements 8.4**

### Property 8: Active icon animation

*For any* active menu item, the icon should have scale 1.1 and translateX 4px applied.

**Validates: Requirements 9.1**

### Property 9: Hover icon animation

*For any* hovered but not active menu item, the icon should have translateX 2px applied.

**Validates: Requirements 9.2**

### Property 10: Default icon state

*For any* menu item that is neither active nor hovered, the icon should have scale 1 and translateX 0.

**Validates: Requirements 9.3**

### Property 11: Custom title rendering

*For any* title string provided as a prop, that string should appear in the header section.

**Validates: Requirements 12.1**

### Property 12: Footer button hover behavior

*For any* footer button, when hovered, the text color and background should change according to hover styles.

**Validates: Requirements 13.4**

### Property 13: Uncontrolled mode state updates

*For any* menu item click when no onActiveChange callback is provided, the internal active state should update to that item's id.

**Validates: Requirements 17.4**

### Property 14: Icon-less menu items

*For any* menu item without an icon, the label should render correctly without layout issues.

**Validates: Requirements 17.5**

### Property 15: Keyboard navigation

*For any* menu item button, it should be focusable via keyboard tab navigation.

**Validates: Requirements 18.2**

### Property 16: Focus visibility

*For any* menu item button, when focused, a visible focus outline should be displayed.

**Validates: Requirements 18.3**

### Property 17: Keyboard activation

*For any* menu item button, pressing Enter or Space should trigger the click handler.

**Validates: Requirements 18.4**

## Error Handling

### Invalid Props

- **Invalid activeId**: If activeId doesn't match any menu item id, no blob should be rendered
- **Empty menuItems array**: Component should render structure without navigation items
- **Missing required MenuItem properties**: TypeScript will catch at compile time

### Edge Cases

- **No menuItems prop**: Use DEFAULT_MENU_ITEMS constant
- **No activeId prop**: Use first menu item id as initial active state
- **No onActiveChange prop**: Component operates in uncontrolled mode with internal state
- **Menu item without icon**: Render label only, maintain proper spacing

### Animation Edge Cases

- **Rapid active state changes**: Framer Motion handles interruption gracefully with spring physics
- **Active item removed from menu**: Blob should disappear smoothly
- **Menu items reordered**: Blob should animate to new position of active item

## Testing Strategy

### Unit Testing

The component will use Vitest and React Testing Library for unit tests:

**Test Categories:**

1. **Rendering Tests**
   - Component renders without crashing
   - Default menu items render when no props provided
   - Custom menu items render correctly
   - Header and footer render with correct content

2. **Interaction Tests**
   - Clicking menu item updates active state
   - Clicking menu item calls onActiveChange callback
   - Hovering menu item shows hover indicator
   - Keyboard navigation works (Tab, Enter, Space)

3. **Props Tests**
   - Controlled mode (activeId prop) works correctly
   - Uncontrolled mode (no activeId) works correctly
   - Custom title and subtitle render
   - className prop merges correctly

4. **Edge Case Tests**
   - Empty menuItems array
   - Invalid activeId
   - Menu items without icons
   - Missing optional props

### Property-Based Testing

The component will use fast-check for property-based testing with a minimum of 100 iterations per test:

**Property Test Configuration:**

```typescript
import fc from 'fast-check';
import { render, screen } from '@testing-library/react';

// Generators
const menuItemArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  label: fc.string({ minLength: 1 }),
  icon: fc.option(fc.constant(<Ghost size={20} />))
});

const menuItemsArbitrary = fc.array(menuItemArbitrary, { minLength: 1, maxLength: 10 });
```

**Property Tests:**

1. **Property 1: Menu item rendering completeness** - Test that all provided menu items render
2. **Property 2: Active state highlighting** - Test that activeId correctly positions blob
3. **Property 3: Click callback invocation** - Test that clicks invoke callback with correct id
4. **Property 4: Blob position calculation** - Test position formula for all indices
5. **Property 7: Hover text color change** - Test hover styling for all items
6. **Property 11: Custom title rendering** - Test that any title string renders
7. **Property 13: Uncontrolled mode state updates** - Test internal state management
8. **Property 15: Keyboard navigation** - Test all buttons are focusable

Each property-based test must:
- Run a minimum of 100 iterations
- Include a comment tag: `**Feature: haunted-sidebar-implementation, Property {number}: {property_text}**`
- Test universal properties across all valid inputs
- Use appropriate generators to create test data

### Integration Testing

Integration tests will verify:
- Component works within Next.js documentation app
- Framer Motion animations execute correctly
- SVG filters apply properly
- Layer separation maintains text clarity
- Component integrates with existing GhostUI theme

### Visual Regression Testing

Manual visual testing will verify:
- Blob stretching effect appears organic
- Text remains crisp and readable
- Hover states provide clear feedback
- Animations feel smooth and natural
- Component matches design specifications

## Implementation Notes

### Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^10.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

### Performance Considerations

1. **Animation Performance**: Use Framer Motion's hardware-accelerated transforms (translateX, translateY, scale)
2. **Filter Performance**: SVG filters are GPU-accelerated in modern browsers
3. **Re-render Optimization**: Use React.memo for WanderingGhost if needed
4. **Layout Calculations**: Blob positions calculated once per render, not in animation loop

### Accessibility Considerations

1. **Semantic HTML**: Use `<nav>` for navigation, `<button>` for interactive elements
2. **Keyboard Navigation**: All interactive elements are keyboard accessible
3. **Focus Management**: Visible focus indicators on all interactive elements
4. **Screen Readers**: Proper ARIA labels and semantic structure
5. **Reduced Motion**: Consider adding `prefers-reduced-motion` support for animations

### Browser Compatibility

- **SVG Filters**: Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Framer Motion**: Requires modern JavaScript features (ES6+)
- **CSS Features**: Uses Tailwind CSS classes, requires PostCSS processing
- **Minimum Support**: Last 2 versions of major browsers

### File Organization

```
packages/ghostui/src/components/
├── HauntedSidebar.tsx          # Main component
└── index.ts                     # Export barrel

apps/docs/app/docs/components/
└── haunted-sidebar/
    └── page.tsx                 # Documentation page
```

### Styling Architecture

The component uses Tailwind CSS with the GhostUI theme:

```typescript
// Theme colors used
- bg-[#0c0a0f]      // Main background
- text-gray-200      // Title text
- text-gray-500      // Inactive items
- text-gray-300      // Hover text
- text-white         // Active text
- bg-gray-700        // Blob color
- border-white/5     // Borders
```

### Animation Timing

```typescript
// Spring physics parameters
Head Blob:  { stiffness: 350, damping: 30, mass: 1 }
Tail Blob:  { stiffness: 120, damping: 18, mass: 3 }
Drip Blob:  { stiffness: 80, damping: 20, mass: 5, delay: 0.05 }

// Background animation
WanderingGhost: 25s linear infinite
```

### Code Quality Standards

1. **TypeScript**: Strict mode enabled, no `any` types
2. **Linting**: ESLint with React and TypeScript rules
3. **Formatting**: Prettier with 2-space indentation
4. **Comments**: JSDoc comments for exported interfaces
5. **Testing**: Minimum 80% code coverage target
