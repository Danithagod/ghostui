/**
 * TSX Parser for Documentation Audit Tool
 *
 * Parses TSX files and extracts structural information including headers,
 * sections, ComponentPlayground instances, PropsTable components, and code blocks.
 *
 * Requirements: 7.2, 7.3, 7.4, 7.5
 */

import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import {
  ParsedPage,
  Header,
  Section,
  Element,
  ComponentPlaygroundInstance,
  PropsTableInstance,
  PropDefinition,
  CodeBlock,
  InlineCode,
} from './types';

/**
 * TSXParser class for parsing TSX files and extracting documentation structure
 */
export class TSXParser {
  /**
   * Parses TSX content and extracts all relevant structural information
   * @param content - Raw TSX file content
   * @returns ParsedPage object with all extracted information
   */
  parse(content: string): ParsedPage {
    // Parse the TSX content into an AST
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Initialize the parsed page structure
    const parsedPage: ParsedPage = {
      ast,
      headers: [],
      sections: [],
      componentPlaygrounds: [],
      propsTables: [],
      codeBlocks: [],
      inlineCode: [],
      previewContainers: [],
    };

    // Extract all elements from the AST
    this.extractHeaders(ast, content, parsedPage);
    this.extractComponentPlaygrounds(ast, content, parsedPage);
    this.extractPropsTables(ast, content, parsedPage);
    this.extractCodeBlocks(ast, content, parsedPage);
    this.extractInlineCode(ast, content, parsedPage);
    this.extractPreviewContainers(ast, content, parsedPage);
    this.extractRootContainer(ast, content, parsedPage);
    this.identifySections(parsedPage);

    return parsedPage;
  }

