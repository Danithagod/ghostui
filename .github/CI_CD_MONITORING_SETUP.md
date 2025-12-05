# CI/CD and Monitoring Setup - Complete Guide

This document provides an overview of the CI/CD and monitoring infrastructure for the GhostUI monorepo.

## Overview

The GhostUI project uses a comprehensive CI/CD and monitoring setup to ensure code quality, track deployments, and monitor application health in production.

## Components

### 1. GitHub Actions (Automated Testing)

**Location**: `.github/workflows/test.yml`

**Purpose**: Automatically run tests on every push and pull request

**What it does**:
- Runs unit and property-based tests for the GhostUI package
- Tests both Demo and Docs applications
- Verifies build process completes successfully
- Runs linting checks
- Provides test summary in PR comments

**Status**: ✅ Configured and ready to use

**Next Steps**:
1. Push code to trigger the workflow
2. Review test results in GitHub Actions tab
3. Configure branch protection rules (see below)

**Documentation**: [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

---

### 2. Branch Protection Rules

**Location**: GitHub Repository Settings → Branches

**Purpose**: Enforce code quality standards before merging

**What it does**:
- Requires all tests to pass before merging
- Requires code review approvals
- Prevents force pushes to protected branches
- Ensures conversations are resolved

**Status**: ⚠️ Requires manual configuration in GitHub

**Next Steps**:
1. Follow instructions in [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)
2. Configure protection for `main` branch
3. Optionally configure protection for `develop` branch

**Documentation**: [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

---

### 3. Vercel Deployment Notifications

**Location**: `vercel.json` (GitHub integration enabled)

**Purpose**: Keep team informed about deployment status

**What it does**:
- Posts deployment status to GitHub commits
- Comments on pull requests with preview URLs
- Integrates with GitHub Deployments API
- Provides deployment history

**Status**: ✅ Configured in vercel.json

**Next Steps**:
1. Connect Vercel project to GitHub (if not already done)
2. Configure Slack notifications (optional)
3. Set up email notifications (optional)
4. Configure custom webhooks (optional)

**Documentation**: [VERCEL_NOTIFICATIONS.md](./VERCEL_NOTIFICATIONS.md)

---

### 4. Error Monitoring (Optional)

**Location**: Example configurations in `.github/`

**Purpose**: Track and monitor runtime errors in production

**What it provides**:
- Real-time error tracking with Sentry
- Performance monitoring
- User session replay
- Alert configuration
- Error analytics

**Status**: ⚠️ Optional - requires setup

**Next Steps**:
1. Create Sentry account (or choose alternative service)
2. Install Sentry SDK in apps
3. Configure environment variables
4. Set up error alerts
5. Deploy and verify error tracking

**Documentation**: [ERROR_MONITORING.md](./ERROR_MONITORING.md)

**Example Files**:
- `sentry.example.client.config.ts` - Client-side Sentry config
- `sentry.example.server.config.ts` - Server-side Sentry config
- `error-boundary.example.tsx` - React error boundary component

---

## Quick Start Guide

### For New Contributors

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ghostui
   npm install
   ```

2. **Run tests locally**
   ```bash
   npm test --workspace=packages/ghostui
   npm test --workspace=apps/demo
   npm test --workspace=apps/docs
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create pull request**
   - GitHub Actions will automatically run tests
   - Vercel will create a preview deployment
   - Wait for all checks to pass
   - Request review from team members

### For Maintainers

1. **Configure branch protection** (one-time setup)
   - Follow [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)
   - Require status checks to pass
   - Require code review approvals

2. **Set up Vercel notifications** (one-time setup)
   - Follow [VERCEL_NOTIFICATIONS.md](./VERCEL_NOTIFICATIONS.md)
   - Configure Slack integration (recommended)
   - Set up email notifications

3. **Configure error monitoring** (optional, one-time setup)
   - Follow [ERROR_MONITORING.md](./ERROR_MONITORING.md)
   - Set up Sentry or alternative service
   - Configure alerts for critical errors

4. **Review and merge PRs**
   - Ensure all tests pass
   - Review code changes
   - Check preview deployment
   - Merge when approved

---

## Workflow Diagram

```
Developer Push
      ↓
GitHub Actions (Tests)
      ↓
   ✅ Pass → Vercel Preview Deployment
      ↓
Code Review
      ↓
Merge to Main
      ↓
Vercel Production Deployment
      ↓
Error Monitoring (Sentry)
```

---

## Status Checks

### Required Checks (Configured in Branch Protection)

- ✅ **Test GhostUI Package**: Unit and property-based tests
- ✅ **Test Demo App**: Application tests
- ✅ **Test Docs App**: Documentation site tests
- ✅ **Verify Build Process**: Build verification
- ✅ **Test Summary**: Aggregate test results

### Optional Checks

- 📋 **Audit Component Documentation**: Style guide compliance
- 🔍 **Lint Code**: Code style checks (informational)

---

## Notification Channels

### GitHub (Automatic)

- ✅ Commit status checks
- ✅ PR comments with deployment URLs
- ✅ Deployment history

### Slack (Optional)

- 📢 Production deployment notifications
- 📢 Deployment failure alerts
- 📢 Preview deployment updates (optional)

### Email (Optional)

- 📧 Deployment failure notifications
- 📧 Security alerts
- 📧 Critical error alerts

### Sentry (Optional)

- 🚨 Real-time error alerts
- 🚨 Performance degradation alerts
- 🚨 New error type notifications

---

## Monitoring Dashboards

### GitHub Actions

**URL**: `https://github.com/<org>/<repo>/actions`

**What to monitor**:
- Test pass rate
- Build success rate
- Workflow execution time
- Failed workflows

### Vercel Dashboard

**URL**: `https://vercel.com/dashboard`

**What to monitor**:
- Deployment status
- Build logs
- Analytics (if enabled)
- Performance metrics

### Sentry Dashboard (Optional)

**URL**: `https://sentry.io/organizations/<org>/issues/`

**What to monitor**:
- Error rate
- Affected users
- Performance metrics
- Release health

---

## Troubleshooting

### Tests Failing in CI but Passing Locally

**Possible causes**:
- Node.js version mismatch
- Missing dependencies
- Environment-specific issues

**Solutions**:
1. Check Node.js version (CI uses Node 20)
2. Run `npm ci` locally to test with clean dependencies
3. Review CI logs for specific errors

### Deployment Failing

**Possible causes**:
- Build errors
- Missing environment variables
- Workspace dependency issues

**Solutions**:
1. Check Vercel build logs
2. Verify environment variables are set
3. Test build locally: `npm run build:all`
4. Review [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)

### Notifications Not Working

**Possible causes**:
- Integration not configured
- Permissions issues
- Service outage

**Solutions**:
1. Verify integration is connected
2. Check service status pages
3. Review integration settings
4. Test with manual trigger

---

## Best Practices

### For Development

1. ✅ Run tests locally before pushing
2. ✅ Keep PRs focused and small
3. ✅ Write descriptive commit messages
4. ✅ Address review comments promptly
5. ✅ Ensure CI passes before requesting review

### For Code Review

1. ✅ Review test results before approving
2. ✅ Check preview deployment
3. ✅ Verify all conversations are resolved
4. ✅ Ensure documentation is updated
5. ✅ Confirm no breaking changes

### For Deployment

1. ✅ Monitor deployment status
2. ✅ Check for errors after deployment
3. ✅ Verify critical features work
4. ✅ Review error monitoring dashboard
5. ✅ Be ready to rollback if needed

---

## Maintenance

### Weekly

- Review failed workflows
- Check error monitoring dashboard
- Update dependencies if needed
- Review open PRs

### Monthly

- Audit branch protection rules
- Review notification settings
- Check CI/CD performance
- Update documentation

### Quarterly

- Update Node.js version in workflows
- Review and optimize test suite
- Audit error monitoring configuration
- Update monitoring dashboards

---

## Additional Resources

### Documentation

- [Branch Protection Setup](./BRANCH_PROTECTION.md)
- [Vercel Notifications](./VERCEL_NOTIFICATIONS.md)
- [Error Monitoring](./ERROR_MONITORING.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Troubleshooting](../TROUBLESHOOTING.md)

### External Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Sentry Documentation](https://docs.sentry.io/)
- [Next.js Documentation](https://nextjs.org/docs)

---

## Support

### For CI/CD Issues

1. Check GitHub Actions logs
2. Review workflow configuration
3. Consult [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)
4. Ask in team Slack/Discord

### For Deployment Issues

1. Check Vercel dashboard
2. Review build logs
3. Consult [DEPLOYMENT.md](../DEPLOYMENT.md)
4. Contact Vercel support

### For Monitoring Issues

1. Check service status pages
2. Review configuration
3. Consult [ERROR_MONITORING.md](./ERROR_MONITORING.md)
4. Contact service support

---

## Summary

The GhostUI CI/CD and monitoring setup provides:

✅ **Automated Testing**: Every push and PR is tested automatically
✅ **Branch Protection**: Code quality standards enforced before merging
✅ **Deployment Notifications**: Team stays informed about deployments
✅ **Error Monitoring**: Track and fix issues in production (optional)

**Status**: Core infrastructure is configured and ready to use. Optional components (error monitoring) can be added as needed.

**Next Steps**: Follow the Quick Start Guide above to begin using the CI/CD pipeline.
