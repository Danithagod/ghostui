/**
 * Tests for IssueCollector
 */

import { describe, it, expect } from 'vitest';
import { IssueCollector } from './issueCollector';

describe('IssueCollector', () => {
  it('should create issues with unique IDs', () => {
    const collector = new IssueCollector();
    
    const issue1 = collector.createIssue({
      severity: 'high',
      category: 'TypeScript',
      requirement: '1.1',
      title: 'Issue 1',
      description: 'Description 1',
      location: 'Component1.tsx',
      recommendation: 'Fix it',
      effort: 'low'
    });
    
    const issue2 = collector.createIssue({
      severity: 'medium',
      category: 'Testing',
      requirement: '3.1',
      title: 'Issue 2',
      description: 'Description 2',
      location: 'Component2.tsx',
      recommendation: 'Fix it',
      effort: 'medium'
    });
    
    expect(issue1.id).toBe('ISSUE-0001');
    expect(issue2.id).toBe('ISSUE-0002');
    expect(issue1.id).not.toBe(issue2.id);
  });

  it('should sort issues by severity', () => {
    const collector = new IssueCollector();
    
    const issues = [
      collector.createIssue({
        severity: 'low',
        category: 'Test',
        requirement: '1.1',
        title: 'Low',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'critical',
        category: 'Test',
        requirement: '1.1',
        title: 'Critical',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'high'
      }),
      collector.createIssue({
        severity: 'medium',
        category: 'Test',
        requirement: '1.1',
        title: 'Medium',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'medium'
      })
    ];
    
    const sorted = collector.sortBySeverity(issues);
    
    expect(sorted[0].severity).toBe('critical');
    expect(sorted[1].severity).toBe('medium');
    expect(sorted[2].severity).toBe('low');
  });

  it('should group issues by location', () => {
    const collector = new IssueCollector();
    
    const issues = [
      collector.createIssue({
        severity: 'high',
        category: 'Test',
        requirement: '1.1',
        title: 'Issue 1',
        description: 'Desc',
        location: 'Component1.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'medium',
        category: 'Test',
        requirement: '1.1',
        title: 'Issue 2',
        description: 'Desc',
        location: 'Component1.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'low',
        category: 'Test',
        requirement: '1.1',
        title: 'Issue 3',
        description: 'Desc',
        location: 'Component2.tsx',
        recommendation: 'Fix',
        effort: 'low'
      })
    ];
    
    const grouped = collector.groupByLocation(issues);
    
    expect(grouped.size).toBe(2);
    expect(grouped.get('Component1.tsx')?.length).toBe(2);
    expect(grouped.get('Component2.tsx')?.length).toBe(1);
  });

  it('should filter issues by severity', () => {
    const collector = new IssueCollector();
    
    const issues = [
      collector.createIssue({
        severity: 'high',
        category: 'Test',
        requirement: '1.1',
        title: 'High',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'low',
        category: 'Test',
        requirement: '1.1',
        title: 'Low',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      })
    ];
    
    const highIssues = collector.filterBySeverity(issues, 'high');
    
    expect(highIssues.length).toBe(1);
    expect(highIssues[0].severity).toBe('high');
  });

  it('should get issue statistics', () => {
    const collector = new IssueCollector();
    
    const issues = [
      collector.createIssue({
        severity: 'high',
        category: 'TypeScript',
        requirement: '1.1',
        title: 'Issue 1',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'high',
        category: 'Testing',
        requirement: '3.1',
        title: 'Issue 2',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      }),
      collector.createIssue({
        severity: 'low',
        category: 'TypeScript',
        requirement: '1.2',
        title: 'Issue 3',
        description: 'Desc',
        location: 'File.tsx',
        recommendation: 'Fix',
        effort: 'low'
      })
    ];
    
    const stats = collector.getStatistics(issues);
    
    expect(stats.total).toBe(3);
    expect(stats.bySeverity.high).toBe(2);
    expect(stats.bySeverity.low).toBe(1);
    expect(stats.byCategory.TypeScript).toBe(2);
    expect(stats.byCategory.Testing).toBe(1);
  });
});
