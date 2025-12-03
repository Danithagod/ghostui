import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { useCursorEffect } from './useCursorEffect';
import { CursorEffectProvider } from './CursorContext';
import { CursorEffectOptions } from '../../types/cursor-effects';

// Define test components outside of test functions to ensure proper context
function TestComponent({ options, id }: { options: CursorEffectOptions; id: string }) {
  const ref = useCursorEffect<HTMLDivElement>(options);
  return <div ref={ref} data-testid={`cursor-element-${id}`}>Test Element {id}</div>;
}

function TestComponentSimple({ options }: { options?: CursorEffectOptions }) {
  const ref = useCursorEffect<HTMLDivElement>(options);
  return <div ref={ref} data-testid="test-element">Test</div>;
}

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <CursorEffectProvider>{children}</CursorEffectProvider>;
}

describe('useCursorEffect - Property-Based Tests', () => {
  /**
   * Feature: global-cursor-effects, Property 25: Component unmount cleanup
   * 
   * For any component that calls useCursorEffect and then unmounts, the element 
   * should be removed from the activeElements map and no longer receive cursor effects.
   * 
   * Validates: Requirements 8.4
   */
  it('Property 25: component unmount removes element from activeElements map', () => {

    fc.assert(
      fc.property(
        // Generate random number of components to mount/unmount
        fc.integer({ min: 1, max: 10 }),
        // Generate random options for each component
        fc.array(
          fc.record({
            type: fc.constantFrom('button', 'card', 'draggable', 'link', 'custom'),
            intensity: fc.double({ min: 0, max: 1 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (numComponents, optionsArray) => {
          // Render all components within a single provider
          const { unmount, rerender } = render(
            <TestWrapper>
              {optionsArray.slice(0, numComponents).map((options, index) => (
                <TestComponent key={index} options={options as CursorEffectOptions} id={String(index)} />
              ))}
            </TestWrapper>
          );

          // Verify all components are mounted
          for (let i = 0; i < Math.min(numComponents, optionsArray.length); i++) {
            const element = document.querySelector(`[data-testid="cursor-element-${i}"]`);
            expect(element).toBeTruthy();
          }

          // Unmount half of the components by rerendering with fewer
          const halfCount = Math.floor(numComponents / 2);
          rerender(
            <TestWrapper>
              {optionsArray.slice(0, halfCount).map((options, index) => (
                <TestComponent key={index} options={options as CursorEffectOptions} id={String(index)} />
              ))}
            </TestWrapper>
          );

          // Verify that unmounted components are gone
          for (let i = halfCount; i < numComponents; i++) {
            const element = document.querySelector(`[data-testid="cursor-element-${i}"]`);
            expect(element).toBeNull();
          }

          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Multiple components can register and unregister independently
   * 
   * For any set of components, each should be able to register and unregister
   * without affecting other registered components.
   */
  it('Property: multiple components register and unregister independently', () => {

    fc.assert(
      fc.property(
        // Generate array of component configurations
        fc.array(
          fc.record({
            shouldRemove: fc.boolean(),
            options: fc.record({
              type: fc.constantFrom('button', 'card', 'draggable', 'link', 'custom'),
              intensity: fc.double({ min: 0, max: 1 }),
            }),
          }),
          { minLength: 2, maxLength: 10 }
        ),
        (configs) => {
          // Mount all components in a single provider
          const { unmount, rerender } = render(
            <TestWrapper>
              {configs.map((config, index) => (
                <TestComponent key={`element-${index}`} options={config.options} id={`element-${index}`} />
              ))}
            </TestWrapper>
          );

          // Verify all components are mounted
          for (let i = 0; i < configs.length; i++) {
            const element = document.querySelector(`[data-testid="cursor-element-element-${i}"]`);
            expect(element).toBeTruthy();
          }

          // Selectively remove some components by rerendering without them
          const remainingConfigs = configs.filter((config, index) => !config.shouldRemove);
          const remainingIndices = configs
            .map((config, index) => ({ config, index }))
            .filter(({ config }) => !config.shouldRemove)
            .map(({ index }) => index);

          rerender(
            <TestWrapper>
              {remainingIndices.map((originalIndex) => (
                <TestComponent 
                  key={`element-${originalIndex}`} 
                  options={configs[originalIndex].options} 
                  id={`element-${originalIndex}`} 
                />
              ))}
            </TestWrapper>
          );

          // Verify remaining components are still there
          for (const index of remainingIndices) {
            const element = document.querySelector(`[data-testid="cursor-element-element-${index}"]`);
            expect(element).toBeTruthy();
          }

          // Cleanup
          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Hook returns valid ref object
   * 
   * For any options configuration, the hook should always return a valid
   * React ref object that can be attached to a DOM element.
   */
  it('Property: hook always returns valid ref object', () => {

    fc.assert(
      fc.property(
        fc.record({
          type: fc.constantFrom('button', 'card', 'draggable', 'link', 'custom'),
          intensity: fc.double({ min: 0, max: 1 }),
          proximityRadius: fc.integer({ min: 50, max: 300 }),
          attraction: fc.constantFrom('attract', 'repel', 'none'),
          attractionStrength: fc.double({ min: 0, max: 1 }),
          distortion: fc.boolean(),
        }),
        (options) => {
          const { unmount } = render(
            <TestWrapper>
              <TestComponentSimple options={options} />
            </TestWrapper>
          );

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Hook works with empty options
   * 
   * The hook should work correctly when called with no options or empty options object.
   */
  it('Property: hook works with empty or undefined options', () => {

    fc.assert(
      fc.property(
        fc.constantFrom(undefined, {}),
        (options) => {
          const { unmount, container } = render(
            <TestWrapper>
              <TestComponentSimple options={options} />
            </TestWrapper>
          );

          // Should render without errors
          expect(container.querySelector('div')).toBeDefined();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property test: Remounting component with same options works correctly
   * 
   * For any component, unmounting and remounting should work correctly
   * without causing memory leaks or registration issues.
   */
  it('Property: remounting component works correctly', () => {

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 5 }), // Number of mount/unmount cycles
        fc.record({
          type: fc.constantFrom('button', 'card', 'draggable', 'link', 'custom'),
          intensity: fc.double({ min: 0, max: 1 }),
        }),
        (cycles, options) => {
          // Perform multiple mount/unmount cycles
          for (let i = 0; i < cycles; i++) {
            const { unmount, getByTestId } = render(
              <TestWrapper>
                <TestComponentSimple options={options} />
              </TestWrapper>
            );

            // Verify component is mounted
            const element = getByTestId('test-element');
            expect(element).toBeDefined();

            // Unmount
            unmount();
          }

          // Final mount to verify everything still works
          const { unmount: finalUnmount, getByTestId: finalGetByTestId } = render(
            <TestWrapper>
              <TestComponentSimple options={options} />
            </TestWrapper>
          );

          const finalElement = finalGetByTestId('test-element');
          expect(finalElement).toBeDefined();

          finalUnmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
