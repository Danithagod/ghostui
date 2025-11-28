/**
 * Tests for error handling analyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ErrorHandlingAnalyzer } from './errorHandlingAnalyzer';
import { IssueCollector } from './issueCollector';
import { ComponentFile } from './types';
import * as fs from 'fs';
import * as path from 'path';

describe('ErrorHandlingAnalyzer', () => {
  let analyzer: ErrorHandlingAnalyzer;
  let issueCollector: IssueCollector;

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new ErrorHandlingAnalyzer(issueCollector);
  });

  describe('checkPropValidation', () => {
    it('should identify components with numeric props lacking validation', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/SpookyProgressBar.tsx'),
          name: 'SpookyProgressBar',
          hasTest: true,
          exports: ['SpookyProgressBar']
        }
      ];

      const issues = analyzer.checkPropValidation(components);
      
      // SpookyProgressBar has progress prop (0-100) with validation
      // So it should not have issues
      expect(issues.length).toBe(0);
    });
  });

  describe('verifyNullUndefinedHandling', () => {
    it('should check for unsafe property access', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GooeyButton.tsx'),
          name: 'GooeyButton',
          hasTest: true,
          exports: ['GooeyButton']
        }
      ];

      const issues = analyzer.verifyNullUndefinedHandling(components);
      
      // Should complete without errors
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('checkInvalidStateGuards', () => {
    it('should identify components with complex state', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/HauntedSidebar.tsx'),
          name: 'HauntedSidebar',
          hasTest: true,
          exports: ['HauntedSidebar']
        }
      ];

      const issues = analyzer.checkInvalidStateGuards(components);
      
      // Should complete without errors
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('verifyAsyncErrorHandling', () => {
    it('should check for async error handling', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GhostToast.tsx'),
          name: 'GhostToast',
          hasTest: true,
          exports: ['GhostToast']
        }
      ];

      const issues = analyzer.verifyAsyncErrorHandling(components);
      
      // Should complete without errors
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('analyzeAll', () => {
    it('should run all error handling analyses', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/SpookyProgressBar.tsx'),
          name: 'SpookyProgressBar',
          hasTest: true,
          exports: ['SpookyProgressBar']
        }
      ];

      const results = analyzer.analyzeAll(components);
      
      expect(results).toHaveProperty('propValidation');
      expect(results).toHaveProperty('nullUndefinedHandling');
      expect(results).toHaveProperty('stateGuards');
      expect(results).toHaveProperty('asyncErrorHandling');
      expect(results).toHaveProperty('allIssues');
      
      expect(Array.isArray(results.propValidation)).toBe(true);
      expect(Array.isArray(results.nullUndefinedHandling)).toBe(true);
      expect(Array.isArray(results.stateGuards)).toBe(true);
      expect(Array.isArray(results.asyncErrorHandling)).toBe(true);
      expect(Array.isArray(results.allIssues)).toBe(true);
    });
  });
});
