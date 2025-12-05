# NPM Publishing Guide

This guide provides comprehensive instructions for publishing the `ghostui-react` package to the NPM registry, including version management, pre-publish verification, and post-publish validation.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Pre-Publish Checklist](#pre-publish-checklist)
- [Version Management](#version-management)
- [Publishing Process](#publishing-process)
- [Post-Publish Verification](#post-publish-verification)
- [Updating Published Packages](#updating-published-packages)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Overview

The `ghostui-react` package is a React component library that will be published to the NPM registry for public use. Publishing to NPM makes the package available for installation via:

```bash
npm install ghostui-react
```

**Package Details:**
- **Name**: `ghostui-react`
- **Scope**: Public (no organization scope)
- **Registry**: https://registry.npmjs.org
- **License**: MIT (or as specified in package.json)

## Prerequisites

Before publishing, ensure you have:

### 1. NPM Account

Create an NPM account if you don't have one:

1. Visit [npmjs.com](https://www.npmjs.com)
2. Click "Sign Up"
3. Complete registration
4. Verify your email address

### 2. NPM CLI Authentication

Authenticate your local NPM CLI:

```bash
# Login to NPM
npm login

# You'll be prompted for:
# - Username
# - Password
# - Email (public)
# - One-time password (if 2FA enabled)

# Verify authentication
npm whoami
# Should output your NPM username
```

### 3. Publishing Permissions

Ensure you have permission to publish:

- For new packages: Any authenticated user can publish
- For existing packages: You must be listed as a maintainer

Check package maintainers:

```bash
npm owner ls ghostui-react
```

Add yourself as a maintainer (if needed):

```bash
npm owner add <username> ghostui-react
```

### 4. Two-Factor Authentication (Recommended)

Enable 2FA for additional security:

```bash
# Enable 2FA for authentication and publishing
npm profile enable-2fa auth-and-writes

# Or enable 2FA for authentication only
npm profile enable-2fa auth-only
```

### 5. Local Build Success

Ensure the package builds successfully:

```bash
# Build the package
npm run build --workspace=packages/ghostui

# Verify dist directory exists
ls packages/ghostui/dist
```

## Pre-Publish Checklist

Complete this checklist before every publish:

### Package Configuration

- [ ] **package.json is correct**
  - [ ] `name` is "ghostui-react"
  - [ ] `version` is updated (see [Version Management](#version-management))
  - [ ] `description` is clear and concise
  - [ ] `main` points to correct entry file
  - [ ] `module` points to ES module file
  - [ ] `types` points to type definitions
  - [ ] `exports` field is complete
  - [ ] `files` array includes all necessary files
  - [ ] `keywords` are relevant for discoverability
  - [ ] `license` is specified
  - [ ] `repository` URL is correct
  - [ ] `bugs` URL is correct
  - [ ] `homepage` URL is correct

### Build and Quality

- [ ] **Package builds successfully**
  ```bash
  npm run build --workspace=packages/ghostui
  ```

- [ ] **All tests pass**
  ```bash
  npm test --workspace=packages/ghostui
  ```

- [ ] **TypeScript checks pass**
  ```bash
  npm run type-check --workspace=packages/ghostui
  ```

- [ ] **Linting passes**
  ```bash
  npm run lint --workspace=packages/ghostui
  ```

### Documentation

- [ ] **README.md is up to date**
  - [ ] Installation instructions
  - [ ] Basic usage examples
  - [ ] Link to full documentation
  - [ ] License information

- [ ] **CHANGELOG.md is updated**
  - [ ] New version is documented
  - [ ] All changes are listed
  - [ ] Breaking changes are highlighted

- [ ] **Type definitions are complete**
  - [ ] All exports have type definitions
  - [ ] No `any` types (unless necessary)

### Package Contents

- [ ] **Verify package contents**
  ```bash
  cd packages/ghostui
  npm pack --dry-run
  ```

- [ ] **Check package size**
  ```bash
  npm pack
  ls -lh ghostui-react-*.tgz
  # Should be reasonable size (< 1MB ideally)
  ```

### Dependencies

- [ ] **Dependencies are correct**
  - [ ] `dependencies`: Runtime dependencies only
  - [ ] `peerDependencies`: React, React DOM, etc.
  - [ ] `devDependencies`: Build tools, testing, etc.
  - [ ] No unnecessary dependencies

- [ ] **Peer dependencies are documented**
  - [ ] README lists required peer dependencies
  - [ ] Version ranges are appropriate

### Final Checks

- [ ] **Git working directory is clean**
  ```bash
  git status
  # Should show no uncommitted changes
  ```

- [ ] **Changes are committed**
  ```bash
  git log -1
  # Should show recent commit with changes
  ```

- [ ] **Version tag doesn't exist**
  ```bash
  git tag | grep v3.0.0
  # Should return nothing if publishing v3.0.0
  ```

## Version Management

Follow [Semantic Versioning](https://semver.org/) (SemVer):

**Format**: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (e.g., 2.0.0 → 3.0.0)
- **MINOR**: New features, backward compatible (e.g., 2.1.0 → 2.2.0)
- **PATCH**: Bug fixes, backward compatible (e.g., 2.1.0 → 2.1.1)

### Determining Version Increment

**Increment MAJOR when:**
- Removing or renaming components
- Changing component APIs (props, events)
- Removing or changing exports
- Requiring new peer dependencies
- Dropping support for Node.js or React versions

**Increment MINOR when:**
- Adding new components
- Adding new features to existing components
- Adding new exports
- Deprecating features (but not removing)

**Increment PATCH when:**
- Fixing bugs
- Improving performance
- Updating documentation
- Refactoring internal code (no API changes)

### Updating Version

Use npm's built-in version command:

```bash
# Navigate to package directory
cd packages/ghostui

# Increment patch version (e.g., 3.0.0 → 3.0.1)
npm version patch

# Increment minor version (e.g., 3.0.0 → 3.1.0)
npm version minor

# Increment major version (e.g., 3.0.0 → 4.0.0)
npm version major

# Set specific version
npm version 3.0.0

# Return to root
cd ../..
```

The `npm version` command:
1. Updates `version` in package.json
2. Creates a git commit with the version change
3. Creates a git tag (e.g., `v3.0.0`)

### Pre-release Versions

For beta or release candidate versions:

```bash
# Create beta version (e.g., 3.1.0-beta.0)
npm version premajor --preid=beta
npm version preminor --preid=beta
npm version prepatch --preid=beta

# Increment pre-release version (e.g., 3.1.0-beta.0 → 3.1.0-beta.1)
npm version prerelease

# Create release candidate (e.g., 3.1.0-rc.0)
npm version prerelease --preid=rc
```

Publish pre-release versions with a tag:

```bash
npm publish --tag beta
npm publish --tag rc
```

### Version History

Maintain a CHANGELOG.md file documenting all versions:

```markdown
# Changelog

## [3.0.0] - 2024-12-05

### Added
- New GooeyCard component
- New GooeyDrawer component
- Tailwind preset for easy theming

### Changed
- Updated GhostToast API for better flexibility
- Improved TypeScript types for all components

### Fixed
- Fixed HauntedVignette cursor tracking issue
- Fixed SpookyScrollbar styling conflicts

### Breaking Changes
- Removed deprecated `variant` prop from GooeyButton
- Renamed `GhostCursor` to `CursorEffect`
```

## Publishing Process

Follow these steps to publish the package:

### Step 1: Prepare for Publishing

```bash
# Ensure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Ensure working directory is clean
git status
```

### Step 2: Update Version

```bash
# Navigate to package directory
cd packages/ghostui

# Update version (choose appropriate increment)
npm version patch  # or minor, or major

# This creates a commit and tag
# Return to root
cd ../..
```

### Step 3: Update CHANGELOG

Edit `packages/ghostui/CHANGELOG.md` to document changes:

```markdown
## [3.0.1] - 2024-12-05

### Fixed
- Fixed issue with GooeyButton hover state
- Improved accessibility for SpookyTooltip
```

Commit the changelog:

```bash
git add packages/ghostui/CHANGELOG.md
git commit -m "docs: update changelog for v3.0.1"
```

### Step 4: Build the Package

```bash
# Clean previous build
rm -rf packages/ghostui/dist

# Build package
npm run build --workspace=packages/ghostui

# Verify build output
ls packages/ghostui/dist
```

### Step 5: Preview Package Contents

```bash
# Navigate to package directory
cd packages/ghostui

# Preview what will be published
npm pack --dry-run

# This shows all files that will be included
# Review the list carefully
```

### Step 6: Test Package Locally (Optional but Recommended)

```bash
# Create a tarball
npm pack

# This creates ghostui-react-3.0.1.tgz

# Test in a separate project
cd /path/to/test-project
npm install /path/to/ghostui/packages/ghostui/ghostui-react-3.0.1.tgz

# Test that imports work
# Then clean up
rm ghostui-react-3.0.1.tgz
```

### Step 7: Publish to NPM

```bash
# Ensure you're in the package directory
cd packages/ghostui

# Publish to NPM
npm publish --access public

# If using 2FA, you'll be prompted for a one-time password

# Wait for confirmation message
# ✓ ghostui-react@3.0.1 published
```

### Step 8: Push Git Changes

```bash
# Return to root
cd ../..

# Push commits and tags
git push origin main
git push origin --tags

# Or push everything at once
git push origin main --follow-tags
```

### Step 9: Create GitHub Release (Optional but Recommended)

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Select the version tag (e.g., `v3.0.1`)
4. Title: "v3.0.1"
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

## Post-Publish Verification

After publishing, verify the package is available and working:

### Step 1: Verify on NPM Registry

```bash
# Check package info
npm view ghostui-react

# Check specific version
npm view ghostui-react@3.0.1

# Check latest version
npm view ghostui-react version
```

Visit the package page: https://www.npmjs.com/package/ghostui-react

Verify:
- ✅ Version number is correct
- ✅ README displays correctly
- ✅ Package size is reasonable
- ✅ Dependencies are listed correctly
- ✅ Keywords are present

### Step 2: Test Installation in Fresh Project

Create a test project to verify installation:

```bash
# Create test directory
mkdir test-ghostui-install
cd test-ghostui-install

# Initialize project
npm init -y

# Install React dependencies
npm install react react-dom

# Install your package
npm install ghostui-react

# Verify installation
npm ls ghostui-react
# Should show ghostui-react@3.0.1

# Test import
node -e "const ghostui = require('ghostui-react'); console.log('✓ Package loaded successfully');"
```

### Step 3: Test in Real Application

Create a minimal test application:

```bash
# Create Next.js app
npx create-next-app@latest test-app --typescript --tailwind --app

cd test-app

# Install ghostui-react
npm install ghostui-react

# Add to tailwind.config.js
# presets: [require('ghostui-react/tailwind-preset')],

# Test importing a component
# Create app/page.tsx with GooeyButton import
```

Test that:
- ✅ Package installs without errors
- ✅ TypeScript types are available
- ✅ Components render correctly
- ✅ Styles apply correctly
- ✅ No console errors

### Step 4: Clean Up Test Projects

```bash
# Remove test projects
cd ..
rm -rf test-ghostui-install test-app
```

### Step 5: Update Documentation

Update the main README.md with installation instructions:

```markdown
## Installation

```bash
npm install ghostui-react
```

## Quick Start

```typescript
import { GooeyButton } from 'ghostui-react';
import 'ghostui-react/dist/index.css';

function App() {
  return <GooeyButton>Click me</GooeyButton>;
}
```
```

### Step 6: Announce the Release

Consider announcing the release:

- Update project documentation site
- Post on social media (Twitter, LinkedIn)
- Share in relevant communities (Reddit, Discord)
- Send newsletter to users (if applicable)

## Updating Published Packages

### Publishing Patch Updates

For bug fixes and minor updates:

```bash
cd packages/ghostui
npm version patch
npm run build
npm publish --access public
cd ../..
git push origin main --follow-tags
```

### Publishing Minor Updates

For new features:

```bash
cd packages/ghostui
npm version minor
# Update CHANGELOG.md
npm run build
npm publish --access public
cd ../..
git push origin main --follow-tags
```

### Publishing Major Updates

For breaking changes:

```bash
cd packages/ghostui
npm version major
# Update CHANGELOG.md with breaking changes
npm run build
npm publish --access public
cd ../..
git push origin main --follow-tags
```

### Deprecating Versions

If a version has critical issues:

```bash
# Deprecate a specific version
npm deprecate ghostui-react@3.0.0 "Critical bug, please upgrade to 3.0.1"

# Deprecate all versions in a range
npm deprecate ghostui-react@"< 3.0.1" "Please upgrade to 3.0.1 or higher"
```

### Unpublishing Packages

**Warning**: Unpublishing is discouraged and has restrictions.

```bash
# Unpublish a specific version (within 72 hours of publishing)
npm unpublish ghostui-react@3.0.0

# Unpublish entire package (use with extreme caution)
npm unpublish ghostui-react --force
```

**NPM Unpublish Policy:**
- Can only unpublish within 72 hours of publishing
- Cannot unpublish if package has dependents
- Unpublishing is permanent and version cannot be republished

## Troubleshooting

### Error: "You do not have permission to publish"

**Cause**: Not authenticated or not a package maintainer.

**Solution**:
```bash
# Re-authenticate
npm logout
npm login

# Verify authentication
npm whoami

# Check package ownership
npm owner ls ghostui-react
```

### Error: "Version already exists"

**Cause**: Attempting to publish a version that's already published.

**Solution**:
```bash
# Increment version
cd packages/ghostui
npm version patch
npm publish --access public
```

### Error: "Package name too similar to existing package"

**Cause**: NPM prevents publishing packages with names too similar to existing ones.

**Solution**:
- Choose a different package name
- Use an organization scope: `@yourorg/ghostui-react`

### Error: "Missing required field"

**Cause**: package.json is missing required fields.

**Solution**:

Ensure package.json includes:
```json
{
  "name": "ghostui-react",
  "version": "3.0.0",
  "description": "Spooky React components",
  "main": "./dist/ghostui.umd.js",
  "module": "./dist/ghostui.es.js",
  "types": "./dist/index.d.ts",
  "license": "MIT"
}
```

### Error: "402 Payment Required"

**Cause**: Attempting to publish a private package without a paid plan.

**Solution**:
```bash
# Publish as public package
npm publish --access public
```

### Build Fails Before Publishing

**Cause**: Build errors in the package.

**Solution**:
```bash
# Check for errors
npm run build --workspace=packages/ghostui

# Fix errors in code
# Rebuild
npm run build --workspace=packages/ghostui
```

### Package Size Too Large

**Cause**: Including unnecessary files in the package.

**Solution**:

Update `.npmignore` or `files` field in package.json:

```json
{
  "files": [
    "dist",
    "tailwind-preset.js",
    "README.md",
    "LICENSE"
  ]
}
```

Exclude:
- Source files (src/)
- Tests
- Build configuration
- Documentation

### Two-Factor Authentication Issues

**Cause**: 2FA code not working or expired.

**Solution**:
```bash
# Generate new 2FA code from authenticator app
# Enter code when prompted during npm publish

# If issues persist, disable and re-enable 2FA
npm profile disable-2fa
npm profile enable-2fa auth-and-writes
```

## Best Practices

### Version Management

- ✅ Follow semantic versioning strictly
- ✅ Document all changes in CHANGELOG.md
- ✅ Create git tags for all versions
- ✅ Never skip versions
- ✅ Use pre-release versions for testing

### Quality Assurance

- ✅ Always test builds locally before publishing
- ✅ Run all tests before publishing
- ✅ Verify TypeScript types are correct
- ✅ Test package installation in fresh project
- ✅ Review package contents with `npm pack --dry-run`

### Documentation

- ✅ Keep README.md up to date
- ✅ Maintain comprehensive CHANGELOG.md
- ✅ Document breaking changes clearly
- ✅ Provide migration guides for major versions
- ✅ Include code examples in README

### Security

- ✅ Enable two-factor authentication
- ✅ Never commit .npmrc with auth tokens
- ✅ Regularly audit dependencies: `npm audit`
- ✅ Keep dependencies up to date
- ✅ Review security advisories

### Communication

- ✅ Announce major releases
- ✅ Deprecate old versions gracefully
- ✅ Provide upgrade paths for breaking changes
- ✅ Respond to issues and questions promptly
- ✅ Maintain a public roadmap

### Automation (Advanced)

Consider automating the publishing process:

- Use GitHub Actions for automated publishing
- Implement automated testing before publish
- Use semantic-release for automatic versioning
- Set up automated changelog generation

## Additional Resources

- [NPM Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [NPM Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Creating and Publishing Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [NPM Version Command](https://docs.npmjs.com/cli/v8/commands/npm-version)

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review [NPM documentation](https://docs.npmjs.com/)
3. Check [NPM status page](https://status.npmjs.org/)
4. Contact NPM support
5. Ask in the GhostUI community
