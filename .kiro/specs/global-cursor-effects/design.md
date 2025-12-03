# Design Document

## Overview

The Global Cursor Effects system is a comprehensive React-based cursor interaction framework that creates atmospheric, spooky visual effects throughout an application. The system consists of a provider component that tracks cursor position globally, a hook-based API for components to opt-in to cursor interactions, and a rendering engine that applies various visual effects including glows, distortions, waves, and magnetic attraction forces.

The architecture follows React best practices with context-based state management, ref-based DOM tracking, and performance-optimized rendering using requestAnimationFrame and spatial partitioning. The system integrates seamlessly with the existing GhostUI component library and leverages Framer Motion for smooth, physics-based animations.

## Architecture

### Component Hierarchy

```
CursorEffectProvider (Context Provider)
├── CursorTracker (Position tracking)
├── EffectRenderer (Visual effects layer)
│   ├── GlowAura
│   ├── DistortionField
│   ├── WaveGenerator
│   └── ParticleSystem
└── InteractionManager (Element registration & proximity detection)
```

### Data Flow

1. **Cursor Tracking**: Global mouse event listener captures position and updates context
2. **Element Registration**: Components call `useCursorEffect` hook to register DOM refs
3. **Proximity Calculation**: InteractionManager calculates distances between cursor and registered elements
4. **Effect Application**: EffectRenderer applies visual effects based on proximity and interaction state
5. **Animation Loop**: requestAnimationFrame drives smooth updates at 60fps

### Technology Stack

- **React 18+**: Core framework with hooks and context
- **Framer Motion**: Animation library for smooth transitions and spring physics
- **TypeScript**: Type safety and developer experience
- **CSS Filters & SVG**: Visual distortion effects
- **Canvas API**: Wave propagation rendering (optional, for performance)


## Components and Interfaces

### CursorEffectProvider

The root provider component that initializes the cursor effect system and provides context to child components.

```typescript
interface CursorEffectConfig {
  theme?: 'spooky' | 'minimal' | 'intense' | CursorTheme;
  intensity?: number; // 0-1
  effects?: {
    glow?: boolean;
    distortion?: boolean;
    waves?: boolean;
    attraction?: boolean;
    particles?: boolean;
  };
  disableOnMobile?: boolean;
  proximityRadius?: number; // pixels
  maxWaves?: number;
  colorTransitionZones?: 'vertical' | 'horizontal' | 'radial';
}

interface CursorTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  glowSize: number;
  glowOpacity: number;
  distortionIntensity: number;
}

interface CursorEffectProviderProps {
  config?: CursorEffectConfig;
  children: React.ReactNode;
}
```

### useCursorEffect Hook

Hook for components to register for cursor interactions.

```typescript
interface CursorEffectOptions {
  type?: 'button' | 'card' | 'draggable' | 'link' | 'custom';
  intensity?: number; // 0-1, overrides global
  proximityRadius?: number; // overrides global
  attraction?: 'attract' | 'repel' | 'none';
  attractionStrength?: number; // 0-1
  distortion?: boolean;
  onProximityEnter?: () => void;
  onProximityExit?: () => void;
  onHover?: () => void;
}

function useCursorEffect(options?: CursorEffectOptions): React.RefObject<HTMLElement>
```


### CursorContext

Internal context for sharing cursor state across the system.

```typescript
interface CursorState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  isMoving: boolean;
  isClicking: boolean;
  currentTheme: CursorTheme;
  activeElements: Map<string, RegisteredElement>;
}

interface RegisteredElement {
  id: string;
  ref: React.RefObject<HTMLElement>;
  options: CursorEffectOptions;
  bounds: DOMRect;
  distance: number;
  isInProximity: boolean;
  isHovered: boolean;
}

interface CursorContextValue {
  state: CursorState;
  registerElement: (id: string, ref: React.RefObject<HTMLElement>, options: CursorEffectOptions) => void;
  unregisterElement: (id: string) => void;
  config: CursorEffectConfig;
}
```

### EffectRenderer Component

Renders all visual effects in a portal at the root level.

```typescript
interface EffectRendererProps {
  cursorState: CursorState;
  config: CursorEffectConfig;
  activeElements: Map<string, RegisteredElement>;
}
```


## Data Models

### Cursor Position Tracking

