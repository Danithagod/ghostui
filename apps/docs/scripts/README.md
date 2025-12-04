# Documentation Audit Tools

This directory contains comprehensive tools for analyzing, maintaining, and fixing GhostUI documentation.

---

## Table of Contents

1. [Overview](#overview)
2. [Audit Tools](#audit-tools)
3. [Usage Guide](#usage-guide)
4. [Command Reference](#command-reference)
5. [Understanding Reports](#understanding-reports)
6. [Integration](#integration)

---

## Overview

The GhostUI documentation audit system provides automated tools to ensure all component documentation meets quality standards. The system includes:

- **Comprehensive Audit Tool** (`audit/`) - Full AST-based analysis with detailed validation rules
- **Simple Audit Script** (`audit-docs.js`) - Quick content-level checks
- **Automated Fixer** - Applies fixes to auto-fixable issues
- **Report Generator** - Creates reports in JSON, Markdown, and HTML formats

### Key Features

✅ **Automated validation** of typography, spacing, structure, and API documentation  
✅ **Auto-fix capability** for 85%+ of common issues  
✅ **Multiple report formats** (JSON, Markdown, HTML)  
✅ **Component-specific audits** for targeted analysis  
✅ **CI/CD integration** ready  
✅ **Dry-run mode** for previewing changes  

---

## Audit Tools

### 1. Comprehensive Audit Tool (`audit/`)

**Location:** `apps/docs/scripts/audit/`

A full-featured audit system that performs deep analysis of component documentation using AST parsing and comprehensive validation rules.

**What It Checks:**

#### Typography (Requirements 1.1-1.5, 10.1)
- H1 headers: `text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide`
- H2 headers: `text-2xl md:text-3xl font-display text-ghost-orange tracking-wide`
- H3 headers: `text-xl md:text-2xl font-semibold text-ghost-white`
- Lead paragraphs: `lead text-ghost-white/90`
- Inline code: `px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs`

#### Spacing (Requirements 2.1-2.5)
- Page container: `space-y-12`
- Section containers: `space-y-6 mt-12`
- Header-content groups: `space-y-4`
- Preview containers: `py-12`, `p-8`, or `p-6`

#### Structure (Requirements 3.1-3.2, 6.1-6.3)
- Minimum 3 ComponentPlayground examples
- Correct section order (Header → Basic Usage → API → Examples)
- First ComponentPlayground positioned correctly
- Lead paragraph present

#### API Documentation (Requirements 4.1-4.2)
- PropsTable presence
- Complete prop definitions (name, type, default, description)

#### Preview Containers (Requirements 9.2-9.5, 10.4)
- Border styling: `border-ghost-orange/30`
- Border radius: `rounded-lg`
- CSS variables instead of hardcoded colors
- Code block scrolling: `overflow-x-auto`

**Components:**

- `FileScanner.ts` - Discovers and reads component pages
- `TSXParser.ts` - Parses TSX files into AST
- `AuditEngine.ts` - Orchestrates validation process
- `ReportGenerator.ts` - Creates formatted reports
- `DocumentationFixer.ts` - Applies automated fixes
- `*Rules.ts` - Individual validation rules
- `cli.ts` - Command-line interface
- `runner.ts` - Main execution logic

### 2. Simple Audit Script (`audit-docs.js`)

**Location:** `apps/docs/scripts/audit-docs.js`

A lightweight script for quick content-level checks without deep AST analysis.

**What It Checks:**

1. **API Documentation Presence** - PropsTable component exists
2. **Minimum Example Count** - At least 2 ComponentPlayground instances
3. **Basic Usage Section** - "Basic Usage" section present
4. **Lead Paragraph** - Lead paragraph with "lead" class
5. **Styling Patterns** - Basic class name patterns

**When to Use:**
- Quick checks during development
- CI/CD pre-checks before full audit
- Lightweight validation

---

## Usage Guide

### Basic Commands

**Audit all component pages:**
```bash
npm run audit
```

**Audit specific component:**
```bash
npm run audit -- --component=gooey-button
```

**Generate detailed report:**
```bash
npm run audit -- --report --format=markdown
```

**Preview automated fixes:**
```bash
npm run audit -- --fix --dry-run
```

**Apply automated fixes:**
```bash
npm run audit -- --fix
```

**Simple audit (quick check):**
```bash
npm run audit:docs
```

### Workflow Examples

#### 1. Before Committing Changes

```bash
# Check your component
npm run audit -- --component=your-component

# Preview fixes
npm run audit -- --component=your-component --fix --dry-run

# Apply fixes if needed
npm run audit -- --component=your-component --fix

# Verify changes
npm run dev
```

#### 2. Full Documentation Review

```bash
# Run comprehensive audit
npm run audit

# Generate HTML report for review
npm run audit -- --report --format=html

# Open report in browser
# File: apps/docs/audit-reports/audit-report-*.html
```

#### 3. Batch Fixing Issues

```bash
# Preview all fixes
npm run audit -- --fix --dry-run

# Review the changes shown

# Apply fixes
npm run audit -- --fix

# Verify pages still render
npm run dev

# Run audit again to see improvement
npm run audit
```

---

## Command Reference

### Comprehensive Audit Tool

**Command:** `npm run audit -- [options]`

**Options:**

| Option | Description | Example |
|--------|-------------|---------|
| `--component=<name>` | Audit specific component | `--component=gooey-button` |
| `--report` | Generate detailed report | `--report` |
| `--format=<type>` | Report format: json, markdown, html | `--format=html` |
| `--fix` | Apply automated fixes | `--fix` |
| `--dry-run` | Preview fixes without applying | `--fix --dry-run` |
| `--output-dir=<path>` | Custom output directory | `--output-dir=./reports` |

**Examples:**

```bash
# Audit all pages
npm run audit

# Audit specific component with report
npm run audit -- --component=gooey-button --report --format=markdown

# Apply fixes to all pages (with preview)
npm run audit -- --fix --dry-run

# Apply fixes to specific component
npm run audit -- --component=gooey-button --fix

# Generate HTML report
npm run audit -- --report --format=html --output-dir=./my-reports
```

### Simple Audit Script

**Command:** `npm run audit:docs`

**Output:**
- Console report with summary and issues
- JSON report: `docs-audit-report.json`

**Exit Codes:**
- `0` - All components compliant
- `1` - Some components need improvements

---

## Understanding Reports

### Console Output

**Summary Section:**
```
📈 Overall Statistics:
   Total Pages:        21
   Compliant:          15 (71%)
   With Issues:        6
   Total Issues:       45
   Average Score:      85%
```

**Issues by Category:**
```
📂 Issues by Category:
   Typography          12
   Spacing             8
   Structure           15
   API                 5
   Preview             5
```

**Pages Needing Attention:**
```
🎯 Pages Needing Most Attention:
   1. gooey-drawer                   15 issue(s), Score: 45%
   2. spectral-tabs                  12 issue(s), Score: 52%
   3. spirit-input                   10 issue(s), Score: 58%
```

### Issue Details

Each issue includes:

- **Rule ID**: Identifies the specific rule violated
- **Category**: Type of issue (typography, spacing, structure, api, preview)
- **Severity**: error, warning, or info
- **Message**: Description of the problem
- **Line Number**: Where the issue occurs (if applicable)
- **Current Value**: What's currently in the code
- **Expected Value**: What it should be
- **Recommendation**: How to fix it
- **Auto-fixable**: Whether it can be automatically fixed

**Example:**
```
❌ H2 Typography (h2-typography)
   Category: typography
   Severity: error
   Line 45: <h2 className="text-3xl font-display text-ghost-white">
   Expected: text-2xl md:text-3xl font-display text-ghost-orange tracking-wide
   Recommendation: Update H2 classes to match style guide
   Auto-fixable: Yes
```

### Report Formats

#### JSON Report
- Machine-readable format
- Complete issue details
- Suitable for programmatic processing
- Location: `audit-reports/audit-report-*.json`

#### Markdown Report
- Human-readable format
- Formatted tables and lists
- Suitable for documentation
- Location: `audit-reports/audit-report-*.md`

#### HTML Report
- Interactive format
- Filtering and sorting capabilities
- Suitable for team review
- Location: `audit-reports/audit-report-*.html`

---

## Integration

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# Run audit on staged documentation files
STAGED_DOCS=$(git diff --cached --name-only --diff-filter=ACM | grep "app/docs/components/.*/page.tsx")

if [ -n "$STAGED_DOCS" ]; then
  echo "Running documentation audit..."
  cd apps/docs
  npm run audit
  
  if [ $? -ne 0 ]; then
    echo "❌ Documentation audit failed. Please fix issues before committing."
    echo "Run: npm run audit -- --fix"
    exit 1
  fi
  
  echo "✅ Documentation audit passed"
fi

exit 0
```

Make executable:
```bash
chmod +x .git/hooks/pre-commit
```

### GitHub Actions

Add to `.github/workflows/docs-audit.yml`:

```yaml
name: Documentation Audit

on:
  pull_request:
    paths:
      - 'apps/docs/app/docs/components/**/page.tsx'
  push:
    branches:
      - main
    paths:
      - 'apps/docs/app/docs/components/**/page.tsx'

jobs:
  audit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        working-directory: apps/docs
      
      - name: Run documentation audit
        run: npm run audit -- --report --format=json
        working-directory: apps/docs
      
      - name: Upload audit report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: audit-report
          path: apps/docs/audit-reports/*.json
      
      - name: Check compliance threshold
        run: |
          # Fail if compliance is below 95%
          echo "Checking compliance threshold..."
          # Add compliance check logic here
        working-directory: apps/docs
```

### Package.json Scripts

Recommended scripts for `apps/docs/package.json`:

```json
{
  "scripts": {
    "audit:docs": "node scripts/audit-docs.js",
    "audit": "node --import tsx scripts/audit-cli.ts",
    "audit:fix": "npm run audit -- --fix",
    "audit:report": "npm run audit -- --report --format=html",
    "audit:ci": "npm run audit -- --report --format=json"
  }
}
```

---

## Troubleshooting

### Component Not Found

**Error:** `Component "my-component" not found`

**Solution:**
- Check component name spelling (use kebab-case)
- Ensure page exists at `apps/docs/app/docs/components/my-component/page.tsx`
- Try listing all components: `npm run audit`

### Fixes Not Applied

**Error:** `Fix did not modify the content`

**Causes:**
- Element structure doesn't match expectations
- Complex JSX expressions
- Template literals in className

**Solution:**
- Apply fixes manually
- Check git diff to see what changed
- Report issue if it's a bug

### Syntax Errors After Fixing

**Error:** Page doesn't render after `--fix`

**Solution:**
1. Check git diff: `git diff`
2. Revert problematic changes: `git checkout -- path/to/file`
3. Apply fixes manually
4. Report issue to maintainers

---

## Additional Resources

- **Style Guide:** `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- **Maintenance Guide:** `apps/docs/DOCUMENTATION_MAINTENANCE_GUIDE.md`
- **Common Issues:** `apps/docs/COMMON_ISSUES_AND_FIXES.md`
- **Fix Plan:** `apps/docs/FIX_PLAN.md`
- **Issue Categorization:** `apps/docs/ISSUE_CATEGORIZATION.md`

---

## Architecture

### Audit System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Documentation System                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   File       │      │   Audit      │      │  Report   │ │
│  │   Scanner    │─────▶│   Engine     │─────▶│ Generator │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                     │       │
│         │                      │                     │       │
│         ▼                      ▼                     ▼       │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   TSX        │      │  Validation  │      │   JSON    │ │
│  │   Parser     │      │   Rules      │      │  Report   │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│                                │                             │
│                                ▼                             │
│                        ┌──────────────┐                     │
│                        │Documentation │                     │
│                        │    Fixer     │                     │
│                        └──────────────┘                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Validation Rules

The audit system includes comprehensive validation rules organized by category:

- **Typography Rules** (`typographyRules.ts`)
  - H1, H2, H3, H4 typography
  - Lead paragraph styling
  - Inline code styling

- **Spacing Rules** (`spacingRules.ts`)
  - Page container spacing
  - Section container spacing
  - Header-content spacing
  - Preview container padding

- **Structure Rules** (`structureRules.ts`)
  - Minimum examples
  - Section order
  - ComponentPlayground positioning
  - Header section structure

- **API Rules** (`apiRules.ts`)
  - PropsTable presence
  - Prop object structure
  - Complete prop definitions

- **Preview Rules** (`previewRules.ts`)
  - Border styling
  - Border radius
  - Theme variable usage
  - Code block scrolling

---

**Last Updated:** December 5, 2025  
**Version:** 2.0.0  
**Maintainer:** GhostUI Documentation Team


---

## CI/CD Integration

The audit system is fully integrated with CI/CD pipelines for automated quality checks.

### GitHub Actions Workflow

**Location:** `.github/workflows/docs-audit.yml`

The workflow automatically runs on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`
- Manual triggers via workflow_dispatch

**Workflow Steps:**

1. **Setup** - Checkout code, setup Node.js, install dependencies
2. **Run Audit** - Execute audit with JSON output
3. **Generate Reports** - Create markdown reports
4. **Upload Artifacts** - Store reports for 30 days
5. **Check Compliance** - Verify score meets threshold (80%)
6. **PR Comments** - Post results on pull requests

### CI-Specific Scripts

```bash
# Run audit with JSON output (for CI)
npm run audit:ci

# Generate markdown report
npm run audit:report

# Generate HTML report
npm run audit:html

# Check compliance threshold
npm run audit:check
```

### Compliance Checking

The `check-compliance.ts` script validates that documentation meets quality standards:

```bash
npm run audit:check
```

**Features:**
- Reads latest audit report
- Compares score against threshold (default: 80%)
- Exits with code 1 if below threshold
- Provides helpful suggestions for improvement
- Shows auto-fixable issue count

**Configuration:** `.audit-config.json`

```json
{
  "complianceThreshold": 80,
  "failOnThreshold": true,
  "reportFormats": ["json", "markdown"],
  "outputDirectory": "audit-reports",
  "rules": {
    "typography": { "enabled": true, "severity": "error" },
    "spacing": { "enabled": true, "severity": "error" },
    "structure": { "enabled": true, "severity": "warning" },
    "api": { "enabled": true, "severity": "warning" },
    "preview": { "enabled": true, "severity": "error" }
  }
}
```

### Local CI Testing

Test the CI workflow locally before pushing:

```bash
# Run the same checks as CI
cd apps/docs
npm run audit:ci
npm run audit:check

# If compliance fails, apply fixes
npm run audit -- --fix

# Verify compliance
npm run audit:check
```

### Automated Reporting

**Artifact Storage:**
- Reports uploaded as workflow artifacts
- Retained for 30 days
- Available in JSON and Markdown formats

**PR Comments:**
- Automatic comment on pull requests
- Includes compliance score and summary
- Links to full report in artifacts

### Best Practices for CI/CD

1. **Run audits locally** before pushing
2. **Fix auto-fixable issues** first: `npm run audit -- --fix`
3. **Review reports** in workflow artifacts
4. **Keep threshold high** (80%+) for quality
5. **Monitor trends** over time

### Troubleshooting CI Failures

**Build failing due to compliance:**

1. Download audit report from workflow artifacts
2. Review issues and categories
3. Run `npm run audit -- --fix` locally
4. Manually fix remaining issues
5. Push changes and re-run workflow

**No reports generated:**

1. Check audit script ran successfully
2. Verify `audit-reports` directory exists
3. Review workflow logs for errors
4. Check file permissions

For detailed CI/CD documentation, see `CI_CD_INTEGRATION.md`.

---
