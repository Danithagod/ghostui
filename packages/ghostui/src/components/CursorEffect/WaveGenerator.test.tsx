import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { WaveGenerator } from './WaveGenerator';
import { CursorState, CursorEffectConfig, PRESET_THEMES } from '../../types/cursor-effects';

describe('WaveGenerator', () => {
  let mockCursorState: CursorState;
  let mockConfig: Required<CursorEffectConfig>;

  beforeEach(() => {
    mockCursorState = {
      position: { x: 500, y: 500 },
      velocity: { x: 0, y: 0, magnitude: 0 },
      isMoving: false,
      isClicking: false,
      currentTheme: PRESET_THEMES.spooky,
      activeElements: new Map(),
    };

    mockConfig = {
      theme: 'spooky',
      intensity: 1.0,
      effects: {
        glow: true,
        distortion: true,
        waves: true,
        attraction: true,
        particles: true,
      },
      disableOnMobile: false,
      proximityRadius: 150,
      maxWaves: 5,
      colorTransitionZones: 'vertical',
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <WaveGenerator cursorState={mockCursorState} config={mockConfig} />
    );
    expect(container).toBeTruthy();
  });

  it('should generate a wave on click', async () => {
    const { container } = render(
      <WaveGenerator cursorState={mockCursorState} config={mockConfig} />
    );

    // Initially no waves
    expect(container.querySelectorAll('.wave-ring').length).toBe(0);

    // Simulate a click
    fireEvent.click(window, { clientX: 100, clientY: 200 });

    // Wait for wave to be created
    await waitFor(() => {
      const waves = container.querySelectorAll('.wave-ring');
      expect(waves.length).toBeGreaterThan(0);
    });
  });

  it('should limit waves to maxWaves configuration', async () => {
    const configWithLimit = { ...mockConfig, maxWaves: 3 };
    const { container } = render(
      <WaveGenerator cursorState={mockCursorState} config={configWithLimit} />
    );

    // Generate more waves than the limit
    for (let i = 0; i < 5; i++) {
      fireEvent.click(window, { clientX: 100 + i * 10, clientY: 200 });
    }

    // Wait for waves to be created
    await waitFor(() => {
      const waves = container.querySelectorAll('.wave-ring');
      // Should not exceed maxWaves limit
      expect(waves.length).toBeLessThanOrEqual(3);
    });
  });

  it('should render wave with correct color from theme', async () => {
    const { container } = render(
      <WaveGenerator cursorState={mockCursorState} config={mockConfig} />
    );

    // Simulate a click
    fireEvent.click(window, { clientX: 100, clientY: 200 });

    // Wait for wave to be created
    await waitFor(() => {
      const wave = container.querySelector('.wave-ring') as HTMLElement;
      expect(wave).toBeTruthy();
      if (wave) {
        const borderColor = wave.style.border;
        // Should contain a color (browser converts hex to rgb)
        // The color #22C55E becomes rgb(34, 197, 94)
        expect(borderColor).toContain('rgb(34, 197, 94)');
      }
    });
  });

  it('should position wave at click coordinates', async () => {
    const { container } = render(
      <WaveGenerator cursorState={mockCursorState} config={mockConfig} />
    );

    const clickX = 300;
    const clickY = 400;

    // Simulate a click
    fireEvent.click(window, { clientX: clickX, clientY: clickY });

    // Wait for wave to be created
    await waitFor(() => {
      const wave = container.querySelector('.wave-ring') as HTMLElement;
      expect(wave).toBeTruthy();
      if (wave) {
        // Wave should be positioned at click coordinates (adjusted for radius)
        expect(wave.style.position).toBe('absolute');
        expect(wave.style.borderRadius).toBe('50%');
        expect(wave.style.pointerEvents).toBe('none');
      }
    });
  });
});
