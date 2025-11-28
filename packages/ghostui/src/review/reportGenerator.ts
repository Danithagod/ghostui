/**
 * Report generator for creating structured review reports
 */

import { ReviewReport, FindingsByCategory, Issue, Severity, CategoryFindings } from './types';

export class ReportGenerator {
  /**
   * Initialize an empty review report
   */
  static createEmptyReport(): ReviewReport {
    return {
      summary: {
        totalComponents: 0,
        componentsWithIssues: 0,
        totalIssues: 0,
        issuesBySeverity: {
          critical: 0,
          high: 0,
          medium: 0,
          low: 0
        },
        testCoverage: {
          componentsWithTests: 0,
          componentsWithoutTests: []
        }
      },
      findings: this.createEmptyFindings(),
      recommendations: [],
      metrics: {
        totalFiles: 0,
        totalLines: 0,
        averageComplexity: 0,
        testCoveragePercentage: 0
      }
    };
  }

  /**
   * Create empty findings structure
   */
  static createEmptyFindings(): FindingsByCategory {
    const emptyCategory: CategoryFindings = {
      issues: [],
      passedChecks: [],
      summary: ''
    };

    return {
      typeScript: { ...emptyCategory },
      componentAPI: { ...emptyCategory },
      testing: { ...emptyCategory },
      accessibility: { ...emptyCategory },
      codeStyle: { ...emptyCategory },
      performance: { ...emptyCategory },
      errorHandling: { ...emptyCategory },
      architecture: { ...emptyCategory },
      documentation: { ...emptyCategory },
      dependencies: { ...emptyCategory },
      animations: { ...emptyCategory },
      tooling: { ...emptyCategory }
    };
  }

  /**
   * Add an issue to the report
   */
  static addIssue(
    report: ReviewReport,
    category: keyof FindingsByCategory,
    issue: Issue
  ): void {
    report.findings[category].issues.push(issue);
    report.summary.totalIssues++;
    report.summary.issuesBySeverity[issue.severity]++;
  }

  /**
   * Add a passed check to the report
   */
  static addPassedCheck(
    report: ReviewReport,
    category: keyof FindingsByCategory,
    check: string
  ): void {
    report.findings[category].passedChecks.push(check);
  }

