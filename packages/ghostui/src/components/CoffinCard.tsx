import React from 'react';
import { cn } from '../lib/utils';
import { WithTooltipProps } from '../types/tooltip';
import { SpookyTooltip } from './SpookyTooltip';

export interface CoffinCardProps extends React.HTMLAttributes<HTMLDivElement>, WithTooltipProps {
    children: React.ReactNode;
}

export function CoffinCard({ 
    className, 
    children, 
    tooltip,
    tooltipPosition,
    tooltipClassName,
    ...props 
}: CoffinCardProps) {
    const cardComponent = (
        <div
            className={cn(
                "relative bg-gray-900 text-ghost-white p-8",
                "before:absolute before:inset-0 before:bg-ghost-purple/10 before:clip-path-coffin",
                "clip-path-coffin drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]",
                className
            )}
            style={{
                clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)"
            }}
            {...props}
        >
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );

    // Conditionally wrap with tooltip if tooltip prop is provided
    if (!tooltip) {
        return cardComponent;
    }

    return (
        <SpookyTooltip
            content={tooltip}
            position={tooltipPosition}
            className={tooltipClassName}
        >
            {cardComponent}
        </SpookyTooltip>
    );
}

CoffinCard.displayName = 'CoffinCard';
