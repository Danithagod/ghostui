import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateAttraction, MAX_ATTRACTION_DISPLACEMENT } from './attractionUtils';

/**
 * Property-based tests for attraction force system
 * 
 * Feature: global-cursor-effects
 * Tests Properties 12-15 from design document
 */

describe('attractionUtils - Property-Based Tests', () => {
  /**
   * Feature: global-cursor-effects, Property 12: Attraction displacement proportional to proximity
   * Validates: Requirements 4.1
   * 
   * For any element with attraction enabled, the displacement distance should be 
   * proportional to (proximityRadius - distance) / proximityRadius, scaled by attraction strength.
   */
  it('Property 12: Attraction displacement proportional to proximity', () => {
    fc.assert(
      fc.property(
        // Generate random element position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate random cursor position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate proximity radius
        fc.integer({ min: 50, max: 300 }),
        // Generate attraction strength (exclude NaN, Infinity)
        fc.double({ min: 0, max: 1, noNaN: true }),
        (elementPos, cursorPos, proximityRadius, attractionStrength) => {
          // Calculate distance
          const dx = cursorPos.x - elementPos.x;
          const dy = cursorPos.y - elementPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only test when element is within proximity radius
          fc.pre(distance > 0 && distance <= proximityRadius);
          
          // Calculate attraction
          const displacement = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            attractionStrength
          );
          
          // Calculate expected proximity factor
          const proximityFactor = (proximityRadius - distance) / proximityRadius;
          
          // Calculate expected displacement magnitude
          const expectedMagnitude = proximityFactor * attractionStrength * MAX_ATTRACTION_DISPLACEMENT;
          
          // Calculate actual displacement magnitude
          const actualMagnitude = Math.sqrt(displacement.x * displacement.x + displacement.y * displacement.y);
          
          // Displacement magnitude should match expected (within floating point tolerance)
          expect(actualMagnitude).toBeCloseTo(expectedMagnitude, 5);
          
          // Displacement should be proportional to proximity
          // Closer elements (smaller distance) should have larger displacement
          if (distance < proximityRadius / 2) {
            // Element is in inner half of proximity zone
            // Displacement should be at least half of maximum possible
            const minExpectedDisplacement = (attractionStrength * MAX_ATTRACTION_DISPLACEMENT) / 2;
            expect(actualMagnitude).toBeGreaterThanOrEqual(minExpectedDisplacement - 0.01);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: global-cursor-effects, Property 13: Attraction exit returns to origin
   * Validates: Requirements 4.3
   * 
   * For any element with attraction enabled, moving the cursor into then out of 
   * proximity should result in the element returning to its original position.
   */
  it('Property 13: Attraction exit returns to origin', () => {
    fc.assert(
      fc.property(
        // Generate random element position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate proximity radius
        fc.integer({ min: 50, max: 300 }),
        // Generate attraction strength (exclude NaN, Infinity)
        fc.double({ min: 0.1, max: 1, noNaN: true }),
        (elementPos, proximityRadius, attractionStrength) => {
          // Step 1: Cursor enters proximity (close to element)
          const cursorInProximity = {
            x: elementPos.x + proximityRadius / 2,
            y: elementPos.y + proximityRadius / 2,
          };
          
          const distanceInProximity = Math.sqrt(
            Math.pow(cursorInProximity.x - elementPos.x, 2) +
            Math.pow(cursorInProximity.y - elementPos.y, 2)
          );
          
          const displacementInProximity = calculateAttraction(
            elementPos,
            cursorInProximity,
            distanceInProximity,
            proximityRadius,
            'attract',
            attractionStrength
          );
          
          // Element should have non-zero displacement when in proximity
          const magnitudeInProximity = Math.sqrt(
            displacementInProximity.x * displacementInProximity.x +
            displacementInProximity.y * displacementInProximity.y
          );
          expect(magnitudeInProximity).toBeGreaterThan(0);
          
          // Step 2: Cursor exits proximity (far from element)
          const cursorOutOfProximity = {
            x: elementPos.x + proximityRadius * 2,
            y: elementPos.y + proximityRadius * 2,
          };
          
          const distanceOutOfProximity = Math.sqrt(
            Math.pow(cursorOutOfProximity.x - elementPos.x, 2) +
            Math.pow(cursorOutOfProximity.y - elementPos.y, 2)
          );
          
          const displacementOutOfProximity = calculateAttraction(
            elementPos,
            cursorOutOfProximity,
            distanceOutOfProximity,
            proximityRadius,
            'attract',
            attractionStrength
          );
          
          // Element should return to origin (zero displacement) when out of proximity
          expect(displacementOutOfProximity.x).toBe(0);
          expect(displacementOutOfProximity.y).toBe(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: global-cursor-effects, Property 14: Attraction vs repulsion modes
   * Validates: Requirements 4.4
   * 
   * For any element, when attraction mode is 'attract', displacement should be 
   * toward the cursor; when mode is 'repel', displacement should be away from 
   * the cursor (opposite direction vector).
   */
  it('Property 14: Attraction vs repulsion modes', () => {
    fc.assert(
      fc.property(
        // Generate random element position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate random cursor position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate proximity radius
        fc.integer({ min: 50, max: 300 }),
        // Generate attraction strength (exclude NaN, Infinity)
        fc.double({ min: 0.1, max: 1, noNaN: true }),
        (elementPos, cursorPos, proximityRadius, attractionStrength) => {
          // Calculate distance
          const dx = cursorPos.x - elementPos.x;
          const dy = cursorPos.y - elementPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only test when element is within proximity radius and not at exact center
          fc.pre(distance > 1 && distance <= proximityRadius);
          
          // Calculate attraction displacement
          const attractDisplacement = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            attractionStrength
          );
          
          // Calculate repulsion displacement
          const repelDisplacement = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'repel',
            attractionStrength
          );
          
          // Repulsion should be exactly opposite of attraction
          expect(repelDisplacement.x).toBeCloseTo(-attractDisplacement.x, 5);
          expect(repelDisplacement.y).toBeCloseTo(-attractDisplacement.y, 5);
          
          // Attraction should move toward cursor (same direction as cursor-element vector)
          // Calculate normalized direction from element to cursor
          const dirX = dx / distance;
          const dirY = dy / distance;
          
          // Attraction displacement should have same sign as direction vector
          if (Math.abs(attractDisplacement.x) > 0.01) {
            expect(Math.sign(attractDisplacement.x)).toBe(Math.sign(dirX));
          }
          if (Math.abs(attractDisplacement.y) > 0.01) {
            expect(Math.sign(attractDisplacement.y)).toBe(Math.sign(dirY));
          }
          
          // Repulsion displacement should have opposite sign
          if (Math.abs(repelDisplacement.x) > 0.01) {
            expect(Math.sign(repelDisplacement.x)).toBe(-Math.sign(dirX));
          }
          if (Math.abs(repelDisplacement.y) > 0.01) {
            expect(Math.sign(repelDisplacement.y)).toBe(-Math.sign(dirY));
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: global-cursor-effects, Property 15: Attraction intensity scaling
   * Validates: Requirements 4.5
   * 
   * For any element with attraction enabled, setting intensity to 0 should produce 
   * zero displacement, and intensity to 1 should produce maximum displacement 
   * (up to configured limit).
   */
  it('Property 15: Attraction intensity scaling', () => {
    fc.assert(
      fc.property(
        // Generate random element position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate random cursor position
        fc.record({
          x: fc.integer({ min: 0, max: 1920 }),
          y: fc.integer({ min: 0, max: 1080 }),
        }),
        // Generate proximity radius
        fc.integer({ min: 50, max: 300 }),
        (elementPos, cursorPos, proximityRadius) => {
          // Calculate distance
          const dx = cursorPos.x - elementPos.x;
          const dy = cursorPos.y - elementPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only test when element is within proximity radius
          fc.pre(distance > 0 && distance <= proximityRadius);
          
          // Test intensity = 0 produces zero displacement
          const displacementZero = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            0
          );
          
          expect(displacementZero.x).toBe(0);
          expect(displacementZero.y).toBe(0);
          
          // Test intensity = 1 produces maximum displacement for this proximity
          const displacementMax = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            1
          );
          
          const magnitudeMax = Math.sqrt(
            displacementMax.x * displacementMax.x +
            displacementMax.y * displacementMax.y
          );
          
          // Calculate expected maximum for this distance
          const proximityFactor = (proximityRadius - distance) / proximityRadius;
          const expectedMax = proximityFactor * MAX_ATTRACTION_DISPLACEMENT;
          
          expect(magnitudeMax).toBeCloseTo(expectedMax, 5);
          
          // Test that intensity scales proportionally
          const intensity1 = 0.3;
          const intensity2 = 0.6;
          
          const displacement1 = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            intensity1
          );
          
          const displacement2 = calculateAttraction(
            elementPos,
            cursorPos,
            distance,
            proximityRadius,
            'attract',
            intensity2
          );
          
          const magnitude1 = Math.sqrt(
            displacement1.x * displacement1.x +
            displacement1.y * displacement1.y
          );
          
          const magnitude2 = Math.sqrt(
            displacement2.x * displacement2.x +
            displacement2.y * displacement2.y
          );
          
          // magnitude2 should be approximately 2x magnitude1 (since 0.6 / 0.3 = 2)
          const ratio = magnitude2 / magnitude1;
          expect(ratio).toBeCloseTo(intensity2 / intensity1, 1);
        }
      ),
      { numRuns: 100 }
    );
  });
});
