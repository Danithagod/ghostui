#!/usr/bin/env node

/**
 * CLI Runner for Documentation Audit Tool
 *
 * Main entry point that orchestrates the audit process by connecting
 * the CLI interface with the audit engine and report generator.
 *
 * Requirements: 7.1, 8.1
 */

import { join } from 'path';
import { writeFile } from 'fs/promises';
import * as readline from 'readline';
import { CLIOptions, FixResult } from './types';
import { FileScanner } from './FileScanner';
import { AuditEngine } from './AuditEngine';
import { ReportGenerator } from './ReportGenerator';
import { DocumentationFixer } from './DocumentationFixer';
import {
  printError,
  printSuccess,
  printInfo,
  printWarning,
} from './cli';

/**
 * Prompts the user for confirmation
 * @param question - Question to ask the user
 * @returns Promise that resolves to true if user confirms, false otherwise
 */
async function promptConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Progress indicator for long-running operations
 */
class ProgressIndicator {
  private spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private currentFrame = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private message = '';

  /**
   * Starts the progress indicator
   * @param message - Message to display
   */
  start(message: string): void {
    this.message = message;
    this.currentFrame = 0;

    // Clear any existing interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Start spinner animation
    this.intervalId = setInterval(() => {
      process.stdout.write(
        `\r${this.spinner[this.currentFrame]} ${this.message}`
      );
      this.currentFrame = (this.currentFrame + 1) % this.spinner.length;
    }, 80);
  }

  /**
   * Updates the progress message
   * @param message - New message to display
   */
  update(message: string): void {
    this.message = message;
  }

  /**
   * Stops the progress indicator
   * @param finalMessage - Optional final message to display
   */
  stop(finalMessage?: string): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Clear the line
    process.stdout.write('\r' + ' '.repeat(80) + '\r');

    if (finalMessage) {
      console.log(finalMessage);
    }
  }
}

/**
 * Runs the audit process based on CLI options
 * @param options - CLI options
 * @returns Exit code (0 for success, 1 for issues found, 2 for error)
 */