```typescript
interface CursorPosition {
  x: number;
  y: number;
  timestamp: number;
}

interface CursorVelocity {
  x: number; // pixels per frame
  y: number;
  magnitude: number; // overall speed
}
```

### Wave System

```typescript
interface Wave {
  id: string;
  origin: { x: number; y: number };
  radius: number;
  maxRadius: number;
  opacity: number;
  timestamp: number;
  color: string;
}

interface WaveConfig {
  speed: number; // pixels per frame
  maxRadius: number;
  opacity: number;
  color: string;
  affectsElements: boolean;
}
```

### Spatial Partitioning (for performance)

```typescript
interface SpatialGrid {
  cellSize: number;
  cells: Map<string, Set<string>>; // cell key -> element IDs
}

interface GridCell {
  x: number;
  y: number;
  elements: Set<string>;
}
```

### Color Theme System

```typescript
interface ColorZone {
  type: 'vertical' | 'horizontal' | 'radial';
  zones: Array<{
    threshold: number; // 0-1
    theme: CursorTheme;
  }>;
}

const PRESET_THEMES = {
  spooky: {
    colors: {
      primary: '#22C55E',   // slime green
      secondary: '#A855F7',  // spectral purple
      tertiary: '#991B1B',   // blood red
    },
    glowSize: 300,
    glowOpacity: 0.15,
    distortionIntensity: 0.8,
  },
  minimal: {
    colors: {
      primary: '#6366F1',
      secondary: '#8B5CF6',
      tertiary: '#A855F7',
    },
    glowSize: 200,
    glowOpacity: 0.08,
    distortionIntensity: 0.3,
  },
  intense: {
    colors: {
      primary: '#EF4444',
      secondary: '#F97316',
      tertiary: '#FBBF24',
    },
    glowSize: 400,
    glowOpacity: 0.25,
    distortionIntensity: 1.0,
  },
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Glow follows cursor position

*For any* cursor position update, the glow aura element should be rendered at coordinates matching the cursor position (adjusted for glow center offset) with the configured size and opacity.
**Validates: Requirements 1.1**

### Property 2: Color theme transitions at vertical thresholds

*For any* cursor y-coordinate, the glow color should match the theme associated with the vertical zone (0-33% = primary, 33-66% = secondary, 66-100% = tertiary).
**Validates: Requirements 1.2**

### Property 3: Stationary cursor triggers pulsing

*For any* cursor state where velocity magnitude is zero for more than 500ms, the glow aura should have an active pulsing animation.
**Validates: Requirements 1.3**

### Property 4: High velocity triggers trail effect

*For any* cursor movement where velocity magnitude exceeds a threshold (e.g., 10 pixels/frame), a trailing distortion effect should be rendered.
**Validates: Requirements 1.4**

### Property 5: Proximity detection accuracy

*For any* registered element and cursor position, the element should be marked as "in proximity" if and only if the distance between cursor and element center is less than or equal to the configured proximity radius.
**Validates: Requirements 2.5**

### Property 6: Proximity entry triggers animation

*For any* element that transitions from outside to inside the proximity zone, an approach animation should be triggered on that element.
**Validates: Requirements 2.1**

### Property 7: Elements in proximity receive transformations

*For any* element within the proximity zone, transformation styles (scale, rotate, or translate) should be applied based on the cursor direction vector.
**Validates: Requirements 2.2**

### Property 8: Proximity exit returns to original state

*For any* element, entering then exiting the proximity zone should result in the element returning to its original transform values (scale: 1, rotate: 0, translate: 0).
**Validates: Requirements 2.3**

### Property 9: Multiple elements affected simultaneously

*For any* cursor position, all registered elements within the proximity radius should have effects applied in the same animation frame.
**Validates: Requirements 2.4**

### Property 10: Hover triggers distortion

*For any* element where the cursor position is within the element's bounding box, a distortion effect should be applied to that element.
**Validates: Requirements 3.1**

### Property 11: Distortion intensity per component type

*For any* two elements with different component types (e.g., button vs card), the element with type 'button' should receive higher distortion intensity than type 'card'.
**Validates: Requirements 3.5**

### Property 12: Attraction displacement proportional to proximity

*For any* element with attraction enabled, the displacement distance should be proportional to (proximityRadius - distance) / proximityRadius, scaled by attraction strength.
**Validates: Requirements 4.1**

### Property 13: Attraction exit returns to origin

*For any* element with attraction enabled, moving the cursor into then out of proximity should result in the element returning to its original position.
**Validates: Requirements 4.3**

### Property 14: Attraction vs repulsion modes

*For any* element, when attraction mode is 'attract', displacement should be toward the cursor; when mode is 'repel', displacement should be away from the cursor (opposite direction vector).
**Validates: Requirements 4.4**

### Property 15: Attraction intensity scaling

*For any* element with attraction enabled, setting intensity to 0 should produce zero displacement, and intensity to 1 should produce maximum displacement (up to configured limit).
**Validates: Requirements 4.5**


### Property 16: Click generates wave

*For any* mouse click event, a wave should be generated at the cursor position with initial radius 0 and expanding to maxRadius.
**Validates: Requirements 5.1**

### Property 17: Wave visual properties during propagation

*For any* active wave, it should have a visible radius, opacity, and color that change over time according to the wave configuration.
**Validates: Requirements 5.2**

### Property 18: Wave collision triggers element animation

*For any* element and wave, when the wave's radius intersects the element's bounding box, the element should trigger a brief animation.
**Validates: Requirements 5.3**

### Property 19: Continuous wave generation during movement

*For any* period of cursor movement, waves should be generated at regular intervals (e.g., every 200ms) while movement continues.
**Validates: Requirements 5.4**

### Property 20: Overlapping waves blend additively

*For any* two or more waves that overlap at a given point, their visual effects (opacity, distortion) should combine additively rather than overwriting each other.
**Validates: Requirements 5.5**

### Property 21: Button elements receive intensified effects

*For any* element with type 'button', the glow intensity and attraction strength should be higher than the default values.
**Validates: Requirements 6.1**

### Property 22: Draggable elements show grabbing indicator

*For any* element with type 'draggable' that is hovered, a grabbing cursor indicator should be displayed and attraction mode should be enabled.
**Validates: Requirements 6.2**

### Property 23: Card elements receive subtle effects

*For any* element with type 'card', the distortion intensity should be lower than default and edge lighting should be applied.
**Validates: Requirements 6.3**

### Property 24: Link elements trigger particles

*For any* element with type 'link' that is hovered, particle effects should be generated along the cursor trail.
**Validates: Requirements 6.4**

### Property 25: Component unmount cleanup

*For any* component that calls useCursorEffect and then unmounts, the element should be removed from the activeElements map and no longer receive cursor effects.
**Validates: Requirements 8.4**

### Property 26: Global intensity scales all effects

*For any* effect type (glow, distortion, attraction), changing the global intensity prop from value A to value B should scale the effect magnitude proportionally (e.g., intensity 0.5 produces half the effect of intensity 1.0).
**Validates: Requirements 9.2**

### Property 27: Configuration changes transition smoothly

*For any* configuration prop change (theme, intensity, effects), the visual transition should occur over a defined duration (e.g., 500ms) rather than instantly.
**Validates: Requirements 9.4**

### Property 28: Update rate throttling

*For any* sequence of rapid cursor movements, position updates should not exceed 60 per second (approximately 16.67ms between updates).
**Validates: Requirements 11.2**

### Property 29: Wave count limiting

*For any* sequence of wave generation events, the number of simultaneously active waves should never exceed the configured maximum (default 5).
**Validates: Requirements 11.5**


## Error Handling

### Invalid Configuration

- **Invalid intensity values**: Clamp intensity values to 0-1 range. Values below 0 become 0, values above 1 become 1.
- **Invalid proximity radius**: Use default value (150px) if provided radius is negative or non-numeric.
- **Invalid theme colors**: Fall back to default spooky theme if custom theme colors are malformed.
- **Missing required props**: Use sensible defaults for all optional configuration.

### DOM Reference Errors

- **Null refs**: Skip effect application for elements with null refs. Log warning in development mode.
- **Detached elements**: Automatically unregister elements whose DOM nodes are no longer in the document.
- **Invalid bounds**: Skip proximity calculations for elements that return invalid DOMRect (width/height of 0).

### Performance Degradation

- **Too many registered elements**: Automatically enable spatial partitioning when element count exceeds 20.
- **Slow frame rate**: Reduce effect complexity (disable particles, reduce wave count) if frame rate drops below 30fps for sustained period.
- **Memory leaks**: Implement cleanup in useEffect returns and component unmount to prevent listener accumulation.

### Browser Compatibility

- **No pointer events**: Gracefully degrade to basic cursor tracking using mousemove only.
- **No CSS filters support**: Fall back to simpler effects using opacity and transforms only.
- **No requestAnimationFrame**: Use setTimeout with 16ms delay as fallback.

### Mobile/Touch Devices

- **Touch-only devices**: Skip initialization entirely, render no effect elements.
- **Hybrid devices**: Initialize but don't activate until first mouse event detected.
- **Orientation changes**: Recalculate all element bounds and spatial grid on resize/orientation change.


## Testing Strategy

### Unit Testing

The system will use **Vitest** as the testing framework (already configured in the GhostUI package). Unit tests will cover:

**Component Rendering**:
- CursorEffectProvider renders without errors
- EffectRenderer renders glow, distortion, and wave elements
- useCursorEffect hook returns valid ref object

**Configuration Handling**:
- Theme presets load correct color values
- Intensity clamping works for out-of-range values
- Effect enable/disable flags control rendering

**Device Detection**:
- Touch-only device detection prevents initialization
- Hybrid device detection allows conditional activation
- disableOnMobile prop overrides device detection

**Cleanup and Memory**:
- Component unmount removes event listeners
- Element unregistration removes from activeElements map
- Wave cleanup removes expired waves from array

**Edge Cases**:
- Null refs are handled gracefully
- Invalid configuration falls back to defaults
- Zero registered elements doesn't cause errors

### Property-Based Testing

The system will use **fast-check** for property-based testing (already available in GhostUI dependencies). Property tests will verify universal behaviors across randomized inputs:

**Configuration**: 
- Each property-based test will run a minimum of 100 iterations to ensure thorough coverage
- Tests will use fast-check's built-in generators and custom generators for domain-specific types

**Test Tagging**:
- Each property-based test will include a comment tag in the format: `// Feature: global-cursor-effects, Property N: [property description]`
- This links test code directly to design document properties

