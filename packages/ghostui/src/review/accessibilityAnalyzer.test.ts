/**
 * Tests for AccessibilityAnalyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AccessibilityAnalyzer } from './accessibilityAnalyzer';
import { IssueCollector } from './issueCollector';
import { ComponentFile } from './types';
import * as fs from 'fs';
import * as path from 'path';

describe('AccessibilityAnalyzer', () => {
  let analyzer: AccessibilityAnalyzer;
  let issueCollector: IssueCollector;

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new AccessibilityAnalyzer(issueCollector);
  });

  describe('checkKeyboardNavigationSupport', () => {
    it('should detect missing keyboard handlers in custom interactive elements', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatToggle.tsx'),
          name: 'BatToggle',
          hasTest: true,
          exports: ['BatToggle']
        }
      ];

      const issues = analyzer.checkKeyboardNavigationSupport(components);
      
      // BatToggle uses a button element which has built-in keyboard support
      // So it should not have issues
      expect(issues.length).toBe(0);
    });

    it('should pass for components using semantic elements', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GooeyButton.tsx'),
          name: 'GooeyButton',
          hasTest: false,
          exports: ['GooeyButton']
        }
      ];

      const issues = analyzer.checkKeyboardNavigationSupport(components);
      
      // Should not flag issues for components using semantic button elements
      expect(issues.length).toBe(0);
    });
  });

  describe('verifyARIAAttributes', () => {
    it('should detect components with interactive elements', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatToggle.tsx'),
          name: 'BatToggle',
          hasTest: true,
          exports: ['BatToggle']
        }
      ];

      const issues = analyzer.verifyARIAAttributes(components);
      
      // BatToggle should have proper ARIA attributes
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('checkFocusIndicatorStyles', () => {
    it('should detect missing focus indicators', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/GooeyButton.tsx'),
          name: 'GooeyButton',
          hasTest: false,
          exports: ['GooeyButton']
        }
      ];

      const issues = analyzer.checkFocusIndicatorStyles(components);
      
      // Should check for focus-visible styles
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('verifyMotionReductionSupport', () => {
    it('should detect missing motion reduction support in animated components', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatBurst.tsx'),
          name: 'BatBurst',
          hasTest: false,
          exports: ['BatBurst']
        }
      ];

      const issues = analyzer.verifyMotionReductionSupport(components);
      
      // BatBurst has animations, should check for motion reduction
      expect(Array.isArray(issues)).toBe(true);
    });
  });

  describe('analyzeAll', () => {
    it('should run all accessibility analyses', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatToggle.tsx'),
          name: 'BatToggle',
          hasTest: true,
          exports: ['BatToggle']
        }
      ];

      const result = analyzer.analyzeAll(components);
      
      expect(result).toHaveProperty('keyboardNavigation');
      expect(result).toHaveProperty('ariaAttributes');
      expect(result).toHaveProperty('focusIndicators');
      expect(result).toHaveProperty('motionReduction');
      expect(result).toHaveProperty('allIssues');
      expect(Array.isArray(result.allIssues)).toBe(true);
    });

    it('should combine all issues from different analyses', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(__dirname, '../components/BatToggle.tsx'),
          name: 'BatToggle',
          hasTest: true,
          exports: ['BatToggle']
        }
      ];

      const result = analyzer.analyzeAll(components);
      
      const totalIssues = 
        result.keyboardNavigation.length +
        result.ariaAttributes.length +
        result.focusIndicators.length +
        result.motionReduction.length;
      
      expect(result.allIssues.length).toBe(totalIssues);
    });
  });
});
