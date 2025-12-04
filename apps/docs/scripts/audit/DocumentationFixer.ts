/**
 * Documentation Fixer for Documentation Audit Tool
 *
 * Applies automated fixes to component documentation pages to bring them
 * into compliance with the style guide.
 *
 * Requirements: 8.5
 */

import { parse } from '@babel/parser';
import * as generate from '@babel/generator';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import {
  ComponentPage,
  ValidationIssue,
  FixResult,
} from './types';
import { TSXParser } from './TSXParser';

/**
 * DocumentationFixer class for applying automated fixes to documentation pages
 */
export class DocumentationFixer {
  private readonly parser: TSXParser;
  private fixHistory: Map<string, { issue: ValidationIssue; success: boolean; error?: string }[]>;

  constructor() {
    this.parser = new TSXParser();
    this.fixHistory = new Map();
  }

  /**
   * Gets the fix history for a specific file
   * @param filePath - Path to the file
   * @returns Array of fix attempts with their results
   */
  getFixHistory(filePath: string): { issue: ValidationIssue; success: boolean; error?: string }[] {
    return this.fixHistory.get(filePath) || [];
  }

  /**
   * Clears the fix history
   */
  clearFixHistory(): void {
    this.fixHistory.clear();
  }

  /**
   * Applies fixes to a component page for all auto-fixable issues
   * @param page - Component page to fix
   * @param issues - Array of validation issues to fix
   * @returns Result of the fix operation
   */
  async fix(page: ComponentPage, issues: ValidationIssue[]): Promise<FixResult> {
    // Filter to only auto-fixable issues
    const autoFixableIssues = issues.filter((issue) => issue.autoFixable);
    const unfixableIssues = issues.filter((issue) => !issue.autoFixable);

    if (autoFixableIssues.length === 0) {
      return {
        filePath: page.filePath,
        fixedIssues: [],
        unfixedIssues: unfixableIssues,
        modifiedContent: page.content,
        success: true,
      };
    }

    let modifiedContent = page.content;
    const fixedIssues: ValidationIssue[] = [];
    const failedIssues: ValidationIssue[] = [];
    const history: { issue: ValidationIssue; success: boolean; error?: string }[] = [];

    // Apply fixes one by one with validation and rollback
    for (const issue of autoFixableIssues) {
      try {
        // Store the content before applying the fix (for potential rollback)
        const contentBeforeFix = modifiedContent;
        
        // Apply the fix
        const fixedContent = this.applyFix(modifiedContent, issue);
        
        // Validate the fix
        if (this.validateFix(contentBeforeFix, fixedContent)) {
          // Fix is valid, keep it
          modifiedContent = fixedContent;
          fixedIssues.push(issue);
          history.push({ issue, success: true });
        } else {
          // Fix broke the syntax, rollback by not applying it
          console.warn(
            `Fix validation failed for issue "${issue.ruleId}" at line ${issue.lineNumber}. Rolling back.`
          );
          failedIssues.push(issue);
          history.push({ issue, success: false, error: 'Validation failed' });
          // modifiedContent remains unchanged (automatic rollback)
        }
      } catch (error) {
        // Exception during fix application, rollback by not applying it
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(
          `Failed to apply fix for issue "${issue.ruleId}" at line ${issue.lineNumber}:`,
          errorMessage
        );
        failedIssues.push(issue);
        history.push({ issue, success: false, error: errorMessage });
        // modifiedContent remains unchanged (automatic rollback)
      }
    }

    // Store the fix history for this file
    this.fixHistory.set(page.filePath, history);

    return {
      filePath: page.filePath,
      fixedIssues,
      unfixedIssues: [...unfixableIssues, ...failedIssues],
      modifiedContent,
      success: failedIssues.length === 0,
    };
  }

  /**
   * Applies a single fix to the content
   * @param content - Original content
   * @param issue - Validation issue to fix
   * @returns Modified content with the fix applied
   */
  applyFix(content: string, issue: ValidationIssue): string {
    // Parse the content into an AST
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    let modified = false;

    // Determine fix strategy based on rule ID
    if (issue.ruleId.includes('typography') || issue.ruleId.includes('spacing') || issue.ruleId.includes('preview')) {
      // Handle class name fixes (simple and complex)
      modified = this.fixClassName(ast, issue);
    } else if (issue.ruleId.includes('structure')) {
      // Handle structural fixes (adding wrappers, reordering)
      modified = this.fixStructure(ast, issue);
    }

    // Generate code from the modified AST
    if (modified) {
      const output = generate.default(ast, {
        retainLines: false, // Don't retain lines for better formatting
        retainFunctionParens: true,
        comments: true, // Preserve comments
      });
      
      // Preserve original formatting as much as possible
      return this.preserveFormatting(content, output.code);
    }

    return content;
  }

