'use client';

import { ThemeProvider } from 'ghostui-react';
import { PageTransitionProvider } from './PageTransition';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="spectral">
      <PageTransitionProvider>
        {children}
      </PageTransitionProvider>
    </ThemeProvider>
  );
}
