# Cursor Effects Accessibility Implementation

This document describes the accessibility features implemented in the Global Cursor Effects system.

## Overview

The cursor effects system has been designed with accessibility as a core principle, ensuring that visual effects enhance the user experience without creating barriers for users with disabilities or specific preferences.

## Implemented Features

### 1. Reduced Motion Support

**Implementation**: The system detects and respects the user's `prefers-reduced-motion` preference.

**Behavior**:
- When `prefers-reduced-motion: reduce` is detected, all cursor effects are completely disabled
- The system listens for changes to this preference and updates dynamically
- No animations or visual effects are rendered when reduced motion is preferred

**Code Location**: 
- Detection: `packages/ghostui/src/components/CursorEffect/browserUtils.ts` (`prefersReducedMotion()`)
- Implementation: `packages/ghostui/src/components/CursorEffect/CursorContext.tsx` (`shouldEnableCursorEffects()`)

**Testing**: See `accessibility.test.tsx` - "Reduced Motion Preference" test suite

### 2. ARIA Hidden Attributes

**Implementation**: All cursor effect elements are marked with `aria-hidden="true"` to hide them from screen readers.

**Rationale**: Cursor effects are purely decorative visual enhancements that provide no semantic meaning or interactive functionality. Screen reader users should not be aware of these elements.

**Affected Components**:
- `EffectRenderer` - Main effects layer container
- `GlowAura` - Cursor glow effect
- `DistortionField` - Distortion overlays
- `WaveGenerator` - Wave rings and collision effects
- `ParticleSystem` - Particle effects

**Code Locations**:
- `packages/ghostui/src/components/CursorEffect/EffectRenderer.tsx`
- `packages/ghostui/src/components/CursorEffect/GlowAura.tsx`
- `packages/ghostui/src/components/CursorEffect/DistortionField.tsx`
- `packages/ghostui/src/components/CursorEffect/WaveGenerator.tsx`
- `packages/ghostui/src/components/CursorEffect/ParticleSystem.tsx`

**Testing**: See `accessibility.test.tsx` - "ARIA Attributes" test suite

### 3. Keyboard Navigation

**Implementation**: Effects do not interfere with keyboard navigation.

**Features**:
- All effect elements have `pointer-events: none` to prevent blocking interactions
- Effects only respond to mouse/pointer events, never to focus events
- Focusable elements remain fully accessible via keyboard
- Tab order is not affected by cursor effects

**Code Location**: `packages/ghostui/src/components/CursorEffect/EffectRenderer.tsx`

**Testing**: See `accessibility.test.tsx` - "Keyboard Navigation" test suite

### 4. Focus Indicators

**Implementation**: Effects are layered to ensure focus indicators remain visible.

**Details**:
- Effects layer uses `z-index: 9999`
- Focus indicators should use `z-index: 10000` or higher to remain visible
- Effects do not obscure or interfere with focus outlines
- Documentation comment added to `EffectRenderer` to guide developers

**Code Location**: `packages/ghostui/src/components/CursorEffect/EffectRenderer.tsx`

**Testing**: See `accessibility.test.tsx` - "Focus Indicators" test suite

## Browser Compatibility

The accessibility features gracefully degrade in older browsers:

- `matchMedia` support is checked before use
- Errors in `prefersReducedMotion()` are caught and default to `false`
- Missing APIs result in effects being disabled rather than errors

## Testing

Comprehensive test coverage is provided in `accessibility.test.tsx`:

- ✅ Reduced motion detection
- ✅ Dynamic preference changes
- ✅ ARIA hidden attributes
- ✅ Keyboard navigation
- ✅ Focus indicator visibility
- ✅ Graceful degradation

All tests pass successfully.

## Usage Guidelines

### For Developers

1. **Focus Indicators**: When styling focus indicators in your application, use `z-index: 10000` or higher to ensure they remain visible above cursor effects.

2. **Custom Effects**: If extending the cursor effects system with custom effects, ensure:
   - Add `aria-hidden="true"` to all decorative elements
   - Use `pointer-events: none` to prevent interaction blocking
   - Respect the `prefersReducedMotion()` setting

3. **Testing**: Always test your application with:
   - Reduced motion enabled (`prefers-reduced-motion: reduce`)
   - Keyboard-only navigation
   - Screen readers

### For Users

Users can disable cursor effects by:
1. Enabling "Reduce motion" in their operating system settings
2. Using a touch-only device (effects are automatically disabled)
3. The application can also provide a manual toggle via the `disableOnMobile` config prop

## Compliance

This implementation follows:
- **WCAG 2.1 Level AA** guidelines for motion and animation
- **ARIA 1.2** best practices for decorative content
- **Web Content Accessibility Guidelines** for keyboard navigation

## Future Enhancements

Potential future accessibility improvements:
- User preference storage for manual effect toggling
- Configurable intensity levels for users who want reduced but not disabled effects
- High contrast mode detection and adaptation
- Additional keyboard shortcuts for effect control

## References

- [WCAG 2.1 - Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [ARIA - Hidden](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden)
