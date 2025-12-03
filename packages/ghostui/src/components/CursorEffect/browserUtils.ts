/**
 * Browser capability detection and error handling utilities
 * 
 * Provides functions to detect browser support for various features
 * and handle graceful degradation when features are not available.
 */

/**
 * Check if CSS filters are supported
 */
export function supportsCSSFilters(): boolean {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return false;
  }
  
  try {
    return CSS.supports('filter', 'blur(10px)');
  } catch (e) {
    return false;
  }
}

/**
 * Check if SVG filters are supported
 */
export function supportsSVGFilters(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  
  try {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    return svg && filter && typeof filter.setAttribute === 'function';
  } catch (e) {
    return false;
  }
}

/**
 * Check if mix-blend-mode is supported
 */
export function supportsBlendModes(): boolean {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
    return false;
  }
  
  try {
    return CSS.supports('mix-blend-mode', 'screen');
  } catch (e) {
    return false;
  }
}

/**
 * Check if requestAnimationFrame is supported
 */
export function supportsRAF(): boolean {
  return typeof requestAnimationFrame !== 'undefined';
}

/**
 * Check if user prefers reduced motion
 * Returns true if user has enabled reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  } catch (e) {
    return false;
  }
}

/**
 * Clamp a number to a range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Validate and clamp intensity value to 0-1 range
 */
export function validateIntensity(intensity: number | undefined, defaultValue: number = 1.0): number {
  if (intensity === undefined || intensity === null) {
    return defaultValue;
  }
  
  if (typeof intensity !== 'number' || isNaN(intensity)) {
    console.warn('[CursorEffect] Invalid intensity value, using default:', defaultValue);
    return defaultValue;
  }
  
  return clamp(intensity, 0, 1);
}

/**
 * Validate and sanitize proximity radius
 */
export function validateProximityRadius(radius: number | undefined, defaultValue: number = 150): number {
  if (radius === undefined || radius === null) {
    return defaultValue;
  }
  
  if (typeof radius !== 'number' || isNaN(radius) || radius < 0) {
    console.warn('[CursorEffect] Invalid proximity radius, using default:', defaultValue);
    return defaultValue;
  }
  
  return radius;
}

/**
 * Check if a DOM element is still attached to the document
 */
export function isElementAttached(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }
  
  return document.body.contains(element);
}

/**
 * Check if a DOMRect is valid (has non-zero dimensions)
 */
export function isValidBounds(bounds: DOMRect): boolean {
  return bounds.width > 0 && bounds.height > 0;
}

/**
 * Safely get element bounds, returning a default DOMRect if element is null or detached
 */
export function safeGetBounds(element: HTMLElement | null): DOMRect {
  if (!element || !isElementAttached(element)) {
    return new DOMRect(0, 0, 0, 0);
  }
  
  try {
    return element.getBoundingClientRect();
  } catch (e) {
    console.warn('[CursorEffect] Error getting element bounds:', e);
    return new DOMRect(0, 0, 0, 0);
  }
}

/**
 * Get browser capabilities for cursor effects
 */
export interface BrowserCapabilities {
  cssFilters: boolean;
  svgFilters: boolean;
  blendModes: boolean;
  raf: boolean;
  canUseDistortion: boolean;
  canUseGlow: boolean;
}

/**
 * Detect all browser capabilities at once
 */
export function detectBrowserCapabilities(): BrowserCapabilities {
  const cssFilters = supportsCSSFilters();
  const svgFilters = supportsSVGFilters();
  const blendModes = supportsBlendModes();
  const raf = supportsRAF();
  
  return {
    cssFilters,
    svgFilters,
    blendModes,
    raf,
    // Distortion requires either CSS or SVG filters
    canUseDistortion: cssFilters || svgFilters,
    // Glow requires blend modes for best effect, but can work without
    canUseGlow: true, // Always available, just less ethereal without blend modes
  };
}
