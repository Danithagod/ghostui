# GhostUI Deployment Knowledge Transfer

This document provides a comprehensive knowledge transfer guide for the GhostUI deployment infrastructure. Use this to onboard new team members or refresh understanding of the deployment system.

## Table of Contents

- [Overview](#overview)
- [Architecture Walkthrough](#architecture-walkthrough)
- [Configuration Deep Dive](#configuration-deep-dive)
- [Deployment Process Demonstration](#deployment-process-demonstration)
- [Troubleshooting Workshop](#troubleshooting-workshop)
- [Hands-On Exercises](#hands-on-exercises)
- [Q&A and Feedback](#qa-and-feedback)
- [Additional Resources](#additional-resources)

## Overview

### What We're Deploying

The GhostUI monorepo consists of:

1. **ghostui-react Package** (`packages/ghostui`)
   - React component library
   - Published to NPM
   - Used by both applications

2. **Demo App** (`apps/demo`)
   - Potion shop e-commerce demonstration
   - Showcases GhostUI components in action
   - Deployed to Vercel

3. **Docs App** (`apps/docs`)
   - Component documentation site
   - Code examples and usage guides
   - Deployed to Vercel

### Deployment Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                       │
│                     (Source of Truth)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Webhook on push/PR
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Platform                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Build Process                                        │  │
│  │  1. Install dependencies (npm install)                │  │
│  │  2. Build ghostui-react package                       │  │
│  │  3. Build Demo App                                    │  │
│  │  4. Build Docs App                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Deployment                                           │  │
│  │  • Production: main branch                            │  │
│  │  • Preview: feature branches                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Live Applications                         │
│  • Docs: https://ghostui-docs.vercel.app                   │
│  • Demo: https://ghostui-demo.vercel.app                   │
└─────────────────────────────────────────────────────────────┘
```

### Key Technologies

- **Monorepo**: NPM Workspaces
- **Framework**: Next.js 14+ (App Router)
- **Deployment**: Vercel
- **CI/CD**: GitHub + Vercel integration
- **Package Registry**: NPM

## Architecture Walkthrough

### Monorepo Structure

Let's walk through the repository structure:

```
ghostui/
├── packages/
│   └── ghostui/                    # Component library
│       ├── src/                    # Source code
│       ├── dist/                   # Build output (gitignored)
│       ├── package.json            # Package configuration
│       └── vite.config.ts          # Build configuration
│
├── apps/
│   ├── demo/                       # Demo application
│   │   ├── app/                    # Next.js app directory
│   │   ├── components/             # App-specific components
│   │   ├── public/                 # Static assets
│   │   ├── package.json            # App dependencies
│   │   └── next.config.ts          # Next.js configuration
│   │
│   └── docs/                       # Documentation site
│       ├── app/                    # Next.js app directory
│       ├── components/             # Doc-specific components
│       ├── public/                 # Static assets
│       ├── package.json            # App dependencies
│       └── next.config.ts          # Next.js configuration
│
├── package.json                    # Root workspace configuration
├── vercel.json                     # Vercel deployment config
└── .vercelignore                   # Files to exclude from deployment
```

### Dependency Flow

Understanding how dependencies flow is crucial:

```
┌─────────────────────────────────────────────────────────────┐
│  Root package.json                                           │
│  • Defines workspaces: ["packages/*", "apps/*"]             │
│  • Shared dependencies (React, TypeScript, etc.)            │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐    ┌──────────────────┐
│  Demo App        │    │  Docs App        │
│  package.json    │    │  package.json    │
│                  │    │                  │
│  dependencies:   │    │  dependencies:   │
│  • ghostui-react │    │  • ghostui-react │
│  • next          │    │  • next          │
│  • react         │    │  • react         │
└────────┬─────────┘    └────────┬─────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌──────────────────────┐
         │  ghostui-react       │
         │  packages/ghostui    │
         │                      │
         │  peerDependencies:   │
         │  • react             │
         │  • react-dom         │
         └──────────────────────┘
```

**Key Points:**

1. **Workspace Dependencies**: Apps reference `ghostui-react` using `"*"` in package.json
2. **Peer Dependencies**: ghostui-react declares React as a peer dependency
3. **Hoisting**: NPM installs shared dependencies at the root level
4. **Local Resolution**: Workspace dependencies resolve to local packages, not NPM

### Build Process

The build process follows a specific order:

```
Step 1: Install Dependencies
├── npm install (at root)
├── Installs all workspace dependencies
└── Creates node_modules at root and in workspaces

Step 2: Build ghostui-react Package
├── npm run build --workspace=packages/ghostui
├── Compiles TypeScript to JavaScript
├── Generates type definitions
├── Bundles with Vite
└── Outputs to packages/ghostui/dist/

Step 3: Build Demo App
├── npm run build --workspace=apps/demo
├── Next.js reads next.config.ts
├── Transpiles ghostui-react (via transpilePackages)
├── Bundles application code
└── Outputs to apps/demo/.next/

Step 4: Build Docs App
├── npm run build --workspace=apps/docs
├── Next.js reads next.config.ts
├── Transpiles ghostui-react (via transpilePackages)
├── Bundles application code
└── Outputs to apps/docs/.next/
```

**Critical Configuration:**

The `transpilePackages` setting in `next.config.ts` is essential:

```typescript
// apps/demo/next.config.ts
const config: NextConfig = {
  transpilePackages: ['ghostui-react'],
  // This tells Next.js to process the ghostui-react package
  // Without this, Next.js won't transpile the local package
};
```

## Configuration Deep Dive

### vercel.json

This file controls how Vercel builds and deploys the applications.

```json
{
  "buildCommand": "npm run build:docs",
  "devCommand": "npm run dev --workspace=apps/docs",
  "installCommand": "npm install",
  "framework": null,
  "outputDirectory": "apps/docs/.next"
}
```

**Field Explanations:**

- **buildCommand**: Command Vercel runs to build the application
  - For Docs: `npm run build:docs` (builds package + docs)
  - For Demo: `npm run build:demo` (builds package + demo)

- **devCommand**: Command for local development (used by `vercel dev`)
  - Starts the Next.js development server

- **installCommand**: Command to install dependencies
  - `npm install` installs all workspace dependencies

- **framework**: Framework preset
  - `null` means manual configuration
  - Could be "nextjs" for auto-detection

- **outputDirectory**: Where the built files are located
  - Points to the `.next` directory of the app being deployed

### package.json Scripts

The root `package.json` defines build scripts:

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

**Script Breakdown:**

- **build:package**: Builds only the ghostui-react package
- **build:demo**: Builds package first, then demo app (ensures dependency is ready)
- **build:docs**: Builds package first, then docs app
- **build:all**: Builds everything in correct order

**Why the Order Matters:**

The apps depend on the built package (`packages/ghostui/dist/`). If we build the apps before the package, they'll fail because the dependency doesn't exist yet.

### next.config.ts

Each app has its own Next.js configuration:

```typescript
// apps/demo/next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  // Transpile the local workspace package
  transpilePackages: ['ghostui-react'],
  
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Use SWC for faster minification
  swcMinify: true,
  
  // Other Next.js configuration...
};

export default config;
```

**Key Settings:**

- **transpilePackages**: Critical for monorepo setup
  - Tells Next.js to process the ghostui-react package
  - Without this, you'll get "Unexpected token" errors

- **reactStrictMode**: Enables additional checks in development
  - Helps catch potential issues early

- **swcMinify**: Uses SWC (Rust-based) for faster builds
  - Significantly faster than Terser

### Environment Variables

Environment variables are managed in Vercel's dashboard:

**Client-Side Variables** (prefixed with `NEXT_PUBLIC_`):
```env
NEXT_PUBLIC_SITE_URL=https://ghostui-docs.vercel.app
NEXT_PUBLIC_API_URL=https://api.ghostui.com
```

**Server-Side Variables** (no prefix):
```env
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret123
```

**How They Work:**

1. **Build Time**: Variables are injected during the build process
2. **Client Variables**: Embedded in the JavaScript bundle
3. **Server Variables**: Only available in server-side code
4. **Environment Targets**: Can be set for Production, Preview, or Development

**Security Note:**

Never put secrets in `NEXT_PUBLIC_` variables! They're visible in the browser.

## Deployment Process Demonstration

### Automatic Deployment (GitHub Integration)

Let's walk through a typical deployment:

#### Step 1: Developer Makes Changes

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes to code
# ... edit files ...

# Commit changes
git add .
git commit -m "feat: add new SpookyComponent"

# Push to GitHub
git push origin feature/new-component
```

#### Step 2: Create Pull Request

```bash
# Create PR via GitHub CLI
gh pr create \
  --title "Add SpookyComponent" \
  --body "Adds a new spooky component with animations"

# Or create via GitHub web interface
```

#### Step 3: Vercel Creates Preview Deployment

1. **Webhook Trigger**: GitHub notifies Vercel of new PR
2. **Build Starts**: Vercel clones the branch and starts building
3. **Build Process**:
   ```
   [Vercel] Installing dependencies...
   [Vercel] Running build command: npm run build:docs
   [Vercel] Building ghostui-react package...
   [Vercel] Building docs app...
   [Vercel] Build completed in 3m 24s
   ```
4. **Deployment**: Vercel deploys to a unique preview URL
5. **Comment**: Vercel bot comments on PR with preview URL

#### Step 4: Review and Test

Team members:
1. Click preview URL in PR comment
2. Test the new component
3. Verify no regressions
4. Approve the PR

#### Step 5: Merge to Main

```bash
# Merge via GitHub UI or CLI
gh pr merge --squash

# Or via git
git checkout main
git merge feature/new-component
git push origin main
```

#### Step 6: Production Deployment

1. **Webhook Trigger**: GitHub notifies Vercel of push to main
2. **Build Starts**: Vercel builds from main branch
3. **Build Process**: Same as preview, but targets production
4. **Deployment**: Vercel deploys to production URL
5. **Notification**: Team receives deployment notification

**Timeline:**
- PR creation to preview: 3-5 minutes
- Merge to production deployment: 3-5 minutes
- **Total: 6-10 minutes from PR to production**

### Manual Deployment (Vercel CLI)

Sometimes you need to deploy manually:

#### When to Use Manual Deployment

- Automatic deployment is failing
- Need to deploy a specific branch
- Testing deployment configuration
- Emergency hotfix

#### Step-by-Step Process

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Authenticate
vercel login
# Opens browser for authentication

# 3. Link project (first time only)
vercel link
# Select team and project

# 4. Deploy to preview
vercel
# Deploys current branch to preview URL

# 5. Deploy to production
vercel --prod
# Deploys current branch to production

# 6. Deploy specific app
vercel --prod --cwd apps/demo
# Deploys only the demo app
```

#### Vercel CLI Commands Reference

```bash
# View deployments
vercel ls

# View logs
vercel logs [deployment-url]

# Inspect deployment
vercel inspect [deployment-url]

# Remove deployment
vercel rm [deployment-url]

# View environment variables
vercel env ls

# Add environment variable
vercel env add [name]

# Pull environment variables locally
vercel env pull
```

## Troubleshooting Workshop

Let's walk through common issues and how to resolve them.

### Issue 1: "Cannot find module 'ghostui-react'"

**Scenario**: Build fails with module not found error.

**Diagnosis Steps:**

```bash
# 1. Check if package is built
ls packages/ghostui/dist
# Should show: ghostui.es.js, ghostui.umd.js, index.d.ts, etc.

# 2. Check workspace dependency
cat apps/demo/package.json | grep ghostui-react
# Should show: "ghostui-react": "*"

# 3. Check package name
cat packages/ghostui/package.json | grep '"name"'
# Should show: "name": "ghostui-react"

# 4. Verify build order
cat vercel.json | grep buildCommand
# Should include building package first
```

**Solution:**

```bash
# Ensure build command builds package first
# In vercel.json:
{
  "buildCommand": "npm run build:package && npm run build:docs"
}

# Or in package.json:
{
  "scripts": {
    "build:docs": "npm run build:package && npm run build --workspace=apps/docs"
  }
}
```

### Issue 2: "Module parse failed: Unexpected token"

**Scenario**: Build succeeds but runtime error occurs.

**Diagnosis Steps:**

```bash
# 1. Check next.config.ts
cat apps/demo/next.config.ts | grep transpilePackages
# Should show: transpilePackages: ['ghostui-react']

# 2. Verify syntax
npx tsc --noEmit apps/demo/next.config.ts
# Should show no errors
```

**Solution:**

```typescript
// Add to next.config.ts
const config: NextConfig = {
  transpilePackages: ['ghostui-react'],
  // ... other config
};
```

### Issue 3: Hydration Errors

**Scenario**: "Hydration failed" error in browser console.

**Diagnosis Steps:**

```bash
# 1. Check for browser-only APIs in components
grep -r "window\." packages/ghostui/src/
grep -r "document\." packages/ghostui/src/

# 2. Look for random values during SSR
grep -r "Math.random()" packages/ghostui/src/
grep -r "new Date()" packages/ghostui/src/
```

**Solution:**

```typescript
// ❌ Bad: Using window during SSR
const width = window.innerWidth;

// ✅ Good: Use useEffect
const [width, setWidth] = useState(0);
useEffect(() => {
  setWidth(window.innerWidth);
}, []);

// ❌ Bad: Random values during SSR
const id = Math.random();

// ✅ Good: Generate on client only
const [id, setId] = useState<number>();
useEffect(() => {
  setId(Math.random());
}, []);
```

### Issue 4: Environment Variables Not Working

**Scenario**: `process.env.NEXT_PUBLIC_API_URL` is undefined.

**Diagnosis Steps:**

```bash
# 1. Check variable name (case-sensitive!)
# In Vercel dashboard: Settings → Environment Variables

# 2. Check prefix
# Client variables MUST start with NEXT_PUBLIC_

# 3. Check environment target
# Variable must be set for Production/Preview/Development

# 4. Verify deployment after adding variable
# Environment variables require a new deployment
```

**Solution:**

1. Add variable in Vercel dashboard with correct prefix
2. Trigger new deployment (push commit or manual deploy)
3. Verify variable is accessible:

```typescript
// In component
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

### Issue 5: Slow Build Times

**Scenario**: Builds taking longer than 5 minutes.

**Diagnosis Steps:**

```bash
# 1. Check build logs for slow steps
# In Vercel dashboard: Deployment → Building tab

# 2. Check dependency count
npm ls --depth=0

# 3. Check for large dependencies
npm ls --depth=0 --json | jq '.dependencies | to_entries | map({key: .key, size: .value}) | sort_by(.size) | reverse | .[0:10]'
```

**Solutions:**

1. **Enable caching**: Commit `package-lock.json`
2. **Remove unused dependencies**: `npm prune`
3. **Use production dependencies**: `npm install --production`
4. **Optimize build process**: Use incremental builds

## Hands-On Exercises

### Exercise 1: Deploy a Change

**Objective**: Make a small change and deploy it through the full pipeline.

**Steps:**

1. Create a new branch:
   ```bash
   git checkout -b exercise/test-deployment
   ```

2. Make a small change (e.g., update README):
   ```bash
   echo "\n## Test Change" >> README.md
   git add README.md
   git commit -m "docs: test deployment"
   ```

3. Push and create PR:
   ```bash
   git push origin exercise/test-deployment
   gh pr create --title "Test Deployment" --body "Testing deployment process"
   ```

4. Wait for preview deployment and test it

5. Merge to main and verify production deployment

**Expected Outcome**: Successfully deploy a change from branch to production.

### Exercise 2: Perform a Rollback

**Objective**: Practice rolling back a deployment.

**Steps:**

1. Go to Vercel dashboard
2. Navigate to Deployments tab
3. Find a previous deployment
4. Click three dots menu → "Promote to Production"
5. Verify rollback successful

**Expected Outcome**: Successfully rollback to a previous deployment.

### Exercise 3: Debug a Build Failure

**Objective**: Intentionally break the build and fix it.

**Steps:**

1. Create a branch with a syntax error:
   ```bash
   git checkout -b exercise/break-build
   ```

2. Add syntax error to a file:
   ```typescript
   // In packages/ghostui/src/components/GooeyButton.tsx
   // Add: const broken = {
   ```

3. Push and observe build failure:
   ```bash
   git add .
   git commit -m "test: intentional syntax error"
   git push origin exercise/break-build
   ```

4. Review build logs in Vercel

5. Fix the error and push again

**Expected Outcome**: Understand how to read build logs and fix errors.

### Exercise 4: Add an Environment Variable

**Objective**: Add and use an environment variable.

**Steps:**

1. Go to Vercel dashboard → Settings → Environment Variables

2. Add a new variable:
   - Key: `NEXT_PUBLIC_TEST_MESSAGE`
   - Value: `Hello from environment!`
   - Target: Preview

3. Create a branch and use the variable:
   ```typescript
   // In apps/docs/app/page.tsx
   console.log('Test message:', process.env.NEXT_PUBLIC_TEST_MESSAGE);
   ```

4. Push and verify in preview deployment

**Expected Outcome**: Successfully add and use an environment variable.

### Exercise 5: Test Local Build

**Objective**: Build and test locally before deploying.

**Steps:**

1. Clean previous builds:
   ```bash
   rm -rf packages/ghostui/dist
   rm -rf apps/demo/.next
   rm -rf apps/docs/.next
   ```

2. Build everything:
   ```bash
   npm run build:all
   ```

3. Start production server:
   ```bash
   npm run start --workspace=apps/docs
   ```

4. Test in browser at `http://localhost:3000`

**Expected Outcome**: Successfully build and run locally in production mode.

## Q&A and Feedback

### Common Questions

**Q: How long does a typical deployment take?**

A: 3-5 minutes from push to deployment ready. This includes:
- Installing dependencies: 1-2 minutes
- Building package: 30 seconds
- Building app: 1-2 minutes
- Deployment: 30 seconds

**Q: Can we deploy both apps from a single push?**

A: Yes, but they're typically deployed as separate Vercel projects. Each project watches the same repository but builds different apps.

**Q: What happens if a build fails?**

A: The previous successful deployment remains active. Failed builds don't affect production.

**Q: How do we handle secrets?**

A: Use environment variables in Vercel dashboard. Never commit secrets to git. Use server-side variables (without `NEXT_PUBLIC_` prefix) for sensitive data.

**Q: Can we preview changes before merging?**

A: Yes! Every PR gets a unique preview URL. Test thoroughly before merging.

**Q: How do we rollback a bad deployment?**

A: Use Vercel dashboard to promote a previous deployment to production. Takes 1-2 minutes.

**Q: What if Vercel is down?**

A: Check https://www.vercel-status.com for status. Previous deployment remains active. Can deploy via CLI if dashboard is unavailable.

**Q: How do we monitor deployments?**

A: Use Vercel dashboard for logs and analytics. Set up notifications in Settings → Notifications.

### Feedback Collection

Please provide feedback on this knowledge transfer:

1. **What was most helpful?**
   - [ ] Architecture walkthrough
   - [ ] Configuration deep dive
   - [ ] Deployment demonstration
   - [ ] Troubleshooting workshop
   - [ ] Hands-on exercises

2. **What needs more explanation?**
   - [ ] Monorepo structure
   - [ ] Build process
   - [ ] Environment variables
   - [ ] Vercel configuration
   - [ ] Troubleshooting

3. **What would you like to see added?**
   - [ ] More examples
   - [ ] Video walkthrough
   - [ ] Advanced topics
   - [ ] Performance optimization
   - [ ] Security best practices

4. **How confident do you feel deploying changes?**
   - [ ] Very confident
   - [ ] Somewhat confident
   - [ ] Need more practice
   - [ ] Need more guidance

## Additional Resources

### Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [Deployment Runbook](./DEPLOYMENT_RUNBOOK.md) - Operational procedures
- [Local Build Testing](./LOCAL_BUILD_TESTING.md) - Testing builds locally
- [NPM Publishing Guide](./NPM_PUBLISHING.md) - Publishing package to NPM
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and solutions

### External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NPM Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

### Video Tutorials (To Be Created)

- [ ] Monorepo Setup and Configuration
- [ ] Deploying to Vercel
- [ ] Troubleshooting Common Issues
- [ ] Environment Variable Management
- [ ] Rollback Procedures

### Team Contacts

For questions or help:

- **Deployment Issues**: #ghostui-deployments (Slack)
- **General Questions**: #ghostui-dev (Slack)
- **Urgent Issues**: Page on-call engineer
- **Documentation**: Open issue in GitHub

### Next Steps

After completing this knowledge transfer:

1. **Practice**: Try the hands-on exercises
2. **Deploy**: Make a small change and deploy it
3. **Document**: Add your learnings to team wiki
4. **Share**: Help onboard the next team member
5. **Improve**: Suggest improvements to this document

---

**Knowledge Transfer Completed**: [Date]  
**Facilitator**: [Name]  
**Participants**: [Names]  
**Next Review**: [Date]
