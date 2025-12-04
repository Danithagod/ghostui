'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { highlightCode, loadPrism } from './highlightCode';
import { LanguageBadge } from './LanguageBadge';
import { CopyButton } from './CopyButton';
import { ExpandCollapseButton } from './ExpandCollapseButton';

export interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  maxCollapsedHeight?: number;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  maxCollapsedHeight = 400,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowExpand, setShouldShowExpand] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prismLoaded, setPrismLoaded] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heightCalcTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load Prism.js on mount (client-side only)
  useEffect(() => {
    loadPrism().then(() => {
      setPrismLoaded(true);
    });
  }, []);

  // Intersection Observer for lazy highlighting
  // Only highlight code when it's visible in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: '50px' } // Start loading slightly before entering viewport
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [isVisible]);

  // Memoize syntax highlighting to avoid re-processing on every render
  // Handle empty code string gracefully
  // Only highlight when visible (lazy highlighting) and Prism is loaded
  const highlightedCode = useMemo(() => {
    if (!isVisible || !prismLoaded) {
      return ''; // Don't highlight until visible and Prism is loaded
    }
    if (!code || code.trim() === '') {
      return ''; // Return empty string for empty code
    }
    return highlightCode(code, language);
  }, [code, language, isVisible, prismLoaded]);

  // Debounced height calculation to avoid excessive recalculations
  // Calculate height and determine if expand/collapse button should be shown
  useEffect(() => {
    // Clear any pending height calculation
    if (heightCalcTimeoutRef.current) {
      clearTimeout(heightCalcTimeoutRef.current);
    }

    // Debounce height calculation by 150ms
    heightCalcTimeoutRef.current = setTimeout(() => {
      try {
        const codeElement = codeRef.current;
        if (!codeElement) return;
        
        const height = codeElement.scrollHeight;
        setShouldShowExpand(height > maxCollapsedHeight);
      } catch (error) {
        console.warn('Failed to calculate code block height:', error);
        setShouldShowExpand(false);
      }
    }, 150);

    return () => {
      if (heightCalcTimeoutRef.current) {
        clearTimeout(heightCalcTimeoutRef.current);
      }
    };
  }, [code, maxCollapsedHeight, highlightedCode]);

  // Handle copy button state with automatic reset after 2000ms
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (copied) {
      timeoutId = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [copied]);

  // Memoize callbacks to prevent unnecessary re-renders of child components
  const handleCopy = useCallback(() => {
    setCopied(true);
  }, []);

  const handleToggleExpand = useCallback(() => {
    if (!isExpanded) {
      // Expanding
      setIsExpanded(true);
    } else {
      // Collapsing - scroll to top first
      setIsExpanded(false);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [isExpanded]);

  return (
    <div ref={containerRef} className={cn('relative group my-6', className)}>
      {/* Main code container with theme-aware styling */}
      <div
        className="relative rounded-xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid var(--ghost-accent)',
          boxShadow: '0 0 20px rgba(var(--ghost-accent-rgb), 0.2), 0 10px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header bar with language badge and copy button */}
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/10">
          {/* Language badge in top-left */}
          <LanguageBadge language={language} />
          
          {/* Copy button in top-right */}
          <CopyButton code={code} copied={copied} onCopy={handleCopy} />
        </div>
        
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out',
            !isExpanded && shouldShowExpand && 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-24 after:pointer-events-none'
          )}
          style={{
            maxHeight: !isExpanded && shouldShowExpand ? `${maxCollapsedHeight}px` : 'none',
            ...((!isExpanded && shouldShowExpand) && {
              '--gradient-from': 'rgba(0, 0, 0, 0)',
              '--gradient-to': 'rgba(0, 0, 0, 0.9)',
            } as React.CSSProperties),
          }}
        >
          {/* Gradient fade effect for collapsed state */}
          {!isExpanded && shouldShowExpand && (
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))',
              }}
            />
          )}
          
          {/* Scrollable code container with horizontal scroll support */}
          <pre
            ref={codeRef}
            className="relative overflow-x-auto overflow-y-hidden p-6"
            style={{
              // Enable smooth horizontal scrolling for long lines
              overscrollBehaviorX: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(var(--ghost-accent-rgb), 0.3) transparent',
            }}
          >
            <code 
              className="text-sm font-mono leading-relaxed text-ghost-white block"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
        
        {/* Expand/Collapse button - only shown when content exceeds threshold */}
        {shouldShowExpand && (
          <ExpandCollapseButton 
            isExpanded={isExpanded} 
            onToggle={handleToggleExpand} 
          />
        )}
      </div>
    </div>
  );
}
