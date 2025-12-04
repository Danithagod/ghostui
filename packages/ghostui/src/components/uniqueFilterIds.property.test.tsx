import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import * as fc from 'fast-check';
import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

// Import components that use SVG filters
import { GooeyCard } from './GooeyCard';
import { BloodSmear } from './BloodSmear';
import { SpectralRiver } from './SpectralRiver';
import { WhisperBox } from './WhisperBox';
import { GooeyProgressBar } from './GooeyProgressBar';

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

/**
 * Property-based tests for unique SVG filter IDs
 * 
 * Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs
 * Validates: Requirements 5.1, 5.2
 * 
 * For any component that defines SVG filters, the filter ID should be generated
 * using React.useId(), and when multiple instances of the component are rendered,
 * each instance should have a unique filter ID.
 */

// Define components that use SVG filters with their test configurations
const filterComponents = [
  {
    name: 'GooeyCard',
    Component: GooeyCard,
    props: { children: 'Test content' },
    filterIdPrefix: 'card-goo-',
  },
  {
    name: 'GooeyProgressBar (blood)',
    Component: GooeyProgressBar,
    props: { value: 50, variant: 'blood' as const },
    filterIdPrefix: 'goo-3d-blood-',
  },
  {
    name: 'GooeyProgressBar (candle)',
    Component: GooeyProgressBar,
    props: { value: 50, variant: 'candle' as const },
    filterIdPrefix: 'goo-3d-candle-',
  },
  {
    name: 'WhisperBox',
    Component: WhisperBox,
    props: {},
    filterIdPrefix: 'ectoplasm-distortion-',
  },
] as const;

// Components that only render when active (transition components)
const transitionComponents = [
  {
    name: 'BloodSmear',
    Component: BloodSmear,
    props: { isNavigating: true },
    filterIdPrefix: 'blood-goo-',
  },
  {
    name: 'SpectralRiver',
    Component: SpectralRiver,
    props: { isActive: true },
    filterIdPrefix: 'spectral-goo-',
  },
] as const;

describe('Unique SVG Filter IDs - Property-Based Tests', () => {
  afterEach(() => {
    cleanup();
  });

  /**
   * Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs
   * Validates: Requirements 5.1, 5.2
   * 
   * For any number of component instances (2-5), all filter IDs should be unique.
   */
  it('Property 5: Multiple instances should have unique filter IDs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...filterComponents),
        fc.integer({ min: 2, max: 5 }),
        (componentConfig, instanceCount) => {
          const { Component, props, filterIdPrefix } = componentConfig;
          
          const { container } = render(
            <>
              {Array.from({ length: instanceCount }).map((_, i) => (
                // @ts-expect-error - Dynamic component rendering
                <Component key={i} {...props} />
              ))}
            </>
          );
          
          // Get all filter elements
          const filters = container.querySelectorAll('filter');
          const filterIds = Array.from(filters)
            .map(f => f.id)
            .filter(id => id.startsWith(filterIdPrefix));
          
          // All filter IDs should be unique
          const uniqueIds = new Set(filterIds);
          const allUnique = uniqueIds.size === filterIds.length;
          
          // Should have the expected number of filters
          const hasExpectedCount = filterIds.length === instanceCount;
          
          cleanup();
          
          return allUnique && hasExpectedCount;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs
   * Validates: Requirements 5.1, 5.2
   * 
   * For any component with SVG filters, the filter ID should contain a dynamic part.
   */
  it('Property 5: Filter IDs should contain dynamic useId() part', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...filterComponents),
        (componentConfig) => {
          const { Component, props, filterIdPrefix } = componentConfig;
          
          const { container } = render(
            // @ts-expect-error - Dynamic component rendering
            <Component {...props} />
          );
          
          // Get filter elements
          const filters = container.querySelectorAll('filter');
          const filterIds = Array.from(filters)
            .map(f => f.id)
            .filter(id => id.startsWith(filterIdPrefix));
          
          // Each filter ID should have a dynamic part after the prefix
          const hasDynamicPart = filterIds.every(id => {
            const dynamicPart = id.replace(filterIdPrefix, '');
            // useId() generates IDs like ":r0:", ":r1:", etc.
            return dynamicPart.length > 0;
          });
          
          cleanup();
          
          return hasDynamicPart;
        }
      ),
      { numRuns: filterComponents.length * 10 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs
   * Validates: Requirements 5.1, 5.2
   * 
   * For any component with SVG filters, the filter reference in style should match the filter ID.
   */
  it('Property 5: Filter references should match filter IDs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...filterComponents),
        (componentConfig) => {
          const { Component, props, filterIdPrefix } = componentConfig;
          
          const { container } = render(
            // @ts-expect-error - Dynamic component rendering
            <Component {...props} />
          );
          
          // Get filter elements
          const filters = container.querySelectorAll('filter');
          const filterIds = Array.from(filters)
            .map(f => f.id)
            .filter(id => id.startsWith(filterIdPrefix));
          
          // Get elements with filter style
          const elementsWithFilter = container.querySelectorAll('[style*="filter"]');
          const filterReferences = Array.from(elementsWithFilter)
            .map(el => {
              const style = el.getAttribute('style') || '';
              const match = style.match(/url\(#([^)]+)\)/);
              return match ? match[1] : null;
            })
            .filter((ref): ref is string => ref !== null && ref.startsWith(filterIdPrefix));
          
          // Each filter reference should have a matching filter ID
          const allReferencesMatch = filterReferences.every(ref => filterIds.includes(ref));
          
          cleanup();
          
          return allReferencesMatch;
        }
      ),
      { numRuns: filterComponents.length * 10 }
    );
  });

  /**
   * Feature: component-consistency-analysis, Property 5: Unique SVG filter IDs
   * Validates: Requirements 5.1, 5.2
   * 
   * For transition components (BloodSmear, SpectralRiver), filter IDs should be unique when active.
   */
  it('Property 5: Transition components should have unique filter IDs when active', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...transitionComponents),
        fc.integer({ min: 2, max: 3 }),
        (componentConfig, instanceCount) => {
          const { Component, props, filterIdPrefix } = componentConfig;
          
          const { container } = render(
            <>
              {Array.from({ length: instanceCount }).map((_, i) => (
                // @ts-expect-error - Dynamic component rendering
                <Component key={i} {...props} />
              ))}
            </>
          );
          
          // Get all filter elements
          const filters = container.querySelectorAll('filter');
          const filterIds = Array.from(filters)
            .map(f => f.id)
            .filter(id => id.startsWith(filterIdPrefix));
          
          // All filter IDs should be unique
          const uniqueIds = new Set(filterIds);
          const allUnique = uniqueIds.size === filterIds.length;
          
          // Should have the expected number of filters
          const hasExpectedCount = filterIds.length === instanceCount;
          
          cleanup();
          
          return allUnique && hasExpectedCount;
        }
      ),
      { numRuns: 50 }
    );
  });
});
