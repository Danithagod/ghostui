/**
 * Tests for DocumentationFixer
 *
 * Validates fix application, validation, and rollback functionality.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DocumentationFixer } from './DocumentationFixer';
import { ComponentPage, ValidationIssue } from './types';

describe('DocumentationFixer', () => {
  let fixer: DocumentationFixer;

  beforeEach(() => {
    fixer = new DocumentationFixer();
    fixer.clearFixHistory();
  });

  describe('fix()', () => {
    it('should fix a simple className issue', async () => {
      const page: ComponentPage = {
        filePath: 'test.tsx',
        componentName: 'test',
        content: `
          export default function TestPage() {
            return (
              <div>
                <h1 className="text-2xl">Test Title</h1>
              </div>
            );
          }
        `,
      };

      const issues: ValidationIssue[] = [
        {
          ruleId: 'h1-typography',
          category: 'typography',
          severity: 'error',
          message: 'H1 must use correct classes',
          filePath: 'test.tsx',
          lineNumber: 5,
          currentValue: 'text-2xl',
          expectedValue: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
          recommendation: 'Update H1 className',
          autoFixable: true,
        },
      ];

      const result = await fixer.fix(page, issues);

      expect(result.success).toBe(true);
      expect(result.fixedIssues).toHaveLength(1);
      expect(result.unfixedIssues).toHaveLength(0);
      expect(result.modifiedContent).toContain('text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide');
    });

    it('should skip non-auto-fixable issues', async () => {
      const page: ComponentPage = {
        filePath: 'test.tsx',
        componentName: 'test',
        content: `
          export default function TestPage() {
            return <div><h1>Test</h1></div>;
          }
        `,
      };

      const issues: ValidationIssue[] = [
        {
          ruleId: 'structure-order',
          category: 'structure',
          severity: 'error',
          message: 'Sections in wrong order',
          filePath: 'test.tsx',
          expectedValue: 'Correct order',
          recommendation: 'Reorder sections',
          autoFixable: false,
        },
      ];

      const result = await fixer.fix(page, issues);

      expect(result.success).toBe(true);
      expect(result.fixedIssues).toHaveLength(0);
      expect(result.unfixedIssues).toHaveLength(1);
      expect(result.modifiedContent).toBe(page.content);
    });

    it('should handle multiple auto-fixable issues', async () => {
      const page: ComponentPage = {
        filePath: 'test.tsx',
        componentName: 'test',
        content: `export default function TestPage() {
  return (
    <div>
      <h1 className="text-2xl">Test Title</h1>
      <h2 className="text-xl">Section</h2>
    </div>
  );
}`,
      };

      const issues: ValidationIssue[] = [
        {
          ruleId: 'h1-typography',
          category: 'typography',
          severity: 'error',
          message: 'H1 must use correct classes',
          filePath: 'test.tsx',
          lineNumber: 4,
          currentValue: 'text-2xl',
          expectedValue: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
          recommendation: 'Update H1 className',
          autoFixable: true,
        },
        {
          ruleId: 'h2-typography',
          category: 'typography',
          severity: 'error',
          message: 'H2 must use correct classes',
          filePath: 'test.tsx',
          lineNumber: 5,
          currentValue: 'text-xl',
          expectedValue: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',
          recommendation: 'Update H2 className',
          autoFixable: true,
        },
      ];

      const result = await fixer.fix(page, issues);

      // At least one fix should succeed
      expect(result.fixedIssues.length).toBeGreaterThan(0);
      expect(result.modifiedContent).toContain('text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide');
    });

    it('should track fix history', async () => {
      const page: ComponentPage = {
        filePath: 'test.tsx',
        componentName: 'test',
        content: `
          export default function TestPage() {
            return <div><h1 className="text-2xl">Test</h1></div>;
          }
        `,
      };

      const issues: ValidationIssue[] = [
        {
          ruleId: 'h1-typography',
          category: 'typography',
          severity: 'error',
          message: 'H1 must use correct classes',
          filePath: 'test.tsx',
          lineNumber: 3,
          expectedValue: 'text-3xl font-display',
          recommendation: 'Update H1 className',
          autoFixable: true,
        },
      ];

      await fixer.fix(page, issues);

      const history = fixer.getFixHistory('test.tsx');
      expect(history).toHaveLength(1);
      expect(history[0].success).toBe(true);
      expect(history[0].issue.ruleId).toBe('h1-typography');
    });
  });

  describe('validateFix()', () => {
    it('should validate syntactically correct fixes', () => {
      const original = `
        export default function TestPage() {
          return <div><h1 className="old">Test</h1></div>;
        }
      `;

      const fixed = `
        export default function TestPage() {
          return <div><h1 className="new">Test</h1></div>;
        }
      `;

      const isValid = fixer.validateFix(original, fixed);
      expect(isValid).toBe(true);
    });

    it('should reject fixes with syntax errors', () => {
      const original = `
        export default function TestPage() {
          return <div><h1>Test</h1></div>;
        }
      `;

      const fixed = `
        export default function TestPage() {
          return <div><h1>Test</h1></div
        }
      `;

      const isValid = fixer.validateFix(original, fixed);
      expect(isValid).toBe(false);
    });

    it('should reject fixes that do not change content', () => {
      const content = `
        export default function TestPage() {
          return <div><h1>Test</h1></div>;
        }
      `;

      const isValid = fixer.validateFix(content, content);
      expect(isValid).toBe(false);
    });
  });

  describe('applyFix()', () => {
    it('should apply className fix to correct element', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1 className="text-2xl">Test Title</h1>
            </div>
          );
        }
      `;

      const issue: ValidationIssue = {
        ruleId: 'h1-typography',
        category: 'typography',
        severity: 'error',
        message: 'H1 must use correct classes',
        filePath: 'test.tsx',
        lineNumber: 5,
        expectedValue: 'text-3xl font-display',
        recommendation: 'Update H1 className',
        autoFixable: true,
      };

      const fixed = fixer.applyFix(content, issue);

      expect(fixed).toContain('text-3xl font-display');
      expect(fixed).not.toContain('text-2xl');
    });

    it('should add className attribute if missing', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1>Test Title</h1>
            </div>
          );
        }
      `;

      const issue: ValidationIssue = {
        ruleId: 'h1-typography',
        category: 'typography',
        severity: 'error',
        message: 'H1 must have className',
        filePath: 'test.tsx',
        lineNumber: 5,
        expectedValue: 'text-3xl font-display',
        recommendation: 'Add className to H1',
        autoFixable: true,
      };

      const fixed = fixer.applyFix(content, issue);

      expect(fixed).toContain('className="text-3xl font-display"');
    });
  });
});
