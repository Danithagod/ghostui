/**
 * Preview Container Validation Rules
 *
 * This file contains validation rules for preview container consistency across
 * component documentation pages.
 *
 * Requirements: 9.2, 9.3, 9.5, 10.4
 */

import {
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
} from './types';
import { BaseValidationRule, createPreviewIssue } from './validationHelpers';
import { hasRequiredClasses } from './styleGuideConfig';

/**
 * PreviewContainerBorderRule
 *
 * Validates that preview containers have the required border styling.
 * Requirement 9.2: Preview container border styling
 */
export class PreviewContainerBorderRule extends BaseValidationRule {
  constructor() {
    super(
      'preview-container-border',
      'preview',
      'Preview containers must have border-ghost-orange/30 class',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredBorder = context.styleGuide.colors.borderColor;

    // Check all preview containers
    for (const container of page.previewContainers) {
      // Check if the container has the required border class
      if (!hasRequiredClasses(container.className, requiredBorder)) {
        issues.push(
          createPreviewIssue(
            this.id,
            context.filePath,
            'Preview container does not have the required border styling',
            container.lineNumber,
            container.className,
            requiredBorder,
            `Add the required border class to the preview container: ${requiredBorder}`,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * PreviewContainerRadiusRule
 *
 * Validates that preview containers have the required border radius.
 * Requirement 9.3: Preview container border radius
 */
export class PreviewContainerRadiusRule extends BaseValidationRule {
  constructor() {
    super(
      'preview-container-radius',
      'preview',
      'Preview containers must have rounded-lg class',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredRadius = 'rounded-lg';

    // Check all preview containers
    for (const container of page.previewContainers) {
      // Check if the container has the required border radius class
      if (!hasRequiredClasses(container.className, requiredRadius)) {
        issues.push(
          createPreviewIssue(
            this.id,
            context.filePath,
            'Preview container does not have the required border radius',
            container.lineNumber,
            container.className,
            requiredRadius,
            `Add the required border radius class to the preview container: ${requiredRadius}`,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * ThemeVariableUsageRule
 *
 * Validates that nested elements use CSS variables for colors.
 * Requirement 9.5: Theme variable usage
 */
export class ThemeVariableUsageRule extends BaseValidationRule {
  constructor() {
    super(
      'theme-variable-usage',
      'preview',
      'Nested elements should use CSS variables for colors (var(--ghost-*))',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check all preview containers for hardcoded colors
    for (const container of page.previewContainers) {
      // Look for hardcoded color classes in the className
      const hardcodedColorPatterns = [
        /bg-\[#[0-9a-fA-F]{3,8}\]/,  // Arbitrary hex colors like bg-[#05020a]
        /text-\[#[0-9a-fA-F]{3,8}\]/, // Arbitrary hex text colors
        /border-\[#[0-9a-fA-F]{3,8}\]/, // Arbitrary hex border colors
      ];

      let hasHardcodedColor = false;
      let hardcodedColorExample = '';

      for (const pattern of hardcodedColorPatterns) {
        const match = container.className.match(pattern);
        if (match) {
          hasHardcodedColor = true;
          hardcodedColorExample = match[0];
          break;
        }
      }

      if (hasHardcodedColor) {
        issues.push(
          createPreviewIssue(
            this.id,
            context.filePath,
            'Preview container uses hardcoded colors instead of CSS variables',
            container.lineNumber,
            container.className,
            'Use CSS variables like var(--ghost-*) for theme-aware colors',
            `Replace hardcoded color "${hardcodedColorExample}" with CSS variables for theme consistency`,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * CodeBlockScrollingRule
 *
 * Validates that code block containers have overflow handling.
 * Requirement 10.4: Code block scrolling
 */
export class CodeBlockScrollingRule extends BaseValidationRule {
  constructor() {
    super(
      'code-block-scrolling',
      'preview',
      'Code block containers must have overflow-x-auto class',
      true // auto-fixable
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const requiredOverflow = 'overflow-x-auto';

    // Check all code blocks
    for (const codeBlock of page.codeBlocks) {
      // Check if the code block has the required overflow class
      if (!hasRequiredClasses(codeBlock.className, requiredOverflow)) {
        issues.push(
          createPreviewIssue(
            this.id,
            context.filePath,
            'Code block container does not have overflow handling',
            codeBlock.lineNumber,
            codeBlock.className,
            requiredOverflow,
            `Add the required overflow class to the code block container: ${requiredOverflow}`,
            this.autoFixable
          )
        );
      }
    }

    return issues;
  }
}

/**
 * Export all preview container validation rules
 */
export const previewRules: ValidationRule[] = [
  new PreviewContainerBorderRule(),
  new PreviewContainerRadiusRule(),
  new ThemeVariableUsageRule(),
  new CodeBlockScrollingRule(),
];
