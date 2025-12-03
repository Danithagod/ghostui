import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateDistance,
  getRectCenter,
  calculateElementProximity,
  updateAllElementProximity,
} from './proximityUtils';
import { RegisteredElement, CursorEffectOptions } from '../../types/cursor-effects';

/**
 * Property-based tests for proximity detection system
 * 
 * Feature: global-cursor-effects
 */

describe('Proximity Detection Properties', () => {
  /**
   * Property 5: Proximity detection accuracy
   * 
   * For any registered element and cursor position, the element should be marked 
   * as "in proximity" if and only if the distance between cursor and element center 
   * is less than or equal to the configured proximity radius.
   * 
   * Validates: Requirements 2.5
   */
  it('Property 5: element is in proximity iff distance <= radius', () => {
    fc.assert(
      fc.property(
        // Generate random cursor position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate random element bounds
        fc.record({
          left: fc.integer({ min: 0, max: 1800 }),
          top: fc.integer({ min: 0, max: 960 }),
          width: fc.integer({ min: 10, max: 200 }),
          height: fc.integer({ min: 10, max: 200 }),
        }),
        // Generate random proximity radius
        fc.integer({ min: 50, max: 500 }),
        (cursorPos, elementBounds, proximityRadius) => {
          // Create a mock DOMRect
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          // Create a mock element
          const mockElement: RegisteredElement = {
            id: 'test-element',
            ref: { current: null },
            options: {},
            bounds,
            distance: Infinity,
            isInProximity: false,
            isHovered: false,
          };
          
          // Calculate proximity
          const result = calculateElementProximity(mockElement, cursorPos, proximityRadius);
          
          // Calculate expected distance
          const elementCenter = getRectCenter(bounds);
          const expectedDistance = calculateDistance(cursorPos, elementCenter);
          
          // Verify distance calculation is accurate
          expect(Math.abs(result.distance - expectedDistance)).toBeLessThan(0.01);
          
          // Verify proximity detection: element is in proximity iff distance <= radius
          const expectedInProximity = expectedDistance <= proximityRadius;
          expect(result.isInProximity).toBe(expectedInProximity);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test that distance calculation is symmetric
   */
  it('distance calculation is symmetric', () => {
    fc.assert(
      fc.property(
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        (point1, point2) => {
          const dist1 = calculateDistance(point1, point2);
          const dist2 = calculateDistance(point2, point1);
          expect(Math.abs(dist1 - dist2)).toBeLessThan(0.01);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test that getRectCenter returns the actual center
   */
  it('getRectCenter returns the geometric center of a rectangle', () => {
    fc.assert(
      fc.property(
        fc.record({
          left: fc.integer({ min: 0, max: 1800 }),
          top: fc.integer({ min: 0, max: 960 }),
          width: fc.integer({ min: 10, max: 200 }),
          height: fc.integer({ min: 10, max: 200 }),
        }),
        (elementBounds) => {
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          const center = getRectCenter(bounds);
          
          // Verify center is at the midpoint
          expect(center.x).toBe(bounds.left + bounds.width / 2);
          expect(center.y).toBe(bounds.top + bounds.height / 2);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test that hover detection works correctly
   */
  it('element is hovered iff cursor is within bounds', () => {
    fc.assert(
      fc.property(
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        fc.record({
          left: fc.integer({ min: 0, max: 1800 }),
          top: fc.integer({ min: 0, max: 960 }),
          width: fc.integer({ min: 10, max: 200 }),
          height: fc.integer({ min: 10, max: 200 }),
        }),
        (cursorPos, elementBounds) => {
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          const mockElement: RegisteredElement = {
            id: 'test-element',
            ref: { current: null },
            options: {},
            bounds,
            distance: Infinity,
            isInProximity: false,
            isHovered: false,
          };
          
          const result = calculateElementProximity(mockElement, cursorPos, 150);
          
          // Calculate expected hover state
          const expectedHovered =
            cursorPos.x >= bounds.left &&
            cursorPos.x <= bounds.right &&
            cursorPos.y >= bounds.top &&
            cursorPos.y <= bounds.bottom;
          
          expect(result.isHovered).toBe(expectedHovered);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test that updateAllElementProximity updates all elements
   */
  it('updateAllElementProximity updates all registered elements', () => {
    fc.assert(
      fc.property(
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        fc.array(
          fc.record({
            left: fc.integer({ min: 0, max: 1800 }),
            top: fc.integer({ min: 0, max: 960 }),
            width: fc.integer({ min: 10, max: 200 }),
            height: fc.integer({ min: 10, max: 200 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        fc.integer({ min: 50, max: 500 }),
        (cursorPos, elementBoundsArray, proximityRadius) => {
          // Create a map of elements
          const elements = new Map<string, RegisteredElement>();
          
          elementBoundsArray.forEach((elementBounds, index) => {
            const bounds = {
              ...elementBounds,
              right: elementBounds.left + elementBounds.width,
              bottom: elementBounds.top + elementBounds.height,
              x: elementBounds.left,
              y: elementBounds.top,
              toJSON: () => ({}),
            } as DOMRect;
            
            // Create a mock ref with getBoundingClientRect
            const mockRef = {
              current: {
                getBoundingClientRect: () => bounds,
              } as HTMLElement,
            };
            
            elements.set(`element-${index}`, {
              id: `element-${index}`,
              ref: mockRef,
              options: {},
              bounds,
              distance: Infinity,
              isInProximity: false,
              isHovered: false,
            });
          });
          
          // Update all elements
          const updatedElements = updateAllElementProximity(
            elements,
            cursorPos,
            proximityRadius
          );
          
          // Verify all elements were updated
          expect(updatedElements.size).toBe(elements.size);
          
          // Verify each element has correct proximity data
          updatedElements.forEach((element, id) => {
            const center = getRectCenter(element.bounds);
            const distance = calculateDistance(cursorPos, center);
            
            expect(Math.abs(element.distance - distance)).toBeLessThan(0.01);
            expect(element.isInProximity).toBe(distance <= proximityRadius);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Test that element-specific proximity radius overrides global radius
   */
  it('element-specific proximity radius overrides global radius', () => {
    fc.assert(
      fc.property(
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        fc.record({
          left: fc.integer({ min: 0, max: 1800 }),
          top: fc.integer({ min: 0, max: 960 }),
          width: fc.integer({ min: 10, max: 200 }),
          height: fc.integer({ min: 10, max: 200 }),
        }),
        fc.integer({ min: 50, max: 300 }),
        fc.integer({ min: 100, max: 500 }),
        (cursorPos, elementBounds, globalRadius, elementRadius) => {
          const bounds = {
            ...elementBounds,
            right: elementBounds.left + elementBounds.width,
            bottom: elementBounds.top + elementBounds.height,
            x: elementBounds.left,
            y: elementBounds.top,
            toJSON: () => ({}),
          } as DOMRect;
          
          // Create a mock ref with getBoundingClientRect
          const mockRef = {
            current: {
              getBoundingClientRect: () => bounds,
            } as HTMLElement,
          };
          
          const elements = new Map<string, RegisteredElement>();
          elements.set('element-1', {
            id: 'element-1',
            ref: mockRef,
            options: { proximityRadius: elementRadius },
            bounds,
            distance: Infinity,
            isInProximity: false,
            isHovered: false,
          });
          
          const updatedElements = updateAllElementProximity(
            elements,
            cursorPos,
            globalRadius
          );
          
          const element = updatedElements.get('element-1')!;
          const center = getRectCenter(bounds);
          const distance = calculateDistance(cursorPos, center);
          
          // Should use element-specific radius, not global
          expect(element.isInProximity).toBe(distance <= elementRadius);
        }
      ),
      { numRuns: 100 }
    );
  });
});
