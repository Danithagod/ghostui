#!/usr/bin/env node

/**
 * Documentation Audit Script
 * 
 * Analyzes all component documentation pages and generates a report
 * identifying components that need documentation improvements.
 * 
 * Checks:
 * - API documentation presence (PropsTable)
 * - Minimum example count (ComponentPlayground instances)
 * - Consistent styling patterns
 * - Section structure and completeness
 */

const fs = require('fs');
const path = require('path');

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '../app/docs/components');
const MIN_EXAMPLES = 2;

// Styling patterns to check
const STYLE_PATTERNS = {
  pageContainer: /className="[^"]*space-y-(8|12)[^"]*"/,
  headerSection: /className="[^"]*space-y-4[^"]*"/,
  h1Header: /className="[^"]*text-(3xl|4xl|5xl)[^"]*"/,
  h2Header: /className="[^"]*text-(2xl|3xl)[^"]*"/,
  leadParagraph: /className="[^"]*lead[^"]*"/,
  sectionSpacing: /className="[^"]*mt-(8|12)[^"]*"/,
};

// Results storage
const results = {
  total: 0,
  compliant: 0,
  issues: [],
  summary: {
    missingAPI: [],
    insufficientExamples: [],
    stylingIssues: [],
    missingBasicUsage: [],
    missingLeadParagraph: [],
  }
};

/**
 * Analyze a single component page file
 */
function analyzeComponentPage(componentName, filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  // Check 1: API Documentation (PropsTable or props table)
  const hasPropsTable = content.includes('PropsTable') || 
                        content.includes('<table') && content.includes('Props');
  if (!hasPropsTable) {
    issues.push('Missing API documentation (PropsTable)');
    results.summary.missingAPI.push(componentName);
  }
  
  // Check 2: Minimum example count (ComponentPlayground instances)
  const playgroundMatches = content.match(/<ComponentPlayground/g);
  const exampleCount = playgroundMatches ? playgroundMatches.length : 0;
  if (exampleCount < MIN_EXAMPLES) {
    issues.push(`Insufficient examples (${exampleCount}/${MIN_EXAMPLES})`);
    results.summary.insufficientExamples.push(componentName);
  }
  
  // Check 3: Basic Usage section
  const hasBasicUsage = /Basic Usage|Getting Started|Usage/i.test(content);
  if (!hasBasicUsage) {
    issues.push('Missing "Basic Usage" section');
    results.summary.missingBasicUsage.push(componentName);
  }
  
  // Check 4: Lead paragraph
  const hasLeadParagraph = STYLE_PATTERNS.leadParagraph.test(content);
  if (!hasLeadParagraph) {
    issues.push('Missing lead paragraph with "lead" class');
    results.summary.missingLeadParagraph.push(componentName);
  }
  
  // Check 5: Styling patterns
  const stylingIssues = [];
  
  if (!STYLE_PATTERNS.pageContainer.test(content)) {
    stylingIssues.push('page container spacing (space-y-8 or space-y-12)');
  }
  
  if (!STYLE_PATTERNS.h1Header.test(content)) {
    stylingIssues.push('h1 header sizing (text-3xl or larger)');
  }
  
  if (!STYLE_PATTERNS.h2Header.test(content)) {
    stylingIssues.push('h2 header sizing (text-2xl or larger)');
  }
  
  if (stylingIssues.length > 0) {
    issues.push(`Styling inconsistencies: ${stylingIssues.join(', ')}`);
    results.summary.stylingIssues.push(componentName);
  }
  
  return {
    componentName,
    exampleCount,
    hasPropsTable,
    hasBasicUsage,
    hasLeadParagraph,
    issues,
    isCompliant: issues.length === 0
  };
}

/**
 * Get all component directories
 */
function getComponentDirectories() {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
}

/**
 * Generate a detailed report
 */
