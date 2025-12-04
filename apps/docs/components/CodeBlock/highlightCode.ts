import { highlightComponentNames } from './highlightComponents';

// Client-side only Prism.js instance
let Prism: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPrism() {
  if (typeof window === 'undefined') {
    return null; // Don't load on server
  }
  
  // If already loaded, return it
  if (Prism) {
    return Prism;
  }
  
  // If currently loading, wait for that promise
  if (isLoading && loadPromise) {
    return loadPromise;
  }
  
  // Start loading
  isLoading = true;
  loadPromise = (async () => {
    try {
      // Import Prism core - need to handle both default and named exports
      const PrismCore = await import('prismjs');
      
      // Prism.js exports itself as both default and named export
      // We need to use the actual Prism object, not the module wrapper
      const PrismInstance = (PrismCore as any).default || PrismCore;
      
      // Set up global Prism for component modules to extend
      if (typeof window !== 'undefined') {
        (window as any).Prism = PrismInstance;
      }
      
      // Now load language components - they will extend window.Prism
      // Load in dependency order
      await import('prismjs/components/prism-javascript');
      await import('prismjs/components/prism-typescript');
      await import('prismjs/components/prism-jsx');
      await import('prismjs/components/prism-tsx');
      await import('prismjs/components/prism-css');
      await import('prismjs/components/prism-json');
      await import('prismjs/components/prism-bash');
      
      // Get the extended Prism from window
      Prism = (window as any).Prism;
      
      if (!Prism || !Prism.languages) {
        throw new Error('Prism.js failed to load properly');
      }
      
      return Prism;
    } catch (error) {
      console.error('Failed to load Prism.js:', error);
      isLoading = false;
      loadPromise = null;
      Prism = null;
      return null;
    }
  })();
  
  return loadPromise;
}

/**
 * Highlights code using Prism.js with a custom GhostUI theme
 * and post-processes to highlight React component names
 * @param code - The code string to highlight
 * @param language - The programming language (default: 'tsx')
 * @returns HTML string with syntax highlighting and component name highlighting
 */
export function highlightCode(code: string, language: string = 'tsx'): string {
  // Handle empty code gracefully
  if (!code || code.trim() === '') {
    return '';
  }
  
  // SSR fallback: return escaped plain text
  if (typeof window === 'undefined') {
    return escapeHtml(code);
  }
  
  try {
    // Prism should be loaded by now (via useEffect in CodeBlock component)
    if (!Prism) {
      return escapeHtml(code);
    }
    
    // Get the appropriate Prism language grammar
    const grammar = Prism.languages[language] || Prism.languages.tsx;
    
    // Highlight the code using Prism.js
    // Prism.js automatically escapes special HTML characters (<, >, &, ", ')
    const highlighted = Prism.highlight(code, grammar, language);
    
    // Post-process to highlight component names (PascalCase)
    const withComponentHighlighting = highlightComponentNames(highlighted);
    
    return withComponentHighlighting;
  } catch (error) {
    console.error('Error highlighting code:', error);
    // Fallback: return escaped plain text if highlighting fails
    return escapeHtml(code);
  }
}

/**
 * Escapes special HTML characters to prevent XSS and layout issues
 * Used as a fallback when syntax highlighting fails or during SSR
 * @param text - Plain text to escape
 * @returns HTML-safe string
 */
function escapeHtml(text: string): string {
  // Server-safe HTML escaping
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Export the loadPrism function so CodeBlock can call it
export { loadPrism };

/**
 * Custom GhostUI Prism theme configuration
 * This theme integrates with the GhostUI design system colors
 * and ensures component names use the theme accent color
 */
export const ghostUITheme = {
  'comment': { color: 'rgba(230, 230, 230, 0.5)', fontStyle: 'italic' },
  'prolog': { color: 'rgba(230, 230, 230, 0.5)' },
  'doctype': { color: 'rgba(230, 230, 230, 0.5)' },
  'cdata': { color: 'rgba(230, 230, 230, 0.5)' },
  'punctuation': { color: '#e9d5ff' },
  'property': { color: '#FBBF24' },
  'tag': { color: '#FBBF24' },
  'boolean': { color: '#a855f7' },
  'number': { color: '#a855f7' },
  'constant': { color: '#a855f7' },
  'symbol': { color: '#a855f7' },
  'deleted': { color: '#ef4444' },
  'selector': { color: '#10b981' },
  'attr-name': { color: '#10b981' },
  'string': { color: '#10b981' },
  'char': { color: '#10b981' },
  'builtin': { color: '#10b981' },
  'inserted': { color: '#10b981' },
  'operator': { color: '#e9d5ff' },
  'entity': { color: '#e9d5ff' },
  'url': { color: '#e9d5ff' },
  'variable': { color: '#e9d5ff' },
  'atrule': { color: '#a855f7' },
  'attr-value': { color: '#10b981' },
  'keyword': { color: '#a855f7' },
  'function': { color: '#FBBF24' },
  'class-name': { color: 'var(--ghost-accent)' }, // Theme-aware
  'regex': { color: '#10b981' },
  'important': { color: '#ef4444', fontWeight: 'bold' },
};
