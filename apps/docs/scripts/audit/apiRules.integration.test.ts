/**
 * Integration Tests for API Documentation Validation Rules
 *
 * These tests verify that the API rules work correctly with the TSX parser
 * on real-world TSX content.
 */

import { describe, it, expect } from 'vitest';
import { TSXParser } from './TSXParser';
import { PropsTablePresenceRule, PropObjectStructureRule } from './apiRules';
import type { ValidationContext } from './types';
import { getStyleGuideConfig } from './styleGuideConfig';

describe('API Rules Integration Tests', () => {
  const parser = new TSXParser();
  const styleGuide = getStyleGuideConfig();

  const createContext = (filePath = '/test/page.tsx'): ValidationContext => ({
    page: {} as any,
    filePath,
    componentName: 'test-component',
    styleGuide,
  });

  describe('PropsTablePresenceRule with real TSX', () => {
    const rule = new PropsTablePresenceRule();

    it('should detect PropsTable in valid component page', () => {
      const tsxContent = `
        export default function ComponentPage() {
          const props = [
            { name: 'variant', type: 'string', default: 'default', description: 'The variant style' },
          ];

          return (
            <div>
              <h1>Component Name</h1>
              <p className="lead">Component description</p>
              <PropsTable props={props} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should detect missing PropsTable', () => {
      const tsxContent = `
        export default function ComponentPage() {
          return (
            <div>
              <h1>Component Name</h1>
              <p className="lead">Component description</p>
              <ComponentPlayground preview={<div>Preview</div>} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('missing a PropsTable component');
    });
  });

  describe('PropObjectStructureRule with real TSX', () => {
    const rule = new PropObjectStructureRule();

    it('should pass when props have all required fields', () => {
      const tsxContent = `
        export default function ComponentPage() {
          const props = [
            { name: 'variant', type: 'string', default: 'default', description: 'The variant style' },
            { name: 'size', type: 'number', default: '16', description: 'The size in pixels' },
          ];

          return (
            <div>
              <PropsTable props={props} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should detect props missing required fields', () => {
      const tsxContent = `
        export default function ComponentPage() {
          const props = [
            { name: 'variant', type: 'string', default: 'default', description: 'The variant style' },
            { name: 'size', type: 'number' },
          ];

          return (
            <div>
              <PropsTable props={props} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('size');
      expect(issues[0].message).toContain('missing required fields');
    });

    it('should detect multiple props with missing fields', () => {
      const tsxContent = `
        export default function ComponentPage() {
          const props = [
            { name: 'variant', type: 'string' },
            { name: 'size', default: '16' },
            { name: 'color', type: 'string', default: 'blue', description: 'The color' },
          ];

          return (
            <div>
              <PropsTable props={props} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(2);
      expect(issues[0].message).toContain('variant');
      expect(issues[1].message).toContain('size');
    });

    it('should handle inline props array', () => {
      const tsxContent = `
        export default function ComponentPage() {
          return (
            <div>
              <PropsTable props={[
                { name: 'variant', type: 'string', default: 'default', description: 'The variant style' },
              ]} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(0);
    });

    it('should handle multiple PropsTables', () => {
      const tsxContent = `
        export default function ComponentPage() {
          const mainProps = [
            { name: 'variant', type: 'string', default: 'default', description: 'The variant style' },
          ];

          const eventProps = [
            { name: 'onClick', type: 'function' },
          ];

          return (
            <div>
              <PropsTable props={mainProps} />
              <PropsTable props={eventProps} />
            </div>
          );
        }
      `;

      const page = parser.parse(tsxContent);
      const context = { ...createContext(), page };
      const issues = rule.validate(page, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].message).toContain('onClick');
      expect(issues[0].message).toContain('missing required fields');
    });
  });
});
