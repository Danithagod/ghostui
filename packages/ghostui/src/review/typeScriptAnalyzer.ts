/**
 * TypeScript analyzer for component interface and type checking
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class TypeScriptAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Scan all components for interface definitions
   * Property 1: Component interface completeness
   */
  scanForInterfaceDefinitions(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const hasPropsInterface = this.hasPropsInterface(content, component.name);

        if (!hasPropsInterface) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'high',
              category: 'TypeScript',
              requirement: '1.1',
              title: `Missing Props interface for ${component.name}`,
              description: `Component ${component.name} does not have an explicit TypeScript Props interface definition.`,
              location: component.path,
              recommendation: `Define an interface named ${component.name}Props that describes all props accepted by the component.`,
              effort: 'low'
            })
          );
        }
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if a component has a Props interface
   */
  private hasPropsInterface(content: string, componentName: string): boolean {
    // Look for interface or type definition with Props suffix
    const interfacePattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${componentName}Props\\s*(?:extends|=|\\{)`,
      'i'
    );
    return interfacePattern.test(content);
  }

  /**
   * Analyze optional prop handling
   * Property 2: Optional prop safety
   */
  analyzeOptionalPropHandling(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const optionalProps = this.extractOptionalProps(content, component.name);

        for (const prop of optionalProps) {
          const hasDefaultValue = this.hasDefaultValue(content, prop);
          const hasUndefinedCheck = this.hasUndefinedCheck(content);

          if (!hasDefaultValue && !hasUndefinedCheck) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'TypeScript',
                requirement: '1.2',
                title: `Optional prop '${prop}' lacks safety handling in ${component.name}`,
                description: `The optional prop '${prop}' in ${component.name} does not have a default value or undefined check before use.`,
                location: component.path,
                recommendation: `Either provide a default value in destructuring (e.g., ${prop} = defaultValue) or check for undefined before using the prop.`,
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
   * Extract optional props from interface definition
   */
  private extractOptionalProps(content: string, componentName: string): string[] {
    const optionalProps: string[] = [];
    
    // Find the Props interface
    const interfacePattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${componentName}Props\\s*(?:extends[^{]*)?\\{([^}]+)\\}`,
      'is'
    );
    const match = content.match(interfacePattern);
    
    if (match && match[1]) {
      const propsBody = match[1];
      // Match optional props (prop?: type)
      const optionalPropPattern = /(\w+)\?\s*:/g;
      let propMatch;
      
      while ((propMatch = optionalPropPattern.exec(propsBody)) !== null) {
        optionalProps.push(propMatch[1]);
      }
    }

    return optionalProps;
  }

  /**
   * Check if a prop has a default value in destructuring
   */
  private hasDefaultValue(content: string, propName: string): boolean {
    // Look for destructuring with default value: { propName = defaultValue }
    const defaultPattern = new RegExp(`\\{[^}]*${propName}\\s*=\\s*[^,}]+[,}]`, 's');
    return defaultPattern.test(content);
  }

  /**
   * Check if a prop is checked for undefined before use
   */
  private hasUndefinedCheck(content: string): boolean {
    // Look for common undefined check patterns
    const checkPatterns = [
      /if\s*\([^)]*!==?\s*undefined\)/,
      /if\s*\([^)]*undefined\s*!==?\)/,
      /\?\./,  // Optional chaining
      /\?\?/,  // Nullish coalescing
    ];
    
    return checkPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Verify type exports in index file
   * Property 3: Type export completeness
   */
  verifyTypeExports(components: ComponentFile[], indexPath: string): Issue[] {
    const issues: Issue[] = [];

    try {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');

      for (const component of components) {
        const content = fs.readFileSync(component.path, 'utf-8');
        const publicInterfaces = this.extractPublicInterfaces(content);

        for (const interfaceName of publicInterfaces) {
          const isExported = this.isTypeExported(indexContent, interfaceName, component.name);

          if (!isExported) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'TypeScript',
                requirement: '1.3',
                title: `Type '${interfaceName}' not exported from index`,
                description: `The public interface '${interfaceName}' from ${component.name} is not re-exported from the main index file.`,
                location: indexPath,
                recommendation: `Add 'export type { ${interfaceName} } from './components/${component.name}';' to the index file or ensure it's included in a wildcard export.`,
                effort: 'low'
              })
            );
          }
        }
      }
    } catch (error) {
      console.error(`Error verifying type exports:`, error);
    }

    return issues;
  }

  /**
   * Extract public interfaces from component file
   */
  private extractPublicInterfaces(content: string): string[] {
    const interfaces: string[] = [];
    
    // Match exported interfaces and types
    const exportPattern = /export\s+(?:interface|type)\s+(\w+)/g;
    let match;
    
    while ((match = exportPattern.exec(content)) !== null) {
      interfaces.push(match[1]);
    }

    return interfaces;
  }

  /**
   * Check if a type is exported from index
   */
  private isTypeExported(indexContent: string, typeName: string, componentName: string): boolean {
    // Check for explicit export
    const explicitExport = new RegExp(`export\\s+(?:type\\s+)?\\{[^}]*${typeName}[^}]*\\}`);
    if (explicitExport.test(indexContent)) {
      return true;
    }

    // Check for wildcard export from component
    const wildcardExport = new RegExp(`export\\s+\\*\\s+from\\s+['"].*${componentName}['"]`);
    if (wildcardExport.test(indexContent)) {
      return true;
    }

    // Check for wildcard export from components directory
    const componentsWildcard = /export\s+\*\s+from\s+['"]\.\/(components|types)['"]/;
    if (componentsWildcard.test(indexContent)) {
      return true;
    }

    return false;
  }

  /**
   * Check type naming consistency
   * Property 4: Type naming consistency
   */
  checkTypeNamingConsistency(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    const booleanProps: Map<string, { component: string; prefix: string }[]> = new Map();

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const boolProps = this.extractBooleanProps(content, component.name);

        for (const prop of boolProps) {
          const prefix = this.getBooleanPrefix(prop);
          if (!booleanProps.has(prop)) {
            booleanProps.set(prop, []);
          }
          booleanProps.get(prop)!.push({ component: component.name, prefix });
        }
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    // Check for inconsistent boolean prop naming
    const prefixUsage: Map<string, Set<string>> = new Map();
    
    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const boolProps = this.extractBooleanProps(content, component.name);

        for (const prop of boolProps) {
          const prefix = this.getBooleanPrefix(prop);
          if (prefix) {
            if (!prefixUsage.has(prefix)) {
              prefixUsage.set(prefix, new Set());
            }
            prefixUsage.get(prefix)!.add(component.name);
          } else {
            // Boolean prop without standard prefix
            issues.push(
              this.issueCollector.createIssue({
                severity: 'low',
                category: 'TypeScript',
                requirement: '1.4',
                title: `Boolean prop '${prop}' lacks standard prefix in ${component.name}`,
                description: `The boolean prop '${prop}' does not follow the standard naming convention with is/has/should prefix.`,
                location: component.path,
                recommendation: `Consider renaming to use a standard boolean prefix (is${this.capitalize(prop)}, has${this.capitalize(prop)}, or should${this.capitalize(prop)}).`,
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
   * Extract boolean props from interface
   */
  private extractBooleanProps(content: string, componentName: string): string[] {
    const booleanProps: string[] = [];
    
    const interfacePattern = new RegExp(
      `(?:export\\s+)?(?:interface|type)\\s+${componentName}Props\\s*(?:extends[^{]*)?\\{([^}]+)\\}`,
      'is'
    );
    const match = content.match(interfacePattern);
    
    if (match && match[1]) {
      const propsBody = match[1];
      // Match props with boolean type
      const boolPattern = /(\w+)\??\s*:\s*boolean/g;
      let propMatch;
      
      while ((propMatch = boolPattern.exec(propsBody)) !== null) {
        booleanProps.push(propMatch[1]);
      }
    }

    return booleanProps;
  }

  /**
   * Get the prefix of a boolean prop name
   */
  private getBooleanPrefix(propName: string): string {
    const prefixes = ['is', 'has', 'should', 'can', 'will'];
    for (const prefix of prefixes) {
      if (propName.toLowerCase().startsWith(prefix)) {
        return prefix;
      }
    }
    return '';
  }

  /**
   * Capitalize first letter
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Verify HTML element type extensions
   * Property 5: HTML element type extension
   */
  verifyHTMLElementTypeExtensions(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const rendersHTMLElement = this.rendersHTMLElement(content);
        const extendsHTMLAttributes = this.extendsHTMLAttributes(content, component.name);

        if (rendersHTMLElement && !extendsHTMLAttributes) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'TypeScript',
              requirement: '1.5',
              title: `${component.name} should extend React HTML attributes`,
              description: `Component ${component.name} renders a native HTML element but its Props interface does not extend the appropriate React HTML attributes type.`,
              location: component.path,
              recommendation: `Extend React.HTMLAttributes<HTMLElement> or the specific element type (e.g., React.ButtonHTMLAttributes<HTMLButtonElement>) in the Props interface.`,
              effort: 'low'
            })
          );
        }
      } catch (error) {
        console.error(`Error analyzing ${component.path}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if component renders a native HTML element
   */
  private rendersHTMLElement(content: string): boolean {
    // Look for common HTML elements in JSX
    const htmlElements = [
      'button', 'div', 'span', 'input', 'textarea', 'select', 
      'a', 'form', 'label', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ];
    
    for (const element of htmlElements) {
      const pattern = new RegExp(`<${element}[\\s>]`, 'i');
      if (pattern.test(content)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if Props interface extends React HTML attributes
   */
  private extendsHTMLAttributes(content: string, componentName: string): boolean {
    const interfacePattern = new RegExp(
      `(?:export\\s+)?interface\\s+${componentName}Props\\s+extends\\s+([^{]+)\\{`,
      'is'
    );
    const match = content.match(interfacePattern);
    
    if (match && match[1]) {
      const extendsClause = match[1];
      // Check for React HTML attribute types
      return /React\.\w*HTML\w*Attributes/.test(extendsClause) || 
             /HTML\w*Attributes/.test(extendsClause);
    }
    
    return false;
  }
}
