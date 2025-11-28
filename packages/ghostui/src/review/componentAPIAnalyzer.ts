/**
 * Component API Analyzer
 * Analyzes component APIs for consistency in naming, event handling, ref forwarding, etc.
 */

import * as fs from 'fs';
import * as ts from 'typescript';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class ComponentAPIAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Analyze prop naming consistency across similar components
   */
  analyzePropNaming(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    // Group components by type
    const componentGroups = this.groupComponentsByType(components);
    
    // Analyze each group for naming consistency
    for (const [groupName, groupComponents] of Object.entries(componentGroups)) {
      const propsByComponent = new Map<string, Set<string>>();
      
      // Extract props from each component in the group
      for (const component of groupComponents) {
        const props = this.extractPropsFromComponent(component);
        propsByComponent.set(component.name, props);
      }
      
      // Find inconsistencies in similar concepts
      const inconsistencies = this.findNamingInconsistencies(propsByComponent, groupName);
      issues.push(...inconsistencies);
    }
    
    return issues;
  }

  /**
   * Group components by type (toggles, modals, inputs, etc.)
   */
  private groupComponentsByType(components: ComponentFile[]): Record<string, ComponentFile[]> {
    const groups: Record<string, ComponentFile[]> = {
      toggles: [],
      inputs: [],
      modals: [],
      loaders: [],
      cards: [],
      backgrounds: [],
      effects: [],
      other: []
    };
    
    for (const component of components) {
      const name = component.name.toLowerCase();
      
      if (name.includes('toggle') || name.includes('switch')) {
        groups.toggles.push(component);
      } else if (name.includes('input') || name.includes('textarea')) {
        groups.inputs.push(component);
      } else if (name.includes('modal') || name.includes('dialog')) {
        groups.modals.push(component);
      } else if (name.includes('loader') || name.includes('spinner')) {
        groups.loaders.push(component);
      } else if (name.includes('card') || name.includes('box')) {
        groups.cards.push(component);
      } else if (name.includes('background') || name.includes('backdrop')) {
        groups.backgrounds.push(component);
      } else if (name.includes('transition') || name.includes('fade') || name.includes('crawl')) {
        groups.effects.push(component);
      } else {
        groups.other.push(component);
      }
    }
    
    // Remove empty groups
    return Object.fromEntries(
      Object.entries(groups).filter(([_, comps]) => comps.length > 1)
    );
  }

  /**
   * Extract prop names from a component
   */
  private extractPropsFromComponent(component: ComponentFile): Set<string> {
    const props = new Set<string>();
    
    try {
      const content = fs.readFileSync(component.path, 'utf-8');
      const sourceFile = ts.createSourceFile(
        component.path,
        content,
        ts.ScriptTarget.Latest,
        true
      );
      
      // Find the Props interface
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isInterfaceDeclaration(node)) {
          const interfaceName = node.name.text;
          if (interfaceName.includes('Props')) {
            // Extract property names
            node.members.forEach((member) => {
              if (ts.isPropertySignature(member) && member.name) {
                const propName = member.name.getText(sourceFile);
                props.add(propName);
              }
            });
          }
        }
      });
    } catch (error) {
      console.error(`Error extracting props from ${component.name}:`, error);
    }
    
    return props;
  }

  /**
   * Find naming inconsistencies within a group
   */
  private findNamingInconsistencies(
    propsByComponent: Map<string, Set<string>>,
    groupName: string
  ): Issue[] {
    const issues: Issue[] = [];
    
    // Define common concepts and their possible names
    const conceptVariations: Record<string, string[]> = {
      'state': ['checked', 'isChecked', 'value', 'isOpen', 'open', 'visible', 'isVisible'],
      'change_handler': ['onChange', 'onToggle', 'onValueChange', 'onCheckedChange'],
      'disabled': ['disabled', 'isDisabled'],
      'className': ['className', 'class'],
      'variant': ['variant', 'type', 'theme'],
    };
    
    // Check each concept
    for (const [concept, variations] of Object.entries(conceptVariations)) {
      const usageMap = new Map<string, string[]>();
      
      // Track which variation each component uses
      for (const [componentName, props] of propsByComponent.entries()) {
        for (const variation of variations) {
          if (props.has(variation)) {
            if (!usageMap.has(variation)) {
              usageMap.set(variation, []);
            }
            usageMap.get(variation)!.push(componentName);
          }
        }
      }
      
      // If multiple variations are used, report inconsistency
      if (usageMap.size > 1) {
        const variationsList = Array.from(usageMap.entries())
          .map(([variation, components]) => `"${variation}" (${components.join(', ')})`)
          .join('; ');
        
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Component API Consistency',
            requirement: '2.1',
            title: `Inconsistent prop naming for ${concept} in ${groupName}`,
            description: `Components in the ${groupName} group use different prop names for the same concept: ${variationsList}`,
            location: `${groupName} group`,
            recommendation: `Standardize on a single prop name for ${concept} across all ${groupName} components. Consider using the most common variation or the most descriptive name.`,
            effort: 'medium'
          })
        );
      }
    }
    
    return issues;
  }

  /**
   * Verify event handler forwarding
   */
  verifyEventHandlerForwarding(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        const sourceFile = ts.createSourceFile(
          component.path,
          content,
          ts.ScriptTarget.Latest,
          true
        );
        
        // Find event handler props
        const eventHandlerProps = this.findEventHandlerProps(sourceFile);
        
        // Check if they're forwarded
        for (const handlerProp of eventHandlerProps) {
          const isForwarded = this.isEventHandlerForwarded(content, handlerProp);
          
          if (!isForwarded) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'high',
                category: 'Component API Consistency',
                requirement: '2.2',
                title: `Event handler "${handlerProp}" not forwarded in ${component.name}`,
                description: `The component accepts "${handlerProp}" prop but does not appear to call it.`,
                location: component.path,
                recommendation: `Ensure that the "${handlerProp}" handler is called when the corresponding event occurs. If the component has internal handling, call the user-provided handler in addition to internal logic.`,
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error analyzing event handlers in ${component.name}:`, error);
      }
    }
    
    return issues;
  }

  /**
   * Find event handler props in a component
   */
  private findEventHandlerProps(sourceFile: ts.SourceFile): string[] {
    const handlers: string[] = [];
    
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        const interfaceName = node.name.text;
        if (interfaceName.includes('Props')) {
          node.members.forEach((member) => {
            if (ts.isPropertySignature(member) && member.name) {
              const propName = member.name.getText(sourceFile);
              // Event handlers typically start with "on"
              if (propName.startsWith('on') && propName.length > 2) {
                handlers.push(propName);
              }
            }
          });
        }
      }
    });
    
    return handlers;
  }

  /**
   * Check if an event handler is forwarded/called
   */
  private isEventHandlerForwarded(content: string, handlerName: string): boolean {
    // Look for patterns like:
    // - handlerName?.()
    // - handlerName()
    // - handlerName && handlerName()
    // - if (handlerName) handlerName()
    const patterns = [
      new RegExp(`${handlerName}\\?\\.\\\(`, 'g'),
      new RegExp(`${handlerName}\\\(`, 'g'),
      new RegExp(`${handlerName}\\s*&&`, 'g'),
      new RegExp(`if\\s*\\\(\\s*${handlerName}\\s*\\\)`, 'g'),
    ];
    
    return patterns.some(pattern => pattern.test(content));
  }

  /**
   * Check ref forwarding implementation
   */
  checkRefForwarding(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component renders interactive HTML elements
        const hasInteractiveElements = this.hasInteractiveElements(content);
        
        if (hasInteractiveElements) {
          // Check if forwardRef is used
          const usesForwardRef = content.includes('React.forwardRef') || content.includes('forwardRef');
          
          if (!usesForwardRef) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'high',
                category: 'Component API Consistency',
                requirement: '2.3',
                title: `Missing ref forwarding in ${component.name}`,
                description: `The component renders interactive HTML elements but does not use React.forwardRef to expose the element ref.`,
                location: component.path,
                recommendation: `Wrap the component with React.forwardRef and forward the ref to the appropriate HTML element. This allows parent components to access the DOM node for focus management and other operations.`,
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error checking ref forwarding in ${component.name}:`, error);
      }
    }
    
    return issues;
  }

  /**
   * Check if component has interactive elements
   */
  private hasInteractiveElements(content: string): boolean {
    const interactiveElements = [
      '<button',
      '<input',
      '<textarea',
      '<select',
      '<a ',
      'role="button"',
      'role="switch"',
      'role="checkbox"',
      'role="radio"',
    ];
    
    return interactiveElements.some(element => content.includes(element));
  }

  /**
   * Verify className merging
   */
  verifyClassNameMerging(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component accepts className prop
        const acceptsClassName = content.includes('className');
        
        if (acceptsClassName) {
          // Check if cn() utility is used
          const usesCnUtility = content.includes('cn(');
          
          if (!usesCnUtility) {
            // Check if className is at least passed through
            const passesClassName = /className=\{[^}]*className[^}]*\}/.test(content);
            
            if (!passesClassName) {
              issues.push(
                this.issueCollector.createIssue({
                  severity: 'medium',
                  category: 'Component API Consistency',
                  requirement: '2.4',
                  title: `className not properly merged in ${component.name}`,
                  description: `The component accepts a className prop but does not appear to merge it with internal classes using the cn() utility.`,
                  location: component.path,
                  recommendation: `Use the cn() utility function to merge the user-provided className with internal classes. This ensures proper class precedence and prevents conflicts.`,
                  effort: 'low'
                })
              );
            }
          }
        }
      } catch (error) {
        console.error(`Error checking className merging in ${component.name}:`, error);
      }
    }
    
    return issues;
  }

  /**
   * Analyze controlled/uncontrolled component support
   */
  analyzeControlledUncontrolledSupport(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];
    
    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if this is a form-like component
        const isFormLike = this.isFormLikeComponent(content, component.name);
        
        if (isFormLike) {
          // Check for both value and defaultValue support
          const hasValue = content.includes('value');
          const hasDefaultValue = content.includes('defaultValue');
          
          if (hasValue && !hasDefaultValue) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'Component API Consistency',
                requirement: '2.5',
                title: `Missing uncontrolled mode support in ${component.name}`,
                description: `The component supports controlled mode (value prop) but does not support uncontrolled mode (defaultValue prop).`,
                location: component.path,
                recommendation: `Add support for defaultValue prop to enable uncontrolled mode. Use internal state when value is undefined and defaultValue is provided.`,
                effort: 'medium'
              })
            );
          } else if (!hasValue && hasDefaultValue) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'Component API Consistency',
                requirement: '2.5',
                title: `Missing controlled mode support in ${component.name}`,
                description: `The component supports uncontrolled mode (defaultValue prop) but does not support controlled mode (value prop).`,
                location: component.path,
                recommendation: `Add support for value prop to enable controlled mode. Check if value is provided and use it instead of internal state.`,
                effort: 'medium'
              })
            );
          } else if (!hasValue && !hasDefaultValue) {
            // Component might be using different prop names (like checked/defaultChecked)
            const hasChecked = content.includes('checked');
            const hasDefaultChecked = content.includes('defaultChecked');
            
            if (hasChecked && !hasDefaultChecked) {
              issues.push(
                this.issueCollector.createIssue({
                  severity: 'low',
                  category: 'Component API Consistency',
                  requirement: '2.5',
                  title: `Consider adding uncontrolled mode support in ${component.name}`,
                  description: `The component supports controlled mode (checked prop) but does not support uncontrolled mode (defaultChecked prop).`,
                  location: component.path,
                  recommendation: `Consider adding support for defaultChecked prop to enable uncontrolled mode for better flexibility.`,
                  effort: 'medium'
                })
              );
            }
          }
        }
      } catch (error) {
        console.error(`Error analyzing controlled/uncontrolled support in ${component.name}:`, error);
      }
    }
    
    return issues;
  }

  /**
   * Check if component is form-like
   */
  private isFormLikeComponent(content: string, componentName: string): boolean {
    const formIndicators = [
      '<input',
      '<textarea',
      '<select',
      'type="text"',
      'type="checkbox"',
      'type="radio"',
      'onChange',
    ];
    
    const nameIndicators = [
      'input',
      'textarea',
      'select',
      'field',
      'toggle',
      'switch',
      'checkbox',
      'radio',
    ];
    
    const hasFormElements = formIndicators.some(indicator => content.includes(indicator));
    const hasFormName = nameIndicators.some(indicator => 
      componentName.toLowerCase().includes(indicator)
    );
    
    return hasFormElements || hasFormName;
  }
}
