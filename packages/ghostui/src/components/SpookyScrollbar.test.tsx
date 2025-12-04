import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { SpookyScrollbar } from './SpookyScrollbar';

// Mock ResizeObserver for SpookyScrollbar
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('SpookyScrollbar - Unit Tests', () => {
  // Test ref forwarding - Requirements 2.1
  describe('Ref Forwarding', () => {
    it('should forward ref to the root div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SpookyScrollbar ref={ref}>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should allow accessing DOM methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SpookyScrollbar ref={ref}>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      expect(ref.current?.getBoundingClientRect).toBeDefined();
    });
  });

  // Test displayName - Requirements 3.1
  describe('displayName', () => {
    it('should have displayName set to SpookyScrollbar', () => {
      expect(SpookyScrollbar.displayName).toBe('SpookyScrollbar');
    });
  });

  // Test ARIA scrollbar attributes - Requirements 6.1
  describe('ARIA Scrollbar Attributes', () => {
    it('should have role="scrollbar" on thumb element', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      expect(screen.getByRole('scrollbar')).toBeInTheDocument();
    });

    it('should have aria-valuemin set to 0', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax set to 100', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-valuenow attribute', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-valuenow');
    });

    it('should have aria-controls referencing content area', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-controls');
    });

    it('should have aria-label for screen readers', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-label');
    });
  });

  // Test basic rendering
  describe('Basic Rendering', () => {
    it('should render children content', () => {
      render(
        <SpookyScrollbar>
          <div>Test content</div>
        </SpookyScrollbar>
      );
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <SpookyScrollbar className="custom-class">
          <div>Test content</div>
        </SpookyScrollbar>
      );
      
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should be keyboard focusable', () => {
      render(
        <SpookyScrollbar>
          <div>Scrollable content</div>
        </SpookyScrollbar>
      );
      
      const scrollbar = screen.getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('tabIndex', '0');
    });
  });
});
