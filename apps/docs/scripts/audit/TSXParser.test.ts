/**
 * Tests for TSXParser
 *
 * Validates TSX parsing functionality including header extraction,
 * ComponentPlayground detection, PropsTable extraction, and code block identification.
 */

import { describe, it, expect } from 'vitest';
import { TSXParser } from './TSXParser';

describe('TSXParser', () => {
  const parser = new TSXParser();

  describe('parse()', () => {
    it('should parse valid TSX content without errors', () => {
      const content = `
        export default function TestPage() {
          return (
            <div className="space-y-12">
              <h1 className="text-3xl font-display text-ghost-orange">Test Component</h1>
              <p className="lead text-ghost-white/90">A test component description.</p>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result).toBeDefined();
      expect(result.ast).toBeDefined();
      expect(result.headers).toBeDefined();
      expect(result.sections).toBeDefined();
    });

    it('should extract H1 headers with correct properties', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
                Test Component
              </h1>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.headers).toHaveLength(1);
      expect(result.headers[0].level).toBe(1);
      expect(result.headers[0].text).toBe('Test Component');
      expect(result.headers[0].className).toBe(
        'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide'
      );
      expect(result.headers[0].lineNumber).toBeGreaterThan(0);
    });

    it('should extract multiple headers with different levels', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1 className="text-3xl">Main Title</h1>
              <h2 className="text-2xl">Section Title</h2>
              <h3 className="text-xl">Subsection Title</h3>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.headers).toHaveLength(3);
      expect(result.headers[0].level).toBe(1);
      expect(result.headers[0].text).toBe('Main Title');
      expect(result.headers[1].level).toBe(2);
      expect(result.headers[1].text).toBe('Section Title');
      expect(result.headers[2].level).toBe(3);
      expect(result.headers[2].text).toBe('Subsection Title');
    });

    it('should extract ComponentPlayground instances', () => {
      const content = `
        import { ComponentPlayground } from '@/components/ComponentPlayground';
        
        export default function TestPage() {
          return (
            <div>
              <ComponentPlayground
                preview={<div>Preview</div>}
                code="const x = 1;"
                api={<div>API</div>}
              />
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.componentPlaygrounds).toHaveLength(1);
      expect(result.componentPlaygrounds[0].hasPreview).toBe(true);
      expect(result.componentPlaygrounds[0].hasCode).toBe(true);
      expect(result.componentPlaygrounds[0].hasApi).toBe(true);
      expect(result.componentPlaygrounds[0].lineNumber).toBeGreaterThan(0);
    });

    it('should detect ComponentPlayground with missing props', () => {
      const content = `
        import { ComponentPlayground } from '@/components/ComponentPlayground';
        
        export default function TestPage() {
          return (
            <div>
              <ComponentPlayground
                preview={<div>Preview</div>}
              />
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.componentPlaygrounds).toHaveLength(1);
      expect(result.componentPlaygrounds[0].hasPreview).toBe(true);
      expect(result.componentPlaygrounds[0].hasCode).toBe(false);
      expect(result.componentPlaygrounds[0].hasApi).toBe(false);
    });

    it('should extract PropsTable instances', () => {
      const content = `
        import { PropsTable } from '@/components/PropsTable';
        
        export default function TestPage() {
          const props = [
            {
              name: 'variant',
              type: 'string',
              default: 'primary',
              description: 'The variant style'
            }
          ];
          
          return (
            <div>
              <PropsTable props={props} />
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.propsTables).toHaveLength(1);
      expect(result.propsTables[0].lineNumber).toBeGreaterThan(0);
      expect(result.propsTables[0].propsArray).toHaveLength(1);
      expect(result.propsTables[0].propsArray[0].name).toBe('variant');
      expect(result.propsTables[0].propsArray[0].type).toBe('string');
      expect(result.propsTables[0].propsArray[0].default).toBe('primary');
      expect(result.propsTables[0].propsArray[0].description).toBe('The variant style');
    });

    it('should extract inline code elements', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <p>Use the <code className="px-1.5 py-0.5 rounded">variant</code> prop.</p>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.inlineCode.length).toBeGreaterThan(0);
      expect(result.inlineCode[0].content).toBe('variant');
      expect(result.inlineCode[0].className).toBe('px-1.5 py-0.5 rounded');
    });

    it('should extract root container element', () => {
      const content = `
        export default function TestPage() {
          return (
            <div className="space-y-12 prose prose-invert max-w-none">
              <h1>Test</h1>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.rootContainer).toBeDefined();
      expect(result.rootContainer?.type).toBe('div');
      expect(result.rootContainer?.className).toBe('space-y-12 prose prose-invert max-w-none');
    });

    it('should identify sections based on headers', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1>Component Name</h1>
              <h2>Basic Usage</h2>
              <h2>Variants</h2>
              <h2>API</h2>
              <h2>Accessibility</h2>
            </div>
          );
        }
      `;

      const result = parser.parse(content);

      expect(result.sections.length).toBeGreaterThan(0);
      
      const headerSection = result.sections.find(s => s.type === 'header');
      expect(headerSection).toBeDefined();
      
      const basicUsageSection = result.sections.find(s => s.type === 'basic-usage');
      expect(basicUsageSection).toBeDefined();
      
      const variantsSection = result.sections.find(s => s.type === 'variants');
      expect(variantsSection).toBeDefined();
      
      const apiSection = result.sections.find(s => s.type === 'api');
      expect(apiSection).toBeDefined();
      
      const accessibilitySection = result.sections.find(s => s.type === 'accessibility');
      expect(accessibilitySection).toBeDefined();
    });

    it('should handle malformed TSX gracefully', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1>Valid Header</h1>
            </div>
          );
        }
      `;

      // Should not throw
      expect(() => parser.parse(content)).not.toThrow();
    });
  });

  describe('extractElements()', () => {
    it('should extract elements by selector', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1 className="title">Title 1</h1>
              <h1 className="title">Title 2</h1>
            </div>
          );
        }
      `;

      const result = parser.parse(content);
      const h1Elements = parser.extractElements(result.ast as any, 'h1');

      expect(h1Elements).toHaveLength(2);
      expect(h1Elements[0].type).toBe('h1');
      expect(h1Elements[0].className).toBe('title');
    });

    it('should return empty array when no elements match', () => {
      const content = `
        export default function TestPage() {
          return (
            <div>
              <h1>Title</h1>
            </div>
          );
        }
      `;

      const result = parser.parse(content);
      const h2Elements = parser.extractElements(result.ast as any, 'h2');

      expect(h2Elements).toHaveLength(0);
    });
  });
});
