/**
 * Unit tests for ReportGenerator
 *
 * Tests the report generation and export functionality
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ReportGenerator } from './ReportGenerator';
import {
  AuditResult,
  Report,
  ValidationCategory,
  ValidationSeverity,
} from './types';

describe('ReportGenerator', () => {
  let generator: ReportGenerator;
  let testOutputDir: string;

  beforeEach(() => {
    generator = new ReportGenerator();
    testOutputDir = join(__dirname, 'test-output');
  });

  afterEach(async () => {
    // Clean up test output directory
    try {
      await fs.rm(testOutputDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore errors if directory doesn't exist
    }
  });

  describe('generateReport', () => {
    it('should generate a complete report from audit results', () => {
      const auditResult: AuditResult = {
        totalPages: 2,
        pagesWithIssues: 1,
        totalIssues: 3,
        issuesByCategory: {
          typography: 2,
          spacing: 1,
          structure: 0,
          api: 0,
          examples: 0,
          preview: 0,
        },
        issuesBySeverity: {
          error: 1,
          warning: 2,
          info: 0,
        },
        pageResults: [
          {
            filePath: 'test/page1.tsx',
            componentName: 'test-component-1',
            issueCount: 3,
            score: 75,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'h1-typography',
                category: 'typography',
                severity: 'error',
                message: 'H1 missing required classes',
                filePath: 'test/page1.tsx',
                lineNumber: 10,
                expectedValue: 'text-3xl md:text-4xl',
                recommendation: 'Add required classes',
                autoFixable: true,
              },
              {
                ruleId: 'h2-typography',
                category: 'typography',
                severity: 'warning',
                message: 'H2 missing required classes',
                filePath: 'test/page1.tsx',
                lineNumber: 20,
                expectedValue: 'text-2xl md:text-3xl',
                recommendation: 'Add required classes',
                autoFixable: true,
              },
              {
                ruleId: 'page-spacing',
                category: 'spacing',
                severity: 'warning',
                message: 'Page container missing spacing',
                filePath: 'test/page1.tsx',
                lineNumber: 5,
                expectedValue: 'space-y-12',
                recommendation: 'Add spacing class',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page2.tsx',
            componentName: 'test-component-2',
            issueCount: 0,
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
      };

      const report = generator.generateReport(auditResult);

      expect(report).toBeDefined();
      expect(report.timestamp).toBeDefined();
      expect(report.summary).toBeDefined();
      expect(report.pageReports).toBeDefined();
      expect(report.recommendations).toBeDefined();
    });

    it('should generate correct summary statistics', () => {
      const auditResult: AuditResult = {
        totalPages: 3,
        pagesWithIssues: 2,
        totalIssues: 5,
        issuesByCategory: {
          typography: 3,
          spacing: 2,
          structure: 0,
          api: 0,
          examples: 0,
          preview: 0,
        },
        issuesBySeverity: {
          error: 2,
          warning: 3,
          info: 0,
        },
        pageResults: [
          {
            filePath: 'test/page1.tsx',
            componentName: 'test-component-1',
            issueCount: 3,
            score: 70,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'rule1',
                category: 'typography',
                severity: 'error',
                message: 'Error 1',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
              {
                ruleId: 'rule2',
                category: 'spacing',
                severity: 'warning',
                message: 'Warning 1',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: false,
              },
              {
                ruleId: 'rule3',
                category: 'typography',
                severity: 'warning',
                message: 'Warning 2',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page2.tsx',
            componentName: 'test-component-2',
            issueCount: 2,
            score: 85,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'rule4',
                category: 'typography',
                severity: 'error',
                message: 'Error 2',
                filePath: 'test/page2.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
              {
                ruleId: 'rule5',
                category: 'spacing',
                severity: 'warning',
                message: 'Warning 3',
                filePath: 'test/page2.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page3.tsx',
            componentName: 'test-component-3',
            issueCount: 0,
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
      };

      const report = generator.generateReport(auditResult);

      expect(report.summary.totalPages).toBe(3);
      expect(report.summary.compliantPages).toBe(1);
      expect(report.summary.pagesWithIssues).toBe(2);
      expect(report.summary.totalIssues).toBe(5);
      expect(report.summary.autoFixableIssues).toBe(4);
      expect(report.summary.averageScore).toBe(85); // (70 + 85 + 100) / 3 = 85
    });

    it('should generate page reports for all pages', () => {
      const auditResult: AuditResult = {
        totalPages: 2,
        pagesWithIssues: 1,
        totalIssues: 1,
        issuesByCategory: {
          typography: 1,
          spacing: 0,
          structure: 0,
          api: 0,
          examples: 0,
          preview: 0,
        },
        issuesBySeverity: {
          error: 1,
          warning: 0,
          info: 0,
        },
        pageResults: [
          {
            filePath: 'test/page1.tsx',
            componentName: 'component-1',
            issueCount: 1,
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'rule1',
                category: 'typography',
                severity: 'error',
                message: 'Issue 1',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page2.tsx',
            componentName: 'component-2',
            issueCount: 0,
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
      };

      const report = generator.generateReport(auditResult);

      expect(report.pageReports).toHaveLength(2);
      expect(report.pageReports[0].componentName).toBe('component-1');
      expect(report.pageReports[0].score).toBe(90);
      expect(report.pageReports[0].status).toBe('needs-review');
      expect(report.pageReports[1].componentName).toBe('component-2');
      expect(report.pageReports[1].score).toBe(100);
      expect(report.pageReports[1].status).toBe('compliant');
    });

    it('should generate recommendations sorted by priority', () => {
      const auditResult: AuditResult = {
        totalPages: 5,
        pagesWithIssues: 5,
        totalIssues: 15,
        issuesByCategory: {
          typography: 10,
          spacing: 5,
          structure: 0,
          api: 0,
          examples: 0,
          preview: 0,
        },
        issuesBySeverity: {
          error: 10,
          warning: 5,
          info: 0,
        },
        pageResults: [
          {
            filePath: 'test/page1.tsx',
            componentName: 'component-1',
            issueCount: 3,
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'high-priority-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error affecting many pages',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix immediately',
                autoFixable: false,
              },
              {
                ruleId: 'low-priority-rule',
                category: 'spacing',
                severity: 'info',
                message: 'Minor info issue',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix when convenient',
                autoFixable: true,
              },
              {
                ruleId: 'medium-priority-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning affecting some pages',
                filePath: 'test/page1.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix soon',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page2.tsx',
            componentName: 'component-2',
            issueCount: 3,
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'high-priority-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error affecting many pages',
                filePath: 'test/page2.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix immediately',
                autoFixable: false,
              },
              {
                ruleId: 'low-priority-rule',
                category: 'spacing',
                severity: 'info',
                message: 'Minor info issue',
                filePath: 'test/page2.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix when convenient',
                autoFixable: true,
              },
              {
                ruleId: 'medium-priority-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning affecting some pages',
                filePath: 'test/page2.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix soon',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page3.tsx',
            componentName: 'component-3',
            issueCount: 3,
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'high-priority-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error affecting many pages',
                filePath: 'test/page3.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix immediately',
                autoFixable: false,
              },
              {
                ruleId: 'low-priority-rule',
                category: 'spacing',
                severity: 'info',
                message: 'Minor info issue',
                filePath: 'test/page3.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix when convenient',
                autoFixable: true,
              },
              {
                ruleId: 'medium-priority-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning affecting some pages',
                filePath: 'test/page3.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix soon',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page4.tsx',
            componentName: 'component-4',
            issueCount: 3,
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'high-priority-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error affecting many pages',
                filePath: 'test/page4.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix immediately',
                autoFixable: false,
              },
              {
                ruleId: 'low-priority-rule',
                category: 'spacing',
                severity: 'info',
                message: 'Minor info issue',
                filePath: 'test/page4.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix when convenient',
                autoFixable: true,
              },
              {
                ruleId: 'medium-priority-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning affecting some pages',
                filePath: 'test/page4.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix soon',
                autoFixable: true,
              },
            ],
          },
          {
            filePath: 'test/page5.tsx',
            componentName: 'component-5',
            issueCount: 3,
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'high-priority-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error affecting many pages',
                filePath: 'test/page5.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix immediately',
                autoFixable: false,
              },
              {
                ruleId: 'low-priority-rule',
                category: 'spacing',
                severity: 'info',
                message: 'Minor info issue',
                filePath: 'test/page5.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix when convenient',
                autoFixable: true,
              },
              {
                ruleId: 'medium-priority-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning affecting some pages',
                filePath: 'test/page5.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix soon',
                autoFixable: true,
              },
            ],
          },
        ],
      };

      const report = generator.generateReport(auditResult);

      expect(report.recommendations).toHaveLength(3);
      // High priority should come first (error affecting 5 pages)
      expect(report.recommendations[0].priority).toBe('high');
      expect(report.recommendations[0].affectedPages).toHaveLength(5);
      // Medium priority should come second (warning affecting 5 pages)
      expect(report.recommendations[1].priority).toBe('high');
      // Low priority should come last (info issue)
      expect(report.recommendations[2].priority).toBe('low');
    });
  });

  describe('exportJSON', () => {
    it('should export report as JSON file', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 0,
          pagesWithIssues: 1,
          totalIssues: 1,
          autoFixableIssues: 1,
          issuesByCategory: {
            typography: 1,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 90,
        },
        pageReports: [
          {
            componentName: 'test-component',
            filePath: 'test/page.tsx',
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Test issue',
                filePath: 'test/page.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
        ],
        recommendations: [
          {
            priority: 'medium',
            category: 'typography',
            description: 'Test recommendation',
            affectedPages: ['test/page.tsx'],
            estimatedEffort: 'Low (auto-fixable)',
          },
        ],
      };

      const outputPath = join(testOutputDir, 'report.json');
      await generator.exportJSON(report, outputPath);

      // Verify file was created
      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);

      // Verify file content
      const fileContent = await fs.readFile(outputPath, 'utf-8');
      const parsedReport = JSON.parse(fileContent);

      expect(parsedReport.timestamp).toBe(report.timestamp);
      expect(parsedReport.summary.totalPages).toBe(1);
      expect(parsedReport.pageReports).toHaveLength(1);
      expect(parsedReport.recommendations).toHaveLength(1);
    });

    it('should create output directory if it does not exist', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 0,
          compliantPages: 0,
          pagesWithIssues: 0,
          totalIssues: 0,
          autoFixableIssues: 0,
          issuesByCategory: {
            typography: 0,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 0,
        },
        pageReports: [],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'nested', 'deep', 'report.json');
      await generator.exportJSON(report, outputPath);

      // Verify file was created in nested directory
      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);
    });

    it('should format JSON with proper indentation', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 1,
          pagesWithIssues: 0,
          totalIssues: 0,
          autoFixableIssues: 0,
          issuesByCategory: {
            typography: 0,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 100,
        },
        pageReports: [],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'formatted-report.json');
      await generator.exportJSON(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Verify JSON is formatted with 2-space indentation
      expect(fileContent).toContain('  "timestamp"');
      expect(fileContent).toContain('  "summary"');
      expect(fileContent).toContain('    "totalPages"');
    });
  });

  describe('exportMarkdown', () => {
    it('should export report as Markdown file', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 2,
          compliantPages: 1,
          pagesWithIssues: 1,
          totalIssues: 2,
          autoFixableIssues: 1,
          issuesByCategory: {
            typography: 1,
            spacing: 1,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 95,
        },
        pageReports: [
          {
            componentName: 'test-component-1',
            filePath: 'test/page1.tsx',
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule-1',
                category: 'typography',
                severity: 'warning',
                message: 'H1 missing required classes',
                filePath: 'test/page1.tsx',
                lineNumber: 10,
                expectedValue: 'text-3xl md:text-4xl',
                recommendation: 'Add required classes',
                autoFixable: true,
              },
              {
                ruleId: 'test-rule-2',
                category: 'spacing',
                severity: 'error',
                message: 'Page container missing spacing',
                filePath: 'test/page1.tsx',
                lineNumber: 5,
                expectedValue: 'space-y-12',
                recommendation: 'Add spacing class',
                autoFixable: false,
              },
            ],
          },
          {
            componentName: 'test-component-2',
            filePath: 'test/page2.tsx',
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
        recommendations: [
          {
            priority: 'high',
            category: 'spacing',
            description: 'Page container missing spacing (1 occurrence)',
            affectedPages: ['test/page1.tsx'],
            estimatedEffort: 'Medium (1 page)',
          },
          {
            priority: 'medium',
            category: 'typography',
            description: 'H1 missing required classes (1 occurrence)',
            affectedPages: ['test/page1.tsx'],
            estimatedEffort: 'Low (auto-fixable)',
          },
        ],
      };

      const outputPath = join(testOutputDir, 'report.md');
      await generator.exportMarkdown(report, outputPath);

      // Verify file was created
      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);

      // Verify file content
      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for main sections
      expect(fileContent).toContain('# Documentation Audit Report');
      expect(fileContent).toContain('## Summary');
      expect(fileContent).toContain('## Recommendations');
      expect(fileContent).toContain('## Page Reports');

      // Check for summary data
      expect(fileContent).toContain('Total Pages | 2');
      expect(fileContent).toContain('Compliant Pages | 1');
      expect(fileContent).toContain('Average Score | 95%');

      // Check for recommendations
      expect(fileContent).toContain('### 🔴 High Priority');
      expect(fileContent).toContain('### 🟡 Medium Priority');
      expect(fileContent).toContain('Page container missing spacing');

      // Check for page reports
      expect(fileContent).toContain('### ⚠️ Needs Review');
      expect(fileContent).toContain('### ✅ Compliant');
      expect(fileContent).toContain('test-component-1');
      expect(fileContent).toContain('test-component-2');
    });

    it('should format issues with line numbers', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 0,
          pagesWithIssues: 1,
          totalIssues: 1,
          autoFixableIssues: 0,
          issuesByCategory: {
            typography: 1,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 85,
        },
        pageReports: [
          {
            componentName: 'test-component',
            filePath: 'test/page.tsx',
            score: 85,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Test issue with line number',
                filePath: 'test/page.tsx',
                lineNumber: 42,
                expectedValue: 'expected-value',
                recommendation: 'Fix it',
                autoFixable: false,
              },
            ],
          },
        ],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-with-lines.md');
      await generator.exportMarkdown(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check that line number is included in the location
      expect(fileContent).toContain('`test/page.tsx:42`');
    });

    it('should group pages by status', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 3,
          compliantPages: 1,
          pagesWithIssues: 2,
          totalIssues: 5,
          autoFixableIssues: 2,
          issuesByCategory: {
            typography: 3,
            spacing: 2,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 80,
        },
        pageReports: [
          {
            componentName: 'needs-fixes-component',
            filePath: 'test/needs-fixes.tsx',
            score: 60,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'rule1',
                category: 'typography',
                severity: 'error',
                message: 'Critical error',
                filePath: 'test/needs-fixes.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: false,
              },
            ],
          },
          {
            componentName: 'needs-review-component',
            filePath: 'test/needs-review.tsx',
            score: 85,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'rule2',
                category: 'spacing',
                severity: 'warning',
                message: 'Minor warning',
                filePath: 'test/needs-review.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
          {
            componentName: 'compliant-component',
            filePath: 'test/compliant.tsx',
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-grouped.md');
      await generator.exportMarkdown(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check that pages are grouped by status
      expect(fileContent).toContain('### ❌ Needs Fixes');
      expect(fileContent).toContain('### ⚠️ Needs Review');
      expect(fileContent).toContain('### ✅ Compliant');

      // Check that components appear in the right sections
      const needsFixesIndex = fileContent.indexOf('### ❌ Needs Fixes');
      const needsReviewIndex = fileContent.indexOf('### ⚠️ Needs Review');
      const compliantIndex = fileContent.indexOf('### ✅ Compliant');

      const needsFixesComponentIndex = fileContent.indexOf('needs-fixes-component');
      const needsReviewComponentIndex = fileContent.indexOf('needs-review-component');
      const compliantComponentIndex = fileContent.indexOf('compliant-component');

      expect(needsFixesComponentIndex).toBeGreaterThan(needsFixesIndex);
      expect(needsFixesComponentIndex).toBeLessThan(needsReviewIndex);

      expect(needsReviewComponentIndex).toBeGreaterThan(needsReviewIndex);
      expect(needsReviewComponentIndex).toBeLessThan(compliantIndex);

      expect(compliantComponentIndex).toBeGreaterThan(compliantIndex);
    });

    it('should include tables for summary statistics', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 5,
          compliantPages: 2,
          pagesWithIssues: 3,
          totalIssues: 10,
          autoFixableIssues: 6,
          issuesByCategory: {
            typography: 4,
            spacing: 3,
            structure: 2,
            api: 1,
            examples: 0,
            preview: 0,
          },
          averageScore: 78,
        },
        pageReports: [],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-tables.md');
      await generator.exportMarkdown(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for table headers
      expect(fileContent).toContain('| Metric | Value |');
      expect(fileContent).toContain('|--------|-------|');

      // Check for category table
      expect(fileContent).toContain('### Issues by Category');
      expect(fileContent).toContain('| Category | Count |');
      expect(fileContent).toContain('| Typography | 4 |');
      expect(fileContent).toContain('| Spacing | 3 |');
      expect(fileContent).toContain('| Structure | 2 |');
      expect(fileContent).toContain('| Api | 1 |');
    });
  });

  describe('exportHTML', () => {
    it('should export report as HTML file', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 2,
          compliantPages: 1,
          pagesWithIssues: 1,
          totalIssues: 2,
          autoFixableIssues: 1,
          issuesByCategory: {
            typography: 1,
            spacing: 1,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 95,
        },
        pageReports: [
          {
            componentName: 'test-component-1',
            filePath: 'test/page1.tsx',
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule-1',
                category: 'typography',
                severity: 'warning',
                message: 'H1 missing required classes',
                filePath: 'test/page1.tsx',
                lineNumber: 10,
                expectedValue: 'text-3xl md:text-4xl',
                recommendation: 'Add required classes',
                autoFixable: true,
              },
            ],
          },
          {
            componentName: 'test-component-2',
            filePath: 'test/page2.tsx',
            score: 100,
            status: 'compliant',
            issues: [],
          },
        ],
        recommendations: [
          {
            priority: 'high',
            category: 'typography',
            description: 'H1 missing required classes (1 occurrence)',
            affectedPages: ['test/page1.tsx'],
            estimatedEffort: 'Low (auto-fixable)',
          },
        ],
      };

      const outputPath = join(testOutputDir, 'report.html');
      await generator.exportHTML(report, outputPath);

      // Verify file was created
      const fileExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);
      expect(fileExists).toBe(true);

      // Verify file content
      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for HTML structure
      expect(fileContent).toContain('<!DOCTYPE html>');
      expect(fileContent).toContain('<html lang="en">');
      expect(fileContent).toContain('</html>');

      // Check for title
      expect(fileContent).toContain('<title>Documentation Audit Report</title>');

      // Check for summary data
      expect(fileContent).toContain('Total Pages');
      expect(fileContent).toContain('Compliant');
      expect(fileContent).toContain('Average Score');

      // Check for recommendations
      expect(fileContent).toContain('Recommendations');
      expect(fileContent).toContain('H1 missing required classes');

      // Check for page reports
      expect(fileContent).toContain('Page Reports');
      expect(fileContent).toContain('test-component-1');
      expect(fileContent).toContain('test-component-2');
    });

    it('should include interactive filtering controls', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 0,
          pagesWithIssues: 1,
          totalIssues: 1,
          autoFixableIssues: 1,
          issuesByCategory: {
            typography: 1,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 90,
        },
        pageReports: [
          {
            componentName: 'test-component',
            filePath: 'test/page.tsx',
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Test issue',
                filePath: 'test/page.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
            ],
          },
        ],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-interactive.html');
      await generator.exportHTML(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for filter controls
      expect(fileContent).toContain('id="statusFilter"');
      expect(fileContent).toContain('id="categoryFilter"');
      expect(fileContent).toContain('id="searchInput"');

      // Check for filter options
      expect(fileContent).toContain('<option value="all">All</option>');
      expect(fileContent).toContain('<option value="needs-fixes">Needs Fixes</option>');
      expect(fileContent).toContain('<option value="typography">Typography</option>');

      // Check for JavaScript functionality
      expect(fileContent).toContain('function filterPages()');
      expect(fileContent).toContain('function resetFilters()');
    });

    it('should include CSS styling', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 0,
          compliantPages: 0,
          pagesWithIssues: 0,
          totalIssues: 0,
          autoFixableIssues: 0,
          issuesByCategory: {
            typography: 0,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 0,
        },
        pageReports: [],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-styled.html');
      await generator.exportHTML(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for style tag
      expect(fileContent).toContain('<style>');
      expect(fileContent).toContain('</style>');

      // Check for some key CSS classes
      expect(fileContent).toContain('.container');
      expect(fileContent).toContain('.summary');
      expect(fileContent).toContain('.page-card');
      expect(fileContent).toContain('.issue');
    });

    it('should escape HTML special characters in content', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 0,
          pagesWithIssues: 1,
          totalIssues: 1,
          autoFixableIssues: 0,
          issuesByCategory: {
            typography: 1,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 90,
        },
        pageReports: [
          {
            componentName: 'test-component',
            filePath: 'test/page.tsx',
            score: 90,
            status: 'needs-review',
            issues: [
              {
                ruleId: 'test-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Issue with <special> & "characters"',
                filePath: 'test/page.tsx',
                expectedValue: 'text-3xl & text-4xl',
                recommendation: 'Fix it',
                autoFixable: false,
              },
            ],
          },
        ],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-escaped.html');
      await generator.exportHTML(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check that special characters are escaped
      expect(fileContent).toContain('&lt;special&gt;');
      expect(fileContent).toContain('&amp;');
      expect(fileContent).toContain('&quot;');
    });

    it('should display severity badges for issues', async () => {
      const report: Report = {
        timestamp: '2024-01-01T00:00:00.000Z',
        summary: {
          totalPages: 1,
          compliantPages: 0,
          pagesWithIssues: 1,
          totalIssues: 3,
          autoFixableIssues: 1,
          issuesByCategory: {
            typography: 3,
            spacing: 0,
            structure: 0,
            api: 0,
            examples: 0,
            preview: 0,
          },
          averageScore: 70,
        },
        pageReports: [
          {
            componentName: 'test-component',
            filePath: 'test/page.tsx',
            score: 70,
            status: 'needs-fixes',
            issues: [
              {
                ruleId: 'error-rule',
                category: 'typography',
                severity: 'error',
                message: 'Critical error',
                filePath: 'test/page.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: false,
              },
              {
                ruleId: 'warning-rule',
                category: 'typography',
                severity: 'warning',
                message: 'Warning issue',
                filePath: 'test/page.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: true,
              },
              {
                ruleId: 'info-rule',
                category: 'typography',
                severity: 'info',
                message: 'Info issue',
                filePath: 'test/page.tsx',
                expectedValue: 'expected',
                recommendation: 'Fix it',
                autoFixable: false,
              },
            ],
          },
        ],
        recommendations: [],
      };

      const outputPath = join(testOutputDir, 'report-severities.html');
      await generator.exportHTML(report, outputPath);

      const fileContent = await fs.readFile(outputPath, 'utf-8');

      // Check for severity classes
      expect(fileContent).toContain('class="issue error"');
      expect(fileContent).toContain('class="issue warning"');
      expect(fileContent).toContain('class="issue info"');

      // Check for auto-fixable badges
      expect(fileContent).toContain('✓ Auto-fixable');
      expect(fileContent).toContain('⚠ Manual');
    });
  });
});
