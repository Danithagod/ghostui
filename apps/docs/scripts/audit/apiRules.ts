/**
 * API Documentation Validation Rules
 *
 * This file contains validation rules for API documentation consistency
 * across component documentation pages.
 *
 * Requirements: 4.1, 4.2
 */

import {
  ValidationRule,
  ValidationIssue,
  ParsedPage,
  ValidationContext,
  PropDefinition,
} from './types';
import { BaseValidationRule, createApiIssue } from './validationHelpers';

/**
 * PropsTablePresenceRule
 *
 * Validates that the page contains at least one PropsTable component.
 * Requirement 4.1: PropsTable presence
 */
export class PropsTablePresenceRule extends BaseValidationRule {
  constructor() {
    super(
      'props-table-presence',
      'api',
      'Component pages must include at least one PropsTable component',
      false // not auto-fixable (requires content creation)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check if there are any PropsTable instances
    if (page.propsTables.length === 0) {
      issues.push(
        createApiIssue(
          this.id,
          context.filePath,
          'Page is missing a PropsTable component',
          'Add a PropsTable component to document the component\'s props. Include all available props with their name, type, default value, and description.',
          undefined,
          this.autoFixable
        )
      );
    }

    return issues;
  }
}

/**
 * PropObjectStructureRule
 *
 * Validates that each prop object has name, type, default, and description fields.
 * Requirement 4.2: Prop object structure
 */
export class PropObjectStructureRule extends BaseValidationRule {
  constructor() {
    super(
      'prop-object-structure',
      'api',
      'Each prop object must have name, type, default, and description fields',
      false // not auto-fixable (requires content)
    );
  }

  validate(page: ParsedPage, context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check each PropsTable instance
    for (const propsTable of page.propsTables) {
      // Check each prop definition in the props array
      for (let i = 0; i < propsTable.propsArray.length; i++) {
        const prop = propsTable.propsArray[i];
        const missingFields = this.getMissingFields(prop);

        if (missingFields.length > 0) {
          const propIdentifier = prop.name || `prop at index ${i}`;
          
          issues.push(
            createApiIssue(
              this.id,
              context.filePath,
              `Prop "${propIdentifier}" is missing required fields: ${missingFields.join(', ')}`,
              `Add the missing fields to the prop definition: ${missingFields.join(', ')}. Each prop should have a name, type, default value, and description to provide complete API documentation.`,
              propsTable.lineNumber,
              this.autoFixable
            )
          );
        }
      }
    }

    return issues;
  }

  /**
   * Checks which required fields are missing from a prop definition
   */
  private getMissingFields(prop: PropDefinition): string[] {
    const requiredFields: (keyof PropDefinition)[] = ['name', 'type', 'default', 'description'];
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      // Check if the field is missing or empty
      const value = prop[field];
      if (value === undefined || value === null || value === '') {
        missingFields.push(field);
      }
    }

    return missingFields;
  }
}

/**
 * Export all API documentation validation rules
 */
export const apiRules: ValidationRule[] = [
  new PropsTablePresenceRule(),
  new PropObjectStructureRule(),
];
