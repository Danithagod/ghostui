# Cursor Effect System Compatibility Guide

## Overview

This document describes the compatibility of the Global Cursor Effects system with existing GhostUI components and cursor implementations.

## Component Compatibility

### GooeyButton

The `GooeyButton` component is fully compatible with the cursor effect system:

```tsx
import { CursorEffectProvider, useCursorEffect } from '@ghostui/core';
import { GooeyButton } from '@ghostui/core';

function App() {
  const buttonRef = useCursorEffect({ 
    type: 'button',
    intensity: 0.8,
    attraction: 'attract',
    attractionStrength: 0.7
  });

  return (
    <CursorEffectProvider>
      <GooeyButton ref={buttonRef} variant="slime">
        Enhanced Button
      </GooeyButton>
    </CursorEffectProvider>
  );
}
```

**Recommended Settings for GooeyButton:**
- `type: 'button'` - Applies intensified glow and attraction
- `intensity: 0.7-1.0` - Strong effects complement the gooey aesthetic
- `attraction: 'attract'` - Creates magnetic pull effect
- `distortion: true` - Enhances the liquid morphing appearance

### CoffinCard

The `CoffinCard` component works well with subtle cursor effects:

```tsx
import { CursorEffectProvider, useCursorEffect } from '@ghostui/core';
import { CoffinCard } from '@ghostui/core';

function App() {
  const cardRef = useCursorEffect({ 
    type: 'card',
    intensity: 0.4,
    distortion: true
  });

  return (
    <CursorEffectProvider>
      <div ref={cardRef}>
        <CoffinCard title="Haunted Card">
          Content with subtle cursor effects
        </CoffinCard>
      </div>
    </CursorEffectProvider>
  );
}
```

**Recommended Settings for CoffinCard:**
- `type: 'card'` - Applies subtle edge lighting and gentle distortion
- `intensity: 0.3-0.5` - Subtle effects that don't overpower the card design
- `distortion: true` - Adds supernatural warping on hover
- `attraction: 'none'` or low strength - Cards should remain stable

## Existing Cursor Component Compatibility

### GhostCursor

The `GhostCursor` component creates a custom ghost-shaped cursor with a trail. When using the global cursor effect system, you should choose one approach:

**Option 1: Use Global Cursor Effects Only (Recommended)**
```tsx
import { CursorEffectProvider } from '@ghostui/core';

function App() {
  return (
    <CursorEffectProvider config={{ theme: 'spooky' }}>
      {/* Your app content */}
    </CursorEffectProvider>
  );
}
```

**Option 2: Use GhostCursor Only**
```tsx
import { GhostCursor } from '@ghostui/core';

function App() {
  return (
    <>
      <GhostCursor color="#A855F7" size={20} trailLength={8} />
      {/* Your app content */}
    </>
  );
}
```

**Option 3: Combine with Reduced Intensity**
```tsx
import { CursorEffectProvider } from '@ghostui/core';
import { GhostCursor } from '@ghostui/core';

function App() {
  return (
    <CursorEffectProvider config={{ intensity: 0.3 }}>
      <GhostCursor color="#A855F7" size={20} trailLength={8} />
      {/* Your app content */}
    </CursorEffectProvider>
  );
}
```

**Note:** Using both simultaneously may create visual clutter. If you want both effects, reduce the global intensity to 0.2-0.4.

## Theme Integration

### GhostUI Color System

The cursor effect system integrates with GhostUI's color system using CSS variables:

```tsx
import { CursorEffectProvider } from '@ghostui/core';

const ghostUITheme = {
  colors: {
    primary: 'var(--ghost-green, #22C55E)',
    secondary: 'var(--ghost-purple, #A855F7)',
    tertiary: 'var(--ghost-blood, #991B1B)',
  },
  glowSize: 300,
  glowOpacity: 0.15,
  distortionIntensity: 0.8,
};

function App() {
  return (
    <CursorEffectProvider config={{ theme: ghostUITheme }}>
      {/* Your app content */}
    </CursorEffectProvider>
  );
}
```

### Preset Themes

The system includes preset themes that match GhostUI's aesthetic:

- **spooky**: Slime green, spectral purple, blood red (default)
- **minimal**: Subtle purple tones with reduced intensity
- **intense**: Vibrant red, orange, yellow with maximum effects

```tsx
<CursorEffectProvider config={{ theme: 'spooky' }}>
  {/* Your app */}
</CursorEffectProvider>
```

## Performance Considerations

### Many Components

When using cursor effects with many components (20+), the system automatically enables spatial partitioning for optimal performance:

```tsx
function ManyButtons() {
  return (
    <CursorEffectProvider>
      {Array.from({ length: 50 }, (_, i) => {
        const ref = useCursorEffect({ type: 'button' });
        return <GooeyButton key={i} ref={ref}>Button {i}</GooeyButton>;
      })}
    </CursorEffectProvider>
  );
}
```

### Mobile Devices

Disable cursor effects on mobile to prevent interference with touch interactions:

```tsx
<CursorEffectProvider config={{ disableOnMobile: true }}>
  {/* Your app */}
</CursorEffectProvider>
```

### Reduced Motion

The system automatically respects `prefers-reduced-motion` settings:

```tsx
// No configuration needed - automatically detected
<CursorEffectProvider>
  {/* Effects will be disabled/reduced for users who prefer reduced motion */}
</CursorEffectProvider>
```

## Migration Guide

### From GhostCursor to Global Effects

**Before:**
```tsx
import { GhostCursor } from '@ghostui/core';

function App() {
  return (
    <>
      <GhostCursor />
      <button>Click me</button>
    </>
  );
}
```

**After:**
```tsx
import { CursorEffectProvider, useCursorEffect } from '@ghostui/core';

function App() {
  const buttonRef = useCursorEffect({ type: 'button' });
  
  return (
    <CursorEffectProvider>
      <button ref={buttonRef}>Click me</button>
    </CursorEffectProvider>
  );
}
```

## Best Practices

1. **Choose One Cursor System**: Use either global effects OR individual cursor components, not both at full intensity
2. **Match Intensity to Component**: Buttons get high intensity (0.7-1.0), cards get low intensity (0.3-0.5)
3. **Test on Mobile**: Always test with `disableOnMobile: true` to ensure good touch experience
4. **Respect Accessibility**: The system automatically handles reduced motion preferences
5. **Use Type-Specific Settings**: Leverage the `type` prop to get appropriate effects for each component type
6. **Monitor Performance**: With 20+ elements, spatial partitioning activates automatically
7. **Theme Consistency**: Use GhostUI color variables for consistent theming across components

## Troubleshooting

### Effects Not Appearing

1. Ensure `CursorEffectProvider` wraps your app
2. Check that components have refs from `useCursorEffect`
3. Verify effects are enabled in config: `effects: { glow: true, ... }`

### Performance Issues

1. Enable `disableOnMobile: true` for mobile devices
2. Reduce `intensity` to 0.3-0.5
3. Disable unused effects: `effects: { waves: false, particles: false }`
4. Limit simultaneous components to reasonable numbers

### Conflicts with Other Cursor Components

1. Remove or reduce intensity of GhostCursor
2. Set global intensity to 0.2-0.3 when combining
3. Disable specific effects that conflict: `effects: { glow: false }`

## Examples

See the documentation page at `apps/docs/app/docs/components/cursor-effects/page.tsx` for live examples and interactive demos.
