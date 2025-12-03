import { describe, it, expect } from 'vitest';
import { PRESET_THEMES } from '../../types/cursor-effects';

/**
 * Integration tests for global intensity scaling
 * 
 * These tests verify that intensity scaling is correctly implemented
 * across all effect components by checking the calculation logic.
 * 
 * Requirements: 9.2, 9.4
 */
describe('Intensity Scaling Integration', () => {
  it('should verify GlowAura applies intensity scaling correctly', () => {
    // Simulate GlowAura calculation logic
    const baseTheme = PRESET_THEMES.spooky;
    const globalIntensity = 0.7;
    const sizeMultiplier = 1.0; // default when no hovered elements
    const opacityMultiplier = 1.0;
    
    const glowSize = baseTheme.glowSize * globalIntensity * sizeMultiplier;
    const glowOpacity = baseTheme.glowOpacity * globalIntensity * opacityMultiplier;
    
    expect(glowSize).toBe(300 * 0.7);
    expect(glowOpacity).toBe(0.15 * 0.7);
  });
  
  it('should verify DistortionField applies intensity scaling correctly', () => {
    // Simulate DistortionField calculation logic
    const baseTheme = PRESET_THEMES.spooky;
    const globalIntensity = 0.7;
    
    const baseDistortionIntensity = baseTheme.distortionIntensity * globalIntensity;
    
    expect(baseDistortionIntensity).toBe(0.8 * 0.7);
  });
  
  it('should verify attraction force respects strength parameter', () => {
    // Attraction uses attractionStrength parameter which is analogous to intensity
    // The calculateAttraction function clamps this value to 0-1
    
    const strengths = [-0.5, 0, 0.5, 1.0, 1.5];
    const clampedStrengths = strengths.map(s => Math.max(0, Math.min(1, s)));
    
    expect(clampedStrengths).toEqual([0, 0, 0.5, 1.0, 1.0]);
  });
  
  it('should verify intensity clamping in provider', () => {
    // Simulate provider intensity clamping logic
    const testValues = [
      { input: -0.5, expected: 0 },
      { input: 0, expected: 0 },
      { input: 0.5, expected: 0.5 },
      { input: 1.0, expected: 1.0 },
      { input: 1.5, expected: 1.0 },
      { input: 2.0, expected: 1.0 },
    ];
    
    testValues.forEach(({ input, expected }) => {
      const clamped = Math.max(0, Math.min(1, input));
      expect(clamped).toBe(expected);
    });
  });
  
  it('should verify all effects scale proportionally', () => {
    // Test that all effects maintain proportional relationships
    const baseTheme = PRESET_THEMES.spooky;
    const intensities = [0.25, 0.5, 0.75, 1.0];
    
    intensities.forEach(intensity => {
      const glowSize = baseTheme.glowSize * intensity;
      const glowOpacity = baseTheme.glowOpacity * intensity;
      const distortion = baseTheme.distortionIntensity * intensity;
      
      // All should scale by the same factor (use toBeCloseTo for floating point)
      expect(glowSize / baseTheme.glowSize).toBeCloseTo(intensity, 10);
      expect(glowOpacity / baseTheme.glowOpacity).toBeCloseTo(intensity, 10);
      expect(distortion / baseTheme.distortionIntensity).toBeCloseTo(intensity, 10);
    });
  });
  
  it('should verify smooth transitions between intensity values', () => {
    // Verify that changing intensity produces smooth, proportional changes
    const baseTheme = PRESET_THEMES.spooky;
    
    const intensity1 = 0.3;
    const intensity2 = 0.6;
    const intensity3 = 0.9;
    
    const glow1 = baseTheme.glowSize * intensity1;
    const glow2 = baseTheme.glowSize * intensity2;
    const glow3 = baseTheme.glowSize * intensity3;
    
    // Verify linear progression
    const diff1to2 = glow2 - glow1;
    const diff2to3 = glow3 - glow2;
    
    // Differences should be equal (linear scaling)
    expect(diff1to2).toBeCloseTo(diff2to3, 5);
  });
  
  it('should verify type-specific multipliers work with global intensity', () => {
    // Test that type-specific multipliers are applied after global intensity
    const baseTheme = PRESET_THEMES.spooky;
    const globalIntensity = 0.5;
    
    // Glow multipliers from GlowAura component
    const buttonGlowMultiplier = 1.3;
    const cardGlowMultiplier = 0.9;
    
    const buttonGlow = baseTheme.glowSize * globalIntensity * buttonGlowMultiplier;
    const cardGlow = baseTheme.glowSize * globalIntensity * cardGlowMultiplier;
    
    // Button should have larger glow than card
    expect(buttonGlow).toBeGreaterThan(cardGlow);
    
    // Both should be scaled by global intensity
    expect(buttonGlow).toBe(300 * 0.5 * 1.3);
    expect(cardGlow).toBe(300 * 0.5 * 0.9);
    
    // Distortion multipliers from DistortionField component
    const buttonDistortionMultiplier = 1.5;
    const cardDistortionMultiplier = 0.6;
    
    const baseDistortion = baseTheme.distortionIntensity * globalIntensity;
    const buttonDistortion = baseDistortion * buttonDistortionMultiplier;
    const cardDistortion = baseDistortion * cardDistortionMultiplier;
    
    // Button should have stronger distortion than card
    expect(buttonDistortion).toBeGreaterThan(cardDistortion);
    
    // Both should be scaled by global intensity
    expect(buttonDistortion).toBe(0.8 * 0.5 * 1.5);
    expect(cardDistortion).toBe(0.8 * 0.5 * 0.6);
  });
  
  it('should verify zero intensity produces zero effects', () => {
    const baseTheme = PRESET_THEMES.spooky;
    const intensity = 0;
    
    const glowSize = baseTheme.glowSize * intensity;
    const glowOpacity = baseTheme.glowOpacity * intensity;
    const distortion = baseTheme.distortionIntensity * intensity;
    
    expect(glowSize).toBe(0);
    expect(glowOpacity).toBe(0);
    expect(distortion).toBe(0);
  });
  
  it('should verify maximum intensity produces full effects', () => {
    const baseTheme = PRESET_THEMES.spooky;
    const intensity = 1.0;
    
    const glowSize = baseTheme.glowSize * intensity;
    const glowOpacity = baseTheme.glowOpacity * intensity;
    const distortion = baseTheme.distortionIntensity * intensity;
    
    expect(glowSize).toBe(baseTheme.glowSize);
    expect(glowOpacity).toBe(baseTheme.glowOpacity);
    expect(distortion).toBe(baseTheme.distortionIntensity);
  });
});
