import { describe, it, expect, beforeEach } from 'vitest';
import {
  checkWaveElementIntersection,
  calculateCollisionIntensity,
  calculateCombinedWaveIntensity,
  getAffectedElements,
  WaveCollisionTracker,
} from './waveCollisionUtils';
import { Wave, RegisteredElement } from '../../types/cursor-effects';

describe('waveCollisionUtils', () => {
  // Helper to create a test wave
  const createWave = (x: number, y: number, radius: number, opacity = 0.6): Wave => ({
    id: `wave-${Math.random()}`,
    origin: { x, y },
    radius,
    maxRadius: 500,
    opacity,
    timestamp: Date.now(),
    color: '#22C55E',
  });

  // Helper to create a test element
  const createElement = (
    left: number,
    top: number,
    width: number,
    height: number
  ): RegisteredElement => ({
    id: `element-${Math.random()}`,
    ref: { current: null },
    options: {},
    bounds: new DOMRect(left, top, width, height),
    distance: 0,
    isInProximity: false,
    isHovered: false,
  });

  describe('checkWaveElementIntersection', () => {
    it('should detect intersection when wave reaches element', () => {
      const wave = createWave(100, 100, 50);
      const element = createElement(140, 90, 40, 40); // Center at (160, 110)
      
      // Distance from wave origin to element center is ~63 pixels
      // Element radius (half diagonal) is ~28 pixels
      // Wave should intersect when radius is between 35 and 91 pixels
      expect(checkWaveElementIntersection(wave, element)).toBe(true);
    });

    it('should not detect intersection when wave is too small', () => {
      const wave = createWave(100, 100, 10);
      const element = createElement(200, 200, 40, 40);
      
      expect(checkWaveElementIntersection(wave, element)).toBe(false);
    });

    it('should not detect intersection when wave has passed element', () => {
      const wave = createWave(100, 100, 500);
      const element = createElement(110, 110, 20, 20);
      
      // Wave is far beyond the element
      expect(checkWaveElementIntersection(wave, element)).toBe(false);
    });

    it('should handle element with zero dimensions', () => {
      const wave = createWave(100, 100, 50);
      const element = createElement(100, 100, 0, 0);
      
      expect(checkWaveElementIntersection(wave, element)).toBe(false);
    });

    it('should detect intersection for element at wave origin', () => {
      const wave = createWave(100, 100, 10);
      const element = createElement(90, 90, 20, 20); // Center at (100, 100)
      
      // Element radius (half diagonal) is ~14 pixels
      // Wave at radius 10 should intersect (10 <= 14)
      expect(checkWaveElementIntersection(wave, element)).toBe(true);
    });
  });

  describe('calculateCollisionIntensity', () => {
    it('should return 0 for non-intersecting wave and element', () => {
      const wave = createWave(100, 100, 10);
      const element = createElement(200, 200, 40, 40);
      
      expect(calculateCollisionIntensity(wave, element)).toBe(0);
    });

    it('should return positive intensity for intersecting wave and element', () => {
      const wave = createWave(100, 100, 50);
      const element = createElement(140, 90, 40, 40);
      
      const intensity = calculateCollisionIntensity(wave, element);
      expect(intensity).toBeGreaterThan(0);
      expect(intensity).toBeLessThanOrEqual(1);
    });

    it('should factor in wave opacity', () => {
      const wave1 = createWave(100, 100, 50, 1.0);
      const wave2 = createWave(100, 100, 50, 0.5);
      const element = createElement(140, 90, 40, 40);
      
      const intensity1 = calculateCollisionIntensity(wave1, element);
      const intensity2 = calculateCollisionIntensity(wave2, element);
      
      expect(intensity1).toBeGreaterThan(intensity2);
    });

    it('should have highest intensity when wave edge is at element center', () => {
      const element = createElement(140, 90, 40, 40); // Center at (160, 110)
      
      // Distance from (100, 100) to (160, 110) is ~63 pixels
      const waveAtCenter = createWave(100, 100, 63);
      const waveBefore = createWave(100, 100, 40);
      const waveAfter = createWave(100, 100, 80);
      
      const intensityAtCenter = calculateCollisionIntensity(waveAtCenter, element);
      const intensityBefore = calculateCollisionIntensity(waveBefore, element);
      const intensityAfter = calculateCollisionIntensity(waveAfter, element);
      
      expect(intensityAtCenter).toBeGreaterThanOrEqual(intensityBefore);
      expect(intensityAtCenter).toBeGreaterThanOrEqual(intensityAfter);
    });
  });

  describe('calculateCombinedWaveIntensity', () => {
    it('should return 0 when no waves intersect', () => {
      const waves = [
        createWave(100, 100, 10),
        createWave(200, 200, 10),
      ];
      const element = createElement(300, 300, 40, 40);
      
      expect(calculateCombinedWaveIntensity(waves, element)).toBe(0);
    });

    it('should combine intensities from multiple waves additively', () => {
      const element = createElement(140, 90, 40, 40);
      const wave1 = createWave(100, 100, 50, 0.3);
      const wave2 = createWave(150, 100, 30, 0.3);
      
      const intensity1 = calculateCollisionIntensity(wave1, element);
      const intensity2 = calculateCollisionIntensity(wave2, element);
      const combined = calculateCombinedWaveIntensity([wave1, wave2], element);
      
      expect(combined).toBeGreaterThan(intensity1);
      expect(combined).toBeGreaterThan(intensity2);
      expect(combined).toBeLessThanOrEqual(1.0);
    });

    it('should cap combined intensity at 1.0', () => {
      const element = createElement(100, 100, 40, 40);
      const waves = [
        createWave(100, 100, 20, 1.0),
        createWave(100, 100, 25, 1.0),
        createWave(100, 100, 30, 1.0),
      ];
      
      const combined = calculateCombinedWaveIntensity(waves, element);
      expect(combined).toBeLessThanOrEqual(1.0);
    });
  });

  describe('getAffectedElements', () => {
    it('should return empty array when no elements intersect', () => {
      const wave = createWave(100, 100, 10);
      const elements = new Map<string, RegisteredElement>([
        ['elem1', createElement(200, 200, 40, 40)],
        ['elem2', createElement(300, 300, 40, 40)],
      ]);
      
      expect(getAffectedElements(wave, elements)).toEqual([]);
    });

    it('should return IDs of intersecting elements', () => {
      const wave = createWave(100, 100, 50);
      const elem1 = createElement(140, 90, 40, 40);
      const elem2 = createElement(200, 200, 40, 40);
      const elem3 = createElement(120, 120, 20, 20);
      
      const elements = new Map<string, RegisteredElement>([
        ['elem1', elem1],
        ['elem2', elem2],
        ['elem3', elem3],
      ]);
      
      const affected = getAffectedElements(wave, elements);
      expect(affected).toContain('elem1');
      expect(affected).toContain('elem3');
      expect(affected).not.toContain('elem2');
    });
  });

  describe('WaveCollisionTracker', () => {
    let tracker: WaveCollisionTracker;

    beforeEach(() => {
      tracker = new WaveCollisionTracker();
    });

    it('should track collisions between waves and elements', () => {
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(false);
      
      tracker.recordCollision('wave1', 'elem1');
      
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(true);
    });

    it('should track multiple collisions for same wave', () => {
      tracker.recordCollision('wave1', 'elem1');
      tracker.recordCollision('wave1', 'elem2');
      
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(true);
      expect(tracker.hasCollided('wave1', 'elem2')).toBe(true);
    });

    it('should track collisions independently per wave', () => {
      tracker.recordCollision('wave1', 'elem1');
      tracker.recordCollision('wave2', 'elem2');
      
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(true);
      expect(tracker.hasCollided('wave1', 'elem2')).toBe(false);
      expect(tracker.hasCollided('wave2', 'elem1')).toBe(false);
      expect(tracker.hasCollided('wave2', 'elem2')).toBe(true);
    });

    it('should cleanup wave collision data', () => {
      tracker.recordCollision('wave1', 'elem1');
      tracker.recordCollision('wave1', 'elem2');
      
      tracker.cleanupWave('wave1');
      
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(false);
      expect(tracker.hasCollided('wave1', 'elem2')).toBe(false);
    });

    it('should clear all collision data', () => {
      tracker.recordCollision('wave1', 'elem1');
      tracker.recordCollision('wave2', 'elem2');
      
      tracker.clear();
      
      expect(tracker.hasCollided('wave1', 'elem1')).toBe(false);
      expect(tracker.hasCollided('wave2', 'elem2')).toBe(false);
    });
  });
});
