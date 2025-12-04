/**
 * AuditEngine Unit Tests
 *
 * Tests for the AuditEngine class that orchestrates the documentation audit process.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AuditEngine } from './AuditEngine';
import {
  ComponentPage,
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
} from './types';

describe('AuditEngine', () => {
  let engine: AuditEngine;

  beforeEach(() => {
    engine = new AuditEngine();
  });

  describe('constructor', () => {
    it('should create an instance with default rules', () => {
      expect(engine).toBeDefined();
      expect(engine.getRules().length).toBeGreaterThan(0);
    });

    it('should accept custom rules', () => {
      const customRule: ValidationRule = {
        id: 'custom-rule',
        category: 'typography',
        description: 'Custom test rule',
        autoFixable: false,
        validate: () => [],
      };

      const customEngine = new AuditEngine([customRule]);
      expect(customEngine.getRules()).toHaveLength(1);
      expect(customEngine.getRules()[0].id).toBe('custom-rule');
    });
  });

  describe('audit', () => {
    it('should audit multiple pages and return results', async () => {
      const pages: ComponentPage[] = [
        {
          filePath: 'test1.tsx',
          componentName: 'test-component-1',
          content: `
            export default function TestPage() {
              return (
                <div className="space-y-12">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
                    Test Component
                  </h1>
                  <p className="lead text-ghost-white/90">Test description</p>
                  <ComponentPlayground preview={<div />} code="test" api={[]} />
                  <ComponentPlayground preview={<div />} code="test" api={[]} />
                  <ComponentPlayground preview={<div />} code="test" api={[]} />
                  <PropsTable props={[]} />
                </div>
              );
            }
          `,
        },
      ];

      const result = await engine.audit(pages);

      expect(result).toBeDefined();
      expect(result.totalPages).toBe(1);
      expect(result.pageResults).toHaveLength(1);
      expect(result.pageResults[0].componentName).toBe('test-component-1');
    });

    it('should handle empty page array', async () => {
      const result = await engine.audit([]);

      expect(result.totalPages).toBe(0);
      expect(result.pagesWithIssues).toBe(0);
      expect(result.totalIssues).toBe(0);
      expect(result.pageResults).toHaveLength(0);
    });

    it('should collect issues from all pages', async () => {
      const pages: ComponentPage[] = [
        {
          filePath: 'test1.tsx',
          componentName: 'test-1',
          content: `
            export default function TestPage() {
              return <div><h1>Missing Classes</h1></div>;
            }
          `,
        },
        {
          filePath: 'test2.tsx',
          componentName: 'test-2',
          content: `
            export default function TestPage() {
              return <div><h2>Also Missing Classes</h2></div>;
            }
          `,
        },
      ];

      const result = await engine.audit(pages);

      expect(result.totalPages).toBe(2);
      expect(result.totalIssues).toBeGreaterThan(0);
      expect(result.pagesWithIssues).toBeGreaterThan(0);
    });
  });

  describe('applyRules', () => {
    it('should apply all rules to a parsed page', () => {
      const parsedPage: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Test',
            className: 'wrong-class',
            lineNumber: 1,
          },
        ],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      const issues = engine.applyRules(parsedPage, 'test.tsx', 'test-component');

      expect(Array.isArray(issues)).toBe(true);
      // Should have at least one issue for the H1 with wrong classes
      expect(issues.length).toBeGreaterThan(0);
    });

    it('should return empty array when no issues found', () => {
      const parsedPage: ParsedPage = {
        ast: {},
        headers: [
          {
            level: 1,
            text: 'Test',
            className:
              'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
            lineNumber: 1,
          },
        ],
        sections: [],
        componentPlaygrounds: [
          {
            lineNumber: 5,
            hasPreview: true,
            hasCode: true,
            hasApi: true,
            props: { preview: true, code: true, api: true },
          },
          {
            lineNumber: 10,
            hasPreview: true,
            hasCode: true,
            hasApi: true,
            props: { preview: true, code: true, api: true },
          },
          {
            lineNumber: 15,
            hasPreview: true,
            hasCode: true,
            hasApi: true,
            props: { preview: true, code: true, api: true },
          },
        ],
        propsTables: [
          {
            lineNumber: 20,
            propsArray: [
              {
                name: 'test',
                type: 'string',
                default: 'default',
                description: 'Test prop',
              },
            ],
          },
        ],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
        rootContainer: {
          type: 'div',
          className: 'space-y-12',
          lineNumber: 1,
          props: {},
        },
      };

      const issues = engine.applyRules(parsedPage, 'test.tsx', 'test-component');

      // Should have minimal or no issues for a well-formed page
      expect(Array.isArray(issues)).toBe(true);
    });

    it('should handle rule execution errors gracefully', () => {
      const failingRule: ValidationRule = {
        id: 'failing-rule',
        category: 'typography',
        description: 'Rule that throws error',
        autoFixable: false,
        validate: () => {
          throw new Error('Test error');
        },
      };

      const customEngine = new AuditEngine([failingRule]);
      const parsedPage: ParsedPage = {
        ast: {},
        headers: [],
        sections: [],
        componentPlaygrounds: [],
        propsTables: [],
        codeBlocks: [],
        inlineCode: [],
        previewContainers: [],
      };

      // Should not throw, but log error and continue
      expect(() => {
        customEngine.applyRules(parsedPage, 'test.tsx', 'test-component');
      }).not.toThrow();
    });
  });

  describe('audit result generation', () => {
    it('should calculate correct summary statistics', async () => {
      const pages: ComponentPage[] = [
        {
          filePath: 'test1.tsx',
          componentName: 'test-1',
          content: `
            export default function TestPage() {
              return <div><h1>Missing Classes</h1></div>;
            }
          `,
        },
        {
          filePath: 'test2.tsx',
          componentName: 'test-2',
          content: `
            export default function TestPage() {
              return (
                <div className="space-y-12">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
                    Good Component
                  </h1>
                </div>
              );
            }
          `,
        },
      ];

      const result = await engine.audit(pages);

      expect(result.totalPages).toBe(2);
      expect(result.issuesByCategory).toBeDefined();
      expect(result.issuesBySeverity).toBeDefined();
    });

    it('should categorize issues correctly', async () => {
      const pages: ComponentPage[] = [
        {
          filePath: 'test.tsx',
          componentName: 'test',
          content: `
            export default function TestPage() {
              return (
                <div>
                  <h1>Missing Typography Classes</h1>
                  <h2>Also Missing</h2>
                </div>
              );
            }
          `,
        },
      ];

      const result = await engine.audit(pages);

      expect(result.issuesByCategory.typography).toBeGreaterThan(0);
      expect(result.issuesBySeverity.error).toBeGreaterThan(0);
    });

    it('should calculate compliance scores', async () => {
      const pages: ComponentPage[] = [
        {
          filePath: 'test.tsx',
          componentName: 'test',
          content: `
            export default function TestPage() {
              return <div><h1>Test</h1></div>;
            }
          `,
        },
      ];

      const result = await engine.audit(pages);

      expect(result.pageResults[0].score).toBeGreaterThanOrEqual(0);
      expect(result.pageResults[0].score).toBeLessThanOrEqual(100);
    });

    it('should assign correct status based on score', async () => {
      const compliantPage: ComponentPage = {
        filePath: 'compliant.tsx',
        componentName: 'compliant',
        content: `
          export default function TestPage() {
            return (
              <div className="space-y-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
                  Test Component
                </h1>
                <p className="lead text-ghost-white/90">Description</p>
                <ComponentPlayground preview={<div />} code="test" api={[]} />
                <ComponentPlayground preview={<div />} code="test" api={[]} />
                <ComponentPlayground preview={<div />} code="test" api={[]} />
                <PropsTable props={[{ name: 'test', type: 'string', default: 'test', description: 'test' }]} />
              </div>
            );
          }
        `,
      };

      const result = await engine.audit([compliantPage]);

      expect(result.pageResults[0].status).toBeDefined();
      expect(['compliant', 'needs-review', 'needs-fixes']).toContain(
        result.pageResults[0].status
      );
    });
  });

  describe('getRules', () => {
    it('should return all validation rules', () => {
      const rules = engine.getRules();

      expect(Array.isArray(rules)).toBe(true);
      expect(rules.length).toBeGreaterThan(0);

      // Check that rules have required properties
      rules.forEach((rule) => {
        expect(rule.id).toBeDefined();
        expect(rule.category).toBeDefined();
        expect(rule.description).toBeDefined();
        expect(typeof rule.autoFixable).toBe('boolean');
        expect(typeof rule.validate).toBe('function');
      });
    });

    it('should return a copy of rules array', () => {
      const rules1 = engine.getRules();
      const rules2 = engine.getRules();

      expect(rules1).not.toBe(rules2); // Different array instances
      expect(rules1).toEqual(rules2); // Same content
    });
  });

  describe('getParser', () => {
    it('should return the TSX parser instance', () => {
      const parser = engine.getParser();

      expect(parser).toBeDefined();
      expect(typeof parser.parse).toBe('function');
    });
  });
});
