# Deploy GhostUI Demo App to Vercel

This guide explains how to deploy the Demo app (potion shop) as a separate Vercel project.

## Prerequisites

- Docs app already deployed successfully
- Same GitHub repository connected

## Step 1: Create New Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same** `ghostui` repository
3. Vercel will warn about existing project - click "Import Anyway"

## Step 2: Configure Project Settings

**Project Name:**
```
ghostui-demo
```

**Framework Preset:**
```
Next.js
```

**Root Directory:**
```
(leave empty - use repository root)
```

## Step 3: Override Build Settings

Click "Override" and enter these settings:

**Build Command:**
```
npm run build:demo
```

**Output Directory:**
```
apps/demo/.next
```

**Install Command:**
```
npm install
```

## Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## Expected Result

- Demo app live at: `https://ghostui-demo.vercel.app`
- Automatic deployments on push to main
- Preview deployments for PRs

## Troubleshooting

If you encounter native binary errors (rollup, tailwindcss, lightningcss), they should be resolved automatically since we added them as `optionalDependencies` in the root `package.json`.

## URLs After Deployment

- **Docs App:** https://ghostui-docs.vercel.app
- **Demo App:** https://ghostui-demo.vercel.app
