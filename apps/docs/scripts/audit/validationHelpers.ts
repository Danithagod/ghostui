/**
 * Validation Helpers
 *
 * This file provides helper functions for creating validation issues
 * and working with validation rules.
 *
 * Requirements: 8.2, 8.3
 */

import {
  ValidationIssue,
  ValidationCategory,
  ValidationSeverity,
  ValidationRule,
  ValidationContext,
  ParsedPage,
} from './types';

/**
 * Options for creating a validation issue
 */
export interface CreateIssueOptions {
  /** ID of the rule that generated this issue */
  ruleId: string;
  /** Category of the issue */
  category: ValidationCategory;
  /** Severity level (defaults to 'error') */
  severity?: ValidationSeverity;
  /** Human-readable message describing the issue */
  message: string;
  /** Path to the file with the issue */
  filePath: string;
  /** Line number where the issue occurs */
  lineNumber?: number;
  /** Current value that caused the issue */
  currentValue?: string;
  /** Expected value according to the style guide */
  expectedValue: string;
  /** Recommendation for fixing the issue */
  recommendation: string;
  /** Whether this issue can be automatically fixed (defaults to false) */
  autoFixable?: boolean;
}

/**
 * Create a validation issue with all required fields
 *
 * This helper ensures all validation issues have consistent structure
 * and provides sensible defaults for optional fields.
 *
 * @param options - Issue creation options
 * @returns A complete ValidationIssue object
 */
export function createIssue(options: CreateIssueOptions): ValidationIssue {
  return {
    ruleId: options.ruleId,
    category: options.category,
    severity: options.severity ?? 'error',
    message: options.message,
    filePath: options.filePath,
    lineNumber: options.lineNumber,
    currentValue: options.currentValue,
    expectedValue: options.expectedValue,
    recommendation: options.recommendation,
    autoFixable: options.autoFixable ?? false,
  };
}

/**
 * Create a typography-related validation issue
 *
 * @param ruleId - Rule identifier
 * @param filePath - File path
 * @param elementType - Type of element (e.g., 'H1', 'H2')
 * @param lineNumber - Line number
 * @param currentClasses - Current class string
 * @param expectedClasses - Expected class string
 * @param autoFixable - Whether the issue can be auto-fixed
 * @returns A ValidationIssue for typography
 */
export function createTypographyIssue(
  ruleId: string,
  filePath: string,
  elementType: string,
  lineNumber: number,
  currentClasses: string,
  expectedClasses: string,
  autoFixable = true
): ValidationIssue {
  return createIssue({
    ruleId,
    category: 'typography',
    severity: 'error',
    message: `${elementType} element does not have the required typography classes`,
    filePath,
    lineNumber,
    currentValue: currentClasses || '(no classes)',
    expectedValue: expectedClasses,
    recommendation: `Update the ${elementType} element to use the required classes: ${expectedClasses}`,
    autoFixable,
  });
}

/**
 * Create a spacing-related validation issue
 *
 * @param ruleId - Rule identifier
 * @param filePath - File path
 * @param elementType - Type of element
 * @param lineNumber - Line number
 * @param currentClasses - Current class string
 * @param expectedClasses - Expected class string
 * @param autoFixable - Whether the issue can be auto-fixed
 * @returns A ValidationIssue for spacing
 */
export function createSpacingIssue(
  ruleId: string,
  filePath: string,
  elementType: string,
  lineNumber: number,
  currentClasses: string,
  expectedClasses: string,
  autoFixable = true
): ValidationIssue {
  return createIssue({
    ruleId,
    category: 'spacing',
    severity: 'error',
    message: `${elementType} does not have the required spacing classes`,
    filePath,
    lineNumber,
    currentValue: currentClasses || '(no classes)',
    expectedValue: expectedClasses,
    recommendation: `Add the required spacing classes to the ${elementType}: ${expectedClasses}`,
    autoFixable,
  });
}

/**
 * Create a structure-related validation issue
 *
 * @param ruleId - Rule identifier
 * @param filePath - File path
 * @param message - Issue message
 * @param recommendation - Fix recommendation
 * @param lineNumber - Line number (optional)
 * @param autoFixable - Whether the issue can be auto-fixed
 * @returns A ValidationIssue for structure
 */
export function createStructureIssue(
  ruleId: string,
  filePath: string,
  message: string,
  recommendation: string,
  lineNumber?: number,
  autoFixable = false
): ValidationIssue {
  return createIssue({
    ruleId,
    category: 'structure',
    severity: 'error',
    message,
    filePath,
    lineNumber,
    expectedValue: 'See style guide for required structure',
    recommendation,
    autoFixable,
  });
}

/**
 * Create an API documentation-related validation issue
 *
 * @param ruleId - Rule identifier
 * @param filePath - File path
 * @param message - Issue message
 * @param recommendation - Fix recommendation
 * @param lineNumber - Line number (optional)
 * @param autoFixable - Whether the issue can be auto-fixed
 * @returns A ValidationIssue for API documentation
 */
