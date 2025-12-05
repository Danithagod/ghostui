# Vercel Deployment Notifications Configuration

This document provides step-by-step instructions for configuring deployment notifications for the GhostUI monorepo on Vercel.

## Overview

Vercel provides multiple notification channels to keep your team informed about deployment status:

- **GitHub Commit Status Checks**: Automatic status updates on commits and PRs
- **GitHub PR Comments**: Deployment URLs posted directly in pull requests
- **Slack Notifications**: Real-time deployment updates in Slack channels
- **Email Notifications**: Deployment status sent to team members
- **Webhooks**: Custom integrations for advanced workflows

## GitHub Integration (Automatic)

### Commit Status Checks

Vercel automatically provides commit status checks when connected to GitHub. These appear on:

- Commits in the repository
- Pull request checks
- Branch protection rules

**Status Check States:**
- ✅ **Success**: Deployment completed successfully
- ⏳ **Pending**: Deployment in progress
- ❌ **Failed**: Deployment failed (with error details)

**Configuration:**

1. **Verify GitHub Integration**
   - Go to Vercel Dashboard → Project Settings → Git
   - Ensure GitHub repository is connected
   - Verify "Production Branch" is set to `main`

2. **Enable Status Checks** (enabled by default)
   - Navigate to Project Settings → Git
   - Ensure "GitHub Commit Status" is enabled
   - This will post deployment status to GitHub

### Pull Request Comments

Vercel automatically comments on pull requests with deployment information.

**Comment Contents:**
- Preview deployment URL
- Deployment status
- Build logs link
- Deployment time

**Configuration:**

1. **Enable PR Comments**
   - Go to Project Settings → Git
   - Enable "Vercel Bot Comments on Pull Requests"
   - Choose comment style: "Minimal" or "Detailed"

2. **Customize Comment Behavior**
   - **Always comment**: Posts on every deployment
   - **Only on failure**: Posts only when deployments fail
   - **Never comment**: Disables PR comments

**Recommended Setting**: "Always comment" with "Detailed" style

### GitHub Deployments API

Vercel uses GitHub's Deployments API to track deployment history.

**Benefits:**
- Deployment history visible in GitHub
- Integration with GitHub Actions
- Rollback capabilities

**Configuration:**

1. Navigate to Project Settings → Git
2. Enable "GitHub Deployments"
3. This is enabled by default and recommended

## Slack Notifications

### Setup Slack Integration

**Step 1: Install Vercel Slack App**

