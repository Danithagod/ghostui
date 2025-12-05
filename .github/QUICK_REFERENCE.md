# CI/CD and Monitoring - Quick Reference

Quick reference guide for common CI/CD and monitoring tasks.

## 🚀 Quick Commands

### Run Tests Locally

```bash
# Test all packages
npm test --workspace=packages/ghostui
npm test --workspace=apps/demo
npm test --workspace=apps/docs

# Test with watch mode
npm run test:watch --workspace=packages/ghostui
```

### Build Locally

```bash
# Build everything
npm run build:all

# Build individual components
npm run build:package
npm run build:demo
npm run build:docs
```

### Lint Code

```bash
npm run lint --workspace=packages/ghostui
npm run lint --workspace=apps/demo
npm run lint --workspace=apps/docs
```

## 📋 GitHub Actions Workflows

### Test Workflow

**File**: `.github/workflows/test.yml`

**Triggers**:
- Push to `main` or `develop`
- Pull requests to `main` or `develop`
- Manual trigger via Actions tab

**Jobs**:
- Test GhostUI Package
- Test Demo App
- Test Docs App
- Verify Build Process
- Lint Code
- Test Summary

**View Results**: `https://github.com/<org>/<repo>/actions`

### Documentation Audit Workflow

**File**: `.github/workflows/docs-audit.yml`

**Triggers**:
- Changes to component documentation
- Changes to audit scripts
- Manual trigger

**Jobs**:
- Audit Component Documentation
- Generate Audit Report
- Comment on PR with results

## 🔒 Branch Protection

### Required Status Checks

Before merging to `main`:
- ✅ Test GhostUI Package
- ✅ Test Demo App
- ✅ Test Docs App
- ✅ Verify Build Process
- ✅ Test Summary

### Setup Instructions

1. Go to: Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable: "Require status checks to pass before merging"
4. Select all required checks
5. Enable: "Require a pull request before merging"
6. Save changes

**Full Guide**: [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

## 🚢 Vercel Deployments

### Automatic Deployments

- **Production**: Automatic on push to `main`
- **Preview**: Automatic on pull requests

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### View Deployments

- **Dashboard**: `https://vercel.com/dashboard`
- **GitHub**: Check PR comments for preview URLs
- **Status**: Check commit status on GitHub

### Configuration

**File**: `vercel.json`

**GitHub Integration**:
- ✅ Commit status checks enabled
- ✅ PR comments enabled
- ✅ Auto-alias enabled
- ✅ Auto job cancellation enabled

## 📢 Notifications

### GitHub (Automatic)

- ✅ Commit status checks
- ✅ PR comments with deployment URLs
- ✅ Deployment history in GitHub

### Slack (Optional)

**Setup**:
1. Install Vercel Slack app
2. Run `/vercel link` in Slack channel
3. Select GhostUI project

**Commands**:
- `/vercel link` - Connect project
- `/vercel list` - Show deployments
- `/vercel unlink` - Disconnect project

**Full Guide**: [VERCEL_NOTIFICATIONS.md](./VERCEL_NOTIFICATIONS.md)

### Email (Optional)

**Setup**:
1. Go to Vercel Dashboard → Settings → Notifications
2. Configure email preferences
3. Add team members

## 🐛 Error Monitoring (Optional)

### Sentry Setup

**Install**:
```bash
cd apps/docs  # or apps/demo
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configure**:
1. Copy example configs from `.github/`
2. Set environment variables in Vercel
3. Deploy and verify

**Environment Variables**:
```env
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=ghostui-docs
SENTRY_AUTH_TOKEN=your-token
```

**Full Guide**: [ERROR_MONITORING.md](./ERROR_MONITORING.md)

### Vercel Analytics

**Install**:
```bash
npm install @vercel/analytics
```

**Add to layout**:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🔍 Monitoring Dashboards

### GitHub Actions

**URL**: `https://github.com/<org>/<repo>/actions`

**Check**:
- Test results
- Build status
- Workflow runs
- Failed jobs

### Vercel Dashboard

**URL**: `https://vercel.com/dashboard`

**Check**:
- Deployment status
- Build logs
- Analytics
- Performance

### Sentry (if configured)

**URL**: `https://sentry.io/organizations/<org>/issues/`

**Check**:
- Error rate
- New issues
- Performance
- Release health

## 🚨 Common Issues

### Tests Failing in CI

**Check**:
1. Node.js version (CI uses Node 20)
2. Dependencies (`npm ci` vs `npm install`)
3. Environment variables
4. CI logs for specific errors

**Fix**:
```bash
# Test with clean dependencies
npm ci
npm test
```

### Deployment Failing

**Check**:
1. Vercel build logs
2. Environment variables in Vercel
3. Build command in vercel.json
4. Workspace dependencies

**Fix**:
```bash
# Test build locally
npm run build:all
```

### Notifications Not Working

**Check**:
1. Integration is connected
2. Permissions are correct
3. Service status pages
4. Configuration settings

**Fix**:
- Re-authorize integrations
- Check service documentation
- Test with manual trigger

## 📚 Documentation

### Setup Guides

- [CI/CD Monitoring Setup](./CI_CD_MONITORING_SETUP.md) - Complete overview
- [Branch Protection](./BRANCH_PROTECTION.md) - GitHub branch rules
- [Vercel Notifications](./VERCEL_NOTIFICATIONS.md) - Deployment notifications
- [Error Monitoring](./ERROR_MONITORING.md) - Sentry and analytics

### Project Documentation

- [Deployment Guide](../DEPLOYMENT.md) - Vercel deployment
- [Troubleshooting](../TROUBLESHOOTING.md) - Common issues
- [Environment Variables](../ENVIRONMENT_VARIABLES.md) - Configuration

### External Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Docs](https://vercel.com/docs)
- [Sentry Docs](https://docs.sentry.io/)
- [Next.js Docs](https://nextjs.org/docs)

## 🆘 Getting Help

### For CI/CD Issues

1. Check GitHub Actions logs
2. Review workflow files
3. Consult documentation
4. Ask in team chat

### For Deployment Issues

1. Check Vercel dashboard
2. Review build logs
3. Test locally
4. Contact Vercel support

### For Monitoring Issues

1. Check service status
2. Review configuration
3. Test integration
4. Contact service support

## ✅ Checklist for New Features

Before creating a PR:

- [ ] Tests pass locally
- [ ] Code is linted
- [ ] Build succeeds locally
- [ ] Documentation is updated
- [ ] Commit messages are clear

After creating a PR:

- [ ] CI tests pass
- [ ] Preview deployment works
- [ ] Code review requested
- [ ] All conversations resolved
- [ ] Ready to merge

After merging:

- [ ] Production deployment succeeds
- [ ] No errors in monitoring
- [ ] Feature works as expected
- [ ] Team is notified

## 🎯 Best Practices

### Development

- ✅ Run tests before pushing
- ✅ Keep PRs small and focused
- ✅ Write clear commit messages
- ✅ Update documentation
- ✅ Test locally first

### Code Review

- ✅ Check test results
- ✅ Review preview deployment
- ✅ Test critical paths
- ✅ Verify documentation
- ✅ Approve when ready

### Deployment

- ✅ Monitor deployment status
- ✅ Check for errors
- ✅ Verify critical features
- ✅ Review metrics
- ✅ Be ready to rollback

---

**Last Updated**: December 2024

**Maintained By**: GhostUI Team

**Questions?** Check the full documentation or ask in team chat.
