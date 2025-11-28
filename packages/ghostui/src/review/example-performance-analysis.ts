/**
 * Example usage of PerformanceAnalyzer
 * 
 * This script demonstrates how to use the PerformanceAnalyzer to check
 * components for performance issues related to animations and event handlers.
 */

import { PerformanceAnalyzer } from './performanceAnalyzer';
import { IssueCollector } from './issueCollector';
import { FileScanner } from './fileScanner';
import * as path from 'path';

// Initialize the analyzer
const issueCollector = new IssueCollector();
const performanceAnalyzer = new PerformanceAnalyzer(issueCollector);
const fileScanner = new FileScanner(path.join(__dirname, '../components'));

// Scan all components
const components = fileScanner.scanComponents();

console.log(`\n🔍 Analyzing ${components.length} components for performance issues...\n`);

// Run all performance analyses
const results = performanceAnalyzer.analyzeAll(components);

// Display results
console.log('📊 Performance Analysis Results\n');
console.log('=' .repeat(60));

console.log(`\n🎬 Animation Property Issues: ${results.animationProperties.length}`);
if (results.animationProperties.length > 0) {
  console.log('\nComponents with animation performance issues:');
  for (const issue of results.animationProperties) {
    console.log(`\n  ${issue.severity.toUpperCase()}: ${issue.title}`);
    console.log(`  Location: ${path.basename(issue.location)}`);
    console.log(`  Description: ${issue.description}`);
    console.log(`  Recommendation: ${issue.recommendation.substring(0, 100)}...`);
  }
}

console.log(`\n⚡ Event Handler Memoization Issues: ${results.eventHandlerMemoization.length}`);
if (results.eventHandlerMemoization.length > 0) {
  console.log('\nComponents with event handler issues:');
  for (const issue of results.eventHandlerMemoization) {
    console.log(`\n  ${issue.severity.toUpperCase()}: ${issue.title}`);
    console.log(`  Location: ${path.basename(issue.location)}`);
    console.log(`  Description: ${issue.description}`);
    console.log(`  Recommendation: ${issue.recommendation.substring(0, 100)}...`);
  }
}

console.log(`\n📈 Total Performance Issues: ${results.allIssues.length}`);
console.log('=' .repeat(60));

// Group by severity
const bySeverity = issueCollector.getStatistics(results.allIssues);
console.log('\n📊 Issues by Severity:');
console.log(`  Critical: ${bySeverity.bySeverity.critical}`);
console.log(`  High: ${bySeverity.bySeverity.high}`);
console.log(`  Medium: ${bySeverity.bySeverity.medium}`);
console.log(`  Low: ${bySeverity.bySeverity.low}`);

console.log('\n✅ Performance analysis complete!\n');

// Example: Focus on specific components
console.log('\n🎯 Detailed Analysis of Specific Components:\n');

const targetComponents = components.filter(c => 
  c.name === 'SpookyProgressBar' || 
  c.name === 'GooeyButton' ||
  c.name === 'BatToggle'
);

for (const component of targetComponents) {
  console.log(`\n📦 ${component.name}`);
  console.log('-'.repeat(40));
  
  const animIssues = performanceAnalyzer.analyzeAnimationPropertyUsage([component]);
  const handlerIssues = performanceAnalyzer.checkEventHandlerMemoization([component]);
  
  if (animIssues.length === 0 && handlerIssues.length === 0) {
    console.log('  ✅ No performance issues detected');
  } else {
    if (animIssues.length > 0) {
      console.log(`  ⚠️  ${animIssues.length} animation issue(s)`);
    }
    if (handlerIssues.length > 0) {
      console.log(`  ⚠️  ${handlerIssues.length} event handler issue(s)`);
    }
  }
}

console.log('\n');
