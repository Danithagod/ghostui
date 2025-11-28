/**
 * Performance analyzer for evaluating component performance
 * Validates Requirements 6.2, 6.3, 11.5
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class PerformanceAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Analyze animation property usage
   * Property 20: GPU-accelerated animations
   * Property 36: Layout thrashing prevention
   * Validates Requirements 6.2, 11.5
   */
  analyzeAnimationPropertyUsage(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component has animations
        const hasAnimations = this.hasAnimations(content);
        
        if (hasAnimations) {
          // Check for layout-triggering properties in animations
          const layoutIssues = this.checkLayoutTriggeringProperties(content, component);
          issues.push(...layoutIssues);
          
          // Check for non-GPU-accelerated properties
          const gpuIssues = this.checkNonGPUAcceleratedProperties(content, component);
          issues.push(...gpuIssues);
        }
      } catch (error) {
        console.error(`Error analyzing animation properties in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if component has animations
   */
  private hasAnimations(content: string): boolean {
    const animationPatterns = [
      /animate-/,
      /transition-/,
      /duration-/,
      /<motion\./,
      /framer-motion/,
      /variants=/,
      /initial=/,
      /animate=/,
      /transition=/,
      /@keyframes/,
      /animation:/,
      /transform:/,
      /translate/,
      /scale/,
      /rotate/
    ];

    return animationPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check for layout-triggering properties in animations
   */
  private checkLayoutTriggeringProperties(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Layout-triggering properties that should be avoided in animations
    const layoutProperties = [
      { pattern: /animate\s*=\s*\{\{[^}]*\bwidth\s*:/i, property: 'width' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bheight\s*:/i, property: 'height' },
      { pattern: /animate\s*=\s*\{\{[^}]*\btop\s*:/i, property: 'top' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bleft\s*:/i, property: 'left' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bright\s*:/i, property: 'right' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bbottom\s*:/i, property: 'bottom' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bmargin/i, property: 'margin' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bpadding/i, property: 'padding' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bborder/i, property: 'border' },
      { pattern: /animate\s*=\s*\{\{[^}]*\bfontSize\s*:/i, property: 'fontSize' },
    ];

    const foundProperties: string[] = [];
    
    for (const { pattern, property } of layoutProperties) {
      if (pattern.test(content)) {
        foundProperties.push(property);
      }
    }
    
    // Also check CSS animations and transitions
    const cssLayoutPatterns = [
      { pattern: /transition:\s*[^;]*\b(width|height|top|left|right|bottom|margin|padding|border|font-size)\b/i, type: 'CSS transition' },
      { pattern: /@keyframes[^{]*\{[^}]*\b(width|height|top|left|right|bottom|margin|padding|border|font-size)\s*:/i, type: 'CSS keyframe' },
    ];
    
    for (const { pattern, type } of cssLayoutPatterns) {
      const match = content.match(pattern);
      if (match) {
        foundProperties.push(`${type} with layout properties`);
      }
    }
    
    if (foundProperties.length > 0) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Performance',
          requirement: '6.2, 11.5',
          title: `Layout-triggering animation properties in ${component.name}`,
          description: `Component ${component.name} animates layout-triggering properties (${foundProperties.join(', ')}), which can cause performance issues and layout thrashing.`,
          location: component.path,
          recommendation: 'Replace layout-triggering properties with GPU-accelerated alternatives: use transform (translateX/Y, scale) instead of width/height/position, use transform: scale() instead of width/height, and use opacity for visibility changes. These properties are composited on the GPU and do not trigger layout recalculation.',
          effort: 'medium'
        })
      );
    }
    
    return issues;
  }

  /**
   * Check for non-GPU-accelerated properties
   */
  private checkNonGPUAcceleratedProperties(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Check if animations use primarily GPU-accelerated properties
    const hasGPUProperties = this.hasGPUAcceleratedProperties(content);
    const hasLayoutProperties = this.hasLayoutProperties(content);
    
    // If component has animations but doesn't use GPU-accelerated properties
    if (!hasGPUProperties && hasLayoutProperties) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'medium',
          category: 'Performance',
          requirement: '6.2',
          title: `Missing GPU-accelerated properties in ${component.name}`,
          description: `Component ${component.name} has animations but does not primarily use GPU-accelerated properties (transform, opacity, filter).`,
          location: component.path,
          recommendation: 'Prefer GPU-accelerated properties for animations: transform (translate, scale, rotate), opacity, and filter. These properties are handled by the GPU compositor and provide smoother animations with better performance.',
          effort: 'medium'
        })
      );
    }
    
    return issues;
  }

  /**
   * Check if content uses GPU-accelerated properties
   */
  private hasGPUAcceleratedProperties(content: string): boolean {
    const gpuProperties = [
      /transform:/,
      /translate[XYZ]?/,
      /scale[XYZ]?/,
      /rotate[XYZ]?/,
      /opacity:/,
      /filter:/,
    ];

    return gpuProperties.some(pattern => pattern.test(content));
  }

  /**
   * Check if content uses layout properties
   */
  private hasLayoutProperties(content: string): boolean {
    const layoutProperties = [
      /\bwidth:/,
      /\bheight:/,
      /\btop:/,
      /\bleft:/,
      /\bright:/,
      /\bbottom:/,
      /\bmargin:/,
      /\bpadding:/,
    ];

    return layoutProperties.some(pattern => pattern.test(content));
  }

  /**
   * Check event handler memoization
   * Property 21: Event handler memoization
   * Validates Requirement 6.3
   */
  checkEventHandlerMemoization(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check for inline event handlers in JSX
        const inlineHandlers = this.findInlineEventHandlers(content, component);
        issues.push(...inlineHandlers);
        
      } catch (error) {
        console.error(`Error checking event handler memoization in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Find inline event handlers that should be memoized
   */
  private findInlineEventHandlers(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    
    // Check for inline arrow functions in JSX event handlers
    const inlineHandlerPatterns = [
      // onClick={() => ...}
      /on[A-Z]\w+\s*=\s*\{[^}]*=>\s*[^}]+\}/g,
      // onClick={function() {...}}
      /on[A-Z]\w+\s*=\s*\{[^}]*function\s*\([^)]*\)\s*\{/g,
    ];
    
    let hasInlineHandlers = false;
    
    for (const pattern of inlineHandlerPatterns) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        hasInlineHandlers = true;
        break;
      }
    }
    
    // Check if component uses useCallback
    const hasUseCallback = /useCallback/.test(content);
    
    // Check if inline handlers are passed to child components
    const passesHandlersToChildren = this.passesHandlersToChildren(content);
    
    if (hasInlineHandlers && passesHandlersToChildren && !hasUseCallback) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'medium',
          category: 'Performance',
          requirement: '6.3',
          title: `Missing useCallback for event handlers in ${component.name}`,
          description: `Component ${component.name} defines inline event handlers that are passed to child components but does not use useCallback to memoize them. This causes child components to re-render unnecessarily.`,
          location: component.path,
          recommendation: 'Wrap event handlers in useCallback when they are passed to child components. This prevents unnecessary re-renders by maintaining referential equality of the handler function across renders. Example: const handleClick = useCallback(() => { ... }, [dependencies]);',
          effort: 'low'
        })
      );
    } else if (hasInlineHandlers && !passesHandlersToChildren) {
      // Lower severity if handlers are not passed to children
      issues.push(
        this.issueCollector.createIssue({
          severity: 'low',
          category: 'Performance',
          requirement: '6.3',
          title: `Inline event handlers in ${component.name}`,
          description: `Component ${component.name} defines inline event handlers in JSX. While this may not cause issues if handlers are not passed to child components, it's generally better practice to define handlers outside JSX or use useCallback.`,
          location: component.path,
          recommendation: 'Consider defining event handlers outside JSX or using useCallback for consistency and to prevent potential performance issues if the component structure changes.',
          effort: 'low'
        })
      );
    }
    
    return issues;
  }

  /**
   * Check if component passes handlers to child components
   */
  private passesHandlersToChildren(content: string): boolean {
    // Look for patterns where event handlers are passed as props
    // This is a heuristic - we look for components (PascalCase) receiving on* props
    const patterns = [
      /<[A-Z][a-zA-Z]*[^>]*on[A-Z]\w+\s*=\s*\{/,
      /<motion\.[a-z]+[^>]*on[A-Z]\w+\s*=\s*\{/,
    ];

    return patterns.some(pattern => pattern.test(content));
  }

  /**
   * Run all performance analyses
   */
  analyzeAll(components: ComponentFile[]): {
    animationProperties: Issue[];
    eventHandlerMemoization: Issue[];
    allIssues: Issue[];
  } {
    const animationProperties = this.analyzeAnimationPropertyUsage(components);
    const eventHandlerMemoization = this.checkEventHandlerMemoization(components);

    const allIssues = [
      ...animationProperties,
      ...eventHandlerMemoization
    ];

    return {
      animationProperties,
      eventHandlerMemoization,
      allIssues
    };
  }
}
