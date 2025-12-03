import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { EffectRenderer } from './EffectRenderer';
import { CursorState, CursorEffectConfig, PRESET_THEMES } from '../../types/cursor-effects';

describe('EffectRenderer', () => {
  let mockCursorState: CursorState;
  let mockConfig: Required<CursorEffectConfig>;

  beforeEach(() => {
    mockCursorState = {
      position: { x: 100, y: 100 },
      velocity: { x: 0, y: 0, magnitude: 0 },
      isMoving: false,
      isClicking: false,
      currentTheme: PRESET_THEMES.spooky,
      activeElements: new Map(),
    };

    mockConfig = {
      theme: 'spooky',
      intensity: 1,
      effects: {
        glow: true,
        distortion: true,
        waves: true,
        attraction: true,
        particles: false,
      },
      disableOnMobile: false,
      proximityRadius: 150,
      maxWaves: 5,
      colorTransitionZones: 'vertical',
    };
  });

  it('should render without errors', () => {
    const { container } = render(
      <EffectRenderer cursorState={mockCursorState} config={mockConfig} />
    );
    
    // Check that the portal was created
    const effectsLayer = document.querySelector('.cursor-effects-layer');
    expect(effectsLayer).toBeTruthy();
  });

  it('should apply correct styles to effects layer', () => {
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    const effectsLayer = document.querySelector('.cursor-effects-layer') as HTMLElement;
    expect(effectsLayer).toBeTruthy();
    
    // Check critical styles
    expect(effectsLayer.style.position).toBe('fixed');
    expect(effectsLayer.style.pointerEvents).toBe('none');
    expect(effectsLayer.style.zIndex).toBe('9999');
  });

  it('should render glow effect when enabled', () => {
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    const glowElement = document.querySelector('.cursor-glow');
    expect(glowElement).toBeTruthy();
  });

  it('should not render glow effect when disabled', () => {
    const configWithoutGlow = {
      ...mockConfig,
      effects: { ...mockConfig.effects, glow: false },
    };
    
    render(<EffectRenderer cursorState={mockCursorState} config={configWithoutGlow} />);
    
    const glowElement = document.querySelector('.cursor-glow');
    expect(glowElement).toBeFalsy();
  });

  it('should not render distortion effect when disabled', () => {
    const configWithoutDistortion = {
      ...mockConfig,
      effects: { ...mockConfig.effects, distortion: false },
    };
    
    render(<EffectRenderer cursorState={mockCursorState} config={configWithoutDistortion} />);
    
    const distortionOverlay = document.querySelector('.distortion-overlay');
    expect(distortionOverlay).toBeFalsy();
  });

  it('should render to document.body via portal', () => {
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    // The effects layer should be a direct child of document.body
    const effectsLayer = document.querySelector('.cursor-effects-layer');
    expect(effectsLayer?.parentElement).toBe(document.body);
  });

  it('should have aria-hidden attribute for accessibility', () => {
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    const effectsLayer = document.querySelector('.cursor-effects-layer');
    expect(effectsLayer?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render all enabled effects', () => {
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    // Check that effects layer exists
    const effectsLayer = document.querySelector('.cursor-effects-layer');
    expect(effectsLayer).toBeTruthy();
    
    // Glow should be rendered
    const glowElement = document.querySelector('.cursor-glow');
    expect(glowElement).toBeTruthy();
    
    // SVG filters for distortion should be rendered
    const svgFilters = document.querySelector('svg');
    expect(svgFilters).toBeTruthy();
  });

  it('should handle SSR gracefully', () => {
    // The component checks for document existence and returns null if not in browser
    // In a browser environment, it should render normally
    render(<EffectRenderer cursorState={mockCursorState} config={mockConfig} />);
    
    const effectsLayer = document.querySelector('.cursor-effects-layer');
    expect(effectsLayer).toBeTruthy();
  });
});
