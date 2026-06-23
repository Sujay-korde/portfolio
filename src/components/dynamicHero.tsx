import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DynamicHero() {
  const words = ["BUILDER", "DEVELOPER", "ENGINEER"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&family=Plus+Jakarta+Sans:wght@300;400;800&display=swap');

        .dynamic-hero-root {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #F9FAFB;
          color: #000000;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .dark .dynamic-hero-root {
          background: #000000;
          color: #ffffff;
        }

        .morphing-title {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          font-weight: 800;
        }

        /* --- ORBITING & FLOATING ANIMATION LOGIC --- */
        @keyframes orbit-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes counter-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Float effect keeps individual badges slightly organic */
        @keyframes floating-gentle {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .orbit-track {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(161, 161, 170, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        /* Outer Loop Track */
        .track-outer {
          width: 580px;
          height: 580px;
          animation: orbit-clockwise 45s linear infinite;
        }

        /* Inner Loop Track */
        .track-inner {
          width: 380px;
          height: 380px;
          animation: counter-clockwise 35s linear infinite;
        }

        /* Absolute placement anchors on the orbital path rings */
        .badge-anchor {
          position: absolute;
          pointer-events: auto; /* Restores mouse hover interaction */
        }

        /* Individual icon wrapper styling matching the clean video design */
        .tech-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(228, 228, 231, 1);
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #71717a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          animation: floating-gentle 4s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dark .tech-badge {
          background: rgba(24, 24, 27, 0.8);
          border: 1px solid rgba(39, 39, 42, 1);
          color: #a1a1aa;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .tech-badge:hover {
          transform: scale(1.1);
          color: #000000;
          border-color: #a1a1aa;
        }
        
        .dark .tech-badge:hover {
          color: #ffffff;
          border-color: #52525b;
        }

        @media (max-width: 768px) {
          .orbit-track { display: none !important; } /* Clean, distraction-free view for mobile viewports */
        }
      `}</style>

      <section className="dynamic-hero-root">
        
        {/* LAYER 1: DYNAMIC BACKGROUND CANVAS SYSTEM */}
        <div className="absolute inset-0 h-full w-full pointer-events-none flex items-center justify-center z-0 overflow-hidden select-none">
          
          {/* INNER TRACK SYSTEM (Orbits Counter-Clockwise) */}
          <div className="orbit-track track-inner">
            {/* Top Anchor (React) */}
            <div className="badge-anchor" style={{ top: '-21px' }}>
              {/* Counter-balances the parent rotation so the icon remains upright */}
              <div className="animation-[spin_35s_linear_infinite_reverse]">
                <div className="tech-badge">RE</div>
              </div>
            </div>
            {/* Bottom Anchor (Python) */}
            <div className="badge-anchor" style={{ bottom: '-21px' }}>
              <div className="animation-[spin_35s_linear_infinite_reverse]">
                <div className="tech-badge">PY</div>
              </div>
            </div>
          </div>

          {/* OUTER TRACK SYSTEM (Orbits Clockwise) */}
          <div className="orbit-track track-outer">
            {/* Left Anchor (JS) */}
            <div className="badge-anchor" style={{ left: '-21px' }}>
              <div className="animation-[spin_45s_linear_infinite_reverse]">
                <div className="tech-badge">JS</div>
              </div>
            </div>
            {/* Right Anchor (Docker) */}
            <div className="badge-anchor" style={{ right: '-21px' }}>
              <div className="animation-[spin_45s_linear_infinite_reverse]">
                <div className="tech-badge">DK</div>
              </div>
            </div>
          </div>

        </div>

        {/* LAYER 2: FOREGROUND CONTENT LAYER */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto select-none">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-100/80 dark:bg-zinc-900/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] tracking-widest uppercase text-zinc-500 dark:text-zinc-400 font-mono font-medium">
              Available For Work
            </p>
          </div>

          {/* Intro Headline */}
          <h1 className="text-xl md:text-2xl font-light mb-2 text-zinc-600 dark:text-zinc-400 tracking-tight">
            Hello! I'm <span className="text-black dark:text-zinc-200 font-semibold">Sujay Korde</span>. A Creative Full-Stack
          </h1>

          {/* DYNAMIC TEXT NODE */}
          <div className="h-24 md:h-32 flex items-center justify-center my-2 overflow-hidden relative w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="morphing-title text-6xl md:text-8xl tracking-tighter text-black dark:text-white block absolute"
              >
                {words[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bio Paragraph */}
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mt-6 leading-relaxed font-normal">
            I code for the obsession of building things from scratch—to creatively express thoughts into the real world and solve problems.
          </p>

          {/* Call-to-Action Interactions */}
          <div className="flex items-center gap-4 mt-10">
            <button className="px-6 py-2.5 border border-zinc-300 dark:border-zinc-700 text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-zinc-500 transition-colors duration-300 font-mono font-medium">
              Let's Talk
            </button>
            <button className="px-6 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-colors duration-300 font-mono">
              Download CV
            </button>
          </div>

        </div>
      </section>
    </>
  );
}