function generateReport(componentResults) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 GHOSTUI DOCUMENTATION AUDIT REPORT');
  console.log('='.repeat(80) + '\n');
  
  // Summary statistics
  console.log('📈 SUMMARY');
  console.log('-'.repeat(80));
  console.log(`Total components analyzed: ${results.total}`);
  console.log(`Fully compliant: ${results.compliant} (${Math.round(results.compliant / results.total * 100)}%)`);
  console.log(`Need improvements: ${results.total - results.compliant} (${Math.round((results.total - results.compliant) / results.total * 100)}%)`);
  console.log('');
  
  // Issue breakdown
  console.log('🔍 ISSUE BREAKDOWN');
  console.log('-'.repeat(80));
  console.log(`Missing API documentation: ${results.summary.missingAPI.length}`);
  console.log(`Insufficient examples (< ${MIN_EXAMPLES}): ${results.summary.insufficientExamples.length}`);
  console.log(`Missing Basic Usage section: ${results.summary.missingBasicUsage.length}`);
  console.log(`Missing lead paragraph: ${results.summary.missingLeadParagraph.length}`);
  console.log(`Styling inconsistencies: ${results.summary.stylingIssues.length}`);
  console.log('');
  
  // Priority categorization
  const minimalDocs = componentResults.filter(r => 
    r.issues.length >= 3 || (!r.hasPropsTable && r.exampleCount < 2)
  );
  
  const partialDocs = componentResults.filter(r => 
    r.issues.length > 0 && r.issues.length < 3 && (r.hasPropsTable || r.exampleCount >= 2)
  );
  
  const wellDocumented = componentResults.filter(r => r.isCompliant);
  
  // Priority 1: Minimal Documentation
  if (minimalDocs.length > 0) {
    console.log('🚨 PRIORITY 1: MINIMAL DOCUMENTATION (' + minimalDocs.length + ' components)');
    console.log('-'.repeat(80));
    console.log('These components need significant documentation improvements:\n');
    
    minimalDocs.forEach(result => {
      console.log(`  ❌ ${result.componentName}`);
      console.log(`     Examples: ${result.exampleCount}/${MIN_EXAMPLES}`);
      console.log(`     API Docs: ${result.hasPropsTable ? '✓' : '✗'}`);
      result.issues.forEach(issue => {
        console.log(`     - ${issue}`);
      });
      console.log('');
    });
  }
  
  // Priority 2: Partial Documentation
  if (partialDocs.length > 0) {
    console.log('⚠️  PRIORITY 2: PARTIAL DOCUMENTATION (' + partialDocs.length + ' components)');
    console.log('-'.repeat(80));
    console.log('These components have basic docs but need improvements:\n');
    
    partialDocs.forEach(result => {
      console.log(`  ⚠️  ${result.componentName}`);
      console.log(`     Examples: ${result.exampleCount}/${MIN_EXAMPLES}`);
      console.log(`     API Docs: ${result.hasPropsTable ? '✓' : '✗'}`);
      result.issues.forEach(issue => {
        console.log(`     - ${issue}`);
      });
      console.log('');
    });
  }
  
  // Well-documented components
  if (wellDocumented.length > 0) {
    console.log('✅ WELL-DOCUMENTED COMPONENTS (' + wellDocumented.length + ' components)');
    console.log('-'.repeat(80));
    console.log('These components meet all documentation standards:\n');
    
    wellDocumented.forEach(result => {
      console.log(`  ✓ ${result.componentName} (${result.exampleCount} examples)`);
    });
    console.log('');
  }
  
  // Detailed component list
  console.log('📋 DETAILED COMPONENT LIST');
  console.log('-'.repeat(80));
  console.log('');
  
  componentResults.forEach(result => {
    const status = result.isCompliant ? '✅' : '❌';
    console.log(`${status} ${result.componentName}`);
    console.log(`   Examples: ${result.exampleCount} | API: ${result.hasPropsTable ? 'Yes' : 'No'} | Basic Usage: ${result.hasBasicUsage ? 'Yes' : 'No'} | Lead: ${result.hasLeadParagraph ? 'Yes' : 'No'}`);
    
    if (result.issues.length > 0) {
      result.issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    }
    console.log('');
  });
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS');
  console.log('-'.repeat(80));
  console.log('1. Start with Priority 1 components (minimal documentation)');
  console.log('2. Add PropsTable for API documentation where missing');
  console.log(`3. Ensure at least ${MIN_EXAMPLES} ComponentPlayground examples per component`);
  console.log('4. Add "Basic Usage" section with minimal working example');
  console.log('5. Include lead paragraph with "lead" class for component description');
  console.log('6. Apply consistent styling patterns (spacing, typography)');
  console.log('7. Use well-documented components as reference examples');
  console.log('');
  
  console.log('='.repeat(80));
  console.log('End of report');
  console.log('='.repeat(80) + '\n');
}

/**
 * Save report to JSON file
 */
function saveJSONReport(componentResults) {
  const reportData = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      compliant: results.compliant,
      needsImprovement: results.total - results.compliant,
      compliancePercentage: Math.round(results.compliant / results.total * 100)
    },
    issueBreakdown: results.summary,
    components: componentResults.map(r => ({
      name: r.componentName,
      status: r.isCompliant ? 'compliant' : 'needs-improvement',
      exampleCount: r.exampleCount,
      hasPropsTable: r.hasPropsTable,
      hasBasicUsage: r.hasBasicUsage,
      hasLeadParagraph: r.hasLeadParagraph,
      issues: r.issues
    }))
  };
  
  const reportPath = path.join(__dirname, '../docs-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`📄 JSON report saved to: ${reportPath}\n`);
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Starting documentation audit...\n');
  
  const componentDirs = getComponentDirectories();
  const componentResults = [];
  
  componentDirs.forEach(componentName => {
    const pagePath = path.join(COMPONENTS_DIR, componentName, 'page.tsx');
    
    if (fs.existsSync(pagePath)) {
      results.total++;
      const result = analyzeComponentPage(componentName, pagePath);
      componentResults.push(result);
      
      if (result.isCompliant) {
        results.compliant++;
      }
    } else {
      console.warn(`⚠️  Warning: No page.tsx found for ${componentName}`);
    }
  });
  
  // Generate and display report
  generateReport(componentResults);
  
  // Save JSON report
  saveJSONReport(componentResults);
  
  // Exit with appropriate code
  const exitCode = results.compliant === results.total ? 0 : 1;
  process.exit(exitCode);
}

// Run the audit
main();
