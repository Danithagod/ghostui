import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { getCurrentTheme, resolveTheme } from './themeUtils';
import { CursorEffectConfig, PRESET_THEMES } from '../../types/cursor-effects';

/**
 * Feature: global-cursor-effects, Property 2: Color theme transitions at vertical thresholds
 * Validates: Requirements 1.2
 * 
 * For any cursor y-coordinate, the glow color should match the theme associated 
 * with the vertical zone (0-33% = primary, 33-66% = secondary, 66-100% = tertiary).
 */
describe('Color Theme System - Property-Based Tests', () => {
  describe('Property 2: Color theme transitions at vertical thresholds', () => {
    it('should return primary color for cursor in top third (0-33%)', () => {
      fc.assert(
        fc.property(
          // Generate cursor positions in the top third
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 329 }), // 0-32.9% of 1000px viewport
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'vertical',
            };
            
            const viewportHeight = 1000;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // In the top third, should return primary color
            expect(result.colors.primary).toBe(baseTheme.colors.primary);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    it('should return secondary color for cursor in middle third (33-66%)', () => {
      fc.assert(
        fc.property(
          // Generate cursor positions in the middle third
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 330, max: 659 }), // 33-65.9% of 1000px viewport
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'vertical',
            };
            
            const viewportHeight = 1000;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // In the middle third, should return secondary color
            expect(result.colors.primary).toBe(baseTheme.colors.secondary);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    it('should return tertiary color for cursor in bottom third (66-100%)', () => {
      fc.assert(
        fc.property(
          // Generate cursor positions in the bottom third
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 660, max: 1000 }), // 66-100% of 1000px viewport
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'vertical',
            };
            
            const viewportHeight = 1000;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // In the bottom third, should return tertiary color
            expect(result.colors.primary).toBe(baseTheme.colors.tertiary);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    it('should correctly classify any cursor position into one of three zones', () => {
      fc.assert(
        fc.property(
          // Generate any valid cursor position
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 1000 }),
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          fc.integer({ min: 500, max: 2000 }), // viewport height
          (cursorPosition, themeName, viewportHeight) => {
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'vertical',
            };
            
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // Calculate which zone the cursor is in
            const percentage = cursorPosition.y / viewportHeight;
            let expectedColor: string;
            
            if (percentage < 0.33) {
              expectedColor = baseTheme.colors.primary;
            } else if (percentage < 0.66) {
              expectedColor = baseTheme.colors.secondary;
            } else {
              expectedColor = baseTheme.colors.tertiary;
            }
            
            // The returned theme should have the expected color as primary
            expect(result.colors.primary).toBe(expectedColor);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    it('should work with custom theme objects', () => {
      // Generator for hex color strings
      const hexColorGen = fc.tuple(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 })
      ).map(([r, g, b]) => 
        `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
      );
      
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 1000 }),
          }),
          hexColorGen,
          hexColorGen,
          hexColorGen,
          (cursorPosition, color1, color2, color3) => {
            const customTheme = {
              colors: {
                primary: color1,
                secondary: color2,
                tertiary: color3,
              },
              glowSize: 300,
              glowOpacity: 0.15,
              distortionIntensity: 0.8,
            };
            
            const config: CursorEffectConfig = {
              theme: customTheme,
              colorTransitionZones: 'vertical',
            };
            
            const viewportHeight = 1000;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            
            // Calculate expected color based on zone
            const percentage = cursorPosition.y / viewportHeight;
            let expectedColor: string;
            
            if (percentage < 0.33) {
              expectedColor = customTheme.colors.primary;
            } else if (percentage < 0.66) {
              expectedColor = customTheme.colors.secondary;
            } else {
              expectedColor = customTheme.colors.tertiary;
            }
            
            expect(result.colors.primary).toBe(expectedColor);
          }
        ),
        { numRuns: 100 }
      );
    });
    
    it('should preserve other theme properties while changing color', () => {
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 1000 }),
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'vertical',
            };
            
            const viewportHeight = 1000;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // Other theme properties should remain unchanged
            expect(result.glowSize).toBe(baseTheme.glowSize);
            expect(result.glowOpacity).toBe(baseTheme.glowOpacity);
            expect(result.distortionIntensity).toBe(baseTheme.distortionIntensity);
            expect(result.colors.secondary).toBe(baseTheme.colors.secondary);
            expect(result.colors.tertiary).toBe(baseTheme.colors.tertiary);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
  
  describe('Horizontal zone transitions', () => {
    it('should correctly classify cursor position in horizontal zones', () => {
      // Mock window dimensions for horizontal zone calculation
      const originalInnerWidth = window?.innerWidth;
      const originalInnerHeight = window?.innerHeight;
      
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 1080 }),
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            // Set window dimensions for this test
            if (typeof window !== 'undefined') {
              Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true, configurable: true });
              Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true, configurable: true });
            }
            
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'horizontal',
            };
            
            const viewportHeight = 1080;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // Calculate which zone the cursor is in horizontally
            const viewportWidth = 1920;
            const percentage = cursorPosition.x / viewportWidth;
            let expectedColor: string;
            
            if (percentage < 0.33) {
              expectedColor = baseTheme.colors.primary;
            } else if (percentage < 0.66) {
              expectedColor = baseTheme.colors.secondary;
            } else {
              expectedColor = baseTheme.colors.tertiary;
            }
            
            expect(result.colors.primary).toBe(expectedColor);
          }
        ),
        { numRuns: 100 }
      );
      
      // Restore original values
      if (typeof window !== 'undefined') {
        if (originalInnerWidth !== undefined) {
          Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true, configurable: true });
        }
        if (originalInnerHeight !== undefined) {
          Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true, configurable: true });
        }
      }
    });
  });
  
  describe('Radial zone transitions', () => {
    it('should correctly classify cursor position in radial zones', () => {
      // Mock window dimensions for radial zone calculation
      const originalInnerWidth = window?.innerWidth;
      const originalInnerHeight = window?.innerHeight;
      
      fc.assert(
        fc.property(
          fc.record({
            x: fc.integer({ min: 0, max: 1920 }),
            y: fc.integer({ min: 0, max: 1080 }),
          }),
          fc.constantFrom('spooky', 'minimal', 'intense'),
          (cursorPosition, themeName) => {
            // Set window dimensions for this test
            if (typeof window !== 'undefined') {
              Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true, configurable: true });
              Object.defineProperty(window, 'innerHeight', { value: 1080, writable: true, configurable: true });
            }
            
            const config: CursorEffectConfig = {
              theme: themeName,
              colorTransitionZones: 'radial',
            };
            
            const viewportWidth = 1920;
            const viewportHeight = 1080;
            const result = getCurrentTheme(cursorPosition, config, viewportHeight);
            const baseTheme = PRESET_THEMES[themeName];
            
            // Calculate radial distance from center
            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const dx = cursorPosition.x - centerX;
            const dy = cursorPosition.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const percentage = distance / maxDistance;
            
            let expectedColor: string;
            if (percentage < 0.33) {
              expectedColor = baseTheme.colors.primary;
            } else if (percentage < 0.66) {
              expectedColor = baseTheme.colors.secondary;
            } else {
              expectedColor = baseTheme.colors.tertiary;
            }
            
            expect(result.colors.primary).toBe(expectedColor);
          }
        ),
        { numRuns: 100 }
      );
      
      // Restore original values
      if (typeof window !== 'undefined') {
        if (originalInnerWidth !== undefined) {
          Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true, configurable: true });
        }
        if (originalInnerHeight !== undefined) {
          Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true, configurable: true });
        }
      }
    });
  });
});
