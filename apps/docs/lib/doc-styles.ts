/**
 * Documentation Style Guide for GhostUI Component Pages
 * 
 * This module provides standardized CSS class definitions and helper functions
 * for maintaining consistent styling across all component documentation pages.
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5
 */

/**
 * Page-level container and spacing styles
 * Ensures consistent spacing between major sections
 */
export const pageStyles = {
  /** Main page container with consistent vertical spacing */
  container: 'space-y-12',
  
  /** Section container with consistent vertical spacing */
  section: 'space-y-6 mt-12',
  
  /** Subsection container with reduced spacing */
  subsection: 'space-y-4 mt-8',
} as const;

/**
 * Typography styles for headers and text content
 * Maintains consistent visual hierarchy across all pages
 */
export const typographyStyles = {
  /** H1 header - Component title */
  h1: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',
  
  /** H2 header - Major sections */
  h2: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',
  
  /** H3 header - Subsections */
  h3: 'text-xl md:text-2xl font-semibold text-ghost-white',
  
  /** H4 header - Minor subsections */
  h4: 'text-lg font-semibold text-ghost-white',
  
  /** Lead paragraph - Component description */
  lead: 'lead text-ghost-white/90',
  
  /** Body text - Regular content */
  body: 'text-ghost-white/80 leading-relaxed',
  
  /** Code inline - Inline code snippets */
  codeInline: 'px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs',
  
  /** Code block text */
  codeBlock: 'font-mono text-ghost-white/90',
} as const;

/**
 * Spacing utilities for consistent gaps between elements
 * Follows the 4-point spacing scale
 */
export const spacingStyles = {
  /** Spacing between major sections (48px) */
  sectionGap: 'mt-12',
  
  /** Spacing between subsections (32px) */
  subsectionGap: 'mt-8',
  
  /** Spacing between content blocks (24px) */
  contentGap: 'mt-6',
  
  /** Spacing between header and content (16px) */
  headerContent: 'space-y-4',
  
  /** Spacing between paragraphs (24px) */
  paragraphGap: 'space-y-6',
  
  /** Spacing within lists */
  listGap: 'space-y-3',
} as const;

/**
 * Container styles for preview areas, code blocks, and info boxes
 * Ensures consistent visual treatment of different content types
 */
export const containerStyles = {
  /** Preview container - Interactive component demonstrations */
  preview: 'bg-[#05020a] rounded-lg border border-ghost-orange/30 p-8',
  
  /** Preview container with reduced padding */
  previewCompact: 'bg-[#05020a] rounded-lg border border-ghost-orange/30 p-6',
  
  /** Code block container */
  codeBlock: 'bg-ghost-black border border-ghost-orange/30 rounded-lg p-4',
  
  /** Info box - Highlighted information */
  infoBox: 'bg-ghost-orange/10 border border-ghost-orange/30 rounded-lg p-6',
  
  /** Warning box */
  warningBox: 'bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4',
  
  /** Feature highlight box */
  featureBox: 'p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/10',
  
  /** Interactive feature box with hover effect */
  featureBoxHover: 'p-4 rounded-lg bg-ghost-orange/5 border border-ghost-orange/20 hover:border-ghost-orange/40 transition-all duration-300',
} as const;

/**
 * List and bullet point styles
 */
export const listStyles = {
  /** Unordered list container */
  ul: 'space-y-3 text-ghost-white/80',
  
  /** List item with custom bullet */
  liWithBullet: 'flex items-start',
  
  /** Custom bullet point */
  bullet: 'text-ghost-orange mr-3 mt-1',
  
  /** Ordered list container */
  ol: 'space-y-3 text-ghost-white/80 list-decimal list-inside',
} as const;

/**
 * Helper function to create a page header section
 * @param title - Component name
 * @param description - Brief component description
 * @returns Object with className strings for header elements
 */
export function createPageHeader(title: string, description: string) {
  return {
    container: spacingStyles.headerContent,
    title: typographyStyles.h1,
    description: typographyStyles.lead,
    titleText: title,
    descriptionText: description,
  };
}

/**
 * Helper function to create a section header
 * @param level - Header level (2 or 3)
 * @returns className string for the header
 */
export function createSectionHeader(level: 2 | 3 = 2): string {
  return level === 2 ? typographyStyles.h2 : typographyStyles.h3;
}

/**
 * Helper function to create a feature list item
 * @returns Object with className strings for list item elements
 */
export function createFeatureListItem() {
  return {
    container: listStyles.liWithBullet,
    bullet: listStyles.bullet,
    content: 'text-ghost-white/80',
    title: 'text-ghost-orange',
  };
}

/**
 * Helper function to create a code example container
 * @param filename - Optional filename to display
 * @returns Object with className strings for code container elements
 */
export function createCodeExample(filename?: string) {
  return {
    container: 'rounded-lg bg-ghost-black border border-ghost-orange/30 overflow-hidden shadow-lg hover:border-ghost-orange/50 transition-all duration-300',
    header: filename ? 'bg-ghost-orange/10 px-4 py-2 border-b border-ghost-orange/30' : undefined,
    headerText: filename ? 'text-ghost-orange text-sm font-mono font-semibold' : undefined,
    pre: 'p-4 overflow-x-auto',
    code: 'text-sm text-ghost-white/90 font-mono',
  };
}

/**
 * Helper function to create an info box
 * @param type - Type of info box ('info' | 'warning' | 'feature')
 * @returns className string for the info box
 */
export function createInfoBox(type: 'info' | 'warning' | 'feature' = 'info'): string {
  switch (type) {
    case 'warning':
      return containerStyles.warningBox;
    case 'feature':
      return containerStyles.featureBox;
    case 'info':
    default:
      return containerStyles.infoBox;
  }
}

/**
 * Helper function to create a props table data structure
 * @param props - Array of prop definitions
 * @returns Formatted props array for PropsTable component
 */
export function createPropsData(props: Array<{
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}>) {
  return props.map(prop => ({
    name: prop.name,
    type: prop.type,
    required: prop.required ?? false,
    default: prop.default,
    description: prop.description,
  }));
}

/**
 * Complete style guide object for easy import
 * Use this when you need access to all style categories
 */
export const docStyles = {
  page: pageStyles,
  typography: typographyStyles,
  spacing: spacingStyles,
  containers: containerStyles,
  lists: listStyles,
} as const;

/**
 * Type exports for TypeScript consumers
 */
export type PageStyleKey = keyof typeof pageStyles;
export type TypographyStyleKey = keyof typeof typographyStyles;
export type SpacingStyleKey = keyof typeof spacingStyles;
export type ContainerStyleKey = keyof typeof containerStyles;
export type ListStyleKey = keyof typeof listStyles;
