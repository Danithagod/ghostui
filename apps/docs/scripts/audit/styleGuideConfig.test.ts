/**
 * Tests for Style Guide Configuration
 */

import { describe, it, expect } from 'vitest';
import {
  DEFAULT_STYLE_GUIDE_CONFIG,
  getStyleGuideConfig,
  hasRequiredClasses,
  getMissingClasses,
  hasAnyAcceptableClass,
} from './styleGuideConfig';

describe('StyleGuideConfig', () => {
  describe('DEFAULT_STYLE_GUIDE_CONFIG', () => {
    it('should have typography configuration', () => {
      expect(DEFAULT_STYLE_GUIDE_CONFIG.typography).toBeDefined();
      expect(DEFAULT_STYLE_GUIDE_CONFIG.typography.h1).toBe(
        'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide'
      );
      expect(DEFAULT_STYLE_GUIDE_CONFIG.typography.h2).toBe(
        'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide'
      );
      expect(DEFAULT_STYLE_GUIDE_CONFIG.typography.h3).toBe(
        'text-xl md:text-2xl font-semibold text-ghost-white'
      );
    });

    it('should have spacing configuration', () => {
      expect(DEFAULT_STYLE_GUIDE_CONFIG.spacing).toBeDefined();
      expect(DEFAULT_STYLE_GUIDE_CONFIG.spacing.pageContainer).toBe('space-y-12');
      expect(DEFAULT_STYLE_GUIDE_CONFIG.spacing.sectionContainer).toBe('space-y-6 mt-12');
      expect(DEFAULT_STYLE_GUIDE_CONFIG.spacing.headerContent).toBe('space-y-4');
    });

    it('should have colors configuration', () => {
      expect(DEFAULT_STYLE_GUIDE_CONFIG.colors).toBeDefined();
      expect(DEFAULT_STYLE_GUIDE_CONFIG.colors.accentColor).toBe('text-ghost-orange');
      expect(DEFAULT_STYLE_GUIDE_CONFIG.colors.borderColor).toBe('border-ghost-orange/30');
    });

    it('should have structure configuration', () => {
      expect(DEFAULT_STYLE_GUIDE_CONFIG.structure).toBeDefined();
      expect(DEFAULT_STYLE_GUIDE_CONFIG.structure.minimumExamples).toBe(3);
      expect(DEFAULT_STYLE_GUIDE_CONFIG.structure.requiredSections).toContain('header');
      expect(DEFAULT_STYLE_GUIDE_CONFIG.structure.requiredSections).toContain('basic-usage');
    });
  });

  describe('getStyleGuideConfig', () => {
    it('should return the default configuration', () => {
      const config = getStyleGuideConfig();
      expect(config).toEqual(DEFAULT_STYLE_GUIDE_CONFIG);
    });
  });

  describe('hasRequiredClasses', () => {
    it('should return true when all required classes are present', () => {
      const actual = 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide';
      const required = 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide';
      expect(hasRequiredClasses(actual, required)).toBe(true);
    });

    it('should return true when required classes are present with extras', () => {
      const actual = 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide extra-class';
      const required = 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide';
      expect(hasRequiredClasses(actual, required)).toBe(true);
    });

    it('should return false when some required classes are missing', () => {
      const actual = 'text-3xl font-display text-ghost-orange';
      const required = 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide';
      expect(hasRequiredClasses(actual, required)).toBe(false);
    });

    it('should return false when no classes are present', () => {
      const actual = '';
      const required = 'text-3xl font-display';
      expect(hasRequiredClasses(actual, required)).toBe(false);
    });

    it('should handle classes in different order', () => {
      const actual = 'tracking-wide text-ghost-orange font-display text-3xl';
      const required = 'text-3xl font-display text-ghost-orange tracking-wide';
      expect(hasRequiredClasses(actual, required)).toBe(true);
    });
  });

  describe('getMissingClasses', () => {
    it('should return empty array when all classes are present', () => {
      const actual = 'text-3xl font-display text-ghost-orange tracking-wide';
      const required = 'text-3xl font-display text-ghost-orange tracking-wide';
      expect(getMissingClasses(actual, required)).toEqual([]);
    });

    it('should return missing classes', () => {
      const actual = 'text-3xl font-display';
      const required = 'text-3xl font-display text-ghost-orange tracking-wide';
      const missing = getMissingClasses(actual, required);
      expect(missing).toContain('text-ghost-orange');
      expect(missing).toContain('tracking-wide');
      expect(missing).toHaveLength(2);
    });

    it('should return all required classes when none are present', () => {
      const actual = '';
      const required = 'text-3xl font-display';
      const missing = getMissingClasses(actual, required);
      expect(missing).toEqual(['text-3xl', 'font-display']);
    });
  });

  describe('hasAnyAcceptableClass', () => {
    it('should return true when one acceptable option is present', () => {
      const actual = 'py-12 rounded-lg';
      const acceptable = ['py-12', 'p-8', 'p-6'];
      expect(hasAnyAcceptableClass(actual, acceptable)).toBe(true);
    });

    it('should return true when another acceptable option is present', () => {
      const actual = 'p-8 rounded-lg border';
      const acceptable = ['py-12', 'p-8', 'p-6'];
      expect(hasAnyAcceptableClass(actual, acceptable)).toBe(true);
    });

    it('should return false when no acceptable options are present', () => {
      const actual = 'p-4 rounded-lg';
      const acceptable = ['py-12', 'p-8', 'p-6'];
      expect(hasAnyAcceptableClass(actual, acceptable)).toBe(false);
    });

    it('should return false when classes are empty', () => {
      const actual = '';
      const acceptable = ['py-12', 'p-8'];
      expect(hasAnyAcceptableClass(actual, acceptable)).toBe(false);
    });
  });
});
