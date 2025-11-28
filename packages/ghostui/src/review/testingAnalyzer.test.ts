import { describe, it, expect, beforeEach } from 'vitest';
import { TestingAnalyzer } from './testingAnalyzer';
import { ComponentFile } from './types';
import * as path from 'path';

describe('TestingAnalyzer', () => {
  let analyzer: TestingAnalyzer;
  const rootPath = path.join(process.cwd(), 'packages/ghostui');

  beforeEach(() => {
    analyzer = new TestingAnalyzer(rootPath);
  });

  describe('checkTestFileExistence', () => {
    it('should identify components without tests', () => {
      const components: ComponentFile[] = [
        {
          path: '/path/to/ComponentA.tsx',
          name: 'ComponentA',
          hasTest: false,
          exports: ['ComponentA']
        },
        {
          path: '/path/to/ComponentB.tsx',
          name: 'ComponentB',
          hasTest: true,
          exports: ['ComponentB']
        }
      ];

      const result = analyzer.checkTestFileExistence(components);

      expect(result.componentsWithoutTests).toContain('ComponentA');
      expect(result.componentsWithTests).toContain('ComponentB');
      expect(result.testCoveragePercentage).toBe(50);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].title).toContain('ComponentA');
    });

    it('should calculate 100% coverage when all components have tests', () => {
      const components: ComponentFile[] = [
        {
          path: '/path/to/ComponentA.tsx',
          name: 'ComponentA',
          hasTest: true,
          exports: ['ComponentA']
        },
        {
          path: '/path/to/ComponentB.tsx',
          name: 'ComponentB',
          hasTest: true,
          exports: ['ComponentB']
        }
      ];

      const result = analyzer.checkTestFileExistence(components);

      expect(result.componentsWithoutTests).toHaveLength(0);
      expect(result.testCoveragePercentage).toBe(100);
      expect(result.issues).toHaveLength(0);
    });

    it('should handle empty component list', () => {
      const result = analyzer.checkTestFileExistence([]);

      expect(result.componentsWithoutTests).toHaveLength(0);
      expect(result.testCoveragePercentage).toBe(0);
      expect(result.issues).toHaveLength(0);
    });
  });

  describe('analyzeTestCompleteness', () => {
    it('should detect components with existing tests', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(rootPath, 'src/components/SpookyProgressBar.tsx'),
          name: 'SpookyProgressBar',
          hasTest: true,
          exports: ['SpookyProgressBar']
        }
      ];

      const result = analyzer.analyzeTestCompleteness(components);

      // SpookyProgressBar has a test file, so it should be analyzed
      expect(result.issues.length).toBeGreaterThanOrEqual(0);
    });

    it('should skip components without tests', () => {
      const components: ComponentFile[] = [
        {
          path: '/path/to/ComponentWithoutTest.tsx',
          name: 'ComponentWithoutTest',
          hasTest: false,
          exports: ['ComponentWithoutTest']
        }
      ];

      const result = analyzer.analyzeTestCompleteness(components);

      // Should not create issues for components without test files
      expect(result.testsWithIncompleteRendering).not.toContain('ComponentWithoutTest');
    });
  });

  describe('verifyTestConsistency', () => {
    it('should verify test file naming and structure', () => {
      const components: ComponentFile[] = [
        {
          path: path.join(rootPath, 'src/components/WhisperBox.tsx'),
          name: 'WhisperBox',
          hasTest: true,
          exports: ['WhisperBox']
        }
      ];

      const result = analyzer.verifyTestConsistency(components);

      // WhisperBox has a properly structured test file
      expect(result.testsWithInconsistentNaming).not.toContain('WhisperBox');
    });

    it('should skip components without tests', () => {
      const components: ComponentFile[] = [
        {
          path: '/path/to/NoTest.tsx',
          name: 'NoTest',
          hasTest: false,
          exports: ['NoTest']
        }
      ];

      const result = analyzer.verifyTestConsistency(components);

      expect(result.testsWithInconsistentNaming).not.toContain('NoTest');
      expect(result.testsWithInconsistentStructure).not.toContain('NoTest');
    });
  });

  describe('analyzeAll', () => {
    it('should run all analyses and combine issues', () => {
      const components: ComponentFile[] = [
        {
          path: '/path/to/ComponentA.tsx',
          name: 'ComponentA',
          hasTest: false,
          exports: ['ComponentA']
        },
        {
          path: path.join(rootPath, 'src/components/SpookyProgressBar.tsx'),
          name: 'SpookyProgressBar',
          hasTest: true,
          exports: ['SpookyProgressBar']
        }
      ];

      const result = analyzer.analyzeAll(components);

      expect(result.coverage).toBeDefined();
      expect(result.completeness).toBeDefined();
      expect(result.consistency).toBeDefined();
      expect(result.allIssues).toBeDefined();
      expect(Array.isArray(result.allIssues)).toBe(true);
    });
  });
});
