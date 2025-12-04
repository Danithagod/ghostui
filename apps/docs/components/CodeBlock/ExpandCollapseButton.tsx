'use client';

import React, { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const ExpandCollapseButton = memo(function ExpandCollapseButton({ isExpanded, onToggle }: ExpandCollapseButtonProps): JSX.Element {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'w-full py-3 px-4 flex items-center justify-center gap-2',
        'text-sm font-medium transition-all duration-200',
        'hover:bg-opacity-20 focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-black'
      )}
      style={{
        color: 'var(--ghost-accent)',
        backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.1)',
        borderTop: '1px solid rgba(var(--ghost-accent-rgb), 0.3)',
      }}
      aria-label={isExpanded ? 'Collapse code block' : 'Expand code block'}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <>
          <ChevronUp className="w-4 h-4" />
          Collapse
        </>
      ) : (
        <>
          <ChevronDown className="w-4 h-4" />
          Expand
        </>
      )}
    </button>
  );
});
