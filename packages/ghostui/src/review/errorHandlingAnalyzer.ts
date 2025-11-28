/**
 * Error handling analyzer for evaluating component error handling and edge cases
 * Validates Requirements 7.1, 7.2, 7.4, 7.5
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class ErrorHandlingAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Check prop validation
   * Property 22: Prop validation presence
   * Validates Requirement 7.1
   */
  checkPropValidation(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Identify numeric props
        const numericProps = this.findNumericProps(content);
        
        if (numericProps.length > 0) {
          // Check if validation/clamping logic exists
          const hasValidation = this.hasValidationLogic(content, numericProps);
          
          if (!hasValidation) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'Error Handling',
                requirement: '7.1',
                title: `Missing prop validation in ${component.name}`,
                description: `Component ${component.name} has numeric props (${numericProps.join(', ')}) that may have valid ranges but lacks validation or clamping logic.`,
                location: component.path,
                recommendation: 'Add validation logic to clamp numeric props to valid ranges. For example, use Math.max/Math.min to clamp values, or validate and log warnings for out-of-range values. Example: const clampedValue = Math.max(min, Math.min(max, value));',
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error checking prop validation in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Find numeric props in component
   */
  private findNumericProps(content: string): string[] {
    const numericProps: string[] = [];
    
    // Look for interface/type definitions with number types
    const interfacePattern = /interface\s+\w+Props[^{]*\{([^}]+)\}/gs;
    const typePattern = /type\s+\w+Props\s*=[^{]*\{([^}]+)\}/gs;
    
    const patterns = [interfacePattern, typePattern];
    
    for (const pattern of patterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        const propsBody = match[1];
        
        // Find number type props
        const propMatches = propsBody.matchAll(/(\w+)\s*\??\s*:\s*number/g);
        for (const propMatch of propMatches) {
          const propName = propMatch[1];
          if (!numericProps.includes(propName)) {
            numericProps.push(propName);
          }
        }
      }
    }
    
    return numericProps;
  }

  /**
   * Check if validation logic exists for numeric props
   */
  private hasValidationLogic(content: string, numericProps: string[]): boolean {
    // Check for common validation patterns
    const validationPatterns = [
      /Math\.max\(/,
      /Math\.min\(/,
      /Math\.clamp\(/,
      /clamp\(/,
      /\bif\s*\([^)]*[<>]=?/,  // if statements with comparisons
      /\?\s*[^:]+:\s*[^;]+/,   // ternary operators
    ];
    
    // Check if any numeric prop is used in validation context
    for (const prop of numericProps) {
      const propUsagePattern = new RegExp(`\\b${prop}\\b`, 'g');
      const propMatches = content.match(propUsagePattern);
      
      if (propMatches && propMatches.length > 1) {
        // Prop is used multiple times, check if validation patterns exist nearby
        for (const pattern of validationPatterns) {
          if (pattern.test(content)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  /**
   * Verify null/undefined handling
   * Property 23: Null/undefined handling
   * Validates Requirement 7.2
   */
  verifyNullUndefinedHandling(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Find unsafe property access patterns
        const unsafeAccess = this.findUnsafePropertyAccess(content, component);
        issues.push(...unsafeAccess);
        
      } catch (error) {
        console.error(`Error checking null/undefined handling in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Find unsafe property access patterns
   */
  private findUnsafePropertyAccess(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Remove comments and strings to avoid false positives
    const cleanContent = this.removeCommentsAndStrings(content);
    
    // Check for property access without optional chaining or null checks
    const unsafePatterns = [
      // Direct property access on potentially undefined values
      { pattern: /\bprops\.(\w+)\.(\w+)/g, type: 'props property access' },
      // Array indexing without checks
      { pattern: /\w+\[[\w\d]+\]\.(\w+)/g, type: 'array element property access' },
    ];
    
    let hasUnsafeAccess = false;
    const foundPatterns: string[] = [];
    
    for (const { pattern, type } of unsafePatterns) {
      const matches = cleanContent.match(pattern);
      if (matches && matches.length > 0) {
        // Check if optional chaining or null checks are used
        const hasOptionalChaining = /\?\./.test(cleanContent);
        const hasNullChecks = this.hasNullChecks(cleanContent);
        
        if (!hasOptionalChaining && !hasNullChecks) {
          hasUnsafeAccess = true;
          foundPatterns.push(type);
        }
      }
    }
    
    if (hasUnsafeAccess) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Error Handling',
          requirement: '7.2',
          title: `Unsafe property access in ${component.name}`,
          description: `Component ${component.name} contains potentially unsafe property access patterns (${foundPatterns.join(', ')}) without null/undefined checks or optional chaining.`,
          location: component.path,
          recommendation: 'Use optional chaining (?.) for property access on potentially null/undefined values, or add explicit null checks before accessing properties. Example: const value = obj?.property ?? defaultValue; or if (obj && obj.property) { ... }',
          effort: 'low'
        })
      );
    }
    
    return issues;
  }

  /**
   * Remove comments and strings from content to avoid false positives
   */
  private removeCommentsAndStrings(content: string): string {
    // Remove single-line comments
    let cleaned = content.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove string literals
    cleaned = cleaned.replace(/"[^"]*"/g, '""');
    cleaned = cleaned.replace(/'[^']*'/g, "''");
    cleaned = cleaned.replace(/`[^`]*`/g, '``');
    return cleaned;
  }

  /**
   * Check if content has null checks
   */
  private hasNullChecks(content: string): boolean {
    const nullCheckPatterns = [
      /\bif\s*\([^)]*!==?\s*null/,
      /\bif\s*\([^)]*!==?\s*undefined/,
      /\bif\s*\([^)]*&&/,
      /\?\?/,  // Nullish coalescing
    ];
    
    return nullCheckPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check invalid state guards
   * Property 24: Invalid state guards
   * Validates Requirement 7.4
   */
  checkInvalidStateGuards(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Identify components with complex state
        const hasComplexState = this.hasComplexState(content);
        
        if (hasComplexState) {
          // Check for state validation logic
          const hasStateGuards = this.hasStateValidation(content);
          
          if (!hasStateGuards) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'Error Handling',
                requirement: '7.4',
                title: `Missing state guards in ${component.name}`,
                description: `Component ${component.name} has complex state management but lacks guards to prevent or handle invalid states.`,
                location: component.path,
                recommendation: 'Add validation logic to ensure state remains valid. Use guards in state setters to prevent invalid transitions, validate state before rendering, and handle edge cases. Example: setState(prev => isValidState(newState) ? newState : prev);',
                effort: 'medium'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error checking state guards in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if component has complex state
   */
  private hasComplexState(content: string): boolean {
    // Look for useState with objects or arrays
    const complexStatePatterns = [
      /useState<[^>]*\{/,  // useState with object type
      /useState<[^>]*\[/,  // useState with array type
      /useState\(\{/,      // useState initialized with object
      /useState\(\[/,      // useState initialized with array
      /useReducer/,        // useReducer indicates complex state
    ];
    
    return complexStatePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check if state validation exists
   */
  private hasStateValidation(content: string): boolean {
    const validationPatterns = [
      /setState\([^)]*=>\s*\{/,  // setState with function that could validate
      /\bif\s*\([^)]*isValid/,   // Validation checks
      /\bif\s*\([^)]*validate/,
      /\bguard/i,
      /\bvalidate/i,
    ];
    
    return validationPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Verify async error handling
   * Property 25: Async error handling
   * Validates Requirement 7.5
   */
  verifyAsyncErrorHandling(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Find async functions and promises
        const asyncFunctions = this.findAsyncFunctions(content);
        
        if (asyncFunctions.length > 0) {
          // Check for error handling
          const missingErrorHandling = this.checkAsyncErrorHandling(content, asyncFunctions, component);
          issues.push(...missingErrorHandling);
        }
      } catch (error) {
        console.error(`Error checking async error handling in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Find async functions in content
   */
  private findAsyncFunctions(content: string): string[] {
    const asyncFunctions: string[] = [];
    
    // Find async function declarations
    const asyncPatterns = [
      /async\s+function\s+(\w+)/g,
      /const\s+(\w+)\s*=\s*async\s*\(/g,
      /(\w+)\s*=\s*async\s*\(/g,
      /async\s+\([\w\s,]*\)\s*=>/g,
    ];
    
    for (const pattern of asyncPatterns) {
      const matches = content.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) {
          asyncFunctions.push(match[1]);
        } else {
          asyncFunctions.push('anonymous async function');
        }
      }
    }
    
    // Also check for Promise usage
    if (/new Promise\(/.test(content) || /\.then\(/.test(content)) {
      asyncFunctions.push('Promise usage');
    }
    
    return asyncFunctions;
  }

  /**
   * Check if async functions have error handling
   */
  private checkAsyncErrorHandling(content: string, asyncFunctions: string[], component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Check for try-catch blocks
    const hasTryCatch = /try\s*\{[\s\S]*?\}\s*catch/.test(content);
    
    // Check for .catch() on promises
    const hasCatchMethod = /\.catch\(/.test(content);
    
    // Check for error handling in async/await
    const hasErrorHandling = hasTryCatch || hasCatchMethod;
    
    if (!hasErrorHandling) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Error Handling',
          requirement: '7.5',
          title: `Missing async error handling in ${component.name}`,
          description: `Component ${component.name} contains async operations (${asyncFunctions.slice(0, 3).join(', ')}) but lacks error handling via try-catch or .catch().`,
          location: component.path,
          recommendation: 'Add error handling to all async operations. For async/await, wrap in try-catch blocks. For promises, add .catch() handlers. Consider using error boundaries for component-level error handling. Example: try { await asyncOperation(); } catch (error) { handleError(error); }',
          effort: 'medium'
        })
      );
    }
    
    return issues;
  }

  /**
   * Run all error handling analyses
   */
  analyzeAll(components: ComponentFile[]): {
    propValidation: Issue[];
    nullUndefinedHandling: Issue[];
    stateGuards: Issue[];
    asyncErrorHandling: Issue[];
    allIssues: Issue[];
  } {
    const propValidation = this.checkPropValidation(components);
    const nullUndefinedHandling = this.verifyNullUndefinedHandling(components);
    const stateGuards = this.checkInvalidStateGuards(components);
    const asyncErrorHandling = this.verifyAsyncErrorHandling(components);

    const allIssues = [
      ...propValidation,
      ...nullUndefinedHandling,
      ...stateGuards,
      ...asyncErrorHandling
    ];

    return {
      propValidation,
      nullUndefinedHandling,
      stateGuards,
      asyncErrorHandling,
      allIssues
    };
  }
}
