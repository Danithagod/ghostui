/**
 * Style Guide Configuration
 *
 * This file defines the default style guide configuration based on
 * COMPONENT_DOCUMENTATION_STYLE_GUIDE.md
 *
 * Requirements: 1.1, 1.2, 1.3, 1.5, 2.1, 2.2, 2.3, 2.5
 */

import { StyleGuideConfig } from './types';

/**
 * Default style guide configuration loaded from the documentation standards
 *
 * This configuration defines all the required classes and structure rules
 * that component documentation pages must follow.
 */
export const DEFAULT_STYLE_GUIDE_CONFIG: StyleGuideConfig = {
  typography: {
    // H1 - Component Title
    // Requirement 1.1: H1 component title styling
    h1: 'text-3xl md:text-4xl lg:text-5xl font-display text-ghost-orange tracking-wide',

    // H2 - Major Sections
    // Requirement 1.2: H2 section header styling
    h2: 'text-2xl md:text-3xl font-display text-ghost-orange tracking-wide',

    // H3 - Subsections
    // Requirement 1.3: H3 subsection header styling
    h3: 'text-xl md:text-2xl font-semibold text-ghost-white',

    // H4 - Minor Subsections
    h4: 'text-lg font-semibold text-ghost-white',

    // Lead Paragraph
    // Requirement 1.5: Lead paragraph styling
    lead: 'lead text-ghost-white/90',

    // Regular Body Text
    body: 'text-ghost-white/80 leading-relaxed',

    // Inline Code
    // Requirement 10.1: Inline code styling
    inlineCode: 'px-1.5 py-0.5 rounded bg-ghost-dark/50 text-ghost-green font-mono text-xs',
  },

  spacing: {
    // Page Container - spacing between major sections
    // Requirement 2.1: Page container spacing
    pageContainer: 'space-y-12',

    // Section Container - internal spacing and top margin
    // Requirement 2.2: Section container spacing
    sectionContainer: 'space-y-6 mt-12',

    // Header-Content Groups - spacing between headers and immediate content
    // Requirement 2.3: Header-content group spacing
    headerContent: 'space-y-4',

    // Lists - spacing between list items
    list: 'space-y-3',

    // Preview Container - acceptable padding options
    // Requirement 2.5: Preview container padding
    previewContainer: ['py-12', 'p-8', 'p-6'],
  },

  colors: {
    // Accent color used for headings and highlights
    accentColor: 'text-ghost-orange',

    // Primary text color
    textPrimary: 'text-ghost-white',

    // Secondary text color
    textSecondary: 'text-ghost-white/80',

    // Border color for preview containers
    // Requirement 9.2: Preview container border styling
    borderColor: 'border-ghost-orange/30',

    // Background color for preview containers
    backgroundColor: 'bg-[#05020a]',
  },

  structure: {
    // Required sections that must be present in documentation
    requiredSections: [
      'header',      // H1 + lead paragraph
      'basic-usage', // First ComponentPlayground
      'api',         // PropsTable (if component has props)
    ],

    // Expected order of sections
    sectionOrder: [
      'header',
      'basic-usage',
      'api',
      'examples',
      'variants',
      'advanced',
      'accessibility',
    ],

    // Minimum number of ComponentPlayground examples required
    // Requirement 3.1: Minimum example count
    minimumExamples: 3,
  },
};

/**
 * Get the style guide configuration
 *
 * This function returns the default configuration. In the future, this could
 * be extended to load custom configurations from a file or environment.
 *
 * @returns The style guide configuration
 */
export function getStyleGuideConfig(): StyleGuideConfig {
  return DEFAULT_STYLE_GUIDE_CONFIG;
}

/**
 * Validate that a class string contains all required classes
 *
 * @param actualClasses - The actual class string from the element
 * @param requiredClasses - The required class string from the style guide
 * @returns True if all required classes are present
 */
export function hasRequiredClasses(
  actualClasses: string,
  requiredClasses: string
): boolean {
  const actual = actualClasses.split(/\s+/).filter(Boolean);
  const required = requiredClasses.split(/\s+/).filter(Boolean);

  return required.every((cls) => actual.includes(cls));
}

/**
 * Get missing classes from an element
 *
 * @param actualClasses - The actual class string from the element
 * @param requiredClasses - The required class string from the style guide
 * @returns Array of missing class names
 */
export function getMissingClasses(
  actualClasses: string,
  requiredClasses: string
): string[] {
  const actual = actualClasses.split(/\s+/).filter(Boolean);
  const required = requiredClasses.split(/\s+/).filter(Boolean);

  return required.filter((cls) => !actual.includes(cls));
}

/**
 * Check if a class string contains any of the acceptable options
 *
 * @param actualClasses - The actual class string from the element
 * @param acceptableOptions - Array of acceptable class strings
 * @returns True if any of the acceptable options are present
 */
export function hasAnyAcceptableClass(
  actualClasses: string,
  acceptableOptions: string[]
): boolean {
  return acceptableOptions.some((option) =>
    hasRequiredClasses(actualClasses, option)
  );
}
