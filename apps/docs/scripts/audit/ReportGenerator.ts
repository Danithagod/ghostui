/**
 * Report Generator for Documentation Audit Tool
 *
 * Generates comprehensive reports from audit results in multiple formats:
 * - JSON: Machine-readable format for programmatic processing
 * - Markdown: Human-readable format for documentation
 * - HTML: Interactive format with filtering and sorting
 *
 * Requirements: 8.1, 8.2, 8.3, 8.4
 */

import { promises as fs } from 'fs';
import { dirname } from 'path';
import {
  AuditResult,
  Report,
  ReportSummary,
  PageReport,
  Recommendation,
  ValidationCategory,
  ValidationIssue,
} from './types';

/**
 * ReportGenerator class for creating audit reports in various formats
 */
export class ReportGenerator {
  /**
   * Generates a complete report from audit results
   * @param auditResult - The audit result to generate a report from
   * @returns Complete report with summary, page reports, and recommendations
   */
  generateReport(auditResult: AuditResult): Report {
    const timestamp = new Date().toISOString();
    const summary = this.generateSummary(auditResult);
    const pageReports = this.generatePageReports(auditResult);
    const recommendations = this.generateRecommendations(auditResult);

    return {
      timestamp,
      summary,
      pageReports,
      recommendations,
    };
  }

  /**
   * Generates the summary section of the report
   * @param auditResult - The audit result
   * @returns Report summary with statistics
   */
  private generateSummary(auditResult: AuditResult): ReportSummary {
    const compliantPages = auditResult.pageResults.filter(
      (p) => p.status === 'compliant'
    ).length;

    const autoFixableIssues = auditResult.pageResults.reduce((count, page) => {
      return count + page.issues.filter((issue) => issue.autoFixable).length;
    }, 0);

    const totalScore = auditResult.pageResults.reduce(
      (sum, page) => sum + page.score,
      0
    );
    const averageScore =
      auditResult.totalPages > 0
        ? Math.round(totalScore / auditResult.totalPages)
        : 0;

    return {
      totalPages: auditResult.totalPages,
      compliantPages,
      pagesWithIssues: auditResult.pagesWithIssues,
      totalIssues: auditResult.totalIssues,
      autoFixableIssues,
      issuesByCategory: auditResult.issuesByCategory,
      averageScore,
    };
  }

  /**
   * Generates individual page reports
   * @param auditResult - The audit result
   * @returns Array of page reports
   */
  private generatePageReports(auditResult: AuditResult): PageReport[] {
    return auditResult.pageResults.map((pageResult) => ({
      componentName: pageResult.componentName,
      filePath: pageResult.filePath,
      score: pageResult.score,
      issues: pageResult.issues,
      status: pageResult.status,
    }));
  }

  /**
   * Generates prioritized recommendations based on audit results
   * @param auditResult - The audit result
   * @returns Array of recommendations
   */
  private generateRecommendations(auditResult: AuditResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Group issues by category and rule
    const issuesByRule = new Map<string, ValidationIssue[]>();
    
    for (const pageResult of auditResult.pageResults) {
      for (const issue of pageResult.issues) {
        const existing = issuesByRule.get(issue.ruleId) || [];
        existing.push(issue);
        issuesByRule.set(issue.ruleId, existing);
      }
    }

    // Generate recommendations for each rule with issues
    for (const [ruleId, issues] of issuesByRule.entries()) {
      if (issues.length === 0) continue;

      const firstIssue = issues[0];
      const affectedPages = [
        ...new Set(issues.map((issue) => issue.filePath)),
      ];

      // Determine priority based on severity and number of affected pages
      const priority = this.determinePriority(
        firstIssue.severity,
        affectedPages.length,
        firstIssue.autoFixable
      );

      // Estimate effort based on auto-fixability and number of pages
      const estimatedEffort = this.estimateEffort(
        firstIssue.autoFixable,
        affectedPages.length
      );

      recommendations.push({
        priority,
        category: firstIssue.category,
        description: `${firstIssue.message} (${issues.length} occurrence${issues.length > 1 ? 's' : ''})`,
        affectedPages,
        estimatedEffort,
      });
    }

    // Sort recommendations by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    recommendations.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    return recommendations;
  }

