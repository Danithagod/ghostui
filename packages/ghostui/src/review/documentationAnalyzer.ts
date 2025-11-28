/**
 * Documentation analyzer for checking JSDoc comments and documentation completeness
 */

import * as fs from 'fs';
import * as path from 'path';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class DocumentationAnalyzer {
  private issueCollector: IssueCollector;
  private rootPath: string;

  constructor(issueCollector: IssueCollector, rootPath: string = process.cwd()) {
    this.issueCollector = issueCollector;
    this.rootPath = rootPath;
  }

  /**
   * Check JSDoc presence on exported components and functions
   * Property 28: JSDoc presence
   */
  checkJSDocPresence(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check for JSDoc on the main component export
        const hasComponentJSDoc = this.hasJSDocForExport(content, component.name);
        
        if (!hasComponentJSDoc) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'Documentation',
              requirement: '9.1',
              title: `Missing JSDoc for ${component.name}`,
              description: `Component ${component.name} does not have a JSDoc comment describing its purpose and usage.`,
              location: component.path,
              recommendation: `Add a JSDoc comment above the component definition explaining what the component does, its main props, and usage examples.`,
              effort: 'low'
            })
          );
        }

        // Check for JSDoc on other exported functions
        const exportedFunctions = this.extractExportedFunctions(content);
        for (const funcName of exportedFunctions) {
          if (funcName !== component.name) {
            const hasFuncJSDoc = this.hasJSDocForExport(content, funcName);
            if (!hasFuncJSDoc) {
              issues.push(
                this.issueCollector.createIssue({
                  severity: 'low',
                  category: 'Documentation',
                  requirement: '9.1',
                  title: `Missing JSDoc for exported function ${funcName}`,
                  description: `Exported function ${funcName} in ${component.name} does not have a JSDoc comment.`,
                  location: component.path,
                  recommendation: `Add a JSDoc comment above the function definition explaining its purpose, parameters, and return value.`,
                  effort: 'low'
                })
              );
            }
          }
        }
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if an export has JSDoc comment
   */
  private hasJSDocForExport(content: string, exportName: string): boolean {
    // Look for JSDoc comment followed by export
    const jsDocPattern = new RegExp(
      `/\\*\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/\\s*export\\s+(?:default\\s+)?(?:const|function|class|interface|type)?\\s+${exportName}\\b`,
      's'
    );
    return jsDocPattern.test(content);
  }

  /**
   * Extract exported function names from content
   */
  private extractExportedFunctions(content: string): string[] {
    const functions: string[] = [];
    
    // Match exported functions and constants
    const exportPattern = /export\s+(?:default\s+)?(?:const|function)\s+(\w+)/g;
    let match;
    
    while ((match = exportPattern.exec(content)) !== null) {
      functions.push(match[1]);
    }

    return functions;
  }

  /**
   * Verify complex prop documentation
   * Property 29: Complex prop documentation
   */
  verifyComplexPropDocumentation(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const complexProps = this.extractComplexProps(content, component.name);

        for (const prop of complexProps) {
          const hasDocumentation = this.hasPropDocumentation(content, prop.name, component.name);
          
          if (!hasDocumentation) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'Documentation',
                requirement: '9.2',
                title: `Complex prop '${prop.name}' lacks documentation in ${component.name}`,
                description: `The prop '${prop.name}' has a complex type (${prop.type}) but does not have a JSDoc comment explaining its usage.`,
                location: component.path,
                recommendation: `Add a JSDoc comment above the prop definition in the interface explaining what values are accepted and how the prop affects the component behavior.`,
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Extract complex props (objects, arrays, unions with >2 options)
   */
  private extractComplexProps(content: string, componentName: string): Array<{ name: string; type: string }> {
    const complexProps: Array<{ name: string; type: string }> = [];
    
    // Find the Props interface
    const interfacePattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${componentName}Props\\s*(?:extends[^{]*)?\\{([^}]+)\\}`,
      'is'
    );
    const match = content.match(interfacePattern);
    
    if (match && match[1]) {
      const propsBody = match[1];
      
      // Match props with their types
      const propPattern = /(\w+)\??\s*:\s*([^;,\n]+)/g;
      let propMatch;
      
      while ((propMatch = propPattern.exec(propsBody)) !== null) {
        const propName = propMatch[1];
        const propType = propMatch[2].trim();
        
        // Check if type is complex
        if (this.isComplexType(propType)) {
          complexProps.push({ name: propName, type: propType });
        }
      }
    }

    return complexProps;
  }

  /**
   * Check if a type is complex (object, array, union with >2 options)
   */
  private isComplexType(type: string): boolean {
    // Object types
    if (type.includes('{') || type.includes('Record<') || type.includes('Map<')) {
      return true;
    }
    
    // Array types
    if (type.includes('[]') || type.includes('Array<')) {
      return true;
    }
    
    // Union types with more than 2 options
    const unionParts = type.split('|').map(p => p.trim());
    if (unionParts.length > 2) {
      return true;
    }
    
    return false;
  }

  /**
   * Check if a prop has documentation in the interface
   */
  private hasPropDocumentation(content: string, propName: string, componentName: string): boolean {
    // Find the Props interface
    const interfacePattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${componentName}Props\\s*(?:extends[^{]*)?\\{([^}]+)\\}`,
      'is'
    );
    const match = content.match(interfacePattern);
    
    if (match && match[1]) {
      const propsBody = match[1];
      
      // Look for JSDoc comment before the prop
      const propDocPattern = new RegExp(
        `/\\*\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/\\s*${propName}\\s*\\??\\s*:`,
        's'
      );
      
      return propDocPattern.test(propsBody);
    }
    
    return false;
  }

  /**
   * Check documentation file existence
   * Property 30: Documentation file existence
   */
  checkDocumentationFileExistence(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    // Determine docs path
    const docsPath = this.rootPath.endsWith('packages/ghostui') || this.rootPath.endsWith('packages\\ghostui')
      ? path.join(this.rootPath, '../../apps/docs/app/docs/components')
      : path.join(this.rootPath, 'apps/docs/app/docs/components');

    if (!fs.existsSync(docsPath)) {
      // If docs directory doesn't exist, report it once
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Documentation',
          requirement: '9.3',
          title: 'Documentation directory not found',
          description: `The documentation directory at ${docsPath} does not exist.`,
          location: docsPath,
          recommendation: `Create the documentation directory structure for component documentation.`,
          effort: 'medium'
        })
      );
      return issues;
    }

    for (const component of components) {
      try {
        // Convert component name to kebab-case for directory name
        const kebabName = this.toKebabCase(component.name);
        const docPath = path.join(docsPath, kebabName, 'page.tsx');
        
        if (!fs.existsSync(docPath)) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'Documentation',
              requirement: '9.3',
              title: `Missing documentation page for ${component.name}`,
              description: `Component ${component.name} does not have a corresponding documentation page at ${docPath}.`,
              location: component.path,
              recommendation: `Create a documentation page at apps/docs/app/docs/components/${kebabName}/page.tsx with usage examples, props table, and interactive demos.`,
              effort: 'medium'
            })
          );
        }
      } catch (error) {
        console.error(`Error checking documentation for ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Convert PascalCase to kebab-case
   */
  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
  }

  /**
   * Verify export documentation in index file
   * Property 31: Export documentation
   */
  verifyExportDocumentation(indexPath: string): Issue[] {
    const issues: Issue[] = [];

    try {
      const content = fs.readFileSync(indexPath, 'utf-8');
      const exports = this.extractDirectExports(content);

      for (const exportItem of exports) {
        const hasDocumentation = this.hasExportDocumentation(content, exportItem);
        
        if (!hasDocumentation) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'Documentation',
              requirement: '9.5',
              title: `Undocumented export '${exportItem}' in index`,
              description: `The export '${exportItem}' in the main index file does not have a JSDoc comment.`,
              location: indexPath,
              recommendation: `Add a JSDoc comment above the export statement explaining what '${exportItem}' is and when to use it.`,
              effort: 'low'
            })
          );
        }
      }
    } catch (error) {
      console.error(`Error analyzing index file:`, error);
    }

    return issues;
  }

  /**
   * Extract direct exports from index file (not re-exports)
   */
  private extractDirectExports(content: string): string[] {
    const exports: string[] = [];
    
    // Match direct exports (not export * from)
    const directExportPattern = /export\s+(?:default\s+)?(?:const|function|class|interface|type)\s+(\w+)/g;
    let match;
    
    while ((match = directExportPattern.exec(content)) !== null) {
      exports.push(match[1]);
    }

    // Match named exports that are not re-exports
    const namedExportPattern = /export\s+\{\s*([^}]+)\s*\}(?!\s+from)/g;
    while ((match = namedExportPattern.exec(content)) !== null) {
      const names = match[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0]);
      exports.push(...names);
    }

    return exports;
  }

  /**
   * Check if an export has documentation
   */
  private hasExportDocumentation(content: string, exportName: string): boolean {
    // Look for JSDoc comment before export
    const jsDocPattern = new RegExp(
      `/\\*\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/\\s*export\\s+(?:default\\s+)?(?:const|function|class|interface|type)?\\s+${exportName}\\b`,
      's'
    );
    
    // Also check for JSDoc before named export
    const namedExportPattern = new RegExp(
      `/\\*\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/\\s*export\\s+\\{[^}]*\\b${exportName}\\b[^}]*\\}`,
      's'
    );
    
    return jsDocPattern.test(content) || namedExportPattern.test(content);
  }
}
