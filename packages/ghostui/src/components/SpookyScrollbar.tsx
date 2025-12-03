'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// --- Styles ---
const styles = `
/* Hide native scrollbar for various browsers */
.hide-native-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-native-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Ghost Floating Animation */
@keyframes ghost-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
`;

// --- The Peeking Ghost (Scrollbar Thumb) ---
const PeekingGhost = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 174.57 164.28" 
      className={cn("w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ animation: 'ghost-float 3s ease-in-out infinite' }}>
        <path 
          fill="#ffffff" 
          d="M159.58,87.56c-23.92-9.2-44.68-10.73-78.18-69.63C56.52-25.82,6.76,15.3,37.87,89.33s104.93,80.6,110.08,72.05c5.15-8.55-14.91-20.39-2.42-25.65,12.49-5.26,32.75-.1,28.45-10.9-4.3-10.8-22.72-16.55-8.6-21.24,14.12-4.69,2.17-12.96-5.8-16.02Z"
        />
        <path 
          fill="#2b2b28" 
          d="M42.43,23.31c-.36,2.1-1.5,3.78-2.53,3.74s-1.59-1.78-1.23-3.88c.36-2.1,1.5-3.78,2.53-3.74,1.04.04,1.59,1.78,1.23,3.88Z"
        />
        <path 
          fill="#2b2b28" 
          d="M54.14,22.78c.36,2.13-.15,4.06-1.14,4.32-.99.25-2.08-1.27-2.44-3.4-.36-2.13.15-4.06,1.14-4.32.99-.25,2.08,1.27,2.44,3.4Z"
        />
        <path 
          fill="#2b2b28" 
          d="M55.18,40.26c1.67,5.63-.17,11.28-4.12,12.63-3.95,1.34-8.5-2.13-10.17-7.76-1.67-5.63.17-11.28,4.12-12.63,3.95-1.34,8.5,2.13,10.17,7.76Z"
        />
        <path 
          fill="#ffffff" 
          d="M91.39,40.23s20.26,8.26,34.47,3.98,11.53,19.96-12.92,20.27c-24.44.31-21.56-24.24-21.56-24.24Z" 
          opacity="0.5"
        />
        <path 
          fill="#ffffff" 
          d="M31.75,71.66c-5.18-16.45-12.67-23.61-26.6-28.73-13.94-5.11,2.77-22.88,22.5-8.45,19.73,14.44,6.91,46.09,4.11,37.17Z" 
          opacity="0.3"
        />
      </g>
    </svg>
  );
};

