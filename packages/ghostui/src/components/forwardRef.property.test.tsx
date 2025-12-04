import { describe, it, expect, beforeAll } from 'vitest';
import * as fc from 'fast-check';
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

// Import all components that should have forwardRef
import { GooeyCard } from './GooeyCard';
import { SpectralTabs } from './SpectralTabs';
import { GooeyProgressBar } from './GooeyProgressBar';
import { SpookyScrollbar } from './SpookyScrollbar';
import { SpookyTooltip } from './SpookyTooltip';
// Note: GraveModal uses portal and requires special handling

// Mock ResizeObserver for SpookyScrollbar
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

/**
 * Property-based tests for forwardRef implementation
 * 
 * Feature: component-consistency-analysis, Property 2: forwardRef implementation
 * Validates: Requirements 2.1, 2.2
 * 
 * For any interactive component (buttons, inputs, textareas, switches),
 * the component should be wrapped with React.forwardRef and the ref
 * should be attached to the primary interactive DOM element.
 */

// Define components that should support forwardRef with their test configurations
const forwardRefComponents = [
  {
    name: 'GooeyCard',
    Component: GooeyCard,
    props: { children: 'Test content' },
    expectedElement: 'DIV',
  },
  {
    name: 'SpectralTabs',
    Component: SpectralTabs,
    props: { 
      tabs: [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
      ]
    },
    expectedElement: 'DIV',
  },
  {
    name: 'GooeyProgressBar',
    Component: GooeyProgressBar,
    props: { value: 50 },
    expectedElement: 'DIV',
  },
  {
    name: 'SpookyScrollbar',
    Component: SpookyScrollbar,
    props: { children: <div>Scrollable content</div> },
    expectedElement: 'DIV',
  },
  {
    name: 'SpookyTooltip',
    Component: SpookyTooltip,
    props: { content: 'Tooltip text', children: <button>Hover me</button> },
    expectedElement: 'DIV',
  },
] as const;

describe('forwardRef Implementation - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: component-consistency-analysis, Property 2: forwardRef implementation
   * Validates: Requirements 2.1, 2.2
   * 
   * For any component that should support forwardRef, passing a ref should
   * result in the ref.current being set to a valid DOM element.
   */
  it('Property 2: Components should forward refs to DOM elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...forwardRefComponents),
        (componentConfig) => {
          const ref = React.createRef<HTMLDivElement>();
          const { Component, props } = componentConfig;
          
          render(
            // @ts-expect-error - Dynamic component rendering
            <Component ref={ref} {...props} />
          );
          
          // The ref should be attached to a DOM element
          const isRefAttached = ref.current !== null;
          
          cleanup();
          
          return isRefAttached;
        }
      ),
      { numRuns: forwardRefComponents.length * 10 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 2: forwardRef implementation
   * Validates: Requirements 2.1, 2.2
   * 
   * For any component with forwardRef, the ref should point to the expected element type.
   */
  it('Property 2: Refs should point to the correct element type', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...forwardRefComponents),
        (componentConfig) => {
          const ref = React.createRef<HTMLDivElement>();
          const { Component, props, expectedElement } = componentConfig;
          
          render(
            // @ts-expect-error - Dynamic component rendering
            <Component ref={ref} {...props} />
          );
          
          // The ref should point to the expected element type
          const isCorrectElementType = ref.current?.tagName === expectedElement;
          
          cleanup();
          
          return isCorrectElementType;
        }
      ),
      { numRuns: forwardRefComponents.length * 10 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 2: forwardRef implementation
   * Validates: Requirements 2.1, 2.2
   * 
   * For any component with forwardRef, the component should have a displayName set.
   */
  it('Property 2: Components with forwardRef should have displayName', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...forwardRefComponents),
        (componentConfig) => {
          const { Component, name } = componentConfig;
          
          // Check that displayName is set and matches the component name
          const hasDisplayName = Component.displayName === name;
          
          return hasDisplayName;
        }
      ),
      { numRuns: forwardRefComponents.length }
    );
  });
});
