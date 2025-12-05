'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GooeyButton, CoffinCard } from 'ghostui-react';
import { Zap, Moon, Skull, Flame, Eye } from 'lucide-react';
import { usePageTransition } from '@/components/PageTransition';

// Global Styles - exactly matching the original
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Inter:wght@300;400;600;900&family=Cinzel:wght@400;700&display=swap');
    
    :root {
      --ghost-purple: #A855F7;
      --ghost-blue: #3B82F6;
      --ghost-orange: #FF6F00;
      --ghost-yellow: #FBBF24;
    }
    
    body {
      background-color: #030005;
      color: #e5e5e5;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    
    .font-creep { 
      font-family: 'Creepster', cursive !important; 
    }
    
    .noise-bg {
      position: fixed;
      top: 0; 
      left: 0; 
      width: 100vw; 
      height: 100vh;
      pointer-events: none;
      z-index: 50;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
    }
    
    /* Override any base h1 styles for the gooey title */
    .gooey-title-text {
      font-family: 'Creepster', cursive !important;
      font-size: 6rem !important;
      line-height: 0.85 !important;
      color: transparent !important;
      background: linear-gradient(to bottom, var(--ghost-yellow), var(--ghost-orange)) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      letter-spacing: 0.1em !important;
      position: relative !important;
      z-index: 20 !important;
      filter: drop-shadow(0 5px 15px rgba(249, 115, 22, 0.5)) !important;
      margin: 0 !important;
    }
    
    @media (min-width: 768px) {
      .gooey-title-text {
        font-size: 12rem !important;
      }
    }
  `}} />
);

// Gooey Title Component - Drips from letter positions with local cursor effects
const GooeyTitle = () => {
  const [colorTheme, setColorTheme] = React.useState<'orange' | 'slime' | 'spec' | 'blood'>('orange');
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastPosRef = React.useRef({ x: 0, y: 0 });
  const lastTimeRef = React.useRef(Date.now());

  const colorThemes = {
    orange: {
      gradient: 'linear-gradient(to bottom, #FBBF24, #FF6F00)',
      drip: '#FF6F00',
      glow: 'rgba(249, 115, 22, 0.4)',
      cursorGlow: '#FF6F00',
      secondary: '#FBBF24',
    },
    slime: {
      gradient: 'linear-gradient(to bottom, #84CC16, #22C55E)',
      drip: '#22C55E',
      glow: 'rgba(34, 197, 94, 0.4)',
      cursorGlow: '#22C55E',
      secondary: '#84CC16',
    },
    spec: {
      gradient: 'linear-gradient(to bottom, #C084FC, #A855F7)',
      drip: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.4)',
      cursorGlow: '#A855F7',
      secondary: '#C084FC',
    },
    blood: {
      gradient: 'linear-gradient(to bottom, #EF4444, #991B1B)',
      drip: '#991B1B',
      glow: 'rgba(153, 27, 27, 0.4)',
      cursorGlow: '#991B1B',
      secondary: '#EF4444',
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    
    // Calculate velocity
    const now = Date.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const vx = (x - lastPosRef.current.x) / dt * 16;
    const vy = (y - lastPosRef.current.y) / dt * 16;
    
    setVelocity({ x: vx, y: vy });
    lastPosRef.current = { x, y };
    lastTimeRef.current = now;
    
    setMousePos({ x, y });
    
    // Change color based on horizontal position
    const position = x / width;
    if (position < 0.33) {
      setColorTheme('slime');
    } else if (position < 0.66) {
      setColorTheme('spec');
    } else {
      setColorTheme('blood');
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setColorTheme('orange');
    setMousePos({ x: 0, y: 0 });
    setIsHovering(false);
    setVelocity({ x: 0, y: 0 });
  };

  const currentTheme = colorThemes[colorTheme];
  const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const isMovingFast = velocityMagnitude > 5;

  // Drips positioned at bottom of letters: G, H, O, S, T, U, I
  const drips = [
    { id: 1, left: "7%", size: 14, duration: 3.5, delay: 0 },      // G
    { id: 2, left: "18%", size: 10, duration: 4, delay: 1.2 },     // H
    { id: 3, left: "29%", size: 16, duration: 3.8, delay: 0.5 },   // O
    { id: 4, left: "42%", size: 12, duration: 4.2, delay: 1.8 },   // S
    { id: 5, left: "54%", size: 14, duration: 3.6, delay: 0.8 },   // T
    { id: 6, left: "72%", size: 13, duration: 4.1, delay: 1.5 },   // U
    { id: 7, left: "85%", size: 11, duration: 3.9, delay: 0.3 },   // I
  ];

  return (
    <div 
      ref={containerRef}
      className="relative group cursor-pointer z-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Primary Glow Aura - follows cursor with spring physics */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-10"
          style={{
            width: 180,
            height: 180,
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: mousePos.x - 90,
            y: mousePos.y - 90,
            backgroundColor: currentTheme.cursorGlow,
            scale: isMovingFast ? 1.3 : [1, 1.15, 1],
            opacity: isMovingFast ? 0.6 : [0.4, 0.55, 0.4],
          }}
          transition={{
            x: { type: 'spring', damping: 25, stiffness: 180, mass: 0.5 },
            y: { type: 'spring', damping: 25, stiffness: 180, mass: 0.5 },
            backgroundColor: { duration: 0.5 },
            scale: { duration: isMovingFast ? 0.2 : 2, repeat: isMovingFast ? 0 : Infinity, ease: 'easeInOut' },
            opacity: { duration: isMovingFast ? 0.2 : 2, repeat: isMovingFast ? 0 : Infinity, ease: 'easeInOut' },
          }}
        />
      )}

      {/* Secondary Inner Glow - tighter, more intense */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none rounded-full z-10"
          style={{
            width: 80,
            height: 80,
            filter: 'blur(30px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            x: mousePos.x - 40,
            y: mousePos.y - 40,
            backgroundColor: currentTheme.secondary,
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            x: { type: 'spring', damping: 20, stiffness: 250, mass: 0.3 },
            y: { type: 'spring', damping: 20, stiffness: 250, mass: 0.3 },
            backgroundColor: { duration: 0.4 },
            opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      )}

      {/* Trailing particles when moving fast */}
      {isHovering && isMovingFast && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none rounded-full z-5"
              style={{
                width: 12 - i * 3,
                height: 12 - i * 3,
                filter: 'blur(4px)',
                backgroundColor: currentTheme.cursorGlow,
              }}
              animate={{
                x: mousePos.x - (6 - i * 1.5) - velocity.x * (i + 1) * 2,
                y: mousePos.y - (6 - i * 1.5) - velocity.y * (i + 1) * 2,
                opacity: [0.6 - i * 0.15, 0],
                scale: [1, 0.5],
              }}
              transition={{
                x: { type: 'spring', damping: 30 - i * 5, stiffness: 150 },
                y: { type: 'spring', damping: 30 - i * 5, stiffness: 150 },
                opacity: { duration: 0.4, ease: 'easeOut' },
                scale: { duration: 0.4, ease: 'easeOut' },
              }}
            />
          ))}
        </>
      )}

      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Goo filter for drips */}
          <filter id="text-goo-3d-orange" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          
          {/* Glossy highlight filter for title */}
          <filter id="title-highlight" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.5" specularExponent="40" lightingColor="#FFFFFF" result="specular">
              <fePointLight x="-150" y="-250" z="400" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceGraphic" operator="in" result="specularClean" />
            <feComposite in="SourceGraphic" in2="specularClean" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>
      </svg>

      {/* 2. Content Container */}
      <div className="relative select-none">
        {/* Main Text with glossy highlights */}
        <motion.h1 
          style={{
            fontFamily: 'Creepster, cursive',
            fontSize: 'clamp(8rem, 15vw, 16rem)',
            lineHeight: '0.85',
            color: 'transparent',
            backgroundImage: currentTheme.gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            letterSpacing: '0.1em',
            position: 'relative',
            zIndex: 20,
            margin: 0,
            padding: 0,
            whiteSpace: 'nowrap',
            filter: `url(#title-highlight) drop-shadow(0 8px 20px ${currentTheme.glow})`
          }}
          animate={{
            backgroundImage: currentTheme.gradient,
            filter: `url(#title-highlight) drop-shadow(0 8px 20px ${currentTheme.glow})`,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          GHOST UI
        </motion.h1>

        {/* Organic Drips from letter bottoms */}
        {drips.map((drip) => (
          <div 
            key={drip.id}
            className="absolute"
            style={{ 
              left: drip.left,
              top: '85%',
              filter: "url(#text-goo-3d-orange)"
            }}
          >
            {/* The Droplet */}
            <motion.div
              className="absolute rounded-full"
              style={{ 
                width: drip.size, 
                height: drip.size,
                left: -drip.size / 2
              }}
              animate={{ 
                y: [0, 120],
                scaleY: [1, 1.3, 1.6, 0.8, 0],
                scaleX: [1, 0.85, 0.7, 0.5, 0],
                opacity: [0, 1, 1, 1, 0],
                backgroundColor: currentTheme.drip,
              }}
              transition={{ 
                duration: drip.duration,
                repeat: Infinity, 
                ease: [0.4, 0, 0.6, 1],
                delay: drip.delay,
                repeatDelay: 2,
                backgroundColor: { duration: 0.5 },
              }}
            />
            {/* The Stem */}
            <motion.div
              className="absolute rounded-b-full"
              style={{ 
                width: drip.size * 0.4,
                left: -drip.size * 0.2,
                top: 0
              }}
              animate={{ 
                height: [0, drip.size * 4, drip.size * 2, 0],
                opacity: [0, 1, 1, 0],
                backgroundColor: currentTheme.drip,
              }}
              transition={{ 
                duration: drip.duration,
                repeat: Infinity, 
                ease: [0.4, 0, 0.6, 1],
                delay: drip.delay,
                repeatDelay: 2,
                backgroundColor: { duration: 0.5 },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Hero Section with title, description, and buttons all vertically centered
interface HeroProps {
  onGetStarted: () => void;
  onBrowseComponents: () => void;
  onSeeExamples: () => void;
}

const Hero = ({ onGetStarted, onBrowseComponents, onSeeExamples }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#030005]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-to-b from-orange-900/30 via-transparent to-yellow-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#2e1a0b] to-transparent blur-3xl opacity-60" />
      </div>

      {/* Main Content - All vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-15 max-w-4xl">
        {/* Gooey Title */}
        <GooeyTitle />

        {/* Description - with extra top margin for spacing */}
        <p className="text-xl text-ghost-white/90 md:text-2xl font-light max-w-3xl mt-8 text-center">
          A Halloween-themed, atmospheric React component library engineered for 
          <span className="text-ghost-purple font-semibold"> highly animated</span>, 
          <span className="text-ghost-green font-semibold"> cinematic</span> user experiences.
        </p>

        <p className="text-base text-ghost-white/60 md:text-lg max-w-2xl text-center">
          31 production-ready components with supernatural animations, TypeScript support, and SSR compatibility.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <GooeyButton variant="slime" className="px-8 py-4 text-lg" onClick={onGetStarted}>
            Get Started
          </GooeyButton>
          <GooeyButton variant="ectoplasm" className="px-8 py-4 text-lg" onClick={onBrowseComponents}>
            Browse Components
          </GooeyButton>
          <GooeyButton variant="blood" className="px-8 py-4 text-lg" onClick={onSeeExamples}>
            See Examples
          </GooeyButton>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-ghost-white/70 text-sm pt-4">
          <div className="flex items-center gap-2">
            <Skull className="h-4 w-4 text-ghost-purple" />
            <span>31 Components</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-ghost-blood" />
            <span>TypeScript First</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-ghost-green" />
            <span>SSR Ready</span>
          </div>
        </div>
      </div>

      {/* Foreground Elements */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#030005] to-transparent z-20 pointer-events-none" />
    </section>
  );
};

// Main Page Component
export default function HomePage() {
  const { triggerTransition } = usePageTransition();

  const handleGetStarted = () => triggerTransition('slime', '/docs/getting-started');
  const handleBrowseComponents = () => triggerTransition('ectoplasm', '/docs/components/gooey-button');
  const handleSeeExamples = () => triggerTransition('blood', '/docs/examples');

  return (
    <>
      <GlobalStyles />
      <div className="noise-bg" />
      <main className="bg-[#030005] min-h-screen selection:bg-orange-500/30 selection:text-white relative z-10">
        <Hero 
          onGetStarted={handleGetStarted}
          onBrowseComponents={handleBrowseComponents} 
          onSeeExamples={handleSeeExamples}
        />

        {/* Features Section */}
        <section className="relative px-8 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-20 flex flex-col items-center">
              <h2 className="mb-6 text-2xl font-display text-ghost-white pb-5">
                Spectral Features
              </h2>
              <p className="text-xl text-ghost-white/70 max-w-3xl text-center">
                Production-quality components with cinematic animations
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
              <CoffinCard>
                <div className="p-8 h-full flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-ghost-purple/20 ring-2 ring-ghost-purple/30">
                    <Zap className="h-8 w-8 text-ghost-purple" />
                  </div>
                  <h3 className="mb-3 text-2xl font-display text-ghost-white text-center">
                    Atmospheric Animations
                  </h3>
                  <p className="text-ghost-white/70 leading-relaxed flex-grow text-center">
                    Liquid distortion, spectral glows, and physics-based motion powered by Framer Motion.
                  </p>
                </div>
              </CoffinCard>

              <CoffinCard>
                <div className="p-8 h-full flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-ghost-green/20 ring-2 ring-ghost-green/30">
                    <Zap className="h-8 w-8 text-ghost-green" />
                  </div>
                  <h3 className="mb-3 text-2xl font-display text-ghost-white text-center">
                    TypeScript First
                  </h3>
                  <p className="text-ghost-white/70 leading-relaxed flex-grow text-center">
                    Fully typed components with comprehensive prop interfaces and IntelliSense support.
                  </p>
                </div>
              </CoffinCard>

              <CoffinCard>
                <div className="p-8 h-full flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-ghost-blood/20 ring-2 ring-ghost-blood/30">
                    <Moon className="h-8 w-8 text-ghost-blood" />
                  </div>
                  <h3 className="mb-3 text-2xl font-display text-ghost-white text-center">
                    SSR Compatible
                  </h3>
                  <p className="text-ghost-white/70 leading-relaxed flex-grow text-center">
                    Works seamlessly with Next.js App Router and other SSR frameworks.
                  </p>
                </div>
              </CoffinCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-8 py-32 text-center">
          <div className="relative z-10">
            <h2 className="mb-6 text-5xl font-display text-ghost-white md:text-6xl">
              Ready to Haunt Your App?
            </h2>
            <p className="mb-12 text-xl text-ghost-white/70 max-w-2xl mx-auto">
              Explore 31 production-ready components and start building supernatural user experiences today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GooeyButton variant="slime" className="px-8 py-4 text-lg" onClick={handleGetStarted}>
                Get Started Now
              </GooeyButton>
              <GooeyButton variant="ectoplasm" className="px-8 py-4 text-lg" onClick={handleBrowseComponents}>
                Browse Components
              </GooeyButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
