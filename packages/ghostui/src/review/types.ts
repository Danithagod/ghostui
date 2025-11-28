/**
 * Type definitions for the GhostUI code review system
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type Effort = 'low' | 'medium' | 'high';

export interface Issue {
  id: string;
  severity: Severity;
  category: string;
  requirement: string;
  title: string;
  description: string;
  location: string;
  codeSnippet?: string;
  recommendation: string;
  effort: Effort;
}

export interface ComponentFile {
  path: string;
  name: string;
  hasTest: boolean;
  exports: string[];
}

export interface TestFile {
  path: string;
  componentName: string;
  exists: boolean;
}

export interface TypeFile {
  path: string;
  name: string;
  exports: string[];
}

export interface ConfigFile {
  path: string;
  type: 'typescript' | 'vite' | 'package' | 'eslint' | 'test';
  content?: string;
}

export interface CategoryFindings {
  issues: Issue[];
  passedChecks: string[];
  summary: string;
}

export interface FindingsByCategory {
  typeScript: CategoryFindings;
  componentAPI: CategoryFindings;
  testing: CategoryFindings;
  accessibility: CategoryFindings;
  codeStyle: CategoryFindings;
  performance: CategoryFindings;
  errorHandling: CategoryFindings;
  architecture: CategoryFindings;
  documentation: CategoryFindings;
  dependencies: CategoryFindings;
  animations: CategoryFindings;
  tooling: CategoryFindings;
}

export interface TestCoverage {
  componentsWithTests: number;
  componentsWithoutTests: string[];
}

export interface ReviewSummary {
  totalComponents: number;
  componentsWithIssues: number;
  totalIssues: number;
  issuesBySeverity: Record<Severity, number>;
  testCoverage: TestCoverage;
}

export interface CodeMetrics {
  totalFiles: number;
  totalLines: number;
  averageComplexity: number;
  testCoveragePercentage: number;
}

export interface ReviewReport {
  summary: ReviewSummary;
  findings: FindingsByCategory;
  recommendations: Recommendation[];
  metrics: CodeMetrics;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  effort: Effort;
  impact: string;
  relatedIssues: string[];
}
