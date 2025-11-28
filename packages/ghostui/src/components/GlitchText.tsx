import React from 'react';
import { cn } from '../lib/utils';

export interface GlitchTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
    text: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    intensity?: 'low' | 'medium' | 'high';
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
    text,
    as: Component = 'h1',
    intensity = 'medium',
    className,
    ...props
}) => {
    const intensityMap = {
        low: {
            offset: '2px',
            duration: '4s',
        },
        medium: {
            offset: '4px',
            duration: '3s',
        },
        high: {
            offset: '6px',
            duration: '2s',
        },
    };

    const { offset, duration } = intensityMap[intensity];

    return (
        <Component
            className={cn(
                "relative inline-block font-display text-ghost-white uppercase tracking-widest",
                className
            )}
            data-text={text}
            {...props}
        >
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-ghost-purple opacity-70 animate-glitch-1"
                aria-hidden="true"
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)',
                    transform: `translate(-${offset}, -${offset})`,
                    animationDuration: duration,
                }}
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-ghost-green opacity-70 animate-glitch-2"
                aria-hidden="true"
                style={{
                    clipPath: 'polygon(0 65%, 100% 65%, 100% 100%, 0 100%)',
                    transform: `translate(${offset}, ${offset})`,
                    animationDuration: duration,
                    animationDelay: '0.1s',
                }}
            >
                {text}
            </span>
            <style>{`
        @keyframes glitch-1 {
          0% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-${offset}, -${offset}); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 55%, 0 55%); transform: translate(${offset}, ${offset}); }
          40% { clip-path: polygon(0 10%, 100% 10%, 100% 45%, 0 45%); transform: translate(-${offset}, ${offset}); }
          60% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translate(${offset}, -${offset}); }
          80% { clip-path: polygon(0 40%, 100% 40%, 100% 70%, 0 70%); transform: translate(-${offset}, 0); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-${offset}, -${offset}); }
        }
        @keyframes glitch-2 {
          0% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(${offset}, ${offset}); }
          20% { clip-path: polygon(0 45%, 100% 45%, 100% 85%, 0 85%); transform: translate(-${offset}, -${offset}); }
          40% { clip-path: polygon(0 50%, 100% 50%, 100% 90%, 0 90%); transform: translate(${offset}, -${offset}); }
          60% { clip-path: polygon(0 20%, 100% 20%, 100% 60%, 0 60%); transform: translate(-${offset}, ${offset}); }
          80% { clip-path: polygon(0 30%, 100% 30%, 100% 70%, 0 70%); transform: translate(${offset}, 0); }
          100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(${offset}, ${offset}); }
        }
        .animate-glitch-1 {
          animation: glitch-1 ${duration} infinite linear alternate-reverse;
        }
        .animate-glitch-2 {
          animation: glitch-2 ${duration} infinite linear alternate-reverse;
        }
      `}</style>
        </Component>
    );
};
