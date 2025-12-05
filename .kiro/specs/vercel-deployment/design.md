# Design Document

## Overview

This design document outlines the architecture and implementation strategy for deploying the GhostUI monorepo to Vercel. The deployment includes two production-ready Next.js applications:

1. **Demo App** - A fully completed potion shop e-commerce demonstration featuring product browsing, cart management, search/filtering, and checkout flow, all built with GhostUI components
2. **Docs App** - Documentation site with component examples and usage guides

The ghostui-react package will also be prepared for NPM publication.

The design leverages Vercel's automatic framework detection, workspace dependency resolution, and intelligent build caching to create an efficient, maintainable deployment pipeline. The solution addresses the unique challenges of deploying a monorepo with local workspace dependencies while maintaining optimal build performance and developer experience.

## Architecture

### Deployment Architecture

```
GitHub Repository (monorepo)
         |
         | (webhook trigger)
         v
    Vercel Project
         |
         |-- Build Process
         |    |
         |    |-- Install workspace dependencies
         |    |-- Build ghostui-react package
         |    |-- Build Demo App (apps/demo)
         |    |-- Build Docs App (apps/docs)
         |
         |-- Deploy
              |
              |-- Demo App → demo.vercel.app
              |-- Docs App → docs.vercel.app
```

### Monorepo Structure

```
ghostui/
├── package.json (workspace root)
├── packages/
│   └── ghostui/
│       ├── package.json (ghostui-react)
│       ├── src/
│       └── dist/ (build output)
├── apps/
│   ├── demo/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── .next/ (build output)
│   └── docs/
│       ├── package.json
│       ├── next.config.ts
│       └── .next/ (build output)
└── vercel.json (deployment configuration)
```

## Components and Interfaces

### 1. Vercel Configuration File (`vercel.json`)

The primary configuration file that defines how Vercel should build and deploy the monorepo.

**Interface:**
```json
{
  "buildCommand": "npm run build --workspace=packages/ghostui && npm run build --workspace=apps/demo && npm run build --workspace=apps/docs",
  "devCommand": "npm run dev --workspace=apps/docs",
  "installCommand": "npm install",
  "framework": null,
  "outputDirectory": "apps/docs/.next"
}
```

**Responsibilities:**
- Define build commands for all applications
- Specify installation strategy
- Configure output directories
- Set framework detection behavior

### 2. Package Build Scripts

Enhanced build scripts in each `package.json` to support the deployment pipeline.

**Root package.json additions:**
```json
{
  "scripts": {
    "build:package": "npm run build --workspace=packages/ghostui",
    "build:demo": "npm run build --workspace=apps/demo",
    "build:docs": "npm run build --workspace=apps/docs",
    "build:all": "npm run build:package && npm run build:demo && npm run build:docs",
    "vercel:demo": "npm run build:package && npm run build:demo",
    "vercel:docs": "npm run build:package && npm run build:docs"
  }
}
```

**Responsibilities:**
- Provide granular build control
- Ensure correct build order (package before apps)
- Support local testing of production builds

### 3. Environment Configuration

Environment variables managed through Vercel's dashboard and optionally `.env` files for local development.

**Structure:**
```
.env.local (local development, gitignored)
.env.production (production defaults, optional)
```

**Common variables:**
- `NEXT_PUBLIC_SITE_URL`: Public URL for the application
- `NEXT_PUBLIC_API_URL`: API endpoint if needed
- `NODE_ENV`: Automatically set by Vercel

### 4. GitHub Integration

Vercel's GitHub integration provides automatic deployments and preview environments.

**Workflow:**
1. Developer pushes to branch
2. GitHub webhook notifies Vercel
3. Vercel clones repository
4. Vercel runs build commands
5. Vercel deploys to unique URL
6. Vercel posts deployment URL to GitHub PR

### 5. NPM Package Publishing

The ghostui-react package will be published to NPM separately from Vercel deployments.

