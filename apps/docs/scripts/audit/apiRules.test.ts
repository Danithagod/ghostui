/**
 * Tests for API Documentation Validation Rules
 */

import { describe, it, expect } from 'vitest';
import {
  PropsTablePresenceRule,
  PropObjectStructureRule,
  apiRules,
} from './apiRules';
import type {
  ParsedPage,
  ValidationContext,
  PropsTableInstance,
  PropDefinition,
} from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('API Documentation Validation Rules', () => {
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = '/test/page.tsx'): ValidationContext => ({
    page: {} as ParsedPage,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  const createBasePage = (): ParsedPage => ({
    ast: {},
    headers: [],
    sections: [],
    componentPlaygrounds: [],
    propsTables: [],
    codeBlocks: [],
    inlineCode: [],
    previewContainers: [],
  });

  describe('PropsTablePresenceRule', () => {
    const rule = new PropsTablePresenceRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('props-table-presence');
      expect(rule.category).toBe('api');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when page has at least one PropsTable', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value', description: 'A prop' },
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should pass when page has multiple PropsTables', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value', description: 'A prop' },
            ],
          },
          {
            lineNumber: 20,
            propsArray: [
              { name: 'prop2', type: 'number', default: '0', description: 'Another prop' },
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when page has no PropsTable', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('props-table-presence');
      expect(issues[0].category).toBe('api');
      expect(issues[0].message).toContain('missing a PropsTable component');
      expect(issues[0].autoFixable).toBe(false);
      expect(issues[0].recommendation).toContain('Add a PropsTable component');
    });

    it('should pass when page has PropsTable with empty props array', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });
  });

  describe('PropObjectStructureRule', () => {
    const rule = new PropObjectStructureRule();

    it('should have correct metadata', () => {
      expect(rule.id).toBe('prop-object-structure');
      expect(rule.category).toBe('api');
      expect(rule.autoFixable).toBe(false);
    });

    it('should pass when all props have required fields', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value', description: 'A prop' },
              { name: 'prop2', type: 'number', default: '0', description: 'Another prop' },
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should fail when prop is missing name field', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { type: 'string', default: 'value', description: 'A prop' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('prop-object-structure');
      expect(issues[0].category).toBe('api');
      expect(issues[0].message).toContain('missing required fields: name');
      expect(issues[0].lineNumber).toBe(10);
      expect(issues[0].autoFixable).toBe(false);
    });

    it('should fail when prop is missing type field', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', default: 'value', description: 'A prop' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required fields: type');
    });

    it('should fail when prop is missing default field', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', description: 'A prop' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required fields: default');
    });

    it('should fail when prop is missing description field', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required fields: description');
    });

    it('should fail when prop is missing multiple fields', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required fields: default, description');
    });

    it('should fail when prop has empty string fields', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: '', default: 'value', description: 'A prop' },
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing required fields: type');
    });

    it('should report issues for multiple incomplete props', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value', description: 'A prop' },
              { name: 'prop2', type: 'number' } as PropDefinition,
              { name: 'prop3', default: 'value' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(2);
      expect(issues[0].message).toContain('prop2');
      expect(issues[0].message).toContain('missing required fields: default, description');
      expect(issues[1].message).toContain('prop3');
      expect(issues[1].message).toContain('missing required fields: type, description');
    });

    it('should handle prop without name field gracefully', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { type: 'string', default: 'value' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('prop at index 0');
      expect(issues[0].message).toContain('missing required fields: name, description');
    });

    it('should check all PropsTables on the page', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [
              { name: 'prop1', type: 'string', default: 'value', description: 'A prop' },
            ],
          },
          {
            lineNumber: 20,
            propsArray: [
              { name: 'prop2', type: 'number' } as PropDefinition,
            ],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].lineNumber).toBe(20);
      expect(issues[0].message).toContain('prop2');
    });

    it('should pass when PropsTable has no props', () => {
      const page: ParsedPage = {
        ...createBasePage(),
        propsTables: [
          {
            lineNumber: 10,
            propsArray: [],
          },
        ],
      };

      const context = createContext();
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });
  });

  describe('apiRules export', () => {
    it('should export all API rules', () => {
      expect(apiRules).toHaveLength(2);
      expect(apiRules[0]).toBeInstanceOf(PropsTablePresenceRule);
      expect(apiRules[1]).toBeInstanceOf(PropObjectStructureRule);
    });

    it('should have all rules with correct categories', () => {
      apiRules.forEach((rule) => {
        expect(rule.category).toBe('api');
      });
    });

    it('should have all rules marked as not auto-fixable', () => {
      apiRules.forEach((rule) => {
        expect(rule.autoFixable).toBe(false);
      });
    });
  });
});
