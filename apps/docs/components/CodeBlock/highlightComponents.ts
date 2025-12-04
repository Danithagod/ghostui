/**
 * Component name highlighting utilities
 * Detects and highlights PascalCase component names in code
 */

/**
 * Regex pattern for detecting PascalCase component names
 * Matches words that:
 * - Start with a capital letter
 * - Contain at least one more capital letter (to exclude single words like "Button")
 * - Are word-bounded (not part of a larger identifier)
 * 
 * Examples that match:
 * - GooeyButton
 * - SpookyTooltip
 * - ThemeProvider
 * - ComponentPlayground
 * 
 * Examples that don't match:
 * - Button (single word, only one capital)
 * - I, A (single letter)
 * - useState (starts with lowercase)
 * - CONSTANT (all caps)
 */
export const COMPONENT_NAME_PATTERN = /\b[A-Z][a-z]+(?:[A-Z][a-z]*)+\b/g;

/**
 * Highlights PascalCase component names in already syntax-highlighted HTML
 * This function post-processes Prism.js output to add special highlighting
 * for React component names while preserving the original code structure
 * 
 * @param html - HTML string from Prism.js syntax highlighting
 * @returns HTML string with component names wrapped in spans with 'component-name' class
 */
export function highlightComponentNames(html: string): string {
  // Parse the HTML string into a DOM structure
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Create a TreeWalker to traverse all text nodes
  const walker = document.createTreeWalker(
    doc.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip text nodes inside string tokens to exclude component names in string literals
        const parent = node.parentElement;
        if (parent?.classList.contains('token') && 
            parent?.classList.contains('string')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  // Collect all text nodes that should be processed
  const textNodes: Text[] = [];
  let currentNode: Node | null;
  while (currentNode = walker.nextNode()) {
    textNodes.push(currentNode as Text);
  }
  
  // Process each text node to find and highlight component names
  textNodes.forEach(node => {
    const text = node.textContent || '';
    const matches = text.match(COMPONENT_NAME_PATTERN);
    
    if (matches && matches.length > 0) {
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      
      // Use replace to iterate through matches while tracking positions
      text.replace(COMPONENT_NAME_PATTERN, (match, index) => {
        // Add text before the match
        if (index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, index))
          );
        }
        
        // Add highlighted component name
        const span = document.createElement('span');
        span.className = 'component-name';
        span.textContent = match;
        fragment.appendChild(span);
        
        lastIndex = index + match.length;
        return match;
      });
      
      // Add remaining text after the last match
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex))
        );
      }
      
      // Replace the original text node with the fragment containing highlighted components
      node.parentNode?.replaceChild(fragment, node);
    }
  });
  
  return doc.body.innerHTML;
}