**Publishing workflow:**
```bash
# 1. Update version
npm version patch --workspace=packages/ghostui

# 2. Build package
npm run build --workspace=packages/ghostui

# 3. Publish to NPM
npm publish --workspace=packages/ghostui --access public
```

## Data Models

### Vercel Project Configuration

```typescript
interface VercelProjectConfig {
  name: string;                    // "ghostui-monorepo"
  framework: string | null;        // null (manual configuration)
  buildCommand: string;            // Custom build command
  devCommand: string;              // Development server command
  installCommand: string;          // "npm install"
  outputDirectory: string;         // Primary app output directory
  rootDirectory: string;           // "." (monorepo root)
  nodeVersion: string;             // "18.x" or "20.x"
}
```

### Deployment Configuration

```typescript
interface DeploymentConfig {
  apps: {
    demo: {
      name: string;                // "demo"
      directory: string;           // "apps/demo"
      buildCommand: string;        // "npm run vercel:demo"
      outputDirectory: string;     // "apps/demo/.next"
      domain?: string;             // Optional custom domain
    };
    docs: {
      name: string;                // "docs"
      directory: string;           // "apps/docs"
      buildCommand: string;        // "npm run vercel:docs"
      outputDirectory: string;     // "apps/docs/.next"
      domain?: string;             // Optional custom domain
    };
  };
  environmentVariables: {
    [key: string]: {
      value: string;
      target: ("production" | "preview" | "development")[];
    };
  };
}
```

### Build Output Structure

```typescript
interface BuildOutput {
  package: {
    path: "packages/ghostui/dist";
    files: string[];               // ["ghostui.es.js", "ghostui.umd.js", "index.d.ts", ...]
    size: number;                  // Total size in bytes
  };
  demo: {
    path: "apps/demo/.next";
    standalone: boolean;           // true for optimized builds
    size: number;
  };
  docs: {
    path: "apps/docs/.next";
    standalone: boolean;
    size: number;
  };
}
```

## Data Models

### Package Dependency Graph