  /**
   * Fixes className attributes on JSX elements
   * @param ast - The AST to modify
   * @param issue - The validation issue describing what to fix
   * @returns True if a modification was made
   */
  private fixClassName(ast: t.File, issue: ValidationIssue): boolean {
    let modified = false;
    const targetLine = issue.lineNumber;

    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const elementLine = openingElement.loc?.start.line;

        // Check if this is the element we need to fix
        // Handle both exact line matches and multi-line elements
        if (this.isTargetElement(openingElement, targetLine, issue)) {
          const classNameAttr = openingElement.attributes.find(
            (attr) =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === 'className'
          );

          if (classNameAttr && t.isJSXAttribute(classNameAttr)) {
            // Handle different className value types
            if (issue.currentValue) {
              // Replace specific classes while preserving others
              modified = this.replaceClassName(classNameAttr, issue);
            } else {
              // Replace entire className value
              classNameAttr.value = t.stringLiteral(issue.expectedValue);
              modified = true;
            }
          } else {
            // Add className attribute if it doesn't exist
            const newAttr = t.jsxAttribute(
              t.jsxIdentifier('className'),
              t.stringLiteral(issue.expectedValue)
            );
            openingElement.attributes.push(newAttr);
            modified = true;
          }
        }
      },
    });

    return modified;
  }

  /**
   * Checks if an element is the target element for a fix
   * @param openingElement - The JSX opening element
   * @param targetLine - The target line number
   * @param issue - The validation issue
   * @returns True if this is the target element
   */
  private isTargetElement(
    openingElement: t.JSXOpeningElement,
    targetLine: number | undefined,
    issue: ValidationIssue
  ): boolean {
    if (!targetLine) {
      return false;
    }

    const elementLine = openingElement.loc?.start.line;
    const elementEndLine = openingElement.loc?.end.line;

    // Check if the target line is within the element's range (for multi-line elements)
    if (elementLine && elementEndLine) {
      return targetLine >= elementLine && targetLine <= elementEndLine;
    }

    return elementLine === targetLine;
  }

  /**
   * Replaces specific classes in a className attribute
   * @param classNameAttr - The className attribute to modify
   * @param issue - The validation issue with current and expected values
   * @returns True if a modification was made
   */
  private replaceClassName(classNameAttr: t.JSXAttribute, issue: ValidationIssue): boolean {
    const value = classNameAttr.value;

    if (t.isStringLiteral(value)) {
      // Simple string literal
      const currentClasses = value.value;
      const newClasses = this.mergeClassNames(currentClasses, issue.currentValue || '', issue.expectedValue);
      
      if (newClasses !== currentClasses) {
        classNameAttr.value = t.stringLiteral(newClasses);
        return true;
      }
    } else if (t.isJSXExpressionContainer(value) && t.isStringLiteral(value.expression)) {
      // Expression container with string literal
      const currentClasses = value.expression.value;
      const newClasses = this.mergeClassNames(currentClasses, issue.currentValue || '', issue.expectedValue);
      
      if (newClasses !== currentClasses) {
        value.expression = t.stringLiteral(newClasses);
        return true;
      }
    }

    return false;
  }

  /**
   * Merges class names by replacing old classes with new ones
   * @param currentClasses - Current className string
   * @param oldClasses - Classes to remove
   * @param newClasses - Classes to add
   * @returns Merged className string
   */
  private mergeClassNames(currentClasses: string, oldClasses: string, newClasses: string): string {
    const current = currentClasses.split(/\s+/).filter(Boolean);
    const old = oldClasses.split(/\s+/).filter(Boolean);
    const newClassList = newClasses.split(/\s+/).filter(Boolean);

    // Remove old classes
    const filtered = current.filter((cls) => !old.includes(cls));

    // Add new classes (avoiding duplicates)
    const merged = [...filtered];
    for (const cls of newClassList) {
      if (!merged.includes(cls)) {
        merged.push(cls);
      }
    }

    return merged.join(' ');
  }

  /**
   * Fixes structural issues (adding wrappers, reordering elements)
   * @param ast - The AST to modify
   * @param issue - The validation issue describing what to fix
   * @returns True if a modification was made
   */
  private fixStructure(ast: t.File, issue: ValidationIssue): boolean {
    // Structural fixes are typically not auto-fixable in the current implementation
    // This method is a placeholder for future enhancements
    console.warn(`Structural fix for "${issue.ruleId}" is not yet implemented`);
    return false;
  }

  /**
   * Preserves original formatting and indentation as much as possible
   * @param originalContent - Original content
   * @param generatedContent - Generated content from AST
   * @returns Content with preserved formatting
   */
  private preserveFormatting(originalContent: string, generatedContent: string): string {
    // Extract indentation style from original content
    const indentMatch = originalContent.match(/^(\s+)/m);
    const originalIndent = indentMatch ? indentMatch[1] : '  ';

    // Detect if original uses tabs or spaces
    const useTabs = originalIndent.includes('\t');
    const indentSize = useTabs ? 1 : (originalIndent.length || 2);

    // Apply consistent indentation to generated content
    const lines = generatedContent.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map((line) => {
      const trimmed = line.trim();
      
      // Adjust indent level based on brackets
      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = useTabs 
        ? '\t'.repeat(indentLevel)
        : ' '.repeat(indentLevel * indentSize);
      
      const formattedLine = trimmed ? indent + trimmed : '';

      // Adjust indent level for next line
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
        indentLevel++;
      }

      return formattedLine;
    });

    return formattedLines.join('\n');
  }

  /**
   * Validates that a fix doesn't break the syntax
   * @param originalContent - Original content before fix
   * @param fixedContent - Content after fix
   * @returns True if the fix is valid
   */
  validateFix(originalContent: string, fixedContent: string): boolean {
    // Check if content actually changed
    if (originalContent === fixedContent) {
      console.warn('Fix did not modify the content');
      return false;
    }

    try {
      // Try to parse the fixed content to ensure it's still valid TSX
      const parsedFixed = parse(fixedContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });

      // Additional validation: ensure the AST is valid
      if (!parsedFixed || !parsedFixed.program) {
        console.error('Fix validation failed: Invalid AST structure');
        return false;
      }

      // Parse succeeded, the fix is valid
      return true;
    } catch (error) {
      // If parsing fails, the fix broke the syntax
      console.error('Fix validation failed - syntax error:', error instanceof Error ? error.message : String(error));
      return false;
    }
  }
}
