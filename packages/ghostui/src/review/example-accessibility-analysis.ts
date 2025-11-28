/**
 * Example usage of AccessibilityAnalyzer
 * 
 * This script demonstrates how to use the AccessibilityAnalyzer to check
 * components for accessibility issues including keyboard navigation, ARIA
 * attributes, focus indicators, and motion reduction support.
 */

import { FileScanner } from './fileScanner';
import { AccessibilityAnalyzer } from './accessibilityAnalyzer';
import { IssueCollector } from './issueCollector';

// Initialize the scanner and analyzer
const scanner = new FileScanner();
const issueCollector = new IssueCollector();
const analyzer = new AccessibilityAnalyzer(issueCollector);

// Scan for all components
const components = scanner.scanComponents();

console.log(`\n🔍 Analyzing ${components.length} components for accessibility issues...\n`);

// Run all accessibility analyses
const results = analyzer.analyzeAll(components);

// Display results
console.log('📊 Accessibility Analysis Results:\n');
console.log(`Keyboard Navigation Issues: ${results.keyboardNavigation.length}`);
console.log(`ARIA Attribute Issues: ${results.ariaAttributes.length}`);
console.log(`Focus Indicator Issues: ${results.focusIndicators.length}`);
console.log(`Motion Reduction Issues: ${results.motionReduction.length}`);
console.log(`\nTotal Issues: ${results.allIssues.length}\n`);

// Display issues by severity
const issuesBySeverity = {
  critical: results.allIssues.filter(i => i.severity === 'critical'),
  high: results.allIssues.filter(i => i.severity === 'high'),
  medium: results.allIssues.filter(i => i.severity === 'medium'),
  low: results.allIssues.filter(i => i.severity === 'low')
};

console.log('🚨 Issues by Severity:');
console.log(`  Critical: ${issuesBySeverity.critical.length}`);
console.log(`  High: ${issuesBySeverity.high.length}`);
console.log(`  Medium: ${issuesBySeverity.medium.length}`);
console.log(`  Low: ${issuesBySeverity.low.length}\n`);

// Display sample issues
if (results.allIssues.length > 0) {
  console.log('📋 Sample Issues:\n');
  
  // Show first 5 issues
  results.allIssues.slice(0, 5).forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.severity.toUpperCase()}] ${issue.title}`);
    console.log(`   Location: ${issue.location}`);
    console.log(`   Recommendation: ${issue.recommendation}\n`);
  });
  
  if (results.allIssues.length > 5) {
    console.log(`... and ${results.allIssues.length - 5} more issues\n`);
  }
} else {
  console.log('✅ No accessibility issues found!\n');
}

// Display components with most issues
const componentIssueCount = new Map<string, number>();
results.allIssues.forEach(issue => {
  const componentName = issue.location.split('/').pop()?.replace('.tsx', '') || 'Unknown';
  componentIssueCount.set(componentName, (componentIssueCount.get(componentName) || 0) + 1);
});

const sortedComponents = Array.from(componentIssueCount.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

if (sortedComponents.length > 0) {
  console.log('🎯 Components with Most Issues:');
  sortedComponents.forEach(([component, count]) => {
    console.log(`  ${component}: ${count} issues`);
  });
  console.log();
}

// Summary
console.log('📝 Summary:');
console.log(`  Total components analyzed: ${components.length}`);
console.log(`  Components with issues: ${componentIssueCount.size}`);
console.log(`  Components without issues: ${components.length - componentIssueCount.size}`);
console.log(`  Overall accessibility score: ${Math.round((1 - componentIssueCount.size / components.length) * 100)}%\n`);
