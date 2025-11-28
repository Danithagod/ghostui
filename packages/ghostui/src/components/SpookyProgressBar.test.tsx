import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpookyProgressBar } from './SpookyProgressBar';

describe('SpookyProgressBar - Basic Functionality', () => {
  it('should render without crashing', () => {
    render(<SpookyProgressBar value={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should clamp values below 0 to 0%', () => {
    render(<SpookyProgressBar value={-10} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should clamp values above 100 to 100%', () => {
    render(<SpookyProgressBar value={150} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should render blood variant by default', () => {
    render(<SpookyProgressBar value={50} />);
    expect(screen.getByText('blood')).toBeInTheDocument();
  });

  it('should render candle variant when specified', () => {
    render(<SpookyProgressBar value={50} variant="candle" />);
    expect(screen.getByText('candle')).toBeInTheDocument();
  });

  it('should render soul variant when specified', () => {
    render(<SpookyProgressBar value={50} variant="soul" />);
    expect(screen.getByText('soul')).toBeInTheDocument();
  });

  it('should display correct percentage for valid values', () => {
    render(<SpookyProgressBar value={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should round decimal values', () => {
    render(<SpookyProgressBar value={33.7} />);
    expect(screen.getByText('34%')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<SpookyProgressBar value={50} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