**Property Test Coverage**:

1. **Cursor Position Tracking** (Properties 1-4):
   - Generate random cursor positions and verify glow rendering
   - Generate random velocities and verify trail effects
   - Test color theme transitions across vertical zones

2. **Proximity Detection** (Properties 5-9):
   - Generate random element positions and cursor positions
   - Verify proximity calculations are accurate
   - Test that all elements in range receive effects

3. **Distortion Effects** (Properties 10-11):
   - Generate random element types and verify intensity differences
   - Test hover detection across element bounds

4. **Attraction Forces** (Properties 12-15):
   - Generate random proximity values and verify proportional displacement
   - Test attraction vs repulsion modes produce opposite vectors
   - Verify intensity scaling from 0 to 1

5. **Wave System** (Properties 16-20):
   - Generate random click positions and verify wave creation
   - Test wave expansion and collision detection
   - Verify wave count limiting

6. **Component Type Behaviors** (Properties 21-24):
   - Generate elements of different types and verify type-specific effects
   - Test that buttons receive higher intensity than cards

7. **Lifecycle Management** (Property 25):
   - Test element registration and unregistration
   - Verify cleanup on unmount

8. **Configuration Scaling** (Properties 26-27):
   - Generate random intensity values and verify proportional scaling
   - Test smooth transitions between configurations

