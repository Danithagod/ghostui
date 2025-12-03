'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'spectral' | 'blood';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// CSS variables for each theme
const themeVariables = {
  spectral: {
    '--ghost-bg': '#1a0b2e',
    '--ghost-bg-secondary': '#2e1065',
    '--ghost-text': '#e9d5ff',
    '--ghost-text-secondary': '#c4b5fd',
    '--ghost-border': '#FF6F00',
    '--ghost-accent': '#FF6F00',
    '--ghost-accent-rgb': '255, 111, 0',
  },
  blood: {
    '--ghost-bg': '#1f0a0a',
    '--ghost-bg-secondary': '#450a0a',
    '--ghost-text': '#fecaca',
    '--ghost-text-secondary': '#fca5a5',
    '--ghost-border': '#991b1b',
    '--ghost-accent': '#ef4444',
    '--ghost-accent-rgb': '239, 68, 68',
  },
} as const;

function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(storageKey);
  if (stored === 'spectral' || stored === 'blood') return stored;
  return null;
}


function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  
  const variables = themeVariables[theme];
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'spectral', 
  storageKey = 'ghostui-theme' 
}: ThemeProviderProps): JSX.Element {
  // Always start with defaultTheme for SSR consistency
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    applyTheme(newTheme);
  }, [storageKey]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'spectral' ? 'blood' : 'spectral');
  }, [theme, setTheme]);

  // Initialize theme from storage on client mount
  useEffect(() => {
    const stored = getStoredTheme(storageKey);
    const initialTheme = stored ?? defaultTheme;
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [storageKey, defaultTheme]);

  // Apply theme when it changes (after mount)
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && (e.newValue === 'spectral' || e.newValue === 'blood')) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  const value: ThemeContextValue = { theme, setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeOptional(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}

ThemeProvider.displayName = 'ThemeProvider';
