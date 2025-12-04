/**
 * File Scanner for Documentation Audit Tool
 *
 * Discovers and reads all component documentation pages in the GhostUI Docs application.
 *
 * Requirements: 7.1
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { ComponentPage } from './types';

/**
 * FileScanner class for discovering and reading component documentation pages
 */
export class FileScanner {
  private readonly componentsDir: string;
  private readonly basePath: string;

  /**
   * Creates a new FileScanner instance
   * @param basePath - Base path to the docs app (defaults to '.' for current directory)
   */
  constructor(basePath: string = '.') {
    this.basePath = basePath;
    this.componentsDir = path.join(basePath, 'app', 'docs', 'components');
  }

  /**
   * Scans the components directory and returns all component pages
   * @returns Array of ComponentPage objects
   */
  async scanComponentPages(): Promise<ComponentPage[]> {
    const componentPages: ComponentPage[] = [];

    try {
      // Read all directories in the components folder
      const entries = await fs.readdir(this.componentsDir, { withFileTypes: true });

      // Filter to only directories (each component has its own folder)
      const componentDirs = entries.filter((entry) => entry.isDirectory());

      // Process each component directory
      for (const dir of componentDirs) {
        const pageFilePath = path.join(this.componentsDir, dir.name, 'page.tsx');

        try {
          const content = await this.readPageContent(pageFilePath);
          const componentName = this.extractComponentName(pageFilePath);

          componentPages.push({
            filePath: pageFilePath,
            componentName,
            content,
          });
        } catch {
          // Skip directories without page.tsx files
          // This is expected for empty or incomplete component directories
        }
      }
    } catch (error) {
      // If the components directory doesn't exist, return empty array
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }

    return componentPages;
  }

  /**
   * Reads the content of a page file
   * @param filePath - Path to the page.tsx file
   * @returns File content as string
   */
  async readPageContent(filePath: string): Promise<string> {
    return fs.readFile(filePath, 'utf-8');
  }

  /**
   * Extracts the component name from the file path
   * @param filePath - Path to the page.tsx file
   * @returns Component name (e.g., 'gooey-button')
   */
  extractComponentName(filePath: string): string {
    // Path format: .../components/{component-name}/page.tsx
    const parts = filePath.split(path.sep);
    const pageIndex = parts.indexOf('page.tsx');

    if (pageIndex > 0) {
      return parts[pageIndex - 1];
    }

    // Fallback: try to extract from the path using regex
    const match = filePath.match(/components[/\\]([^/\\]+)[/\\]page\.tsx$/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Gets the components directory path
   * @returns The path to the components directory
   */
  getComponentsDir(): string {
    return this.componentsDir;
  }
}
