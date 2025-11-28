/**
 * Example usage of DocumentationAnalyzer
 * 
 * This demonstrates how to use the DocumentationAnalyzer to check
 * for JSDoc comments and documentation completeness.
 */

import { DocumentationAnalyzer } from './documentationAnalyzer';
import { FileScanner } from './fileScanner';
import { IssueCollector } from './issueCollector';

// Initialize the required components
const issueCollector = new IssueCollector();
const fileScanner = new FileScanner();
const documentationAnalyzer = new DocumentationAnalyzer(issueCollector);

// Scan for components
const components = fileScanner.scanComponents();
const indexPath = fileScanner.getIndexPath();

console.log(`Analyzing ${components.length} components for documentation issues...\n`);

// Check JSDoc presence (Property 28)
console.log('=== Checking JSDoc Presence ===');
const jsDocIssues = documentationAnalyzer.checkJSDocPresence(components);
console.log(`Found ${jsDocIssues.length} JSDoc issues`);
if (jsDocIssues.length > 0) {
  console.log('Sample issue:', jsDocIssues[0].title);
}
console.log();

// Verify complex prop documentation (Property 29)
console.log('=== Checking Complex Prop Documentation ===');
const complexPropIssues = documentationAnalyzer.verifyComplexPropDocumentation(components);
console.log(`Found ${complexPropIssues.length} complex prop documentation issues`);
if (complexPropIssues.length > 0) {
  console.log('Sample issue:', complexPropIssues[0].title);
}
console.log();

// Check documentation file existence (Property 30)
console.log('=== Checking Documentation File Existence ===');
const docFileIssues = documentationAnalyzer.checkDocumentationFileExistence(components);
console.log(`Found ${docFileIssues.length} missing documentation files`);
if (docFileIssues.length > 0) {
  console.log('Sample issue:', docFileIssues[0].title);
}
console.log();

// Verify export documentation (Property 31)
console.log('=== Checking Export Documentation ===');
const exportDocIssues = documentationAnalyzer.verifyExportDocumentation(indexPath);
console.log(`Found ${exportDocIssues.length} undocumented exports`);
if (exportDocIssues.length > 0) {
  console.log('Sample issue:', exportDocIssues[0].title);
}
console.log();

// Summary
const allIssues = [
  ...jsDocIssues,
  ...complexPropIssues,
  ...docFileIssues,
  ...exportDocIssues
];

console.log('=== Summary ===');
console.log(`Total documentation issues found: ${allIssues.length}`);
console.log(`- JSDoc issues: ${jsDocIssues.length}`);
console.log(`- Complex prop documentation issues: ${complexPropIssues.length}`);
console.log(`- Missing documentation files: ${docFileIssues.length}`);
console.log(`- Undocumented exports: ${exportDocIssues.length}`);

// Group by severity
const stats = issueCollector.getStatistics(allIssues);
console.log('\nBy severity:');
console.log(`- Critical: ${stats.bySeverity.critical}`);
console.log(`- High: ${stats.bySeverity.high}`);
console.log(`- Medium: ${stats.bySeverity.medium}`);
console.log(`- Low: ${stats.bySeverity.low}`);
