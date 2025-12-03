import { CursorTheme, CursorEffectConfig, PRESET_THEMES } from '../../types/cursor-effects';

/**
 * Get the resolved theme from configuration
 * Handles both preset theme names and custom theme objects
 */
export function resolveTheme(theme?: 'spooky' | 'minimal' | 'intense' | CursorTheme): CursorTheme {
  const themeValue = theme || 'spooky';
  
  // If theme is a string, look up the preset
  if (typeof themeValue === 'string') {
    return PRESET_THEMES[themeValue];
  }
  
  // Otherwise, it's a custom theme object
  return themeValue;
}

/**
 * Calculate the current theme color based on cursor position
 * Implements vertical zone detection (0-33%, 33-66%, 66-100%)
 * 
 * @param cursorPosition - Current cursor position {x, y}
 * @param config - Cursor effect configuration
 * @param viewportHeight - Height of the viewport (default: window.innerHeight)
 * @returns The theme with the appropriate color for the current zone
 */
export function getCurrentTheme(
  cursorPosition: { x: number; y: number },
  config: CursorEffectConfig,
  viewportHeight: number = typeof window !== 'undefined' ? window.innerHeight : 1000
): CursorTheme {
  const baseTheme = resolveTheme(config.theme);
  const transitionZones = config.colorTransitionZones || 'vertical';
  
  // Get the appropriate color based on zone type
  let color: string;
  
  if (transitionZones === 'vertical') {
    color = getVerticalZoneColor(cursorPosition.y, viewportHeight, baseTheme);
  } else if (transitionZones === 'horizontal') {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    color = getHorizontalZoneColor(cursorPosition.x, viewportWidth, baseTheme);
  } else if (transitionZones === 'radial') {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    color = getRadialZoneColor(cursorPosition, viewportWidth, viewportHeight, baseTheme);
  } else {
    // Default to primary color if unknown zone type
    color = baseTheme.colors.primary;
  }
  
  // Return theme with the calculated color as primary
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: color,
    },
  };
}

/**
 * Get color based on vertical position
 * 0-33% = primary, 33-66% = secondary, 66-100% = tertiary
 */
function getVerticalZoneColor(
  y: number,
  viewportHeight: number,
  theme: CursorTheme
): string {
  const percentage = y / viewportHeight;
  
  if (percentage < 0.33) {
    return theme.colors.primary;
  } else if (percentage < 0.66) {
    return theme.colors.secondary;
  } else {
    return theme.colors.tertiary;
  }
}

/**
 * Get color based on horizontal position
 * 0-33% = primary, 33-66% = secondary, 66-100% = tertiary
 */
function getHorizontalZoneColor(
  x: number,
  viewportWidth: number,
  theme: CursorTheme
): string {
  const percentage = x / viewportWidth;
  
  if (percentage < 0.33) {
    return theme.colors.primary;
  } else if (percentage < 0.66) {
    return theme.colors.secondary;
  } else {
    return theme.colors.tertiary;
  }
}

/**
 * Get color based on radial distance from center
 * Inner third = primary, middle third = secondary, outer third = tertiary
 */
function getRadialZoneColor(
  position: { x: number; y: number },
  viewportWidth: number,
  viewportHeight: number,
  theme: CursorTheme
): string {
  const centerX = viewportWidth / 2;
  const centerY = viewportHeight / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  
  const dx = position.x - centerX;
  const dy = position.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const percentage = distance / maxDistance;
  
  if (percentage < 0.33) {
    return theme.colors.primary;
  } else if (percentage < 0.66) {
    return theme.colors.secondary;
  } else {
    return theme.colors.tertiary;
  }
}

/**
 * Interpolate between two colors for smooth transitions
 * 
 * @param color1 - Start color (hex format)
 * @param color2 - End color (hex format)
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated color in hex format
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
  // Clamp factor to 0-1
  factor = Math.max(0, Math.min(1, factor));
  
  // Parse hex colors
  const c1 = parseHexColor(color1);
  const c2 = parseHexColor(color2);
  
  if (!c1 || !c2) {
    // If parsing fails, return the first color
    return color1;
  }
  
  // Interpolate each channel
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Parse a hex color string to RGB components
 */
function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  
  // Parse 6-digit hex
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b };
    }
  }
  
  return null;
}

/**
 * Get smooth color transition between zones
 * Provides gradual color changes near zone boundaries
 * 
 * @param cursorPosition - Current cursor position
 * @param config - Cursor effect configuration
 * @param transitionWidth - Width of transition zone as percentage (default: 0.1 = 10%)
 * @returns Theme with smoothly transitioned color
 */
export function getSmoothThemeTransition(
  cursorPosition: { x: number; y: number },
  config: CursorEffectConfig,
  transitionWidth: number = 0.1
): CursorTheme {
  const baseTheme = resolveTheme(config.theme);
  const transitionZones = config.colorTransitionZones || 'vertical';
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  
  let percentage: number;
  
  if (transitionZones === 'vertical') {
    percentage = cursorPosition.y / viewportHeight;
  } else if (transitionZones === 'horizontal') {
    percentage = cursorPosition.x / viewportWidth;
  } else if (transitionZones === 'radial') {
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const dx = cursorPosition.x - centerX;
    const dy = cursorPosition.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    percentage = distance / maxDistance;
  } else {
    percentage = 0;
  }
  
  // Determine which colors to interpolate between
  let color: string;
  
  if (percentage < 0.33 - transitionWidth / 2) {
    // Fully in primary zone
    color = baseTheme.colors.primary;
  } else if (percentage < 0.33 + transitionWidth / 2) {
    // Transition from primary to secondary
    const localFactor = (percentage - (0.33 - transitionWidth / 2)) / transitionWidth;
    color = interpolateColor(baseTheme.colors.primary, baseTheme.colors.secondary, localFactor);
  } else if (percentage < 0.66 - transitionWidth / 2) {
    // Fully in secondary zone
    color = baseTheme.colors.secondary;
  } else if (percentage < 0.66 + transitionWidth / 2) {
    // Transition from secondary to tertiary
    const localFactor = (percentage - (0.66 - transitionWidth / 2)) / transitionWidth;
    color = interpolateColor(baseTheme.colors.secondary, baseTheme.colors.tertiary, localFactor);
  } else {
    // Fully in tertiary zone
    color = baseTheme.colors.tertiary;
  }
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: color,
    },
  };
}
