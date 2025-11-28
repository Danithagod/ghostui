/**
 * Testing analyzer for evaluating test coverage and quality
 * Validates Requirements 3.1, 3.2, 3.4
 */

import * as fs from 'fs';
import * as path from 'path';
import { Issue, ComponentFile, TestFile } from './types';
import { IssueCollector } from './issueCollector';

export interface TestCoverageAnalysis {
  componentsWithoutTests: string[];
  componentsWithTests: string[];
  testCoveragePercentage: number;
  issues: Issue[];
}

export interface TestCompletenessAnalysis {
  testsWithIncompleteRendering: string[];
  testsWithIncompletePropVariations: string[];
  testsWithIncompleteInteractions: string[];
  issues: Issue[];
}

export interface TestConsistencyAnalysis {
  testsWithInconsistentNaming: string[];
  testsWithInconsistentStructure: string[];
  issues: Issue[];
}

export class TestingAnalyzer {
  private issueCollector: IssueCollector;
  private componentsPath: string;

  constructor(rootPath: string = process.cwd()) {
    this.issueCollector = new IssueCollector();
    
    // Normalize the root path
    if (rootPath.endsWith('packages/ghostui') || rootPath.endsWith('packages\\ghostui')) {
      this.componentsPath = path.join(rootPath, 'src/components');
    } else {
      this.componentsPath = path.join(rootPath, 'packages/ghostui/src/components');
    }
  }

  /**
   * Check test file existence for all components
   * Validates Requirement 3.1
   */
  checkTestFileExistence(components: ComponentFile[]): TestCoverageAnalysis {
    const componentsWithoutTests: string[] = [];
    const componentsWithTests: string[] = [];
    const issues: Issue[] = [];

    for (const component of components) {
      if (!component.hasTest) {
        componentsWithoutTests.push(component.name);
        
        issues.push(
          this.issueCollector.createIssue({
            severity: 'medium',
            category: 'testing',
            requirement: '3.1',
            title: `Missing test file for ${component.name}`,
            description: `Component ${component.name} does not have a corresponding test file.`,
            location: component.path,
            recommendation: `Create a test file at ${path.join(path.dirname(component.path), `${component.name}.test.tsx`)} with basic rendering, prop variation, and interaction tests.`,
            effort: 'medium'
          })
        );
      } else {
        componentsWithTests.push(component.name);
      }
    }

    const testCoveragePercentage = components.length > 0
      ? (componentsWithTests.length / components.length) * 100
      : 0;

    return {
      componentsWithoutTests,
      componentsWithTests,
      testCoveragePercentage,
      issues
    };
  }

  /**
   * Analyze test coverage completeness
   * Validates Requirement 3.2
   */
  analyzeTestCompleteness(components: ComponentFile[]): TestCompletenessAnalysis {
    const testsWithIncompleteRendering: string[] = [];
    const testsWithIncompletePropVariations: string[] = [];
    const testsWithIncompleteInteractions: string[] = [];
    const issues: Issue[] = [];

    for (const component of components) {
      if (!component.hasTest) {
        continue; // Skip components without tests
      }

      const testPath = path.join(this.componentsPath, `${component.name}.test.tsx`);
      
      try {
        const testContent = fs.readFileSync(testPath, 'utf-8');
        
        // Check for rendering tests
        const hasRenderingTest = this.hasRenderingTest(testContent);
        if (!hasRenderingTest) {
          testsWithIncompleteRendering.push(component.name);
          issues.push(
            this.issueCollector.createIssue({
              severity: 'medium',
              category: 'testing',
              requirement: '3.2',
              title: `Missing rendering test in ${component.name}`,
              description: `Test file for ${component.name} does not include basic rendering tests.`,
              location: testPath,
              recommendation: 'Add a test that verifies the component renders without crashing, such as: it("should render without crashing", () => { render(<Component />); expect(...).toBeInTheDocument(); });',
              effort: 'low'
            })
          );
        }

        // Check for prop variation tests
        const hasPropVariationTests = this.hasPropVariationTests(testContent);
        if (!hasPropVariationTests) {
          testsWithIncompletePropVariations.push(component.name);
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'testing',
              requirement: '3.2',
              title: `Missing prop variation tests in ${component.name}`,
              description: `Test file for ${component.name} does not include tests for different prop values.`,
              location: testPath,
              recommendation: 'Add tests that verify the component behaves correctly with different prop values, testing various configurations and edge cases.',
              effort: 'medium'
            })
          );
        }

