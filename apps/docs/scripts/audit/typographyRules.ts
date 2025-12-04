/**
 * Typography Validation Rules
 *
 * This file contains validation rules for typography consistency across
 * component documentation pages.
 *
 * Requirements: 1.1, 1.2, 1.3, 1.5, 10.1
 */

import {
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
  Header,
  Element,
} from './types';
import { BaseValidationRule, createTypographyIssue } from './validationHelpers';
import { hasRequiredClasses } from './styleGuideConfig';

/**
 * H1TypographyRule
 *
 * Validates that H1 elements have the required typography classes.
 * Requirement 1.1: H1 component title styling
 */
export class H1TypographyRule extends BaseValidationRule {
  constructor() {
    super(
      'h1-typography',
      'typography',
      'H1 elements must use the required typography classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.typography.h1;

    // Find all H1 headers
    const h1Headers = page.headers.filter((header) => header.level === 1);

    for (const header of h1Headers) {
      // Check if the H1 has the required classes
      if (!hasRequiredClasses(header.className, requiredClasses)) {
        issues.push(
          createTypographyIssue(
            this.id,
            context.filePath,
            'H1',
            header.lineNumber,
            header.className,
            requiredClasses,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * H2TypographyRule
 *
 * Validates that H2 elements have the required typography classes.
 * Requirement 1.2: H2 section header styling
 */
export class H2TypographyRule extends BaseValidationRule {
  constructor() {
    super(
      'h2-typography',
      'typography',
      'H2 elements must use the required typography classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.typography.h2;

    // Find all H2 headers
    const h2Headers = page.headers.filter((header) => header.level === 2);

    for (const header of h2Headers) {
      // Check if the H2 has the required classes
      if (!hasRequiredClasses(header.className, requiredClasses)) {
        issues.push(
          createTypographyIssue(
            this.id,
            context.filePath,
            'H2',
            header.lineNumber,
            header.className,
            requiredClasses,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * H3TypographyRule
 *
 * Validates that H3 elements have the required typography classes.
 * Requirement 1.3: H3 subsection header styling
 */
export class H3TypographyRule extends BaseValidationRule {
  constructor() {
    super(
      'h3-typography',
      'typography',
      'H3 elements must use the required typography classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.typography.h3;

    // Find all H3 headers
    const h3Headers = page.headers.filter((header) => header.level === 3);

    for (const header of h3Headers) {
      // Check if the H3 has the required classes
      if (!hasRequiredClasses(header.className, requiredClasses)) {
        issues.push(
          createTypographyIssue(
            this.id,
            context.filePath,
            'H3',
            header.lineNumber,
            header.className,
            requiredClasses,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * LeadParagraphRule
 *
 * Validates that the first paragraph after H1 has the lead paragraph classes.
 * Requirement 1.5: Lead paragraph styling
 */
export class LeadParagraphRule extends BaseValidationRule {
  constructor() {
    super(
      'lead-paragraph',
      'typography',
      'First paragraph after H1 must have lead paragraph classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.typography.lead;

    // Find the first H1 header
    const h1Header = page.headers.find((header) => header.level === 1);

    if (!h1Header) {
      // No H1 found - this is a structural issue, not a typography issue
      return issues;
    }

    // Find the lead paragraph (first paragraph after H1)
    // We need to look through the sections to find the paragraph element
    const headerSection = page.sections.find((section) => section.type === 'header');

    if (!headerSection) {
      return issues;
    }

    // Find the first paragraph element in the header section
    const leadParagraph = headerSection.elements.find(
      (element) => element.type === 'p' && element.lineNumber > h1Header.lineNumber
    );

    if (!leadParagraph) {
      // No lead paragraph found - this is a structural issue
      issues.push(
        createTypographyIssue(
          this.id,
          context.filePath,
          'Lead paragraph',
          h1Header.lineNumber + 1,
          '(missing)',
          requiredClasses,
          false // Not auto-fixable as we need to create content
        )
      );
      return issues;
    }

    // Check if the lead paragraph has the required classes
    if (!hasRequiredClasses(leadParagraph.className, requiredClasses)) {
      issues.push(
        createTypographyIssue(
          this.id,
          context.filePath,
          'Lead paragraph',
          leadParagraph.lineNumber,
          leadParagraph.className,
          requiredClasses,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * InlineCodeRule
 *
 * Validates that inline code elements have the required styling classes.
 * Requirement 10.1: Inline code styling
 */
export class InlineCodeRule extends BaseValidationRule {
  constructor() {
    super(
      'inline-code',
      'typography',
      'Inline code elements must use the required styling classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.typography.inlineCode;

    // Check all inline code elements
    for (const inlineCode of page.inlineCode) {
      // Check if the inline code has the required classes
      if (!hasRequiredClasses(inlineCode.className, requiredClasses)) {
        issues.push(
          createTypographyIssue(
            this.id,
            context.filePath,
            'Inline code',
            inlineCode.lineNumber,
            inlineCode.className,
            requiredClasses,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * Export all typography validation rules
 */
export const typographyRules: ValidationRule[] = [
  new H1TypographyRule(),
  new H2TypographyRule(),
  new H3TypographyRule(),
  new LeadParagraphRule(),
  new InlineCodeRule(),
];
