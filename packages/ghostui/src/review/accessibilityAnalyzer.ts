/**
 * Accessibility analyzer for evaluating component accessibility
 * Validates Requirements 4.1, 4.2, 4.3, 4.4, 11.4
 */

import * as fs from 'fs';
import { ComponentFile, Issue } from './types';
import { IssueCollector } from './issueCollector';

export class AccessibilityAnalyzer {
  private issueCollector: IssueCollector;

  constructor(issueCollector: IssueCollector) {
    this.issueCollector = issueCollector;
  }

  /**
   * Check keyboard navigation support
   * Property 14: Keyboard navigation support
   * Validates Requirement 4.1
   */
  checkKeyboardNavigationSupport(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component is interactive
        const isInteractive = this.isInteractiveComponent(content);
        
        if (isInteractive) {
          // Check for keyboard event handlers
          const hasKeyboardHandlers = this.hasKeyboardHandlers(content);
          
          // Check for proper button/link usage (which have built-in keyboard support)
          const usesSemanticElements = this.usesSemanticInteractiveElements(content);
          
          // Check for custom interactive elements that need keyboard support
          const hasCustomInteractive = this.hasCustomInteractiveElements(content);
          
          if (hasCustomInteractive && !hasKeyboardHandlers && !usesSemanticElements) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'high',
                category: 'Accessibility',
                requirement: '4.1',
                title: `Missing keyboard navigation support in ${component.name}`,
                description: `Component ${component.name} has interactive elements but does not implement keyboard event handlers (onKeyDown, onKeyPress) for keyboard navigation.`,
                location: component.path,
                recommendation: 'Add keyboard event handlers to support Enter/Space for activation, Arrow keys for navigation (if applicable), and Escape for dismissal (if applicable). Alternatively, use semantic HTML elements like <button> which have built-in keyboard support.',
                effort: 'medium'
              })
            );
          }
          
          // Check for specific keyboard patterns based on component type
          const keyboardIssues = this.checkSpecificKeyboardPatterns(content, component);
          issues.push(...keyboardIssues);
        }
      } catch (error) {
        console.error(`Error checking keyboard navigation in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check if component is interactive
   */
  private isInteractiveComponent(content: string): boolean {
    const interactivePatterns = [
      /onClick/,
      /onChange/,
      /onFocus/,
      /onBlur/,
      /onSubmit/,
      /<button/i,
      /<input/i,
      /<textarea/i,
      /<select/i,
      /role="button"/,
      /role="switch"/,
      /role="checkbox"/,
      /role="radio"/,
      /role="tab"/,
      /role="menuitem"/,
      /tabIndex/
    ];

    return interactivePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check for keyboard event handlers
   */
  private hasKeyboardHandlers(content: string): boolean {
    const keyboardHandlers = [
      /onKeyDown/,
      /onKeyPress/,
      /onKeyUp/
    ];

    return keyboardHandlers.some(pattern => pattern.test(content));
  }

  /**
   * Check if component uses semantic interactive elements
   */
  private usesSemanticInteractiveElements(content: string): boolean {
    const semanticElements = [
      /<button[\s>]/i,
      /<a[\s>]/i,
      /<input[\s>]/i,
      /<textarea[\s>]/i,
      /<select[\s>]/i
    ];

    return semanticElements.some(pattern => pattern.test(content));
  }

  /**
   * Check for custom interactive elements (divs/spans with click handlers)
   */
  private hasCustomInteractiveElements(content: string): boolean {
    // Look for div or span with onClick but no role
    const customInteractivePatterns = [
      /<div[^>]*onClick/i,
      /<span[^>]*onClick/i,
      /role="button"/,
      /role="switch"/
    ];

    return customInteractivePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check for specific keyboard patterns based on component type
   */
  private checkSpecificKeyboardPatterns(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    const name = component.name.toLowerCase();

    // Modal/Dialog components should handle Escape key
    if (name.includes('modal') || name.includes('dialog') || name.includes('popup')) {
      const handlesEscape = /Escape|key\s*===\s*['"]Escape['"]|keyCode\s*===\s*27/.test(content);
      
      if (!handlesEscape) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'high',
            category: 'Accessibility',
            requirement: '4.1',
            title: `Missing Escape key handler in ${component.name}`,
            description: `Modal/dialog component ${component.name} should handle the Escape key to allow users to dismiss it via keyboard.`,
            location: component.path,
            recommendation: 'Add an onKeyDown handler that checks for the Escape key and closes the modal/dialog when pressed.',
            effort: 'low'
          })
        );
      }
    }

    // Toggle/Switch components should handle Space and Enter
    if (name.includes('toggle') || name.includes('switch')) {
      const handlesSpaceOrEnter = /Enter|Space|key\s*===\s*['"]Enter['"]|key\s*===\s*['" ]Space['"]/.test(content);
      
      if (!handlesSpaceOrEnter && !this.usesSemanticInteractiveElements(content)) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.1',
            title: `Missing Space/Enter key handlers in ${component.name}`,
            description: `Toggle/switch component ${component.name} should handle Space and Enter keys for activation.`,
            location: component.path,
            recommendation: 'Add keyboard event handlers for Space and Enter keys to toggle the component state, or use a <button> element which handles these automatically.',
            effort: 'low'
          })
        );
      }
    }

    // Tab components should handle Arrow keys
    if (name.includes('tab')) {
      const handlesArrowKeys = /Arrow|ArrowLeft|ArrowRight|ArrowUp|ArrowDown/.test(content);
      
      if (!handlesArrowKeys) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.1',
            title: `Missing Arrow key navigation in ${component.name}`,
            description: `Tab component ${component.name} should handle Arrow keys for keyboard navigation between tabs.`,
            location: component.path,
            recommendation: 'Add keyboard event handlers for Arrow keys (Left/Right or Up/Down depending on orientation) to navigate between tabs.',
            effort: 'medium'
          })
        );
      }
    }

    return issues;
  }

  /**
   * Verify ARIA attributes
   * Property 15: ARIA attribute presence
   * Validates Requirement 4.2
   */
  verifyARIAAttributes(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component is interactive
        const isInteractive = this.isInteractiveComponent(content);
        
        if (isInteractive) {
          // Check for ARIA attributes
          const ariaIssues = this.checkARIAPatterns(content, component);
          issues.push(...ariaIssues);
        }
      } catch (error) {
        console.error(`Error verifying ARIA attributes in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check for ARIA patterns based on component type
   */
  private checkARIAPatterns(content: string, component: ComponentFile): Issue[] {
    const issues: Issue[] = [];
    const name = component.name.toLowerCase();

    // Check for custom controls that need ARIA roles
    const hasCustomControl = this.hasCustomInteractiveElements(content);
    const hasRole = /role=/.test(content);
    
    if (hasCustomControl && !hasRole) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Accessibility',
          requirement: '4.2',
          title: `Missing ARIA role in ${component.name}`,
          description: `Component ${component.name} uses custom interactive elements (div/span with onClick) but does not define an appropriate ARIA role.`,
          location: component.path,
          recommendation: 'Add an appropriate role attribute (e.g., role="button", role="switch", role="checkbox") to custom interactive elements, or use semantic HTML elements instead.',
          effort: 'low'
        })
      );
    }

    // Check for unlabeled controls
    const hasUnlabeledControl = this.hasUnlabeledControl(content);
    
    if (hasUnlabeledControl) {
      issues.push(
        this.issueCollector.createIssue({
          severity: 'high',
          category: 'Accessibility',
          requirement: '4.2',
          title: `Missing ARIA label in ${component.name}`,
          description: `Component ${component.name} has interactive elements without visible labels and is missing aria-label or aria-labelledby attributes.`,
          location: component.path,
          recommendation: 'Add aria-label with a descriptive label, or use aria-labelledby to reference a visible label element. For icon-only buttons, always provide an aria-label.',
          effort: 'low'
        })
      );
    }

    // Check for expandable elements
    if (name.includes('accordion') || name.includes('dropdown') || name.includes('collapse') || name.includes('expand')) {
      const hasAriaExpanded = /aria-expanded/.test(content);
      
      if (!hasAriaExpanded) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing aria-expanded in ${component.name}`,
            description: `Expandable component ${component.name} should use aria-expanded to indicate its current state.`,
            location: component.path,
            recommendation: 'Add aria-expanded={isOpen} to the trigger element to communicate the expanded/collapsed state to assistive technologies.',
            effort: 'low'
          })
        );
      }
    }

    // Check for modal/dialog components
    if (name.includes('modal') || name.includes('dialog')) {
      const hasAriaModal = /aria-modal/.test(content);
      const hasRoleDialog = /role="dialog"/.test(content);
      
      if (!hasAriaModal && !hasRoleDialog) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'high',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing dialog ARIA attributes in ${component.name}`,
            description: `Modal/dialog component ${component.name} should use role="dialog" and aria-modal="true".`,
            location: component.path,
            recommendation: 'Add role="dialog" and aria-modal="true" to the modal container. Also consider adding aria-labelledby to reference the modal title.',
            effort: 'low'
          })
        );
      }
    }

    // Check for toggle/switch components
    if (name.includes('toggle') || name.includes('switch')) {
      const hasAriaChecked = /aria-checked/.test(content);
      const hasRoleSwitch = /role="switch"/.test(content);
      const usesCheckbox = /<input[^>]*type="checkbox"/.test(content);
      
      if (!hasAriaChecked && !hasRoleSwitch && !usesCheckbox) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing switch ARIA attributes in ${component.name}`,
            description: `Toggle/switch component ${component.name} should use role="switch" with aria-checked, or use a native checkbox input.`,
            location: component.path,
            recommendation: 'Add role="switch" and aria-checked={isChecked} to communicate the toggle state, or use a native <input type="checkbox"> element.',
            effort: 'low'
          })
        );
      }
    }

    // Check for tab components
    if (name.includes('tab')) {
      const hasTabRole = /role="tab"/.test(content);
      const hasTablistRole = /role="tablist"/.test(content);
      const hasTabpanelRole = /role="tabpanel"/.test(content);
      const hasAriaSelected = /aria-selected/.test(content);
      
      if (!hasTabRole || !hasTablistRole || !hasTabpanelRole) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'high',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing tab ARIA roles in ${component.name}`,
            description: `Tab component ${component.name} should implement the complete ARIA tabs pattern with role="tablist", role="tab", and role="tabpanel".`,
            location: component.path,
            recommendation: 'Implement the ARIA tabs pattern: use role="tablist" on the container, role="tab" on each tab button, role="tabpanel" on each panel, and aria-selected on the active tab.',
            effort: 'medium'
          })
        );
      } else if (!hasAriaSelected) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing aria-selected in ${component.name}`,
            description: `Tab component ${component.name} should use aria-selected to indicate the active tab.`,
            location: component.path,
            recommendation: 'Add aria-selected={isActive} to each tab button to indicate which tab is currently selected.',
            effort: 'low'
          })
        );
      }
    }

    // Check for tooltip components
    if (name.includes('tooltip')) {
      const hasAriaDescribedby = /aria-describedby/.test(content);
      const hasRoleTooltip = /role="tooltip"/.test(content);
      
      if (!hasAriaDescribedby && !hasRoleTooltip) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing tooltip ARIA attributes in ${component.name}`,
            description: `Tooltip component ${component.name} should use role="tooltip" and connect it to the trigger with aria-describedby.`,
            location: component.path,
            recommendation: 'Add role="tooltip" to the tooltip element and aria-describedby on the trigger element that references the tooltip\'s id.',
            effort: 'low'
          })
        );
      }
    }

    // Check for progress/loader components
    if (name.includes('progress') || name.includes('loader') || name.includes('spinner')) {
      const hasAriaLive = /aria-live/.test(content);
      const hasRoleProgressbar = /role="progressbar"/.test(content);
      const hasRoleStatus = /role="status"/.test(content);
      
      if (!hasAriaLive && !hasRoleProgressbar && !hasRoleStatus) {
        issues.push(
          this.issueCollector.createIssue({
            severity: 'low',
            category: 'Accessibility',
            requirement: '4.2',
            title: `Missing progress ARIA attributes in ${component.name}`,
            description: `Progress/loader component ${component.name} should use role="progressbar" or role="status" with aria-live to announce loading state.`,
            location: component.path,
            recommendation: 'Add role="progressbar" with aria-valuenow for determinate progress, or role="status" with aria-live="polite" for indeterminate loaders.',
            effort: 'low'
          })
        );
      }
    }

    return issues;
  }

  /**
   * Check for unlabeled controls
   */
  private hasUnlabeledControl(content: string): boolean {
    // Look for buttons/inputs without text content or aria-label
    const hasIconOnlyButton = /<button[^>]*>[\s]*<(?:svg|i|span)[^>]*>/.test(content);
    const hasAriaLabel = /aria-label/.test(content);
    const hasAriaLabelledby = /aria-labelledby/.test(content);
    
    // If there's an icon-only button without ARIA labels, it's unlabeled
    return hasIconOnlyButton && !hasAriaLabel && !hasAriaLabelledby;
  }

  /**
   * Check focus indicator styles
   * Property 16: Focus indicator visibility
   * Validates Requirement 4.3
   */
  checkFocusIndicatorStyles(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component is interactive
        const isInteractive = this.isInteractiveComponent(content);
        
        if (isInteractive) {
          // Check for focus-visible styles
          const hasFocusVisible = this.hasFocusVisibleStyles(content);
          
          // Check for focus styles (legacy)
          const hasFocusStyles = this.hasFocusStyles(content);
          
          // Check for outline removal without replacement
          const removesOutlineWithoutReplacement = this.removesOutlineWithoutReplacement(content);
          
          if (!hasFocusVisible && !hasFocusStyles) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'high',
                category: 'Accessibility',
                requirement: '4.3',
                title: `Missing focus indicator styles in ${component.name}`,
                description: `Component ${component.name} has interactive elements but does not define visible focus indicator styles.`,
                location: component.path,
                recommendation: 'Add focus-visible styles to interactive elements using the :focus-visible pseudo-class or focus-visible: class. Ensure the focus indicator has sufficient contrast and is clearly visible.',
                effort: 'low'
              })
            );
          }
          
          if (removesOutlineWithoutReplacement) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'critical',
                category: 'Accessibility',
                requirement: '4.3',
                title: `Focus outline removed without replacement in ${component.name}`,
                description: `Component ${component.name} removes the default focus outline (outline: none or outline: 0) without providing an alternative focus indicator.`,
                location: component.path,
                recommendation: 'Never remove focus outlines without providing a clear alternative. Add custom focus styles using ring utilities, borders, shadows, or background colors to ensure keyboard users can see which element has focus.',
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error checking focus indicators in ${component.name}:`, error);
      }
    }

    return issues;
  }

  /**
   * Check for focus-visible styles
   */
  private hasFocusVisibleStyles(content: string): boolean {
    const focusVisiblePatterns = [
      /focus-visible:/,
      /focus-visible\\/,
      /:focus-visible/,
      /\[&:focus-visible\]/,
      /focus-visible:ring/,
      /focus-visible:outline/,
      /focus-visible:border/
    ];

    return focusVisiblePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check for focus styles (legacy)
   */
  private hasFocusStyles(content: string): boolean {
    const focusPatterns = [
      /focus:ring/,
      /focus:outline/,
      /focus:border/,
      /focus:shadow/,
      /:focus\s*\{/,
      /\[&:focus\]/
    ];

    return focusPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check if outline is removed without replacement
   */
  private removesOutlineWithoutReplacement(content: string): boolean {
    // Check for outline removal
    const removesOutline = /outline:\s*(?:none|0)|outline-none/.test(content);
    
    if (!removesOutline) {
      return false;
    }
    
    // Check if there's a replacement focus indicator
    const hasReplacement = this.hasFocusVisibleStyles(content) || 
                          this.hasFocusStyles(content) ||
                          /ring-/.test(content) ||
                          /focus:bg-/.test(content);
    
    return !hasReplacement;
  }

  /**
   * Verify motion reduction support
   * Property 17: Motion reduction support
   * Validates Requirements 4.4, 11.4
   */
  verifyMotionReductionSupport(components: ComponentFile[]): Issue[] {
    const issues: Issue[] = [];

    for (const component of components) {
      try {
        const content = fs.readFileSync(component.path, 'utf-8');
        
        // Check if component has animations
        const hasAnimations = this.hasAnimations(content);
        
        if (hasAnimations) {
          // Check for motion reduction support
          const hasMotionReduce = this.hasMotionReduceSupport(content);
          
          if (!hasMotionReduce) {
            issues.push(
              this.issueCollector.createIssue({
                severity: 'high',
                category: 'Accessibility',
                requirement: '4.4, 11.4',
                title: `Missing motion reduction support in ${component.name}`,
                description: `Component ${component.name} includes animations but does not respect user preferences for reduced motion.`,
                location: component.path,
                recommendation: 'Add motion-reduce: class variants to disable or reduce animations, or use prefers-reduced-motion media query to conditionally apply animations. Consider using Tailwind\'s motion-reduce: prefix or checking window.matchMedia("(prefers-reduced-motion: reduce)").',
                effort: 'low'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error checking motion reduction in ${component.name}:`, error);
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
   * Check for motion reduction support
   */
  private hasMotionReduceSupport(content: string): boolean {
    const motionReducePatterns = [
      /motion-reduce:/,
      /prefers-reduced-motion/,
      /matchMedia.*prefers-reduced-motion/,
      /reduceMotion/,
      /disableAnimation/,
      /shouldReduceMotion/
    ];

    return motionReducePatterns.some(pattern => pattern.test(content));
  }

  /**
   * Run all accessibility analyses
   */
  analyzeAll(components: ComponentFile[]): {
    keyboardNavigation: Issue[];
    ariaAttributes: Issue[];
    focusIndicators: Issue[];
    motionReduction: Issue[];
    allIssues: Issue[];
  } {
    const keyboardNavigation = this.checkKeyboardNavigationSupport(components);
    const ariaAttributes = this.verifyARIAAttributes(components);
    const focusIndicators = this.checkFocusIndicatorStyles(components);
    const motionReduction = this.verifyMotionReductionSupport(components);

    const allIssues = [
      ...keyboardNavigation,
      ...ariaAttributes,
      ...focusIndicators,
      ...motionReduction
    ];

    return {
      keyboardNavigation,
      ariaAttributes,
      focusIndicators,
      motionReduction,
      allIssues
    };
  }
}
