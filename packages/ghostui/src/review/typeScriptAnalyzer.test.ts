/**
 * Tests for TypeScript analyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TypeScriptAnalyzer } from './typeScriptAnalyzer';
import { IssueCollector } from './issueCollector';
import { FileScanner } from './fileScanner';

describe('TypeScriptAnalyzer', () => {
  let analyzer: TypeScriptAnalyzer;
  let issueCollector: IssueCollector;
  let fileScanner: FileScanner;

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new TypeScriptAnalyzer(issueCollector);
    fileScanner = new FileScanner();
  });

  describe('scanForInterfaceDefinitions', () => {
    it('should identify components with Props interfaces', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.scanForInterfaceDefinitions(components);

      // SpookyProgressBar, GooeyButton, and BatToggle should have Props interfaces
      const spookyProgressBarIssues = issues.filter(i => i.location.includes('SpookyProgressBar'));
      const gooeyButtonIssues = issues.filter(i => i.location.includes('GooeyButton'));
      const batToggleIssues = issues.filter(i => i.location.includes('BatToggle'));

      expect(spookyProgressBarIssues.length).toBe(0);
      expect(gooeyButtonIssues.length).toBe(0);
      expect(batToggleIssues.length).toBe(0);
    });

    it('should report components missing Props interfaces', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.scanForInterfaceDefinitions(components);

      // Check that issues have correct structure
      issues.forEach(issue => {
        expect(issue.severity).toBeDefined();
        expect(issue.category).toBe('TypeScript');
        expect(issue.requirement).toBe('1.1');
        expect(issue.title).toContain('Missing Props interface');
      });
    });
  });

  describe('analyzeOptionalPropHandling', () => {
    it('should check optional props have default values or undefined checks', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.analyzeOptionalPropHandling(components);

      // Issues should have correct structure
      issues.forEach(issue => {
        expect(issue.category).toBe('TypeScript');
        expect(issue.requirement).toBe('1.2');
        expect(issue.severity).toBe('medium');
      });
    });
  });

  describe('verifyTypeExports', () => {
    it('should verify Props interfaces are exported from index', () => {
      const components = fileScanner.scanComponents();
      const indexPath = fileScanner.getIndexPath();
      const issues = analyzer.verifyTypeExports(components, indexPath);

      // Check structure of issues
      issues.forEach(issue => {
        expect(issue.category).toBe('TypeScript');
        expect(issue.requirement).toBe('1.3');
        expect(issue.title).toContain('not exported from index');
      });
    });
  });

  describe('checkTypeNamingConsistency', () => {
    it('should identify boolean props without standard prefixes', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.checkTypeNamingConsistency(components);

      // Check structure
      issues.forEach(issue => {
        expect(issue.category).toBe('TypeScript');
        expect(issue.requirement).toBe('1.4');
      });
    });
  });

  describe('verifyHTMLElementTypeExtensions', () => {
    it('should check components extending HTML attributes', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.verifyHTMLElementTypeExtensions(components);

      // GooeyButton extends ButtonHTMLAttributes, so should not have issues
      const gooeyButtonIssues = issues.filter(i => i.location.includes('GooeyButton'));
      expect(gooeyButtonIssues.length).toBe(0);

      // Check structure of any issues found
      issues.forEach(issue => {
        expect(issue.category).toBe('TypeScript');
        expect(issue.requirement).toBe('1.5');
        expect(issue.title).toContain('should extend React HTML attributes');
      });
    });
  });
});