export function createApiIssue(
  ruleId: string,
  filePath: string,
  message: string,
  recommendation: string,
  lineNumber?: number,
  autoFixable = false
): ValidationIssue {
  return createIssue({
    ruleId,
    category: 'api',
    severity: 'error',
    message,
    filePath,
    lineNumber,
    expectedValue: 'Complete API documentation with all required fields',
    recommendation,
    autoFixable,
  });
}

/**
 * Create a preview container-related validation issue
 *
 * @param ruleId - Rule identifier
 * @param filePath - File path
 * @param message - Issue message
 * @param lineNumber - Line number
 * @param currentClasses - Current class string
 * @param expectedClasses - Expected class string
 * @param recommendation - Fix recommendation
 * @param autoFixable - Whether the issue can be auto-fixed
 * @returns A ValidationIssue for preview containers
 */
export function createPreviewIssue(
  ruleId: string,
  filePath: string,
  message: string,
  lineNumber: number,
  currentClasses: string,
  expectedClasses: string,
  recommendation: string,
  autoFixable = true
): ValidationIssue {
  return createIssue({
    ruleId,
    category: 'preview',
    severity: 'error',
    message,
    filePath,
    lineNumber,
    currentValue: currentClasses || '(no classes)',
    expectedValue: expectedClasses,
    recommendation,
    autoFixable,
  });
}

/**
 * Create a warning-level validation issue
 *
 * Warnings indicate potential issues that should be reviewed but don't
 * necessarily violate the style guide.
 *
 * @param ruleId - Rule identifier
 * @param category - Issue category
 * @param filePath - File path
 * @param message - Issue message
 * @param recommendation - Fix recommendation
 * @param lineNumber - Line number (optional)
 * @returns A ValidationIssue with warning severity
 */
export function createWarning(
  ruleId: string,
  category: ValidationCategory,
  filePath: string,
  message: string,
  recommendation: string,
  lineNumber?: number
): ValidationIssue {
  return createIssue({
    ruleId,
    category,
    severity: 'warning',
    message,
    filePath,
    lineNumber,
    expectedValue: 'See recommendation',
    recommendation,
    autoFixable: false,
  });
}

/**
 * Create an info-level validation issue
 *
 * Info issues are suggestions for improvement that don't indicate
 * style guide violations.
 *
 * @param ruleId - Rule identifier
 * @param category - Issue category
 * @param filePath - File path
 * @param message - Issue message
 * @param recommendation - Fix recommendation
 * @param lineNumber - Line number (optional)
 * @returns A ValidationIssue with info severity
 */
export function createInfo(
  ruleId: string,
  category: ValidationCategory,
  filePath: string,
  message: string,
  recommendation: string,
  lineNumber?: number
): ValidationIssue {
  return createIssue({
    ruleId,
    category,
    severity: 'info',
    message,
    filePath,
    lineNumber,
    expectedValue: 'See recommendation',
    recommendation,
    autoFixable: false,
  });
}

/**
 * Base class for validation rules
 *
 * This abstract class provides a foundation for implementing validation rules.
 * Extend this class to create specific validation rules.
 */
export abstract class BaseValidationRule implements ValidationRule {
  constructor(
    public readonly id: string,
    public readonly category: ValidationCategory,
    public readonly description: string,
    public readonly autoFixable: boolean = false
  ) {}

  /**
   * Validate a parsed page and return any issues found
   *
   * @param page - The parsed page to validate
   * @param context - Validation context with additional information
   * @returns Array of validation issues (empty if no issues found)
   */
  abstract validate(page: ParsedPage, context: ValidationContext): ValidationIssue[];

  /**
   * Helper method to get the file path from context
   */
  protected getFilePath(context: ValidationContext): string {
    return context.filePath;
  }

  /**
   * Helper method to create an issue for this rule
   */
  protected createIssue(
    context: ValidationContext,
    message: string,
    expectedValue: string,
    recommendation: string,
    lineNumber?: number,
    currentValue?: string
  ): ValidationIssue {
    return createIssue({
      ruleId: this.id,
      category: this.category,
      message,
      filePath: context.filePath,
      lineNumber,
      currentValue,
      expectedValue,
      recommendation,
      autoFixable: this.autoFixable,
    });
  }
}

/**
 * Combine multiple validation rules into a single rule set
 *
 * @param rules - Array of validation rules
 * @returns Array of validation rules (for convenience)
 */
export function createRuleSet(rules: ValidationRule[]): ValidationRule[] {
  return rules;
}

/**
 * Filter rules by category
 *
 * @param rules - Array of validation rules
 * @param category - Category to filter by
 * @returns Filtered array of rules
 */
export function filterRulesByCategory(
  rules: ValidationRule[],
  category: ValidationCategory
): ValidationRule[] {
  return rules.filter((rule) => rule.category === category);
}

/**
 * Filter rules by auto-fixable status
 *
 * @param rules - Array of validation rules
 * @param autoFixable - Whether to include only auto-fixable rules
 * @returns Filtered array of rules
 */
export function filterRulesByAutoFixable(
  rules: ValidationRule[],
  autoFixable: boolean
): ValidationRule[] {
  return rules.filter((rule) => rule.autoFixable === autoFixable);
}
