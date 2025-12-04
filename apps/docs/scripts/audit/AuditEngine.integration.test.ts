/**
 * AuditEngine Integration Tests
 *
 * Integration tests for the AuditEngine that test the complete audit workflow
 * with real component pages.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

import { describe, it, expect } from 'vitest';
import { AuditEngine } from './AuditEngine';
import { FileScanner } from './FileScanner';

describe('AuditEngine Integration', () => {
  it('should audit real component pages from the docs app', async () => {
    const scanner = new FileScanner('.');
    const engine = new AuditEngine();

    // Scan actual component pages
    const pages = await scanner.scanComponentPages();

    // Should find some pages
    expect(pages.length).toBeGreaterThan(0);

    // Audit all pages
    const result = await engine.audit(pages);

    // Verify result structure
    expect(result).toBeDefined();
    expect(result.totalPages).toBe(pages.length);
    expect(result.pageResults).toHaveLength(pages.length);

    // Verify each page result has required properties
    result.pageResults.forEach((pageResult) => {
      expect(pageResult.filePath).toBeDefined();
      expect(pageResult.componentName).toBeDefined();
      expect(pageResult.issueCount).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(pageResult.issues)).toBe(true);
      expect(pageResult.score).toBeGreaterThanOrEqual(0);
      expect(pageResult.score).toBeLessThanOrEqual(100);
      expect(['compliant', 'needs-review', 'needs-fixes']).toContain(pageResult.status);
    });

    // Verify summary statistics
    expect(result.totalIssues).toBeGreaterThanOrEqual(0);
    expect(result.pagesWithIssues).toBeGreaterThanOrEqual(0);
    expect(result.pagesWithIssues).toBeLessThanOrEqual(result.totalPages);

    // Verify issue categorization
    expect(result.issuesByCategory).toBeDefined();
    expect(result.issuesBySeverity).toBeDefined();

    // Log summary for visibility
    console.log('\n=== Audit Summary ===');
    console.log(`Total Pages: ${result.totalPages}`);
    console.log(`Pages with Issues: ${result.pagesWithIssues}`);
    console.log(`Total Issues: ${result.totalIssues}`);
    console.log('\nIssues by Category:');
    Object.entries(result.issuesByCategory).forEach(([category, count]) => {
      if (count > 0) {
        console.log(`  ${category}: ${count}`);
      }
    });
    console.log('\nIssues by Severity:');
    Object.entries(result.issuesBySeverity).forEach(([severity, count]) => {
      if (count > 0) {
        console.log(`  ${severity}: ${count}`);
      }
    });
  });

  it('should identify pages with high compliance scores', async () => {
    const scanner = new FileScanner('.');
    const engine = new AuditEngine();

    const pages = await scanner.scanComponentPages();
    const result = await engine.audit(pages);

    // Find pages with high scores
    const highScorePages = result.pageResults.filter((p) => p.score >= 80);

    // Log high-scoring pages
    if (highScorePages.length > 0) {
      console.log('\n=== High Compliance Pages (Score >= 80) ===');
      highScorePages.forEach((page) => {
        console.log(`${page.componentName}: ${page.score} (${page.issueCount} issues)`);
      });
    }
  });

  it('should identify pages needing fixes', async () => {
    const scanner = new FileScanner('.');
    const engine = new AuditEngine();

    const pages = await scanner.scanComponentPages();
    const result = await engine.audit(pages);

    // Find pages that need fixes
    const needsFixesPages = result.pageResults.filter((p) => p.status === 'needs-fixes');

    // Log pages needing fixes
    if (needsFixesPages.length > 0) {
      console.log('\n=== Pages Needing Fixes ===');
      needsFixesPages.forEach((page) => {
        console.log(`${page.componentName}: ${page.score} (${page.issueCount} issues)`);
      });
    }
  });

  it('should categorize issues by type', async () => {
    const scanner = new FileScanner('.');
    const engine = new AuditEngine();

    const pages = await scanner.scanComponentPages();
    const result = await engine.audit(pages);

    // Verify that issues are properly categorized
    const totalCategorizedIssues = Object.values(result.issuesByCategory).reduce(
      (sum, count) => sum + count,
      0
    );

    expect(totalCategorizedIssues).toBe(result.totalIssues);
  });

  it('should handle pages with different structures', async () => {
    const scanner = new FileScanner('.');
    const engine = new AuditEngine();

    const pages = await scanner.scanComponentPages();

    // Audit a subset of pages with different structures
    const samplePages = pages.slice(0, 5);
    const result = await engine.audit(samplePages);

    // Each page should have a result
    expect(result.pageResults).toHaveLength(samplePages.length);

    // All pages should have valid scores
    result.pageResults.forEach((pageResult) => {
      expect(pageResult.score).toBeGreaterThanOrEqual(0);
      expect(pageResult.score).toBeLessThanOrEqual(100);
    });
  });
});
