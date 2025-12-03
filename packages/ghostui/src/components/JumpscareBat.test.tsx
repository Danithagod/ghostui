import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JumpscareBat } from './JumpscareBat';

describe('JumpscareBat - Basic Functionality', () => {
  it('should render without crashing', () => {
    const { container } = render(<JumpscareBat />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have pointer-events-none class', () => {
    const { container } = render(<JumpscareBat />);
    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv.className).toContain('pointer-events-none');
  });

  it('should render with fixed positioning', () => {
    const { container } = render(<JumpscareBat />);
    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv.className).toContain('fixed');
  });

  it('should have z-index 9999', () => {
    const { container } = render(<JumpscareBat />);
    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv.style.zIndex).toBe('9999');
  });

  it('should render BatIcon component', () => {
    const { container } = render(<JumpscareBat />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 512 512');
  });

  it('should apply drop shadow and blur filter', () => {
    const { container } = render(<JumpscareBat />);
    const filterDiv = container.querySelector('div[style*="filter"]') as HTMLElement;
    expect(filterDiv).toBeInTheDocument();
    expect(filterDiv.style.filter).toContain('drop-shadow');
    expect(filterDiv.style.filter).toContain('blur');
  });
});
