/**
 * Example usage of the Documentation Audit Tool
 *
 * This file demonstrates how to use the FileScanner, AuditEngine,
 * and ReportGenerator together to audit component documentation pages.
 */

import { FileScanner } from './FileScanner';
import { AuditEngine } from './AuditEngine';
import { ReportGenerator } from './ReportGenerator';
import { join } from 'path';

/**
 * Example: Run a complete audit and generate reports
 */
async function runAudit() {
  console.log('🔍 Starting documentation audit...\n');

  // Step 1: Scan for component pages
  const scanner = new FileScanner();
  const pages = await scanner.scanComponentPages();
  console.log(`📄 Found ${pages.length} component pages\n`);

  // Step 2: Run the audit
  const engine = new AuditEngine();
  const auditResult = await engine.audit(pages);
  
  console.log('📊 Audit Results:');
  console.log(`   Total Pages: ${auditResult.totalPages}`);
  console.log(`   Pages with Issues: ${auditResult.pagesWithIssues}`);
  console.log(`   Total Issues: ${auditResult.totalIssues}`);
  console.log(`   Auto-fixable: ${auditResult.pageResults.reduce((sum, p) => sum + p.issues.filter(i => i.autoFixable).length, 0)}\n`);

  // Step 3: Generate reports
  const generator = new ReportGenerator();
  const report = generator.generateReport(auditResult);

  // Export in all formats
  const outputDir = join(__dirname, '../../audit-reports');
  
  await generator.exportJSON(report, join(outputDir, 'audit-report.json'));
  console.log('✅ JSON report generated: audit-reports/audit-report.json');

  await generator.exportMarkdown(report, join(outputDir, 'audit-report.md'));
  console.log('✅ Markdown report generated: audit-reports/audit-report.md');

  await generator.exportHTML(report, join(outputDir, 'audit-report.html'));
  console.log('✅ HTML report generated: audit-reports/audit-report.html');

  console.log('\n🎉 Audit complete!');
}

// Run the audit if this file is executed directly
if (require.main === module) {
  runAudit().catch((error) => {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  });
}

export { runAudit };