  /**
   * Determines the priority of a recommendation
   * @param severity - Issue severity
   * @param affectedPageCount - Number of pages affected
   * @param autoFixable - Whether the issue is auto-fixable
   * @returns Priority level
   */
  private determinePriority(
    severity: 'error' | 'warning' | 'info',
    affectedPageCount: number,
    autoFixable: boolean
  ): 'high' | 'medium' | 'low' {
    // High priority: errors affecting multiple pages
    if (severity === 'error' && affectedPageCount >= 3) {
      return 'high';
    }

    // High priority: warnings affecting many pages
    if (severity === 'warning' && affectedPageCount >= 5) {
      return 'high';
    }

    // Medium priority: errors affecting few pages or warnings affecting some pages
    if (severity === 'error' || (severity === 'warning' && affectedPageCount >= 2)) {
      return 'medium';
    }

    // Low priority: info issues or single-page warnings
    return 'low';
  }

  /**
   * Estimates the effort required to fix an issue
   * @param autoFixable - Whether the issue is auto-fixable
   * @param affectedPageCount - Number of pages affected
   * @returns Estimated effort description
   */
  private estimateEffort(
    autoFixable: boolean,
    affectedPageCount: number
  ): string {
    if (autoFixable) {
      return 'Low (auto-fixable)';
    }

    if (affectedPageCount === 1) {
      return 'Low (1 page)';
    }

    if (affectedPageCount <= 3) {
      return 'Medium (2-3 pages)';
    }

    if (affectedPageCount <= 10) {
      return `Medium (${affectedPageCount} pages)`;
    }

    return `High (${affectedPageCount} pages)`;
  }

  /**
   * Exports the report as JSON
   * @param report - The report to export
   * @param outputPath - Path where the JSON file should be written
   */
  async exportJSON(report: Report, outputPath: string): Promise<void> {
    // Ensure the output directory exists
    await this.ensureDirectoryExists(outputPath);

    // Convert report to formatted JSON
    const jsonContent = JSON.stringify(report, null, 2);

    // Write to file
    await fs.writeFile(outputPath, jsonContent, 'utf-8');
  }

  /**
   * Exports the report as Markdown
   * @param report - The report to export
   * @param outputPath - Path where the Markdown file should be written
   */
  async exportMarkdown(report: Report, outputPath: string): Promise<void> {
    // Ensure the output directory exists
    await this.ensureDirectoryExists(outputPath);

    // Generate Markdown content
    const markdown = this.generateMarkdownContent(report);

    // Write to file
    await fs.writeFile(outputPath, markdown, 'utf-8');
  }

