/**
 * Structure Validation Rules
 *
 * This file contains validation rules for structural consistency across
 * component documentation pages.
 *
 * Requirements: 3.1, 3.2, 6.1, 6.2, 6.3
 */

import {
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
} from './types';
import { BaseValidationRule, createStructureIssue } from './validationHelpers';

/**
 * MinimumExamplesRule
 *
 * Validates that the page contains at least the minimum number of
 * ComponentPlayground examples.
 * Requirement 3.1: Minimum example count
 */
export class MinimumExamplesRule extends BaseValidationRule {
  constructor() {
    super(
      'minimum-examples',
      'structure',
      'Component pages must have at least 3 ComponentPlayground examples',
      false // not auto-fixable (requires content creation)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const minimumExamples = context.styleGuide.structure.minimumExamples;
    const actualCount = page.componentPlaygrounds.length;

    if (actualCount < minimumExamples) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          `Page has ${actualCount} ComponentPlayground example${actualCount === 1 ? '' : 's'}, but ${minimumExamples} are required`,
          `Add ${minimumExamples - actualCount} more ComponentPlayground example${minimumExamples - actualCount === 1 ? '' : 's'} to demonstrate different use cases, variants, or configurations of the component`,
          page.componentPlaygrounds[0]?.lineNumber,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * BasicUsageStructureRule
 *
 * Validates that the first ComponentPlayground has preview, code, and api props.
 * Requirement 3.2: Basic usage ComponentPlayground structure
 */
export class BasicUsageStructureRule extends BaseValidationRule {
  constructor() {
    super(
      'basic-usage-structure',
      'structure',
      'First ComponentPlayground must have preview, code, and api props',
      false // not auto-fixable (requires content creation)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check if there are any ComponentPlayground instances
    if (page.componentPlaygrounds.length === 0) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          'No ComponentPlayground found on the page',
          'Add a ComponentPlayground with preview, code, and api props to demonstrate basic usage',
          undefined,
          this.autoFixable
        )
      );
      return issues;
    }

    // Get the first ComponentPlayground
    const firstPlayground = page.componentPlaygrounds[0];
    const missingProps: string[] = [];

    if (!firstPlayground.hasPreview) {
      missingProps.push('preview');
    }
    if (!firstPlayground.hasCode) {
      missingProps.push('code');
    }
    if (!firstPlayground.hasApi) {
      missingProps.push('api');
    }

    if (missingProps.length > 0) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          `First ComponentPlayground is missing required props: ${missingProps.join(', ')}`,
          `Add the missing props to the first ComponentPlayground: ${missingProps.join(', ')}. The basic usage example should include a preview of the component, the code to implement it, and API documentation.`,
          firstPlayground.lineNumber,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * PageStructureOrderRule
 *
 * Validates that sections appear in the correct order.
 * Requirement 6.1: Page structure order
 */
export class PageStructureOrderRule extends BaseValidationRule {
  constructor() {
    super(
      'page-structure-order',
      'structure',
      'Sections must appear in the correct order: Header, Basic Usage, Additional sections',
      false // not auto-fixable (requires manual restructuring)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const expectedOrder = context.styleGuide.structure.sectionOrder;

    // Extract the actual order of sections from the page
    const actualSections = page.sections.map((section) => section.type);

    // Find sections that are out of order
    let lastExpectedIndex = -1;

    for (const actualSection of actualSections) {
      // Find the index of this section in the expected order
      const expectedIndex = expectedOrder.indexOf(actualSection);

      // If the section is in the expected order list
      if (expectedIndex !== -1) {
        // Check if it appears after the previous section in the expected order
        if (expectedIndex < lastExpectedIndex) {
          // Section is out of order
          const sectionInfo = page.sections.find((s) => s.type === actualSection);
          issues.push(
            createStructureIssue(
              this.id,
              context.filePath,
              `Section "${actualSection}" appears out of order. Expected order: ${expectedOrder.join(' → ')}`,
              `Reorder sections to follow the standard structure: ${expectedOrder.join(' → ')}`,
              sectionInfo?.startLine,
              this.autoFixable
            )
          );
          break; // Only report the first out-of-order section
        }
        lastExpectedIndex = expectedIndex;
      }
    }

    return issues;
  }
}

/**
 * HeaderSectionStructureRule
 *
 * Validates that the page starts with H1 followed by a lead paragraph.
 * Requirement 6.2: Header section structure
 */
export class HeaderSectionStructureRule extends BaseValidationRule {
  constructor() {
    super(
      'header-section-structure',
      'structure',
      'Page must start with H1 followed by lead paragraph',
      false // not auto-fixable (requires content creation)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check if there's an H1 header
    const h1Header = page.headers.find((header) => header.level === 1);

    if (!h1Header) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          'Page is missing an H1 header',
          'Add an H1 header at the beginning of the page with the component name',
          1,
          this.autoFixable
        )
      );
      return issues;
    }

    // Check if there's a header section
    const headerSection = page.sections.find((section) => section.type === 'header');

    if (!headerSection) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          'Page is missing a header section',
          'Ensure the page starts with a header section containing the H1 and lead paragraph',
          h1Header.lineNumber,
          this.autoFixable
        )
      );
      return issues;
    }

    // Check if there's a lead paragraph after the H1
    const leadParagraph = headerSection.elements.find(
      (element) => element.type === 'p' && element.lineNumber > h1Header.lineNumber
    );

    if (!leadParagraph) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          'Page is missing a lead paragraph after the H1',
          'Add a lead paragraph immediately after the H1 header to introduce the component. The lead paragraph should have the "lead" and "text-ghost-white/90" classes.',
          h1Header.lineNumber + 1,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * FirstPlaygroundPositionRule
 *
 * Validates that the first ComponentPlayground appears before any H2 headers.
 * Requirement 6.3: First ComponentPlayground position
 */
export class FirstPlaygroundPositionRule extends BaseValidationRule {
  constructor() {
    super(
      'first-playground-position',
      'structure',
      'First ComponentPlayground must appear before any H2 headers',
      false // not auto-fixable (requires manual restructuring)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check if there are any ComponentPlayground instances
    if (page.componentPlaygrounds.length === 0) {
      // This is handled by other rules, so we don't need to report it here
      return issues;
    }

    // Get the first ComponentPlayground
    const firstPlayground = page.componentPlaygrounds[0];

    // Find the first H2 header
    const firstH2 = page.headers.find((header) => header.level === 2);

    // If there's an H2 and it appears before the first ComponentPlayground
    if (firstH2 && firstH2.lineNumber < firstPlayground.lineNumber) {
      issues.push(
        createStructureIssue(
          this.id,
          context.filePath,
          `First ComponentPlayground appears after H2 header "${firstH2.text}" (line ${firstH2.lineNumber})`,
          'Move the first ComponentPlayground to appear before any H2 section headers. The basic usage example should be shown immediately after the header section.',
          firstPlayground.lineNumber,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * Export all structure validation rules
 */
export const structureRules: ValidationRule[] = [
  new MinimumExamplesRule(),
  new BasicUsageStructureRule(),
  new PageStructureOrderRule(),
  new HeaderSectionStructureRule(),
  new FirstPlaygroundPositionRule(),
];
