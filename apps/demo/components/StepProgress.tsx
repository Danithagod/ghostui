'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeOptional } from 'ghostui-react';

export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function StepProgress({ currentStep, totalSteps, labels }: StepProgressProps) {
  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const filterId = React.useId().replace(/:/g, '');

  // Calculate progress percentage
  const progress = useMemo(() => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  }, [currentStep, totalSteps]);

  // Theme colors
  const colors = useMemo(() => {
    if (theme === 'blood') {
      return {
        fill: '#8a1c1c',
        glow: 'rgba(220, 38, 38, 0.4)',
        text: '#fca5a5',
        activeText: '#fecaca',
      };
    }
    return {
      fill: '#7c3aed',
      glow: 'rgba(139, 92, 246, 0.4)',
      text: '#c4b5fd',
      activeText: '#e9d5ff',
    };
  }, [theme]);

  return (
    <div className="w-full">
      {/* Step Labels */}
      <div className="flex justify-between mb-3 px-1">
        {labels?.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum <= currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                style={{
                  color: isActive ? colors.activeText : 'rgba(156, 163, 175, 0.6)',
                }}
              >
                {isCurrent && '→ '}{stepNum}. {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* SVG Filter for goo effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`step-goo-${filterId}`} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="2" result="smoothGoo" />
            <feSpecularLighting
              in="smoothGoo"
              surfaceScale="5"
              specularConstant="1.2"
              specularExponent="20"
              lightingColor="#ffffff"
              result="specular"
            >
              <fePointLight x="-100" y="-200" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="goo" operator="in" result="specularClean" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" result="solidGoo" />
            <feComposite in="specularClean" in2="solidGoo" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Progress Bar */}
      <div 
        className="relative h-5 w-full"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Background Track */}
        <div className="absolute inset-0 rounded-full border bg-gray-900/50 border-gray-700/50" />

        {/* Fill Layer with goo effect */}
        <div 
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ filter: `url(#step-goo-${filterId})` }}
        >
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              backgroundColor: colors.fill,
              boxShadow: `0 0 15px ${colors.glow}`,
            }}
            initial={false}
            animate={{ width: `${Math.max(progress, 5)}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            {/* Drips */}
            {progress > 0 && (
              <>
                <motion.div
                  className="absolute right-0 top-full w-3 h-3 -mt-1.5 rounded-full"
                  style={{ backgroundColor: colors.fill }}
                  animate={{ height: [8, 18, 8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-3 top-full w-2 h-2 -mt-1.5 rounded-full"
                  style={{ backgroundColor: colors.fill }}
                  animate={{ height: [6, 14, 6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
              </>
            )}
          </motion.div>
        </div>

        {/* Completion Effect */}
        <AnimatePresence>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 1, 0], scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-white/50 pointer-events-none"
              style={{ boxShadow: `0 0 15px ${colors.glow}` }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Step percentage */}
      <div className="flex justify-end mt-1">
        <span className="text-xs font-mono" style={{ color: colors.text }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
}
