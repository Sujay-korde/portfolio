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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap');

        .hero-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #080808;
          color: #fff;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* ── ORBIT SYSTEM ── */
        .orbit-system {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .orbit-wrap {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-wrap-1 { width: 460px;  height: 460px; animation: spin 55s linear infinite; }
        .orbit-wrap-2 { width: 820px;  height: 820px; animation: spin 80s linear infinite reverse; }
        .orbit-wrap-3 { width: 1180px; height: 1180px; animation: spin 110s linear infinite; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Each icon sits at the top of its ring, counter-rotates to stay upright */
        .orbit-icon {
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Multiple icons on same ring — rotate the ring itself to position */
        .at-0   { transform: rotate(0deg); }
        .at-45  { transform: rotate(45deg); }
        .at-90  { transform: rotate(90deg); }
        .at-135 { transform: rotate(135deg); }
        .at-180 { transform: rotate(180deg); }
        .at-225 { transform: rotate(225deg); }
        .at-270 { transform: rotate(270deg); }
        .at-315 { transform: rotate(315deg); }

        /* Counter-rotate wrapper keeps icon face-up */
        .face-up-55  { animation: spin 55s linear infinite reverse; }
        .face-up-80  { animation: spin 80s linear infinite; }
        .face-up-110 { animation: spin 110s linear infinite reverse; }

        /* ── ICON SHAPES ── */
        .icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.65);
          pointer-events: auto;
        }

        .badge-sq {
          width: 48px; height: 48px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.75);
        }

        .badge-circle {
          width: 46px; height: 46px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
        }

        .badge-hex {
          width: 54px; height: 54px;
          clip-path: polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%);
          background: rgba(255,255,255,0.07);
        }

        .badge-diamond {
          width: 52px; height: 52px;
          clip-path: polygon(50% 0%,100% 50%,50% 100%,0% 50%);
          background: rgba(255,255,255,0.07);
        }

        /* ── CONTENT ── */
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          margin-bottom: 24px;
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.4; }
        }

        .status-text {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          font-weight: 500;
        }

        .intro-line {
          font-size: clamp(15px, 1.8vw, 20px);
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          letter-spacing: -0.01em;
        }

        .intro-line strong { color: #fff; font-weight: 500; }

        .word-stage {
          width: 100vw;
          height: clamp(90px, 15vw, 185px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .morphing-word {
          font-size: clamp(72px, 13vw, 175px);
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1;
          color: #fff;
          white-space: nowrap;
          position: absolute;
          text-transform: uppercase;
        }

        .bio {
          font-size: clamp(13px, 1.05vw, 15px);
          color: rgba(255,255,255,0.38);
          max-width: 560px;
          line-height: 1.8;
          font-weight: 400;
          margin-top: 24px;
          padding: 0 16px;
        }

        .cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 34px;
        }

        .btn-ghost {
          padding: 10px 26px;
          border: 1px solid rgba(255,255,255,0.22);
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,.6); color:#fff; }

        .btn-solid {
          padding: 10px 26px;
          border: 1px solid #fff;
          background: #fff;
          color: #000;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          transition: background .2s;
        }
        .btn-solid:hover { background: #e5e5e5; }

        /* corners */
        .corner { position: absolute; z-index: 5; pointer-events: none; }
        .c-tl { top:18px; left:18px; }
        .c-tr { top:18px; right:18px; }
        .c-bl { bottom:18px; left:18px; }
        .c-br { bottom:18px; right:18px; }

        @media(max-width:768px){
          .orbit-system { display:none; }
        }
      `}</style>

      <section className="hero-root">

        {/* corner brackets */}
        {[['c-tl','0 20 0 0 L20 0'],['c-tr','28 20 28 0 L8 0'],['c-bl','0 8 0 28 L20 28'],['c-br','28 8 28 28 L8 28']].map(([cls,d])=>(
          <div key={cls} className={`corner ${cls}`}>
            <svg width="28" height="28" fill="none">
              <path d={`M${d}`} stroke="rgba(255,255,255,0.13)" strokeWidth="1.2"/>
            </svg>
          </div>
        ))}

        {/* ── ORBIT RINGS + ICONS ── */}
        <div className="orbit-system">

          {/* RING 1 — 460px — 2 icons */}
          <div className="orbit-wrap orbit-wrap-1">
            {/* JS at top */}
            <div className="at-0" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-55">
                  <div className="icon-badge badge-sq" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>JS</div>
                </div>
              </div>
            </div>
            {/* TS at bottom-right */}
            <div className="at-135" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-55">
                  <div className="icon-badge badge-sq" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>TS</div>
                </div>
              </div>
            </div>
          </div>

          {/* RING 2 — 820px — 4 icons */}
          <div className="orbit-wrap orbit-wrap-2">
            {/* MongoDB leaf — top */}
            <div className="at-80" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-80">
                  <div className="icon-badge" style={{width:46,height:46}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)" width="30" height="30">
                      <path d="M12.26 2.04C8.57 2.45 5.36 5.27 4.6 8.94c-.82 3.99.88 7.66 3.86 9.8l.58.41c.04.69.22 1.45.42 2.12.05.16.1.33.15.5.04.14.08.3.26.3.18 0 .22-.16.26-.3.06-.17.1-.34.15-.5.2-.67.38-1.43.42-2.12l.58-.41c3-2.15 4.69-5.82 3.87-9.8-.76-3.68-3.97-6.5-3.97-6.5s-.04-.04-.52-.41z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Git diamond — right */}
            <div className="at-350" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-80">
                  <div className="icon-badge badge-diamond" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" width="22" height="22">
                      <path d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.19 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.1 1.037l-2.48-2.48v6.523a1.838 1.838 0 1 1-1.51-.058V9.32a1.838 1.838 0 0 1-.997-2.41L7.617 4.215.45 11.38a1.55 1.55 0 0 0 0 2.19l10.48 10.478a1.55 1.55 0 0 0 2.19 0l10.427-10.427a1.55 1.55 0 0 0 0-2.19z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* React — bottom-left */}
            <div className="at-220" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-80">
                  <div className="icon-badge badge-circle" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)" width="22" height="22">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Tailwind — top-left */}
            <div className="at-160" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-80">
                  <div className="icon-badge badge-circle" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)" width="20" height="20">
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RING 3 — 1180px — 4 icons, partially off-screen = "crescent" look */}
          <div className="orbit-wrap orbit-wrap-3">
            {/* OpenAI — top-right area */}
            <div className="at-30" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-110">
                  <div className="icon-badge" style={{width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" width="28" height="28">
                      <path d="M22.28 9.29a5.43 5.43 0 0 0-.46-4.48 5.5 5.5 0 0 0-5.9-2.63A5.5 5.5 0 0 0 11.76 1a5.49 5.49 0 0 0-5.24 3.8 5.5 5.5 0 0 0-3.68 2.66 5.5 5.5 0 0 0 .68 6.44 5.5 5.5 0 0 0 .46 4.49 5.5 5.5 0 0 0 5.9 2.63A5.48 5.48 0 0 0 14 23a5.5 5.5 0 0 0 5.24-3.81 5.5 5.5 0 0 0 3.68-2.65 5.5 5.5 0 0 0-.64-7.25zM14 21.5a4.07 4.07 0 0 1-2.61-.95l.13-.07 4.33-2.5a.72.72 0 0 0 .36-.62v-6.1l1.83 1.06a.07.07 0 0 1 .04.05v5.05A4.09 4.09 0 0 1 14 21.5zm-8.77-3.74a4.06 4.06 0 0 1-.49-2.74l.13.08 4.33 2.5a.71.71 0 0 0 .71 0l5.29-3.05v2.11a.07.07 0 0 1-.03.06l-4.38 2.53a4.09 4.09 0 0 1-5.56-1.49zm-1.14-9.5a4.07 4.07 0 0 1 2.13-1.79v5.16a.71.71 0 0 0 .36.62l5.29 3.05-1.83 1.06a.07.07 0 0 1-.07 0L5.6 13.84a4.09 4.09 0 0 1-1.51-5.58zm15.05 3.5-5.29-3.06 1.83-1.05a.07.07 0 0 1 .07 0l4.38 2.53a4.08 4.08 0 0 1-.63 7.37V12.4a.71.71 0 0 0-.36-.64zm1.82-2.75-.13-.08-4.33-2.5a.72.72 0 0 0-.71 0L10.5 9.47V7.36a.07.07 0 0 1 .03-.06l4.38-2.52a4.09 4.09 0 0 1 6.05 4.23zM9.56 12.86 7.73 11.8a.07.07 0 0 1-.04-.05V6.7a4.09 4.09 0 0 1 6.71-3.14l-.13.07-4.33 2.5a.72.72 0 0 0-.36.62zm.99-2.14 2.36-1.36 2.36 1.36v2.71l-2.36 1.36-2.36-1.36z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Kubernetes hex — left (goes off-screen) */}
            <div className="at-200" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-110">
                  <div className="icon-badge badge-hex" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" width="26" height="26">
                      <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .485.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.17 5.17 0 0 0-.73 3.255l2.516-.734zm1.145-1.98a.44.44 0 0 0 .686-.408l.006-.006 1.215-2.316a5.17 5.17 0 0 0-3.24.6l1.327 2.13h.006zm2.241-.204a.44.44 0 0 0 .686.408l.006.006 1.325-2.13a5.17 5.17 0 0 0-3.24-.6l1.215 2.316h.008zm1.144 1.983a.44.44 0 0 0 .174.756l.002.011 2.516.734a5.17 5.17 0 0 0-.73-3.255l-1.962 1.754zm-.636 2.346a.44.44 0 0 0 .485-.606l.004-.005 2.578.437a5.171 5.171 0 0 1-2.075 2.597l-.999-2.413.007-.01zM12 17.48a5.17 5.17 0 0 0 1.704-.288l-1.268-2.388h-.872l-1.268 2.388A5.17 5.17 0 0 0 12 17.48z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Next.js — bottom (mostly off-screen) */}
            <div className="at-160" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-110">
                  <div className="icon-badge badge-circle" style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',fontWeight:800,color:'rgba(255,255,255,0.7)'}}>N</div>
                </div>
              </div>
            </div>
            {/* 4-point sparkle — top-left */}
            <div className="at-320" style={{position:'absolute',width:'100%',height:'100%',borderRadius:'50%'}}>
              <div className="orbit-icon">
                <div className="face-up-110">
                  <div className="icon-badge" style={{width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(255,255,255,0.5)'}}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M12 0l1.5 10.5L24 12l-10.5 1.5L12 24l-1.5-10.5L0 12l10.5-1.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="hero-content">

          <div className="status-pill">
            <span className="status-dot"/>
            <span className="status-text">Available For Work</span>
          </div>

          <p className="intro-line">
            Hello! I'm <strong>Sujay Korde</strong>. A Creative Full-Stack
          </p>

          <div className="word-stage">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentIndex}
                initial={{ y: 55, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -55, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="morphing-word"
              >
                {words[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="bio">
            I'm a full-stack developer focused on building modern, scalable, and seamless web
            applications. I enjoy working across the stack — from clean, intuitive interfaces to
            robust backend systems — with an emphasis on performance, reliability, and real-world impact.
          </p>

          <div className="cta-row">
            <button className="btn-ghost">Let's Talk</button>
            <button className="btn-solid">
              Download CV
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </button>
          </div>

        </div>

      </section>
    </>
  );
}