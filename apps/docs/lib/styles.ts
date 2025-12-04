/**
 * Centralized style constants for GhostUI documentation
 * These constants ensure consistent styling across all component documentation pages
 */

/**
 * Table styles for PropsTable component
 * Provides consistent API documentation table styling
 */
export const TABLE_STYLES = {
  container: 'bg-[#0a0412] border border-ghost-orange/20 rounded-lg overflow-hidden',
  table: 'w-full text-sm',
  thead: 'bg-ghost-orange/10 border-b border-ghost-orange/20',
  th: 'text-left px-4 py-3 text-ghost-white font-semibold',
  tbody: 'divide-y divide-ghost-orange/10',
  td: 'px-4 py-3',
  propName: 'text-ghost-white/90 font-mono',
  propType: 'text-ghost-white/70 font-mono text-xs',
  propRequired: 'text-ghost-white/70',
  propDescription: 'text-ghost-white/70',
} as const;

/**
 * Preview size variants for ComponentPlayground
 * Maps size keys to min-height classes
 */
export const PREVIEW_SIZES = {
  sm: 'min-h-[200px]',
  md: 'min-h-[350px]',
  lg: 'min-h-[500px]',
  xl: 'min-h-[700px]',
} as const;

/**
 * Preview container styles for ComponentPlayground
 * Provides consistent preview area styling
 */
export const PREVIEW_STYLES = {
  container: 'flex items-center justify-center bg-black/60 p-6 md:p-8',
} as const;

/**
 * Page styles for component documentation pages
 * Provides consistent typography and spacing
 */
export const PAGE_STYLES = {
  h1: 'text-5xl font-display text-ghost-orange',
  lead: 'lead text-ghost-white/80',
  h2: 'text-3xl font-display text-ghost-orange mt-12',
  h3: 'text-2xl font-display text-ghost-orange mt-8',
  prose: 'prose prose-invert max-w-none',
} as const;

// Type exports for TypeScript consumers
export type PreviewSize = keyof typeof PREVIEW_SIZES;
export type TableStyleKey = keyof typeof TABLE_STYLES;
export type PageStyleKey = keyof typeof PAGE_STYLES;
