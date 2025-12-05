# GhostUI Deployment Runbook

This runbook provides step-by-step procedures for routine deployments, emergency rollbacks, and incident response for the GhostUI monorepo deployed on Vercel.

## Table of Contents

- [Quick Reference](#quick-reference)
- [Routine Deployment Procedures](#routine-deployment-procedures)
- [Emergency Procedures](#emergency-procedures)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring and Alerting](#monitoring-and-alerting)
- [Incident Response](#incident-response)
- [Contact Information](#contact-information)
- [Deployment Checklist](#deployment-checklist)

## Quick Reference

### Deployment URLs

| Environment | Application | URL |
|------------|-------------|-----|
| Production | Docs App | https://ghostui-docs.vercel.app |
| Production | Demo App | https://ghostui-demo.vercel.app |
| Preview | Docs App | https://ghostui-docs-git-[branch].vercel.app |
| Preview | Demo App | https://ghostui-demo-git-[branch].vercel.app |

### Key Commands

```bash
# Local build testing
npm run build:all

# Deploy via Vercel CLI
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]

# Rollback (promote previous deployment)
# Done via Vercel dashboard
```

### Emergency Contacts

- **Primary On-Call**: [Your Name] - [email@example.com] - [phone]
- **Secondary On-Call**: [Backup Name] - [email@example.com] - [phone]
- **Vercel Support**: support@vercel.com (Pro/Enterprise plans)
- **Team Lead**: [Lead Name] - [email@example.com] - [phone]

## Routine Deployment Procedures

### Standard Deployment (Automatic via GitHub)

This is the most common deployment method, triggered automatically when code is merged to main.

#### Prerequisites

- [ ] All tests passing locally
- [ ] Code reviewed and approved
- [ ] Changes tested in preview deployment
- [ ] No known critical issues in production

#### Procedure

1. **Merge Pull Request**
   ```bash
   # Via GitHub UI or CLI
   gh pr merge [pr-number] --squash
   ```

2. **Monitor Deployment**
   - Go to Vercel dashboard
   - Watch build logs in real-time
   - Typical build time: 2-5 minutes

3. **Verify Deployment**
   - Check deployment status shows "Ready"
   - Visit production URLs
   - Test key functionality:
     - **Docs App**: Navigation, component pages, code examples
     - **Demo App**: Product grid, cart, search, checkout

4. **Post-Deployment Checks**
   - [ ] No errors in browser console
   - [ ] All pages load correctly
   - [ ] No 404 errors for assets
   - [ ] Performance is acceptable (< 3s load time)

5. **Document Deployment**
   - Note deployment time and version
   - Update team in Slack/Discord
   - Close related issues/tickets

#### Expected Duration

- Merge to deployment ready: 3-7 minutes
- Verification: 5-10 minutes
- **Total: 10-15 minutes**

### Manual Deployment (Vercel CLI)

Use when automatic deployment is not working or for specific deployment needs.

#### Prerequisites

- [ ] Vercel CLI installed: `npm install -g vercel`
- [ ] Authenticated: `vercel login`
- [ ] Local build successful: `npm run build:all`

#### Procedure

1. **Prepare for Deployment**
   ```bash
   # Ensure working directory is clean
   git status
   
   # Pull latest changes
   git pull origin main
   
   # Build locally to verify
   npm run build:all
   ```

2. **Deploy Docs App**
   ```bash
   # From root directory
   vercel --prod --cwd apps/docs
   
   # Or from app directory
   cd apps/docs
   vercel --prod
   cd ../..
   ```

3. **Deploy Demo App**
   ```bash
   # From root directory
   vercel --prod --cwd apps/demo
   
   # Or from app directory
   cd apps/demo
   vercel --prod
   cd ../..
   ```

4. **Verify Deployments**
   - CLI will output deployment URLs
   - Visit each URL and test functionality
   - Check Vercel dashboard for status

5. **Update Team**
   - Notify team of manual deployment
   - Document reason for manual deployment
   - Note any issues encountered

#### Expected Duration

- Build and deploy: 5-10 minutes per app
- Verification: 5-10 minutes
- **Total: 15-30 minutes**

### Preview Deployment (Pull Request)

Preview deployments are created automatically for every pull request.

#### Procedure

1. **Create Pull Request**
   ```bash
   git checkout -b feature/my-feature
   # Make changes
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/my-feature
   
   # Create PR via GitHub UI or CLI
   gh pr create --title "Add new feature" --body "Description"
   ```

2. **Wait for Preview Deployment**
   - Vercel bot comments on PR with preview URLs
   - Typical wait time: 3-5 minutes

3. **Test Preview Deployment**
   - Click preview URLs in PR comment
   - Test your changes thoroughly
   - Verify no regressions in existing functionality

4. **Request Review**
   - Tag reviewers
   - Share preview URLs for testing
   - Address feedback and push updates

5. **Merge When Ready**
   - Once approved, merge to main
   - Preview deployment becomes production deployment

#### Expected Duration

- PR creation to preview ready: 5-10 minutes
- Testing and review: Variable (hours to days)

## Emergency Procedures

### Critical Production Issue

Follow this procedure when a critical issue is discovered in production.

#### Severity Levels

- **P0 (Critical)**: Site down, data loss, security breach
- **P1 (High)**: Major feature broken, significant user impact
- **P2 (Medium)**: Minor feature broken, limited user impact
- **P3 (Low)**: Cosmetic issue, no functional impact

#### Immediate Response (P0/P1)

1. **Assess Impact** (2 minutes)
   - Determine severity level
   - Identify affected users/features
   - Check error logs and monitoring

2. **Notify Team** (2 minutes)
   ```
   🚨 PRODUCTION INCIDENT 🚨
   Severity: P0/P1
   Issue: [Brief description]
   Impact: [User impact]
   Status: Investigating
   ```

3. **Decide on Action** (5 minutes)
   - **Option A**: Rollback to previous version (fastest)
   - **Option B**: Deploy hotfix (if fix is simple and tested)
   - **Option C**: Disable feature (if possible)

4. **Execute Action** (See specific procedures below)

5. **Verify Resolution** (5 minutes)
   - Test affected functionality
   - Check error logs
   - Monitor for new issues

6. **Post-Incident** (30 minutes)
   - Document incident
   - Update team
   - Schedule post-mortem

#### Expected Duration

- **P0**: 15-30 minutes to resolution
- **P1**: 30-60 minutes to resolution

### Site Down / Build Failure

If the site is completely down or builds are failing:

1. **Check Vercel Status**
   - Visit https://www.vercel-status.com
   - Check for ongoing incidents

2. **Check Recent Deployments**
   - Go to Vercel dashboard
   - Review recent deployment logs
   - Identify failing deployment

3. **Rollback Immediately**
   - Follow [Rollback Procedures](#rollback-procedures)
   - Don't wait to investigate

4. **Investigate After Rollback**
   - Review build logs
   - Check for dependency issues
   - Test locally to reproduce

5. **Fix and Redeploy**
   - Create hotfix branch
   - Test thoroughly locally
   - Deploy via preview first
   - Merge to production

### Security Incident

If a security vulnerability is discovered:

1. **Assess Severity** (Immediate)
   - Is data exposed?
   - Are users at risk?
   - Is the vulnerability being exploited?

2. **Contain** (Immediate)
   - Disable affected feature if possible
   - Rollback if necessary
   - Block malicious traffic if applicable

3. **Notify** (Within 1 hour)
   - Notify team lead
   - Notify security team (if applicable)
   - Prepare user communication if needed

4. **Fix** (ASAP)
   - Develop and test fix
   - Deploy via hotfix process
   - Verify vulnerability is closed

5. **Post-Incident** (Within 24 hours)
   - Document incident
   - Review security practices
   - Update security guidelines

## Rollback Procedures

### Rollback via Vercel Dashboard (Recommended)

This is the fastest way to rollback a deployment.

#### Procedure

1. **Access Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Select the affected project (Docs or Demo)

2. **Find Previous Working Deployment**
   - Click "Deployments" tab
   - Identify the last known good deployment
   - Note: Look for deployments with "Ready" status before the issue

3. **Promote to Production**
   - Click the three dots menu (⋯) on the deployment
   - Select "Promote to Production"
   - Confirm the promotion

4. **Verify Rollback**
   - Wait 30-60 seconds for DNS propagation
   - Visit production URL
   - Test affected functionality
   - Check that issue is resolved

5. **Notify Team**
   ```
   ✅ ROLLBACK COMPLETE
   Project: [Docs/Demo]
   Rolled back to: [deployment-id]
   Reason: [Brief description]
   Status: Production restored
   ```

#### Expected Duration

- **Total: 2-5 minutes**

### Rollback via Git Revert

Use this method if you need to revert code changes permanently.

#### Procedure

1. **Identify Problematic Commit**
   ```bash
   git log --oneline
   # Find the commit that introduced the issue
   ```

2. **Create Revert Commit**
   ```bash
   # Revert specific commit
   git revert [commit-hash]
   
   # Or revert merge commit
   git revert -m 1 [merge-commit-hash]
   ```

3. **Push Revert**
   ```bash
   git push origin main
   ```

4. **Monitor Deployment**
   - Vercel automatically deploys the revert
   - Watch build logs
   - Verify deployment succeeds

5. **Verify Fix**
   - Test affected functionality
   - Ensure issue is resolved

#### Expected Duration

- **Total: 5-10 minutes**

### Rollback Checklist

Use this checklist for any rollback:

- [ ] Identify last known good deployment
- [ ] Notify team of rollback intention
- [ ] Execute rollback procedure
- [ ] Verify rollback successful
- [ ] Test affected functionality
- [ ] Check for new issues introduced by rollback
- [ ] Update team on status
- [ ] Document incident and rollback
- [ ] Plan fix for underlying issue

## Monitoring and Alerting

### What to Monitor

#### Build Health

- **Build Success Rate**: Should be > 95%
- **Build Duration**: Should be < 5 minutes
- **Build Failures**: Investigate any failures immediately

**Check**: Vercel dashboard → Deployments

#### Application Health

- **Uptime**: Should be > 99.9%
- **Response Time**: Should be < 3 seconds
- **Error Rate**: Should be < 1%

**Check**: Vercel dashboard → Analytics (Pro plan)

#### User Experience

- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

**Check**: Vercel dashboard → Speed Insights (Pro plan)

### Setting Up Alerts

#### Vercel Notifications

1. Go to Project Settings → Notifications
2. Configure alerts for:
   - Deployment failed
   - Deployment ready
   - Domain configuration issues

3. Choose notification channels:
   - Email
   - Slack
   - Discord
   - Webhook

#### GitHub Notifications

1. Enable GitHub Actions status checks
2. Configure branch protection rules
3. Require status checks to pass before merging

#### Custom Monitoring (Optional)

Consider integrating:
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and debugging
- **Datadog**: Infrastructure monitoring
- **PagerDuty**: Incident management and alerting

### Daily Monitoring Routine

Perform these checks daily (or assign to on-call rotation):

- [ ] Check Vercel dashboard for failed deployments
- [ ] Review error logs for unusual patterns
- [ ] Check application performance metrics
- [ ] Verify all production URLs are accessible
- [ ] Review any open incidents or issues

**Time Required**: 10-15 minutes

### Weekly Monitoring Routine

Perform these checks weekly:

- [ ] Review deployment frequency and success rate
- [ ] Analyze performance trends
- [ ] Check for dependency updates and security advisories
- [ ] Review and update monitoring thresholds
- [ ] Test rollback procedures (in staging if available)

**Time Required**: 30-45 minutes

## Incident Response

### Incident Response Process

1. **Detection** (0-5 minutes)
   - Monitoring alert triggers
   - User report received
   - Team member discovers issue

2. **Triage** (5-10 minutes)
   - Assess severity (P0-P3)
   - Determine impact
   - Assign incident commander

3. **Response** (10-60 minutes)
   - Execute appropriate procedure
   - Communicate with team
   - Monitor progress

4. **Resolution** (Variable)
   - Verify fix
   - Monitor for recurrence
   - Update stakeholders

5. **Post-Mortem** (Within 48 hours)
   - Document incident
   - Identify root cause
   - Create action items

### Incident Communication Template

Use this template for incident updates:

```
🚨 INCIDENT UPDATE 🚨

Status: [Investigating/Identified/Monitoring/Resolved]
Severity: [P0/P1/P2/P3]
Start Time: [Time]
Duration: [Duration]

Issue:
[Brief description of the problem]

Impact:
[What users are experiencing]

Current Actions:
[What we're doing to resolve]

Next Update:
[When to expect next update]

Incident Commander: [Name]
```

### Post-Mortem Template

After resolving an incident, document it:

```markdown
# Incident Post-Mortem: [Brief Title]

## Summary

- **Date**: [Date]
- **Duration**: [Duration]
- **Severity**: [P0/P1/P2/P3]
- **Impact**: [User impact]

## Timeline

- **[Time]**: Issue detected
- **[Time]**: Team notified
- **[Time]**: Root cause identified
- **[Time]**: Fix deployed
- **[Time]**: Incident resolved

## Root Cause

[Detailed explanation of what caused the issue]

## Resolution

[How the issue was resolved]

## Action Items

- [ ] [Action item 1] - Owner: [Name] - Due: [Date]
- [ ] [Action item 2] - Owner: [Name] - Due: [Date]

## Lessons Learned

### What Went Well

- [Thing 1]
- [Thing 2]

### What Could Be Improved

- [Thing 1]
- [Thing 2]

## Prevention

[How we'll prevent this from happening again]
```

## Contact Information

### Team Contacts

| Role | Name | Email | Phone | Availability |
|------|------|-------|-------|--------------|
| Primary On-Call | [Name] | [email] | [phone] | 24/7 |
| Secondary On-Call | [Name] | [email] | [phone] | 24/7 |
| Team Lead | [Name] | [email] | [phone] | Business hours |
| DevOps Lead | [Name] | [email] | [phone] | Business hours |

### External Contacts

| Service | Contact | URL | Notes |
|---------|---------|-----|-------|
| Vercel Support | support@vercel.com | https://vercel.com/support | Pro/Enterprise only |
| Vercel Status | - | https://www.vercel-status.com | Check for outages |
| GitHub Support | support@github.com | https://support.github.com | For repository issues |
| NPM Support | support@npmjs.com | https://www.npmjs.com/support | For package issues |

### Escalation Path

1. **Level 1**: On-call engineer (responds within 15 minutes)
2. **Level 2**: Team lead (responds within 30 minutes)
3. **Level 3**: Engineering manager (responds within 1 hour)
4. **Level 4**: CTO/VP Engineering (for critical incidents only)

### Communication Channels

- **Slack**: #ghostui-deployments (for routine updates)
- **Slack**: #ghostui-incidents (for incidents only)
- **Discord**: #deployments channel
- **Email**: team@ghostui.com (for external communication)
- **Status Page**: status.ghostui.com (if available)

## Deployment Checklist

### Pre-Deployment Checklist

Use this checklist before every production deployment:

#### Code Quality

- [ ] All tests passing locally
- [ ] TypeScript checks passing
- [ ] Linting passing
- [ ] No console errors or warnings
- [ ] Code reviewed and approved

#### Build Verification

- [ ] Local build successful: `npm run build:all`
- [ ] Package builds correctly
- [ ] Demo app builds correctly
- [ ] Docs app builds correctly
- [ ] Build time acceptable (< 5 minutes)

#### Testing

- [ ] Unit tests passing
- [ ] Integration tests passing (if applicable)
- [ ] Manual testing completed
- [ ] Preview deployment tested
- [ ] No regressions identified

#### Documentation

- [ ] CHANGELOG.md updated
- [ ] README.md updated (if needed)
- [ ] API documentation updated (if needed)
- [ ] Migration guide provided (for breaking changes)

#### Configuration

- [ ] Environment variables verified
- [ ] Configuration files updated
- [ ] Dependencies up to date
- [ ] No security vulnerabilities: `npm audit`

#### Communication

- [ ] Team notified of deployment
- [ ] Stakeholders informed (if major release)
- [ ] Release notes prepared
- [ ] Support team briefed (if needed)

### Post-Deployment Checklist

Use this checklist after every production deployment:

#### Verification

- [ ] Deployment status shows "Ready"
- [ ] Production URLs accessible
- [ ] All pages load correctly
- [ ] No 404 errors for assets
- [ ] No console errors in browser

#### Functionality

- [ ] Key features working correctly
- [ ] Forms submitting properly
- [ ] Navigation working
- [ ] Search functioning (if applicable)
- [ ] Authentication working (if applicable)

#### Performance

- [ ] Page load time acceptable (< 3s)
- [ ] No performance regressions
- [ ] Images loading correctly
- [ ] Animations smooth

#### Monitoring

- [ ] Error logs checked
- [ ] No unusual error patterns
- [ ] Performance metrics reviewed
- [ ] Monitoring alerts configured

#### Communication

- [ ] Team notified of successful deployment
- [ ] Deployment documented
- [ ] Issues/tickets updated
- [ ] Release announced (if major)

### Emergency Rollback Checklist

Use this checklist when performing an emergency rollback:

- [ ] Issue severity assessed (P0/P1)
- [ ] Team notified of issue
- [ ] Last known good deployment identified
- [ ] Rollback initiated via Vercel dashboard
- [ ] Rollback verified successful
- [ ] Affected functionality tested
- [ ] Team notified of rollback completion
- [ ] Incident documented
- [ ] Root cause investigation scheduled
- [ ] Fix planned and prioritized

## Appendix

### Useful Commands

```bash
# Build commands
npm run build:all                    # Build everything
npm run build:package                # Build package only
npm run build:demo                   # Build demo app
npm run build:docs                   # Build docs app

# Test commands
npm test                             # Run all tests
npm run type-check                   # Check TypeScript
npm run lint                         # Run linter

# Vercel CLI commands
vercel login                         # Authenticate
vercel ls                            # List deployments
vercel logs [url]                    # View logs
vercel --prod                        # Deploy to production
vercel rollback [deployment-url]     # Rollback deployment

# Git commands
git log --oneline                    # View commit history
git revert [commit-hash]             # Revert commit
git push origin main --follow-tags   # Push with tags
```

### Vercel Dashboard URLs

- **Main Dashboard**: https://vercel.com/dashboard
- **Docs Project**: https://vercel.com/[team]/ghostui-docs
- **Demo Project**: https://vercel.com/[team]/ghostui-demo
- **Deployments**: https://vercel.com/[team]/[project]/deployments
- **Settings**: https://vercel.com/[team]/[project]/settings

### Related Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [Local Build Testing](./LOCAL_BUILD_TESTING.md) - Testing builds locally
- [NPM Publishing Guide](./NPM_PUBLISHING.md) - Publishing package to NPM
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and solutions

### Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-12-06 | 1.0 | Initial runbook creation | [Your Name] |

---

**Last Updated**: 2024-12-06  
**Next Review**: 2025-01-06  
**Owner**: DevOps Team
