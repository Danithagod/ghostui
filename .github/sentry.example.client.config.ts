/**
 * Example Sentry Client Configuration
 * 
 * This file should be copied to your app directory as:
 * - apps/docs/sentry.client.config.ts
 * - apps/demo/sentry.client.config.ts
 * 
 * Install Sentry first:
 * npm install @sentry/nextjs
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Your Sentry DSN from the project settings
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production (0.1 = 10%)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Capture Replay for 10% of all sessions,
  // plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Set the environment
  environment: process.env.NODE_ENV,
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  
  // Filter out errors that are not actionable
  beforeSend(event, hint) {
    // Filter out browser extension errors
    if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
      return null;
    }
    
    if (event.exception?.values?.[0]?.value?.includes('moz-extension://')) {
      return null;
    }
    
    // Filter out network errors from ad blockers
    if (event.exception?.values?.[0]?.value?.includes('Failed to fetch')) {
      return null;
    }
    
    // Filter out ResizeObserver errors (benign)
    if (event.exception?.values?.[0]?.value?.includes('ResizeObserver')) {
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
    'Load failed',
    // ResizeObserver errors (benign)
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Hydration errors (usually benign)
    'Hydration failed',
    'There was an error while hydrating',
    // Common third-party errors
    'Non-Error promise rejection captured',
  ],
  
  // Ignore certain URLs
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
    // Common third-party scripts
    /google-analytics\.com/i,
    /googletagmanager\.com/i,
  ],
  
  // Configure integrations
  integrations: [
    new Sentry.Replay({
      // Mask all text content
      maskAllText: true,
      // Block all media elements
      blockAllMedia: true,
    }),
  ],
});
