/**
 * Example script demonstrating TypeScript analysis
 * 
 * This script shows how to use the TypeScriptAnalyzer to check
 * components for TypeScript-related issues.
 */

import { FileScanner } from './fileScanner';
import { TypeScriptAnalyzer } from './typeScriptAnalyzer';
import { IssueCollector } from './issueCollector';

// Initialize the tools
const fileScanner = new FileScanner();
const issueCollector = new IssueCollector();
const typeScriptAnalyzer = new TypeScriptAnalyzer(issueCollector);

// Scan for components
console.log('Scanning components...\n');
const components = fileScanner.scanComponents();
console.log(`Found ${components.length} components\n`);

// Run all TypeScript analyses
console.log('=== TypeScript Analysis Results ===\n');

// 1. Check for interface definitions
console.log('1. Checking for Props interface definitions...');
const interfaceIssues = typeScriptAnalyzer.scanForInterfaceDefinitions(components);
console.log(`   Found ${interfaceIssues.length} issues\n`);
interfaceIssues.forEach(issue => {
  console.log(`   - ${issue.title}`);
  console.log(`     Location: ${issue.location}`);
  console.log(`     Recommendation: ${issue.recommendation}\n`);
});

// 2. Check optional prop handling
console.log('2. Analyzing optional prop handling...');
const optionalPropIssues = typeScriptAnalyzer.analyzeOptionalPropHandling(components);
console.log(`   Found ${optionalPropIssues.length} issues\n`);
optionalPropIssues.slice(0, 3).forEach(issue => {
  console.log(`   - ${issue.title}`);
  console.log(`     Recommendation: ${issue.recommendation}\n`);
});
if (optionalPropIssues.length > 3) {
  console.log(`   ... and ${optionalPropIssues.length - 3} more\n`);
}

// 3. Verify type exports
console.log('3. Verifying type exports in index file...');
const indexPath = fileScanner.getIndexPath();
const typeExportIssues = typeScriptAnalyzer.verifyTypeExports(components, indexPath);
console.log(`   Found ${typeExportIssues.length} issues\n`);
typeExportIssues.slice(0, 3).forEach(issue => {
  console.log(`   - ${issue.title}`);
  console.log(`     Recommendation: ${issue.recommendation}\n`);
});
if (typeExportIssues.length > 3) {
  console.log(`   ... and ${typeExportIssues.length - 3} more\n`);
}

// 4. Check type naming consistency
console.log('4. Checking type naming consistency...');
const namingIssues = typeScriptAnalyzer.checkTypeNamingConsistency(components);
console.log(`   Found ${namingIssues.length} issues\n`);
namingIssues.slice(0, 3).forEach(issue => {
  console.log(`   - ${issue.title}`);
  console.log(`     Recommendation: ${issue.recommendation}\n`);
});
if (namingIssues.length > 3) {
  console.log(`   ... and ${namingIssues.length - 3} more\n`);
}

// 5. Verify HTML element type extensions
console.log('5. Verifying HTML element type extensions...');
const htmlTypeIssues = typeScriptAnalyzer.verifyHTMLElementTypeExtensions(components);
console.log(`   Found ${htmlTypeIssues.length} issues\n`);
htmlTypeIssues.forEach(issue => {
  console.log(`   - ${issue.title}`);
  console.log(`     Recommendation: ${issue.recommendation}\n`);
});

// Summary
const allIssues = [
  ...interfaceIssues,
  ...optionalPropIssues,
  ...typeExportIssues,
  ...namingIssues,
  ...htmlTypeIssues
];

console.log('\n=== Summary ===');
console.log(`Total TypeScript issues found: ${allIssues.length}`);
console.log(`  - Critical: ${allIssues.filter(i => i.severity === 'critical').length}`);
console.log(`  - High: ${allIssues.filter(i => i.severity === 'high').length}`);
console.log(`  - Medium: ${allIssues.filter(i => i.severity === 'medium').length}`);
console.log(`  - Low: ${allIssues.filter(i => i.severity === 'low').length}`);
