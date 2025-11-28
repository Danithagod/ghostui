/**
 * Code style analyzer for checking file structure and naming conventions
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class CodeStyleAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Verify file structure consistency
   * Property 18: File structure consistency
   */
  verifyFileStructureConsistency(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const structureIssues = this.analyzeFileStructure(content, component);
        issues.push(...structureIssues);
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Analyze file structure for a component
   */
  private analyzeFileStructure(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');
    
    // Define expected structure order
    const sections = {
      imports: { found: false, line: -1 },
      types: { found: false, line: -1 },
      constants: { found: false, line: -1 },
      component: { found: false, line: -1 }
    };

    // Scan for sections
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines, comments, and directives
      if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || 
          line.startsWith("'use") || line.startsWith('"use')) {
        continue;
      }

      // Check for imports
      if (line.startsWith('import ') && !sections.imports.found) {
        sections.imports.found = true;
        sections.imports.line = i;
      }

      // Check for type/interface definitions
      if ((line.startsWith('export interface') || line.startsWith('export type') || 
           line.startsWith('interface') || line.startsWith('type')) && !sections.types.found) {
        sections.types.found = true;
        sections.types.line = i;
      }

      // Check for top-level constants (const declarations at file scope, not inside functions)
      // Only count as constant if it's not part of a component definition and not an arrow function
      if (line.startsWith('const ') && !line.includes('export const') && 
          !line.includes('export default') && !line.includes('=>') && 
          !sections.component.found && !sections.constants.found) {
        sections.constants.found = true;
        sections.constants.line = i;
      }

      // Check for component definition
      if ((line.startsWith('export const') || line.startsWith('export default') || 
           line.startsWith('export function')) && !sections.component.found) {
        sections.component.found = true;
        sections.component.line = i;
      }
    }

    // Verify order: imports -> types -> constants -> component
    const foundSections = Object.entries(sections)
      .filter(([_, data]) => data.found)
      .sort((a, b) => a[1].line - b[1].line);

    const expectedOrder = ['imports', 'types', 'constants', 'component'];
    const actualOrder = foundSections.map(([name]) => name);

    // Check if order matches expected
    let expectedIndex = 0;
    for (const section of actualOrder) {
      const sectionIndex = expectedOrder.indexOf(section);
      if (sectionIndex < expectedIndex) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'low',
            category: 'Code Style',
            requirement: '5.1',
            title: `Inconsistent file structure in ${component.name}`,
            description: `File structure does not follow the expected order. Expected: imports → types → constants → component. Found: ${actualOrder.join(' → ')}.`,
            location: component.path,
            recommendation: `Reorganize the file to follow the standard structure: imports at the top, followed by type definitions, then constants, and finally the component definition.`,
            effort: 'low'
          })
        );
        break;
      }
      expectedIndex = sectionIndex + 1;
    }

    // Check for imports scattered throughout the file
    const importLines = lines
      .map((line, index) => ({ line: line.trim(), index }))
      .filter(({ line }) => line.startsWith('import '));

    if (importLines.length > 0) {
      const firstImport = importLines[0].index;
      const lastImport = importLines[importLines.length - 1].index;
      
      // Check if there's non-import code between imports
      for (let i = firstImport + 1; i < lastImport; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('import ') && !line.startsWith('//') && 
            !line.startsWith('/*') && !line.startsWith('*') && line !== '*/' &&
            !line.startsWith("'use") && !line.startsWith('"use')) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'Code Style',
              requirement: '5.1',
              title: `Scattered imports in ${component.name}`,
              description: `Import statements are not grouped together at the top of the file. Found code between import statements.`,
              location: component.path,
              recommendation: `Group all import statements together at the top of the file.`,
              effort: 'low'
            })
          );
          break;
        }
      }
    }

    return issues;
  }

  /**
   * Check naming convention adherence
   * Property 19: Naming convention adherence
   */
  checkNamingConventionAdherence(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const namingIssues = this.analyzeNamingConventions(content, component);
        issues.push(...namingIssues);
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Analyze naming conventions in a file
   */
  private analyzeNamingConventions(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];

    // Check component names (should be PascalCase)
    const componentPattern = /(?:export\s+)?(?:const|function)\s+([A-Z][a-zA-Z0-9]*)\s*[=:]/g;
    let match;
    
    while ((match = componentPattern.exec(content)) !== null) {
      const name = match[1];
      if (!this.isPascalCase(name)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Code Style',
            requirement: '5.2',
            title: `Component '${name}' does not follow PascalCase convention`,
            description: `Component name '${name}' in ${component.name} should use PascalCase.`,
            location: component.path,
            codeSnippet: match[0],
            recommendation: `Rename '${name}' to follow PascalCase convention (e.g., ${this.toPascalCase(name)}).`,
            effort: 'low'
          })
        );
      }
    }

    // Check interface/type names (should be PascalCase)
    const typePattern = /(?:export\s+)?(?:interface|type)\s+([a-zA-Z][a-zA-Z0-9]*)/g;
    
    while ((match = typePattern.exec(content)) !== null) {
      const name = match[1];
      if (!this.isPascalCase(name)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Code Style',
            requirement: '5.2',
            title: `Type '${name}' does not follow PascalCase convention`,
            description: `Type/Interface name '${name}' in ${component.name} should use PascalCase.`,
            location: component.path,
            codeSnippet: match[0],
            recommendation: `Rename '${name}' to follow PascalCase convention.`,
            effort: 'low'
          })
        );
      }
    }

    // Check function names (should be camelCase)
    const functionPattern = /(?:const|function)\s+([a-z][a-zA-Z0-9]*)\s*[=:]/g;
    
    while ((match = functionPattern.exec(content)) !== null) {
      const name = match[1];
      if (!this.isCamelCase(name)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'low',
            category: 'Code Style',
            requirement: '5.2',
            title: `Function '${name}' does not follow camelCase convention`,
            description: `Function name '${name}' in ${component.name} should use camelCase.`,
            location: component.path,
            codeSnippet: match[0],
            recommendation: `Rename '${name}' to follow camelCase convention.`,
            effort: 'low'
          })
        );
      }
    }

    // Check constant names (should be UPPER_SNAKE_CASE or camelCase for non-primitive constants)
    const constantPattern = /const\s+([A-Z_][A-Z0-9_]*)\s*=/g;
    
    while ((match = constantPattern.exec(content)) !== null) {
      const name = match[1];
      if (!this.isUpperSnakeCase(name) && !this.isCamelCase(name)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'low',
            category: 'Code Style',
            requirement: '5.2',
            title: `Constant '${name}' does not follow naming convention`,
            description: `Constant name '${name}' in ${component.name} should use UPPER_SNAKE_CASE for primitive constants or camelCase for object constants.`,
            location: component.path,
            codeSnippet: match[0],
            recommendation: `Rename '${name}' to follow UPPER_SNAKE_CASE convention for primitive constants.`,
            effort: 'low'
          })
        );
      }
    }

    // Check variable names (should be camelCase)
    const variablePattern = /(?:let|var)\s+([a-z][a-zA-Z0-9]*)\s*=/g;
    
    while ((match = variablePattern.exec(content)) !== null) {
      const name = match[1];
      if (!this.isCamelCase(name)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'low',
            category: 'Code Style',
            requirement: '5.2',
            title: `Variable '${name}' does not follow camelCase convention`,
            description: `Variable name '${name}' in ${component.name} should use camelCase.`,
            location: component.path,
            codeSnippet: match[0],
            recommendation: `Rename '${name}' to follow camelCase convention.`,
            effort: 'low'
          })
        );
      }
    }

    return issues;
  }

  /**
   * Check if a name follows PascalCase convention
   */
  private isPascalCase(name: string): boolean {
    return /^[A-Z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * Check if a name follows camelCase convention
   */
  private isCamelCase(name: string): boolean {
    return /^[a-z][a-zA-Z0-9]*$/.test(name);
  }

  /**
   * Check if a name follows UPPER_SNAKE_CASE convention
   */
  private isUpperSnakeCase(name: string): boolean {
    return /^[A-Z][A-Z0-9_]*$/.test(name);
  }

  /**
   * Convert a name to PascalCase
   */
  private toPascalCase(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
