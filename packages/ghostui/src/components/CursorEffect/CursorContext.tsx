import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  CursorEffectConfig,
  CursorEffectOptions,
  CursorState,
  CursorTheme,
  RegisteredElement,
  DEFAULT_CURSOR_CONFIG,
  PRESET_THEMES,
} from '../../types/cursor-effects';
import { CursorTracker, CursorTrackerState } from './CursorTracker';
import { resolveTheme, getCurrentTheme } from './themeUtils';
import { updateAllElementProximity, detectProximityChanges, SPATIAL_PARTITIONING_THRESHOLD } from './proximityUtils';
import { SpatialGrid } from './SpatialGrid';
import { EffectRenderer } from './EffectRenderer';
import { 
  validateIntensity, 
  validateProximityRadius, 
  isElementAttached,
  detectBrowserCapabilities,
  prefersReducedMotion,
  BrowserCapabilities
} from './browserUtils';

/**
 * Context value interface for cursor effects
 */
export interface CursorContextValue {
  state: CursorState;
  registerElement: (
    id: string,
    ref: React.RefObject<HTMLElement>,
    options: CursorEffectOptions
  ) => void;
  unregisterElement: (id: string) => void;
  config: Required<CursorEffectConfig>;
}

/**
 * Cursor effect context
 */
const CursorContext = createContext<CursorContextValue | null>(null);

/**
 * Hook to access cursor effect context
 */
export function useCursorContext(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorContext must be used within CursorEffectProvider');
  }
  return context;
}

/**
 * Props for CursorEffectProvider
 */
export interface CursorEffectProviderProps {
  config?: CursorEffectConfig;
  children: React.ReactNode;
}

/**
 * Detect device capabilities (touch vs mouse)
 */
function detectDeviceCapabilities(): { hasTouch: boolean; hasMouse: boolean } {
  // SSR safety check
  if (typeof window === 'undefined') {
    return { hasTouch: false, hasMouse: true };
  }
  
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const hasMouse = window.matchMedia('(pointer: fine)').matches;
  
  return { hasTouch, hasMouse };
}

/**
 * Determine if cursor effects should be enabled based on device and configuration
 */
function shouldEnableCursorEffects(config: Required<CursorEffectConfig>): boolean {
  const { hasTouch, hasMouse } = detectDeviceCapabilities();
  
  // Respect user's reduced motion preference - disable all effects
  if (prefersReducedMotion()) {
    return false;
  }
  
  // Explicit disable on mobile
  if (config.disableOnMobile && hasTouch) {
    return false;
  }
  
  // Touch-only device (no mouse)
  if (hasTouch && !hasMouse) {
    return false;
  }
  
  // Desktop or hybrid device with mouse
  return true;
}

/**
 * CursorEffectProvider component
 * 
 * Provides global cursor effect system through React context.
 * 
 * Features:
 * - React context for cursor state management
 * - Configuration props for theme, intensity, and enabled effects
 * - Device detection (touch vs mouse)
 * - disableOnMobile logic
 * - Initializes cursor tracking on mount
 * - Element registration system
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 10.1, 10.2, 10.3
 */
