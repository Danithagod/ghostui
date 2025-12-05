# Environment Variables Guide

This document provides comprehensive information about environment variables used in the GhostUI monorepo applications.

## Table of Contents

- [Overview](#overview)
- [NEXT_PUBLIC_ Prefix Behavior](#next_public_-prefix-behavior)
- [Demo App Variables](#demo-app-variables)
- [Docs App Variables](#docs-app-variables)
- [Local Development Setup](#local-development-setup)
- [Vercel Dashboard Configuration](#vercel-dashboard-configuration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The GhostUI monorepo contains two Next.js applications that may require environment variables for configuration:

- **Demo App** (`apps/demo`) - Potion shop e-commerce demonstration
- **Docs App** (`apps/docs`) - Component documentation site

Environment variables allow you to configure application behavior without hardcoding values, making it easy to use different settings for development, preview, and production environments.

## NEXT_PUBLIC_ Prefix Behavior

Next.js handles environment variables differently based on their prefix:

### Public Variables (NEXT_PUBLIC_)

**Prefix:** `NEXT_PUBLIC_`

**Accessibility:** Client-side (browser) AND server-side

**Behavior:**
- Variables prefixed with `NEXT_PUBLIC_` are embedded into the browser JavaScript bundle during build time
- They are accessible in both client components and server-side code
- The values are **publicly visible** in the browser's source code
- They are **inlined at build time**, so changing them requires a rebuild

**Use Cases:**
- API endpoints that the browser needs to call
- Public configuration like site URLs
- Analytics IDs and tracking codes
- Feature flags that control UI behavior
- Any value that client-side code needs to access

**Example:**
```typescript
// Accessible in client components
export default function Component() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return <div>Site: {siteUrl}</div>;
}
```

**⚠️ Security Warning:** Never use `NEXT_PUBLIC_` prefix for sensitive data like API keys, secrets, or passwords, as they will be visible in the browser.

### Server-Only Variables

**Prefix:** None (no prefix)

**Accessibility:** Server-side ONLY

**Behavior:**
- Variables without the `NEXT_PUBLIC_` prefix are only available in server-side code
- They are NOT included in the browser bundle
- They remain secure and hidden from client-side code
- They can be changed without rebuilding (in serverless environments)

**Use Cases:**
- Database connection strings
- API secret keys and authentication tokens
- Private configuration
- Server-side feature flags
- Any sensitive data

**Example:**
```typescript
// Only accessible in API routes, getServerSideProps, etc.
export async function GET() {
  const apiKey = process.env.API_SECRET_KEY;
  // Use apiKey for server-side operations
}
```

## Demo App Variables

The Demo App is a potion shop e-commerce demonstration showcasing GhostUI components.

### Required Variables

Currently, the Demo App does not require any environment variables to function. All variables listed below are optional.

### Optional Variables

#### NEXT_PUBLIC_SITE_URL

- **Type:** Public (client + server)
- **Required:** No
- **Default:** `http://localhost:3001` (development)
- **Description:** The base URL where the demo app is hosted
- **Usage:** Generating absolute URLs, meta tags, Open Graph tags
- **Development Value:** `http://localhost:3001`
- **Production Value:** `https://your-demo-domain.vercel.app`

#### NEXT_PUBLIC_API_URL

- **Type:** Public (client + server)
- **Required:** No
- **Default:** `http://localhost:3001/api` (development)
- **Description:** Base URL for API endpoints
- **Usage:** Fetching product data, processing orders (if using external API)
- **Development Value:** `http://localhost:3001/api`
- **Production Value:** `https://your-demo-domain.vercel.app/api`

#### NEXT_PUBLIC_ANALYTICS_ID

- **Type:** Public (client + server)
- **Required:** No
- **Default:** None
- **Description:** Google Analytics or similar tracking ID
- **Usage:** Tracking user interactions, page views, and e-commerce events
- **Development Value:** Leave empty or use test ID
- **Production Value:** Your analytics tracking ID (e.g., `G-XXXXXXXXXX`)

#### DATABASE_URL

- **Type:** Server-only
- **Required:** No
- **Default:** None
- **Description:** Database connection string
- **Usage:** Storing order data, user preferences (if implementing persistence)
- **Development Value:** Local database connection string
- **Production Value:** Production database connection string

#### API_SECRET_KEY

- **Type:** Server-only
- **Required:** No
- **Default:** None
- **Description:** Secret key for API authentication
- **Usage:** Securing API endpoints, validating requests
- **Development Value:** Any random string for testing
- **Production Value:** Secure random string (use a password generator)

## Docs App Variables

The Docs App provides documentation and examples for GhostUI components.

### Required Variables

Currently, the Docs App does not require any environment variables to function. All variables listed below are optional.

### Optional Variables

#### NEXT_PUBLIC_SITE_URL

- **Type:** Public (client + server)
- **Required:** No
- **Default:** `http://localhost:3000` (development)
- **Description:** The base URL where the docs app is hosted
- **Usage:** Generating canonical links, meta tags, sitemaps
- **Development Value:** `http://localhost:3000`
- **Production Value:** `https://your-docs-domain.vercel.app`

#### NEXT_PUBLIC_API_URL

- **Type:** Public (client + server)
- **Required:** No
- **Default:** `http://localhost:3000/api` (development)
- **Description:** Base URL for API endpoints
- **Usage:** Fetching component data, search functionality
- **Development Value:** `http://localhost:3000/api`
- **Production Value:** `https://your-docs-domain.vercel.app/api`

#### NEXT_PUBLIC_ANALYTICS_ID

- **Type:** Public (client + server)
- **Required:** No
- **Default:** None
- **Description:** Google Analytics or similar tracking ID
- **Usage:** Tracking documentation usage, popular components
- **Development Value:** Leave empty or use test ID
- **Production Value:** Your analytics tracking ID (e.g., `G-XXXXXXXXXX`)

#### NEXT_PUBLIC_SEARCH_API_KEY

- **Type:** Public (client + server)
- **Required:** No
- **Default:** None
- **Description:** API key for search service (e.g., Algolia)
- **Usage:** Powering documentation search functionality
- **Development Value:** Test API key or leave empty for built-in search
- **Production Value:** Production search API key

#### GITHUB_TOKEN

- **Type:** Server-only
- **Required:** No
- **Default:** None
- **Description:** GitHub personal access token
- **Usage:** Fetching repository data, displaying source code, version info
- **Development Value:** Personal access token with repo read permissions
- **Production Value:** Same or organization token

#### API_SECRET_KEY

- **Type:** Server-only
- **Required:** No
- **Default:** None
- **Description:** Secret key for API authentication
- **Usage:** Securing API endpoints, validating requests
- **Development Value:** Any random string for testing
- **Production Value:** Secure random string (use a password generator)

## Local Development Setup

### Step 1: Copy Example Files

For each application you're working on, copy the `.env.example` file to `.env.local`:

```bash
# For Demo App
cd apps/demo
cp .env.example .env.local

# For Docs App
cd apps/docs
cp .env.example .env.local
```

### Step 2: Edit Values

Open the `.env.local` files and update the values as needed for your local development environment.

**Demo App (`apps/demo/.env.local`):**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# Add other variables as needed
```

**Docs App (`apps/docs/.env.local`):**
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Add other variables as needed
```

### Step 3: Restart Development Server

After creating or modifying `.env.local` files, restart your development server for changes to take effect:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev --workspace=apps/demo
# or
npm run dev --workspace=apps/docs
```

### Important Notes

- `.env.local` files are gitignored and should never be committed to version control
- Environment variables are loaded at build time for `NEXT_PUBLIC_` variables
- Server-only variables can be accessed at runtime
- Changes to `NEXT_PUBLIC_` variables require a server restart in development

## Vercel Dashboard Configuration

When deploying to Vercel, environment variables must be configured through the Vercel dashboard.

### Step 1: Access Project Settings

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (Demo App or Docs App)
3. Click on **Settings** in the top navigation
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Environment Variables

For each environment variable:

1. Click **Add New** button
2. Enter the **Key** (variable name, e.g., `NEXT_PUBLIC_SITE_URL`)
3. Enter the **Value** (the actual value for this environment)
4. Select the **Environment(s)** where this variable should be available:
   - **Production**: Used for production deployments (main branch)
   - **Preview**: Used for preview deployments (pull requests)
   - **Development**: Used for local development (via Vercel CLI)

5. Click **Save**

### Step 3: Configure for Each Environment

You can set different values for each environment. For example:

**NEXT_PUBLIC_SITE_URL:**
- Production: `https://ghostui-demo.vercel.app`
- Preview: `https://ghostui-demo-git-[branch].vercel.app` (Vercel auto-generates)
- Development: `http://localhost:3001`

**Best Practice:** Set variables for both Production and Preview environments to ensure preview deployments work correctly.

### Step 4: Redeploy

After adding or changing environment variables:

1. Variables are applied to new deployments automatically
2. For existing deployments, trigger a redeploy:
   - Go to **Deployments** tab
   - Click the three dots (...) on the latest deployment
   - Select **Redeploy**

### Environment Variable Targets

| Target | When Used | Example Use Case |
|--------|-----------|------------------|
| **Production** | Deployments from main/master branch | Live site with production API keys |
| **Preview** | Deployments from pull requests | Testing with staging API keys |
| **Development** | Local development via Vercel CLI | Local testing with dev API keys |

### Vercel CLI (Optional)

You can also manage environment variables using the Vercel CLI:

```bash
# Add a variable
vercel env add NEXT_PUBLIC_SITE_URL production

# List all variables
vercel env ls

# Pull environment variables to local .env file
vercel env pull
```

## Best Practices

### Security

1. **Never commit `.env.local` files** - They contain sensitive data and are gitignored
2. **Use `NEXT_PUBLIC_` only for non-sensitive data** - These values are visible in browser
3. **Rotate secrets regularly** - Change API keys and tokens periodically
4. **Use different values per environment** - Don't use production secrets in development
5. **Limit access to production variables** - Only give team members necessary access

### Organization

1. **Document all variables** - Keep `.env.example` files up to date
2. **Use descriptive names** - Make variable purposes clear (e.g., `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
3. **Group related variables** - Use comments to organize variables by feature
4. **Provide example values** - Help developers understand expected formats

### Development Workflow

1. **Copy `.env.example` to `.env.local`** - Start with template
2. **Never modify `.env.example` with real values** - Keep it as a template
3. **Restart server after changes** - Environment variables are loaded at startup
4. **Test in preview environments** - Verify variables work before production

### Vercel Deployment

1. **Set variables before first deployment** - Avoid deployment failures
2. **Use Preview environment for testing** - Test new variables in pull requests
3. **Document required variables** - Help team members configure deployments
4. **Monitor for missing variables** - Check build logs for undefined variable warnings

## Troubleshooting

### Variable is undefined in browser

**Problem:** `process.env.MY_VARIABLE` returns `undefined` in client-side code

**Solutions:**
1. Ensure variable name starts with `NEXT_PUBLIC_` prefix
2. Restart development server after adding variable
3. Check that variable is defined in `.env.local` (development) or Vercel dashboard (production)
4. Verify no typos in variable name

### Variable is undefined on server

**Problem:** `process.env.MY_VARIABLE` returns `undefined` in API routes or server-side code

**Solutions:**
1. Check that variable is defined in `.env.local` (development) or Vercel dashboard (production)
2. Verify variable name doesn't have typos
3. Ensure variable is set for correct environment (Production/Preview/Development)
4. For Vercel deployments, trigger a redeploy after adding variables

### Changes not taking effect

**Problem:** Updated environment variable but changes aren't reflected

**Solutions:**
1. **Development:** Restart the development server (Ctrl+C, then `npm run dev`)
2. **Production:** Trigger a new deployment in Vercel dashboard
3. **Browser cache:** Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
4. **Build cache:** Clear Next.js cache: `rm -rf .next` then rebuild

### Variable visible in browser source

**Problem:** Sensitive data is visible in browser's JavaScript source

**Solutions:**
1. **Remove `NEXT_PUBLIC_` prefix** - Server-only variables are not bundled
2. **Move logic to API route** - Handle sensitive operations server-side
3. **Rotate compromised secrets** - Change any exposed API keys immediately
4. **Review security practices** - Audit all environment variables

### Different values in different environments

**Problem:** Variable has wrong value in preview or production

**Solutions:**
1. Check Vercel dashboard environment variable settings
2. Verify variable is set for correct environment target (Production/Preview)
3. Ensure no typos in variable names across environments
4. Check that variable isn't being overridden by another source

### Build fails with missing variable

**Problem:** Build fails with error about undefined environment variable

**Solutions:**
1. Add the required variable to Vercel dashboard
2. Set variable for correct environment (Production/Preview)
3. If variable is optional, add fallback in code: `process.env.VAR || 'default'`
4. Check build logs for specific variable name causing issue

## Additional Resources

- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Environment Variables Best Practices](https://12factor.net/config)

## Support

If you encounter issues not covered in this guide:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Vercel's support documentation](https://vercel.com/docs)
3. Search for similar issues in the project's GitHub repository
4. Contact the development team for assistance
