#!/usr/bin/env node
/**
 * Check Documentation Compliance Threshold
 * 
 * This script checks if the documentation audit compliance score
 * meets the configured threshold. Used in CI/CD pipelines.
 */

import * as fs from 'fs';
import * as path from 'path';

interface AuditConfig {
  complianceThreshold: number;
  failOnThreshold: boolean;
  outputDirectory: string;
}

interface AuditReport {
  summary: {
    averageScore: number;
    totalPages: number;
    compliantPages: number;
    pagesWithIssues: number;
    totalIssues: number;
    autoFixableIssues: number;
  };
}

function loadConfig(): AuditConfig {
  const configPath = path.join(__dirname, '..', '.audit-config.json');
  
  if (!fs.existsSync(configPath)) {
    console.warn('⚠️  No .audit-config.json found, using defaults');
    return {
      complianceThreshold: 80,
      failOnThreshold: true,
      outputDirectory: 'audit-reports'
    };
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config;
}

function getLatestReport(reportsDir: string): AuditReport | null {
  if (!fs.existsSync(reportsDir)) {
    console.error('❌ Audit reports directory not found:', reportsDir);
    return null;
  }
  
  const files = fs.readdirSync(reportsDir)
    .filter(f => f.endsWith('.json') && f.startsWith('audit-report-'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    console.error('❌ No audit reports found in:', reportsDir);
    return null;
  }
  
  const latestFile = files[0];
  const reportPath = path.join(reportsDir, latestFile);
  
  console.log('📄 Reading report:', latestFile);
  
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  return report;
}

function checkCompliance(): number {
  const config = loadConfig();
  const reportsDir = path.join(__dirname, '..', config.outputDirectory);
  
  console.log('🔍 Checking documentation compliance...\n');
  
  const report = getLatestReport(reportsDir);
  
  if (!report) {
    console.error('❌ Failed to load audit report');
    return 1;
  }
  
  const score = Math.round(report.summary.averageScore || 0);
  const threshold = config.complianceThreshold;
  
  console.log('📊 Audit Summary:');
  console.log(`   Total Pages: ${report.summary.totalPages}`);
  console.log(`   Compliant Pages: ${report.summary.compliantPages}`);
  console.log(`   Pages with Issues: ${report.summary.pagesWithIssues}`);
  console.log(`   Total Issues: ${report.summary.totalIssues}`);
  console.log(`   Auto-fixable Issues: ${report.summary.autoFixableIssues}`);
  console.log(`   Compliance Score: ${score}%`);
  console.log(`   Threshold: ${threshold}%\n`);
  
  if (score < threshold) {
    console.error(`❌ Documentation compliance score (${score}%) is below threshold (${threshold}%)`);
    console.error('   Please review the audit report and fix the issues.\n');
    
    if (report.summary.autoFixableIssues > 0) {
      console.log(`💡 Tip: ${report.summary.autoFixableIssues} issues can be auto-fixed by running:`);
      console.log('   npm run audit -- --fix\n');
    }
    
    if (config.failOnThreshold) {
      return 1;
    }
  } else {
    console.log(`✅ Documentation compliance score (${score}%) meets threshold (${threshold}%)`);
  }
  
  return 0;
}

// Run the compliance check
const exitCode = checkCompliance();
process.exit(exitCode);