```typescript
interface DependencyGraph {
  "ghostui-react": {
    dependents: ["demo", "docs"];
    dependencies: ["react", "react-dom", "framer-motion", "clsx", "tailwind-merge"];
  };
  "demo": {
    dependents: [];
    dependencies: ["ghostui-react", "next", "react", "react-dom", "lucide-react", "framer-motion"];
    features: ["product-grid", "cart", "search", "filtering", "checkout", "responsive-design"];
  };
  "docs": {
    dependents: [];
    dependencies: ["ghostui-react", "next", "react", "react-dom", "next-mdx-remote"];
  };
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Configuration Verification Properties

**Property 1: Build configuration targets correct directories**
*For any* application (demo or docs), the build configuration should specify the correct source directory path that matches the actual application location in the monorepo.
**Validates: Requirements 1.1, 2.1**

**Property 2: Workspace dependencies resolve locally**
*For any* application build, when the ghostui-react dependency is resolved, it should reference the local workspace package rather than attempting to fetch from an external registry.
**Validates: Requirements 1.2, 2.2**

**Property 3: Package exports are complete**
*For any* export defined in the ghostui-react package.json exports field, the corresponding file should exist in the dist directory after building.
**Validates: Requirements 3.3**

**Property 4: Required package files are included**
*For any* file listed in the ghostui-react package.json files array, that file should exist in the package directory.
**Validates: Requirements 3.5**

### Build Process Properties

**Property 5: Build order is correct**
*For any* application build command, the ghostui-react package build should complete before the application build begins.
**Validates: Requirements 4.2**

**Property 6: Transpile configuration includes workspace packages**
*For any* Next.js application (demo or docs), the next.config.ts transpilePackages array should include 'ghostui-react'.
**Validates: Requirements 4.3**

**Property 7: Build produces expected output**
*For any* successful build, the output directory (.next for apps, dist for package) should exist and contain the expected build artifacts.
**Validates: Requirements 3.1, 4.4**

### Environment and Runtime Properties

**Property 8: Public environment variables are accessible client-side**
*For any* environment variable prefixed with NEXT_PUBLIC_, that variable should be accessible in client-side code after build.
**Validates: Requirements 7.2**

**Property 9: Server environment variables are accessible server-side**
*For any* environment variable without the NEXT_PUBLIC_ prefix, that variable should be accessible in server-side code but not in client-side code.
**Validates: Requirements 7.3**

**Property 10: Production optimizations are enabled**
*For any* production build, the NODE_ENV should be set to 'production' and Next.js optimization flags should be enabled.
**Validates: Requirements 9.3**

### Testing Properties

**Property 11: Test commands execute successfully**
*For any* package with a test script defined, running that test command should complete without errors when all tests pass.
**Validates: Requirements 6.4**

### Demo App Feature Properties

**Property 12: Demo App e-commerce features function correctly**
*For any* deployed Demo App instance, the product grid, cart functionality, search, filtering, and checkout flow should all be operational and responsive.
**Validates: Requirements 1.3, 1.6**

## Error Handling

### Build Failures

**Workspace Dependency Resolution Errors:**
- **Cause**: Incorrect workspace protocol in package.json dependencies
- **Detection**: Build fails with "Cannot find module 'ghostui-react'"
- **Handling**: Verify package.json uses `"ghostui-react": "*"` or `"ghostui-react": "workspace:*"`
- **Recovery**: Update dependency reference and retry build

**Transpilation Errors:**
- **Cause**: Missing transpilePackages configuration in next.config.ts
- **Detection**: Runtime errors about JSX or ES modules in ghostui-react
- **Handling**: Ensure `transpilePackages: ['ghostui-react']` is present in Next.js config
- **Recovery**: Add configuration and redeploy

**Build Order Errors:**
- **Cause**: Applications build before ghostui-react package is compiled
- **Detection**: Build fails with missing dist directory or type definition errors
- **Handling**: Ensure build commands execute package build first
- **Recovery**: Update build command order in vercel.json or package.json scripts

### Deployment Failures

**Environment Variable Errors:**
- **Cause**: Missing required environment variables
- **Detection**: Build or runtime errors referencing undefined variables
- **Handling**: Check Vercel project settings for missing variables
- **Recovery**: Add required variables in Vercel dashboard and redeploy

**Memory or Timeout Errors:**
- **Cause**: Build process exceeds Vercel's limits
- **Detection**: Build fails with "FATAL ERROR: Reached heap limit" or timeout messages
- **Handling**: Optimize build process, reduce dependencies, or upgrade Vercel plan
- **Recovery**: Implement build optimizations and retry

**Output Directory Errors:**
- **Cause**: Incorrect outputDirectory in vercel.json
- **Detection**: Deployment succeeds but returns 404 errors
- **Handling**: Verify outputDirectory points to correct .next directory
- **Recovery**: Update configuration and redeploy

### Runtime Errors

**Module Not Found Errors:**
- **Cause**: Missing dependencies or incorrect imports
- **Detection**: Runtime errors in deployed application
- **Handling**: Verify all dependencies are listed in package.json
- **Recovery**: Add missing dependencies and redeploy

**Static Asset Errors:**
- **Cause**: Incorrect public directory configuration or missing assets
- **Detection**: 404 errors for images, fonts, or other static files
- **Handling**: Verify public directory structure and Next.js static file handling
- **Recovery**: Fix asset paths and redeploy

### NPM Publishing Errors

**Authentication Errors:**
- **Cause**: Missing or invalid NPM authentication token
- **Detection**: npm publish fails with authentication error
- **Handling**: Run `npm login` or set NPM_TOKEN environment variable
- **Recovery**: Authenticate and retry publish

**Version Conflict Errors:**
- **Cause**: Attempting to publish a version that already exists
- **Detection**: npm publish fails with "version already exists"
- **Handling**: Increment version number using `npm version`
- **Recovery**: Update version and retry publish

**Package Validation Errors:**
- **Cause**: Missing required fields in package.json or invalid package structure
- **Detection**: npm publish fails with validation errors
- **Handling**: Review package.json for required fields (name, version, main, types, exports)
- **Recovery**: Fix package.json and retry publish

## Testing Strategy

### Configuration Testing

**Unit Tests:**
- Verify vercel.json structure and required fields
- Test package.json scripts execute correctly
- Validate next.config.ts transpilePackages configuration
- Check package.json exports and files arrays

**Example Tests:**
```typescript
// Test: Verify transpilePackages includes ghostui-react
test('next.config.ts includes ghostui-react in transpilePackages', () => {
  const config = require('./apps/demo/next.config.ts');
  expect(config.transpilePackages).toContain('ghostui-react');
});

