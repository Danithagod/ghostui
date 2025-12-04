import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Property-based tests for cn utility consistency
 * 
 * Feature: component-consistency-analysis, Property 1: Shared utility import consistency
 * Validates: Requirements 1.1, 1.2
 * 
 * For any component file in the components directory that uses className merging,
 * the file should import `cn` from `../lib/utils` and should NOT define a local `cn` function.
 */

describe('cn Utility Consistency - Property-Based Tests', () => {
  // Get all component files (excluding test files, index files, and subdirectories)
  const componentsDir = path.join(__dirname);
  const componentFiles = fs.readdirSync(componentsDir)
    .filter(f => 
      f.endsWith('.tsx') && 
      !f.includes('.test.') && 
      !f.includes('.property.') &&
      f !== 'index.ts'
    );

  /**
   * Feature: component-consistency-analysis, Property 1: Shared utility import consistency
   * Validates: Requirements 1.1, 1.2
   * 
   * For any component file that uses the cn function, it should import from ../lib/utils
   * and should NOT have a local cn function definition.
   */
  it('Property 1: No component should have a local cn function definition', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (filename) => {
          const filePath = path.join(componentsDir, filename);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Pattern to detect local cn function definitions
          const localCnPatterns = [
            /function\s+cn\s*\(/,           // function cn(
            /const\s+cn\s*=\s*\(/,          // const cn = (
            /const\s+cn\s*=\s*function/,    // const cn = function
          ];
          
          const hasLocalCn = localCnPatterns.some(pattern => pattern.test(content));
          
          // If the file has a local cn definition, the test fails
          if (hasLocalCn) {
            return false;
          }
          
          return true;
        }
      ),
      { numRuns: componentFiles.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 1: Shared utility import consistency
   * Validates: Requirements 1.1, 1.2
   * 
   * For any component file that uses cn(), it should import cn from ../lib/utils
   */
  it('Property 1: Components using cn should import from ../lib/utils', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (filename) => {
          const filePath = path.join(componentsDir, filename);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if the file uses cn function (cn( pattern)
          const usesCn = /\bcn\s*\(/.test(content);
          
          if (!usesCn) {
            // If the file doesn't use cn, it passes
            return true;
          }
          
          // If it uses cn, it must import from ../lib/utils
          const importsFromUtils = /import\s*{[^}]*\bcn\b[^}]*}\s*from\s*['"]\.\.\/lib\/utils['"]/.test(content);
          
          return importsFromUtils;
        }
      ),
      { numRuns: componentFiles.length }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 1: Shared utility import consistency
   * Validates: Requirements 1.1, 1.2
   * 
   * For any component file, it should NOT import clsx and twMerge directly if it uses cn
   * (these should only be in the shared utils file)
   */
  it('Property 1: Components should not import clsx/twMerge directly when using cn', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...componentFiles),
        (filename) => {
          const filePath = path.join(componentsDir, filename);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Check if the file uses cn function
          const usesCn = /\bcn\s*\(/.test(content);
          
          if (!usesCn) {
            // If the file doesn't use cn, it passes
            return true;
          }
          
          // Check if it imports cn from utils
          const importsFromUtils = /import\s*{[^}]*\bcn\b[^}]*}\s*from\s*['"]\.\.\/lib\/utils['"]/.test(content);
          
          if (importsFromUtils) {
            // If it imports cn from utils, it should NOT import clsx or twMerge directly
            const importsClsx = /import\s*{[^}]*clsx[^}]*}\s*from\s*['"]clsx['"]/.test(content);
            const importsTwMerge = /import\s*{[^}]*twMerge[^}]*}\s*from\s*['"]tailwind-merge['"]/.test(content);
            
            // Should not have direct imports of clsx or twMerge
            return !importsClsx && !importsTwMerge;
          }
          
          return true;
        }
      ),
      { numRuns: componentFiles.length }
    );
  });
});