export function CursorEffectProvider({ config = {}, children }: CursorEffectProviderProps) {
  // Detect browser capabilities for graceful degradation
  const browserCapabilities = useRef<BrowserCapabilities>(detectBrowserCapabilities());
  
  // Merge provided config with defaults and validate all values
  const mergedConfig: Required<CursorEffectConfig> = {
    ...DEFAULT_CURSOR_CONFIG,
    ...config,
    // Validate and clamp intensity to 0-1 range for error handling
    intensity: validateIntensity(config.intensity, DEFAULT_CURSOR_CONFIG.intensity),
    // Validate proximity radius
    proximityRadius: validateProximityRadius(config.proximityRadius, DEFAULT_CURSOR_CONFIG.proximityRadius),
    effects: {
      ...DEFAULT_CURSOR_CONFIG.effects,
      ...config.effects,
      // Disable distortion if browser doesn't support filters
      distortion: (config.effects?.distortion ?? DEFAULT_CURSOR_CONFIG.effects.distortion) && browserCapabilities.current.canUseDistortion,
    },
  };
  
  // Determine if effects should be enabled
  const [isEnabled, setIsEnabled] = useState<boolean>(() => 
    shouldEnableCursorEffects(mergedConfig)
  );
  
  // Resolve theme from config
  const resolvedTheme = resolveTheme(mergedConfig.theme);
  
  // Cursor state
  const [cursorState, setCursorState] = useState<CursorState>({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0, magnitude: 0 },
    isMoving: false,
    isClicking: false,
    currentTheme: resolvedTheme,
    activeElements: new Map<string, RegisteredElement>(),
  });
  
  // Track if mouse has been detected (for hybrid devices)
  const mouseDetectedRef = useRef<boolean>(false);
  
  // Spatial grid for performance optimization (enabled when element count > 20)
  const spatialGridRef = useRef<SpatialGrid>(new SpatialGrid());
  
  // Handle cursor tracker state changes
  const handleCursorStateChange = useCallback((trackerState: CursorTrackerState) => {
    setCursorState(prev => {
      // Calculate current theme based on position
      const currentTheme = getCurrentTheme(
        trackerState.position,
        mergedConfig
      );
      
      // Update proximity for all registered elements
      // Pass spatial grid if element count exceeds threshold
      const updatedElements = updateAllElementProximity(
        prev.activeElements,
        trackerState.position,
        mergedConfig.proximityRadius,
        prev.activeElements.size > SPATIAL_PARTITIONING_THRESHOLD ? spatialGridRef.current : undefined
      );
      
      // Detect proximity changes and trigger callbacks
      detectProximityChanges(prev.activeElements, updatedElements);
      
      return {
        ...prev,
        position: trackerState.position,
        velocity: trackerState.velocity,
        isMoving: trackerState.isMoving,
        isClicking: trackerState.isClicking,
        currentTheme,
        activeElements: updatedElements,
      };
    });
  }, [mergedConfig]);
  
  // Register an element for cursor effects
  const registerElement = useCallback(
    (id: string, ref: React.RefObject<HTMLElement>, options: CursorEffectOptions) => {
      // Validate ref is not null
      if (!ref.current) {
        console.warn('[CursorEffect] Attempted to register element with null ref:', id);
        return;
      }
      
      // Check if element is attached to DOM
      if (!isElementAttached(ref.current)) {
        console.warn('[CursorEffect] Attempted to register detached element:', id);
        return;
      }
      
      setCursorState(prev => {
        const newActiveElements = new Map(prev.activeElements);
        
        // Get initial bounds if element exists
        const bounds = ref.current?.getBoundingClientRect() || new DOMRect();
        
        // Validate options intensity if provided
        const validatedOptions: CursorEffectOptions = {
          ...options,
          intensity: options.intensity !== undefined ? validateIntensity(options.intensity, 1.0) : undefined,
          proximityRadius: options.proximityRadius !== undefined ? validateProximityRadius(options.proximityRadius, mergedConfig.proximityRadius) : undefined,
          attractionStrength: options.attractionStrength !== undefined ? validateIntensity(options.attractionStrength, 0.5) : undefined,
        };
        
        const registeredElement: RegisteredElement = {
          id,
          ref,
          options: validatedOptions,
          bounds,
          distance: Infinity,
          isInProximity: false,
          isHovered: false,
        };
        
        newActiveElements.set(id, registeredElement);
        
        // Add to spatial grid if element has valid bounds
        if (bounds.width > 0 && bounds.height > 0) {
          spatialGridRef.current.addElement(id, registeredElement);
        }
        
        return {
          ...prev,
          activeElements: newActiveElements,
        };
      });
    },
    [mergedConfig.proximityRadius]
  );
  
  // Unregister an element from cursor effects
  const unregisterElement = useCallback((id: string) => {
    setCursorState(prev => {
      const element = prev.activeElements.get(id);
      const newActiveElements = new Map(prev.activeElements);
      newActiveElements.delete(id);
      
      // Remove from spatial grid
      if (element) {
        spatialGridRef.current.removeElement(id, element);
      }
      
      return {
        ...prev,
        activeElements: newActiveElements,
      };
    });
  }, []);
  
  // Listen for changes to reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User enabled reduced motion - disable effects
        setIsEnabled(false);
      } else {
        // User disabled reduced motion - re-enable if appropriate
        setIsEnabled(shouldEnableCursorEffects(mergedConfig));
      }
    };
    
    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionPreferenceChange);
      return () => {
        mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      };
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionPreferenceChange);
      return () => {
        mediaQuery.removeListener(handleMotionPreferenceChange);
      };
    }
  }, [mergedConfig]);
  
  // Detect mouse movement on hybrid devices
  useEffect(() => {
    if (!isEnabled) return;
    
    const { hasTouch, hasMouse } = detectDeviceCapabilities();
    
    // For hybrid devices, wait for actual mouse movement before activating
    if (hasTouch && hasMouse && !mouseDetectedRef.current) {
      const handleFirstMouseMove = () => {
        mouseDetectedRef.current = true;
        setIsEnabled(true);
      };
      
      window.addEventListener('mousemove', handleFirstMouseMove, { once: true });
      
      return () => {
        window.removeEventListener('mousemove', handleFirstMouseMove);
      };
    }
  }, [isEnabled]);
  
  // Update spatial grid when elements move or resize
  // This effect rebuilds the grid periodically to account for element position changes
  useEffect(() => {
    if (!isEnabled) return;
    
    // Only rebuild if we have enough elements to benefit from spatial partitioning
    if (cursorState.activeElements.size <= SPATIAL_PARTITIONING_THRESHOLD) {
      return;
    }
    
    // Rebuild grid on a timer to catch element movements
    // This is a trade-off: more frequent updates = more accurate but more CPU
    const rebuildInterval = setInterval(() => {
      spatialGridRef.current.rebuild(cursorState.activeElements);
    }, 1000); // Rebuild every second
    
    return () => {
      clearInterval(rebuildInterval);
    };
  }, [isEnabled, cursorState.activeElements]);
  
  // Detect and unregister detached DOM elements
  // This prevents memory leaks and ensures we don't try to interact with removed elements
  useEffect(() => {
    if (!isEnabled) return;
    
    const cleanupInterval = setInterval(() => {
      const detachedIds: string[] = [];
      
      cursorState.activeElements.forEach((element, id) => {
        // Check if element ref is null or element is detached from DOM
        if (!element.ref.current || !isElementAttached(element.ref.current)) {
          detachedIds.push(id);
        }
      });
      
      // Unregister all detached elements
      if (detachedIds.length > 0) {
        detachedIds.forEach(id => {
          unregisterElement(id);
        });
        
        // Log in development mode (if available)
        // Note: Logging disabled to avoid build issues with process.env
      }
    }, 2000); // Check every 2 seconds
    
    return () => {
      clearInterval(cleanupInterval);
    };
  }, [isEnabled, cursorState.activeElements, unregisterElement]);
  
  // Context value
  const contextValue: CursorContextValue = {
    state: cursorState,
    registerElement,
    unregisterElement,
    config: mergedConfig,
  };
  
  // If effects are disabled, just render children without cursor tracking
  if (!isEnabled) {
    return <>{children}</>;
  }
  
  return (
    <CursorContext.Provider value={contextValue}>
      <CursorTracker onStateChange={handleCursorStateChange} />
      <EffectRenderer cursorState={cursorState} config={mergedConfig} />
      {children}
    </CursorContext.Provider>
  );
}
