/**
 * Tests for Structure Validation Rules
 */

import { describe, it, expect } from 'vitest';
import {
  MinimumExamplesRule,
  BasicUsageStructureRule,
  PageStructureOrderRule,
  HeaderSectionStructureRule,
  FirstPlaygroundPositionRule,
  structureRules,
} from './structureRules';
import type {
  ParsedPage,
  ValidationContext,
  ComponentPlaygroundInstance,
  Section,
  Header,
} from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('Structure Validation Rules', () => {
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = '/test/page.tsx'): ValidationContext => ({
    page: {} as ParsedPage,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  describe('MinimumExamplesRule', () => {
    const rule = new MinimumExamplesRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('minimum-examples');
      expect(rule.category).toBe('structure');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when page has 3 or more ComponentPlayground examples', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: true, hasApi: true, props: {} },
          { lineNumber: 20, hasPreview: true, hasCode: true, hasApi: false, props: {} },
          { lineNumber: 30, hasPreview: true, hasCode: true, hasApi: false, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when page has fewer than 3 ComponentPlayground examples', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: true, hasApi: true, props: {} },
          { lineNumber: 20, hasPreview: true, hasCode: true, hasApi: false, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('minimum-examples');
      expect(issues[0].category).toBe('structure');
      expect(issues[0].message).toContain('2 ComponentPlayground examples');
      expect(issues[0].message).toContain('3 are required');
      expect(issues[0].autoFixable).toBe(false);
    });

    it('should fail when page has no ComponentPlayground examples', () => {
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
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('0 ComponentPlayground example');
    });

    it('should pass when page has more than 3 examples', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: true, hasApi: true, props: {} },
          { lineNumber: 20, hasPreview: true, hasCode: true, hasApi: false, props: {} },
          { lineNumber: 30, hasPreview: true, hasCode: true, hasApi: false, props: {} },
          { lineNumber: 40, hasPreview: true, hasCode: true, hasApi: false, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });
  });

  describe('BasicUsageStructureRule', () => {
    const rule = new BasicUsageStructureRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('basic-usage-structure');
      expect(rule.category).toBe('structure');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when first ComponentPlayground has all required props', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: true, hasApi: true, props: {} },
          { lineNumber: 20, hasPreview: true, hasCode: false, hasApi: false, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when first ComponentPlayground is missing preview prop', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: false, hasCode: true, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('basic-usage-structure');
      expect(issues[0].message).toContain('missing required props: preview');
      expect(issues[0].lineNumber).toBe(10);
    });

    it('should fail when first ComponentPlayground is missing code prop', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: false, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required props: code');
    });

    it('should fail when first ComponentPlayground is missing api prop', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: true, hasCode: true, hasApi: false, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required props: api');
    });

    it('should fail when first ComponentPlayground is missing multiple props', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 10, hasPreview: false, hasCode: false, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('preview, code');
    });

    it('should fail when no ComponentPlayground exists', () => {
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
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('No ComponentPlayground found');
    });
  });

  describe('PageStructureOrderRule', () => {
    const rule = new PageStructureOrderRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('page-structure-order');
      expect(rule.category).toBe('structure');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when sections are in correct order', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [
          { type: 'header', startLine: 1, endLine: 10, elements: [] },
          { type: 'basic-usage', startLine: 11, endLine: 20, elements: [] },
          { type: 'api', startLine: 21, endLine: 30, elements: [] },
          { type: 'examples', startLine: 31, endLine: 40, elements: [] },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when sections are out of order', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [
          { type: 'header', startLine: 1, endLine: 10, elements: [] },
          { type: 'api', startLine: 11, endLine: 20, elements: [] },
          { type: 'basic-usage', startLine: 21, endLine: 30, elements: [] },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('page-structure-order');
      expect(issues[0].message).toContain('out of order');
      expect(issues[0].lineNumber).toBe(21);
    });

    it('should pass when sections include unknown types', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [
          { type: 'header', startLine: 1, endLine: 10, elements: [] },
          { type: 'unknown', startLine: 11, endLine: 15, elements: [] },
          { type: 'basic-usage', startLine: 16, endLine: 20, elements: [] },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should pass when page has minimal sections', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [
          { type: 'header', startLine: 1, endLine: 10, elements: [] },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });
  });

  describe('HeaderSectionStructureRule', () => {
    const rule = new HeaderSectionStructureRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('header-section-structure');
      expect(rule.category).toBe('structure');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when page has H1 and lead paragraph', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
        ],
        sections: [
          {
            type: 'header',
            startLine: 5,
            endLine: 10,
            elements: [
              { type: 'p', className: 'lead text-ghost-white/90', lineNumber: 7 },
            ],
          },
        ],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when page is missing H1', () => {
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
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('header-section-structure');
      expect(issues[0].message).toContain('missing an H1 header');
      expect(issues[0].lineNumber).toBe(1);
    });

    it('should fail when page is missing header section', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
        ],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing a header section');
      expect(issues[0].lineNumber).toBe(5);
    });

    it('should fail when page is missing lead paragraph', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
        ],
        sections: [
          {
            type: 'header',
            startLine: 5,
            endLine: 10,
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
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing a lead paragraph');
      expect(issues[0].lineNumber).toBe(6);
    });
  });

  describe('FirstPlaygroundPositionRule', () => {
    const rule = new FirstPlaygroundPositionRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('first-playground-position');
      expect(rule.category).toBe('structure');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when first ComponentPlayground appears before H2', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
          { level: 2, text: 'Section Title', className: '', lineNumber: 20 },
        ],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 15, hasPreview: true, hasCode: true, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when first ComponentPlayground appears after H2', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
          { level: 2, text: 'Section Title', className: '', lineNumber: 10 },
        ],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 15, hasPreview: true, hasCode: true, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('first-playground-position');
      expect(issues[0].message).toContain('appears after H2 header');
      expect(issues[0].message).toContain('Section Title');
      expect(issues[0].lineNumber).toBe(15);
    });

    it('should pass when there is no H2', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
        ],
        sections: [],
        componentPlaygrounds: [
          { lineNumber: 15, hasPreview: true, hasCode: true, hasApi: true, props: {} },
        ],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should pass when there is no ComponentPlayground', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          { level: 1, text: 'Component Title', className: '', lineNumber: 5 },
          { level: 2, text: 'Section Title', className: '', lineNumber: 10 },
        ],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });
  });

  describe('structureRules export', () => {
    it('should export all structure rules', () => {
      expect(structureRules).toHaveLength(5);
      expect(structureRules[0]).toBeInstanceOf(MinimumExamplesRule);
      expect(structureRules[1]).toBeInstanceOf(BasicUsageStructureRule);
      expect(structureRules[2]).toBeInstanceOf(PageStructureOrderRule);
      expect(structureRules[3]).toBeInstanceOf(HeaderSectionStructureRule);
      expect(structureRules[4]).toBeInstanceOf(FirstPlaygroundPositionRule);
    });

    it('should have all rules with correct categories', () => {
      structureRules.forEach((rule) => {
        expect(rule.category).toBe('structure');
      });
    });

    it('should have all rules marked as not auto-fixable', () => {
      structureRules.forEach((rule) => {
        expect(rule.autoFixable).toBe(false);
      });
    });
  });
});
