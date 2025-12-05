/**
 * Example Sentry Server Configuration
 * 
 * This file should be copied to your app directory as:
 * - apps/docs/sentry.server.config.ts
 * - apps/demo/sentry.server.config.ts
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
  
  // Set the environment
  environment: process.env.NODE_ENV,
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  
  // Server-specific configuration
  beforeSend(event, hint) {
    // Add custom logic for server errors
    
    // Don't send errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Error (not sent in dev):', hint.originalException || hint.syntheticException);
      return null;
    }
    
    // Filter out expected errors
    const error = hint.originalException;
    if (error instanceof Error) {
      // Filter out 404 errors
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        return null;
      }
      
      // Filter out rate limit errors (handle separately)
      if (error.message.includes('rate limit')) {
        return null;
      }
    }
    
    return event;
  },
  
  // Ignore certain errors
  ignoreErrors: [
    // Expected errors
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    // Next.js specific
    'NEXT_NOT_FOUND',
    'NEXT_REDIRECT',
  ],
  
  // Configure integrations
  integrations: [
    // Add server-specific integrations here
  ],
});
