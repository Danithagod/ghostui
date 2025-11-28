/**
 * Example script demonstrating the testing analyzer
 * Run with: npx tsx src/review/example-testing-analysis.ts
 */

import { FileScanner } from './fileScanner';
import { TestingAnalyzer } from './testingAnalyzer';

async function main() {
  console.log('=== GhostUI Testing Coverage Analysis ===\n');

  // Initialize scanner and analyzer
  const scanner = new FileScanner();
  const analyzer = new TestingAnalyzer();

  // Scan all components
  console.log('Scanning components...');
  const components = scanner.scanComponents();
  console.log(`Found ${components.length} components\n`);

  // Run all testing analyses
  console.log('Analyzing test coverage...\n');
  const results = analyzer.analyzeAll(components);

  // Display coverage results
  console.log('=== Test Coverage ===');
  console.log(`Components with tests: ${results.coverage.componentsWithTests.length}`);
  console.log(`Components without tests: ${results.coverage.componentsWithoutTests.length}`);
  console.log(`Coverage percentage: ${results.coverage.testCoveragePercentage.toFixed(1)}%\n`);

  if (results.coverage.componentsWithoutTests.length > 0) {
    console.log('Components missing tests:');
    results.coverage.componentsWithoutTests.forEach(name => {
      console.log(`  - ${name}`);
    });
    console.log();
  }

  // Display completeness results
  console.log('=== Test Completeness ===');
  console.log(`Tests with incomplete rendering: ${results.completeness.testsWithIncompleteRendering.length}`);
  console.log(`Tests with incomplete prop variations: ${results.completeness.testsWithIncompletePropVariations.length}`);
  console.log(`Tests with incomplete interactions: ${results.completeness.testsWithIncompleteInteractions.length}\n`);

  // Display consistency results
  console.log('=== Test Consistency ===');
  console.log(`Tests with inconsistent naming: ${results.consistency.testsWithInconsistentNaming.length}`);
  console.log(`Tests with inconsistent structure: ${results.consistency.testsWithInconsistentStructure.length}\n`);

  // Display issue summary
  console.log('=== Issue Summary ===');
  const criticalIssues = results.allIssues.filter(i => i.severity === 'critical');
  const highIssues = results.allIssues.filter(i => i.severity === 'high');
  const mediumIssues = results.allIssues.filter(i => i.severity === 'medium');
  const lowIssues = results.allIssues.filter(i => i.severity === 'low');

  console.log(`Total issues: ${results.allIssues.length}`);
  console.log(`  Critical: ${criticalIssues.length}`);
  console.log(`  High: ${highIssues.length}`);
  console.log(`  Medium: ${mediumIssues.length}`);
  console.log(`  Low: ${lowIssues.length}\n`);

  // Display sample issues
  if (results.allIssues.length > 0) {
    console.log('=== Sample Issues ===');
    results.allIssues.slice(0, 5).forEach(issue => {
      console.log(`\n[${issue.severity.toUpperCase()}] ${issue.title}`);
      console.log(`  Location: ${issue.location}`);
      console.log(`  Recommendation: ${issue.recommendation}`);
    });
  }

  console.log('\n=== Analysis Complete ===');
}

main().catch(console.error);