  /**
   * Generates Markdown content from a report
   * @param report - The report to convert to Markdown
   * @returns Markdown-formatted string
   */
  private generateMarkdownContent(report: Report): string {
    const lines: string[] = [];

    // Title and timestamp
    lines.push('# Documentation Audit Report');
    lines.push('');
    lines.push(`**Generated:** ${new Date(report.timestamp).toLocaleString()}`);
    lines.push('');
    lines.push('---');
    lines.push('');

    // Summary section
    lines.push('## Summary');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push(`| Total Pages | ${report.summary.totalPages} |`);
    lines.push(`| Compliant Pages | ${report.summary.compliantPages} |`);
    lines.push(`| Pages with Issues | ${report.summary.pagesWithIssues} |`);
    lines.push(`| Total Issues | ${report.summary.totalIssues} |`);
    lines.push(`| Auto-fixable Issues | ${report.summary.autoFixableIssues} |`);
    lines.push(`| Average Score | ${report.summary.averageScore}% |`);
    lines.push('');

    // Issues by category
    lines.push('### Issues by Category');
    lines.push('');
    lines.push('| Category | Count |');
    lines.push('|----------|-------|');
    for (const [category, count] of Object.entries(report.summary.issuesByCategory)) {
      if (count > 0) {
        lines.push(`| ${this.capitalizeCategory(category)} | ${count} |`);
      }
    }
    lines.push('');

    // Recommendations section
    if (report.recommendations.length > 0) {
      lines.push('---');
      lines.push('');
      lines.push('## Recommendations');
      lines.push('');

      // Group recommendations by priority
      const highPriority = report.recommendations.filter((r) => r.priority === 'high');
      const mediumPriority = report.recommendations.filter((r) => r.priority === 'medium');
      const lowPriority = report.recommendations.filter((r) => r.priority === 'low');

      if (highPriority.length > 0) {
        lines.push('### 🔴 High Priority');
        lines.push('');
        highPriority.forEach((rec, index) => {
          lines.push(`${index + 1}. **${rec.description}**`);
          lines.push(`   - **Category:** ${this.capitalizeCategory(rec.category)}`);
          lines.push(`   - **Effort:** ${rec.estimatedEffort}`);
          lines.push(`   - **Affected Pages:** ${rec.affectedPages.length}`);
          lines.push('');
        });
      }

      if (mediumPriority.length > 0) {
        lines.push('### 🟡 Medium Priority');
        lines.push('');
        mediumPriority.forEach((rec, index) => {
          lines.push(`${index + 1}. **${rec.description}**`);
          lines.push(`   - **Category:** ${this.capitalizeCategory(rec.category)}`);
          lines.push(`   - **Effort:** ${rec.estimatedEffort}`);
          lines.push(`   - **Affected Pages:** ${rec.affectedPages.length}`);
          lines.push('');
        });
      }

      if (lowPriority.length > 0) {
        lines.push('### 🟢 Low Priority');
        lines.push('');
        lowPriority.forEach((rec, index) => {
          lines.push(`${index + 1}. **${rec.description}**`);
          lines.push(`   - **Category:** ${this.capitalizeCategory(rec.category)}`);
          lines.push(`   - **Effort:** ${rec.estimatedEffort}`);
          lines.push(`   - **Affected Pages:** ${rec.affectedPages.length}`);
          lines.push('');
        });
      }
    }

    // Page reports section
    lines.push('---');
    lines.push('');
    lines.push('## Page Reports');
    lines.push('');

    // Group pages by status
    const compliantPages = report.pageReports.filter((p) => p.status === 'compliant');
    const needsReviewPages = report.pageReports.filter((p) => p.status === 'needs-review');
    const needsFixesPages = report.pageReports.filter((p) => p.status === 'needs-fixes');

    if (needsFixesPages.length > 0) {
      lines.push('### ❌ Needs Fixes');
      lines.push('');
      needsFixesPages.forEach((page) => {
        lines.push(`#### ${page.componentName}`);
        lines.push('');
        lines.push(`- **File:** \`${page.filePath}\``);
        lines.push(`- **Score:** ${page.score}%`);
        lines.push(`- **Issues:** ${page.issues.length}`);
        lines.push('');

        if (page.issues.length > 0) {
          lines.push('**Issues:**');
          lines.push('');
          page.issues.forEach((issue, index) => {
            const lineRef = issue.lineNumber ? `:${issue.lineNumber}` : '';
            lines.push(`${index + 1}. **[${issue.severity.toUpperCase()}]** ${issue.message}`);
            lines.push(`   - **Location:** \`${issue.filePath}${lineRef}\``);
            lines.push(`   - **Expected:** \`${issue.expectedValue}\``);
            lines.push(`   - **Auto-fixable:** ${issue.autoFixable ? '✅ Yes' : '❌ No'}`);
            lines.push('');
          });
        }
      });
    }

    if (needsReviewPages.length > 0) {
      lines.push('### ⚠️ Needs Review');
      lines.push('');
      needsReviewPages.forEach((page) => {
        lines.push(`#### ${page.componentName}`);
        lines.push('');
        lines.push(`- **File:** \`${page.filePath}\``);
        lines.push(`- **Score:** ${page.score}%`);
        lines.push(`- **Issues:** ${page.issues.length}`);
        lines.push('');

        if (page.issues.length > 0) {
          lines.push('**Issues:**');
          lines.push('');
          page.issues.forEach((issue, index) => {
            const lineRef = issue.lineNumber ? `:${issue.lineNumber}` : '';
            lines.push(`${index + 1}. **[${issue.severity.toUpperCase()}]** ${issue.message}`);
            lines.push(`   - **Location:** \`${issue.filePath}${lineRef}\``);
            lines.push(`   - **Expected:** \`${issue.expectedValue}\``);
            lines.push(`   - **Auto-fixable:** ${issue.autoFixable ? '✅ Yes' : '❌ No'}`);
            lines.push('');
          });
        }
      });
    }

    if (compliantPages.length > 0) {
      lines.push('### ✅ Compliant');
      lines.push('');
      compliantPages.forEach((page) => {
        lines.push(`- **${page.componentName}** (\`${page.filePath}\`) - Score: ${page.score}%`);
      });
      lines.push('');
    }

    return lines.join('\n');
  }

