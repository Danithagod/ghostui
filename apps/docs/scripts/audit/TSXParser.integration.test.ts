/**
 * Integration tests for TSXParser with real component pages
 *
 * Tests the parser against actual component documentation pages
 * to ensure it correctly extracts all required information.
 */

import { describe, it, expect } from 'vitest';
import { TSXParser } from './TSXParser';
import { FileScanner } from './FileScanner';

describe('TSXParser Integration Tests', () => {
  const parser = new TSXParser();
  const scanner = new FileScanner('.');

  it('should parse a real component page successfully', async () => {
    // Try to read the gooey-button page
    try {
      const content = await scanner.readPageContent(
        'app/docs/components/gooey-button/page.tsx'
      );
      const result = parser.parse(content);

      // Verify basic structure
      expect(result).toBeDefined();
      expect(result.headers.length).toBeGreaterThan(0);
      expect(result.componentPlaygrounds.length).toBeGreaterThan(0);

      // Verify H1 exists
      const h1 = result.headers.find((h) => h.level === 1);
      expect(h1).toBeDefined();
      expect(h1?.text).toBeTruthy();

      // Verify ComponentPlaygrounds exist
      expect(result.componentPlaygrounds.length).toBeGreaterThanOrEqual(3);

      // Verify at least one ComponentPlayground has all required props
      const completePlayground = result.componentPlaygrounds.find(
        (cp) => cp.hasPreview && cp.hasCode && cp.hasApi
      );
      expect(completePlayground).toBeDefined();

      // Verify PropsTable exists
      expect(result.propsTables.length).toBeGreaterThan(0);

      // Verify props array has items
      if (result.propsTables.length > 0) {
        expect(result.propsTables[0].propsArray.length).toBeGreaterThan(0);
      }

      // Verify sections are identified
      expect(result.sections.length).toBeGreaterThan(0);

      // Verify root container exists
      expect(result.rootContainer).toBeDefined();
    } catch (error) {
      // If the file doesn't exist, skip this test
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log('Skipping integration test - component page not found');
        return;
      }
      throw error;
    }
  });

  it('should extract correct header information from real pages', async () => {
    try {
      const content = await scanner.readPageContent(
        'app/docs/components/gooey-button/page.tsx'
      );
      const result = parser.parse(content);

      // Check that headers have line numbers
      for (const header of result.headers) {
        expect(header.lineNumber).toBeGreaterThan(0);
        expect(header.text).toBeTruthy();
        expect(header.level).toBeGreaterThan(0);
        expect(header.level).toBeLessThanOrEqual(6);
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log('Skipping integration test - component page not found');
        return;
      }
      throw error;
    }
  });

  it('should extract ComponentPlayground props correctly', async () => {
    try {
      const content = await scanner.readPageContent(
        'app/docs/components/gooey-button/page.tsx'
      );
      const result = parser.parse(content);

      // Verify each ComponentPlayground has a line number
      for (const playground of result.componentPlaygrounds) {
        expect(playground.lineNumber).toBeGreaterThan(0);
        expect(playground.props).toBeDefined();
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log('Skipping integration test - component page not found');
        return;
      }
      throw error;
    }
  });
});
