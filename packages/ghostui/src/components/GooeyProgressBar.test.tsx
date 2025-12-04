import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { GooeyProgressBar } from './GooeyProgressBar';

describe('GooeyProgressBar - Unit Tests', () => {
  // Test ref forwarding - Requirements 2.1
  describe('Ref Forwarding', () => {
    it('should forward ref to the root div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GooeyProgressBar ref={ref} value={50} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should allow accessing DOM methods through ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GooeyProgressBar ref={ref} value={50} />);
      
      expect(ref.current?.getBoundingClientRect).toBeDefined();
    });
  });

  // Test unique filter IDs - Requirements 5.1
  describe('Unique Filter IDs', () => {
    it('should generate unique filter IDs for multiple instances', () => {
      const { container } = render(
        <>
          <GooeyProgressBar value={30} variant="blood" />
          <GooeyProgressBar value={50} variant="blood" />
          <GooeyProgressBar value={70} variant="blood" />
        </>
      );
      
      const filters = container.querySelectorAll('filter');
      const filterIds = Array.from(filters).map(f => f.id);
      const uniqueIds = new Set(filterIds);
      
      expect(uniqueIds.size).toBe(filterIds.length);
    });

    it('should have aria-hidden on SVG filter', () => {
      const { container } = render(<GooeyProgressBar value={50} />);
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // Test ARIA progressbar attributes - Requirements 6.1
  describe('ARIA Progressbar Attributes', () => {
    it('should have role="progressbar"', () => {
      render(<GooeyProgressBar value={50} />);
      
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have aria-valuenow set to current progress', () => {
      render(<GooeyProgressBar value={75} />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('should have aria-valuemin set to 0', () => {
      render(<GooeyProgressBar value={50} />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax set to 100', () => {
      render(<GooeyProgressBar value={50} />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-label for screen readers', () => {
      render(<GooeyProgressBar value={50} variant="blood" />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-label');
      expect(progressbar.getAttribute('aria-label')).toContain('blood');
      expect(progressbar.getAttribute('aria-label')).toContain('50');
    });

    it('should clamp aria-valuenow for values below 0', () => {
      render(<GooeyProgressBar value={-10} />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('should clamp aria-valuenow for values above 100', () => {
      render(<GooeyProgressBar value={150} />);
      
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    });
  });

  // Test displayName - Requirements 3.1
  describe('displayName', () => {
    it('should have displayName set to GooeyProgressBar', () => {
      expect(GooeyProgressBar.displayName).toBe('GooeyProgressBar');
    });
  });
});

describe('GooeyProgressBar - Basic Functionality', () => {
  it('should render without crashing', () => {
    render(<GooeyProgressBar value={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should clamp values below 0 to 0%', () => {
    render(<GooeyProgressBar value={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should clamp values above 100 to 100%', () => {
    render(<GooeyProgressBar value={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should render blood variant by default', () => {
    render(<GooeyProgressBar value={50} />);
    expect(screen.getByText(/blood/i)).toBeInTheDocument();
  });

  it('should render candle variant when specified', () => {
    render(<GooeyProgressBar value={50} variant="candle" />);
    expect(screen.getByText(/candle/i)).toBeInTheDocument();
  });

  it('should render soul variant when specified', () => {
    render(<GooeyProgressBar value={50} variant="soul" />);
    expect(screen.getByText(/soul/i)).toBeInTheDocument();
  });

  it('should display correct percentage for valid values', () => {
    render(<GooeyProgressBar value={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should round decimal values', () => {
    render(<GooeyProgressBar value={33.7} />);
    expect(screen.getByText('34%')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<GooeyProgressBar value={50} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
