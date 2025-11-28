/**
 * Issue collector for managing and organizing review findings
 */

import { Issue, Severity, Effort } from './types';

export class IssueCollector {
  private issueCounter = 0;

  /**
   * Create a new issue
   */
  createIssue(params: {
    severity: Severity;
    category: string;
    requirement: string;
    title: string;
    description: string;
    location: string;
    codeSnippet?: string;
    recommendation: string;
    effort: Effort;
  }): Issue {
    this.issueCounter++;
    
    return {
      id: `ISSUE-${this.issueCounter.toString().padStart(4, '0')}`,
      ...params
    };
  }

  /**
   * Sort issues by severity
   */
  sortBySeverity(issues: Issue[]): Issue[] {
    const severityOrder: Record<Severity, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3
    };

    return [...issues].sort((a, b) => {
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
  }

  /**
   * Group issues by location
   */
  groupByLocation(issues: Issue[]): Map<string, Issue[]> {
    const grouped = new Map<string, Issue[]>();

    for (const issue of issues) {
      const existing = grouped.get(issue.location) || [];
      existing.push(issue);
      grouped.set(issue.location, existing);
    }

    return grouped;
  }

  /**
   * Filter issues by severity
   */
  filterBySeverity(issues: Issue[], severity: Severity): Issue[] {
    return issues.filter(issue => issue.severity === severity);
  }

  /**
   * Filter issues by category
   */
  filterByCategory(issues: Issue[], category: string): Issue[] {
    return issues.filter(issue => issue.category === category);
  }

  /**
   * Get issue statistics
   */
  getStatistics(issues: Issue[]): {
    total: number;
    bySeverity: Record<Severity, number>;
    byCategory: Record<string, number>;
  } {
    const stats = {
      total: issues.length,
      bySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      } as Record<Severity, number>,
      byCategory: {} as Record<string, number>
    };

    for (const issue of issues) {
      stats.bySeverity[issue.severity]++;
      stats.byCategory[issue.category] = (stats.byCategory[issue.category] || 0) + 1;
    }

    return stats;
  }
}
