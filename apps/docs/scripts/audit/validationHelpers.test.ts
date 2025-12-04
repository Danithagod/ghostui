/**
 * Tests for Validation Helpers
 */

import { describe, it, expect } from 'vitest';
import {
  createIssue,
  createTypographyIssue,
  createSpacingIssue,
  createStructureIssue,
  createApiIssue,
  createPreviewIssue,
  createWarning,
  createInfo,
  BaseValidationRule,
  createRuleSet,
  filterRulesByCategory,
  filterRulesByAutoFixable,
} from './validationHelpers';
import type { ValidationIssue, ValidationContext, ParsedPage } from './types';

describe('Validation Helpers', () => {
  describe('createIssue', () => {
    it('should create a validation issue with all required fields', () => {
      const issue = createIssue({
        ruleId: 'test-rule',
        category: 'typography',
        message: 'Test message',
        filePath: '/path/to/file.tsx',
        expectedValue: 'expected',
        recommendation: 'Fix it',
      });

      expect(issue.ruleId).toBe('test-rule');
      expect(issue.category).toBe('typography');
      expect(issue.severity).toBe('error'); // default
      expect(issue.message).toBe('Test message');
      expect(issue.filePath).toBe('/path/to/file.tsx');
      expect(issue.expectedValue).toBe('expected');
      expect(issue.recommendation).toBe('Fix it');
      expect(issue.autoFixable).toBe(false); // default
    });

    it('should use provided severity and autoFixable values', () => {
      const issue = createIssue({
        ruleId: 'test-rule',
        category: 'spacing',
        severity: 'warning',
        message: 'Test message',
        filePath: '/path/to/file.tsx',
        expectedValue: 'expected',
        recommendation: 'Fix it',
        autoFixable: true,
      });

      expect(issue.severity).toBe('warning');
      expect(issue.autoFixable).toBe(true);
    });

    it('should include optional fields when provided', () => {
      const issue = createIssue({
        ruleId: 'test-rule',
        category: 'typography',
        message: 'Test message',
        filePath: '/path/to/file.tsx',
        lineNumber: 42,
        currentValue: 'current',
        expectedValue: 'expected',
        recommendation: 'Fix it',
      });

      expect(issue.lineNumber).toBe(42);
      expect(issue.currentValue).toBe('current');
    });
  });

  describe('createTypographyIssue', () => {
    it('should create a typography issue with correct defaults', () => {
      const issue = createTypographyIssue(
        'h1-typography',
        '/path/to/file.tsx',
        'H1',
        10,
        'text-3xl',
        'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide'
      );

      expect(issue.ruleId).toBe('h1-typography');
      expect(issue.category).toBe('typography');
      expect(issue.severity).toBe('error');
      expect(issue.message).toContain('H1');
      expect(issue.lineNumber).toBe(10);
      expect(issue.currentValue).toBe('text-3xl');
      expect(issue.autoFixable).toBe(true);
    });

    it('should handle empty current classes', () => {
      const issue = createTypographyIssue(
        'h1-typography',
        '/path/to/file.tsx',
        'H1',
        10,
        '',
        'text-3xl'
      );

      expect(issue.currentValue).toBe('(no classes)');
    });
  });

  describe('createSpacingIssue', () => {
    it('should create a spacing issue with correct category', () => {
      const issue = createSpacingIssue(
        'page-spacing',
        '/path/to/file.tsx',
        'page container',
        5,
        'space-y-6',
        'space-y-12'
      );

      expect(issue.category).toBe('spacing');
      expect(issue.message).toContain('spacing');
      expect(issue.autoFixable).toBe(true);
    });
  });

  describe('createStructureIssue', () => {
    it('should create a structure issue with autoFixable false by default', () => {
      const issue = createStructureIssue(
        'missing-section',
        '/path/to/file.tsx',
        'Missing required section',
        'Add the section'
      );

      expect(issue.category).toBe('structure');
      expect(issue.autoFixable).toBe(false);
    });

    it('should allow optional line number', () => {
      const issue = createStructureIssue(
        'missing-section',
        '/path/to/file.tsx',
        'Missing required section',
        'Add the section',
        15
      );

      expect(issue.lineNumber).toBe(15);
    });
  });

  describe('createApiIssue', () => {
    it('should create an API issue with correct category', () => {
      const issue = createApiIssue(
        'missing-props-table',
        '/path/to/file.tsx',
        'PropsTable is missing',
        'Add a PropsTable component'
      );

      expect(issue.category).toBe('api');
      expect(issue.autoFixable).toBe(false);
    });
  });

  describe('createPreviewIssue', () => {
    it('should create a preview issue with all required fields', () => {
      const issue = createPreviewIssue(
        'preview-border',
        '/path/to/file.tsx',
        'Preview container missing border',
        20,
        'rounded-lg',
        'rounded-lg border-ghost-orange/30',
        'Add the border class'
      );

      expect(issue.category).toBe('preview');
      expect(issue.lineNumber).toBe(20);
      expect(issue.autoFixable).toBe(true);
    });
  });

  describe('createWarning', () => {
    it('should create a warning-level issue', () => {
      const issue = createWarning(
        'potential-issue',
        'typography',
        '/path/to/file.tsx',
        'This might be an issue',
        'Consider reviewing this'
      );

      expect(issue.severity).toBe('warning');
      expect(issue.autoFixable).toBe(false);
    });
  });

  describe('createInfo', () => {
    it('should create an info-level issue', () => {
      const issue = createInfo(
        'suggestion',
        'structure',
        '/path/to/file.tsx',
        'Consider adding more examples',
        'Add 2-3 more examples'
      );

      expect(issue.severity).toBe('info');
      expect(issue.autoFixable).toBe(false);
    });
  });

  describe('BaseValidationRule', () => {
    class TestRule extends BaseValidationRule {
      validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
        return [
          this.createIssue(
            context,
            'Test issue',
            'expected',
            'Fix it',
            10,
            'current'
          ),
        ];
      }
    }

    it('should create a rule with correct properties', () => {
      const rule = new TestRule('test-rule', 'typography', 'Test rule description', true);

      expect(rule.id).toBe('test-rule');
      expect(rule.category).toBe('typography');
      expect(rule.description).toBe('Test rule description');
      expect(rule.autoFixable).toBe(true);
    });

    it('should default autoFixable to false', () => {
      const rule = new TestRule('test-rule', 'typography', 'Test rule description');
      expect(rule.autoFixable).toBe(false);
    });

    it('should validate and create issues', () => {
      const rule = new TestRule('test-rule', 'typography', 'Test rule description');
      const context: ValidationContext = {
        page: {} as ParsedPage,
        filePath: '/path/to/file.tsx',
        componentName: 'test-component',
        styleGuide: {} as any,
      };

      const issues = rule.validate({} as ParsedPage, context);
      expect(issues).toHaveLength(1);
      expect(issues[0].ruleId).toBe('test-rule');
      expect(issues[0].message).toBe('Test issue');
    });
  });

  describe('createRuleSet', () => {
    it('should return the same array of rules', () => {
      const rules = [
        new (class extends BaseValidationRule {
          validate() {
            return [];
          }
        })('rule1', 'typography', 'Rule 1'),
        new (class extends BaseValidationRule {
          validate() {
            return [];
          }
        })('rule2', 'spacing', 'Rule 2'),
      ];

      const ruleSet = createRuleSet(rules);
      expect(ruleSet).toEqual(rules);
      expect(ruleSet).toHaveLength(2);
    });
  });

  describe('filterRulesByCategory', () => {
    const rules = [
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule1', 'typography', 'Rule 1'),
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule2', 'spacing', 'Rule 2'),
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule3', 'typography', 'Rule 3'),
    ];

    it('should filter rules by category', () => {
      const typographyRules = filterRulesByCategory(rules, 'typography');
      expect(typographyRules).toHaveLength(2);
      expect(typographyRules[0].id).toBe('rule1');
      expect(typographyRules[1].id).toBe('rule3');
    });

    it('should return empty array when no rules match', () => {
      const apiRules = filterRulesByCategory(rules, 'api');
      expect(apiRules).toHaveLength(0);
    });
  });

  describe('filterRulesByAutoFixable', () => {
    const rules = [
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule1', 'typography', 'Rule 1', true),
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule2', 'spacing', 'Rule 2', false),
      new (class extends BaseValidationRule {
        validate() {
          return [];
        }
      })('rule3', 'typography', 'Rule 3', true),
    ];

    it('should filter auto-fixable rules', () => {
      const autoFixableRules = filterRulesByAutoFixable(rules, true);
      expect(autoFixableRules).toHaveLength(2);
      expect(autoFixableRules[0].id).toBe('rule1');
      expect(autoFixableRules[1].id).toBe('rule3');
    });

    it('should filter non-auto-fixable rules', () => {
      const nonAutoFixableRules = filterRulesByAutoFixable(rules, false);
      expect(nonAutoFixableRules).toHaveLength(1);
      expect(nonAutoFixableRules[0].id).toBe('rule2');
    });
  });
});
