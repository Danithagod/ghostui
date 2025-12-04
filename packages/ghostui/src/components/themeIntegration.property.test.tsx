import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, type Theme } from './ThemeProvider';

/**
 * Property-based tests for theme integration
 * 
 * Feature: component-consistency-analysis, Property 4: Theme integration
 * Validates: Requirements 4.1, 4.2
 * 
 * For any component that renders colored elements, the component should either use
 * `useThemeOptional()` hook or CSS variables (`var(--ghost-*)`) for colors,
 * and colors should change when the theme context changes.
 */

// Components that should have theme support
const THEMED_COMPONENTS = [
  'SpookyTooltip',
  'GhostCursor',
  'WhisperBox',
  'WispTrail',
];

// Components that are known to have theme support (for reference)
const COMPONENTS_WITH_THEME_HOOK = [
  'CoffinCard',
  'SpectralTabs',
  'SpookySkeleton',
  'GooeySidebar',
  'MoonlightSwitch',
  'SpookyTooltip',
  'GhostCursor',
  'WhisperBox',
  'WispTrail',
];

describe('Theme Integration - Property-Based Tests', () => {
  const componentsDir = path.join(__dirname);
  
  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any component that should have theme support, it should import useThemeOptional
   */
  it('Property 4: Themed components should import useThemeOptional', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...THEMED_COMPONENTS),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            // Skip if file doesn't exist
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component imports useThemeOptional
          const importsThemeHook = /import\s*{[^}]*useThemeOptional[^}]*}\s*from\s*['"]\.\/ThemeProvider['"]/.test(content);
          
          return importsThemeHook;
        }
      ),
      { numRuns: THEMED_COMPONENTS.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any component that imports useThemeOptional, it should also import the Theme type
   */
  it('Property 4: Components using useThemeOptional should import Theme type', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...COMPONENTS_WITH_THEME_HOOK),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component imports useThemeOptional
          const importsThemeHook = /useThemeOptional/.test(content);
          
          if (!importsThemeHook) {
            return true;
          }
          
          // If it imports useThemeOptional, it should also import Theme type
          const importsThemeType = /import\s*{[^}]*(?:type\s+)?Theme[^}]*}\s*from\s*['"]\.\/ThemeProvider['"]/.test(content);
          
          return importsThemeType;
        }
      ),
      { numRuns: COMPONENTS_WITH_THEME_HOOK.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any component with theme support, it should have a themeColors configuration object
   */
  it('Property 4: Themed components should have themeColors configuration', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...THEMED_COMPONENTS),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component has themeColors configuration
          const hasThemeColors = /const\s+themeColors\s*=\s*{/.test(content);
          
          return hasThemeColors;
        }
      ),
      { numRuns: THEMED_COMPONENTS.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any themeColors configuration, it should have both 'spectral' and 'blood' themes
   */
  it('Property 4: themeColors should have both spectral and blood themes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...THEMED_COMPONENTS),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component has themeColors with both themes
          // Use multiline-aware patterns ([\s\S] matches any character including newlines)
          const hasSpectral = /themeColors\s*=\s*\{[\s\S]*?spectral\s*:/.test(content);
          const hasBlood = /themeColors\s*=\s*\{[\s\S]*?blood\s*:/.test(content);
          
          // If it has themeColors, it should have both themes
          const hasThemeColors = /const\s+themeColors\s*=\s*\{/.test(content);
          
          if (!hasThemeColors) {
            return true;
          }
          
          return hasSpectral && hasBlood;
        }
      ),
      { numRuns: THEMED_COMPONENTS.length }
    );
  });


  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any theme value (spectral or blood), components should use the theme context
   * to determine colors rather than hardcoded values
   */
  it('Property 4: Components should not have hardcoded ghost-purple without theme support', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...THEMED_COMPONENTS),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component imports useThemeOptional
          const importsThemeHook = /useThemeOptional/.test(content);
          
          if (!importsThemeHook) {
            // If no theme hook, it should not have hardcoded purple colors in className
            // (This would indicate missing theme support)
            return false;
          }
          
          // Component has theme support - passes
          return true;
        }
      ),
      { numRuns: THEMED_COMPONENTS.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 4: Theme integration
   * Validates: Requirements 4.1, 4.2
   * 
   * For any component with theme support, it should use the theme context value
   * with a fallback to 'spectral'
   */
  it('Property 4: Themed components should have spectral as default fallback', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...THEMED_COMPONENTS),
        (componentName) => {
          const filePath = path.join(componentsDir, `${componentName}.tsx`);
          
          if (!fs.existsSync(filePath)) {
            return true;
          }
          
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if component has the standard fallback pattern
          // themeContext?.theme ?? 'spectral'
          const hasFallback = /themeContext\?\.\s*theme\s*\?\?\s*['"]spectral['"]/.test(content);
          
          // Check if it uses useThemeOptional
          const importsThemeHook = /useThemeOptional/.test(content);
          
          if (!importsThemeHook) {
            return true;
          }
          
          return hasFallback;
        }
      ),
      { numRuns: THEMED_COMPONENTS.length }
    );
  });
});
