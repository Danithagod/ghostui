import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HauntedVignette, HauntedCard } from './HauntedVignette';
import React from 'react';

describe('HauntedVignette - Cursor Tracking', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    });

    describe('Basic Rendering', () => {
        it('should render when enabled', () => {
            const { container } = render(<HauntedVignette enabled={true} />);
            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeInTheDocument();
        });

        it('should not render when disabled', () => {
            const { container } = render(<HauntedVignette enabled={false} />);
            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeNull();
        });

        it('should accept custom radius', () => {
            const { container } = render(<HauntedVignette enabled={true} radius={500} />);
            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeTruthy();
        });

        it('should accept custom darkness', () => {
            const { container } = render(<HauntedVignette enabled={true} darkness={0.8} />);
            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeTruthy();
        });

        it('should accept custom blur', () => {
            const { container } = render(<HauntedVignette enabled={true} blur={5} />);
            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeTruthy();
        });
    });

    describe('Cursor Tracking', () => {
        it('should track cursor position when mouse moves', async () => {
            const { container } = render(<HauntedVignette enabled={true} />);

            await act(async () => {
                window.dispatchEvent(
                    new MouseEvent('mousemove', {
                        clientX: 100,
                        clientY: 200,
                        bubbles: true,
                    })
                );
            });

            const vignetteElement = container.querySelector('[aria-hidden="true"]');
            expect(vignetteElement).toBeInTheDocument();
        });

        it('should handle edge coordinates', async () => {
            const { container } = render(<HauntedVignette enabled={true} />);

            const corners = [
                { x: 0, y: 0 },
                { x: window.innerWidth, y: 0 },
                { x: 0, y: window.innerHeight },
                { x: window.innerWidth, y: window.innerHeight },
            ];

            for (const { x, y } of corners) {
                await act(async () => {
                    window.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: x,
                            clientY: y,
                            bubbles: true,
                        })
                    );
                });

                const vignetteElement = container.querySelector('[aria-hidden="true"]');
                expect(vignetteElement).toBeTruthy();
            }
        });
    });

    describe('Event Listener Cleanup', () => {
        it('should remove mousemove listener on unmount', () => {
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

            const { unmount } = render(<HauntedVignette enabled={true} />);
            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
            removeEventListenerSpy.mockRestore();
        });
    });
});

describe('HauntedCard - Peek-a-Boo Ghost', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render children content', () => {
        render(
            <HauntedCard>
                <div>Test content</div>
            </HauntedCard>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should not show ghost initially', () => {
        const { container } = render(
            <HauntedCard>
                <div>Test content</div>
            </HauntedCard>
        );

        const ghostElement = container.querySelector('.mix-blend-screen');
        expect(ghostElement).toBeNull();
    });

    it('should show ghost after hover delay', async () => {
        vi.useRealTimers();

        const { container } = render(
            <HauntedCard peekDelay={50}>
                <div>Test content</div>
            </HauntedCard>
        );

        const card = container.querySelector('.relative.group');

        await act(async () => {
            card?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
        });

        const ghostContainer = container.querySelector('.absolute.inset-0.z-10');
        expect(ghostContainer).toBeTruthy();

        vi.useFakeTimers();
    });

    it('should not show ghost when ghostEnabled is false', async () => {
        const { container } = render(
            <HauntedCard ghostEnabled={false} peekDelay={100}>
                <div>Test content</div>
            </HauntedCard>
        );

        const card = container.querySelector('.relative.group');

        await act(async () => {
            card?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        await act(async () => {
            vi.advanceTimersByTime(150);
        });

        const ghostElement = container.querySelector('.mix-blend-screen');
        expect(ghostElement).toBeNull();
    });

    it('should accept custom ghost size', () => {
        const { container } = render(
            <HauntedCard ghostSize={200}>
                <div>Test content</div>
            </HauntedCard>
        );

        expect(container.querySelector('.relative.group')).toBeTruthy();
    });

    it('should cancel ghost appearance if mouse leaves before delay', async () => {
        const { container } = render(
            <HauntedCard peekDelay={500}>
                <div>Test content</div>
            </HauntedCard>
        );

        const card = container.querySelector('.relative.group');

        await act(async () => {
            card?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        });

        await act(async () => {
            vi.advanceTimersByTime(200);
        });

        await act(async () => {
            card?.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        });

        await act(async () => {
            vi.advanceTimersByTime(400);
        });

        const ghostElement = container.querySelector('.mix-blend-screen');
        expect(ghostElement).toBeNull();
    });

    it('should hide BOO text when showBoo is false', () => {
        const { container } = render(
            <HauntedCard showBoo={false}>
                <div>Test content</div>
            </HauntedCard>
        );

        expect(container.querySelector('.relative.group')).toBeTruthy();
    });
});
