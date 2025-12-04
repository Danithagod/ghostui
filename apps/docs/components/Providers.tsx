'use client';

import { ThemeProvider } from 'ghostui-react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="spectral">
      {children}
    </ThemeProvider>
  );
}
