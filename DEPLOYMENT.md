# GhostUI Deployment Guide

This guide provides step-by-step instructions for deploying the GhostUI monorepo to Vercel, including both the Demo App (potion shop e-commerce) and Docs App.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Vercel Project Setup](#vercel-project-setup)
- [GitHub Repository Connection](#github-repository-connection)
- [Build Configuration](#build-configuration)
- [Environment Variables](#environment-variables)
- [Initial Deployment](#initial-deployment)
- [Deploying Multiple Applications](#deploying-multiple-applications)
- [Custom Domains](#custom-domains)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

Before deploying to Vercel, ensure you have:

- A GitHub account with access to the GhostUI repository
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Repository pushed to GitHub with all recent changes
- All local builds tested and passing (see [Local Build Testing](#local-build-testing))

## Vercel Project Setup

### Step 1: Create Vercel Account

1. Navigate to [vercel.com](https://vercel.com)
2. Click "Sign Up" in the top right corner
3. Choose "Continue with GitHub" for seamless integration
4. Authorize Vercel to access your GitHub account
5. Complete the account setup process

### Step 2: Import Project

1. From your Vercel dashboard, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find the `ghostui` repository (or your fork)
4. Click "Import" next to the repository name

### Step 3: Configure Project Settings

Vercel will attempt to auto-detect your project settings. Configure as follows:

**Framework Preset:**
- Select "Other" or let Vercel auto-detect "Next.js"

**Root Directory:**
- Keep as `.` (monorepo root)
- Do NOT select a specific app directory yet

**Build Settings:**

For the **Docs App** (primary deployment):

```
Build Command: npm run build:docs
Output Directory: apps/docs/.next
Install Command: npm install
```

For the **Demo App** (separate deployment - see section below):

```
Build Command: npm run build:demo
Output Directory: apps/demo/.next
Install Command: npm install
```

**Node.js Version:**
- Vercel will automatically use Node.js 18.x or 20.x
- You can specify a version in `package.json` if needed:
  ```json
  {
    "engines": {
      "node": ">=18.0.0"
    }
  }
  ```

### Step 4: Name Your Project

- Project Name: `ghostui-docs` (for docs app) or `ghostui-demo` (for demo app)
- This will determine your default Vercel URL: `ghostui-docs.vercel.app`

## GitHub Repository Connection

### Automatic Deployments

Once connected, Vercel automatically:

1. **Deploys on Push to Main**: Every push to the `main` branch triggers a production deployment
2. **Creates Preview Deployments**: Every pull request gets a unique preview URL
3. **Posts Status Checks**: Deployment status appears in GitHub PRs
4. **Comments on PRs**: Vercel bot comments with preview URLs

### Configure GitHub Integration

1. In your Vercel project, go to "Settings" → "Git"
2. Verify the connected repository is correct
3. Configure deployment branches:
   - **Production Branch**: `main` (or `master`)
   - **Preview Branches**: All branches (recommended) or specific patterns

### Branch Protection (Optional but Recommended)

In your GitHub repository settings:

1. Go to "Settings" → "Branches"
2. Add branch protection rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass (include Vercel checks)
   - Require branches to be up to date

## Build Configuration

### Understanding the Build Process

The GhostUI monorepo requires a specific build order:

1. **Build ghostui-react package** (`packages/ghostui`)
2. **Build Demo App** (`apps/demo`) - depends on ghostui-react
3. **Build Docs App** (`apps/docs`) - depends on ghostui-react

### Build Scripts

The root `package.json` includes these build scripts:

```json
{
  "scripts": {
    "build:package": "npm run build --workspace=packages/ghostui",
    "build:demo": "npm run build:package && npm run build --workspace=apps/demo",
    "build:docs": "npm run build:package && npm run build --workspace=apps/docs",
    "build:all": "npm run build:package && npm run build:demo && npm run build:docs"
  }
}
```

### Vercel Configuration File

The `vercel.json` file in the repository root defines the build configuration:

```json
{
  "buildCommand": "npm run build:docs",
  "devCommand": "npm run dev --workspace=apps/docs",
  "installCommand": "npm install",
  "framework": null,
  "outputDirectory": "apps/docs/.next"
}
```

**Key Configuration Points:**

- `buildCommand`: Runs the package build first, then the app build
- `installCommand`: Installs all workspace dependencies from the root
- `outputDirectory`: Points to the Next.js build output
- `framework`: Set to `null` for manual configuration

### Workspace Dependencies

Both apps depend on the local `ghostui-react` package. The `package.json` files use workspace protocol:

```json
{
  "dependencies": {
    "ghostui-react": "*"
  }
}
```

Next.js must transpile the local package. Verify `next.config.ts` includes:

```typescript
const config: NextConfig = {
  transpilePackages: ['ghostui-react'],
  // ... other config
};
```

## Environment Variables

### Understanding Environment Variables in Next.js

Next.js has two types of environment variables:

1. **Client-side variables**: Prefixed with `NEXT_PUBLIC_`, embedded in the browser bundle
2. **Server-side variables**: No prefix, only accessible in server-side code

### Setting Up Environment Variables

#### Step 1: Review Required Variables

Check the `.env.example` files in each app directory:

**Demo App** (`apps/demo/.env.example`):
```env
# Public variables (accessible in browser)
NEXT_PUBLIC_SITE_URL=https://demo.ghostui.com
NEXT_PUBLIC_API_URL=https://api.ghostui.com

# Server-only variables
DATABASE_URL=postgresql://...
API_SECRET_KEY=your-secret-key
```

**Docs App** (`apps/docs/.env.example`):
```env
# Public variables
NEXT_PUBLIC_SITE_URL=https://docs.ghostui.com
NEXT_PUBLIC_DOCS_VERSION=3.0.0

# Server-only variables (if needed)
ANALYTICS_KEY=your-analytics-key
```

#### Step 2: Add Variables in Vercel Dashboard

1. In your Vercel project, go to "Settings" → "Environment Variables"
2. For each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SITE_URL`)
   - **Value**: Variable value
   - **Environments**: Select where to apply:
     - ✅ Production (for main branch deployments)
     - ✅ Preview (for PR deployments)
     - ⬜ Development (for local development via `vercel dev`)

3. Click "Save" after adding each variable

#### Step 3: Environment-Specific Values

Use different values for different environments:

**Production:**
```
NEXT_PUBLIC_SITE_URL = https://ghostui-docs.vercel.app
```

**Preview:**
```
NEXT_PUBLIC_SITE_URL = https://ghostui-docs-git-[branch].vercel.app
```

**Tip**: Use Vercel's system environment variables for dynamic values:
- `VERCEL_URL`: Automatically set deployment URL
- `VERCEL_ENV`: Environment type (production, preview, development)
- `VERCEL_GIT_COMMIT_SHA`: Git commit hash

### Security Best Practices

- ❌ Never commit `.env` files to the repository
- ✅ Always use `.env.example` files with placeholder values
- ✅ Rotate secrets regularly
- ✅ Use different secrets for production and preview
- ✅ Limit access to production environment variables

## Initial Deployment

### Deploy Docs App (Primary)

1. After configuring the project, click "Deploy"
2. Vercel will:
   - Clone your repository
   - Install dependencies with `npm install`
   - Run the build command
   - Deploy the built application
3. Monitor the build logs in real-time
4. Wait for "Deployment Ready" message (typically 2-5 minutes)

### Verify Deployment

Once deployed:

1. Click "Visit" to open your deployed application
2. Test key functionality:
   - Navigation works correctly
   - All component pages load
   - Code examples render properly
   - No console errors in browser DevTools
3. Check the deployment URL (e.g., `ghostui-docs.vercel.app`)

### Troubleshooting Initial Deployment

If the deployment fails:

1. **Check Build Logs**: Click on the failed deployment to view logs
2. **Common Issues**:
   - Missing dependencies: Verify `package.json` files
   - Build errors: Test build locally first (see Local Build Testing)
   - Environment variables: Ensure all required variables are set
   - Workspace resolution: Verify workspace dependencies are correct

3. **Fix and Redeploy**:
   - Make fixes in your local repository
   - Push to GitHub
   - Vercel automatically triggers a new deployment

## Deploying Multiple Applications

The GhostUI monorepo contains two applications. You have several deployment options:

### Option 1: Separate Vercel Projects (Recommended)

Deploy each app as a separate Vercel project:

**Docs App Project:**
1. Follow the setup steps above
2. Build Command: `npm run build:docs`
3. Output Directory: `apps/docs/.next`
4. Domain: `ghostui-docs.vercel.app` or custom domain

**Demo App Project:**
1. Create a new Vercel project from the same repository
2. Build Command: `npm run build:demo`
3. Output Directory: `apps/demo/.next`
4. Domain: `ghostui-demo.vercel.app` or custom domain

**Benefits:**
- Independent deployments and scaling
- Separate environment variables
- Different custom domains
- Isolated monitoring and logs

### Option 2: Single Project with Vercel CLI

Deploy one app via GitHub integration, deploy the other via CLI:

1. Set up Docs App via GitHub integration (automatic deployments)
2. Deploy Demo App manually when needed:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy Demo App
cd apps/demo
vercel --prod

# Or deploy from root with specific directory
vercel --cwd apps/demo --prod
```

### Option 3: Monorepo Configuration (Advanced)

Use Vercel's monorepo support to deploy both apps from one project:

1. Create `vercel.json` in the root with multiple projects configuration
2. Use Vercel CLI to link and deploy each app
3. Manage both deployments from a single Vercel project

**Note**: This option is more complex and typically not necessary for most use cases.

## Custom Domains

### Adding a Custom Domain

1. In your Vercel project, go to "Settings" → "Domains"
2. Enter your domain name (e.g., `docs.ghostui.com`)
3. Click "Add"
4. Vercel provides DNS configuration instructions

### DNS Configuration

**Option A: Using Vercel Nameservers (Recommended)**

1. In your domain registrar, update nameservers to Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Vercel automatically manages all DNS records
3. SSL certificate is automatically provisioned

**Option B: Using CNAME Record**

1. In your domain registrar's DNS settings, add a CNAME record:
   ```
   Type: CNAME
   Name: docs (or @ for root domain)
   Value: cname.vercel-dns.com
   ```
2. Wait for DNS propagation (up to 48 hours, usually much faster)
3. Vercel automatically provisions SSL certificate

### Multiple Domains

You can add multiple domains to a single project:

- Primary domain: `ghostui.com`
- Subdomain: `docs.ghostui.com`
- Alternative: `ghostui.dev`

Vercel automatically redirects all domains to your primary domain (configurable).

## Monitoring and Maintenance

### Deployment Dashboard

Monitor your deployments in the Vercel dashboard:

- **Deployments**: View all deployment history
- **Analytics**: Track page views and performance (Pro plan)
- **Logs**: View runtime logs and errors
- **Speed Insights**: Monitor Core Web Vitals (Pro plan)

### Viewing Logs

**Build Logs:**
1. Click on any deployment
2. View the "Building" tab for build output
3. Check for warnings or errors

**Runtime Logs:**
1. Go to your project
2. Click "Logs" in the top navigation
3. Filter by time range, deployment, or search terms
4. View real-time logs or historical data

### Deployment Notifications

Set up notifications for deployment events:

1. Go to "Settings" → "Notifications"
2. Configure notifications for:
   - Deployment started
   - Deployment ready
   - Deployment failed
   - Deployment promoted
3. Choose notification channels:
   - Email
   - Slack
   - Discord
   - Webhook

### Rollback Deployments

If a deployment introduces issues:

1. Go to "Deployments"
2. Find a previous working deployment
3. Click the three dots menu
4. Select "Promote to Production"
5. Confirm the rollback

The previous deployment becomes the production deployment instantly.

### Performance Monitoring

Monitor your application performance:

1. **Speed Insights** (Pro plan): Track Core Web Vitals
2. **Analytics** (Pro plan): Monitor traffic and user behavior
3. **Logs**: Investigate errors and warnings
4. **Build Times**: Track build performance over time

### Regular Maintenance Tasks

**Weekly:**
- Review deployment logs for errors
- Check application performance metrics
- Verify all features are working correctly

**Monthly:**
- Update dependencies (`npm update`)
- Review and rotate secrets if needed
- Check for security advisories (`npm audit`)
- Review Vercel usage and costs

**Quarterly:**
- Review and update documentation
- Audit environment variables
- Review custom domain configurations
- Update Node.js version if needed

## Next Steps

After successful deployment:

1. ✅ Verify both applications are accessible
2. ✅ Test all features in production environment
3. ✅ Set up custom domains (optional)
4. ✅ Configure deployment notifications
5. ✅ Document deployment process for team
6. ✅ Set up monitoring and alerting
7. ✅ Publish NPM package (see [NPM Publishing Guide](./NPM_PUBLISHING.md))

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Monorepo Deployment Guide](https://vercel.com/docs/concepts/monorepos)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Review [Local Build Testing](./LOCAL_BUILD_TESTING.md) procedures
3. Consult Vercel documentation
4. Contact the GhostUI team
5. Open an issue in the GitHub repository
