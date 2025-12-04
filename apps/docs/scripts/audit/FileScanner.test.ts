/**
 * FileScanner Unit Tests
 *
 * Tests for the FileScanner class that discovers component documentation pages.
 *
 * Requirements: 7.1
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { FileScanner } from './FileScanner';
import * as path from 'path';

describe('FileScanner', () => {
  let scanner: FileScanner;

  beforeEach(() => {
    // Use '.' since tests run from apps/docs directory
    scanner = new FileScanner('.');
  });

  describe('scanComponentPages', () => {
    it('should find all component pages in the components directory', async () => {
      const pages = await scanner.scanComponentPages();

      // Should find multiple component pages
      expect(pages.length).toBeGreaterThan(0);

      // Each page should have required properties
      pages.forEach((page) => {
        expect(page.filePath).toBeDefined();
        expect(page.componentName).toBeDefined();
        expect(page.content).toBeDefined();
        expect(page.content.length).toBeGreaterThan(0);
      });
    });

    it('should extract correct component names from file paths', async () => {
      const pages = await scanner.scanComponentPages();

      // Check that known components are found
      const componentNames = pages.map((p) => p.componentName);

      // These components should exist based on the directory structure
      expect(componentNames).toContain('gooey-button');
      expect(componentNames).toContain('ghost-toast');
      expect(componentNames).toContain('coffin-card');
    });

    it('should return file paths ending with page.tsx', async () => {
      const pages = await scanner.scanComponentPages();

      pages.forEach((page) => {
        expect(page.filePath).toMatch(/page\.tsx$/);
      });
    });

    it('should return valid TSX content', async () => {
      const pages = await scanner.scanComponentPages();

      pages.forEach((page) => {
        // Content should contain typical TSX patterns
        expect(page.content).toContain('export');
        expect(page.content).toMatch(/function|const/);
      });
    });
  });

  describe('readPageContent', () => {
    it('should read file content correctly', async () => {
      // Path relative to apps/docs where tests run
      const testPath = path.join('app/docs/components/gooey-button/page.tsx');
      const content = await scanner.readPageContent(testPath);

      expect(content).toBeDefined();
      expect(content).toContain('GooeyButton');
    });

    it('should throw error for non-existent files', async () => {
      const nonExistentPath = 'app/docs/components/non-existent/page.tsx';

      await expect(scanner.readPageContent(nonExistentPath)).rejects.toThrow();
    });
  });

  describe('extractComponentName', () => {
    it('should extract component name from valid path', () => {
      const filePath = 'apps/docs/app/docs/components/gooey-button/page.tsx';
      const name = scanner.extractComponentName(filePath);

      expect(name).toBe('gooey-button');
    });

    it('should handle paths with different separators', () => {
      const unixPath = 'apps/docs/app/docs/components/ghost-toast/page.tsx';
      const name = scanner.extractComponentName(unixPath);

      expect(name).toBe('ghost-toast');
    });

    it('should return unknown for invalid paths', () => {
      const invalidPath = 'some/random/path.tsx';
      const name = scanner.extractComponentName(invalidPath);

      expect(name).toBe('unknown');
    });
  });

  describe('getComponentsDir', () => {
    it('should return the correct components directory path', () => {
      const dir = scanner.getComponentsDir();

      expect(dir).toContain('components');
      expect(dir).toContain('docs');
    });
  });

  describe('edge cases', () => {
    it('should handle non-existent base path gracefully', async () => {
      const invalidScanner = new FileScanner('non/existent/path');
      const pages = await invalidScanner.scanComponentPages();

      expect(pages).toEqual([]);
    });
  });
});
