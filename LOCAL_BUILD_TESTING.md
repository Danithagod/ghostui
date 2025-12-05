# Local Build Testing Guide

This guide provides comprehensive instructions for testing production builds locally before deploying to Vercel. Testing builds locally helps catch issues early and ensures smooth deployments.

## Table of Contents

- [Why Test Builds Locally](#why-test-builds-locally)
- [Prerequisites](#prerequisites)
- [Testing Package Build](#testing-package-build)
- [Testing Application Builds](#testing-application-builds)
- [Testing Full Build Sequence](#testing-full-build-sequence)
- [Testing Production Mode](#testing-production-mode)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
- [Build Verification Checklist](#build-verification-checklist)

## Why Test Builds Locally

Testing builds locally before deployment helps you:

- ✅ Catch build errors before they reach Vercel
- ✅ Verify workspace dependencies resolve correctly
- ✅ Test production optimizations and behavior
- ✅ Identify missing dependencies or configuration issues
- ✅ Reduce deployment failures and iteration time
- ✅ Ensure consistent behavior between local and production

## Prerequisites

Before testing builds, ensure you have:

- Node.js 18.x or higher installed
- All dependencies installed: `npm install`
- Clean working directory (commit or stash changes)
- Sufficient disk space for build outputs

**Verify your setup:**

```bash
# Check Node.js version
node --version
# Should output v18.x.x or higher

# Check npm version
npm --version
# Should output 8.x.x or higher

# Verify workspace structure
npm run --workspaces --if-present list
# Should list all workspace packages
```

## Testing Package Build

The `ghostui-react` package must build successfully before the applications can build.

### Step 1: Clean Previous Builds

```bash
# Remove previous build artifacts
rm -rf packages/ghostui/dist

# On Windows (PowerShell):
Remove-Item -Recurse -Force packages/ghostui/dist -ErrorAction SilentlyContinue

# On Windows (CMD):
if exist packages\ghostui\dist rmdir /s /q packages\ghostui\dist
```

### Step 2: Build the Package

```bash
# Build from root
npm run build:package

# Or build from package directory
cd packages/ghostui
npm run build
cd ../..
```

### Step 3: Verify Build Output

Check that the build completed successfully:

```bash
# Verify dist directory exists
ls packages/ghostui/dist

# On Windows (PowerShell):
Get-ChildItem packages/ghostui/dist

# On Windows (CMD):
dir packages\ghostui\dist
```

**Expected output structure:**

```
packages/ghostui/dist/
├── ghostui.es.js          # ES module bundle
├── ghostui.umd.js         # UMD bundle
├── index.d.ts             # Type definitions
├── components/            # Component type definitions
├── types/                 # Type definitions
└── index.css              # Compiled styles
```

### Step 4: Verify Package Exports

Test that all exports are accessible:

```bash
# Check main exports
node -e "const pkg = require('./packages/ghostui/package.json'); console.log('Exports:', Object.keys(pkg.exports));"

# Verify type definitions exist
test -f packages/ghostui/dist/index.d.ts && echo "✓ Type definitions found" || echo "✗ Type definitions missing"

# On Windows (PowerShell):
if (Test-Path packages/ghostui/dist/index.d.ts) { Write-Host "✓ Type definitions found" } else { Write-Host "✗ Type definitions missing" }
```

### Step 5: Test Package Locally

Use npm link to test the package in isolation:

```bash
# Link the package globally
cd packages/ghostui
npm link
cd ../..

# Create a test project (optional)
mkdir test-ghostui
cd test-ghostui
npm init -y
npm link ghostui-react

# Test importing the package
node -e "const ghostui = require('ghostui-react'); console.log('Package loaded:', !!ghostui);"

# Clean up
cd ..
rm -rf test-ghostui
cd packages/ghostui
npm unlink
cd ../..
```

## Testing Application Builds

### Testing Demo App Build

The Demo App is a complete potion shop e-commerce application.

#### Step 1: Clean Previous Build

```bash
# Remove previous build
rm -rf apps/demo/.next

# On Windows (PowerShell):
Remove-Item -Recurse -Force apps/demo/.next -ErrorAction SilentlyContinue

# On Windows (CMD):
if exist apps\demo\.next rmdir /s /q apps\demo\.next
```

#### Step 2: Build Demo App

```bash
# Build from root (includes package build)
npm run build:demo

# Or build manually with dependencies
npm run build:package && npm run build --workspace=apps/demo
```

#### Step 3: Verify Build Output

```bash
# Check build directory exists
ls apps/demo/.next

# Verify key build artifacts
test -d apps/demo/.next/static && echo "✓ Static assets built" || echo "✗ Static assets missing"
test -f apps/demo/.next/BUILD_ID && echo "✓ Build ID generated" || echo "✗ Build ID missing"

# On Windows (PowerShell):
if (Test-Path apps/demo/.next/static) { Write-Host "✓ Static assets built" } else { Write-Host "✗ Static assets missing" }
if (Test-Path apps/demo/.next/BUILD_ID) { Write-Host "✓ Build ID generated" } else { Write-Host "✗ Build ID missing" }
```

#### Step 4: Check for Build Warnings

Review the build output for warnings:

- ⚠️ Large bundle sizes
- ⚠️ Missing dependencies
- ⚠️ Deprecated APIs
- ⚠️ Type errors (if using TypeScript)

### Testing Docs App Build

The Docs App provides component documentation and examples.

#### Step 1: Clean Previous Build

```bash
# Remove previous build
rm -rf apps/docs/.next

# On Windows (PowerShell):
Remove-Item -Recurse -Force apps/docs/.next -ErrorAction SilentlyContinue

# On Windows (CMD):
if exist apps\docs\.next rmdir /s /q apps\docs\.next
```

#### Step 2: Build Docs App

```bash
# Build from root (includes package build)
npm run build:docs

# Or build manually with dependencies
npm run build:package && npm run build --workspace=apps/docs
```

#### Step 3: Verify Build Output

```bash
# Check build directory exists
ls apps/docs/.next

# Verify key build artifacts
test -d apps/docs/.next/static && echo "✓ Static assets built" || echo "✗ Static assets missing"
test -f apps/docs/.next/BUILD_ID && echo "✓ Build ID generated" || echo "✗ Build ID missing"

# On Windows (PowerShell):
if (Test-Path apps/docs/.next/static) { Write-Host "✓ Static assets built" } else { Write-Host "✗ Static assets missing" }
if (Test-Path apps/docs/.next/BUILD_ID) { Write-Host "✓ Build ID generated" } else { Write-Host "✗ Build ID missing" }
```

## Testing Full Build Sequence

Test the complete build sequence as Vercel would execute it.

### Step 1: Clean All Build Artifacts

```bash
# Clean all builds
npm run clean

# Or manually clean each
rm -rf packages/ghostui/dist
rm -rf apps/demo/.next
rm -rf apps/docs/.next

# On Windows (PowerShell):
Remove-Item -Recurse -Force packages/ghostui/dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/demo/.next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force apps/docs/.next -ErrorAction SilentlyContinue
```

### Step 2: Run Full Build

```bash
# Build everything in correct order
npm run build:all

# This executes:
# 1. npm run build:package
# 2. npm run build:demo
# 3. npm run build:docs
```

### Step 3: Verify Build Order

Ensure builds complete in the correct order:

1. ✅ Package builds first
2. ✅ Demo app builds second (depends on package)
3. ✅ Docs app builds third (depends on package)

If any build fails, the subsequent builds should not execute.

### Step 4: Check Build Times

Monitor build times to identify performance issues:

```bash
# Time the full build
time npm run build:all

# On Windows (PowerShell):
Measure-Command { npm run build:all }
```

**Expected build times:**
- Package: 10-30 seconds
- Demo App: 30-60 seconds
- Docs App: 30-60 seconds
- Total: 1-3 minutes

## Testing Production Mode

Test the built applications in production mode locally.

### Testing Demo App in Production Mode

#### Step 1: Build the Application

```bash
npm run build:demo
```

#### Step 2: Start Production Server

```bash
# Start from app directory
cd apps/demo
npm run start

# Or from root
npm run start --workspace=apps/demo
```

#### Step 3: Access the Application

Open your browser to `http://localhost:3000` (or the port shown in terminal).

#### Step 4: Test Key Features

Verify all e-commerce features work correctly:

- ✅ Product grid loads and displays products
- ✅ Search functionality works
- ✅ Filtering by rarity works
- ✅ Product cards are interactive
- ✅ Cart drawer opens and closes
- ✅ Add to cart functionality works
- ✅ Cart displays correct items and totals
- ✅ Checkout modal opens
- ✅ Order progress displays correctly
- ✅ Responsive design works on mobile

#### Step 5: Check Browser Console

Open browser DevTools (F12) and check for:

- ❌ No console errors
- ❌ No 404 errors for assets
- ❌ No hydration errors
- ✅ All components render correctly

#### Step 6: Stop the Server

Press `Ctrl+C` in the terminal to stop the server.

### Testing Docs App in Production Mode

#### Step 1: Build the Application

```bash
npm run build:docs
```

#### Step 2: Start Production Server

```bash
# Start from app directory
cd apps/docs
npm run start

# Or from root
npm run start --workspace=apps/docs
```

#### Step 3: Access the Application

Open your browser to `http://localhost:3000` (or the port shown in terminal).

#### Step 4: Test Key Features

Verify documentation features work correctly:

- ✅ Homepage loads correctly
- ✅ Navigation sidebar works
- ✅ All component pages load
- ✅ Code examples render correctly
- ✅ Syntax highlighting works
- ✅ Interactive examples function
- ✅ Search functionality works (if implemented)
- ✅ Responsive design works on mobile

#### Step 5: Check Browser Console

Open browser DevTools (F12) and check for:

- ❌ No console errors
- ❌ No 404 errors for assets
- ❌ No hydration errors
- ✅ All components render correctly

#### Step 6: Stop the Server

Press `Ctrl+C` in the terminal to stop the server.

## Troubleshooting Common Issues

### Build Fails: "Cannot find module 'ghostui-react'"

**Cause**: Package not built or workspace dependency not resolved.

**Solution**:
```bash
# Build package first
npm run build:package

# Verify dist directory exists
ls packages/ghostui/dist

# Rebuild application
npm run build:demo  # or build:docs
```

### Build Fails: "Module parse failed: Unexpected token"

**Cause**: Next.js not transpiling the ghostui-react package.

**Solution**:

Check `next.config.ts` includes:
```typescript
const config: NextConfig = {
  transpilePackages: ['ghostui-react'],
  // ...
};
```

### Build Succeeds but Runtime Errors Occur

**Cause**: Missing dependencies or incorrect imports.

**Solution**:
```bash
# Check for missing dependencies
npm install

# Verify all peer dependencies are installed
npm ls react react-dom

# Rebuild everything
npm run build:all
```

### Build is Very Slow

**Cause**: Large dependencies, no caching, or inefficient build process.

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use faster package manager (optional)
npm install -g pnpm
pnpm install
```

### TypeScript Errors During Build

**Cause**: Type errors in code or missing type definitions.

**Solution**:
```bash
# Check TypeScript errors
npm run type-check --workspace=apps/demo
npm run type-check --workspace=apps/docs

# Fix errors in code
# Then rebuild
npm run build:all
```

### Production Server Won't Start

**Cause**: Build not completed or port already in use.

**Solution**:
```bash
# Verify build exists
ls apps/demo/.next

# Check if port is in use
lsof -i :3000  # On macOS/Linux
netstat -ano | findstr :3000  # On Windows

# Kill process using port or use different port
PORT=3001 npm run start --workspace=apps/demo
```

### Hydration Errors in Browser

**Cause**: Mismatch between server and client rendering.

**Solution**:
- Check for browser-only APIs used during SSR
- Verify all components are properly hydrated
- Use `useEffect` for client-only code
- Check for inconsistent data between server and client

### Missing Static Assets (404 Errors)

**Cause**: Assets not copied to build output or incorrect paths.

**Solution**:
```bash
# Verify public directory structure
ls apps/demo/public
ls apps/docs/public

# Check Next.js static file handling
# Assets in public/ should be accessible at /filename

# Rebuild application
npm run build:demo
```

### Environment Variables Not Working

**Cause**: Variables not prefixed correctly or not set during build.

**Solution**:
```bash
# Create .env.local file
cp apps/demo/.env.example apps/demo/.env.local

# Edit .env.local with your values
# Ensure client variables use NEXT_PUBLIC_ prefix

# Rebuild with environment variables
npm run build:demo
```

## Build Verification Checklist

Use this checklist before deploying to Vercel:

### Package Build

- [ ] `packages/ghostui/dist` directory exists
- [ ] `dist/index.d.ts` type definitions exist
- [ ] `dist/ghostui.es.js` ES module bundle exists
- [ ] `dist/index.css` styles exist
- [ ] No build errors or warnings
- [ ] Package exports are accessible

### Demo App Build

- [ ] `apps/demo/.next` directory exists
- [ ] `.next/BUILD_ID` file exists
- [ ] `.next/static` directory contains assets
- [ ] No build errors
- [ ] Build warnings reviewed and acceptable
- [ ] Production server starts successfully
- [ ] All e-commerce features work in production mode
- [ ] No console errors in browser
- [ ] Responsive design works correctly

### Docs App Build

- [ ] `apps/docs/.next` directory exists
- [ ] `.next/BUILD_ID` file exists
- [ ] `.next/static` directory contains assets
- [ ] No build errors
- [ ] Build warnings reviewed and acceptable
- [ ] Production server starts successfully
- [ ] All documentation pages load correctly
- [ ] Code examples render properly
- [ ] No console errors in browser
- [ ] Responsive design works correctly

### Full Build Sequence

- [ ] `npm run build:all` completes successfully
- [ ] Build order is correct (package → apps)
- [ ] Total build time is acceptable (< 5 minutes)
- [ ] All three builds produce expected output
- [ ] No dependency resolution errors

### Environment and Configuration

- [ ] `.env.example` files exist for both apps
- [ ] Environment variables are documented
- [ ] `next.config.ts` includes `transpilePackages`
- [ ] `vercel.json` configuration is correct
- [ ] `.vercelignore` excludes unnecessary files

### Final Checks

- [ ] All tests pass: `npm test`
- [ ] TypeScript checks pass: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Git working directory is clean
- [ ] Changes are committed and pushed to GitHub

## Automated Build Testing Script

Create a script to automate build testing:

```bash
#!/bin/bash
# test-builds.sh

set -e  # Exit on error

echo "🧹 Cleaning previous builds..."
rm -rf packages/ghostui/dist
rm -rf apps/demo/.next
rm -rf apps/docs/.next

echo "📦 Building package..."
npm run build:package

echo "✅ Package build complete"
test -d packages/ghostui/dist || exit 1

echo "🏪 Building Demo App..."
npm run build:demo

echo "✅ Demo App build complete"
test -d apps/demo/.next || exit 1

echo "📚 Building Docs App..."
npm run build:docs

echo "✅ Docs App build complete"
test -d apps/docs/.next || exit 1

echo "🎉 All builds completed successfully!"
```

Make it executable and run:

```bash
chmod +x test-builds.sh
./test-builds.sh
```

## Next Steps

After successful local build testing:

1. ✅ Commit and push changes to GitHub
2. ✅ Deploy to Vercel (see [Deployment Guide](./DEPLOYMENT.md))
3. ✅ Monitor deployment logs
4. ✅ Verify production deployment
5. ✅ Test deployed applications

## Additional Resources

- [Next.js Build Documentation](https://nextjs.org/docs/api-reference/cli#build)
- [NPM Workspaces Documentation](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [Vercel Build Configuration](https://vercel.com/docs/concepts/projects/overview#build-configuration)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