export async function runAudit(options: CLIOptions): Promise<number> {
  const progress = new ProgressIndicator();

  try {
    // Step 1: Scan component pages
    progress.start('Scanning component pages...');
    const scanner = new FileScanner();
    let pages = await scanner.scanComponentPages();

    // Filter to specific component if requested
    if (options.component) {
      pages = pages.filter(
        (page) =>
          page.componentName.toLowerCase() === options.component!.toLowerCase()
      );

      if (pages.length === 0) {
        progress.stop();
        printError(
          `Component "${options.component}" not found. Check the component name and try again.`
        );
        return 2;
      }

      progress.stop(`✓ Found component: ${options.component}`);
    } else {
      progress.stop(`✓ Found ${pages.length} component pages`);
    }

    // Step 2: Run audit
    progress.start('Running audit...');
    const auditEngine = new AuditEngine();
    const auditResult = await auditEngine.audit(pages);
    progress.stop(`✓ Audit complete`);

    // Step 3: Apply fixes if requested
    let fixResults: FixResult[] = [];
    if (options.fix) {
      progress.start('Applying fixes...');
      const fixer = new DocumentationFixer();

      // Apply fixes to pages with issues
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

      progress.stop(`✓ Fixes applied`);

      // Display fix summary
      displayFixSummary(fixResults, options.dryRun);

      // If dry-run, show preview of changes
      if (options.dryRun) {
        const modifiedFiles = fixResults.filter(r => r.fixedIssues.length > 0);
        if (modifiedFiles.length > 0) {
          console.log('\n📋 Preview of changes:\n');
          for (const result of modifiedFiles.slice(0, 3)) { // Show first 3 files
            const page = pages.find(p => p.filePath === result.filePath);
            if (page) {
              console.log(generateDiffPreview(page.content, result.modifiedContent, result.filePath));
            }
          }
          if (modifiedFiles.length > 3) {
            console.log(`\n... and ${modifiedFiles.length - 3} more file(s)\n`);
          }
        }
      } else {
        // Not a dry run - prompt for confirmation before writing files
        const modifiedFiles = fixResults.filter(r => r.fixedIssues.length > 0);
        if (modifiedFiles.length > 0) {
          console.log(`\n${modifiedFiles.length} file(s) will be modified.`);
          const confirmed = await promptConfirmation('Do you want to write these changes?');

          if (confirmed) {
            progress.start('Writing files...');
            let filesWritten = 0;

            for (const result of modifiedFiles) {
              try {
                await writeFile(result.filePath, result.modifiedContent, 'utf-8');
                filesWritten++;
              } catch (error) {
                progress.stop();
                printError(
                  `Failed to write ${result.filePath}: ${error instanceof Error ? error.message : String(error)}`
                );
              }
            }

            progress.stop(`✓ ${filesWritten} file(s) written`);
            printSuccess(`Successfully applied fixes to ${filesWritten} file(s)!`);
          } else {
            printInfo('Changes were not applied.');
          }
        } else {
          printInfo('No auto-fixable issues found.');
        }
      }
    }

    // Step 4: Generate report
    if (options.report) {
      progress.start('Generating report...');
      const reportGenerator = new ReportGenerator();
      const report = reportGenerator.generateReport(auditResult);

      // Determine output file path
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const componentSuffix = options.component
        ? `-${options.component}`
        : '';
      const fixSuffix = options.fix ? '-fixed' : '';
      const fileName = `audit-report${componentSuffix}${fixSuffix}-${timestamp}`;

      let outputPath: string;
      let exportPromise: Promise<void>;

      switch (options.format) {
        case 'json':
          outputPath = join(options.outputDir, `${fileName}.json`);
          exportPromise = reportGenerator.exportJSON(report, outputPath);
          break;
        case 'markdown':
          outputPath = join(options.outputDir, `${fileName}.md`);
          exportPromise = reportGenerator.exportMarkdown(report, outputPath);
          break;
        case 'html':
          outputPath = join(options.outputDir, `${fileName}.html`);
          exportPromise = reportGenerator.exportHTML(report, outputPath);
          break;
      }

      await exportPromise;
      progress.stop(`✓ Report generated: ${outputPath}`);
    }

    // Step 5: Display summary statistics
    if (!options.fix) {
      displaySummary(auditResult, options);
    }

    // Determine exit code based on compliance
    if (options.fix && !options.dryRun) {
      const totalFixed = fixResults.reduce((sum, r) => sum + r.fixedIssues.length, 0);
      if (totalFixed > 0) {
        return 0;
      } else {
        return 1;
      }
    } else if (auditResult.pagesWithIssues === 0) {
      printSuccess('All pages are compliant! 🎉');
      return 0;
    } else {
      printWarning(
        `${auditResult.pagesWithIssues} page(s) have issues that need attention.`
      );
      return 1;
    }
  } catch (error) {
    progress.stop();
    printError(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
    return 2;
  }
}

/**
 * Displays fix results summary
 * @param fixResults - Array of fix results
 * @param dryRun - Whether this was a dry run
 */
function displayFixSummary(fixResults: FixResult[], dryRun: boolean): void {
  console.log('\n' + '═'.repeat(80));
  console.log(dryRun ? '🔍 FIX PREVIEW (DRY RUN)' : '🔧 FIX RESULTS');
  console.log('═'.repeat(80) + '\n');

  const totalFixed = fixResults.reduce((sum, r) => sum + r.fixedIssues.length, 0);
  const totalUnfixed = fixResults.reduce((sum, r) => sum + r.unfixedIssues.length, 0);
  const filesModified = fixResults.filter(r => r.fixedIssues.length > 0).length;

  console.log('📊 Summary:');
  console.log(`   Files processed:    ${fixResults.length}`);
  console.log(`   Files modified:     ${filesModified}`);
  console.log(`   Issues fixed:       ${totalFixed}`);
  console.log(`   Issues remaining:   ${totalUnfixed}`);
  console.log('');

  // Show files that were modified
  const modifiedFiles = fixResults.filter(r => r.fixedIssues.length > 0);
  if (modifiedFiles.length > 0) {
    console.log(dryRun ? '📝 Files that would be modified:' : '✅ Files modified:');
    modifiedFiles.forEach(result => {
      const fileName = result.filePath.split('/').pop() || result.filePath;
      console.log(`   ${fileName.padEnd(40)} ${result.fixedIssues.length} issue(s) fixed`);
    });
    console.log('');
  }

  // Show files with unfixed issues
  const filesWithUnfixed = fixResults.filter(r => r.unfixedIssues.length > 0);
  if (filesWithUnfixed.length > 0) {
    console.log('⚠️  Files with remaining issues:');
    filesWithUnfixed.forEach(result => {
      const fileName = result.filePath.split('/').pop() || result.filePath;
      console.log(`   ${fileName.padEnd(40)} ${result.unfixedIssues.length} issue(s) require manual fix`);
    });
    console.log('');
  }

  if (dryRun) {
    console.log('💡 Tip: Remove --dry-run flag to apply these fixes');
  } else if (totalFixed > 0) {
    console.log('✨ Fixes have been applied successfully!');
  }

  console.log('');
  console.log('═'.repeat(80) + '\n');
}

/**
 * Generates a diff preview for a single file
 * @param original - Original content
 * @param modified - Modified content
 * @param filePath - Path to the file
 * @returns Formatted diff string
 */
function generateDiffPreview(original: string, modified: string, filePath: string): string {
  const fileName = filePath.split('/').pop() || filePath;
  let diff = `\n📄 ${fileName}\n${'─'.repeat(80)}\n`;

  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  const maxLines = Math.max(originalLines.length, modifiedLines.length);

  let changesShown = 0;
  const maxChangesToShow = 10;

  for (let i = 0; i < maxLines && changesShown < maxChangesToShow; i++) {
    const origLine = originalLines[i] || '';
    const modLine = modifiedLines[i] || '';

    if (origLine !== modLine) {
      if (origLine) {
        diff += `  - ${origLine}\n`;
      }
      if (modLine) {
        diff += `  + ${modLine}\n`;
      }
      changesShown++;
    }
  }

  if (changesShown >= maxChangesToShow) {
    diff += `  ... (${maxLines - maxChangesToShow} more lines)\n`;
  }

  return diff;
}

/**
 * Displays summary statistics after audit completion
 * @param auditResult - The audit result
 * @param options - CLI options
 */
function displaySummary(
  auditResult: {
    totalPages: number;
    pagesWithIssues: number;
    totalIssues: number;
    issuesByCategory: Record<string, number>;
    issuesBySeverity: Record<string, number>;
    pageResults: Array<{
      componentName: string;
      score: number;
      issueCount: number;
      status: string;
    }>;
  },
  options: CLIOptions
): void {
  console.log('\n' + '═'.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('═'.repeat(80) + '\n');

  // Overall statistics
  const compliantPages = auditResult.totalPages - auditResult.pagesWithIssues;
  const complianceRate = Math.round(
    (compliantPages / auditResult.totalPages) * 100
  );
  const avgScore = Math.round(
    auditResult.pageResults.reduce((sum, p) => sum + p.score, 0) /
      auditResult.totalPages
  );

  console.log('📈 Overall Statistics:');
  console.log(`   Total Pages:        ${auditResult.totalPages}`);
  console.log(`   Compliant:          ${compliantPages} (${complianceRate}%)`);
  console.log(`   With Issues:        ${auditResult.pagesWithIssues}`);
  console.log(`   Total Issues:       ${auditResult.totalIssues}`);
  console.log(`   Average Score:      ${avgScore}%`);
  console.log('');

  // Issues by severity
  if (auditResult.totalIssues > 0) {
    console.log('🔍 Issues by Severity:');
    if (auditResult.issuesBySeverity.error > 0) {
      console.log(`   Errors:             ${auditResult.issuesBySeverity.error}`);
    }
    if (auditResult.issuesBySeverity.warning > 0) {
      console.log(
        `   Warnings:           ${auditResult.issuesBySeverity.warning}`
      );
    }
    if (auditResult.issuesBySeverity.info > 0) {
      console.log(`   Info:               ${auditResult.issuesBySeverity.info}`);
    }
    console.log('');

    // Issues by category
    console.log('📂 Issues by Category:');
    const categories = Object.entries(auditResult.issuesByCategory).filter(
      ([_, count]) => count > 0
    );
    if (categories.length > 0) {
      categories.forEach(([category, count]) => {
        const categoryName =
          category.charAt(0).toUpperCase() + category.slice(1);
        console.log(`   ${categoryName.padEnd(18)} ${count}`);
      });
    } else {
      console.log('   None');
    }
    console.log('');
  }

  // Page status breakdown
  const needsFixes = auditResult.pageResults.filter(
    (p) => p.status === 'needs-fixes'
  ).length;
  const needsReview = auditResult.pageResults.filter(
    (p) => p.status === 'needs-review'
  ).length;

  if (needsFixes > 0 || needsReview > 0) {
    console.log('📄 Page Status:');
    if (needsFixes > 0) {
      console.log(`   ❌ Needs Fixes:      ${needsFixes}`);
    }
    if (needsReview > 0) {
      console.log(`   ⚠️  Needs Review:     ${needsReview}`);
    }
    console.log(`   ✅ Compliant:        ${compliantPages}`);
    console.log('');
  }

  // Top issues (if not filtering by component)
  if (!options.component && auditResult.pagesWithIssues > 0) {
    const worstPages = auditResult.pageResults
      .filter((p) => p.issueCount > 0)
      .sort((a, b) => b.issueCount - a.issueCount)
      .slice(0, 5);

    if (worstPages.length > 0) {
      console.log('🎯 Pages Needing Most Attention:');
      worstPages.forEach((page, index) => {
        console.log(
          `   ${index + 1}. ${page.componentName.padEnd(25)} ${page.issueCount} issue(s), Score: ${page.score}%`
        );
      });
      console.log('');
    }
  }

  // Auto-fixable issues count
  const autoFixableCount = auditResult.pageResults.reduce((sum, page) => {
    return (
      sum +
      page.issueCount // This is a simplification; in reality we'd need to check each issue
    );
  }, 0);

  if (autoFixableCount > 0 && !options.fix) {
    console.log('💡 Tip: Use --fix to automatically resolve fixable issues');
    console.log('');
  }

  console.log('═'.repeat(80) + '\n');
}

/**
 * Main CLI entry point
 */
export async function main(args: string[]): Promise<number> {
  try {
    const { parseArguments } = await import('./cli');
    const options = parseArguments(args);

    // Display what we're doing
    if (options.component) {
      printInfo(`Auditing component: ${options.component}`);
    } else {
      printInfo('Auditing all component pages');
    }

    if (options.fix) {
      if (options.dryRun) {
        printInfo('Running in dry-run mode (no changes will be made)');
      } else {
        printInfo('Running in fix mode (changes will be applied after confirmation)');
      }
    }

    // Run the audit
    return await runAudit(options);
  } catch (error) {
    printError(error instanceof Error ? error.message : 'Unknown error');
    return 2;
  }
}
