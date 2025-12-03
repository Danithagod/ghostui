import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GooeyProgressBar } from './GooeyProgressBar';

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
