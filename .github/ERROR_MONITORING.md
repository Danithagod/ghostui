# Error Monitoring Setup Guide

This document provides instructions for setting up error monitoring and tracking for the GhostUI monorepo applications deployed on Vercel.

## Overview

Error monitoring helps you:
- Track runtime errors in production
- Monitor application performance
- Identify and fix issues before users report them
- Analyze error trends and patterns
- Set up alerts for critical errors

## Recommended Services

### 1. Sentry (Recommended)

**Best for**: Comprehensive error tracking with excellent Next.js support

**Pricing**: Free tier available (5,000 events/month)

**Features**:
- Real-time error tracking
- Source map support
- Release tracking
- Performance monitoring
- User feedback
- Issue assignment and workflow

### 2. LogRocket

**Best for**: Session replay and user behavior analysis

**Pricing**: Free tier available (1,000 sessions/month)

**Features**:
- Session replay
- Error tracking
- Performance monitoring
- User analytics
- Console logs capture

### 3. Vercel Analytics (Built-in)

**Best for**: Basic analytics and Web Vitals monitoring

**Pricing**: Free with Vercel Pro plan

**Features**:
- Web Vitals tracking
- Page view analytics
- Real User Monitoring (RUM)
- No code changes required

### 4. Datadog

**Best for**: Enterprise-level monitoring and APM

**Pricing**: Paid plans only

**Features**:
- Full-stack monitoring
- APM and tracing
- Log management
- Infrastructure monitoring
- Custom dashboards

## Sentry Integration (Recommended)

### Step 1: Create Sentry Account

1. Go to [sentry.io](https://sentry.io)
2. Sign up for a free account
3. Create a new organization (e.g., "GhostUI")

### Step 2: Create Projects

Create separate projects for each application:

1. **ghostui-docs** (Next.js project)
2. **ghostui-demo** (Next.js project)

### Step 3: Install Sentry SDK

**For Docs App:**

```bash
cd apps/docs
npm install @sentry/nextjs
```

**For Demo App:**

```bash
cd apps/demo
npm install @sentry/nextjs
```

### Step 4: Initialize Sentry

Run the Sentry wizard to automatically configure your project:

```bash
# In apps/docs
npx @sentry/wizard@latest -i nextjs

# In apps/demo
npx @sentry/wizard@latest -i nextjs
```

This will create:
- `sentry.client.config.ts` - Client-side configuration
- `sentry.server.config.ts` - Server-side configuration
- `sentry.edge.config.ts` - Edge runtime configuration
- Updates to `next.config.ts` with Sentry plugin

### Step 5: Configure Environment Variables

Add to `.env.local` (for local development):

```env
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org-name
SENTRY_PROJECT=ghostui-docs
SENTRY_AUTH_TOKEN=your-auth-token
```

Add to Vercel project settings (for production):

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add the following variables:
   - `NEXT_PUBLIC_SENTRY_DSN`: Your Sentry DSN (Production, Preview, Development)
   - `SENTRY_ORG`: Your organization name (Production only)
   - `SENTRY_PROJECT`: Project name (Production only)
   - `SENTRY_AUTH_TOKEN`: Auth token for source maps (Production only)

### Step 6: Configure Sentry Client

**Example `sentry.client.config.ts`:**

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,
  
  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  
  environment: process.env.NODE_ENV,
  
  // Filter out errors that are not actionable
  beforeSend(event, hint) {
    // Filter out browser extension errors
    if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
      return null;
    }
    
    // Filter out network errors from ad blockers
    if (event.exception?.values?.[0]?.value?.includes('Failed to fetch')) {
      return null;
    }
    
    return event;
  },
  
  // Ignore certain errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    // Random plugins/extensions
    'Can\'t find variable: ZiteReader',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    // Network errors
    'NetworkError',
    'Network request failed',
    // ResizeObserver errors (benign)
    'ResizeObserver loop limit exceeded',
  ],
});
```

**Example `sentry.server.config.ts`:**

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  tracesSampleRate: 0.1,
  
  environment: process.env.NODE_ENV,
  
  // Server-specific configuration
  beforeSend(event, hint) {
    // Add custom logic for server errors
    return event;
  },
});
```

### Step 7: Test Error Tracking

Create a test error page to verify Sentry is working:

**Create `apps/docs/app/sentry-test/page.tsx`:**

```typescript
'use client';

export default function SentryTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sentry Test Page</h1>
      <button
        onClick={() => {
          throw new Error('Test error from client component');
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Trigger Client Error
      </button>
    </div>
  );
}
```

Visit `/sentry-test` and click the button to trigger an error. Check Sentry dashboard to confirm the error was captured.

### Step 8: Configure Alerts

In Sentry dashboard:

1. Go to **Alerts** → **Create Alert**
2. Choose alert type:
   - **Issues**: Alert on new or regressed issues
   - **Metric**: Alert on error rate, performance, etc.
3. Configure conditions:
   - When: "An issue is first seen"
   - Or: "An issue changes state from resolved to unresolved"
   - Or: "Error rate exceeds threshold"
4. Set actions:
   - Send email notification
   - Post to Slack channel
   - Create GitHub issue
5. Save alert rule

**Recommended Alerts:**

- **Critical Errors**: Alert immediately when error rate > 10/minute
- **New Issues**: Alert when new error types appear
- **Regression**: Alert when resolved issues reoccur
- **Performance**: Alert when page load time > 3 seconds

### Step 9: Source Maps

Sentry automatically uploads source maps during build when configured correctly.

**Verify in `next.config.ts`:**

