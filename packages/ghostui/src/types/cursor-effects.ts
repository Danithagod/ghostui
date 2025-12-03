import React from 'react';

/**
 * Color theme configuration for cursor effects
 */
export interface CursorTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  glowSize: number;
  glowOpacity: number;
  distortionIntensity: number;
}

/**
 * Configuration for the cursor effect system
 */
export interface CursorEffectConfig {
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

/**
 * Options for individual elements using cursor effects
 */
export interface CursorEffectOptions {
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

/**
 * Current state of the cursor
 */
export interface CursorState {
  position: { x: number; y: number };
  velocity: { x: number; y: number; magnitude: number };
  isMoving: boolean;
  isClicking: boolean;
  currentTheme: CursorTheme;
  activeElements: Map<string, RegisteredElement>;
}

/**
 * Registered element that responds to cursor effects
 */
export interface RegisteredElement {
  id: string;
  ref: React.RefObject<HTMLElement>;
  options: CursorEffectOptions;
  bounds: DOMRect;
  distance: number;
  isInProximity: boolean;
  isHovered: boolean;
}

/**
 * Wave effect data model
 */
export interface Wave {
  id: string;
  origin: { x: number; y: number };
  radius: number;
  maxRadius: number;
  opacity: number;
  timestamp: number;
  color: string;
}

/**
 * Cursor position with timestamp
 */
export interface CursorPosition {
  x: number;
  y: number;
  timestamp: number;
}

/**
 * Cursor velocity data
 */
export interface CursorVelocity {
  x: number; // pixels per frame
  y: number;
  magnitude: number; // overall speed
}

/**
 * Wave configuration
 */
export interface WaveConfig {
  speed: number; // pixels per frame
  maxRadius: number;
  opacity: number;
  color: string;
  affectsElements: boolean;
}

/**
 * Spatial grid for performance optimization
 */
export interface SpatialGrid {
  cellSize: number;
  cells: Map<string, Set<string>>; // cell key -> element IDs
}

/**
 * Grid cell data
 */
export interface GridCell {
  x: number;
  y: number;
  elements: Set<string>;
}

/**
 * Color zone configuration
 */
export interface ColorZone {
  type: 'vertical' | 'horizontal' | 'radial';
  zones: Array<{
    threshold: number; // 0-1
    theme: CursorTheme;
  }>;
}

/**
 * Preset theme constants
 */
export const PRESET_THEMES: Record<'spooky' | 'minimal' | 'intense', CursorTheme> = {
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

/**
 * Default cursor effect configuration
 */
export const DEFAULT_CURSOR_CONFIG: Required<CursorEffectConfig> = {
  theme: 'spooky',
  intensity: 1.0,
  effects: {
    glow: true,
    distortion: true,
    waves: true,
    attraction: true,
    particles: true,
  },
  disableOnMobile: true,
  proximityRadius: 150,
  maxWaves: 5,
  colorTransitionZones: 'vertical',
};