// Test: Verify package exports exist
test('all package exports have corresponding files', () => {
  const pkg = require('./packages/ghostui/package.json');
  const exports = Object.values(pkg.exports);
  exports.forEach(exportPath => {
    expect(fs.existsSync(exportPath)).toBe(true);
  });
});
```

### Build Testing

**Local Build Tests:**
- Test package build produces expected output
- Test application builds complete successfully
- Verify build order (package before apps)
- Check build output directories contain required files

**Commands for Local Testing:**
```bash
# Test package build
npm run build --workspace=packages/ghostui
test -d packages/ghostui/dist || echo "Build failed: dist directory missing"

# Test demo app build
npm run build --workspace=apps/demo
test -d apps/demo/.next || echo "Build failed: .next directory missing"

# Test docs app build
npm run build --workspace=apps/docs
test -d apps/docs/.next || echo "Build failed: .next directory missing"

# Test full build sequence
npm run build:all
```

### Integration Testing

**Deployment Simulation:**
- Test complete build sequence locally
- Verify workspace dependency resolution
- Test environment variable injection
- Validate production build optimizations

**Preview Deployment Testing:**
- Create pull request to trigger preview deployment
- Test both applications in preview environment
- Verify all components render correctly
- Check for console errors or warnings

### Property-Based Testing

Property-based tests will verify universal properties across different configurations and inputs:

**Test 1: Build configuration consistency**
- Generate random valid directory structures
- Verify build commands target correct directories
- Ensure output directories match configuration

**Test 2: Dependency resolution**
- Test with various workspace dependency formats
- Verify local package resolution in all cases
- Ensure no external registry lookups for workspace packages

**Test 3: Environment variable handling**
- Generate random environment variable names and values
- Verify NEXT_PUBLIC_ variables are client-accessible
- Ensure non-public variables are server-only

### End-to-End Testing

**Deployment Verification:**
- Deploy to Vercel preview environment
- Test HTTP requests to both applications
- Verify all pages load successfully
- Check for proper error handling
- Validate component functionality

**NPM Package Testing:**
- Publish package to NPM (or test registry)
- Create external test project
- Install published package
- Verify all exports work correctly
- Test Tailwind preset integration

### Continuous Testing

**Pre-deployment Checks:**
- Run all unit tests before deployment
- Execute build tests locally
- Validate configuration files
- Check for TypeScript errors

**Post-deployment Validation:**
- Automated smoke tests on deployed URLs
- Monitor for runtime errors
- Verify analytics and logging
- Check performance metrics

## Implementation Notes

### Vercel Project Setup

1. **Connect Repository**: Link GitHub repository to Vercel
2. **Configure Framework**: Select "Other" or let Vercel auto-detect Next.js
3. **Set Root Directory**: Keep as "." (monorepo root)
4. **Configure Build Settings**:
   - Build Command: `npm run build:all` or custom command
   - Output Directory: `apps/docs/.next` (primary app)
   - Install Command: `npm install`
5. **Add Environment Variables**: Configure in Vercel dashboard
6. **Deploy**: Trigger initial deployment

### Multiple App Deployment Options

**Option 1: Single Project with Primary App**
- Deploy one app as primary (e.g., docs)
- Use Vercel CLI to deploy second app separately
- Manage both from single Vercel project

**Option 2: Separate Projects**
- Create two Vercel projects from same repository
- Configure different root directories for each
- Independent deployment and scaling

**Option 3: Monorepo with Multiple Outputs**
- Use Vercel's monorepo support
- Configure multiple output directories
- Single deployment builds both apps

### Recommended Approach

Use **Option 1** for simplicity:
- Primary app (docs) deploys automatically via GitHub integration
- Demo app deploys via Vercel CLI when needed
- Shared configuration and environment variables
- Easier to manage and maintain

### Build Command Strategy

**Recommended build commands:**

```json
{
  "scripts": {
    "build:package": "npm run build --workspace=packages/ghostui",
    "build:demo": "npm run build:package && npm run build --workspace=apps/demo",
    "build:docs": "npm run build:package && npm run build --workspace=apps/docs",
    "build:all": "npm run build:package && npm run build:demo && npm run build:docs",
    "vercel-build": "npm run build:docs"
  }
}
```

The `vercel-build` script is automatically detected by Vercel and will be used if present.

### Environment Variable Management

**Development (.env.local):**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Production (Vercel Dashboard):**
- `NEXT_PUBLIC_SITE_URL`: https://ghostui-docs.vercel.app
- `NEXT_PUBLIC_API_URL`: https://api.ghostui.com
- Target: Production
- Apply to: All deployments

**Preview (Vercel Dashboard):**
- Same variables with preview URLs
- Target: Preview
- Apply to: Preview deployments

### NPM Package Publishing

**Pre-publish Checklist:**
1. Update version in package.json
2. Build package: `npm run build --workspace=packages/ghostui`
3. Test package locally: `npm link`
4. Review dist directory contents
5. Verify package.json exports and files
6. Check README and documentation

**Publishing Steps:**
```bash
# 1. Authenticate with NPM
npm login

