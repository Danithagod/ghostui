/**
 * Example usage of the review infrastructure
 * 
 * This demonstrates how to use the FileScanner, IssueCollector, and ReportGenerator
 * to conduct a code review and generate a report.
 */

import { FileScanner } from './fileScanner';
import { ReportGenerator } from './reportGenerator';
import { IssueCollector } from './issueCollector';
import * as path from 'path';

/**
 * Example: Basic review workflow
 */
export function exampleReviewWorkflow() {
  // 1. Initialize the infrastructure
  const workspaceRoot = path.resolve(__dirname, '../../../../');
  const scanner = new FileScanner(workspaceRoot);
  const collector = new IssueCollector();
  const report = ReportGenerator.createEmptyReport();

  // 2. Discover files
  console.log('Scanning codebase...');
  const components = scanner.scanComponents();
  const tests = scanner.scanTests();
  const types = scanner.scanTypes();
  const configs = scanner.scanConfig();

  console.log(`Found ${components.length} components`);
  console.log(`Found ${tests.length} test files`);
  console.log(`Found ${types.length} type files`);
  console.log(`Found ${configs.length} config files`);

  // 3. Update report summary
  report.summary.totalComponents = components.length;
  report.summary.testCoverage.componentsWithTests = components.filter(c => c.hasTest).length;
  report.summary.testCoverage.componentsWithoutTests = components
    .filter(c => !c.hasTest)
    .map(c => c.name);

  // 4. Example: Check for components without tests
  for (const component of components) {
    if (!component.hasTest) {
      const issue = collector.createIssue({
        severity: 'medium',
        category: 'Testing',
        requirement: '3.1',
        title: `Missing test file for ${component.name}`,
        description: `Component ${component.name} does not have a corresponding test file`,
        location: component.name,
        recommendation: `Create ${component.name}.test.tsx with basic rendering and interaction tests`,
        effort: 'medium'
      });
      
      ReportGenerator.addIssue(report, 'testing', issue);
    } else {
      ReportGenerator.addPassedCheck(
        report,
        'testing',
        `${component.name} has test coverage`
      );
    }
  }

  // 5. Update summary statistics
  ReportGenerator.updateSummary(report);

  // 6. Generate markdown report
  const markdown = ReportGenerator.generateMarkdown(report);

  return {
    report,
    markdown,
    components,
    tests,
    types,
    configs
  };
}

/**
 * Example: Collecting issues from multiple categories
 */
export function exampleMultiCategoryReview() {
  const collector = new IssueCollector();
  const report = ReportGenerator.createEmptyReport();

  // TypeScript issues
  const tsIssue = collector.createIssue({
    severity: 'high',
    category: 'TypeScript',
    requirement: '1.1',
    title: 'Missing interface definition',
    description: 'Component lacks explicit TypeScript interface',
    location: 'ExampleComponent.tsx',
    recommendation: 'Add ExampleComponentProps interface',
    effort: 'low'
  });
  ReportGenerator.addIssue(report, 'typeScript', tsIssue);

  // Accessibility issues
  const a11yIssue = collector.createIssue({
    severity: 'critical',
    category: 'Accessibility',
    requirement: '4.2',
    title: 'Missing ARIA label',
    description: 'Interactive button lacks aria-label',
    location: 'ButtonComponent.tsx',
    recommendation: 'Add aria-label or aria-labelledby attribute',
    effort: 'low'
  });
  ReportGenerator.addIssue(report, 'accessibility', a11yIssue);

  // Performance issues
  const perfIssue = collector.createIssue({
    severity: 'medium',
    category: 'Performance',
    requirement: '6.3',
    title: 'Unmemoized event handler',
    description: 'Event handler defined inline without useCallback',
    location: 'FormComponent.tsx',
    recommendation: 'Wrap handler in useCallback hook',
    effort: 'low'
  });
  ReportGenerator.addIssue(report, 'performance', perfIssue);

  // Get statistics
  const allIssues = [
    ...report.findings.typeScript.issues,
    ...report.findings.accessibility.issues,
    ...report.findings.performance.issues
  ];
  
  const stats = collector.getStatistics(allIssues);
  console.log('Issue Statistics:', stats);

  return { report, stats };
}

// Run examples if executed directly
if (require.main === module) {
  console.log('=== Example 1: Basic Review Workflow ===\n');
  const result1 = exampleReviewWorkflow();
  console.log('\nReport Summary:');
  console.log(`- Total Components: ${result1.report.summary.totalComponents}`);
  console.log(`- Total Issues: ${result1.report.summary.totalIssues}`);
  console.log(`- Test Coverage: ${result1.report.metrics.testCoveragePercentage.toFixed(1)}%`);

  console.log('\n=== Example 2: Multi-Category Review ===\n');
  const result2 = exampleMultiCategoryReview();
  console.log(`Total issues collected: ${result2.stats.total}`);
}
