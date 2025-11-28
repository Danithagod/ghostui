/**
 * Example script demonstrating Component API analysis
 * 
 * This script shows how to use the ComponentAPIAnalyzer to check
 * component API consistency across the GhostUI library.
 */

import { FileScanner } from './fileScanner';
import { ComponentAPIAnalyzer } from './componentAPIAnalyzer';
import { IssueCollector } from './issueCollector';

// Initialize the tools
const fileScanner = new FileScanner();
const issueCollector = new IssueCollector();
const apiAnalyzer = new ComponentAPIAnalyzer(issueCollector);

// Scan all components
console.log('Scanning components...');
const components = fileScanner.scanComponents();
console.log(`Found ${components.length} components\n`);

// Run all API consistency checks
console.log('=== Component API Consistency Analysis ===\n');

// 1. Prop naming consistency
console.log('1. Analyzing prop naming consistency...');
const namingIssues = apiAnalyzer.analyzePropNaming(components);
console.log(`   Found ${namingIssues.length} naming inconsistencies\n`);

// 2. Event handler forwarding
console.log('2. Verifying event handler forwarding...');
const handlerIssues = apiAnalyzer.verifyEventHandlerForwarding(components);
console.log(`   Found ${handlerIssues.length} handler forwarding issues\n`);

// 3. Ref forwarding
console.log('3. Checking ref forwarding implementation...');
const refIssues = apiAnalyzer.checkRefForwarding(components);
console.log(`   Found ${refIssues.length} ref forwarding issues\n`);

// 4. ClassName merging
console.log('4. Verifying className merging...');
const classNameIssues = apiAnalyzer.verifyClassNameMerging(components);
console.log(`   Found ${classNameIssues.length} className merging issues\n`);

// 5. Controlled/uncontrolled support
console.log('5. Analyzing controlled/uncontrolled component support...');
const controlledIssues = apiAnalyzer.analyzeControlledUncontrolledSupport(components);
console.log(`   Found ${controlledIssues.length} controlled/uncontrolled issues\n`);

// Collect all issues
const allIssues = [
  ...namingIssues,
  ...handlerIssues,
  ...refIssues,
  ...classNameIssues,
  ...controlledIssues,
];

// Display summary
console.log('=== Summary ===');
console.log(`Total issues found: ${allIssues.length}`);

const stats = issueCollector.getStatistics(allIssues);
console.log('\nBy severity:');
console.log(`  Critical: ${stats.bySeverity.critical}`);
console.log(`  High: ${stats.bySeverity.high}`);
console.log(`  Medium: ${stats.bySeverity.medium}`);
console.log(`  Low: ${stats.bySeverity.low}`);

// Display sample issues
if (allIssues.length > 0) {
  console.log('\n=== Sample Issues ===');
  const sortedIssues = issueCollector.sortBySeverity(allIssues);
  sortedIssues.slice(0, 5).forEach(issue => {
    console.log(`\n[${issue.severity.toUpperCase()}] ${issue.title}`);
    console.log(`  Location: ${issue.location}`);
    console.log(`  Description: ${issue.description}`);
    console.log(`  Recommendation: ${issue.recommendation}`);
  });
}

console.log('\n✓ Analysis complete!');
