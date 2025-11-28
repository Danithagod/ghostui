/**
 * Example usage of the architecture analyzer
 * 
 * This demonstrates how to use the ArchitectureAnalyzer to check
 * component complexity and side effect encapsulation.
 */

import { FileScanner } from './fileScanner';
import { IssueCollector } from './issueCollector';
import { ArchitectureAnalyzer } from './architectureAnalyzer';

// Initialize the scanner and analyzer
const scanner = new FileScanner();
const issueCollector = new IssueCollector();
const analyzer = new ArchitectureAnalyzer(issueCollector);

// Scan all components
const components = scanner.scanComponents();

console.log(`\n=== Architecture Analysis ===`);
console.log(`Analyzing ${components.length} components...\n`);

// Run all architecture analyses
const results = analyzer.analyzeAll(components);

// Display complexity issues
console.log(`\n--- Component Complexity Issues ---`);
if (results.complexity.length === 0) {
  console.log('✓ No complexity issues found');
} else {
  console.log(`Found ${results.complexity.length} complexity issues:`);
  results.complexity.forEach(issue => {
    console.log(`\n[${issue.severity.toUpperCase()}] ${issue.title}`);
    console.log(`Location: ${issue.location}`);
    console.log(`Description: ${issue.description}`);
    console.log(`Recommendation: ${issue.recommendation}`);
  });
}

// Display side effect encapsulation issues
console.log(`\n--- Side Effect Encapsulation Issues ---`);
if (results.sideEffects.length === 0) {
  console.log('✓ No side effect encapsulation issues found');
} else {
  console.log(`Found ${results.sideEffects.length} side effect issues:`);
  results.sideEffects.forEach(issue => {
    console.log(`\n[${issue.severity.toUpperCase()}] ${issue.title}`);
    console.log(`Location: ${issue.location}`);
    console.log(`Description: ${issue.description}`);
    console.log(`Recommendation: ${issue.recommendation}`);
  });
}

// Summary
console.log(`\n=== Summary ===`);
console.log(`Total architecture issues: ${results.allIssues.length}`);
console.log(`- Complexity issues: ${results.complexity.length}`);
console.log(`- Side effect issues: ${results.sideEffects.length}`);

// Group by severity
const bySeverity = results.allIssues.reduce((acc, issue) => {
  acc[issue.severity] = (acc[issue.severity] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(`\nBy severity:`);
Object.entries(bySeverity).forEach(([severity, count]) => {
  console.log(`- ${severity}: ${count}`);
});

console.log('\n');