9. **Performance Constraints** (Properties 28-29):
   - Generate rapid cursor movements and verify throttling
   - Generate many waves and verify count limiting

### Integration Testing

Integration tests will verify the system works correctly with actual React components:

- Provider wraps application and makes context available
- Multiple components can register simultaneously
- Effects render correctly in DOM portal
- Theme changes propagate to all active effects
- Spatial partitioning activates with many elements

### Performance Testing

Performance tests will measure:

- Frame rate with varying numbers of registered elements (10, 50, 100)
- Memory usage over extended interaction periods
- Effect of spatial partitioning on calculation time
- Animation smoothness under load

### Visual Regression Testing

While not automated, visual testing guidelines will include:

- Glow appearance matches design mockups
- Distortion effects create intended supernatural aesthetic
- Color transitions are smooth and gradual
- Attraction forces feel magnetic and natural
- Wave propagation is visually clear


## Implementation Details

### Cursor Tracking System

The cursor tracking system uses a global event listener attached to the window object:

```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY, timestamp: Date.now() };
    
    // Calculate velocity
    const velocity = calculateVelocity(prevPosition, newPosition);
    
    // Throttle updates to 60fps
    if (Date.now() - lastUpdate < 16.67) return;
    
    // Update cursor state
    setCursorState(prev => ({
      ...prev,
      position: newPosition,
      velocity,
      isMoving: velocity.magnitude > 0.5,
    }));
    
    lastUpdate = Date.now();
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);
```

