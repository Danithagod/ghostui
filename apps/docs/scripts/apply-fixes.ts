#!/usr/bin/env node

/**
 * Script to apply automated fixes to component documentation pages
 * This script runs the audit and applies fixes without user prompts
 */

import { writeFile } from 'fs/promises';
import { FileScanner } from './audit/FileScanner';
import { AuditEngine } from './audit/AuditEngine';
import { DocumentationFixer } from './audit/DocumentationFixer';
import { ReportGenerator } from './audit/ReportGenerator';
import { join } from 'path';

async function main() {
  console.log('\n🔧 Applying automated fixes to component pages...\n');

  try {
    // Step 1: Scan component pages
    console.log('📂 Scanning component pages...');
    const scanner = new FileScanner();
    const pages = await scanner.scanComponentPages();
    console.log(`✓ Found ${pages.length} component pages\n`);

    // Step 2: Run audit
    console.log('🔍 Running audit...');
    const auditEngine = new AuditEngine();
    const auditResult = await auditEngine.audit(pages);
    console.log(`✓ Audit complete - ${auditResult.totalIssues} issues found\n`);

    // Step 3: Apply fixes
    console.log('🔧 Applying fixes...');
    const fixer = new DocumentationFixer();
    const fixResults = [];

    const pagesToFix = auditResult.pageResults.filter(
      (result) => result.issueCount > 0
    );

    for (const pageResult of pagesToFix) {
      const page = pages.find((p) => p.filePath === pageResult.filePath);
      if (page) {
        const fixResult = await fixer.fix(page, pageResult.issues);
        fixResults.push(fixResult);
      }
    }

    console.log(`✓ Fixes applied\n`);

    // Step 4: Write modified files
    const modifiedFiles = fixResults.filter(r => r.fixedIssues.length > 0);
    
    if (modifiedFiles.length === 0) {
      console.log('ℹ️  No auto-fixable issues found.\n');
      return;
    }

    console.log(`📝 Writing ${modifiedFiles.length} modified files...\n`);
    let filesWritten = 0;
    let totalFixed = 0;

    for (const result of modifiedFiles) {
      try {
        await writeFile(result.filePath, result.modifiedContent, 'utf-8');
        filesWritten++;
        totalFixed += result.fixedIssues.length;
        const fileName = result.filePath.split(/[/\\]/).pop() || result.filePath;
        console.log(`  ✓ ${fileName} - ${result.fixedIssues.length} issue(s) fixed`);
      } catch (error) {
        console.error(
          `  ✗ Failed to write ${result.filePath}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    console.log(`\n✅ Successfully applied fixes to ${filesWritten} file(s)!`);
    console.log(`📊 Total issues fixed: ${totalFixed}\n`);

    // Step 5: Generate report
    console.log('📄 Generating report...');
    const reportGenerator = new ReportGenerator();
    const report = reportGenerator.generateReport(auditResult);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = join('audit-reports', `audit-report-after-fixes-${timestamp}.json`);
    await reportGenerator.exportJSON(report, outputPath);
    console.log(`✓ Report generated: ${outputPath}\n`);

    // Step 6: Run audit again to see remaining issues
    console.log('🔍 Running audit again to check remaining issues...');
    const postFixAuditResult = await auditEngine.audit(pages);
    console.log(`✓ Remaining issues: ${postFixAuditResult.totalIssues}\n`);

    console.log('═'.repeat(80));
    console.log('📊 SUMMARY');
    console.log('═'.repeat(80));
    console.log(`Files modified:     ${filesWritten}`);
    console.log(`Issues fixed:       ${totalFixed}`);
    console.log(`Issues remaining:   ${postFixAuditResult.totalIssues}`);
    console.log(`Compliance rate:    ${Math.round((postFixAuditResult.totalPages - postFixAuditResult.pagesWithIssues) / postFixAuditResult.totalPages * 100)}%`);
    console.log('═'.repeat(80) + '\n');

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();