  /**
   * Exports the report as HTML
   * @param report - The report to export
   * @param outputPath - Path where the HTML file should be written
   */
  async exportHTML(report: Report, outputPath: string): Promise<void> {
    // Ensure the output directory exists
    await this.ensureDirectoryExists(outputPath);

    // Generate HTML content
    const html = this.generateHTMLContent(report);

    // Write to file
    await fs.writeFile(outputPath, html, 'utf-8');
  }

  /**
   * Generates HTML content from a report
   * @param report - The report to convert to HTML
   * @returns HTML-formatted string
   */
  private generateHTMLContent(report: Report): string {
    const timestamp = new Date(report.timestamp).toLocaleString();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation Audit Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
    }

    header h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    header .timestamp {
      opacity: 0.9;
      font-size: 0.9rem;
    }

    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .summary-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .summary-card .label {
      font-size: 0.85rem;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .summary-card .value {
      font-size: 2rem;
      font-weight: bold;
      color: #1f2937;
    }

    .summary-card.score .value {
      color: #10b981;
    }

    .controls {
      padding: 20px 30px;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      align-items: center;
    }

    .controls label {
      font-weight: 500;
      margin-right: 5px;
    }

    .controls select,
    .controls input {
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .controls button {
      padding: 8px 16px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .controls button:hover {
      background: #5568d3;
    }

    .content {
      padding: 30px;
    }

    .section {
      margin-bottom: 40px;
    }

    .section h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
      color: #1f2937;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }

    .recommendations {
      display: grid;
      gap: 15px;
    }

    .recommendation {
      padding: 15px;
      border-left: 4px solid;
      border-radius: 4px;
      background: #f9fafb;
    }

    .recommendation.high {
      border-color: #ef4444;
      background: #fef2f2;
    }

    .recommendation.medium {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .recommendation.low {
      border-color: #10b981;
      background: #f0fdf4;
    }

    .recommendation .priority {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .recommendation.high .priority {
      background: #ef4444;
      color: white;
    }

    .recommendation.medium .priority {
      background: #f59e0b;
      color: white;
    }

    .recommendation.low .priority {
      background: #10b981;
      color: white;
    }

    .recommendation .description {
      font-weight: 500;
      margin-bottom: 8px;
    }

    .recommendation .meta {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .page-reports {
      display: grid;
      gap: 20px;
    }

    .page-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }

    .page-card.hidden {
      display: none;
    }

    .page-header {
      padding: 15px 20px;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    .page-header:hover {
      background: #f3f4f6;
    }

    .page-header .title {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .page-header .status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .page-header .status.compliant {
      background: #d1fae5;
      color: #065f46;
    }

    .page-header .status.needs-review {
      background: #fef3c7;
      color: #92400e;
    }

    .page-header .status.needs-fixes {
      background: #fee2e2;
      color: #991b1b;
    }

    .page-details {
      padding: 20px;
    }

    .page-details .meta {
      display: flex;
      gap: 20px;
      margin-bottom: 15px;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .page-details .meta strong {
      color: #1f2937;
    }

    .issues {
      display: grid;
      gap: 10px;
    }

    .issue {
      padding: 12px;
      border-left: 3px solid;
      border-radius: 4px;
      background: #f9fafb;
    }

    .issue.error {
      border-color: #ef4444;
      background: #fef2f2;
    }

    .issue.warning {
      border-color: #f59e0b;
      background: #fffbeb;
    }

    .issue.info {
      border-color: #3b82f6;
      background: #eff6ff;
    }

    .issue .severity {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-right: 8px;
    }

    .issue.error .severity {
      background: #ef4444;
      color: white;
    }

    .issue.warning .severity {
      background: #f59e0b;
      color: white;
    }

    .issue.info .severity {
      background: #3b82f6;
      color: white;
    }

    .issue .message {
      font-weight: 500;
      margin-bottom: 6px;
    }

    .issue .details {
      font-size: 0.85rem;
      color: #6b7280;
      margin-top: 6px;
    }

    .issue .details code {
      background: #e5e7eb;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.85em;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-left: 8px;
    }

    .badge.auto-fixable {
      background: #d1fae5;
      color: #065f46;
    }

    .badge.manual {
      background: #fee2e2;
      color: #991b1b;
    }

    .no-issues {
      text-align: center;
      padding: 40px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📋 Documentation Audit Report</h1>
      <div class="timestamp">Generated: ${timestamp}</div>
    </header>

    <div class="summary">
      <div class="summary-card">
        <div class="label">Total Pages</div>
        <div class="value">${report.summary.totalPages}</div>
      </div>
      <div class="summary-card">
        <div class="label">Compliant</div>
        <div class="value">${report.summary.compliantPages}</div>
      </div>
      <div class="summary-card">
        <div class="label">With Issues</div>
        <div class="value">${report.summary.pagesWithIssues}</div>
      </div>
      <div class="summary-card">
        <div class="label">Total Issues</div>
        <div class="value">${report.summary.totalIssues}</div>
      </div>
      <div class="summary-card">
        <div class="label">Auto-fixable</div>
        <div class="value">${report.summary.autoFixableIssues}</div>
      </div>
      <div class="summary-card score">
        <div class="label">Average Score</div>
        <div class="value">${report.summary.averageScore}%</div>
      </div>
    </div>

    <div class="controls">
      <div>
        <label for="statusFilter">Status:</label>
        <select id="statusFilter">
          <option value="all">All</option>
          <option value="needs-fixes">Needs Fixes</option>
          <option value="needs-review">Needs Review</option>
          <option value="compliant">Compliant</option>
        </select>
      </div>
      <div>
        <label for="categoryFilter">Category:</label>
        <select id="categoryFilter">
          <option value="all">All</option>
          <option value="typography">Typography</option>
          <option value="spacing">Spacing</option>
          <option value="structure">Structure</option>
          <option value="api">API</option>
          <option value="examples">Examples</option>
          <option value="preview">Preview</option>
        </select>
      </div>
      <div>
        <label for="searchInput">Search:</label>
        <input type="text" id="searchInput" placeholder="Search pages...">
      </div>
      <button onclick="resetFilters()">Reset Filters</button>
    </div>

    <div class="content">
      ${report.recommendations.length > 0 ? this.generateRecommendationsHTML(report.recommendations) : ''}
      ${this.generatePageReportsHTML(report.pageReports)}
    </div>
  </div>

  <script>
    const pages = ${JSON.stringify(report.pageReports)};

    function filterPages() {
      const statusFilter = document.getElementById('statusFilter').value;
      const categoryFilter = document.getElementById('categoryFilter').value;
      const searchText = document.getElementById('searchInput').value.toLowerCase();

      document.querySelectorAll('.page-card').forEach((card, index) => {
        const page = pages[index];
        let show = true;

        // Status filter
        if (statusFilter !== 'all' && page.status !== statusFilter) {
          show = false;
        }

        // Category filter
        if (categoryFilter !== 'all') {
          const hasCategory = page.issues.some(issue => issue.category === categoryFilter);
          if (!hasCategory) {
            show = false;
          }
        }

        // Search filter
        if (searchText) {
          const matchesSearch = 
            page.componentName.toLowerCase().includes(searchText) ||
            page.filePath.toLowerCase().includes(searchText) ||
            page.issues.some(issue => issue.message.toLowerCase().includes(searchText));
          if (!matchesSearch) {
            show = false;
          }
        }

        card.classList.toggle('hidden', !show);
      });
    }

    function resetFilters() {
      document.getElementById('statusFilter').value = 'all';
      document.getElementById('categoryFilter').value = 'all';
      document.getElementById('searchInput').value = '';
      filterPages();
    }

    document.getElementById('statusFilter').addEventListener('change', filterPages);
    document.getElementById('categoryFilter').addEventListener('change', filterPages);
    document.getElementById('searchInput').addEventListener('input', filterPages);

    // Toggle page details
    document.querySelectorAll('.page-header').forEach(header => {
      header.addEventListener('click', () => {
        const details = header.nextElementSibling;
        const isHidden = details.style.display === 'none';
        details.style.display = isHidden ? 'block' : 'none';
      });
    });
  </script>
</body>
</html>`;
  }

  /**
   * Generates HTML for recommendations section
   * @param recommendations - Array of recommendations
   * @returns HTML string
   */
  private generateRecommendationsHTML(recommendations: Recommendation[]): string {
    if (recommendations.length === 0) {
      return '';
    }

    const items = recommendations
      .map(
        (rec) => `
      <div class="recommendation ${rec.priority}">
        <span class="priority">${rec.priority}</span>
        <div class="description">${this.escapeHtml(rec.description)}</div>
        <div class="meta">
          <strong>Category:</strong> ${this.capitalizeCategory(rec.category)} |
          <strong>Effort:</strong> ${this.escapeHtml(rec.estimatedEffort)} |
          <strong>Affected Pages:</strong> ${rec.affectedPages.length}
        </div>
      </div>
    `
      )
      .join('');

    return `
      <div class="section">
        <h2>🎯 Recommendations</h2>
        <div class="recommendations">
          ${items}
        </div>
      </div>
    `;
  }

  /**
   * Generates HTML for page reports section
   * @param pageReports - Array of page reports
   * @returns HTML string
   */
  private generatePageReportsHTML(pageReports: PageReport[]): string {
    if (pageReports.length === 0) {
      return '<div class="no-issues">No pages to report.</div>';
    }

    const items = pageReports
      .map(
        (page) => `
      <div class="page-card" data-status="${page.status}">
        <div class="page-header">
          <div>
            <div class="title">${this.escapeHtml(page.componentName)}</div>
            <div style="font-size: 0.85rem; color: #6b7280; margin-top: 4px;">
              ${this.escapeHtml(page.filePath)}
            </div>
          </div>
          <div>
            <span class="status ${page.status}">${this.formatStatus(page.status)}</span>
            <span style="margin-left: 10px; font-weight: 600;">Score: ${page.score}%</span>
          </div>
        </div>
        <div class="page-details" style="display: ${page.issues.length > 0 ? 'block' : 'none'};">
          <div class="meta">
            <div><strong>Issues:</strong> ${page.issues.length}</div>
            <div><strong>Auto-fixable:</strong> ${page.issues.filter((i) => i.autoFixable).length}</div>
          </div>
          ${page.issues.length > 0 ? this.generateIssuesHTML(page.issues) : '<div class="no-issues">No issues found! 🎉</div>'}
        </div>
      </div>
    `
      )
      .join('');

    return `
      <div class="section">
        <h2>📄 Page Reports</h2>
        <div class="page-reports">
          ${items}
        </div>
      </div>
    `;
  }

  /**
   * Generates HTML for issues list
   * @param issues - Array of validation issues
   * @returns HTML string
   */
  private generateIssuesHTML(issues: ValidationIssue[]): string {
    return `
      <div class="issues">
        ${issues
          .map(
            (issue) => `
          <div class="issue ${issue.severity}">
            <div class="message">
              <span class="severity">${issue.severity}</span>
              ${this.escapeHtml(issue.message)}
              <span class="badge ${issue.autoFixable ? 'auto-fixable' : 'manual'}">
                ${issue.autoFixable ? '✓ Auto-fixable' : '⚠ Manual'}
              </span>
            </div>
            <div class="details">
              ${issue.lineNumber ? `<strong>Line:</strong> ${issue.lineNumber} | ` : ''}
              <strong>Expected:</strong> <code>${this.escapeHtml(issue.expectedValue)}</code>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  /**
   * Formats a status string for display
   * @param status - Status value
   * @returns Formatted status string
   */
  private formatStatus(status: string): string {
    return status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Escapes HTML special characters
   * @param text - Text to escape
   * @returns Escaped text
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }

  /**
   * Capitalizes the first letter of a category name
   * @param category - Category name to capitalize
   * @returns Capitalized category name
   */
  private capitalizeCategory(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  /**
   * Ensures the directory for a file path exists
   * @param filePath - Path to a file
   */
  private async ensureDirectoryExists(filePath: string): Promise<void> {
    const dir = dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
  }
}