### Proximity Calculation with Spatial Partitioning

For performance with many elements, the system uses a spatial grid:

```typescript
class SpatialGrid {
  private cellSize: number = 200;
  private cells: Map<string, Set<string>> = new Map();
  
  getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }
  
  getNearbyElements(x: number, y: number, radius: number): Set<string> {
    const nearby = new Set<string>();
    const cellRadius = Math.ceil(radius / this.cellSize);
    
    // Check surrounding cells
    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        const key = this.getCellKey(x + dx * this.cellSize, y + dy * this.cellSize);
        const cellElements = this.cells.get(key);
        if (cellElements) {
          cellElements.forEach(id => nearby.add(id));
        }
      }
    }
    
    return nearby;
  }
}
```

### Effect Rendering Architecture

Effects are rendered in a React portal to ensure proper layering:

```typescript
const EffectRenderer: React.FC<EffectRendererProps> = ({ cursorState, config, activeElements }) => {
  return ReactDOM.createPortal(
    <div className="cursor-effects-layer" style={{ 
      position: 'fixed', 
      inset: 0, 
      pointerEvents: 'none', 
      zIndex: 9999 
    }}>
      {config.effects.glow && <GlowAura cursorState={cursorState} config={config} />}
      {config.effects.distortion && <DistortionField elements={activeElements} cursorState={cursorState} />}
      {config.effects.waves && <WaveGenerator cursorState={cursorState} config={config} />}
      {config.effects.particles && <ParticleSystem cursorState={cursorState} />}
    </div>,
    document.body
  );
};
```

### Glow Aura Implementation

The glow uses Framer Motion for smooth spring physics:

```typescript
const GlowAura: React.FC = ({ cursorState, config }) => {
  const currentTheme = getCurrentTheme(cursorState.position, config);
  
  return (
    <motion.div
      className="cursor-glow"
      style={{
        position: 'absolute',
        width: currentTheme.glowSize,
        height: currentTheme.glowSize,
        borderRadius: '50%',
        backgroundColor: currentTheme.colors.primary,
        filter: 'blur(60px)',
        mixBlendMode: 'screen',
      }}
      animate={{
        x: cursorState.position.x - currentTheme.glowSize / 2,
        y: cursorState.position.y - currentTheme.glowSize / 2,
        backgroundColor: currentTheme.colors.primary,
        scale: cursorState.isMoving ? [1, 1.05, 1] : [1, 1.1, 1],
        opacity: cursorState.isMoving ? currentTheme.glowOpacity : [currentTheme.glowOpacity, currentTheme.glowOpacity * 1.5, currentTheme.glowOpacity],
      }}
      transition={{
        x: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
        y: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
        backgroundColor: { duration: 0.8 },
        scale: { duration: cursorState.isMoving ? 0.3 : 2, repeat: Infinity },
        opacity: { duration: cursorState.isMoving ? 0.3 : 2, repeat: Infinity },
      }}
    />
  );
};
```

### Distortion Effect with SVG Filters

Distortion uses SVG filters for liquid, morphing effects:

```typescript
const DistortionField: React.FC = ({ elements, cursorState }) => {
  return (
    <>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="cursor-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      {Array.from(elements.values()).map(element => {
        if (!element.isHovered) return null;
        
        return (
          <motion.div
            key={element.id}
            className="distortion-overlay"
            style={{
              position: 'absolute',
              left: element.bounds.left,
              top: element.bounds.top,
              width: element.bounds.width,
              height: element.bounds.height,
              filter: 'url(#cursor-distortion)',
              pointerEvents: 'none',
            }}
            animate={{
              opacity: [0, element.options.intensity || 0.5, 0],
            }}
            transition={{
              duration: 0.5,
            }}
          />
        );
      })}
    </>
  );
};
```

