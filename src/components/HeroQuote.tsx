import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const HeroQuote: React.FC = () => {
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  const maskMouseX = useMotionValue(0);
  const maskMouseY = useMotionValue(0);
  const smoothMaskX = useSpring(maskMouseX, { damping: 30, stiffness: 250, mass: 0.5 });
  const smoothMaskY = useSpring(maskMouseY, { damping: 30, stiffness: 250, mass: 0.5 });
  const maskRadius = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    maskRadius.set(isQuoteHovered ? 75 : 0);
  }, [isQuoteHovered, maskRadius]);

  const maskImage = useMotionTemplate`radial-gradient(circle ${maskRadius}px at ${smoothMaskX}px ${smoothMaskY}px, black 100%, transparent 100%)`;

  const handleQuoteMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    maskMouseX.set(e.clientX - rect.left + 150);
    maskMouseY.set(e.clientY - rect.top + 150);
  };

  return (
    <section className="relative bg-[#F9FAFB] dark:bg-black text-black dark:text-white py-16 md:py-20 overflow-hidden">
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;600&family=Syncopate:wght@400;700&display=swap');
        @import url('https://fonts.cdnfonts.com/css/aileron');
        
        .hero-quote-container {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 1.5vw;
        }

        .hero-quote-mark {
          width: auto;
          height: 36vh;
          object-fit: contain;
        }

        .hero-quote-text {
          position: relative;
          width: 29vw;
          text-align: right;
          font-family: 'Aileron', 'Inter',sans-serif;
          font-size: clamp(20px, 2.6vw, 44px);
          line-height: 1.1;
          letter-spacing: 0.02em;
          font-weight: 600;
          cursor: none;
        }

        @media (max-width: 768px) {
          .hero-quote-container {
            flex-direction: column;
            align-items: flex-end;
            gap: 2vh;
          }

          .hero-quote-mark {
            height: 20vh;
          }

          .hero-quote-text {
            width: 70vw;
            text-align: right;
            font-size: clamp(16px, 4vw, 24px);
            line-height: 1.1;
          }
        }
      `}</style>

      <div className="hero-quote-container mx-auto w-full max-w-[1800px] px-6 md:px-12 lg:pr-[5vw]">
        <img
          src="/quote.png"
          alt="quote marks"
          className="hero-quote-mark invert dark:invert-0"
        />
        <div
          className="hero-quote-text"
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
          onMouseMove={handleQuoteMouseMove}
        >
          <div className="text-black dark:text-white">
            In a world where complexity is inevitable and failure is expected, engineering is the act of preparation.
          </div>

          <motion.div
            className="absolute text-white dark:text-black"
            style={{
              top: -150,
              left: -150,
              right: -150,
              bottom: -150,
              padding: 150,
              backgroundColor: '#d80711',
              WebkitMaskImage: maskImage,
              maskImage,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            In a world where deadlines are tomorrow and bugs are minor, engineering is damage control.
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroQuote;
