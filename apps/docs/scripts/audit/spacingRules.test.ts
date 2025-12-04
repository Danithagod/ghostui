/**
 * Tests for Spacing Validation Rules
 */

import { describe, it, expect } from 'vitest';
import {
  PageContainerSpacingRule,
  SectionContainerSpacingRule,
  HeaderContentSpacingRule,
  PreviewContainerPaddingRule,
  spacingRules,
} from './spacingRules';
import { ParsedPage, ValidationContext } from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('Spacing Validation Rules', () => {
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = 'test.tsx'): ValidationContext => ({
    page: {} as ParsedPage,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  describe('PageContainerSpacingRule', () => {
    const rule = new PageContainerSpacingRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('page-container-spacing');
      expect(rule.category).toBe('spacing');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when root container has required spacing class', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
        rootContainer: {
          type: 'div',
          className: 'space-y-12',
          lineNumber: 10,
          props: {},
        },
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });

    it('should pass when root container has required class with extras', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
        rootContainer: {
          type: 'div',
          className: 'container mx-auto space-y-12 px-4',
          lineNumber: 10,
          props: {},
        },
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });

    it('should fail when root container is missing spacing class', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
        rootContainer: {
          type: 'div',
          className: 'container mx-auto',
          lineNumber: 10,
          props: {},
        },
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('page-container-spacing');
      expect(issues[0].category).toBe('spacing');
      expect(issues[0].autoFixable).toBe(true);
      expect(issues[0].lineNumber).toBe(10);
    });

    it('should fail when root container is missing', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('page-container-spacing');
      expect(issues[0].autoFixable).toBe(false); // Can't auto-fix missing structure
    });
  });

  describe('SectionContainerSpacingRule', () => {
    const rule = new SectionContainerSpacingRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('section-container-spacing');
      expect(rule.category).toBe('spacing');
      expect(rule.autoFixable).toBe(true);
    });

    it('should return no issues for now (placeholder implementation)', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [
          {
            type: 'basic-usage',
            startLine: 20,
            endLine: 40,
            elements: [],
          },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });
  });

  describe('HeaderContentSpacingRule', () => {
    const rule = new HeaderContentSpacingRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('header-content-spacing');
      expect(rule.category).toBe('spacing');
      expect(rule.autoFixable).toBe(true);
    });

    it('should return no issues for now (placeholder implementation)', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });
  });

  describe('PreviewContainerPaddingRule', () => {
    const rule = new PreviewContainerPaddingRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('preview-container-padding');
      expect(rule.category).toBe('spacing');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when preview container has py-12 padding', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg py-12',
            lineNumber: 25,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });

    it('should pass when preview container has p-8 padding', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg p-8',
            lineNumber: 25,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });

    it('should pass when preview container has p-6 padding', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg p-6',
            lineNumber: 25,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(0);
    });

    it('should fail when preview container has incorrect padding', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg p-4',
            lineNumber: 25,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('preview-container-padding');
      expect(issues[0].category).toBe('spacing');
      expect(issues[0].autoFixable).toBe(true);
      expect(issues[0].lineNumber).toBe(25);
    });

    it('should fail when preview container has no padding', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg',
            lineNumber: 25,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('preview-container-padding');
    });

    it('should check multiple preview containers', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [
          {
            type: 'div',
            className: 'border rounded-lg py-12',
            lineNumber: 25,
            props: {},
          },
          {
            type: 'div',
            className: 'border rounded-lg p-4',
            lineNumber: 35,
            props: {},
          },
          {
            type: 'div',
            className: 'border rounded-lg p-8',
            lineNumber: 45,
            props: {},
          },
        ],
      };

      const context = createContext();
      context.page = page;

      const issues = rule.validate(page, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(35); // Only the second container should fail
    });
  });

  describe('spacingRules export', () => {
    it('should export all spacing rules', () => {
      expect(spacingRules).toHaveLength(4);
      expect(spacingRules[0]).toBeInstanceOf(PageContainerSpacingRule);
      expect(spacingRules[1]).toBeInstanceOf(SectionContainerSpacingRule);
      expect(spacingRules[2]).toBeInstanceOf(HeaderContentSpacingRule);
      expect(spacingRules[3]).toBeInstanceOf(PreviewContainerPaddingRule);
    });
  });
});
