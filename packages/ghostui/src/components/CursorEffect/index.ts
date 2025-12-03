export { CursorTracker } from './CursorTracker';
export type { CursorTrackerState, CursorTrackerProps } from './CursorTracker';
export { 
  resolveTheme, 
  getCurrentTheme, 
  interpolateColor, 
  getSmoothThemeTransition 
} from './themeUtils';
export { CursorEffectProvider, useCursorContext } from './CursorContext';
export type { CursorContextValue, CursorEffectProviderProps } from './CursorContext';
export { useCursorEffect } from './useCursorEffect';
export {
  calculateDistance,
  getRectCenter,
  calculateElementProximity,
  updateAllElementProximity,
  detectProximityChanges,
  SPATIAL_PARTITIONING_THRESHOLD
} from './proximityUtils';
export { SpatialGrid } from './SpatialGrid';
export { GlowAura } from './GlowAura';
export type { GlowAuraProps } from './GlowAura';
export { DistortionField } from './DistortionField';
export type { DistortionFieldProps } from './DistortionField';
export {
  calculateAttraction,
  calculateElementAttraction,
  calculateAllAttractions,
  MAX_ATTRACTION_DISPLACEMENT
} from './attractionUtils';
export { WaveGenerator } from './WaveGenerator';
export type { WaveGeneratorProps } from './WaveGenerator';
export {
  checkWaveElementIntersection,
  calculateCollisionIntensity,
  calculateCombinedWaveIntensity,
  getAffectedElements,
  WaveCollisionTracker
} from './waveCollisionUtils';
export { EffectRenderer } from './EffectRenderer';
export type { EffectRendererProps } from './EffectRenderer';
export { ParticleSystem } from './ParticleSystem';
export type { ParticleSystemProps } from './ParticleSystem';
export {
  supportsCSSFilters,
  supportsSVGFilters,
  supportsBlendModes,
  supportsRAF,
  prefersReducedMotion,
  clamp,
  validateIntensity,
  validateProximityRadius,
  isElementAttached,
  isValidBounds,
  safeGetBounds,
  detectBrowserCapabilities
} from './browserUtils';
export type { BrowserCapabilities } from './browserUtils';