// --- The Jump Scare Ghost (Scroll End) ---
const JumpScareGhost = ({ className }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 116.24 100.37" 
      className={cn("w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Main Body */}
        <path 
          fill="#f9f8f7" 
          d="M70.58,2.81c-11.62-6.35-23.33-1.1-32.03,7.42-1.62,1.58-3.63,3.01-5.76,3.82-6.14,2.33-12.92,2.27-19.28,3.81-7.11,1.73-7.83,5.94-7.98,12.28-.19,8.37-2.03,17.7-4.3,25.74-.86,3.03-3.2,9.49,2.28,6.87,3.45-1.65,8.91-8.56,12.86-6.5,3.29,1.71,2.01,7.09,4.59,9.14,1.74,1.38,2.29.3,3.47-1.32,1.56-2.14,3.82-4.46,5.93-.74,1.62,2.85,1.01,7.4.42,10.52-1.03,5.44-3.8,10.7-4.53,16.18-.64,4.79,1.51,6.43,5.73,4.24,2.06-1.07,4.03-2.74,6.27-3.38,4.32-1.24,6.27.99,7.84,4.43,1.68,3.7,4.5,7.46,7.97,3.07,2.53-3.2,4.41-12.03,9.98-7.76,2.17,1.66,2.36,4.64,4.3,6.38,3.47,3.11,4.44-1.11,7.4-1.94,2.36-.66,3.98,2.69,6.88,1.82,3.76-1.12,4.01-4.44,3-7.64-.87-2.78-2.12-5.37-3.13-8.08-1.5-4.04-4.41-17.51,2.01-18.75,4.81-.93,6.43,7.02,12.19,3.72,3.27-1.87,2.64-4.52,2.36-7.57-.29-3.2-1.48-8.14,2.76-6.99,3.15.85,5.51,3.68,8.8,4.13,4.54.61,5.64-3.41,5.63-7.16-.02-9.46-.99-22.74-10.74-27.4-2.95-1.41-6.34-1.81-9.57-2.31-.61-.1-1.22-.19-1.82-.31-1.97-.37-3.83-.95-5.58-1.91-2.83-1.56-5.35-4.75-7.85-6.88-3.13-2.67-6.49-4.97-10.1-6.94Z"
        />
        {/* Eyes */}
        <g>
          <path 
            fill="#3a4d57" 
            d="M44.79,33.52s15.08,7.03,28.62-1.11c0,0-1.2,17.91-14.31,17.39-13.11-.51-14.31-16.28-14.31-16.28Z"
          />
          <path 
            fill="#f9f8f7" 
            d="M70.63,28.2s.91,6.81-3.81,11.23c0,0,1.28-4.92-.64-10.51l4.45-.72Z"
          />
          <path 
            fill="#f9f8f7" 
            d="M48.92,28.66s-.91,6.81,3.81,11.23c0,0-1.28-4.92.64-10.51l-4.45-.72Z"
          />
        </g>
        {/* Cheeks/Details */}
        <path 
          fill="#3a4d57" 
          d="M63.07,30.9c.01-1.42,1.48-3.65,2.24-4.84,1.59-2.49,3.12-4.98,4.5-7.58.99-1.87,1.87-3.81,3.02-5.59.26-.41.63-1.25,1.13-1.3.72,1.74.06,4.12-.36,5.85-.67,2.75-2.22,5.22-3.92,7.44-1.34,1.75-2.56,3.3-4.47,4.44-.68.41-1.82.78-2.16,1.6Z"
        />
        <path 
          fill="#3a4d57" 
          d="M55.04,30.9c-.01-1.42-1.48-3.65-2.24-4.84-1.59-2.49-3.12-4.98-4.5-7.58-.99-1.87-1.87-3.81-3.02-5.59-.26-.41-.63-1.25-1.13-1.3-.72,1.74-.06,4.12.36,5.85.67,2.75,2.22,5.22,3.92,7.44,1.34,1.75,2.56,3.3,4.47,4.44.68.41,1.82.78,2.16,1.6Z"
        />
        {/* Highlights */}
        <g>
          <path 
            fill="#eae6e3" 
            d="M90.9,62.71c-1.33-3.12-3.59-5.45-4.96-8.61-.62-1.43-1.63-6.33-3.45-3.52-1.39,2.15-1.54,6.26-1.59,8.79-.04,2.49-.19,5.11-.14,7.72.45-2.4,1.55-4.24,3.73-4.66,3.28-.63,5.07,2.86,7.71,4.1-.42-1.35-.82-2.69-1.3-3.82Z"
          />
          <path 
            fill="#eae6e3" 
            d="M73.66,29.68c.49.01,1.48-.73,1.88-1.01.98-.71,1.34-1.6,1.66-2.74.47-1.67.26-3.47-.72-4.28-.18,2.12-1.03,4.46-2.2,6.25-.32.49-1.82,1.75-.63,1.78Z"
          />
          <path 
            fill="#eae6e3" 
            d="M63.48,85.18c-.65-2.75-1.11-5.49-1.29-8.31-.09-1.4.64-6.43-.67-7.17-1.66,1.71-2.19,5.11-2.54,7.36-.58,3.79-.98,7.74-1.74,11.49-.47,2.32-1.84,4.26-2.39,6.53-.21.85-.45,1.95-.67,3.15,2.46-3.33,4.38-11.79,9.86-7.59.29.22.54.47.77.73-.4-2.06-.83-4.11-1.32-6.18Z"
          />
          <path 
            fill="#eae6e3" 
            d="M79.81,95.51c-1.03-2.61-1.67-5.48-2.77-8.05-.53-1.25-1.12-2.12-1.51-3.46-.38-1.3-.45-2.91-.92-4.14-.68-1.79-1.22-1.49-1.66.26-1.24,4.94.63,10.65.09,15.68-.05.44-.19.89-.35,1.35.89-.76,1.79-1.72,3.05-2.08,1.72-.48,3.04,1.16,4.75,1.75-.26-.41-.49-.84-.68-1.32Z"
          />
          <path 
            fill="#eae6e3" 
            d="M107.21,53.1c-.65-1.98-1.09-4.31-1.99-6.17-.64-1.33-2.24-3.5-3.52-4.29-1.92-1.19-2.37.28-2.8,2.1-.68,2.87-.46,5.57-.1,8.34.28-1.27,1.07-2.01,3.01-1.49,2.21.6,4.04,2.17,6.08,3.2-.24-.54-.47-1.09-.67-1.69Z"
          />
          <path 
            fill="#eae6e3" 
            d="M65.88,52.17c-1.77.03-3.32,1.55-5.06,1.64-2.81.15-5.11-.93-7.75-1.17.12,8.15,13.33,6.63,12.81-.47Z"
          />
          <path 
            fill="#eae6e3" 
            d="M46.99,29.9c1.14-.8-.06-.83-.83-1.57-1.09-1.02-2.84-2.54-2.91-4.1-1.22,1.58.34,8.07,3.75,5.67Z"
          />
          <path 
            fill="#eae6e3" 
            d="M30.44,75.4c.78-2.31,1.29-4.68,1.62-7.17.55-4.16.79-8.04.93-12.22.07-2.16.58-5.65-.58-7.53-1.88,2.29-3.05,4.83-4.07,7.68-1.05,2.93-2.97,5.35-4.12,8.22.07-.1.15-.21.23-.32,1.56-2.14,3.82-4.46,5.93-.74,1.62,2.85,1.01,7.4.42,10.52-.1.52-.23,1.04-.35,1.56Z"
          />
          <path 
            fill="#eae6e3" 
            d="M64.51,18.33c-.92,1.31-1.64,2.78-2.53,4.12-.79,1.19-2.62,4.26-4.37,2.48-1.26-1.29-2-3.3-2.83-4.9-.53-1.03-2.27-5.02-3.28-5.12-.36,2.4,1.63,5.76,2.73,7.7.94,1.67,1.61,3.46,2.25,5.26.34.97.68,3.5,1.8,3.85.84.26,2.91-3.78,4.4-6.94.75-1.58,1.35-2.94,1.57-3.43.41-.89,3.62-6.22,2.85-6.59-.54,1.31-1.79,2.39-2.6,3.56Z"
          />
          <path 
            fill="#eae6e3" 
            d="M18.41,51.49c-.12-3.59.44-8.35-1.34-11.5-3.03,1.24-3.9,8.47-4.9,11.23-1.28,3.51-3.55,6.38-5.58,9.41,3.15-2.53,6.88-5.89,9.8-4.37,2.28,1.18,2.36,4.14,3.06,6.52-.31-3.77-.91-7.56-1.03-11.28Z"
          />
          <path 
            fill="#eae6e3" 
            d="M46.64,91.89c-.66-3.63-.59-7.21-1.03-10.85-.19-1.57-.19-4.94-1.25-6.18-1.61-1.89-2.74.99-3.54,2.56-1.64,3.22-4.06,5.99-6.03,9.03-1.44,2.22-2.45,4.71-3.91,6.92-.42.64-.93,1.22-1.44,1.8.74-.11,1.58-.4,2.54-.9,2.06-1.07,4.03-2.74,6.27-3.38,4.32-1.24,6.27.99,7.84,4.43.49,1.07,1.07,2.14,1.73,3.02-.37-2.19-.8-4.37-1.18-6.45Z"
          />
        </g>
      </g>
    </svg>
  );
};

// --- Scrollbar Component ---
export interface SpookyScrollbarProps {
  children: React.ReactNode;
  className?: string;
}

export const SpookyScrollbar: React.FC<SpookyScrollbarProps> = ({ children, className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollTop, setScrollTop] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showJumpScare, setShowJumpScare] = useState(false);

  // Update thumb size and position based on content
  const handleScroll = useCallback(() => {
    if (!contentRef.current || !trackRef.current) return;

    const { scrollTop: contentTop, scrollHeight, clientHeight } = contentRef.current;
    const trackHeight = trackRef.current.clientHeight;

    // Calculate thumb height proportional to content
    const newThumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      40 // Minimum height
    );

    // Calculate thumb position percentage
    const scrollRatio = contentTop / (scrollHeight - clientHeight);
    const maxThumbTop = trackHeight - newThumbHeight;
    const thumbTop = scrollRatio * maxThumbTop;

    setThumbHeight(newThumbHeight);
    setScrollTop(thumbTop);

    // --- Jump Scare Trigger Logic ---
    // Trigger if we are within 10px of the bottom
    const distFromBottom = scrollHeight - contentTop - clientHeight;
    if (distFromBottom < 10) {
      if (!showJumpScare) setShowJumpScare(true);
    } else {
      // Hide if user scrolls away
      if (showJumpScare) setShowJumpScare(false);
    }
  }, [showJumpScare]);

  // Initial setup and resize observer
  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      handleScroll();

      const observer = new ResizeObserver(handleScroll);
      observer.observe(content);

      return () => {
        content.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    }
  }, [handleScroll]);

  // Dragging Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !contentRef.current || !trackRef.current) return;
      e.preventDefault();

      const trackRect = trackRef.current.getBoundingClientRect();
      const trackTop = trackRect.top;
      const trackHeight = trackRect.height;
      const relativeY = e.clientY - trackTop - (thumbHeight / 2);
      const scrollRatio = Math.max(0, Math.min(1, relativeY / (trackHeight - thumbHeight)));

      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;
      contentRef.current.scrollTop = scrollRatio * (scrollHeight - clientHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, thumbHeight]);

  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden rounded-lg transition-all duration-300", className)}
      style={{
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'var(--ghost-border)',
        backgroundColor: 'var(--ghost-bg-secondary)',
        boxShadow: `0 0 20px rgba(var(--ghost-accent-rgb), 0.3), 0 0 40px rgba(var(--ghost-accent-rgb), 0.15)`,
      }}
    >
      <style>{styles}</style>

      {/* 1. The Scrollable Content Area */}
      <div 
        ref={contentRef}
        className="w-full h-full overflow-y-auto hide-native-scrollbar pr-4 relative z-10"
      >
        {children}
      </div>

      {/* 2. The Custom Scrollbar Track */}
      <div 
        ref={trackRef}
        className="absolute top-2 bottom-2 right-1 w-3 rounded-full z-50 transition-colors duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => !isDragging && setIsHovering(false)}
      >
        {/* 3. The Draggable Thumb */}
        <div
          className="absolute w-full rounded-full cursor-pointer transition-all duration-200"
          style={{ 
            height: thumbHeight, 
            top: scrollTop,
            backgroundColor: (isHovering || isDragging) 
              ? 'var(--ghost-accent)' 
              : `rgba(var(--ghost-accent-rgb), 0.5)`,
          }}
          onMouseDown={(e) => {
            e.stopPropagation(); // Prevent track click
            setIsDragging(true);
          }}
        >
          {/* Popover Ghost on Hover/Drag */}
          <AnimatePresence>
            {(isHovering || isDragging) && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.5, rotate: 20 }}
                animate={{ opacity: 1, x: -60, scale: 1, rotate: -10 }}
                exit={{ opacity: 0, x: 10, scale: 0.5, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none"
              >
                <PeekingGhost />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -top-8 -left-8 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap"
                >
                  Boo! Scrolled ya!
                  <div className="absolute bottom-0 right-2 w-2 h-2 bg-white rotate-45 translate-y-1" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glow effect on the thumb */}
          <div 
            className={cn(
              "absolute inset-0 blur-md rounded-full transition-opacity duration-300",
              (isHovering || isDragging) ? "opacity-100" : "opacity-0"
            )}
            style={{
              backgroundColor: 'var(--ghost-accent)',
            }}
          />
        </div>
      </div>

      {/* 5. The Jump Scare Overlay */}
      <AnimatePresence>
        {showJumpScare && (
          <>
            {/* Dark Overlay Fade */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-40 pointer-events-none flex flex-col items-center justify-end pb-0"
            >
              {/* The Big Scare Ghost */}
              <motion.div
                initial={{ y: "100%", scale: 0 }}
                animate={{ y: "10%", scale: 1.5 }}
                exit={{ y: "100%", scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-64 h-64 relative"
              >
                <JumpScareGhost />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 text-white font-black text-2xl uppercase tracking-widest"
                  style={{
                    filter: `drop-shadow(0 0 10px var(--ghost-accent)) drop-shadow(0 0 20px var(--ghost-accent))`,
                  }}
                >
                  The End Is Here
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
