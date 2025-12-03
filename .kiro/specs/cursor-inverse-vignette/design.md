# Cursor-Following Inverse Vignette - Design

## Architecture Overview

The component will use React hooks to track cursor position and apply a radial gradient mask that follows the cursor, creating an "inverse flashlight" effect.

## Component Structure

### Component Name
`HauntedVignette` (replaces existing component)

### Props Interface
```typescript
export interface HauntedVignetteProps {
  /** Size of the clear circular area around cursor (in pixels) */
  radius?: number;
  
  /** Darkness intensity of the vignetted area */
  intensity?: 'light' | 'medium' | 'heavy' | number;
  
  /** Size of the gradient transition (in pixels) */
  gradientSize?: number;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Whether the effect is enabled */
  enabled?: boolean;
}
```

## Technical Design

### 1. Cursor Tracking
**Approach:** Use `mousemove` event listener with throttling

**Implementation:**
- Add event listener on component mount
- Use `requestAnimationFrame` for performance optimization
- Store cursor position in React state
- Clean up listener on unmount

**Rationale:** RAF provides better performance than throttling with setTimeout and ensures updates happen at optimal times for rendering.

### 2. Visual Effect
**Approach:** CSS radial gradient with dynamic center point

**Implementation:**
- Use inline styles to update gradient center based on cursor position
- Apply `radial-gradient` with configurable radius and gradient size
- Use CSS custom properties for dynamic values

**Example gradient:**
```css
radial-gradient(
  circle at [cursorX]px [cursorY]px,
  transparent 0%,
  transparent [radius]px,
  rgba(0,0,0,[intensity]) [radius + gradientSize]px
)
```

### 3. Performance Optimization
**Techniques:**
- Use `requestAnimationFrame` to batch updates
- Apply `will-change: transform` for GPU acceleration
- Use `pointer-events: none` to prevent interaction blocking
- Memoize gradient calculation

### 4. Default Values
```typescript
const defaults = {
  radius: 200,           // 200px clear area
  intensity: 0.85,       // 85% darkness (medium)
  gradientSize: 150,     // 150px soft transition
  enabled: true
}
```

**Intensity mapping:**
- `light`: 0.6 (60% opacity)
- `medium`: 0.85 (85% opacity)
- `heavy`: 0.95 (95% opacity)
- Custom number: direct opacity value

## Implementation Details

### State Management
```typescript
const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
const rafRef = useRef<number>();
```

### Event Handler Pattern
```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };
}, []);
```

### Gradient Calculation
```typescript
const getIntensityValue = (intensity: string | number): number => {
  if (typeof intensity === 'number') return intensity;
  const map = { light: 0.6, medium: 0.85, heavy: 0.95 };
  return map[intensity] || 0.85;
};

const gradientStyle = {
  background: `radial-gradient(
    circle at ${cursorPos.x}px ${cursorPos.y}px,
    transparent 0%,
    transparent ${radius}px,
    rgba(0, 0, 0, ${intensityValue}) ${radius + gradientSize}px
  )`
};
```

## Edge Cases

### 1. Initial Cursor Position
**Issue:** Cursor position unknown on mount
**Solution:** Default to center of viewport or wait for first mouse move

### 2. Cursor Outside Viewport
**Issue:** User moves cursor outside browser window
**Solution:** Keep last known position, optionally fade effect

### 3. Mobile/Touch Devices
**Issue:** No cursor on touch devices
**Solution:** Disable effect or use touch position (future enhancement)

### 4. Performance on Large Screens
**Issue:** Large viewport requires more GPU processing
**Solution:** RAF throttling handles this naturally

## Accessibility Considerations

- `pointer-events: none` - ensures no interaction blocking
- `aria-hidden="true"` - hides from screen readers
- No keyboard trap issues
- Does not affect focus management

## Migration from Old Component

### Breaking Changes
- Props interface changes (removes old intensity-only approach)
- Visual behavior completely different

### Migration Path
1. Update component implementation
2. Update documentation examples
3. Update existing usage in docs site
4. Provide migration guide in changelog

### Backward Compatibility
- Keep `intensity` prop with same values for familiarity
- Add new props as optional with sensible defaults

## Testing Strategy

### Unit Tests
- Props validation
- Default values application
- Intensity mapping function
- Event listener cleanup

### Integration Tests
- Cursor tracking accuracy
- Performance under rapid movement
- Memory leak detection

### Visual Tests
- Gradient rendering at different radii
- Intensity levels visual comparison
- Gradient softness variations

## Documentation Updates Required

1. Component page (`apps/docs/app/docs/components/haunted-vignette/page.tsx`)
2. Props table with new interface
3. Interactive examples showing cursor following
4. Code examples with new props
5. Migration guide from old version

## Performance Targets

- 60fps during cursor movement
- < 5ms per frame update
- No memory leaks over extended use
- < 1KB additional bundle size

## Future Enhancements (Out of Scope)

- Touch device support with tap position
- Multiple light sources
- Animated transitions on enable/disable
- Custom shapes (ellipse, rectangle)
- Color tinting options
- Parallax effect with depth
