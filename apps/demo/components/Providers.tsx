"use client";

import { ThemeProvider, GhostToastProvider } from "ghostui-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="spectral" storageKey="cauldron-theme">
      <GhostToastProvider>
        {children}
      </GhostToastProvider>
    </ThemeProvider>
  );
}