```typescript
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // Your existing config
};

module.exports = withSentryConfig(
  nextConfig,
  {
    // Sentry webpack plugin options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // Sentry SDK options
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
```

## Vercel Analytics Integration

### Step 1: Enable Vercel Analytics

1. Go to Vercel Dashboard → Project Settings → Analytics
2. Click "Enable Analytics"
3. Choose plan (Free with Pro account)

### Step 2: Install Analytics Package

```bash
cd apps/docs
npm install @vercel/analytics

cd apps/demo
npm install @vercel/analytics
```

### Step 3: Add Analytics Component

**Update `apps/docs/app/layout.tsx`:**

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Step 4: Enable Speed Insights (Optional)

```bash
npm install @vercel/speed-insights
```

**Add to layout:**

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## LogRocket Integration (Optional)

### Step 1: Create LogRocket Account

1. Go to [logrocket.com](https://logrocket.com)
2. Sign up for free account
3. Create new application

### Step 2: Install LogRocket

```bash
npm install logrocket
npm install logrocket-react
```

### Step 3: Initialize LogRocket

**Create `lib/logrocket.ts`:**

```typescript
import LogRocket from 'logrocket';

export function initLogRocket() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID!);
  }
}
```

**Update layout:**

```typescript
'use client';

import { useEffect } from 'react';
import { initLogRocket } from '@/lib/logrocket';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initLogRocket();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Step 4: Integrate with Sentry

```typescript
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/nextjs';

LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra('sessionURL', sessionURL);
  });
});
```

## Custom Error Boundary

Create a custom error boundary to catch React errors:

**Create `components/ErrorBoundary.tsx`:**

```typescript
'use client';

import React from 'react';
import * as Sentry from '@sentry/nextjs';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">
                We've been notified and are working on a fix.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

**Use in layout:**

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
```

## Monitoring Best Practices

### 1. Error Filtering

Filter out noise to focus on actionable errors:

- Browser extension errors
- Ad blocker errors
- Network timeouts (unless critical)
- Known third-party library issues
- Development environment errors

### 2. Error Grouping

Configure error grouping to avoid duplicate issues:

- Group by error message
- Group by stack trace
- Group by affected component

### 3. Performance Monitoring

Track key metrics:

- **Web Vitals**: LCP, FID, CLS
- **Page Load Time**: Time to interactive
- **API Response Time**: Backend performance
- **Bundle Size**: JavaScript payload

### 4. User Context

Add user context to errors:

```typescript
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});
```

### 5. Custom Tags

Add custom tags for better filtering:

```typescript
Sentry.setTag('page', 'checkout');
Sentry.setTag('feature', 'payment');
```

### 6. Breadcrumbs

Add breadcrumbs to track user actions:

```typescript
Sentry.addBreadcrumb({
  category: 'ui',
  message: 'User clicked checkout button',
  level: 'info',
});
```

## Alert Configuration

### Critical Alerts (Immediate Response)

- Error rate > 10/minute
- 500 errors on critical pages
- Payment processing failures
- Authentication failures

**Action**: Page on-call engineer, post to #incidents channel

### High Priority Alerts (1 hour response)

- New error types
- Error rate > 5/minute
- Performance degradation > 50%
- API failures

**Action**: Post to #engineering channel, create ticket

### Medium Priority Alerts (24 hour response)

- Resolved issues reoccurring
- Error rate > 1/minute
- Performance degradation > 25%

**Action**: Create ticket, review in daily standup

### Low Priority Alerts (Weekly review)

- Rare errors (< 1/day)
- Minor performance issues
- Non-critical warnings

**Action**: Review in weekly metrics meeting

## Dashboard Setup

### Sentry Dashboard

Create custom dashboards for:

1. **Overview**: Error rate, affected users, top issues
2. **Performance**: Page load times, API response times
3. **Releases**: Error rate by release version
4. **User Impact**: Errors by user segment

### Vercel Analytics Dashboard

Monitor:

1. **Traffic**: Page views, unique visitors
2. **Performance**: Web Vitals scores
3. **Geography**: User locations
4. **Devices**: Browser and device breakdown

## Troubleshooting

### Errors Not Appearing in Sentry

**Solutions:**
1. Verify DSN is correct in environment variables
2. Check Sentry is initialized before errors occur
3. Verify source maps are uploaded
4. Check network tab for Sentry requests
5. Test with manual error trigger

### Source Maps Not Working

**Solutions:**
1. Verify `SENTRY_AUTH_TOKEN` is set
2. Check Sentry webpack plugin configuration
3. Ensure source maps are generated in build
4. Verify organization and project names are correct

### High Error Volume

**Solutions:**
1. Review error filtering rules
2. Increase sample rate for less critical errors
3. Group similar errors together
4. Fix high-frequency errors first

## Cost Optimization

### Sentry

- Use sampling to reduce event volume
- Filter out non-actionable errors
- Archive old issues regularly
- Use appropriate plan tier

### LogRocket

- Limit session recording to critical pages
- Use conditional recording based on user segment
- Set appropriate retention period

### Vercel Analytics

- Included with Pro plan
- No additional cost optimization needed

## Security Considerations

### Sensitive Data

- Never log passwords or tokens
- Scrub PII from error messages
- Use Sentry's data scrubbing features
- Review error data regularly

### Access Control

- Limit Sentry access to team members
- Use role-based permissions
- Rotate auth tokens regularly
- Enable 2FA for all accounts

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [LogRocket Documentation](https://docs.logrocket.com/)
- [Web Vitals Guide](https://web.dev/vitals/)

## Support

For issues with error monitoring:

1. Check service status pages
2. Review documentation
3. Contact support via dashboard
4. Consult team in Slack/Discord
