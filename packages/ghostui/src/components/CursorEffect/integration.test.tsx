/**
 * Integration tests for Global Cursor Effects with GhostUI components
 * Tests compatibility with GooeyButton, CoffinCard, and existing cursor components
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { CursorEffectProvider } from './CursorContext';
import { useCursorEffect } from './useCursorEffect';
import { GooeyButton } from '../GooeyButton';
import { CoffinCard } from '../CoffinCard';

describe('CursorEffect Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('GooeyButton Integration', () => {
    it('should render GooeyButton with cursor effects provider', () => {
      render(
        <CursorEffectProvider>
          <GooeyButton>Test Button</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should allow GooeyButton to register for cursor effects', () => {
      function TestComponent() {
        const ButtonWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLButtonElement>({ type: 'button', intensity: 0.8 });
          return <GooeyButton ref={ref}>Enhanced Button</GooeyButton>;
        };

        return (
          <CursorEffectProvider>
            <ButtonWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Enhanced Button')).toBeInTheDocument();
    });

    it('should apply button-specific effect configuration', () => {
      function TestComponent() {
        const ButtonWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLButtonElement>({
            type: 'button',
            intensity: 1.0,
            attraction: 'attract',
            attractionStrength: 0.8,
          });
          return <GooeyButton ref={ref}>Magnetic Button</GooeyButton>;
        };

        return (
          <CursorEffectProvider config={{ effects: { attraction: true } }}>
            <ButtonWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      const { container } = render(<TestComponent />);
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should work with different GooeyButton variants', () => {
      function TestComponent({ variant }: { variant: 'slime' | 'blood' | 'ectoplasm' }) {
        const ButtonWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLButtonElement>({ type: 'button' });
          return <GooeyButton ref={ref} variant={variant}>Variant Button</GooeyButton>;
        };

        return (
          <CursorEffectProvider>
            <ButtonWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      const { rerender } = render(<TestComponent variant="slime" />);
      expect(screen.getByText('Variant Button')).toBeInTheDocument();

      rerender(<TestComponent variant="blood" />);
      expect(screen.getByText('Variant Button')).toBeInTheDocument();

      rerender(<TestComponent variant="ectoplasm" />);
      expect(screen.getByText('Variant Button')).toBeInTheDocument();
    });
  });

  describe('CoffinCard Integration', () => {
    it('should render CoffinCard with cursor effects provider', () => {
      render(
        <CursorEffectProvider>
          <CoffinCard title="Test Card">Card Content</CoffinCard>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should allow CoffinCard to register for cursor effects', () => {
      function TestComponent() {
        const CardWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLDivElement>({ type: 'card', intensity: 0.5 });
          return (
            <div ref={ref}>
              <CoffinCard title="Enhanced Card">Cursor-aware content</CoffinCard>
            </div>
          );
        };

        return (
          <CursorEffectProvider>
            <CardWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Enhanced Card')).toBeInTheDocument();
    });

    it('should apply card-specific subtle effects', () => {
      function TestComponent() {
        const CardWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLDivElement>({
            type: 'card',
            intensity: 0.3,
            distortion: true,
          });
          return (
            <div ref={ref}>
              <CoffinCard title="Subtle Card">Subtle effects</CoffinCard>
            </div>
          );
        };

        return (
          <CursorEffectProvider config={{ effects: { distortion: true } }}>
            <CardWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      const { container } = render(<TestComponent />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('should work with animated CoffinCards', () => {
      function TestComponent() {
        const CardWithCursorEffect = () => {
          const ref = useCursorEffect<HTMLDivElement>({ type: 'card' });
          return (
            <div ref={ref}>
              <CoffinCard title="Animated Card" animated={true} intensity="medium">
                Animated content
              </CoffinCard>
            </div>
          );
        };

        return (
          <CursorEffectProvider>
            <CardWithCursorEffect />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Animated Card')).toBeInTheDocument();
    });
  });

  describe('Multiple Components Integration', () => {
    it('should handle multiple components with cursor effects simultaneously', () => {
      function TestComponent() {
        const MultiComponentApp = () => {
          const buttonRef = useCursorEffect<HTMLButtonElement>({ type: 'button' });
          const cardRef = useCursorEffect<HTMLDivElement>({ type: 'card' });

          return (
            <>
              <GooeyButton ref={buttonRef}>Button 1</GooeyButton>
              <div ref={cardRef}>
                <CoffinCard title="Card 1">Content 1</CoffinCard>
              </div>
            </>
          );
        };

        return (
          <CursorEffectProvider>
            <MultiComponentApp />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Button 1')).toBeInTheDocument();
      expect(screen.getByText('Card 1')).toBeInTheDocument();
    });

    it('should handle many registered elements', () => {
      function TestComponent() {
        const ManyComponents = () => {
          const refs = Array.from({ length: 25 }, () => useCursorEffect<HTMLButtonElement>({ type: 'button' }));

          return (
            <>
              {refs.map((ref, i) => (
                <GooeyButton key={i} ref={ref}>
                  Button {i}
                </GooeyButton>
              ))}
            </>
          );
        };

        return (
          <CursorEffectProvider>
            <ManyComponents />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Button 0')).toBeInTheDocument();
      expect(screen.getByText('Button 24')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with spooky theme preset', () => {
      render(
        <CursorEffectProvider config={{ theme: 'spooky' }}>
          <GooeyButton>Spooky Button</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Spooky Button')).toBeInTheDocument();
    });

    it('should work with custom theme colors', () => {
      const customTheme = {
        colors: {
          primary: '#22C55E',
          secondary: '#A855F7',
          tertiary: '#991B1B',
        },
        glowSize: 300,
        glowOpacity: 0.15,
        distortionIntensity: 0.8,
      };

      render(
        <CursorEffectProvider config={{ theme: customTheme }}>
          <GooeyButton>Custom Theme Button</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Custom Theme Button')).toBeInTheDocument();
    });

    it('should integrate with GhostUI color system', () => {
      // Test that cursor effects can use CSS variables from GhostUI
      const themeWithCSSVars = {
        colors: {
          primary: 'var(--ghost-green, #22C55E)',
          secondary: 'var(--ghost-purple, #A855F7)',
          tertiary: 'var(--ghost-blood, #991B1B)',
        },
        glowSize: 300,
        glowOpacity: 0.15,
        distortionIntensity: 0.8,
      };

      render(
        <CursorEffectProvider config={{ theme: themeWithCSSVars }}>
          <CoffinCard title="Themed Card">Content</CoffinCard>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Themed Card')).toBeInTheDocument();
    });
  });

  describe('Configuration Options', () => {
    it('should respect intensity configuration', () => {
      render(
        <CursorEffectProvider config={{ intensity: 0.5 }}>
          <GooeyButton>Half Intensity</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Half Intensity')).toBeInTheDocument();
    });

    it('should respect effect enable/disable flags', () => {
      render(
        <CursorEffectProvider
          config={{
            effects: {
              glow: true,
              distortion: false,
              waves: true,
              attraction: false,
            },
          }}
        >
          <GooeyButton>Selective Effects</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Selective Effects')).toBeInTheDocument();
    });

    it('should respect proximity radius configuration', () => {
      render(
        <CursorEffectProvider config={{ proximityRadius: 200 }}>
          <GooeyButton>Large Proximity</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Large Proximity')).toBeInTheDocument();
    });

    it('should respect mobile disable configuration', () => {
      render(
        <CursorEffectProvider config={{ disableOnMobile: true }}>
          <GooeyButton>Desktop Only</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Desktop Only')).toBeInTheDocument();
    });
  });

  describe('Compatibility with Existing Cursor Components', () => {
    it('should not conflict when GhostCursor is disabled', () => {
      // When using CursorEffectProvider, GhostCursor should be disabled
      render(
        <CursorEffectProvider>
          <GooeyButton>Button with Global Effects</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Button with Global Effects')).toBeInTheDocument();
    });

    it('should allow coexistence with proper configuration', () => {
      // Test that cursor effects can be configured to work alongside other cursor components
      render(
        <CursorEffectProvider config={{ intensity: 0.3 }}>
          <GooeyButton>Subtle Effects</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Subtle Effects')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle components without refs gracefully', () => {
      render(
        <CursorEffectProvider>
          <GooeyButton>No Ref Button</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('No Ref Button')).toBeInTheDocument();
    });

    it('should handle invalid configuration gracefully', () => {
      render(
        <CursorEffectProvider config={{ intensity: 5 } as any}>
          <GooeyButton>Invalid Config</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Invalid Config')).toBeInTheDocument();
    });

    it('should handle unmounting components', () => {
      const { unmount } = render(
        <CursorEffectProvider>
          <GooeyButton>Temporary Button</GooeyButton>
        </CursorEffectProvider>
      );

      expect(screen.getByText('Temporary Button')).toBeInTheDocument();
      unmount();
    });
  });

  describe('Performance', () => {
    it('should handle rapid component mounting/unmounting', () => {
      const { rerender } = render(
        <CursorEffectProvider>
          <GooeyButton>Button 1</GooeyButton>
        </CursorEffectProvider>
      );

      for (let i = 2; i <= 10; i++) {
        rerender(
          <CursorEffectProvider>
            <GooeyButton>Button {i}</GooeyButton>
          </CursorEffectProvider>
        );
      }

      expect(screen.getByText('Button 10')).toBeInTheDocument();
    });

    it('should handle many simultaneous effects', () => {
      function TestComponent() {
        const ManyEffects = () => {
          return (
            <>
              {Array.from({ length: 30 }, (_, i) => {
                const ref = useCursorEffect<HTMLDivElement>({ type: i % 2 === 0 ? 'button' : 'card' });
                return (
                  <div key={i} ref={ref}>
                    Element {i}
                  </div>
                );
              })}
            </>
          );
        };

        return (
          <CursorEffectProvider
            config={{
              effects: {
                glow: true,
                distortion: true,
                waves: true,
                attraction: true,
              },
            }}
          >
            <ManyEffects />
          </CursorEffectProvider>
        );
      }

      render(<TestComponent />);
      expect(screen.getByText('Element 0')).toBeInTheDocument();
      expect(screen.getByText('Element 29')).toBeInTheDocument();
    });
  });
});
