# Branch Protection Configuration

This document describes how to configure branch protection rules for the GhostUI repository to ensure code quality and prevent breaking changes.

## Overview

Branch protection rules enforce quality standards by requiring status checks to pass before code can be merged to protected branches. This ensures that all tests pass and builds succeed before changes are integrated.

## Required Status Checks

The following GitHub Actions workflows provide status checks that should be required:

### Test Suite Workflow (`test.yml`)

- **Test GhostUI Package**: Runs unit and property-based tests for the component library
- **Test Demo App**: Runs tests for the demo application
- **Test Docs App**: Runs tests for the documentation site
- **Verify Build Process**: Ensures all packages and apps build successfully
- **Lint Code**: Checks code style and quality
- **Test Summary**: Aggregates all test results

### Documentation Audit Workflow (`docs-audit.yml`)

- **Audit Component Documentation**: Validates documentation follows style guide

## Setting Up Branch Protection

### Step 1: Navigate to Branch Protection Settings

1. Go to your GitHub repository
2. Click **Settings** → **Branches**
3. Under "Branch protection rules", click **Add rule**

### Step 2: Configure Protection for Main Branch

**Branch name pattern**: `main`

**Protect matching branches** - Enable the following:

#### Required Status Checks

✅ **Require status checks to pass before merging**
- ✅ Require branches to be up to date before merging

**Select status checks to require:**
- `Test GhostUI Package`
- `Test Demo App`
- `Test Docs App`
- `Verify Build Process`
- `Test Summary`
- `Audit Component Documentation` (optional)

#### Pull Request Requirements

✅ **Require a pull request before merging**
- Number of required approvals: `1` (recommended)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from Code Owners (if CODEOWNERS file exists)

#### Additional Protections

✅ **Require conversation resolution before merging**
- Ensures all PR comments are addressed

✅ **Do not allow bypassing the above settings**
- Applies rules to administrators as well

❌ **Allow force pushes** (disabled)
- Prevents rewriting history on main branch

❌ **Allow deletions** (disabled)
- Prevents accidental branch deletion

### Step 3: Configure Protection for Develop Branch (Optional)

Repeat the same configuration for the `develop` branch if you use a Git Flow workflow.

**Branch name pattern**: `develop`

Apply the same settings as the main branch.

## Status Check Configuration

### Making Status Checks Required

After running the workflows at least once, the status checks will appear in the branch protection settings. You can then select which checks are required.

**Important**: Status checks must run at least once before they appear in the selection list.

### Handling Optional Checks

Some checks like linting can be set as optional by not including them in the required status checks list. This allows them to run and provide feedback without blocking merges.

## Workflow Triggers

The test workflow is triggered by:

- **Push to main or develop**: Runs full test suite on protected branches
- **Pull requests to main or develop**: Runs tests on PR changes
- **Manual trigger**: Can be run manually via GitHub Actions UI

## Troubleshooting

### Status Checks Not Appearing

**Problem**: Status checks don't appear in branch protection settings.

**Solution**: 
1. Ensure the workflow file is committed to the repository
2. Trigger the workflow at least once (push to main or create a PR)
3. Wait for the workflow to complete
4. Refresh the branch protection settings page

### Tests Failing on CI but Passing Locally

**Problem**: Tests pass locally but fail in GitHub Actions.

**Solution**:
1. Check Node.js version matches between local and CI (workflow uses Node 20)
2. Ensure all dependencies are properly listed in package.json
3. Review CI logs for environment-specific issues
4. Run `npm ci` locally to test with clean dependencies

### Build Verification Failing

**Problem**: Build verification step fails even though builds work locally.

**Solution**:
1. Ensure build scripts are defined in package.json
2. Check that workspace dependencies are properly configured
3. Verify build order (package must build before apps)
4. Review build logs for specific error messages

## Best Practices

### For Contributors

1. **Run tests locally** before pushing: `npm test`
2. **Build locally** to catch issues early: `npm run build:all`
3. **Keep PRs focused** on single features or fixes
4. **Address review comments** promptly
5. **Ensure CI passes** before requesting review

### For Maintainers

1. **Review test results** before approving PRs
2. **Check build artifacts** are generated correctly
3. **Monitor workflow performance** and optimize if needed
4. **Update status checks** as new workflows are added
5. **Document exceptions** if bypassing checks is necessary

## Monitoring and Maintenance

### Regular Reviews

- **Weekly**: Review failed workflows and address issues
- **Monthly**: Audit branch protection rules for effectiveness
- **Quarterly**: Update Node.js version and dependencies in workflows

### Metrics to Track

- Test pass rate
- Average time to merge PRs
- Number of failed status checks
- Build time trends

## Additional Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

## Support

If you encounter issues with branch protection or status checks:

1. Check this documentation first
2. Review GitHub Actions logs
3. Consult the team in Slack/Discord
4. Open an issue in the repository
