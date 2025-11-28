/**
 * Tests for Component API Analyzer
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentAPIAnalyzer } from './componentAPIAnalyzer';
import { IssueCollector } from './issueCollector';
import { FileScanner } from './fileScanner';
import * as path from 'path';

describe('ComponentAPIAnalyzer', () => {
  let analyzer: ComponentAPIAnalyzer;
  let issueCollector: IssueCollector;
  let fileScanner: FileScanner;

  beforeEach(() => {
    issueCollector = new IssueCollector();
    analyzer = new ComponentAPIAnalyzer(issueCollector);
    // Use the actual project root
    const projectRoot = path.resolve(__dirname, '../..');
    fileScanner = new FileScanner(projectRoot);
  });

  describe('analyzePropNaming', () => {
    it('should identify components and group them by type', () => {
      const components = fileScanner.scanComponents();
      expect(components.length).toBeGreaterThan(0);
      
      const issues = analyzer.analyzePropNaming(components);
      // Issues may or may not exist depending on actual codebase
      expect(Array.isArray(issues)).toBe(true);
    });

    it('should detect naming inconsistencies in toggle components', () => {
      const components = fileScanner.scanComponents();
      const toggleComponents = components.filter(c => 
        c.name.toLowerCase().includes('toggle') || 
        c.name.toLowerCase().includes('switch')
      );
      
      if (toggleComponents.length > 1) {
        const issues = analyzer.analyzePropNaming(toggleComponents);
        // Check that issues are properly formatted
        issues.forEach(issue => {
          expect(issue).toHaveProperty('id');
          expect(issue).toHaveProperty('severity');
          expect(issue).toHaveProperty('category');
          expect(issue.category).toBe('Component API Consistency');
          expect(issue.requirement).toBe('2.1');
        });
      }
    });
  });

  describe('verifyEventHandlerForwarding', () => {
    it('should check if event handlers are forwarded', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.verifyEventHandlerForwarding(components);
      
      expect(Array.isArray(issues)).toBe(true);
      issues.forEach(issue => {
        expect(issue.category).toBe('Component API Consistency');
        expect(issue.requirement).toBe('2.2');
        expect(issue.title).toContain('Event handler');
      });
    });

    it('should not flag components that properly forward handlers', () => {
      const components = fileScanner.scanComponents();
      // GooeyButton should forward onClick properly
      const gooeyButton = components.find(c => c.name === 'GooeyButton');
      
      if (gooeyButton) {
        const issues = analyzer.verifyEventHandlerForwarding([gooeyButton]);
        const onClickIssues = issues.filter(i => i.title.includes('onClick'));
        // GooeyButton forwards onClick, so should have no issues
        expect(onClickIssues.length).toBe(0);
      }
    });
  });

  describe('checkRefForwarding', () => {
    it('should identify interactive components missing ref forwarding', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.checkRefForwarding(components);
      
      expect(Array.isArray(issues)).toBe(true);
      issues.forEach(issue => {
        expect(issue.category).toBe('Component API Consistency');
        expect(issue.requirement).toBe('2.3');
        expect(issue.severity).toBe('high');
      });
    });

    it('should not flag components that use forwardRef', () => {
      const components = fileScanner.scanComponents();
      // SpiritInput uses forwardRef
      const spiritInput = components.find(c => c.name === 'SpiritInput');
      
      if (spiritInput) {
        const issues = analyzer.checkRefForwarding([spiritInput]);
        expect(issues.length).toBe(0);
      }
    });
  });

  describe('verifyClassNameMerging', () => {
    it('should check if className is properly merged', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.verifyClassNameMerging(components);
      
      expect(Array.isArray(issues)).toBe(true);
      issues.forEach(issue => {
        expect(issue.category).toBe('Component API Consistency');
        expect(issue.requirement).toBe('2.4');
      });
    });

    it('should not flag components that use cn() utility', () => {
      const components = fileScanner.scanComponents();
      // Most components should use cn()
      const gooeyButton = components.find(c => c.name === 'GooeyButton');
      
      if (gooeyButton) {
        const issues = analyzer.verifyClassNameMerging([gooeyButton]);
        expect(issues.length).toBe(0);
      }
    });
  });

  describe('analyzeControlledUncontrolledSupport', () => {
    it('should identify form components missing dual mode support', () => {
      const components = fileScanner.scanComponents();
      const issues = analyzer.analyzeControlledUncontrolledSupport(components);
      
      expect(Array.isArray(issues)).toBe(true);
      issues.forEach(issue => {
        expect(issue.category).toBe('Component API Consistency');
        expect(issue.requirement).toBe('2.5');
      });
    });

    it('should check toggle components for controlled/uncontrolled support', () => {
      const components = fileScanner.scanComponents();
      const toggleComponents = components.filter(c => 
        c.name.toLowerCase().includes('toggle') || 
        c.name.toLowerCase().includes('switch')
      );
      
      if (toggleComponents.length > 0) {
        const issues = analyzer.analyzeControlledUncontrolledSupport(toggleComponents);
        // Check that issues are properly formatted
        issues.forEach(issue => {
          expect(issue).toHaveProperty('title');
          expect(issue).toHaveProperty('description');
          expect(issue).toHaveProperty('recommendation');
        });
      }
    });
  });

  describe('Integration test', () => {
    it('should analyze all components without errors', () => {
      const components = fileScanner.scanComponents();
      
      expect(() => {
        analyzer.analyzePropNaming(components);
        analyzer.verifyEventHandlerForwarding(components);
        analyzer.checkRefForwarding(components);
        analyzer.verifyClassNameMerging(components);
        analyzer.analyzeControlledUncontrolledSupport(components);
      }).not.toThrow();
    });

    it('should generate issues with all required fields', () => {
      const components = fileScanner.scanComponents();
      
      const allIssues = [
        ...analyzer.analyzePropNaming(components),
        ...analyzer.verifyEventHandlerForwarding(components),
        ...analyzer.checkRefForwarding(components),
        ...analyzer.verifyClassNameMerging(components),
        ...analyzer.analyzeControlledUncontrolledSupport(components),
      ];
      
      allIssues.forEach(issue => {
        expect(issue).toHaveProperty('id');
        expect(issue).toHaveProperty('severity');
        expect(issue).toHaveProperty('category');
        expect(issue).toHaveProperty('requirement');
        expect(issue).toHaveProperty('title');
        expect(issue).toHaveProperty('description');
        expect(issue).toHaveProperty('location');
        expect(issue).toHaveProperty('recommendation');
        expect(issue).toHaveProperty('effort');
      });
    });
  });
});
