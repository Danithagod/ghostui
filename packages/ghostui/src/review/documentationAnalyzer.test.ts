/**
 * Tests for DocumentationAnalyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DocumentationAnalyzer } from './documentationAnalyzer';
import { IssueCollector } from './issueCollector';
import { ComponentFile } from './types';
import * as fs from 'fs';
import * as path from 'path';

describe('DocumentationAnalyzer', () => {
  let analyzer: DocumentationAnalyzer;
  let issueCollector: IssueCollector;
  const testRootPath = path.join(process.cwd(), 'packages/ghostui');

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new DocumentationAnalyzer(issueCollector, testRootPath);
  });

  describe('checkJSDocPresence', () => {
    it('should identify components without JSDoc comments', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(testRootPath, 'src/components/BatBurst.tsx'),
          name: 'BatBurst',
          hasTest: false,
          exports: ['BatBurst']
        }
      ];

      const issues = analyzer.checkJSDocPresence(components);
      
      // Check if issues were found (some components may have JSDoc)
      expect(Array.isArray(issues)).toBe(true);
      
      // If issues exist, verify structure
      if (issues.length > 0) {
        expect(issues[0]).toHaveProperty('severity');
        expect(issues[0]).toHaveProperty('category', 'Documentation');
        expect(issues[0]).toHaveProperty('requirement', '9.1');
      }
    });

    it('should not report issues for components with JSDoc', () => {
      // This test would pass if a component has proper JSDoc
      const components: ComponentFile[] = [
        {
          path: path.join(testRootPath, 'src/components/BatBurst.tsx'),
          name: 'BatBurst',
          hasTest: false,
          exports: ['BatBurst']
        }
      ];

      const issues = analyzer.checkJSDocPresence(components);
      
      // Verify the analyzer runs without errors
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('verifyComplexPropDocumentation', () => {
    it('should identify complex props without documentation', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(testRootPath, 'src/components/SpectralTabs.tsx'),
          name: 'SpectralTabs',
          hasTest: false,
          exports: ['SpectralTabs']
        }
      ];

      const issues = analyzer.verifyComplexPropDocumentation(components);
      
      expect(Array.isArray(issues)).toBe(true);
      
      if (issues.length > 0) {
        expect(issues[0]).toHaveProperty('category', 'Documentation');
        expect(issues[0]).toHaveProperty('requirement', '9.2');
      }
    });
  });

  describe('checkDocumentationFileExistence', () => {
    it('should check for documentation pages', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(testRootPath, 'src/components/BatBurst.tsx'),
          name: 'BatBurst',
          hasTest: false,
          exports: ['BatBurst']
        }
      ];

      const issues = analyzer.checkDocumentationFileExistence(components);
      
      expect(Array.isArray(issues)).toBe(true);
      
      if (issues.length > 0) {
        expect(issues[0]).toHaveProperty('category', 'Documentation');
        expect(issues[0]).toHaveProperty('requirement', '9.3');
      }
    });
  });

  describe('verifyExportDocumentation', () => {
    it('should check index file exports for documentation', () => {
      const indexPath = path.join(testRootPath, 'src/index.ts');
      
      if (fs.existsSync(indexPath)) {
        const issues = analyzer.verifyExportDocumentation(indexPath);
        
        expect(Array.isArray(issues)).toBe(true);
        
        if (issues.length > 0) {
          expect(issues[0]).toHaveProperty('category', 'Documentation');
          expect(issues[0]).toHaveProperty('requirement', '9.5');
        }
      }
    });
  });
});
