# Deployment Troubleshooting Guide

This guide provides solutions to common issues encountered when deploying the GhostUI monorepo to Vercel, including build failures, runtime errors, environment variable issues, and workspace dependency problems.

## Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Build Failures](#build-failures)
- [Runtime Errors](#runtime-errors)
- [Environment Variable Issues](#environment-variable-issues)
- [Workspace Dependency Problems](#workspace-dependency-problems)
- [Performance Issues](#performance-issues)
- [Vercel-Specific Issues](#vercel-specific-issues)
- [Getting Help](#getting-help)

## Quick Diagnostics

Before diving into specific issues, run these quick diagnostic checks:

### Check Build Locally

```bash
# Clean and rebuild everything
npm run build:all

# If this fails, the issue is in your code, not Vercel
```

### Check Vercel Build Logs

1. Go to your Vercel project dashboard
2. Click on the failed deployment
3. Review the "Building" tab for error messages
4. Look for the first error (subsequent errors may be cascading)

### Check Runtime Logs

1. Go to your Vercel project
2. Click "Logs" in the top navigation
3. Filter by time range around the issue
4. Look for error messages or stack traces

### Verify Configuration Files

```bash
# Check vercel.json exists and is valid JSON
cat vercel.json | jq .

# Check package.json scripts
cat package.json | jq .scripts

# Check next.config.ts syntax
npx tsc --noEmit apps/demo/next.config.ts
npx tsc --noEmit apps/docs/next.config.ts
```

## Build Failures

### Error: "Cannot find module 'ghostui-react'"

**Symptoms:**
```
Error: Cannot find module 'ghostui-react'
Module not found: Can't resolve 'ghostui-react'
```

**Cause:** The ghostui-react package hasn't been built before the application build, or workspace dependencies aren't resolving correctly.

**Solutions:**

1. **Verify build order in vercel.json:**
   ```json
   {
     "buildCommand": "npm run build:package && npm run build:docs"
   }
   ```

2. **Check package.json workspace dependency:**
   ```json
   {
     "dependencies": {
       "ghostui-react": "*"
     }
   }
   ```

3. **Verify package.json in ghostui includes name:**
   ```json
   {
     "name": "ghostui-react"
   }
   ```

4. **Test locally:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build:all
   ```

### Error: "Module parse failed: Unexpected token"

**Symptoms:**
```
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type
```

**Cause:** Next.js is not transpiling the ghostui-react package, so JSX/TypeScript isn't being processed.

**Solutions:**

1. **Add transpilePackages to next.config.ts:**
   ```typescript
   const config: NextConfig = {
     transpilePackages: ['ghostui-react'],
     // ... other config
   };
   ```

2. **Verify the configuration is being loaded:**
   ```bash
   # Check next.config.ts syntax
   npx tsc --noEmit apps/demo/next.config.ts
   ```

3. **Ensure next.config.ts is in the correct location:**
   ```
   apps/demo/next.config.ts
   apps/docs/next.config.ts
   ```

4. **Rebuild and test:**
   ```bash
   npm run build:demo
   npm run build:docs
   ```

### Error: "ENOENT: no such file or directory"

**Symptoms:**
```
ENOENT: no such file or directory, open 'packages/ghostui/dist/index.js'
```

**Cause:** The package build output doesn't exist or is in the wrong location.

**Solutions:**

1. **Verify package builds successfully:**
   ```bash
   npm run build --workspace=packages/ghostui
   ls packages/ghostui/dist
   ```

2. **Check package.json main/module/types fields:**
   ```json
   {
     "main": "./dist/ghostui.umd.js",
     "module": "./dist/ghostui.es.js",
     "types": "./dist/index.d.ts"
   }
   ```

3. **Verify build output matches package.json:**
   ```bash
   ls packages/ghostui/dist/ghostui.umd.js
   ls packages/ghostui/dist/ghostui.es.js
   ls packages/ghostui/dist/index.d.ts
   ```

4. **Check .gitignore doesn't exclude dist:**
   ```bash
   # dist should NOT be in .gitignore for the package
   # Or ensure Vercel builds the package
   ```

### Error: "JavaScript heap out of memory"

**Symptoms:**
```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

**Cause:** Build process is consuming too much memory.

**Solutions:**

1. **Increase Node.js memory limit in package.json:**
   ```json
   {
     "scripts": {
       "build:demo": "NODE_OPTIONS='--max-old-space-size=4096' npm run build --workspace=apps/demo"
     }
   }
   ```

2. **Optimize dependencies:**
   ```bash
   # Remove unused dependencies
   npm prune
   
   # Check for duplicate dependencies
   npm dedupe
   ```

3. **Reduce bundle size:**
   - Enable tree shaking
   - Use dynamic imports
   - Optimize images and assets
   - Remove unused code

4. **Upgrade Vercel plan:**
   - Free tier: 1GB memory
   - Pro tier: 3GB memory
   - Enterprise: Custom limits

### Error: "Build exceeded maximum duration"

**Symptoms:**
```
Error: Build exceeded maximum duration of 45 minutes
```

**Cause:** Build is taking too long to complete.

**Solutions:**

1. **Optimize build process:**
   ```bash
   # Use faster package manager
   npm install -g pnpm
   pnpm install
   ```

2. **Enable build caching:**
   - Vercel automatically caches node_modules
   - Ensure package-lock.json is committed
   - Use consistent Node.js version

3. **Reduce build scope:**
   - Only build what's needed
   - Use incremental builds
   - Optimize TypeScript compilation

4. **Check for infinite loops or hanging processes:**
   - Review build scripts
   - Check for blocking operations
   - Ensure all processes exit properly

### Error: "npm ERR! code ERESOLVE"

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Cause:** Dependency conflicts between packages.

**Solutions:**

1. **Use --legacy-peer-deps flag:**
   ```json
   {
     "installCommand": "npm install --legacy-peer-deps"
   }
   ```

2. **Update package-lock.json:**
   ```bash
   rm package-lock.json
   npm install
   git add package-lock.json
   git commit -m "fix: update package-lock.json"
   ```

3. **Resolve peer dependency conflicts:**
   ```bash
   npm ls react
   npm ls react-dom
   # Ensure all packages use compatible versions
   ```

4. **Update dependencies:**
   ```bash
   npm update
   npm audit fix
   ```

## Runtime Errors

### Error: "Hydration failed"

**Symptoms:**
```
Error: Hydration failed because the initial UI does not match what was rendered on the server
```

**Cause:** Mismatch between server-rendered HTML and client-rendered HTML.

**Solutions:**

1. **Check for browser-only APIs in components:**
   ```typescript
   // ❌ Bad: Using window during SSR
   const width = window.innerWidth;
   
   // ✅ Good: Use useEffect
   const [width, setWidth] = useState(0);
   useEffect(() => {
     setWidth(window.innerWidth);
   }, []);
   ```

2. **Ensure consistent data between server and client:**
   ```typescript
   // ❌ Bad: Random values during SSR
   const id = Math.random();
   
   // ✅ Good: Generate on client only
   const [id, setId] = useState<number>();
   useEffect(() => {
     setId(Math.random());
   }, []);
   ```

3. **Use suppressHydrationWarning for intentional mismatches:**
   ```typescript
   <div suppressHydrationWarning>
     {new Date().toLocaleString()}
   </div>
   ```

4. **Check for third-party libraries causing issues:**
   - Some libraries don't support SSR
   - Use dynamic imports with `ssr: false`

### Error: "404 Not Found" for Static Assets

**Symptoms:**
- Images return 404
- Fonts don't load
- CSS files missing

**Cause:** Static assets not being copied to build output or incorrect paths.

**Solutions:**

1. **Verify public directory structure:**
   ```
   apps/demo/public/
   ├── images/
   ├── fonts/
   └── favicon.ico
   ```

2. **Use correct asset paths:**
   ```typescript
   // ✅ Correct: Relative to public directory
   <img src="/images/logo.png" alt="Logo" />
   
   // ❌ Wrong: Including 'public' in path
   <img src="/public/images/logo.png" alt="Logo" />
   ```

3. **Check Next.js static file handling:**
   ```typescript
   // next.config.ts
   const config: NextConfig = {
     images: {
       domains: ['your-domain.com'],
     },
   };
   ```

4. **Verify assets are committed to git:**
   ```bash
   git ls-files apps/demo/public/
   ```

### Error: "ReferenceError: document is not defined"

**Symptoms:**
```
ReferenceError: document is not defined
ReferenceError: window is not defined
```

**Cause:** Trying to access browser APIs during server-side rendering.

**Solutions:**

1. **Use useEffect for browser-only code:**
   ```typescript
   useEffect(() => {
     // Browser-only code here
     document.title = 'My App';
   }, []);
   ```

2. **Check if running in browser:**
   ```typescript
   if (typeof window !== 'undefined') {
     // Browser-only code
   }
   ```

3. **Use dynamic imports with ssr: false:**
   ```typescript
   const BrowserComponent = dynamic(
     () => import('./BrowserComponent'),
     { ssr: false }
   );
   ```

4. **Move browser code to client components:**
   ```typescript
   'use client'; // Next.js 13+ App Router
   
   export function ClientComponent() {
     // Can use browser APIs here
   }
   ```

### Error: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"

**Symptoms:**
- Resources fail to load
- Ad blockers interfering
- CORS errors

**Cause:** Browser extensions or CORS policies blocking requests.

**Solutions:**

1. **Configure CORS headers in next.config.ts:**
   ```typescript
   const config: NextConfig = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: '*' },
             { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
           ],
         },
       ];
     },
   };
   ```

2. **Use relative URLs instead of absolute:**
   ```typescript
   // ✅ Good: Relative URL
   fetch('/api/data')
   
   // ❌ Bad: Absolute URL (may trigger CORS)
   fetch('https://example.com/api/data')
   ```

3. **Check for ad-blocker-like naming:**
   - Avoid names like "ad", "banner", "tracking"
   - Rename files if necessary

## Environment Variable Issues

### Error: "Environment variable is undefined"

**Symptoms:**
```
TypeError: Cannot read property 'X' of undefined
process.env.NEXT_PUBLIC_API_URL is undefined
```

**Cause:** Environment variable not set in Vercel or incorrect prefix.

**Solutions:**

1. **Verify variable is set in Vercel:**
   - Go to Project Settings → Environment Variables
   - Check variable exists for correct environment (Production/Preview)
   - Verify spelling and case (environment variables are case-sensitive)

2. **Use correct prefix for client-side variables:**
   ```typescript
   // ✅ Accessible in browser
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   
   // ❌ Only accessible server-side
   const secret = process.env.API_SECRET;
   ```

3. **Redeploy after adding variables:**
   - Environment variables require a new deployment
   - Trigger redeploy from Vercel dashboard or push new commit

4. **Provide fallback values:**
   ```typescript
   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.default.com';
   ```

### Error: "Environment variable exposed in client bundle"

**Symptoms:**
- Secrets visible in browser DevTools
- Security warnings

**Cause:** Server-only variables accidentally exposed to client.

**Solutions:**

1. **Remove NEXT_PUBLIC_ prefix from secrets:**
   ```bash
   # ❌ Bad: Secret exposed to client
   NEXT_PUBLIC_API_SECRET=secret123
   
   # ✅ Good: Secret only on server
   API_SECRET=secret123
   ```

2. **Use server-side API routes for sensitive operations:**
   ```typescript
   // app/api/data/route.ts
   export async function GET() {
     const secret = process.env.API_SECRET; // Safe on server
     // Use secret here
   }
   ```

3. **Audit environment variables:**
   ```bash
   # Check which variables are public
   grep NEXT_PUBLIC .env.local
   ```

### Error: "Different environment variable values in preview vs production"

**Symptoms:**
- Feature works in preview but not production
- Different behavior between environments

**Cause:** Environment variables set for wrong environment target.

**Solutions:**

1. **Check environment targets in Vercel:**
   - Each variable can target: Production, Preview, Development
   - Ensure variables are set for correct targets

2. **Use environment-specific values:**
   ```
   Production: NEXT_PUBLIC_API_URL=https://api.prod.com
   Preview: NEXT_PUBLIC_API_URL=https://api.staging.com
   ```

3. **Use Vercel system variables:**
   ```typescript
   const isProduction = process.env.VERCEL_ENV === 'production';
   const apiUrl = isProduction 
     ? 'https://api.prod.com'
     : 'https://api.staging.com';
   ```

## Workspace Dependency Problems

### Error: "Workspace dependency not found"

**Symptoms:**
```
npm ERR! Could not resolve dependency:
npm ERR! peer ghostui-react@"*" from apps/demo
```

**Cause:** Workspace configuration incorrect or dependencies not installed.

**Solutions:**

1. **Verify workspace configuration in root package.json:**
   ```json
   {
     "workspaces": [
       "packages/*",
       "apps/*"
     ]
   }
   ```

2. **Check dependency declaration:**
   ```json
   {
     "dependencies": {
       "ghostui-react": "*"
     }
   }
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Verify package name matches:**
   ```bash
   # In packages/ghostui/package.json
   cat packages/ghostui/package.json | jq .name
   # Should output: "ghostui-react"
   ```

### Error: "Multiple versions of React detected"

**Symptoms:**
```
Warning: Invalid hook call. Hooks can only be called inside the body of a function component
Error: Minified React error #321
```

**Cause:** Multiple versions of React installed in different workspaces.

**Solutions:**

1. **Use same React version everywhere:**
   ```json
   // Root package.json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     }
   }
   ```

2. **Remove React from package dependencies:**
   ```json
   // packages/ghostui/package.json
   {
     "peerDependencies": {
       "react": "^18.0.0",
       "react-dom": "^18.0.0"
     }
   }
   ```

3. **Deduplicate dependencies:**
   ```bash
   npm dedupe
   npm ls react
   # Should show single version
   ```

4. **Use npm overrides (npm 8.3+):**
   ```json
   {
     "overrides": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0"
     }
   }
   ```

### Error: "Symlink not working in Vercel"

**Symptoms:**
- Works locally but fails in Vercel
- Module resolution errors

**Cause:** Vercel doesn't support symlinks the same way as local development.

**Solutions:**

1. **Use workspace protocol instead of symlinks:**
   ```json
   {
     "dependencies": {
       "ghostui-react": "*"
     }
   }
   ```

2. **Ensure build command builds package first:**
   ```json
   {
     "buildCommand": "npm run build:package && npm run build:docs"
   }
   ```

3. **Don't rely on npm link in CI/CD:**
   - npm link creates symlinks
   - Use workspace dependencies instead

## Performance Issues

### Issue: "Slow build times"

**Symptoms:**
- Builds take longer than 5 minutes
- Timeout errors

**Solutions:**

1. **Enable build caching:**
   - Commit package-lock.json
   - Use consistent Node.js version
   - Vercel automatically caches node_modules

2. **Optimize dependencies:**
   ```bash
   # Remove unused dependencies
   npm prune
   
   # Use production dependencies only
   npm install --production
   ```

3. **Use incremental builds:**
   ```typescript
   // next.config.ts
   const config: NextConfig = {
     typescript: {
       incremental: true,
     },
   };
   ```

4. **Parallelize builds if possible:**
   ```bash
   # Build apps in parallel (if independent)
   npm run build:demo & npm run build:docs & wait
   ```

### Issue: "Large bundle size"

**Symptoms:**
- Slow page loads
- High bandwidth usage
- Poor Lighthouse scores

**Solutions:**

1. **Analyze bundle size:**
   ```bash
   npm run build:demo
   # Check output for bundle sizes
   ```

2. **Use dynamic imports:**
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

3. **Optimize images:**
   ```typescript
   import Image from 'next/image';
   
   <Image 
     src="/image.jpg" 
     width={500} 
     height={300}
     alt="Description"
   />
   ```

4. **Remove unused code:**
   - Enable tree shaking
   - Remove unused imports
   - Use production builds

### Issue: "Slow runtime performance"

**Symptoms:**
- Slow page loads
- Laggy interactions
- High CPU usage

**Solutions:**

1. **Use React.memo for expensive components:**
   ```typescript
   const ExpensiveComponent = React.memo(({ data }) => {
     // Component logic
   });
   ```

2. **Optimize re-renders:**
   ```typescript
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
   ```

3. **Use server components (Next.js 13+):**
   ```typescript
   // app/page.tsx (Server Component by default)
   export default function Page() {
     // Rendered on server
   }
   ```

4. **Enable production optimizations:**
   ```typescript
   // next.config.ts
   const config: NextConfig = {
     reactStrictMode: true,
     swcMinify: true,
   };
   ```

## Vercel-Specific Issues

### Error: "Deployment failed to start"

**Symptoms:**
- Deployment stuck in "Queued" state
- No build logs available

**Cause:** Vercel service issues or account problems.

**Solutions:**

1. **Check Vercel status:**
   - Visit https://www.vercel-status.com
   - Check for ongoing incidents

2. **Verify account status:**
   - Check billing status
   - Verify deployment limits not exceeded

3. **Try manual deployment:**
   ```bash
   vercel --prod
   ```

4. **Contact Vercel support:**
   - Open support ticket
   - Provide deployment URL and error details

### Error: "Domain not configured correctly"

**Symptoms:**
- Custom domain not working
- SSL certificate errors
- DNS resolution failures

**Solutions:**

1. **Verify DNS configuration:**
   ```bash
   # Check DNS records
   nslookup your-domain.com
   dig your-domain.com
   ```

2. **Wait for DNS propagation:**
   - Can take up to 48 hours
   - Usually much faster (minutes to hours)

3. **Check Vercel domain settings:**
   - Go to Project Settings → Domains
   - Verify domain is added correctly
   - Check SSL certificate status

4. **Use Vercel nameservers (recommended):**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

### Error: "Function execution timeout"

**Symptoms:**
```
Error: Function execution timed out after 10s
```

**Cause:** Serverless function taking too long to execute.

**Solutions:**

1. **Optimize function performance:**
   - Reduce computation time
   - Use caching
   - Optimize database queries

2. **Increase timeout (Pro plan):**
   ```typescript
   // app/api/route.ts
   export const maxDuration = 60; // seconds
   ```

3. **Use background jobs for long tasks:**
   - Queue jobs for processing
   - Use webhooks for callbacks
   - Consider external services

4. **Upgrade Vercel plan:**
   - Hobby: 10s timeout
   - Pro: 60s timeout
   - Enterprise: Custom timeouts

## Getting Help

If you're still experiencing issues after trying these solutions:

### 1. Check Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NPM Workspaces Documentation](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

### 2. Search for Similar Issues

- [Vercel GitHub Discussions](https://github.com/vercel/vercel/discussions)
- [Next.js GitHub Issues](https://github.com/vercel/next.js/issues)
- Stack Overflow with tags: `vercel`, `next.js`, `monorepo`

### 3. Gather Information

Before asking for help, collect:

- Deployment URL
- Build logs (full output)
- Runtime logs (if applicable)
- Configuration files (vercel.json, next.config.ts, package.json)
- Steps to reproduce
- Expected vs actual behavior

### 4. Contact Support

**Vercel Support:**
- Pro/Enterprise: support@vercel.com
- Community: [Vercel Discord](https://vercel.com/discord)

**GhostUI Team:**
- GitHub Issues: [Create an issue](https://github.com/your-org/ghostui/issues)
- Discord: [Join our community](#)

### 5. Create Minimal Reproduction

If possible, create a minimal reproduction:

1. Create new repository with minimal code
2. Reproduce the issue
3. Share repository URL
4. Provide clear steps to reproduce

This helps others understand and solve your issue faster.

## Preventive Measures

Avoid issues before they happen:

### Before Every Deployment

- [ ] Test builds locally: `npm run build:all`
- [ ] Run tests: `npm test`
- [ ] Check TypeScript: `npm run type-check`
- [ ] Review changes: `git diff`
- [ ] Update dependencies: `npm update`
- [ ] Check for security issues: `npm audit`

### Regular Maintenance

- [ ] Keep dependencies up to date
- [ ] Monitor build times and optimize
- [ ] Review and clean up environment variables
- [ ] Check Vercel usage and costs
- [ ] Update documentation
- [ ] Review error logs regularly

### Best Practices

- ✅ Always test locally before deploying
- ✅ Use preview deployments for testing
- ✅ Keep configuration files in version control
- ✅ Document environment variables
- ✅ Monitor deployment status
- ✅ Set up alerts for failures
- ✅ Maintain a deployment runbook

## Additional Resources

- [Deployment Guide](./DEPLOYMENT.md)
- [Local Build Testing](./LOCAL_BUILD_TESTING.md)
- [NPM Publishing Guide](./NPM_PUBLISHING.md)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