### Wave Propagation System

Waves are managed in a state array with automatic cleanup:

```typescript
const WaveGenerator: React.FC = ({ cursorState, config }) => {
  const [waves, setWaves] = useState<Wave[]>([]);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newWave: Wave = {
        id: `wave-${Date.now()}`,
        origin: { x: e.clientX, y: e.clientY },
        radius: 0,
        maxRadius: 500,
        opacity: 0.6,
        timestamp: Date.now(),
        color: getCurrentTheme(cursorState.position, config).colors.primary,
      };
      
      setWaves(prev => {
        const updated = [...prev, newWave];
        return updated.slice(-config.maxWaves); // Keep only last N waves
      });
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [cursorState, config]);
  
  // Animation loop for wave expansion
  useEffect(() => {
    const animate = () => {
      setWaves(prev => {
        return prev
          .map(wave => ({
            ...wave,
            radius: wave.radius + 5, // Expand by 5px per frame
            opacity: wave.opacity * 0.98, // Fade out
          }))
          .filter(wave => wave.radius < wave.maxRadius && wave.opacity > 0.01);
      });
      
      requestAnimationFrame(animate);
    };
    
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);
  
  return (
    <>
      {waves.map(wave => (
        <motion.div
          key={wave.id}
          className="wave-ring"
          style={{
            position: 'absolute',
            left: wave.origin.x - wave.radius,
            top: wave.origin.y - wave.radius,
            width: wave.radius * 2,
            height: wave.radius * 2,
            borderRadius: '50%',
            border: `2px solid ${wave.color}`,
            opacity: wave.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
};
```

### Attraction Force Calculation

Attraction uses vector math to calculate displacement:

```typescript
function calculateAttraction(
  elementPos: { x: number; y: number },
  cursorPos: { x: number; y: number },
  options: CursorEffectOptions,
  distance: number,
  proximityRadius: number
): { x: number; y: number } {
  if (distance > proximityRadius) return { x: 0, y: 0 };
  
  // Calculate direction vector
  const dx = cursorPos.x - elementPos.x;
  const dy = cursorPos.y - elementPos.y;
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  
  if (magnitude === 0) return { x: 0, y: 0 };
  
  // Normalize direction
  const dirX = dx / magnitude;
  const dirY = dy / magnitude;
  
  // Calculate force strength (stronger when closer)
  const strength = (1 - distance / proximityRadius) * (options.attractionStrength || 0.5);
  
  // Apply direction based on mode
  const multiplier = options.attraction === 'repel' ? -1 : 1;
  
  // Maximum displacement of 50px
  const maxDisplacement = 50;
  const displacement = strength * maxDisplacement * multiplier;
  
  return {
    x: dirX * displacement,
    y: dirY * displacement,
  };
}
```

### Device Detection

Device detection uses multiple strategies:

```typescript
function detectDeviceCapabilities(): { hasTouch: boolean; hasMouse: boolean } {
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const hasMouse = window.matchMedia('(pointer: fine)').matches;
  
  return { hasTouch, hasMouse };
}

function shouldEnableCursorEffects(config: CursorEffectConfig): boolean {
  const { hasTouch, hasMouse } = detectDeviceCapabilities();
  
  // Explicit disable
  if (config.disableOnMobile && hasTouch) return false;
  
  // Touch-only device
  if (hasTouch && !hasMouse) return false;
  
  // Desktop or hybrid device
  return true;
}
```


## Performance Considerations

### Optimization Strategies

1. **Throttling**: Cursor position updates are throttled to 60fps (16.67ms) to prevent excessive re-renders
2. **Spatial Partitioning**: When element count exceeds 20, use grid-based spatial partitioning to reduce proximity calculations from O(n) to O(k) where k is elements in nearby cells
3. **RAF Batching**: All animation updates use requestAnimationFrame to batch DOM updates and synchronize with browser rendering
4. **GPU Acceleration**: Use CSS transforms (translate, scale, rotate) and opacity for animations instead of position properties
5. **Lazy Calculation**: Only calculate proximity for elements in viewport or nearby cells
6. **Effect Limiting**: Cap maximum simultaneous waves at 5, automatically remove oldest when limit exceeded
7. **Memoization**: Memoize theme calculations and color transitions to avoid repeated computations

