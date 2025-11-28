/**
 * Example usage of the error handling analyzer
 * 
 * This demonstrates how to use the ErrorHandlingAnalyzer to check
 * components for proper error handling patterns.
 */

import { ErrorHandlingAnalyzer } from './errorHandlingAnalyzer';
import { IssueCollector } from './issueCollector';
import { FileScanner } from './fileScanner';

/**
 * Run error handling analysis on all components
 */
export function runErrorHandlingAnalysis() {
  console.log('Starting error handling analysis...\n');

  // Initialize dependencies
  const issueCollector = new IssueCollector();
  const fileScanner = new FileScanner();
  const analyzer = new ErrorHandlingAnalyzer(issueCollector);

  // Scan for components
  const components = fileScanner.scanComponents();
  console.log(`Found ${components.length} components to analyze\n`);

  // Run all error handling analyses
  const results = analyzer.analyzeAll(components);

  // Display results
  console.log('=== Error Handling Analysis Results ===\n');

  console.log(`Prop Validation Issues: ${results.propValidation.length}`);
  if (results.propValidation.length > 0) {
    console.log('Components with missing prop validation:');
    results.propValidation.forEach(issue => {
      console.log(`  - ${issue.title}`);
      console.log(`    ${issue.description}`);
      console.log(`    Recommendation: ${issue.recommendation}\n`);
    });
  }

  console.log(`Null/Undefined Handling Issues: ${results.nullUndefinedHandling.length}`);
  if (results.nullUndefinedHandling.length > 0) {
    console.log('Components with unsafe property access:');
    results.nullUndefinedHandling.forEach(issue => {
      console.log(`  - ${issue.title}`);
      console.log(`    ${issue.description}`);
      console.log(`    Recommendation: ${issue.recommendation}\n`);
    });
  }

  console.log(`State Guard Issues: ${results.stateGuards.length}`);
  if (results.stateGuards.length > 0) {
    console.log('Components with missing state guards:');
    results.stateGuards.forEach(issue => {
      console.log(`  - ${issue.title}`);
      console.log(`    ${issue.description}`);
      console.log(`    Recommendation: ${issue.recommendation}\n`);
    });
  }

  console.log(`Async Error Handling Issues: ${results.asyncErrorHandling.length}`);
  if (results.asyncErrorHandling.length > 0) {
    console.log('Components with missing async error handling:');
    results.asyncErrorHandling.forEach(issue => {
      console.log(`  - ${issue.title}`);
      console.log(`    ${issue.description}`);
      console.log(`    Recommendation: ${issue.recommendation}\n`);
    });
  }

  console.log(`\nTotal Issues Found: ${results.allIssues.length}`);

  // Group by severity
  const bySeverity = issueCollector.getStatistics(results.allIssues);
  console.log('\nIssues by Severity:');
  console.log(`  Critical: ${bySeverity.bySeverity.critical}`);
  console.log(`  High: ${bySeverity.bySeverity.high}`);
  console.log(`  Medium: ${bySeverity.bySeverity.medium}`);
  console.log(`  Low: ${bySeverity.bySeverity.low}`);

  return results;
}

/**
 * Example: Check specific component for error handling
 */
export function checkComponentErrorHandling(componentPath: string) {
  const issueCollector = new IssueCollector();
  const analyzer = new ErrorHandlingAnalyzer(issueCollector);

  const component = {
    path: componentPath,
    name: componentPath.split('/').pop()?.replace('.tsx', '') || 'Unknown',
    hasTest: false,
    exports: []
  };

  console.log(`Analyzing ${component.name} for error handling...\n`);

  const results = analyzer.analyzeAll([component]);

  if (results.allIssues.length === 0) {
    console.log('✓ No error handling issues found!');
  } else {
    console.log(`Found ${results.allIssues.length} issue(s):\n`);
    results.allIssues.forEach(issue => {
      console.log(`[${issue.severity.toUpperCase()}] ${issue.title}`);
      console.log(`  ${issue.description}`);
      console.log(`  Recommendation: ${issue.recommendation}\n`);
    });
  }

  return results;
}

// Uncomment to run the analysis
// runErrorHandlingAnalysis();
