/**
 * Tests for ReportGenerator
 */

import { describe, it, expect } from 'vitest';
import { ReportGenerator } from './reportGenerator';
import { IssueCollector } from './issueCollector';

describe('ReportGenerator', () => {
  it('should create empty report with correct structure', () => {
    const report = ReportGenerator.createEmptyReport();
    
    expect(report).toHaveProperty('summary');
    expect(report).toHaveProperty('findings');
    expect(report).toHaveProperty('recommendations');
    expect(report).toHaveProperty('metrics');
    
    expect(report.summary.totalComponents).toBe(0);
    expect(report.summary.totalIssues).toBe(0);
    expect(report.findings).toHaveProperty('typeScript');
    expect(report.findings).toHaveProperty('componentAPI');
    expect(report.findings).toHaveProperty('testing');
  });

  it('should add issues to report', () => {
    const report = ReportGenerator.createEmptyReport();
    const collector = new IssueCollector();
    
    const issue = collector.createIssue({
      severity: 'high',
      category: 'TypeScript',
      requirement: '1.1',
      title: 'Missing interface',
      description: 'Component lacks interface definition',
      location: 'TestComponent.tsx',
      recommendation: 'Add interface definition',
      effort: 'low'
    });
    
    ReportGenerator.addIssue(report, 'typeScript', issue);
    
    expect(report.findings.typeScript.issues.length).toBe(1);
    expect(report.summary.totalIssues).toBe(1);
    expect(report.summary.issuesBySeverity.high).toBe(1);
  });

  it('should add passed checks to report', () => {
    const report = ReportGenerator.createEmptyReport();
    
    ReportGenerator.addPassedCheck(report, 'typeScript', 'All components have interfaces');
    
    expect(report.findings.typeScript.passedChecks.length).toBe(1);
    expect(report.findings.typeScript.passedChecks[0]).toBe('All components have interfaces');
  });

  it('should generate markdown report', () => {
    const report = ReportGenerator.createEmptyReport();
    report.summary.totalComponents = 10;
    
    const markdown = ReportGenerator.generateMarkdown(report);
    
    expect(markdown).toContain('# GhostUI Code Review Report');
    expect(markdown).toContain('## Executive Summary');
    expect(markdown).toContain('Total Components Reviewed');
    expect(markdown).toContain('## Findings by Category');
  });

  it('should update summary statistics', () => {
    const report = ReportGenerator.createEmptyReport();
    const collector = new IssueCollector();
    
    report.summary.totalComponents = 10;
    report.summary.testCoverage.componentsWithTests = 7;
    
    const issue1 = collector.createIssue({
      severity: 'high',
      category: 'TypeScript',
      requirement: '1.1',
      title: 'Issue 1',
      description: 'Description',
      location: 'Component1.tsx',
      recommendation: 'Fix it',
      effort: 'low'
    });
    
    const issue2 = collector.createIssue({
      severity: 'medium',
      category: 'Testing',
      requirement: '3.1',
      title: 'Issue 2',
      description: 'Description',
      location: 'Component2.tsx',
      recommendation: 'Fix it',
      effort: 'medium'
    });
    
    ReportGenerator.addIssue(report, 'typeScript', issue1);
    ReportGenerator.addIssue(report, 'testing', issue2);
    
    ReportGenerator.updateSummary(report);
    
    expect(report.summary.componentsWithIssues).toBe(2);
    expect(report.metrics.testCoveragePercentage).toBe(70);
  });
});
