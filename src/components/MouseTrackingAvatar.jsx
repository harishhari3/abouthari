import React, { useState, useEffect, useRef } from 'react';
import { Compass, Shield, Award } from 'lucide-react';

/**
 * MouseTrackingAvatar Component
 * Displays Harish's authentic Red Dead Redemption cowboy outlaw portrait
 * with 3D lerp mouse-tracking parallax tilt physics, metal corner rivets,
 * dynamic depth shadows, and stamped RDR2 wanted dossier branding.
 */
export default function MouseTrackingAvatar({ className = "" }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse offset from center (-1 to +1)
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setTargetPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp animation frame for 3D physics
  useEffect(() => {
    let animFrame;
    const animate = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.1,
        y: prev.y + (targetPos.y - prev.y) * 0.1,
      }));
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [targetPos]);

  // Calculate 3D transforms based on smooth mouse position
  const rotateY = mousePos.x * 22; // max 22 deg side tilt
  const rotateX = -mousePos.y * 18; // max 18 deg vertical tilt
  const translateX = mousePos.x * 18; // 18px displacement
  const translateY = mousePos.y * 12; // 12px displacement

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center perspective-1000 ${className}`}
    >
      {/* Background Volumetric Sun Rays & Golden Sunset Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b0000]/50 via-[#ff6600]/30 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* 3D Interactive Frame Container */}
      <div
        className="relative z-10 w-full max-w-md transition-transform duration-75 ease-out transform-gpu cursor-grab active:cursor-grabbing"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Distressed RDR2 Outer Poster Frame */}
        <div
          className="relative bg-wanted-paper p-4 border-4 border-[#8b0000] shadow-[0_30px_60px_rgba(0,0,0,0.95)] rounded-sm overflow-hidden"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Metal Corner Rivets */}
          <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a] shadow-inner" />
          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a] shadow-inner" />
          <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a] shadow-inner" />
          <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a] shadow-inner" />

          {/* Cowboy Image Frame */}
          <div className="relative border-2 border-[#8b0000] bg-[#120a06] rounded-xs overflow-hidden h-[460px] sm:h-[540px] flex items-center justify-center">
            
            {/* The Red Dead Redemption Cowboy Artwork */}
            <img
              src="/harish_cowboy.jpg"
              alt="Maguluri Harish Red Dead Cowboy Outlaw"
              className="w-full h-full object-cover filter contrast-[115%] brightness-95 drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transform hover:scale-105 transition-transform duration-700"
              style={{ transform: 'translateZ(40px)' }}
            />

            {/* Vignette Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a05]/90 via-transparent to-[#140a05]/30 pointer-events-none" />

            {/* Compass & Mouse Tracking Live Badge */}
            <div className="absolute top-3 right-3 bg-[#8b0000]/95 text-[#ffcc00] px-3 py-1 font-rdr-typewriter text-[10px] rounded-xs font-bold border border-[#d4af37] flex items-center gap-1.5 shadow-xl backdrop-blur-xs">
              <Compass className="w-3.5 h-3.5 animate-spin text-[#ffcc00]" />
              <span>3D PARALLAX CURSOR TRACKING</span>
            </div>

            {/* Bottom Wanted Poster Stamped Tag */}
            <div
              className="absolute bottom-3 left-3 right-3 bg-[#180e08]/95 p-3.5 border-2 border-[#8b0000] text-center shadow-2xl backdrop-blur-xs"
              style={{ transform: 'translateZ(60px)' }}
            >
              <p className="font-rdr-title text-[#8b0000] text-sm tracking-widest font-bold stamped-text">
                WANTED LEAD OUTLAW ENGINEER
              </p>
              <p className="font-rdr-header text-[#e6d2b5] text-lg font-extrabold uppercase tracking-wide">
                HARISH MAGULURI
              </p>
              <p className="font-rdr-typewriter text-[11px] text-[#ffaa3b] mt-0.5 font-bold">
                BOUNTY: $15,000 | FULL-STACK, JAVA & AI SPECIALIST
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic Shadow underneath */}
        <div
          className="w-4/5 h-7 mx-auto bg-black/70 rounded-full blur-xl mt-4"
          style={{
            transform: `translateY(${translateY * 0.5}px) scale(${1 - Math.abs(mousePos.y) * 0.15})`,
          }}
        />
      </div>
    </div>
  );
}
