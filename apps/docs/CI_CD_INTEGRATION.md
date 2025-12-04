# CI/CD Integration for Documentation Audit

This document describes the CI/CD integration for the GhostUI documentation audit system.

## Overview

The documentation audit system is integrated into the CI/CD pipeline to ensure all component documentation pages maintain consistent quality and compliance with the style guide.

## GitHub Actions Workflow

The workflow is defined in `.github/workflows/docs-audit.yml` and runs automatically on:

- **Push events** to `main` or `develop` branches
- **Pull requests** targeting `main` or `develop` branches
- **Manual triggers** via workflow_dispatch

The workflow only runs when relevant files are changed:
- Component documentation pages (`apps/docs/app/docs/components/**/*.tsx`)
- Audit scripts (`apps/docs/scripts/audit/**`)
- Style guide (`apps/docs/COMPONENT_DOCUMENTATION_STYLE_GUIDE.md`)

## Workflow Steps

### 1. Setup
- Checkout code
- Setup Node.js 20
- Install dependencies

### 2. Run Audit
- Execute documentation audit with JSON output
- Continue even if audit finds issues (to generate reports)

### 3. Generate Reports
- Create markdown report for human readability
- Upload reports as workflow artifacts (retained for 30 days)

### 4. Check Compliance
- Extract compliance score from audit report
- Compare against configured threshold (default: 80%)
- Fail the build if score is below threshold

### 5. PR Comments (Pull Requests Only)
- Post audit results as a comment on the pull request
- Include summary and link to full report in artifacts

## NPM Scripts

The following scripts are available in `apps/docs/package.json`:

### Audit Scripts

```bash
# Run basic audit
npm run audit

# Run audit with JSON report (for CI)
npm run audit:ci

# Generate markdown report
npm run audit:report

# Generate HTML report
npm run audit:html

# Check compliance threshold
npm run audit:check
```

### Usage Examples

```bash
# Run audit locally and check compliance
cd apps/docs
npm run audit:ci
npm run audit:check

# Generate all report formats
npm run audit:ci
npm run audit:report
npm run audit:html

# Apply automated fixes
npm run audit -- --fix
```

## Configuration

The audit system is configured via `.audit-config.json`:

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

### Configuration Options

- **complianceThreshold**: Minimum compliance score (0-100) required to pass
- **failOnThreshold**: Whether to fail the build if threshold is not met
- **reportFormats**: Array of report formats to generate
- **outputDirectory**: Directory for audit reports
- **rules**: Enable/disable specific rule categories and set severity levels

## Compliance Threshold

The compliance threshold determines the minimum acceptable quality score for documentation:

- **Score Calculation**: Average compliance score across all component pages
- **Default Threshold**: 80%
- **Configurable**: Adjust in `.audit-config.json`

### Score Interpretation

- **90-100%**: Excellent - All or nearly all pages are compliant
- **80-89%**: Good - Most pages are compliant, minor issues remain
- **70-79%**: Fair - Significant issues need attention
- **Below 70%**: Poor - Major standardization work required

## Automated Reporting

### Artifact Storage

Audit reports are automatically uploaded as workflow artifacts:

- **Retention**: 30 days
- **Formats**: JSON and Markdown
- **Naming**: `audit-report-{commit-sha}`

### Accessing Reports

1. Navigate to the workflow run in GitHub Actions
2. Scroll to the "Artifacts" section
3. Download the audit report archive
4. Extract and review the reports

### PR Comments

For pull requests, the workflow automatically posts a comment with:

- Compliance score
- Summary of issues by category
- Number of auto-fixable issues
- Link to full report in artifacts

## Local Development

### Running Audits Locally

```bash
# Navigate to docs directory
cd apps/docs

# Run audit
npm run audit:ci

# Check compliance
npm run audit:check

# View reports
ls -la audit-reports/
```

### Pre-commit Checks

Consider adding a pre-commit hook to run audits before committing:

```bash
# .git/hooks/pre-commit
#!/bin/sh
cd apps/docs
npm run audit:ci
npm run audit:check
```

## Troubleshooting

### Build Failing Due to Compliance

If the CI build fails due to compliance issues:

1. **Review the audit report** in the workflow artifacts
2. **Check auto-fixable issues**: Run `npm run audit -- --fix` locally
3. **Manual fixes**: Address structural and content issues manually
4. **Re-run audit**: Verify compliance score improves

### No Reports Generated

If no reports are generated:

1. Check that the audit script ran successfully
2. Verify the `audit-reports` directory exists
3. Check file permissions
4. Review workflow logs for errors

### Threshold Too Strict

If the threshold is too strict for your current state:

1. **Temporary**: Lower the threshold in `.audit-config.json`
2. **Long-term**: Fix issues to meet the higher threshold
3. **Disable**: Set `failOnThreshold: false` (not recommended)

## Best Practices

1. **Run audits locally** before pushing to catch issues early
2. **Fix auto-fixable issues** first to quickly improve compliance
3. **Review reports regularly** to track progress over time
4. **Update style guide** as patterns emerge
5. **Keep threshold high** (80%+) to maintain quality

## Integration with Other Tools

### VS Code Extension

Consider creating a VS Code extension for real-time validation:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.docs-audit": true
  }
}
```

### Pre-commit Hooks

Use tools like `husky` to run audits before commits:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "cd apps/docs && npm run audit:check"
    }
  }
}
```

### Continuous Monitoring

Track compliance trends over time:

- Store historical reports
- Generate trend charts
- Set up alerts for declining scores

## Future Enhancements

- [ ] Visual regression testing for documentation pages
- [ ] Interactive HTML reports with filtering and sorting
- [ ] Real-time validation in VS Code
- [ ] Automated fix suggestions using AI
- [ ] Compliance dashboard with historical trends
- [ ] Integration with documentation hosting platforms

## Support

For issues or questions about the CI/CD integration:

1. Check the workflow logs in GitHub Actions
2. Review this documentation
3. Consult the main audit tool documentation
4. Open an issue in the repository