1. Go to [Vercel Slack Integration](https://vercel.com/integrations/slack)
2. Click "Add to Slack"
3. Select your Slack workspace
4. Authorize the Vercel app

**Step 2: Configure Notifications**

1. In Slack, type `/vercel` to open the Vercel bot
2. Use `/vercel link` to connect your project
3. Select the GhostUI project
4. Choose the Slack channel for notifications

**Step 3: Customize Notification Settings**

1. Go to Vercel Dashboard → Project Settings → Notifications
2. Click "Slack" under notification channels
3. Configure notification triggers:
   - ✅ Production deployments
   - ✅ Preview deployments (optional)
   - ✅ Deployment failures
   - ✅ Deployment success
   - ❌ Deployment started (can be noisy)

### Slack Notification Types

**Production Deployment Success:**
```
✅ Production Deployment Successful
ghostui-docs deployed to production
🔗 https://ghostui-docs.vercel.app
⏱️ Built in 2m 34s
```

**Preview Deployment:**
```
🔍 Preview Deployment Ready
ghostui-docs (PR #123)
🔗 https://ghostui-docs-git-feature-branch.vercel.app
⏱️ Built in 1m 45s
```

**Deployment Failure:**
```
❌ Deployment Failed
ghostui-docs (main branch)
📋 View logs: https://vercel.com/team/project/deployment-id
```

### Slack Commands

- `/vercel link`: Connect a project to current channel
- `/vercel unlink`: Disconnect project from channel
- `/vercel list`: Show linked projects
- `/vercel help`: Show available commands

## Email Notifications

### Configure Email Notifications

**Step 1: Access Notification Settings**

1. Go to Vercel Dashboard → Account Settings → Notifications
2. Or Project Settings → Notifications for project-specific settings

**Step 2: Configure Email Preferences**

**Account-Level Notifications:**
- Deployment failures
- Deployment success (optional)
- Security alerts
- Billing notifications

**Project-Level Notifications:**
- Production deployment status
- Preview deployment status (optional)
- Build errors and warnings

**Step 3: Add Team Members**

1. Go to Project Settings → Team
2. Add team members with appropriate roles
3. Each member can configure their own email preferences

### Email Notification Content

**Deployment Success Email:**
- Subject: `✅ [GhostUI] Production deployment successful`
- Deployment URL
- Build time and commit information
- Link to deployment logs

**Deployment Failure Email:**
- Subject: `❌ [GhostUI] Deployment failed`
- Error summary
- Link to full error logs
- Suggested actions

## Webhook Notifications

### Custom Webhook Integration

For advanced integrations (Discord, Microsoft Teams, custom systems):

**Step 1: Create Webhook Endpoint**

Create an endpoint that accepts POST requests with Vercel's webhook payload.

**Step 2: Configure Webhook in Vercel**

1. Go to Project Settings → Git → Deploy Hooks
2. Click "Create Hook"
3. Enter webhook URL
4. Select trigger events:
   - Deployment created
   - Deployment ready
   - Deployment error
   - Deployment canceled

**Step 3: Verify Webhook**

Vercel will send a test payload to verify the endpoint.

### Webhook Payload Example

```json
{
  "id": "dpl_123456789",
  "url": "https://ghostui-docs.vercel.app",
  "name": "ghostui-docs",
  "type": "LAMBDAS",
  "state": "READY",
  "creator": {
    "uid": "user_123",
    "email": "developer@example.com",
    "username": "developer"
  },
  "target": "production",
  "project": {
    "id": "prj_123456789",
    "name": "ghostui-docs"
  },
  "deployment": {
    "id": "dpl_123456789",
    "url": "ghostui-docs-abc123.vercel.app",
    "meta": {
      "githubCommitRef": "main",
      "githubCommitSha": "abc123def456",
      "githubCommitMessage": "Update documentation"
    }
  }
}
```

### Discord Webhook Example

To send Vercel notifications to Discord:

1. Create a Discord webhook in your server settings
2. Use a middleware service (like Zapier or n8n) to transform Vercel webhooks
3. Or create a simple serverless function to forward notifications

**Example Discord Message Format:**
```javascript
{
  "embeds": [{
    "title": "✅ Deployment Successful",
    "description": "GhostUI Docs deployed to production",
    "url": "https://ghostui-docs.vercel.app",
    "color": 5763719,
    "fields": [
      {
        "name": "Branch",
        "value": "main",
        "inline": true
      },
      {
        "name": "Build Time",
        "value": "2m 34s",
        "inline": true
      }
    ],
    "timestamp": new Date().toISOString()
  }]
}
```

## Notification Best Practices

### Recommended Configuration

**For Small Teams (1-5 developers):**
- ✅ GitHub commit status checks (always on)
- ✅ GitHub PR comments (detailed)
- ✅ Slack notifications for production deployments
- ✅ Email for deployment failures only
- ❌ Slack for preview deployments (too noisy)

**For Medium Teams (5-15 developers):**
- ✅ GitHub commit status checks (always on)
- ✅ GitHub PR comments (minimal)
- ✅ Slack notifications for production and failures
- ✅ Email for critical failures only
- ✅ Separate Slack channels for production vs preview

**For Large Teams (15+ developers):**
- ✅ GitHub commit status checks (always on)
- ✅ GitHub PR comments (minimal)
- ✅ Dedicated Slack channels per environment
- ✅ Email for critical failures only
- ✅ Custom webhooks for advanced monitoring
- ✅ Integration with incident management tools

### Avoiding Notification Fatigue

**Tips to reduce noise:**

1. **Disable preview deployment notifications** for active development branches
2. **Use separate channels** for production vs preview deployments
3. **Configure "quiet hours"** in Slack (if supported)
4. **Filter by deployment type** (production only for most team members)
5. **Use email digests** instead of real-time emails
6. **Leverage GitHub's notification settings** to reduce duplicate notifications

### Critical Notifications Only

For on-call or critical systems:

- ✅ Production deployment failures
- ✅ Security alerts
- ✅ Performance degradation
- ❌ Successful deployments (unless critical)
- ❌ Preview deployments
- ❌ Build warnings

## Monitoring Deployment Status

### Vercel Dashboard

The primary source of deployment information:

1. **Deployments Tab**: View all deployments with status
2. **Analytics**: Monitor performance and usage
3. **Logs**: Real-time and historical logs
4. **Insights**: Performance metrics and recommendations

### GitHub Integration

View deployment status directly in GitHub:

1. **Commit Status**: Check marks on commits
2. **PR Checks**: Deployment status in PR checks section
3. **Deployments Tab**: GitHub's deployments view
4. **Actions**: Integration with GitHub Actions workflows

### Slack Integration

Quick access to deployment info:

- Use `/vercel list` to see recent deployments
- Click deployment links in notifications
- View build logs directly from Slack

## Troubleshooting

### Notifications Not Appearing

**Problem**: Not receiving Slack notifications

**Solutions:**
1. Verify Slack integration is installed and linked
2. Check channel permissions (bot must be invited)
3. Verify notification settings in Vercel dashboard
4. Test with `/vercel link` command in Slack

**Problem**: GitHub status checks not showing

**Solutions:**
1. Verify GitHub integration is connected
2. Check repository permissions (Vercel needs write access)
3. Ensure "GitHub Commit Status" is enabled in settings
4. Re-authorize GitHub integration if needed

**Problem**: Email notifications not received

**Solutions:**
1. Check spam/junk folder
2. Verify email address in Vercel account settings
3. Check notification preferences (may be disabled)
4. Ensure project-level notifications are enabled

### Duplicate Notifications

**Problem**: Receiving duplicate notifications across channels

**Solutions:**
1. Review notification settings in each channel
2. Disable redundant notification types
3. Use GitHub's notification settings to filter duplicates
4. Configure Slack to mute certain notification types

## Security Considerations

### Webhook Security

When using custom webhooks:

1. **Verify webhook signatures** to ensure requests are from Vercel
2. **Use HTTPS endpoints** only
3. **Implement rate limiting** to prevent abuse
4. **Store webhook URLs securely** (use environment variables)
5. **Monitor webhook logs** for suspicious activity

### Access Control

1. **Limit notification access** to team members only
2. **Use private Slack channels** for sensitive deployments
3. **Configure email notifications** per team member role
4. **Review integration permissions** regularly

## Additional Resources

- [Vercel Notifications Documentation](https://vercel.com/docs/concepts/deployments/notifications)
- [Vercel Slack Integration](https://vercel.com/integrations/slack)
- [GitHub Deployments API](https://docs.github.com/en/rest/deployments)
- [Webhook Security Best Practices](https://vercel.com/docs/concepts/deployments/webhooks)

## Support

For issues with notifications:

1. Check Vercel status page: https://vercel-status.com
2. Review Vercel documentation
3. Contact Vercel support via dashboard
4. Consult team in Slack/Discord
