# Documentation Maintenance Guide

**Purpose:** Guide for maintaining GhostUI documentation quality and compliance  
**Audience:** Developers, documentation maintainers, and contributors  
**Last Updated:** December 5, 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Developer Tooling](#developer-tooling)
3. [Daily Workflow](#daily-workflow)
4. [Audit Tool Usage](#audit-tool-usage)
5. [Common Issues and Fixes](#common-issues-and-fixes)
6. [CI/CD Integration](#cicd-integration)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Overview

This guide helps you maintain the high quality and consistency of GhostUI component documentation. The documentation follows strict standards defined in `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`, and we use automated tools to ensure compliance.

### Key Principles

1. **Consistency is paramount** - All component pages should look and feel the same
2. **Automation first** - Use tools to catch issues before manual review
3. **Test everything** - Always verify changes render correctly
4. **Document exceptions** - If you deviate from standards, document why

### Documentation Standards

All component documentation must include:
- ✅ H1 title with proper responsive classes
- ✅ Lead paragraph introducing the component
- ✅ At least 3 usage examples with ComponentPlayground
- ✅ Complete API documentation with PropsTable
- ✅ Consistent typography and spacing
- ✅ Proper preview container styling

---

## Developer Tooling

The documentation system includes several tools to help you work efficiently:

### VS Code Snippets

Type these prefixes in VS Code and press Tab to insert templates:

- **`ghostui-page`** - Complete component page template
- **`ghostui-h1`** - H1 header with correct styling
- **`ghostui-h2`** - H2 header with correct styling
- **`ghostui-h3`** - H3 header with correct styling
- **`ghostui-lead`** - Lead paragraph
- **`ghostui-section`** - Section with header
- **`ghostui-playground`** - ComponentPlayground
- **`ghostui-preview`** - Preview container
- **`ghostui-props`** - Props data array
- **`ghostui-code`** - Inline code element
- **`ghostui-info`** - Info box
- **`ghostui-feature`** - Feature box
- **`ghostui-a11y`** - Accessibility section

### NPM Scripts

Quick access to common operations:

```bash
# Create new component page
npm run docs:new -- component-name

# Validate documentation
npm run docs:validate

# Apply automated fixes (preview)
npm run audit:fix:dry

# Apply automated fixes
npm run audit:fix

# Audit specific component
npm run audit:component component-name

# Install Git hooks
npm run hooks:install
```

### Pre-commit Hook

Automatically validates documentation before commits:

```bash
# Install the hook
npm run hooks:install

# The hook will run automatically on commit
git commit -m "docs: update component"

# Bypass if needed (not recommended)
git commit --no-verify
```

### Component Page Generator

Quickly scaffold new component pages:

```bash
npm run docs:new -- spooky-button
```

This creates:
- Component directory
- Page file with template
- Proper structure and styling
- TODO comments for customization

### Additional Resources

- **Adding Components Guide**: `apps/docs/ADDING_NEW_COMPONENTS.md`
- **Style Guide**: `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- **Hooks Documentation**: `.githooks/README.md`

---

## Daily Workflow

### Before Starting Work

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Run audit to see current state**
   ```bash
   npm run audit
   ```

3. **Review any existing issues**
   - Check audit report for your component
   - Note any compliance issues to address

### While Working on Documentation

1. **Follow the template**
   - Use `apps/docs/COMPONENT_TEMPLATE.tsx` as reference
   - Copy structure from well-documented components

2. **Use the style guide**
   - Reference `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
   - Copy exact class names from examples

3. **Test as you go**
   ```bash
   npm run dev
   ```
   - View your changes in the browser
   - Check responsive behavior (mobile, tablet, desktop)
   - Verify interactive elements work

### Before Committing

1. **Run audit on your component**
   ```bash
   npm run audit -- --component=your-component-name
   ```

2. **Fix any issues found**
   ```bash
   # Preview fixes
   npm run audit -- --component=your-component-name --fix --dry-run
   
   # Apply fixes
   npm run audit -- --component=your-component-name --fix
   ```

3. **Verify changes**
   ```bash
   npm run dev
   ```
   - Check that your component page renders correctly
   - Verify all examples work
   - Test responsive design

4. **Run full audit (optional but recommended)**
   ```bash
   npm run audit
   ```
   - Ensures you didn't break other pages
   - Confirms overall compliance

### Committing Changes

```bash
# Stage your changes
git add apps/docs/app/docs/components/your-component/page.tsx

# Commit with descriptive message
git commit -m "docs: update your-component documentation

- Add missing lead paragraph
- Fix H2 typography classes
- Add third usage example
- Complete API documentation

Resolves audit issues for your-component"

# Push changes
git push origin your-branch
```

---

## Audit Tool Usage

### Basic Commands

**Audit all pages:**
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

**Apply automated fixes (preview):**
```bash
npm run audit -- --fix --dry-run
```

**Apply automated fixes (for real):**
```bash
npm run audit -- --fix
```

### Command Options

| Option | Description | Example |
|--------|-------------|---------|
| `--component=<name>` | Audit specific component | `--component=gooey-button` |
| `--report` | Generate detailed report | `--report` |
| `--format=<type>` | Report format (json, markdown, html) | `--format=html` |
| `--fix` | Apply automated fixes | `--fix` |
| `--dry-run` | Preview fixes without applying | `--fix --dry-run` |
| `--output-dir=<path>` | Custom output directory | `--output-dir=./reports` |

### Understanding Audit Output

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

### Reading Issue Details

Each issue includes:
- **Rule ID**: Identifies the specific rule violated
- **Category**: Type of issue (typography, spacing, etc.)
- **Severity**: error, warning, or info
- **Message**: Description of the problem
- **Line Number**: Where the issue occurs
- **Current Value**: What's currently in the code
- **Expected Value**: What it should be
- **Recommendation**: How to fix it
- **Auto-fixable**: Whether it can be automatically fixed

Example:
```
❌ H2 Typography (h2-typography)
   Line 45: <h2 className="text-3xl font-display text-ghost-white">
   Expected: text-2xl md:text-3xl font-display text-ghost-orange tracking-wide
   Auto-fixable: Yes
```

---

## Common Issues and Fixes

### Typography Issues

#### Issue: H1 Missing Responsive Classes

**Problem:**
```tsx
<h1 className="text-3xl font-display text-ghost-orange">
  Component Name
</h1>
```

**Fix:**
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide">
  Component Name
</h1>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `md:text-4xl lg:text-5xl` and `tracking-wide`

---

#### Issue: H2 Wrong Color or Missing Classes

**Problem:**
```tsx
<h2 className="text-3xl font-display text-ghost-white">
  Section Title
</h2>
```

**Fix:**
```tsx
<h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
  Section Title
</h2>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change to `text-2xl md:text-3xl`, use `text-ghost-orange`, add `tracking-wide`

---

#### Issue: Missing Lead Paragraph

**Problem:**
```tsx
<h1>Component Name</h1>
<p className="text-ghost-white/80">
  This is a component...
</p>
```

**Fix:**
```tsx
<h1>Component Name</h1>
<p className="lead text-ghost-white/90">
  A [component type] that [primary function]. Features [key characteristics]
  and [special behavior], perfect for [use case].
</p>
```

**How to fix:**
- ✋ Manual only - requires writing appropriate content
- Use template from `COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- See `FIX_PLAN.md` Phase 2 for component-specific examples

---

#### Issue: Inline Code Missing Styling

**Problem:**
```tsx
<code>variant</code>
<code className="text-ghost-green">variant</code>
```

**Fix:**
```tsx
<code className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs">
  variant
</code>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add all required classes

---

### Preview Container Issues

#### Issue: Wrong Border Color

**Problem:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-gray/20">
  {/* preview */}
</div>
```

**Fix:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change `border-ghost-gray/20` to `border-ghost-orange/30`

---

#### Issue: Missing Border Radius

**Problem:**
```tsx
<div className="p-8 bg-ghost-gray/10 border border-ghost-orange/30">
  {/* preview */}
</div>
```

**Fix:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Add `rounded-lg`

---

#### Issue: Hardcoded Colors

**Problem:**
```tsx
<div style={{ backgroundColor: '#1a1a1a' }}>
  {/* content */}
</div>
```

**Fix:**
```tsx
<div style={{ backgroundColor: 'var(--ghost-dark)' }}>
  {/* content */}
</div>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Replace with CSS variable

**Common replacements:**
- `#1a1a1a` → `var(--ghost-dark)`
- `#ff6b35` → `var(--ghost-orange)`
- `#4ade80` → `var(--ghost-green)`
- `#ffffff` → `var(--ghost-white)`

---

### Spacing Issues

#### Issue: Wrong Page Container Spacing

**Problem:**
```tsx
<div className="space-y-8">
  {/* page content */}
</div>
```

**Fix:**
```tsx
<div className="space-y-12">
  {/* page content */}
</div>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change `space-y-8` to `space-y-12`

---

#### Issue: Inconsistent Preview Padding

**Problem:**
```tsx
<div className="p-4 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**Fix:**
```tsx
<div className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30">
  {/* preview */}
</div>
```

**How to fix:**
- ⚡ Auto-fixable: `npm run audit -- --fix`
- ✋ Manual: Change to `p-8` (or `py-12` for large, `p-6` for compact)

---

### Structural Issues

#### Issue: Sections Out of Order

**Problem:**
```
1. Header
2. Examples
3. Basic Usage
4. API
```

**Fix:**
```
1. Header (H1 + lead paragraph)
2. Basic Usage (first ComponentPlayground)
3. API (PropsTable)
4. Examples (additional ComponentPlaygrounds)
5. Variants
6. Advanced Usage
```

**How to fix:**
- ✋ Manual only - requires reorganizing content
- Cut and paste sections into correct order
- Don't lose any content
- Test that all links still work

---

#### Issue: ComponentPlayground Positioned Incorrectly

**Problem:**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<h2>The Spirit Medium</h2>
<p>Some text...</p>

<ComponentPlayground {...basicUsage} />
```

**Fix:**
```tsx
<h1>Component Name</h1>
<p className="lead">Description</p>

<ComponentPlayground {...basicUsage} />

<h2>Additional Examples</h2>
<p>More examples...</p>
```

**How to fix:**
- ✋ Manual only - requires moving content
- Move ComponentPlayground immediately after lead paragraph
- Remove or relocate intervening H2 headers

---

#### Issue: Insufficient Examples

**Problem:**
Only 2 ComponentPlayground examples

**Fix:**
Add a third example showing:
- Variants (different visual styles)
- Advanced usage (complex configuration)
- Integration (using with other components)

**How to fix:**
- ✋ Manual only - requires creating content
- Use ComponentPlayground template
- Ensure code is copy-paste ready
- Test that example works

---

### API Documentation Issues

#### Issue: Missing PropsTable

**Problem:**
No API documentation section

**Fix:**
```tsx
<section className="space-y-6 mt-12">
  <h2 className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide">
    API Reference
  </h2>
  <PropsTable props={componentProps} />
</section>
```

**How to fix:**
- ✋ Manual only - requires documenting props
- Review component source code
- Create props array with name, type, default, description
- Add PropsTable to page

---

#### Issue: Incomplete Prop Definitions

**Problem:**
```tsx
{
  name: "variant",
  type: "string",
  description: "The variant"
  // Missing: default
}
```

**Fix:**
```tsx
{
  name: "variant",
  type: '"primary" | "secondary" | "ghost"',
  default: '"primary"',
  description: "The visual style variant of the component"
}
```

**How to fix:**
- ✋ Manual only - requires checking source code
- Add `default` field to each prop
- Use `"undefined"` if no default exists
- Improve description clarity

---

## CI/CD Integration

### Pre-commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# Run audit on staged documentation files
STAGED_DOCS=$(git diff --cached --name-only --diff-filter=ACM | grep "app/docs/components/.*/page.tsx")

if [ -n "$STAGED_DOCS" ]; then
  echo "Running documentation audit..."
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

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### GitHub Actions Workflow

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
      
      - name: Check compliance
        run: |
          # Fail if compliance is below 95%
          COMPLIANCE=$(node -e "
            const report = require('./audit-reports/audit-report-*.json');
            const rate = (report.summary.compliantPages / report.summary.totalPages) * 100;
            console.log(rate);
          ")
          
          if (( $(echo "$COMPLIANCE < 95" | bc -l) )); then
            echo "❌ Compliance is ${COMPLIANCE}%, below 95% threshold"
            exit 1
          fi
          
          echo "✅ Compliance is ${COMPLIANCE}%"
        working-directory: apps/docs
```

### Package.json Scripts

Add these scripts to `apps/docs/package.json`:

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

### Issue: Audit tool not finding component

**Symptom:**
```
Component "my-component" not found
```

**Solution:**
- Check component name spelling
- Ensure component page exists at `apps/docs/app/docs/components/my-component/page.tsx`
- Use kebab-case for component name

---

### Issue: Fixes not being applied

**Symptom:**
```
Fix did not modify the content
```

**Causes:**
1. Element structure doesn't match expectations
2. Line number matching is imprecise
3. Complex JSX expressions

**Solutions:**
- Apply fixes manually
- Check that element exists in file
- Verify className is not in a template literal or expression

---

### Issue: Syntax errors after applying fixes

**Symptom:**
Page doesn't render after running `--fix`

**Solution:**
1. Check git diff to see what changed
2. Revert problematic changes
3. Apply fixes manually
4. Report issue to maintainers

---

### Issue: Audit reports false positives

**Symptom:**
Audit reports issues that don't exist

**Solution:**
1. Verify the issue manually
2. Check if element is in a different format than expected
3. Document as exception if intentional
4. Report to maintainers if it's a bug

---

### Issue: Can't generate reports

**Symptom:**
```
Failed to write report
```

**Solution:**
- Ensure `audit-reports` directory exists
- Check write permissions
- Verify disk space
- Try different output directory: `--output-dir=./reports`

---

## Best Practices

### 1. Run Audit Frequently

- Before starting work
- After making changes
- Before committing
- In CI/CD pipeline

### 2. Fix Issues Incrementally

- Apply automated fixes first (quick wins)
- Then tackle manual fixes by priority
- Test thoroughly after each batch
- Commit changes in logical groups

### 3. Use Dry-Run Mode

```bash
npm run audit -- --fix --dry-run
```

- Preview changes before applying
- Review diffs carefully
- Understand what will change
- Catch potential issues early

### 4. Test Responsive Design

- Check mobile (320px, 375px, 414px)
- Check tablet (768px, 1024px)
- Check desktop (1280px, 1920px)
- Verify typography scales correctly
- Ensure examples fit on screen

### 5. Document Exceptions

If you need to deviate from standards:

1. Document why in code comments
2. Add to exception list in style guide
3. Get team approval
4. Update audit rules if needed

Example:
```tsx
{/* Exception: Using text-lg for H3 to match component theme */}
<h3 className="text-lg font-semibold text-purple-100">
  Special Section
</h3>
```

### 6. Keep Style Guide Updated

- Document new patterns as they emerge
- Update examples when standards change
- Add learnings from issues encountered
- Review and refine regularly

### 7. Collaborate on Fixes

- Review each other's documentation
- Share tips and tricks
- Discuss edge cases
- Maintain consistency as a team

### 8. Monitor Compliance Trends

- Track compliance rate over time
- Identify problematic patterns
- Celebrate improvements
- Address declining compliance quickly

---

## Quick Reference

### Essential Commands

```bash
# Audit all pages
npm run audit

# Audit specific component
npm run audit -- --component=gooey-button

# Preview fixes
npm run audit -- --fix --dry-run

# Apply fixes
npm run audit -- --fix

# Generate HTML report
npm run audit -- --report --format=html
```

### File Locations

- **Style Guide:** `apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`
- **Template:** `apps/docs/COMPONENT_TEMPLATE.tsx`
- **Audit Tool:** `apps/docs/scripts/audit/`
- **Reports:** `apps/docs/audit-reports/`
- **Component Pages:** `apps/docs/app/docs/components/*/page.tsx`

### Key Classes to Remember

```tsx
// H1
className="text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide"

// H2
className="text-2xl md:text-3xl font-display text-ghost-orange tracking-wide"

// H3
className="text-xl md:text-2xl font-semibold text-ghost-white"

// Lead paragraph
className="lead text-ghost-white/90"

// Inline code
className="px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs"

// Page container
className="space-y-12"

// Preview container
className="p-8 bg-ghost-gray/10 rounded-lg border border-ghost-orange/30"
```

---

## Getting Help

### Resources

1. **Style Guide:** Complete standards and examples
2. **Fix Plan:** Detailed fix strategies for all issue types
3. **Issue Categorization:** Understanding each issue type
4. **Audit Reports:** Detailed analysis of current state

### Support Channels

1. **Check existing documentation** - Most answers are in the style guide
2. **Review audit reports** - Detailed information about each issue
3. **Look at compliant pages** - Use as reference examples
4. **Ask the team** - Collaborate on complex issues

### Reporting Issues

If you find bugs in the audit tool:

1. Document the issue clearly
2. Include example code that triggers it
3. Note expected vs actual behavior
4. Share audit output
5. Report to maintainers

---

**Last Updated:** December 5, 2025  
**Version:** 1.0.0  
**Maintainer:** GhostUI Documentation Team
