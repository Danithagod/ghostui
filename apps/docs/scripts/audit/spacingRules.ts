/**
 * Spacing Validation Rules
 *
 * This file contains validation rules for spacing consistency across
 * component documentation pages.
 *
 * Requirements: 2.1, 2.2, 2.3, 2.5
 */

import {
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
  Section,
} from './types';
import { BaseValidationRule, createSpacingIssue } from './validationHelpers';
import { hasRequiredClasses, hasAnyAcceptableClass } from './styleGuideConfig';

/**
 * PageContainerSpacingRule
 *
 * Validates that the root container div has the required spacing class.
 * Requirement 2.1: Page container spacing
 */
export class PageContainerSpacingRule extends BaseValidationRule {
  constructor() {
    super(
      'page-container-spacing',
      'spacing',
      'Root container must have space-y-12 class for consistent page spacing',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.spacing.pageContainer;

    // Check if root container exists
    if (!page.rootContainer) {
      // No root container found - this is a structural issue
      issues.push(
        createSpacingIssue(
          this.id,
          context.filePath,
          'Root container',
          1, // Default to line 1 if no container found
          '(missing)',
          requiredClasses,
          false // Not auto-fixable as we need to create structure
        )
      );
      return issues;
    }

    // Check if the root container has the required spacing class
    if (!hasRequiredClasses(page.rootContainer.className, requiredClasses)) {
      issues.push(
        createSpacingIssue(
          this.id,
          context.filePath,
          'Root container',
          page.rootContainer.lineNumber,
          page.rootContainer.className,
          requiredClasses,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * SectionContainerSpacingRule
 *
 * Validates that section elements have the required spacing classes.
 * Requirement 2.2: Section container spacing
 */
export class SectionContainerSpacingRule extends BaseValidationRule {
  constructor() {
    super(
      'section-container-spacing',
      'spacing',
      'Section containers must have space-y-6 mt-12 classes',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.spacing.sectionContainer;

    // Find all section elements in the parsed page
    // We need to look for <section> tags or divs that act as section containers
    // For now, we'll check sections identified by the parser
    for (const section of page.sections) {
      // Skip the header section as it typically doesn't need section spacing
      if (section.type === 'header') {
        continue;
      }

      // Check if we can find the actual section element
      // This is a simplified check - in a real implementation, we'd need to
      // traverse the AST to find the actual section/div elements
      // For now, we'll report issues based on section boundaries
      
      // Note: This is a placeholder implementation
      // In a complete implementation, we would need to:
      // 1. Extract actual section/div elements from the AST
      // 2. Check their className attributes
      // 3. Validate against the required classes
      
      // Since we don't have direct access to section elements in the current
      // ParsedPage structure, we'll need to enhance the parser first
    }

    return issues;
  }
}

/**
 * HeaderContentSpacingRule
 *
 * Validates that header-content wrapper divs have the required spacing class.
 * Requirement 2.3: Header-content group spacing
 */
export class HeaderContentSpacingRule extends BaseValidationRule {
  constructor() {
    super(
      'header-content-spacing',
      'spacing',
      'Header-content wrapper divs must have space-y-4 class',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredClasses = context.styleGuide.spacing.headerContent;

    // Find divs that wrap headers and their immediate content
    // This requires analyzing the AST structure to identify wrapper divs
    // that contain a header followed by content
    
    // Note: This is a placeholder implementation
    // In a complete implementation, we would need to:
    // 1. Traverse the AST to find div elements
    // 2. Check if they contain a header element followed by content
    // 3. Validate the className against required classes
    
    // Since this requires more complex AST traversal, we'll need to
    // enhance the parser to extract these wrapper elements

    return issues;
  }
}

/**
 * PreviewContainerPaddingRule
 *
 * Validates that preview containers have acceptable padding classes.
 * Requirement 2.5: Preview container padding
 */
export class PreviewContainerPaddingRule extends BaseValidationRule {
  constructor() {
    super(
      'preview-container-padding',
      'spacing',
      'Preview containers must have py-12 or p-8 padding class',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const acceptablePadding = context.styleGuide.spacing.previewContainer;

    // Check all preview containers
    for (const container of page.previewContainers) {
      // Check if the container has any of the acceptable padding classes
      if (!hasAnyAcceptableClass(container.className, acceptablePadding)) {
        issues.push(
          createSpacingIssue(
            this.id,
            context.filePath,
            'Preview container',
            container.lineNumber,
            container.className,
            acceptablePadding.join(' or '),
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * Export all spacing validation rules
 */
export const spacingRules: ValidationRule[] = [
  new PageContainerSpacingRule(),
  new SectionContainerSpacingRule(),
  new HeaderContentSpacingRule(),
  new PreviewContainerPaddingRule(),
];