  /**
   * Extracts header elements (H1, H2, H3, etc.) from the AST
   */
  private extractHeaders(ast: t.File, content: string, parsedPage: ParsedPage): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        // Check if this is a header element (h1, h2, h3, etc.)
        const headerMatch = tagName?.match(/^h([1-6])$/i);
        if (headerMatch) {
          const level = parseInt(headerMatch[1], 10);
          const lineNumber = openingElement.loc?.start.line || 0;
          const className = this.extractClassName(openingElement);
          const text = this.extractTextContent(path.node);

          parsedPage.headers.push({
            level,
            text,
            className,
            lineNumber,
          });
        }
      },
    });
  }

  /**
   * Extracts ComponentPlayground instances from the AST
   */
  private extractComponentPlaygrounds(
    ast: t.File,
    content: string,
    parsedPage: ParsedPage
  ): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        if (tagName === 'ComponentPlayground') {
          const lineNumber = openingElement.loc?.start.line || 0;
          const props = this.extractProps(openingElement);

          parsedPage.componentPlaygrounds.push({
            lineNumber,
            hasPreview: 'preview' in props,
            hasCode: 'code' in props,
            hasApi: 'api' in props,
            props,
          });
        }
      },
    });
  }

  /**
   * Extracts PropsTable instances from the AST
   */
  private extractPropsTables(ast: t.File, content: string, parsedPage: ParsedPage): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        if (tagName === 'PropsTable') {
          const lineNumber = openingElement.loc?.start.line || 0;
          const propsArray = this.extractPropsArray(openingElement, path);

          parsedPage.propsTables.push({
            lineNumber,
            propsArray,
          });
        }
      },
    });
  }

  /**
   * Extracts code blocks from the AST
   */
  private extractCodeBlocks(ast: t.File, content: string, parsedPage: ParsedPage): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        // Look for <pre> or <code> blocks
        if (tagName === 'pre' || (tagName === 'code' && this.isBlockLevelCode(path))) {
          const lineNumber = openingElement.loc?.start.line || 0;
          const className = this.extractClassName(openingElement);
          const codeContent = this.extractTextContent(path.node);

          parsedPage.codeBlocks.push({
            lineNumber,
            className,
            content: codeContent,
          });
        }
      },
    });
  }

  /**
   * Extracts inline code elements from the AST
   */
  private extractInlineCode(ast: t.File, content: string, parsedPage: ParsedPage): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        // Look for inline <code> elements (not block-level)
        if (tagName === 'code' && !this.isBlockLevelCode(path)) {
          const lineNumber = openingElement.loc?.start.line || 0;
          const className = this.extractClassName(openingElement);
          const codeContent = this.extractTextContent(path.node);

          parsedPage.inlineCode.push({
            lineNumber,
            className,
            content: codeContent,
          });
        }
      },
    });
  }

  /**
   * Extracts preview container elements from the AST
   */
  private extractPreviewContainers(
    ast: t.File,
    content: string,
    parsedPage: ParsedPage
  ): void {
    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const className = this.extractClassName(openingElement);

        // Look for divs that appear to be preview containers
        // (typically have border, rounded, padding classes)
        if (
          this.getJSXElementName(openingElement) === 'div' &&
          (className.includes('border') ||
            className.includes('rounded') ||
            className.includes('preview'))
        ) {
          const lineNumber = openingElement.loc?.start.line || 0;
          const props = this.extractProps(openingElement);

          parsedPage.previewContainers.push({
            type: 'div',
            className,
            lineNumber,
            props,
          });
        }
      },
    });
  }

  /**
   * Extracts the root container element from the AST
   */
  private extractRootContainer(ast: t.File, content: string, parsedPage: ParsedPage): void {
    traverse(ast, {
      ReturnStatement: (path: NodePath<t.ReturnStatement>) => {
        // Look for the return statement in the component function
        const argument = path.node.argument;
        if (argument && t.isJSXElement(argument)) {
          const openingElement = argument.openingElement;
          const lineNumber = openingElement.loc?.start.line || 0;
          const className = this.extractClassName(openingElement);
          const props = this.extractProps(openingElement);

          parsedPage.rootContainer = {
            type: this.getJSXElementName(openingElement) || 'unknown',
            className,
            lineNumber,
            props,
          };
        }
      },
    });
  }

  /**
   * Identifies sections based on headers and their content
   */
  private identifySections(parsedPage: ParsedPage): void {
    const headers = [...parsedPage.headers].sort((a, b) => a.lineNumber - b.lineNumber);

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const nextHeader = headers[i + 1];

      const startLine = header.lineNumber;
      const endLine = nextHeader ? nextHeader.lineNumber - 1 : Infinity;

      // Determine section type based on header text
      const sectionType = this.determineSectionType(header.text, header.level);

      parsedPage.sections.push({
        type: sectionType,
        startLine,
        endLine,
        elements: [], // Elements would be populated if needed
      });
    }
  }

  /**
   * Determines the section type based on header text and level
   */
  private determineSectionType(
    headerText: string,
    level: number
  ): Section['type'] {
    const lowerText = headerText.toLowerCase();

    if (level === 1) return 'header';
    if (lowerText.includes('basic') || lowerText.includes('usage')) return 'basic-usage';
    if (lowerText.includes('variant')) return 'variants';
    if (lowerText.includes('api') || lowerText.includes('props')) return 'api';
    if (lowerText.includes('accessibility') || lowerText.includes('a11y')) return 'accessibility';
    if (lowerText.includes('example')) return 'examples';

    return 'unknown';
  }

  /**
   * Extracts elements by type from the AST
   * @param ast - The AST to search
   * @param selector - Element type to search for (e.g., 'h1', 'div', 'ComponentPlayground')
   * @returns Array of matching elements
   */
  extractElements(ast: t.File, selector: string): Element[] {
    const elements: Element[] = [];

    traverse(ast, {
      JSXElement: (path: NodePath<t.JSXElement>) => {
        const openingElement = path.node.openingElement;
        const tagName = this.getJSXElementName(openingElement);

        if (tagName === selector) {
          const lineNumber = openingElement.loc?.start.line || 0;
          const className = this.extractClassName(openingElement);
          const props = this.extractProps(openingElement);

          elements.push({
            type: tagName,
            className,
            lineNumber,
            props,
          });
        }
      },
    });

    return elements;
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Gets the name of a JSX element
   */
  private getJSXElementName(openingElement: t.JSXOpeningElement): string | null {
    const name = openingElement.name;

    if (t.isJSXIdentifier(name)) {
      return name.name;
    }

    if (t.isJSXMemberExpression(name)) {
      // Handle cases like <Component.SubComponent>
      return this.getJSXMemberExpressionName(name);
    }

    return null;
  }

  /**
   * Gets the full name of a JSX member expression
   */
  private getJSXMemberExpressionName(expr: t.JSXMemberExpression): string {
    const parts: string[] = [];

    let current: t.JSXMemberExpression | t.JSXIdentifier = expr;
    while (t.isJSXMemberExpression(current)) {
      if (t.isJSXIdentifier(current.property)) {
        parts.unshift(current.property.name);
      }
      current = current.object as t.JSXMemberExpression | t.JSXIdentifier;
    }

    if (t.isJSXIdentifier(current)) {
      parts.unshift(current.name);
    }

    return parts.join('.');
  }

  /**
   * Extracts the className attribute from a JSX element
   */
  private extractClassName(openingElement: t.JSXOpeningElement): string {
    const classNameAttr = openingElement.attributes.find(
      (attr) =>
        t.isJSXAttribute(attr) &&
        t.isJSXIdentifier(attr.name) &&
        attr.name.name === 'className'
    );

    if (classNameAttr && t.isJSXAttribute(classNameAttr)) {
      const value = classNameAttr.value;

      if (t.isStringLiteral(value)) {
        return value.value;
      }

      if (t.isJSXExpressionContainer(value) && t.isStringLiteral(value.expression)) {
        return value.expression.value;
      }
    }

    return '';
  }

  /**
   * Extracts all props from a JSX element
   */
  private extractProps(openingElement: t.JSXOpeningElement): Record<string, unknown> {
    const props: Record<string, unknown> = {};

    for (const attr of openingElement.attributes) {
      if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
        const propName = attr.name.name;
        props[propName] = true; // Mark as present (actual value extraction is complex)
      }
    }

    return props;
  }

  /**
   * Extracts the props array from a PropsTable component
   */
  private extractPropsArray(
    openingElement: t.JSXOpeningElement,
    path: NodePath<t.JSXElement>
  ): PropDefinition[] {
    // Find the 'props' attribute
    const propsAttr = openingElement.attributes.find(
      (attr) =>
        t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name) && attr.name.name === 'props'
    );

    if (!propsAttr || !t.isJSXAttribute(propsAttr)) {
      return [];
    }

    const value = propsAttr.value;
    if (!value || !t.isJSXExpressionContainer(value)) {
      return [];
    }

    const expression = value.expression;

    // Handle identifier reference (e.g., props={myPropsArray})
    if (t.isIdentifier(expression)) {
      // Try to find the variable declaration
      const binding = path.scope.getBinding(expression.name);
      if (binding && binding.path.isVariableDeclarator()) {
        const init = binding.path.node.init;
        if (init && t.isArrayExpression(init)) {
          return this.parsePropsArrayExpression(init);
        }
      }
    }

    // Handle inline array (e.g., props={[...]})
    if (t.isArrayExpression(expression)) {
      return this.parsePropsArrayExpression(expression);
    }

    return [];
  }

  /**
   * Parses an array expression into PropDefinition objects
   */
  private parsePropsArrayExpression(arrayExpr: t.ArrayExpression): PropDefinition[] {
    const propDefs: PropDefinition[] = [];

    for (const element of arrayExpr.elements) {
      if (element && t.isObjectExpression(element)) {
        const propDef: PropDefinition = {};

        for (const prop of element.properties) {
          if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
            const key = prop.key.name;
            const value = prop.value;

            if (t.isStringLiteral(value)) {
              propDef[key as keyof PropDefinition] = value.value as never;
            } else if (t.isBooleanLiteral(value)) {
              propDef[key as keyof PropDefinition] = value.value as never;
            }
          }
        }

        propDefs.push(propDef);
      }
    }

    return propDefs;
  }

  /**
   * Extracts text content from a JSX element
   */
  private extractTextContent(node: t.JSXElement): string {
    const texts: string[] = [];

    const extractFromChildren = (children: Array<t.JSXText | t.JSXExpressionContainer | t.JSXElement | t.JSXSpreadChild | t.JSXFragment>): void => {
      for (const child of children) {
        if (t.isJSXText(child)) {
          texts.push(child.value.trim());
        } else if (t.isJSXElement(child)) {
          extractFromChildren(child.children);
        } else if (t.isJSXExpressionContainer(child)) {
          if (t.isStringLiteral(child.expression)) {
            texts.push(child.expression.value);
          }
        }
      }
    };

    extractFromChildren(node.children);

    return texts.join(' ').trim();
  }

  /**
   * Determines if a code element is block-level (vs inline)
   */
  private isBlockLevelCode(path: NodePath<t.JSXElement>): boolean {
    // Check if the parent is a <pre> element
    const parent = path.parent;
    if (t.isJSXElement(parent)) {
      const parentName = this.getJSXElementName(parent.openingElement);
      return parentName === 'pre';
    }
    return false;
  }
}
