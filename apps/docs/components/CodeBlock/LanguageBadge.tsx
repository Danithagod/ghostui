import React, { memo } from 'react';

export interface LanguageBadgeProps {
  language?: string;
}

export const LanguageBadge = memo(function LanguageBadge({ language = 'tsx' }: LanguageBadgeProps): JSX.Element {
  return (
    <span
      className="px-2 py-1 text-xs font-semibold rounded-md pointer-events-none"
      style={{
        border: '1px solid rgba(var(--ghost-accent-rgb), 0.4)',
        backgroundColor: 'rgba(var(--ghost-accent-rgb), 0.1)',
        color: 'var(--ghost-accent)',
      }}
    >
      {language.toUpperCase()}
    </span>
  );
});
