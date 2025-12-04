/**
 * Tests for Typography Validation Rules
 */

import { describe, it, expect } from 'vitest';
import {
  H1TypographyRule,
  H2TypographyRule,
  H3TypographyRule,
  LeadParagraphRule,
  InlineCodeRule,
  typographyRules,
} from './typographyRules';
import type { ParsedPage, ValidationContext, Header, Element, Section, InlineCode } from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('Typography Validation Rules', () => {
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = '/test/page.tsx'): ValidationContext => ({
    page: {} as ParsedPage,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  describe('H1TypographyRule', () => {
    const rule = new H1TypographyRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('h1-typography');
      expect(rule.category).toBe('typography');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when H1 has correct classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
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

    it('should fail when H1 has incorrect classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl font-bold',
            lineNumber: 10,
          },
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
      expect(issues[0].ruleId).toBe('h1-typography');
      expect(issues[0].category).toBe('typography');
      expect(issues[0].lineNumber).toBe(10);
      expect(issues[0].autoFixable).toBe(true);
    });

    it('should fail when H1 has no classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: '',
            lineNumber: 10,
          },
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
      expect(issues[0].currentValue).toBe('(no classes)');
    });

    it('should check multiple H1 elements', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Title 1',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
          {
            level: 1,
            text: 'Title 2',
            className: 'text-2xl',
            lineNumber: 20,
          },
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
      expect(issues[0].lineNumber).toBe(20);
    });

    it('should pass when no H1 elements exist', () => {
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

      expect(issues).toHaveLength(0);
    });
  });

  describe('H2TypographyRule', () => {
    const rule = new H2TypographyRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('h2-typography');
      expect(rule.category).toBe('typography');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when H2 has correct classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 2,
            text: 'Section Title',
            className: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',
            lineNumber: 15,
          },
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

    it('should fail when H2 has incorrect classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 2,
            text: 'Section Title',
            className: 'text-xl font-semibold',
            lineNumber: 15,
          },
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
      expect(issues[0].ruleId).toBe('h2-typography');
      expect(issues[0].lineNumber).toBe(15);
    });

    it('should check all H2 elements', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 2,
            text: 'Section 1',
            className: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',
            lineNumber: 15,
          },
          {
            level: 2,
            text: 'Section 2',
            className: 'text-xl',
            lineNumber: 25,
          },
          {
            level: 2,
            text: 'Section 3',
            className: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',
            lineNumber: 35,
          },
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
      expect(issues[0].lineNumber).toBe(25);
    });
  });

  describe('H3TypographyRule', () => {
    const rule = new H3TypographyRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('h3-typography');
      expect(rule.category).toBe('typography');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when H3 has correct classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 3,
            text: 'Subsection Title',
            className: 'text-xl md:text-2xl font-semibold text-ghost-white',
            lineNumber: 20,
          },
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

    it('should fail when H3 has incorrect classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 3,
            text: 'Subsection Title',
            className: 'text-lg font-bold',
            lineNumber: 20,
          },
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
      expect(issues[0].ruleId).toBe('h3-typography');
      expect(issues[0].lineNumber).toBe(20);
    });
  });

  describe('LeadParagraphRule', () => {
    const rule = new LeadParagraphRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('lead-paragraph');
      expect(rule.category).toBe('typography');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when lead paragraph has correct classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
        ],
        sections: [
          {
            type: 'header',
            startLine: 10,
            endLine: 15,
            elements: [
              {
                type: 'p',
                className: 'lead text-ghost-white/90',
                lineNumber: 12,
              },
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

    it('should fail when lead paragraph has incorrect classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
        ],
        sections: [
          {
            type: 'header',
            startLine: 10,
            endLine: 15,
            elements: [
              {
                type: 'p',
                className: 'text-lg',
                lineNumber: 12,
              },
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

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('lead-paragraph');
      expect(issues[0].lineNumber).toBe(12);
      expect(issues[0].autoFixable).toBe(true);
    });

    it('should report missing lead paragraph as not auto-fixable', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
        ],
        sections: [
          {
            type: 'header',
            startLine: 10,
            endLine: 15,
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
      expect(issues[0].autoFixable).toBe(false);
    });

    it('should pass when no H1 exists', () => {
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

      expect(issues).toHaveLength(0);
    });

    it('should pass when no header section exists', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Component Title',
            className: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 10,
          },
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

  describe('InlineCodeRule', () => {
    const rule = new InlineCodeRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('inline-code');
      expect(rule.category).toBe('typography');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when inline code has correct classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [
          {
            lineNumber: 25,
            content: 'const x = 1',
            className: 'px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs',
          },
        ],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when inline code has incorrect classes', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [
          {
            lineNumber: 25,
            content: 'const x = 1',
            className: 'font-mono text-sm',
          },
        ],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('inline-code');
      expect(issues[0].lineNumber).toBe(25);
      expect(issues[0].autoFixable).toBe(true);
    });

    it('should check all inline code elements', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [
          {
            lineNumber: 25,
            content: 'const x = 1',
            className: 'px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs',
          },
          {
            lineNumber: 30,
            content: 'const y = 2',
            className: 'font-mono',
          },
          {
            lineNumber: 35,
            content: 'const z = 3',
            className: 'px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs',
          },
        ],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(30);
    });

    it('should pass when no inline code exists', () => {
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

      expect(issues).toHaveLength(0);
    });
  });

  describe('typographyRules export', () => {
    it('should export all typography rules', () => {
      expect(typographyRules).toHaveLength(5);
      expect(typographyRules[0]).toBeInstanceOf(H1TypographyRule);
      expect(typographyRules[1]).toBeInstanceOf(H2TypographyRule);
      expect(typographyRules[2]).toBeInstanceOf(H3TypographyRule);
      expect(typographyRules[3]).toBeInstanceOf(LeadParagraphRule);
      expect(typographyRules[4]).toBeInstanceOf(InlineCodeRule);
    });

    it('should have all rules with correct categories', () => {
      typographyRules.forEach((rule) => {
        expect(rule.category).toBe('typography');
      });
    });
  });
});
