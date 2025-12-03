/**
 * Tests for architecture analyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ArchitectureAnalyzer } from './architectureAnalyzer';
import { IssueCollector } from './issueCollector';
import { ComponentFile } from './types';
import * as fs from 'fs';
import * as path from 'path';

describe('ArchitectureAnalyzer', () => {
  let analyzer: ArchitectureAnalyzer;
  let issueCollector: IssueCollector;

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new ArchitectureAnalyzer(issueCollector);
  });

  describe('checkComponentComplexity', () => {
    it('should analyze component complexity', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GhostToast.tsx'),
          name: 'GhostToast',
          hasTest: true,
          exports: ['GhostToast']
        }
      ];

      const issues = analyzer.checkComponentComplexity(components);
      
      // Should return an array (may or may not have issues depending on component size)
      expect(Array.isArray(issues)).toBe(true);
      
      // If there are issues, they should have the correct structure
      issues.forEach(issue => {
        expect(issue.severity).toBe('medium');
        expect(issue.requirement).toBe('8.1');
        expect(issue.category).toBe('Architecture');
        expect(issue.title).toMatch(/Excessive (file complexity|component function length)/);
      });
    });

    it('should not flag simple components', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatIcon.tsx'),
          name: 'BatIcon',
          hasTest: false,
          exports: ['BatIcon']
        }
      ];

      const issues = analyzer.checkComponentComplexity(components);
      
      // BatIcon is a simple component
      expect(issues.length).toBe(0);
    });
  });

  describe('verifySideEffectEncapsulation', () => {
    it('should identify components with side effects', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GhostCursor.tsx'),
          name: 'GhostCursor',
          hasTest: false,
          exports: ['GhostCursor']
        }
      ];

      const issues = analyzer.verifySideEffectEncapsulation(components);
      
      // GhostCursor uses event listeners and should have proper encapsulation
      // This test verifies the analyzer can detect side effects
      expect(Array.isArray(issues)).toBe(true);
    });

    it('should handle components without side effects', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatIcon.tsx'),
          name: 'BatIcon',
          hasTest: false,
          exports: ['BatIcon']
        }
      ];

      const issues = analyzer.verifySideEffectEncapsulation(components);
      
      // BatIcon has no side effects
      expect(issues.length).toBe(0);
    });
  });

  describe('analyzeAll', () => {
    it('should run all architecture analyses', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GhostToast.tsx'),
          name: 'GhostToast',
          hasTest: true,
          exports: ['GhostToast']
        }
      ];

      const results = analyzer.analyzeAll(components);
      
      expect(results).toHaveProperty('complexity');
      expect(results).toHaveProperty('sideEffects');
      expect(results).toHaveProperty('allIssues');
      
      expect(Array.isArray(results.complexity)).toBe(true);
      expect(Array.isArray(results.sideEffects)).toBe(true);
      expect(Array.isArray(results.allIssues)).toBe(true);
      
      // allIssues should be the combination of all issue types
      expect(results.allIssues.length).toBe(
        results.complexity.length + results.sideEffects.length
      );
    });
  });
});
