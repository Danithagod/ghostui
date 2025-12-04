'use client';

import { memo } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CopyButtonProps {
  code: string;
  copied: boolean;
  onCopy: () => void;
}

export const CopyButton = memo(function CopyButton({ code, copied, onCopy }: CopyButtonProps) {
  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleClick = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        onCopy();
      } else {
        // Fallback for older browsers
        const success = fallbackCopy(code);
        if (success) {
          onCopy();
        }
      }
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      // Try fallback
      const success = fallbackCopy(code);
      if (success) {
        onCopy();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const ariaLabel = copied ? 'Code copied to clipboard' : 'Copy code to clipboard';

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-live="polite"
      tabIndex={0}
      className={cn(
        'flex items-center justify-center',
        'w-9 h-9 rounded-lg',
        'transition-all duration-200',
        prefersReducedMotion ? 'transition-opacity' : 'ease-out',
        'focus-visible:outline-none',
        copied ? 'scale-100' : 'hover:scale-105'
      )}
      style={{
        border: '1px solid rgba(var(--ghost-accent-rgb), 0.3)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'rgba(230, 230, 230, 0.7)',
        boxShadow: copied 
          ? '0 0 15px rgba(var(--ghost-accent-rgb), 0.4)'
          : undefined,
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid var(--ghost-accent)`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = '';
        e.currentTarget.style.outlineOffset = '';
      }}
      onMouseEnter={(e) => {
        if (!prefersReducedMotion && !copied) {
          e.currentTarget.style.backgroundColor = 'rgba(var(--ghost-accent-rgb), 0.2)';
          e.currentTarget.style.color = '#e6e6e6';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(var(--ghost-accent-rgb), 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!prefersReducedMotion && !copied) {
          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          e.currentTarget.style.color = 'rgba(230, 230, 230, 0.7)';
          e.currentTarget.style.boxShadow = '';
        }
      }}
    >
      {copied ? (
        <Check 
          className={cn(
            'w-4 h-4 transition-all duration-200',
            prefersReducedMotion ? '' : 'animate-in fade-in'
          )} 
          style={{ color: 'var(--ghost-accent)' }}
        />
      ) : (
        <Copy 
          className="w-4 h-4 transition-all duration-200" 
        />
      )}
    </button>
  );
});

/**
 * Fallback copy function for browsers without clipboard API
 */
function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
}
