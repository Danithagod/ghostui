import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WhisperBox } from './WhisperBox';

describe('WhisperBox - Task 9: Custom Styles and Embedded CSS', () => {
  it('should render with embedded styles', () => {
    render(<WhisperBox label="Test Label" />);
    
    // Check that the component renders
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('should apply ghost-text class to textarea', () => {
    render(<WhisperBox />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('ghost-text');
  });

  it('should apply font-rune class to label', () => {
    const { container } = render(<WhisperBox label="Test Label" />);
    
    const label = container.querySelector('label');
    expect(label).toHaveClass('font-rune');
  });

  it('should merge custom className with default styles', () => {
    render(<WhisperBox className="custom-class" />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
    expect(textarea).toHaveClass('ghost-text');
    expect(textarea).toHaveClass('bg-[#0a0510]/80');
  });

  it('should render with custom label', () => {
    const customLabel = "Custom Spirit Label";
    const { container } = render(<WhisperBox label={customLabel} />);
    
    const label = container.querySelector('label');
    expect(label).toHaveTextContent(customLabel);
  });

  it('should render with default label when not provided', () => {
    const { container } = render(<WhisperBox />);
    
    const label = container.querySelector('label');
    expect(label).toHaveTextContent("Invoke the Spirits");
  });

  it('should include embedded style tag', () => {
    const { container } = render(<WhisperBox />);
    
    const styleTag = container.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('ghost-text');
    expect(styleTag?.textContent).toContain('font-rune');
    expect(styleTag?.textContent).toContain('Cinzel');
  });
});

describe('WhisperBox - Task 10: Event Handlers and Form Support', () => {
  it('should call user onChange handler while updating internal state', () => {
    const handleChange = vi.fn();
    render(<WhisperBox onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test text' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(textarea.value).toBe('test text');
  });

  it('should call user onFocus handler after setting internal focus state', () => {
    const handleFocus = vi.fn();
    render(<WhisperBox onFocus={handleFocus} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('should call user onBlur handler after setting internal focus state', () => {
    const handleBlur = vi.fn();
    render(<WhisperBox onBlur={handleBlur} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    fireEvent.blur(textarea);
    
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should support form submission with name attribute', () => {
    const handleSubmit = vi.fn((e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      return formData.get('message');
    });

    const { container } = render(
      <form onSubmit={handleSubmit}>
        <WhisperBox name="message" defaultValue="test message" />
        <button type="submit">Submit</button>
      </form>
    );

    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    const formData = new FormData(form);
    expect(formData.get('message')).toBe('test message');
  });

  it('should forward placeholder prop to textarea', () => {
    const placeholder = "Enter your secrets...";
    render(<WhisperBox placeholder={placeholder} />);
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', placeholder);
  });

  it('should work as controlled component', () => {
    const { rerender } = render(<WhisperBox value="initial" onChange={() => {}} />);
    
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('initial');

    rerender(<WhisperBox value="updated" onChange={() => {}} />);
    expect(textarea.value).toBe('updated');
  });

  it('should work as uncontrolled component with defaultValue', () => {
    render(<WhisperBox defaultValue="default text" />);
    
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('default text');

    fireEvent.change(textarea, { target: { value: 'new text' } });
    expect(textarea.value).toBe('new text');
  });

  it('should forward standard textarea attributes', () => {
    render(
      <WhisperBox 
        rows={10}
        maxLength={100}
        disabled={true}
        readOnly={false}
        required={true}
      />
    );
    
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '10');
    expect(textarea).toHaveAttribute('maxlength', '100');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('required');
  });
});
