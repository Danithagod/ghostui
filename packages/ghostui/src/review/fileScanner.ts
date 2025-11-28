/**
 * File scanner for discovering components, tests, types, and configuration files
 */

import * as fs from 'fs';
import * as path from 'path';
import { ComponentFile, TestFile, TypeFile, ConfigFile } from './types';

export class FileScanner {
  private rootPath: string;
  private componentsPath: string;

  constructor(rootPath: string = process.cwd()) {
    // Normalize the root path - if we're already in packages/ghostui, don't add it again
    if (rootPath.endsWith('packages/ghostui') || rootPath.endsWith('packages\\ghostui')) {
      this.rootPath = rootPath;
      this.componentsPath = path.join(rootPath, 'src/components');
    } else {
      this.rootPath = rootPath;
      this.componentsPath = path.join(rootPath, 'packages/ghostui/src/components');
    }
  }

  /**
   * Scan for all component files
   */
  scanComponents(): ComponentFile[] {
    const components: ComponentFile[] = [];
    
    if (!fs.existsSync(this.componentsPath)) {
      return components;
    }

    const files = fs.readdirSync(this.componentsPath);
    
    for (const file of files) {
      // Skip test files, index files, and non-tsx files
      if (file.endsWith('.test.tsx') || file === 'index.ts' || !file.endsWith('.tsx')) {
        continue;
      }

      const componentName = file.replace('.tsx', '');
      const componentPath = path.join(this.componentsPath, file);
      const testPath = path.join(this.componentsPath, `${componentName}.test.tsx`);
      const hasTest = fs.existsSync(testPath);

      // Extract exports by reading the file
      const exports = this.extractExports(componentPath);

      components.push({
        path: componentPath,
        name: componentName,
        hasTest,
        exports
      });
    }

    return components;
  }

  /**
   * Scan for all test files
   */
  scanTests(): TestFile[] {
    const tests: TestFile[] = [];
    
    if (!fs.existsSync(this.componentsPath)) {
      return tests;
    }

    const files = fs.readdirSync(this.componentsPath);
    
    for (const file of files) {
      if (file.endsWith('.test.tsx')) {
        const componentName = file.replace('.test.tsx', '');
        const testPath = path.join(this.componentsPath, file);

        tests.push({
          path: testPath,
          componentName,
          exists: true
        });
      }
    }

    return tests;
  }

  /**
   * Scan for type definition files
   */
  scanTypes(): TypeFile[] {
    const types: TypeFile[] = [];
    const typesPath = this.rootPath.endsWith('packages/ghostui') || this.rootPath.endsWith('packages\\ghostui')
      ? path.join(this.rootPath, 'src/types')
      : path.join(this.rootPath, 'packages/ghostui/src/types');
    
    if (!fs.existsSync(typesPath)) {
      return types;
    }

    const files = fs.readdirSync(typesPath);
    
    for (const file of files) {
      if (file.endsWith('.ts')) {
        const typePath = path.join(typesPath, file);
        const exports = this.extractExports(typePath);

        types.push({
          path: typePath,
          name: file.replace('.ts', ''),
          exports
        });
      }
    }

    return types;
  }

  /**
   * Scan for configuration files
   */
  scanConfig(): ConfigFile[] {
    const configs: ConfigFile[] = [];
    const packagePath = this.rootPath.endsWith('packages/ghostui') || this.rootPath.endsWith('packages\\ghostui')
      ? this.rootPath
      : path.join(this.rootPath, 'packages/ghostui');

    const configFiles = [
      { file: 'tsconfig.json', type: 'typescript' as const },
      { file: 'vite.config.ts', type: 'vite' as const },
      { file: 'package.json', type: 'package' as const },
      { file: 'eslint.config.mjs', type: 'eslint' as const },
      { file: '.eslintrc.json', type: 'eslint' as const },
      { file: '.eslintrc.js', type: 'eslint' as const }
    ];

    for (const { file, type } of configFiles) {
      const configPath = path.join(packagePath, file);
      if (fs.existsSync(configPath)) {
        configs.push({
          path: configPath,
          type,
          content: fs.readFileSync(configPath, 'utf-8')
        });
      }
    }

    return configs;
  }

  /**
   * Extract exports from a file by parsing export statements
   */
  private extractExports(filePath: string): string[] {
    const exports: string[] = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Match export statements
      const exportRegex = /export\s+(?:default\s+)?(?:interface|type|const|function|class)\s+(\w+)/g;
      let match;
      
      while ((match = exportRegex.exec(content)) !== null) {
        exports.push(match[1]);
      }

      // Match named exports
      const namedExportRegex = /export\s+\{\s*([^}]+)\s*\}/g;
      while ((match = namedExportRegex.exec(content)) !== null) {
        const names = match[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0]);
        exports.push(...names);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }

    return exports;
  }

  /**
   * Get the main index file path
   */
  getIndexPath(): string {
    if (this.rootPath.endsWith('packages/ghostui') || this.rootPath.endsWith('packages\\ghostui')) {
      return path.join(this.rootPath, 'src/index.ts');
    }
    return path.join(this.rootPath, 'packages/ghostui/src/index.ts');
  }

  /**
   * Get the components index file path
   */
  getComponentsIndexPath(): string {
    return path.join(this.componentsPath, 'index.ts');
  }
}