        // Check for interaction tests (if component is interactive)
        const isInteractive = this.isInteractiveComponent(component.path);
        if (isInteractive) {
          const hasInteractionTests = this.hasInteractionTests(testContent);
          if (!hasInteractionTests) {
            testsWithIncompleteInteractions.push(component.name);
            issues.push(
              this.issueCollector.createIssue({
                severity: 'medium',
                category: 'testing',
                requirement: '3.2',
                title: `Missing interaction tests in ${component.name}`,
                description: `Test file for ${component.name} does not include user interaction tests for an interactive component.`,
                location: testPath,
                recommendation: 'Add tests that simulate user interactions using fireEvent or userEvent, such as clicks, keyboard input, focus/blur events, etc.',
                effort: 'medium'
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error analyzing test file ${testPath}:`, error);
      }
    }

    return {
      testsWithIncompleteRendering,
      testsWithIncompletePropVariations,
      testsWithIncompleteInteractions,
      issues
    };
  }

  /**
   * Verify test file consistency
   * Validates Requirement 3.4
   */
  verifyTestConsistency(components: ComponentFile[]): TestConsistencyAnalysis {
    const testsWithInconsistentNaming: string[] = [];
    const testsWithInconsistentStructure: string[] = [];
    const issues: Issue[] = [];

    for (const component of components) {
      if (!component.hasTest) {
        continue;
      }

      const testPath = path.join(this.componentsPath, `${component.name}.test.tsx`);
      
      try {
        const testContent = fs.readFileSync(testPath, 'utf-8');
        
        // Check naming convention
        const expectedTestFileName = `${component.name}.test.tsx`;
        const actualTestFileName = path.basename(testPath);
        
        if (actualTestFileName !== expectedTestFileName) {
          testsWithInconsistentNaming.push(component.name);
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'testing',
              requirement: '3.4',
              title: `Inconsistent test file naming for ${component.name}`,
              description: `Test file should be named ${expectedTestFileName} but is named ${actualTestFileName}.`,
              location: testPath,
              recommendation: `Rename the test file to ${expectedTestFileName} to follow the standard naming convention.`,
              effort: 'low'
            })
          );
        }

        // Check for describe/it structure
        const hasDescribeBlock = /describe\s*\(/g.test(testContent);
        const hasItBlock = /it\s*\(/g.test(testContent);
        
        if (!hasDescribeBlock || !hasItBlock) {
          testsWithInconsistentStructure.push(component.name);
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'testing',
              requirement: '3.4',
              title: `Inconsistent test structure in ${component.name}`,
              description: `Test file for ${component.name} does not follow the standard describe/it block structure.`,
              location: testPath,
              recommendation: 'Organize tests using describe() blocks to group related tests and it() blocks for individual test cases.',
              effort: 'low'
            })
          );
        }

        // Check for proper imports
        const hasVitest = testContent.includes('from \'vitest\'') || testContent.includes('from "vitest"');
        const hasTestingLibrary = testContent.includes('@testing-library/react');
        
        if (!hasVitest || !hasTestingLibrary) {
          testsWithInconsistentStructure.push(component.name);
          issues.push(
            this.issueCollector.createIssue({
              severity: 'low',
              category: 'testing',
              requirement: '3.4',
              title: `Missing standard test imports in ${component.name}`,
              description: `Test file for ${component.name} is missing standard imports from vitest or @testing-library/react.`,
              location: testPath,
              recommendation: 'Add imports: import { describe, it, expect } from \'vitest\'; and import { render, screen } from \'@testing-library/react\';',
              effort: 'low'
            })
          );
        }
      } catch (error) {
        console.error(`Error analyzing test consistency for ${testPath}:`, error);
      }
    }

    return {
      testsWithInconsistentNaming,
      testsWithInconsistentStructure,
      issues
    };
  }

  /**
   * Check if test content includes rendering tests
   */
  private hasRenderingTest(testContent: string): boolean {
    // Look for common rendering test patterns
    const renderingPatterns = [
      /render\s*\(/,
      /toBeInTheDocument\s*\(/,
      /should\s+render/i,
      /renders?\s+without\s+crashing/i
    ];

    return renderingPatterns.some(pattern => pattern.test(testContent));
  }

  /**
   * Check if test content includes prop variation tests
   */
  private hasPropVariationTests(testContent: string): boolean {
    // Look for multiple test cases that likely test different props
    const itBlocks = testContent.match(/it\s*\(/g);
    
    // If there are multiple test cases, assume some test prop variations
    if (itBlocks && itBlocks.length >= 3) {
      return true;
    }

    // Look for explicit prop testing patterns
    const propTestPatterns = [
      /with\s+\w+\s+prop/i,
      /when\s+\w+\s+is/i,
      /should\s+\w+\s+when/i,
      /variant/i,
      /className/i
    ];

    return propTestPatterns.some(pattern => pattern.test(testContent));
  }

  /**
   * Check if test content includes interaction tests
   */
  private hasInteractionTests(testContent: string): boolean {
    // Look for interaction testing patterns
    const interactionPatterns = [
      /fireEvent\./,
      /userEvent\./,
      /click/i,
      /change/i,
      /focus/i,
      /blur/i,
      /keyDown/i,
      /keyPress/i,
      /submit/i
    ];

    return interactionPatterns.some(pattern => pattern.test(testContent));
  }

  /**
   * Determine if a component is interactive based on its content
   */
  private isInteractiveComponent(componentPath: string): boolean {
    try {
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      // Look for interactive patterns
      const interactivePatterns = [
        /onClick/,
        /onChange/,
        /onFocus/,
        /onBlur/,
        /onKeyDown/,
        /onKeyPress/,
        /onSubmit/,
        /<button/i,
        /<input/i,
        /<textarea/i,
        /<select/i,
        /role="button"/,
        /tabIndex/
      ];

      return interactivePatterns.some(pattern => pattern.test(content));
    } catch (error) {
      console.error(`Error reading component file ${componentPath}:`, error);
      return false;
    }
  }

  /**
   * Run all testing analyses
   */
  analyzeAll(components: ComponentFile[]): {
    coverage: TestCoverageAnalysis;
    completeness: TestCompletenessAnalysis;
    consistency: TestConsistencyAnalysis;
    allIssues: Issue[];
  } {
    const coverage = this.checkTestFileExistence(components);
    const completeness = this.analyzeTestCompleteness(components);
    const consistency = this.verifyTestConsistency(components);

    const allIssues = [
      ...coverage.issues,
      ...completeness.issues,
      ...consistency.issues
    ];

    return {
      coverage,
      completeness,
      consistency,
      allIssues
    };
  }
}