# 2. Navigate to package directory
cd packages/ghostui

# 3. Verify package contents
npm pack --dry-run

# 4. Publish to NPM
npm publish --access public

# 5. Verify publication
npm view ghostui-react
```

**Version Management:**
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Increment PATCH for bug fixes
- Increment MINOR for new features
- Increment MAJOR for breaking changes

### Deployment Workflow

**Standard Workflow:**
1. Developer creates feature branch
2. Developer pushes changes to GitHub
3. Vercel creates preview deployment
4. Team reviews preview deployment
5. Developer merges to main branch
6. Vercel deploys to production automatically

**Hotfix Workflow:**
1. Create hotfix branch from main
2. Make critical fixes
3. Push to GitHub for preview
4. Merge to main for immediate production deployment

### Monitoring and Maintenance

**Regular Checks:**
- Monitor Vercel deployment status
- Review build logs for warnings
- Check application performance metrics
- Verify environment variables are current
- Update dependencies regularly

**Troubleshooting Resources:**
- Vercel deployment logs
- GitHub Actions logs (if configured)
- Browser console for runtime errors
- Vercel support documentation
- Community forums and Discord

### Performance Optimization

**Build Performance:**
- Enable Vercel build cache
- Use incremental builds when possible
- Minimize dependencies
- Optimize package build process

**Runtime Performance:**
- Enable Next.js production optimizations
- Use static generation where possible
- Implement proper code splitting
- Optimize images and assets
- Enable compression and caching

### Security Considerations

**Environment Variables:**
- Never commit .env files to repository
- Use Vercel dashboard for sensitive values
- Rotate secrets regularly
- Limit access to production variables

**Dependency Security:**
- Run `npm audit` regularly
- Update dependencies promptly
- Review security advisories
- Use dependabot or similar tools

**Access Control:**
- Limit Vercel project access
- Use GitHub branch protection
- Require code reviews
- Enable two-factor authentication
