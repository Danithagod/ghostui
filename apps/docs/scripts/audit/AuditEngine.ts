/**
 * Audit Engine for Documentation Audit Tool
 *
 * Orchestrates the validation process by applying all validation rules
 * to component pages and generating comprehensive audit results.
 *
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

import {
  ComponentPage,
  ParsedPage,
  ValidationRule,
  ValidationIssue,
  ValidationContext,
  AuditResult,
  PageAuditResult,
  ValidationCategory,
  ValidationSeverity,
} from './types';
import { TSXParser } from './TSXParser';
import { getStyleGuideConfig } from './styleGuideConfig';
import { typographyRules } from './typographyRules';
import { spacingRules } from './spacingRules';
import { structureRules } from './structureRules';
import { apiRules } from './apiRules';
import { previewRules } from './previewRules';

/**
 * AuditEngine class for orchestrating the documentation audit process
 */
export class AuditEngine {
  private readonly parser: TSXParser;
  private readonly rules: ValidationRule[];

  /**
   * Creates a new AuditEngine instance
   * @param customRules - Optional array of custom validation rules to use instead of defaults
   */
  constructor(customRules?: ValidationRule[]) {
    this.parser = new TSXParser();
    
    // Use custom rules if provided, otherwise use all default rules
    this.rules = customRules || this.getDefaultRules();
  }

  /**
   * Gets the default set of validation rules
   * @returns Array of all default validation rules
   */
  private getDefaultRules(): ValidationRule[] {
    return [
      ...typographyRules,
      ...spacingRules,
      ...structureRules,
      ...apiRules,
      ...previewRules,
    ];
  }

  /**
   * Audits all provided component pages
   * @param pages - Array of component pages to audit
   * @returns Complete audit result with all issues and statistics
   */
  async audit(pages: ComponentPage[]): Promise<AuditResult> {
    const pageResults: PageAuditResult[] = [];

    // Process each page
    for (const page of pages) {
      const pageResult = await this.auditPage(page);
      pageResults.push(pageResult);
    }

    // Generate summary statistics
    return this.generateAuditResult(pageResults);
  }

  /**
   * Audits a single component page
   * @param page - Component page to audit
   * @returns Audit result for the page
   */
  private async auditPage(page: ComponentPage): Promise<PageAuditResult> {
    // Parse the page content
    const parsedPage = this.parser.parse(page.content);

    // Apply all validation rules
    const issues = this.applyRules(parsedPage, page.filePath, page.componentName);

    // Calculate compliance score
    const score = this.calculateComplianceScore(issues, this.rules.length);

    // Determine status based on score
    const status = this.determineStatus(score, issues.length);

    return {
      filePath: page.filePath,
      componentName: page.componentName,
      issueCount: issues.length,
      issues,
      score,
      status,
    };
  }

  /**
   * Applies all validation rules to a parsed page
   * @param page - Parsed page to validate
   * @param filePath - Path to the file being validated
   * @param componentName - Name of the component
   * @returns Array of all validation issues found
   */
  applyRules(
    page: ParsedPage,
    filePath: string,
    componentName: string
  ): ValidationIssue[] {
    const allIssues: ValidationIssue[] = [];
    const styleGuide = getStyleGuideConfig();

    // Create validation context
    const context: ValidationContext = {
      page,
      filePath,
      componentName,
      styleGuide,
    };

    // Apply each rule and collect issues
    for (const rule of this.rules) {
      try {
        const issues = rule.validate(page, context);
        allIssues.push(...issues);
      } catch (error) {
        // Log rule execution error but continue with other rules
        console.error(
          `Error executing rule "${rule.id}" on ${filePath}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    return allIssues;
  }

  /**
   * Calculates a compliance score (0-100) based on issues found
   * @param issues - Array of validation issues
   * @param totalRules - Total number of rules applied
   * @returns Compliance score from 0 to 100
   */
  private calculateComplianceScore(
    issues: ValidationIssue[],
    totalRules: number
  ): number {
    if (totalRules === 0) {
      return 100;
    }

    // Weight issues by severity
    const severityWeights: Record<ValidationSeverity, number> = {
      error: 1.0,
      warning: 0.5,
      info: 0.25,
    };

    // Calculate weighted issue count
    const weightedIssueCount = issues.reduce((sum, issue) => {
      return sum + severityWeights[issue.severity];
    }, 0);

    // Calculate score (100 - percentage of weighted issues)
    // Each rule can potentially generate multiple issues, so we normalize
    // by the total number of rules to get a reasonable score
    const issueRatio = Math.min(weightedIssueCount / totalRules, 1.0);
    const score = Math.round((1 - issueRatio) * 100);

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Determines the status of a page based on its score and issue count
   * @param score - Compliance score (0-100)
   * @param issueCount - Number of issues found
   * @returns Status classification
   */
  private determineStatus(
    score: number,
    issueCount: number
  ): 'compliant' | 'needs-review' | 'needs-fixes' {
    if (issueCount === 0) {
      return 'compliant';
    }

    if (score >= 80) {
      return 'needs-review';
    }

    return 'needs-fixes';
  }

  /**
   * Generates the complete audit result with summary statistics
   * @param pageResults - Results for all audited pages
   * @returns Complete audit result
   */
  private generateAuditResult(pageResults: PageAuditResult[]): AuditResult {
    const totalPages = pageResults.length;
    const pagesWithIssues = pageResults.filter((r) => r.issueCount > 0).length;
    const totalIssues = pageResults.reduce((sum, r) => sum + r.issueCount, 0);

    // Count issues by category
    const issuesByCategory: Record<ValidationCategory, number> = {
      typography: 0,
      spacing: 0,
      structure: 0,
      api: 0,
      examples: 0,
      preview: 0,
    };

    // Count issues by severity
    const issuesBySeverity: Record<ValidationSeverity, number> = {
      error: 0,
      warning: 0,
      info: 0,
    };

    // Aggregate statistics from all pages
    for (const pageResult of pageResults) {
      for (const issue of pageResult.issues) {
        issuesByCategory[issue.category]++;
        issuesBySeverity[issue.severity]++;
      }
    }

    return {
      totalPages,
      pagesWithIssues,
      totalIssues,
      issuesByCategory,
      issuesBySeverity,
      pageResults,
    };
  }

  /**
   * Gets the list of validation rules being used
   * @returns Array of validation rules
   */
  getRules(): ValidationRule[] {
    return [...this.rules];
  }

  /**
   * Gets the TSX parser instance
   * @returns TSX parser
   */
  getParser(): TSXParser {
    return this.parser;
  }
}
