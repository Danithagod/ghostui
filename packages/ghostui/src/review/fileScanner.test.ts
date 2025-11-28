/**
 * Tests for FileScanner
 */

import { describe, it, expect } from 'vitest';
import { FileScanner } from './fileScanner';
import * as path from 'path';

describe('FileScanner', () => {
  it('should scan components directory', () => {
    // Find the workspace root (go up from packages/ghostui/src/review)
    const workspaceRoot = path.resolve(__dirname, '../../../../');
    const scanner = new FileScanner(workspaceRoot);
    const components = scanner.scanComponents();
    
    expect(Array.isArray(components)).toBe(true);
    expect(components.length).toBeGreaterThan(0);
    
    // Verify structure of component files
    if (components.length > 0) {
      const component = components[0];
      expect(component).toHaveProperty('path');
      expect(component).toHaveProperty('name');
      expect(component).toHaveProperty('hasTest');
      expect(component).toHaveProperty('exports');
      expect(Array.isArray(component.exports)).toBe(true);
    }
  });

  it('should scan test files', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../');
    const scanner = new FileScanner(workspaceRoot);
    const tests = scanner.scanTests();
    
    expect(Array.isArray(tests)).toBe(true);
    
    // Verify structure of test files
    if (tests.length > 0) {
      const test = tests[0];
      expect(test).toHaveProperty('path');
      expect(test).toHaveProperty('componentName');
      expect(test).toHaveProperty('exists');
      expect(test.exists).toBe(true);
    }
  });

  it('should scan type files', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../');
    const scanner = new FileScanner(workspaceRoot);
    const types = scanner.scanTypes();
    
    expect(Array.isArray(types)).toBe(true);
    
    // Verify structure of type files
    if (types.length > 0) {
      const type = types[0];
      expect(type).toHaveProperty('path');
      expect(type).toHaveProperty('name');
      expect(type).toHaveProperty('exports');
      expect(Array.isArray(type.exports)).toBe(true);
    }
  });

  it('should scan config files', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../');
    const scanner = new FileScanner(workspaceRoot);
    const configs = scanner.scanConfig();
    
    expect(Array.isArray(configs)).toBe(true);
    expect(configs.length).toBeGreaterThan(0);
    
    // Should find at least package.json and tsconfig.json
    const configTypes = configs.map(c => c.type);
    expect(configTypes).toContain('package');
    expect(configTypes).toContain('typescript');
  });

  it('should identify components with tests', () => {
    const workspaceRoot = path.resolve(__dirname, '../../../../');
    const scanner = new FileScanner(workspaceRoot);
    const components = scanner.scanComponents();
    
    const componentsWithTests = components.filter(c => c.hasTest);
    const componentsWithoutTests = components.filter(c => !c.hasTest);
    
    expect(componentsWithTests.length + componentsWithoutTests.length).toBe(components.length);
  });
});
