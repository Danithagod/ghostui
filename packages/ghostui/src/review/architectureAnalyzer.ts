/**
 * Architecture analyzer for evaluating component structure and complexity
 * Validates Requirements 8.1, 8.4
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class ArchitectureAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Check component complexity
   * Property 26: Component complexity limits
   * Validates Requirement 8.1
   */
  checkComponentComplexity(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Count total lines of code (excluding empty lines and comments)
        const totalLines = this.countLinesOfCode(content);
        
        // Find the main component function and measure its length
        const componentFunctionLength = this.measureComponentFunctionLength(content, component.name);
        
        // Check against complexity limits
        if (totalLines > 300) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'Architecture',
              requirement: '8.1',
              title: `Excessive file complexity in ${component.name}`,
              description: `Component file ${component.name} contains ${totalLines} lines of code, exceeding the recommended limit of 300 lines. This may indicate the component should be decomposed into smaller, more focused components.`,
              location: component.path,
              recommendation: 'Consider breaking this component into smaller, more focused components. Extract complex logic into custom hooks, move utility functions to separate files, and split large components into smaller sub-components. This improves maintainability and testability.',
              effort: 'high'
            })
          );
        }
        
        if (componentFunctionLength > 150) {
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'Architecture',
              requirement: '8.1',
              title: `Excessive component function length in ${component.name}`,
              description: `The main component function in ${component.name} contains ${componentFunctionLength} lines, exceeding the recommended limit of 150 lines. This suggests the component has too many responsibilities.`,
              location: component.path,
              recommendation: 'Refactor the component function to reduce its length. Extract complex rendering logic into sub-components, move business logic into custom hooks, and simplify conditional rendering. Aim for a component function that is easy to understand at a glance.',
              effort: 'medium'
            })
          );
        }
      } catch (error) {
        console.error(`Error checking complexity in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Count lines of code excluding empty lines and comments
   */
  private countLinesOfCode(content: string): number {
    const lines = content.split('\n');
    let count = 0;
    let inMultiLineComment = false;

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Check for multi-line comment start
      if (trimmed.includes('/*')) {
        inMultiLineComment = true;
      }
      
      // Skip empty lines and single-line comments
      if (trimmed === '' || trimmed.startsWith('//')) {
        continue;
      }
      
      // Skip lines inside multi-line comments
      if (inMultiLineComment) {
        if (trimmed.includes('*/')) {
          inMultiLineComment = false;
        }
        continue;
      }
      
      count++;
    }

    return count;
  }

  /**
   * Measure the length of the main component function
   */
  private measureComponentFunctionLength(content: string, componentName: string): number {
    // Try to find the main component function
    // Pattern 1: export const ComponentName = ...
    const pattern1 = new RegExp(`export\\s+const\\s+${componentName}\\s*=`, 'g');
    // Pattern 2: export function ComponentName
    const pattern2 = new RegExp(`export\\s+function\\s+${componentName}`, 'g');
    // Pattern 3: const ComponentName = ... followed by export
    const pattern3 = new RegExp(`const\\s+${componentName}\\s*=`, 'g');
    
    const patterns = [pattern1, pattern2, pattern3];
    
    for (const pattern of patterns) {
      const match = pattern.exec(content);
      if (match) {
        // Find the function body
        const startIndex = match.index;
        const functionBody = this.extractFunctionBody(content, startIndex);
        
        if (functionBody) {
          return this.countLinesOfCode(functionBody);
        }
      }
    }
    
    // If we can't find the specific component, return 0
    return 0;
  }

  /**
   * Extract function body starting from a given index
   */
  private extractFunctionBody(content: string, startIndex: number): string | null {
    // Find the opening brace
    let braceIndex = content.indexOf('{', startIndex);
    if (braceIndex === -1) {
      return null;
    }
    
    // Count braces to find the matching closing brace
    let braceCount = 1;
    let currentIndex = braceIndex + 1;
    
    while (currentIndex < content.length && braceCount > 0) {
      const char = content[currentIndex];
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
      }
      currentIndex++;
    }
    
    if (braceCount === 0) {
      return content.substring(braceIndex, currentIndex);
    }
    
    return null;
  }

  /**
   * Verify side effect encapsulation
   * Property 27: Side effect encapsulation
   * Validates Requirement 8.4
   */
  verifySideEffectEncapsulation(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check for side effects outside useEffect
        const unsafeSideEffects = this.findUnsafeSideEffects(content, component);
        issues.push(...unsafeSideEffects);
        
        // Check for useEffect without cleanup
        const missingCleanup = this.checkUseEffectCleanup(content, component);
        issues.push(...missingCleanup);
        
      } catch (error) {
        console.error(`Error checking side effect encapsulation in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Find side effects that are not properly encapsulated in useEffect
   */
  private findUnsafeSideEffects(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Patterns that indicate side effects
    const sideEffectPatterns = [
      { pattern: /document\.addEventListener/, name: 'event listener registration' },
      { pattern: /window\.addEventListener/, name: 'window event listener' },
      { pattern: /document\.querySelector/, name: 'direct DOM manipulation' },
      { pattern: /document\.getElementById/, name: 'direct DOM manipulation' },
      { pattern: /setInterval\(/, name: 'interval timer' },
      { pattern: /setTimeout\(/, name: 'timeout timer' },
      { pattern: /localStorage\.setItem/, name: 'localStorage write' },
      { pattern: /sessionStorage\.setItem/, name: 'sessionStorage write' },
    ];
    
    // Check if side effects are inside useEffect
    const hasUseEffect = /useEffect\(/.test(content);
    
    const foundSideEffects: string[] = [];
    
    for (const { pattern, name } of sideEffectPatterns) {
      if (pattern.test(content)) {
        // Check if this side effect is inside a useEffect
        const isInUseEffect = this.isSideEffectInUseEffect(content, pattern);
        
        if (!isInUseEffect) {
          foundSideEffects.push(name);
        }
      }
    }
    
    if (foundSideEffects.length > 0) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Architecture',
          requirement: '8.4',
          title: `Improperly encapsulated side effects in ${component.name}`,
          description: `Component ${component.name} contains side effects (${foundSideEffects.join(', ')}) that may not be properly encapsulated in useEffect hooks. Side effects should be managed within useEffect to ensure proper lifecycle management.`,
          location: component.path,
          recommendation: 'Move all side effects into useEffect hooks. This ensures they run at the appropriate time in the component lifecycle and can be properly cleaned up. Example: useEffect(() => { const handler = () => {}; window.addEventListener("event", handler); return () => window.removeEventListener("event", handler); }, []);',
          effort: 'medium'
        })
      );
    }
    
    return issues;
  }

  /**
   * Check if a side effect pattern is inside a useEffect
   */
  private isSideEffectInUseEffect(content: string, sideEffectPattern: RegExp): boolean {
    // Find all useEffect blocks
    const useEffectRegex = /useEffect\(\s*\(\s*\)\s*=>\s*\{[\s\S]*?\}\s*,/g;
    const useEffectMatches = content.matchAll(useEffectRegex);
    
    for (const match of useEffectMatches) {
      const useEffectBody = match[0];
      if (sideEffectPattern.test(useEffectBody)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if useEffect hooks have proper cleanup
   */
  private checkUseEffectCleanup(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Find useEffect hooks
    const useEffectPattern = /useEffect\(\s*\(\s*\)\s*=>\s*\{([\s\S]*?)\}\s*,/g;
    const matches = content.matchAll(useEffectPattern);
    
    let hasUseEffectWithoutCleanup = false;
    
    for (const match of matches) {
      const effectBody = match[1];
      
      // Check if this effect has side effects that need cleanup
      const needsCleanup = this.effectNeedsCleanup(effectBody);
      
      if (needsCleanup) {
        // Check if cleanup function exists
        const hasCleanup = /return\s*\(\s*\)\s*=>/.test(effectBody) || /return\s*function/.test(effectBody);
        
        if (!hasCleanup) {
          hasUseEffectWithoutCleanup = true;
          break;
        }
      }
    }
    
    if (hasUseEffectWithoutCleanup) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Architecture',
          requirement: '8.4',
          title: `Missing cleanup in useEffect in ${component.name}`,
          description: `Component ${component.name} has useEffect hooks with side effects (event listeners, timers, subscriptions) that lack proper cleanup functions. This can lead to memory leaks and unexpected behavior.`,
          location: component.path,
          recommendation: 'Add cleanup functions to all useEffect hooks that register side effects. Return a cleanup function that removes event listeners, clears timers, cancels subscriptions, etc. Example: useEffect(() => { const id = setInterval(...); return () => clearInterval(id); }, []);',
          effort: 'medium'
        })
      );
    }
    
    return issues;
  }

  /**
   * Check if an effect body contains side effects that need cleanup
   */
  private effectNeedsCleanup(effectBody: string): boolean {
    const cleanupPatterns = [
      /addEventListener/,
      /setInterval/,
      /setTimeout/,
      /subscribe/,
      /\.on\(/,
      /new\s+\w+Observer/,  // IntersectionObserver, MutationObserver, etc.
    ];
    
    return cleanupPatterns.some(pattern => pattern.test(effectBody));
  }

  /**
   * Run all architecture analyses
   */
  analyzeAll(components: ComponentFile[]): {
    complexity: Issue[];
    sideEffects: Issue[];
    allIssues: Issue[];
  } {
    const complexity = this.checkComponentComplexity(components);
    const sideEffects = this.verifySideEffectEncapsulation(components);

    const allIssues = [
      ...complexity,
      ...sideEffects
    ];

    return {
      complexity,
      sideEffects,
      allIssues
    };
  }
}
