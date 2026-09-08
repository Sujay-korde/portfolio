import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
  onExitStart?: () => void;
}

// Reference colors from user specification
const COLOR_BLACK = '#000000';
const COLOR_REF_BLUE = '#25e3e3'; // Inner cyan-blue curtain
const COLOR_REF_RED = '#d80711';  // Outer crimson-red curtain

const Loader: React.FC<LoaderProps> = ({ onComplete, onExitStart }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const hasTriggeredCompleteRef = useRef(false);

  useEffect(() => {
    // Phase 1: Enter & Settle (0 - 800ms)
    // Phase 2: Hold (800ms - 1500ms)
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 800);

    // Phase 3: Split Curtain Exit (starts at 1500ms)
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      onExitStart?.();
    }, 1500);

    // Safety fallback timer to guarantee completion
    const safetyTimer = setTimeout(() => {
      if (!hasTriggeredCompleteRef.current) {
        hasTriggeredCompleteRef.current = true;
        onComplete?.();
      }
    }, 3200);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete, onExitStart]);

  const handleLastCurtainDone = () => {
    if (!hasTriggeredCompleteRef.current && phase === 'exit') {
      hasTriggeredCompleteRef.current = true;
      onComplete?.();
    }
  };

  const nameText = 'Sujay Korde';
  const subtitleText = 'Backend & DevOps Engineer';

  const easeLogoEnter = [0.25, 1, 0.5, 1] as const;
  const easeShutter = [0.85, 0, 0.15, 1] as const;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600&display=swap');

        .geist-thin-100 {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif !important;
          font-weight: 100 !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* ── TOP CURTAINS (UPWARD SPLIT) ── */}

      {/* 1. Top Inner Curtain: BLUE (innermost layer, lags behind red at delay: 0.20s) */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_REF_BLUE,
          transformOrigin: 'top center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.20,
          ease: easeShutter,
        }}
        onAnimationComplete={handleLastCurtainDone}
      />

      {/* 2. Top Outer Curtain: RED (outer color, lags behind black at delay: 0.10s) */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_REF_RED,
          transformOrigin: 'top center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.10,
          ease: easeShutter,
        }}
      />

      {/* 3. Top Primary Curtain: BLACK (leads the split at delay: 0s) */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_BLACK,
          transformOrigin: 'top center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: easeShutter,
        }}
      />

      {/* ── BOTTOM CURTAINS (DOWNWARD SPLIT) ── */}

      {/* 1. Bottom Inner Curtain: BLUE (innermost layer, lags behind red at delay: 0.20s) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_REF_BLUE,
          transformOrigin: 'bottom center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.20,
          ease: easeShutter,
        }}
      />

      {/* 2. Bottom Outer Curtain: RED (outer color, lags behind black at delay: 0.10s) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_REF_RED,
          transformOrigin: 'bottom center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.10,
          ease: easeShutter,
        }}
      />

      {/* 3. Bottom Primary Curtain: BLACK (leads the split at delay: 0s) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 w-full"
        style={{
          height: '50.5vh',
          backgroundColor: COLOR_BLACK,
          transformOrigin: 'bottom center',
        }}
        initial={{ y: 0 }}
        animate={phase === 'exit' ? { y: '100%' } : { y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: easeShutter,
        }}
      />

      {/* ── AMBIENT CHROMATIC GRAPHIC (RED & BLUE OVERLAPPING SPHERES) ── */}
      <div className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Ambient Red Sphere */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(170px, 24vw, 300px)',
            height: 'clamp(170px, 24vw, 300px)',
            background: `radial-gradient(circle, ${COLOR_REF_RED}30 0%, ${COLOR_REF_RED}00 70%)`,
            transform: 'translate(45px, 15px)',
            filter: 'blur(35px)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase === 'exit' ? { opacity: 0, scale: 1.2 } : { opacity: 0.75, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Ambient Cyan-Blue Sphere */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(150px, 20vw, 270px)',
            height: 'clamp(150px, 20vw, 270px)',
            background: `radial-gradient(circle, ${COLOR_REF_BLUE}30 0%, ${COLOR_REF_BLUE}00 70%)`,
            transform: 'translate(-45px, -15px)',
            filter: 'blur(35px)',
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={phase === 'exit' ? { opacity: 0, scale: 1.2 } : { opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* ── CENTER BRANDING OVERLAY (GEIST THIN 100 TYPOGRAPHY) ── */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6">
        {/* Name Container without trademark sign ® */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 1.05, opacity: 0.001 }}
          animate={
            phase === 'exit'
              ? { scale: 0.95, y: -20, opacity: 0 }
              : { scale: 1, y: 0, opacity: 1 }
          }
          transition={
            phase === 'exit'
              ? { duration: 0.35, ease: 'easeOut' }
              : { duration: 0.8, ease: easeLogoEnter }
          }
        >
          {/* Main Name: Decreased font size, Geist Thin 100, reduced letter spacing */}
          <h1
            className="geist-thin-100 text-[clamp(1.25rem,2.8vw,2.0rem)] text-white flex items-center leading-none tracking-[0.015em] sm:tracking-[0.02em] pb-1 whitespace-nowrap"
            style={{
              fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
              fontWeight: 100,
            }}
          >
            {nameText.split('').map((char, index) => (
              <motion.span
                key={index}
                className="inline-block geist-thin-100"
                style={{
                  fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                  fontWeight: 100,
                }}
                initial={{ opacity: 0.001, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  damping: 24,
                  stiffness: 220,
                  delay: 0.04 + index * 0.025,
                  duration: 0.4,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle in Geist Thin 100 */}
        <motion.div
          className="mt-2.5 sm:mt-3.5 text-center px-4"
          initial={{ opacity: 0.001, y: 12, scale: 0.95 }}
          animate={
            phase === 'exit'
              ? { y: 20, opacity: 0 }
              : { opacity: 0.5, y: 0, scale: 1 }
          }
          transition={
            phase === 'exit'
              ? { duration: 0.35, ease: 'easeOut' }
              : {
                  type: 'spring',
                  damping: 26,
                  stiffness: 240,
                  delay: 0.35,
                }
          }
        >
          <p
            className="geist-thin-100 text-[clamp(9px,1.05vw,11px)] tracking-[0.22em] sm:tracking-[0.26em] uppercase text-white/60"
            style={{
              fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
              fontWeight: 100,
            }}
          >
            {subtitleText}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;