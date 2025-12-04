/**
 * Tests for Preview Container Validation Rules
 */

import { describe, it, expect } from 'vitest';
import {
  PreviewContainerBorderRule,
  PreviewContainerRadiusRule,
  ThemeVariableUsageRule,
  CodeBlockScrollingRule,
  previewRules,
} from './previewRules';
import type { ParsedPage, ValidationContext, Element, CodeBlock } from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('Preview Container Validation Rules', () => {
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = '/test/page.tsx'): ValidationContext => ({
    page: {} as ParsedPage,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  describe('PreviewContainerBorderRule', () => {
    const rule = new PreviewContainerBorderRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('preview-container-border');
      expect(rule.category).toBe('preview');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when preview container has correct border class', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when preview container has incorrect border class', () => {
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
            className: 'border border-gray-300 rounded-lg p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('preview-container-border');
      expect(issues[0].category).toBe('preview');
      expect(issues[0].lineNumber).toBe(20);
      expect(issues[0].autoFixable).toBe(true);
    });

    it('should fail when preview container has no border class', () => {
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
            className: 'rounded-lg p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].currentValue).toBe('rounded-lg p-8');
    });

    it('should check all preview containers', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 20,
          },
          {
            type: 'div',
            className: 'border border-gray-300 rounded-lg p-8',
            lineNumber: 30,
          },
          {
            type: 'div',
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 40,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(30);
    });

    it('should pass when no preview containers exist', () => {
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

  describe('PreviewContainerRadiusRule', () => {
    const rule = new PreviewContainerRadiusRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('preview-container-radius');
      expect(rule.category).toBe('preview');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when preview container has correct border radius', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when preview container has incorrect border radius', () => {
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
            className: 'border border-ghost-orange/30 rounded-md p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('preview-container-radius');
      expect(issues[0].lineNumber).toBe(20);
      expect(issues[0].autoFixable).toBe(true);
    });

    it('should fail when preview container has no border radius', () => {
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
            className: 'border border-ghost-orange/30 p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].expectedValue).toBe('rounded-lg');
    });

    it('should check all preview containers', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 20,
          },
          {
            type: 'div',
            className: 'border border-ghost-orange/30 p-8',
            lineNumber: 30,
          },
          {
            type: 'div',
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 40,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(30);
    });
  });

  describe('ThemeVariableUsageRule', () => {
    const rule = new ThemeVariableUsageRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('theme-variable-usage');
      expect(rule.category).toBe('preview');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when preview container uses theme variables', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8 bg-ghost-dark',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when preview container uses hardcoded hex background color', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8 bg-[#05020a]',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('theme-variable-usage');
      expect(issues[0].lineNumber).toBe(20);
      expect(issues[0].autoFixable).toBe(true);
      expect(issues[0].message).toContain('hardcoded colors');
    });

    it('should fail when preview container uses hardcoded hex text color', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8 text-[#ffffff]',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].recommendation).toContain('text-[#ffffff]');
    });

    it('should fail when preview container uses hardcoded hex border color', () => {
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
            className: 'border border-[#ff6b35] rounded-lg p-8',
            lineNumber: 20,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].recommendation).toContain('border-[#ff6b35]');
    });

    it('should check all preview containers', () => {
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
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 20,
          },
          {
            type: 'div',
            className: 'border border-ghost-orange/30 rounded-lg p-8 bg-[#05020a]',
            lineNumber: 30,
          },
          {
            type: 'div',
            className: 'border border-ghost-orange/30 rounded-lg p-8',
            lineNumber: 40,
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(30);
    });

    it('should pass when no preview containers exist', () => {
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

  describe('CodeBlockScrollingRule', () => {
    const rule = new CodeBlockScrollingRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('code-block-scrolling');
      expect(rule.category).toBe('preview');
      expect(rule.autoFixable).toBe(true);
    });

    it('should pass when code block has overflow-x-auto class', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [
          {
            lineNumber: 25,
            content: 'const x = 1;',
            className: 'overflow-x-auto bg-ghost-dark rounded p-4',
          },
        ],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when code block has no overflow class', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [
          {
            lineNumber: 25,
            content: 'const x = 1;',
            className: 'bg-ghost-dark rounded p-4',
          },
        ],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('code-block-scrolling');
      expect(issues[0].lineNumber).toBe(25);
      expect(issues[0].autoFixable).toBe(true);
      expect(issues[0].expectedValue).toBe('overflow-x-auto');
    });

    it('should fail when code block has incorrect overflow class', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [
          {
            lineNumber: 25,
            content: 'const x = 1;',
            className: 'overflow-hidden bg-ghost-dark rounded p-4',
          },
        ],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].currentValue).toBe('overflow-hidden bg-ghost-dark rounded p-4');
    });

    it('should check all code blocks', () => {
      const page: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [
          {
            lineNumber: 25,
            content: 'const x = 1;',
            className: 'overflow-x-auto bg-ghost-dark rounded p-4',
          },
          {
            lineNumber: 35,
            content: 'const y = 2;',
            className: 'bg-ghost-dark rounded p-4',
          },
          {
            lineNumber: 45,
            content: 'const z = 3;',
            className: 'overflow-x-auto bg-ghost-dark rounded p-4',
          },
        ],
        inlineCode: [],
        previewContainers: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(35);
    });

    it('should pass when no code blocks exist', () => {
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

  describe('previewRules export', () => {
    it('should export all preview rules', () => {
      expect(previewRules).toHaveLength(4);
      expect(previewRules[0]).toBeInstanceOf(PreviewContainerBorderRule);
      expect(previewRules[1]).toBeInstanceOf(PreviewContainerRadiusRule);
      expect(previewRules[2]).toBeInstanceOf(ThemeVariableUsageRule);
      expect(previewRules[3]).toBeInstanceOf(CodeBlockScrollingRule);
    });

    it('should have all rules with correct categories', () => {
      previewRules.forEach((rule) => {
        expect(rule.category).toBe('preview');
      });
    });

    it('should have all rules marked as auto-fixable', () => {
      previewRules.forEach((rule) => {
        expect(rule.autoFixable).toBe(true);
      });
    });
  });
});