  /**
   * Generate markdown report
   */
  static generateMarkdown(report: ReviewReport): string {
    let markdown = '# GhostUI Code Review Report\n\n';

    // Executive Summary
    markdown += '## Executive Summary\n\n';
    markdown += `- **Total Components Reviewed**: ${report.summary.totalComponents}\n`;
    markdown += `- **Components with Issues**: ${report.summary.componentsWithIssues}\n`;
    markdown += `- **Total Issues Found**: ${report.summary.totalIssues}\n`;
    markdown += `  - Critical: ${report.summary.issuesBySeverity.critical}\n`;
    markdown += `  - High: ${report.summary.issuesBySeverity.high}\n`;
    markdown += `  - Medium: ${report.summary.issuesBySeverity.medium}\n`;
    markdown += `  - Low: ${report.summary.issuesBySeverity.low}\n`;
    markdown += `- **Test Coverage**: ${report.summary.testCoverage.componentsWithTests}/${report.summary.totalComponents} components have tests\n\n`;

    // Metrics
    markdown += '## Code Metrics\n\n';
    markdown += `- **Total Files**: ${report.metrics.totalFiles}\n`;
    markdown += `- **Total Lines of Code**: ${report.metrics.totalLines}\n`;
    markdown += `- **Test Coverage**: ${report.metrics.testCoveragePercentage.toFixed(1)}%\n\n`;

    // Findings by Category
    markdown += '## Findings by Category\n\n';

    const categories: Array<{ key: keyof FindingsByCategory; title: string }> = [
      { key: 'typeScript', title: 'TypeScript Type Definitions' },
      { key: 'componentAPI', title: 'Component API Consistency' },
      { key: 'testing', title: 'Testing Coverage' },
      { key: 'accessibility', title: 'Accessibility' },
      { key: 'codeStyle', title: 'Code Style and Organization' },
      { key: 'performance', title: 'Performance' },
      { key: 'errorHandling', title: 'Error Handling' },
      { key: 'architecture', title: 'Architecture' },
      { key: 'documentation', title: 'Documentation' },
      { key: 'dependencies', title: 'Dependencies' },
      { key: 'animations', title: 'Animation Consistency' },
      { key: 'tooling', title: 'Build and Tooling' }
    ];

    for (const { key, title } of categories) {
      const findings = report.findings[key];
      markdown += `### ${title}\n\n`;

      if (findings.summary) {
        markdown += `${findings.summary}\n\n`;
      }

      if (findings.issues.length > 0) {
        markdown += `**Issues Found**: ${findings.issues.length}\n\n`;
        
        for (const issue of findings.issues) {
          markdown += `#### ${issue.title}\n\n`;
          markdown += `- **Severity**: ${issue.severity}\n`;
          markdown += `- **Location**: ${issue.location}\n`;
          markdown += `- **Requirement**: ${issue.requirement}\n`;
          markdown += `- **Description**: ${issue.description}\n`;
          markdown += `- **Recommendation**: ${issue.recommendation}\n`;
          markdown += `- **Effort**: ${issue.effort}\n`;
          
          if (issue.codeSnippet) {
            markdown += `\n**Code Snippet**:\n\`\`\`typescript\n${issue.codeSnippet}\n\`\`\`\n`;
          }
          
          markdown += '\n';
        }
      } else {
        markdown += '✅ No issues found in this category.\n\n';
      }

      if (findings.passedChecks.length > 0) {
        markdown += `**Passed Checks** (${findings.passedChecks.length}):\n`;
        for (const check of findings.passedChecks) {
          markdown += `- ${check}\n`;
        }
        markdown += '\n';
      }
    }

    // Recommendations
    if (report.recommendations.length > 0) {
      markdown += '## Prioritized Recommendations\n\n';
      
      const highPriority = report.recommendations.filter(r => r.priority === 'high');
      const mediumPriority = report.recommendations.filter(r => r.priority === 'medium');
      const lowPriority = report.recommendations.filter(r => r.priority === 'low');

      if (highPriority.length > 0) {
        markdown += '### High Priority\n\n';
        for (const rec of highPriority) {
          markdown += `#### ${rec.title}\n\n`;
          markdown += `- **Category**: ${rec.category}\n`;
          markdown += `- **Description**: ${rec.description}\n`;
          markdown += `- **Impact**: ${rec.impact}\n`;
          markdown += `- **Effort**: ${rec.effort}\n\n`;
        }
      }

      if (mediumPriority.length > 0) {
        markdown += '### Medium Priority\n\n';
        for (const rec of mediumPriority) {
          markdown += `#### ${rec.title}\n\n`;
          markdown += `- **Category**: ${rec.category}\n`;
          markdown += `- **Description**: ${rec.description}\n`;
          markdown += `- **Impact**: ${rec.impact}\n`;
          markdown += `- **Effort**: ${rec.effort}\n\n`;
        }
      }

      if (lowPriority.length > 0) {
        markdown += '### Low Priority\n\n';
        for (const rec of lowPriority) {
          markdown += `#### ${rec.title}\n\n`;
          markdown += `- **Category**: ${rec.category}\n`;
          markdown += `- **Description**: ${rec.description}\n`;
          markdown += `- **Impact**: ${rec.impact}\n`;
          markdown += `- **Effort**: ${rec.effort}\n\n`;
        }
      }
    }

    return markdown;
  }

  /**
   * Update summary statistics
   */
  static updateSummary(report: ReviewReport): void {
    // Count components with issues
    const componentsWithIssues = new Set<string>();
    
    for (const category of Object.values(report.findings)) {
      for (const issue of category.issues) {
        componentsWithIssues.add(issue.location);
      }
    }

    report.summary.componentsWithIssues = componentsWithIssues.size;

    // Update test coverage percentage
    if (report.summary.totalComponents > 0) {
      report.metrics.testCoveragePercentage = 
        (report.summary.testCoverage.componentsWithTests / report.summary.totalComponents) * 100;
    }
  }
}
