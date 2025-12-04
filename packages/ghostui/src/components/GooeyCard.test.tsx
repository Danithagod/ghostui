import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { GooeyCard } from './GooeyCard';
import { ThemeProvider } from './ThemeProvider';

describe('GooeyCard - Unit Tests', () => {
  // Test ref forwarding - Requirements 2.1
  describe('Ref Forwarding', () => {
    it('should forward ref to the root div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GooeyCard ref={ref}>Test content</GooeyCard>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should allow accessing DOM methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GooeyCard ref={ref}>Test content</GooeyCard>);
      
      expect(ref.current?.getBoundingClientRect).toBeDefined();
    });
  });

  // Test unique filter IDs - Requirements 5.1
  describe('Unique Filter IDs', () => {
    it('should generate unique filter IDs for multiple instances', () => {
      const { container } = render(
        <>
          <GooeyCard>Card 1</GooeyCard>
          <GooeyCard>Card 2</GooeyCard>
          <GooeyCard>Card 3</GooeyCard>
        </>
      );
      
      const filters = container.querySelectorAll('filter');
      const filterIds = Array.from(filters).map(f => f.id);
      const uniqueIds = new Set(filterIds);
      
      expect(uniqueIds.size).toBe(filterIds.length);
    });

    it('should use filter ID in style attribute', () => {
      const { container } = render(<GooeyCard>Test content</GooeyCard>);
      
      const filter = container.querySelector('filter');
      const filteredDiv = container.querySelector('[style*="filter"]');
      
      expect(filter).toBeTruthy();
      expect(filteredDiv).toBeTruthy();
      expect(filteredDiv?.getAttribute('style')).toContain(filter?.id);
    });
  });

  // Test displayName - Requirements 3.1
  describe('displayName', () => {
    it('should have displayName set to GooeyCard', () => {
      expect(GooeyCard.displayName).toBe('GooeyCard');
    });
  });

  // Test basic rendering
  describe('Basic Rendering', () => {
    it('should render children content', () => {
      render(<GooeyCard>Test content</GooeyCard>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should apply custom className to content wrapper', () => {
      const { container } = render(
        <GooeyCard className="custom-class">Test content</GooeyCard>
      );
      
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should apply custom gooColor', () => {
      const { container } = render(
        <GooeyCard gooColor="bg-red-500">Test content</GooeyCard>
      );
      
      const gooElements = container.querySelectorAll('.bg-red-500');
      expect(gooElements.length).toBeGreaterThan(0);
    });

    it('should have aria-hidden on SVG filter', () => {
      const { container } = render(<GooeyCard>Test content</GooeyCard>);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // Test theme integration
  describe('Theme Integration', () => {
    it('should use spectral theme color by default', () => {
      const { container } = render(<GooeyCard>Test content</GooeyCard>);
      
      const gooElements = container.querySelectorAll('.bg-\\[\\#5b21b6\\]');
      expect(gooElements.length).toBeGreaterThan(0);
    });

    it('should use theme from ThemeProvider context', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="blood">
          <GooeyCard>Test content</GooeyCard>
        </ThemeProvider>
      );
      
      const gooElements = container.querySelectorAll('.bg-\\[\\#dc2626\\]');
      expect(gooElements.length).toBeGreaterThan(0);
    });

    it('should override theme with variant prop', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="blood">
          <GooeyCard variant="spectral">Test content</GooeyCard>
        </ThemeProvider>
      );
      
      const gooElements = container.querySelectorAll('.bg-\\[\\#5b21b6\\]');
      expect(gooElements.length).toBeGreaterThan(0);
    });

    it('should override theme with gooColor prop', () => {
      const { container } = render(
        <ThemeProvider defaultTheme="blood">
          <GooeyCard gooColor="bg-emerald-500">Test content</GooeyCard>
        </ThemeProvider>
      );
      
      const gooElements = container.querySelectorAll('.bg-emerald-500');
      expect(gooElements.length).toBeGreaterThan(0);
    });

    it('should prioritize gooColor over variant', () => {
      const { container } = render(
        <GooeyCard variant="blood" gooColor="bg-blue-500">Test content</GooeyCard>
      );
      
      const gooElements = container.querySelectorAll('.bg-blue-500');
      expect(gooElements.length).toBeGreaterThan(0);
    });
  });
});