### Memory Management

1. **Automatic Cleanup**: Remove event listeners and cancel RAF on component unmount
2. **Weak References**: Consider using WeakMap for element tracking to allow garbage collection
3. **Wave Pruning**: Automatically remove waves that have faded below opacity threshold or exceeded max radius
4. **Element Unregistration**: Automatically detect and unregister elements that are no longer in the DOM

### Rendering Optimization

1. **Portal Rendering**: Render all effects in a single portal to minimize React tree depth
2. **Conditional Rendering**: Only render effect types that are enabled in configuration
3. **CSS Containment**: Use CSS `contain` property on effect layer to isolate layout and paint
4. **Will-Change Hints**: Apply `will-change: transform, opacity` to animated elements for browser optimization

### Performance Monitoring

The system should include optional performance monitoring:

```typescript
interface PerformanceMetrics {
  fps: number;
  elementCount: number;
  activeWaves: number;
  proximityCalculationTime: number;
  renderTime: number;
}

function measurePerformance(): PerformanceMetrics {
  // Track frame rate
  // Measure calculation times
  // Report metrics for debugging
}
```

## Accessibility Considerations

### Motion Preferences

Respect user motion preferences:

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable or reduce animations
  // Keep only essential visual feedback
  // Remove pulsing and wave effects
}
```

### Keyboard Navigation

Cursor effects should not interfere with keyboard navigation:

- Effects only respond to mouse/pointer events, not focus events
- No visual effects on keyboard-focused elements unless explicitly configured
- Ensure effects don't obscure focus indicators

### Screen Readers

Cursor effects are purely visual and should not affect screen reader functionality:

- All effect elements have `aria-hidden="true"`
- No interactive elements in effect layer
- Effects don't interfere with semantic HTML structure

## Browser Compatibility

### Minimum Requirements

- **React**: 18.0.0 or higher
- **Browsers**: Modern browsers with ES6+ support
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

### Feature Detection

Graceful degradation for missing features:

```typescript
const supportsFilters = CSS.supports('filter', 'blur(10px)');
const supportsBlendModes = CSS.supports('mix-blend-mode', 'screen');
const supportsRAF = typeof requestAnimationFrame !== 'undefined';

// Fall back to simpler effects if features unavailable
```

### Polyfills

No polyfills required for core functionality. Optional polyfills for older browsers:

- `requestAnimationFrame` polyfill for IE11 (if support needed)
- Pointer events polyfill for older Safari versions

## Integration with Existing GhostUI Components

### Component Compatibility

The cursor effect system should work seamlessly with existing GhostUI components:

- **GooeyButton**: Automatically detected as type 'button', receives intensified effects
- **CoffinCard**: Automatically detected as type 'card', receives subtle effects
- **GhostCursor/CursedPointer**: Can coexist with global cursor effects or be disabled when global effects are active
- **WispTrail**: Can be integrated as a particle effect option

### Theme Integration

Use GhostUI's existing color system:

```typescript
const GHOSTUI_THEME_INTEGRATION = {
  spooky: {
    colors: {
      primary: 'var(--ghost-green, #22C55E)',
      secondary: 'var(--ghost-purple, #A855F7)',
      tertiary: 'var(--ghost-blood, #991B1B)',
    },
  },
};
```

### Export Structure

Add to GhostUI exports:

```typescript
// packages/ghostui/src/index.ts
export { CursorEffectProvider, useCursorEffect } from './components/CursorEffect';
export type { CursorEffectConfig, CursorEffectOptions } from './components/CursorEffect/types';
```

## Future Enhancements

Potential future additions (not in current scope):

1. **Sound Integration**: Optional audio feedback for interactions
2. **Custom Effect Plugins**: API for developers to create custom effect types
3. **3D Parallax**: Depth-based effects for layered elements
4. **Gesture Recognition**: Detect cursor patterns (circles, swipes) for special effects
5. **Multi-Cursor Support**: Handle multiple pointer devices simultaneously
6. **Recording/Playback**: Record cursor interactions for demos or testing
7. **WebGL Effects**: Advanced visual effects using WebGL shaders
8. **Collaborative Cursors**: Show multiple users' cursors in real-time applications

