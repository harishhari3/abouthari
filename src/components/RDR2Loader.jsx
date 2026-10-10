import React, { useState, useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';

const RDR2_TIPS = [
  "Maintain your core stats by visiting camp and consuming provisions...",
  "Keep your weapons clean with gun oil for maximum accuracy and damage...",
  "Dead Eye enables slow-motion precision targeting during intense shootouts...",
  "Harish Maguluri specializes in Java, Spring Boot, React, & AI computer vision...",
  "Pressing target painted markers in Dead Eye mode unleashes a full barrage...",
  "Check the Wanted posters for high-value full-stack engineering missions..."
];

export default function RDR2Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 180);

    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % RDR2_TIPS.length);
    }, 2800);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0503] flex flex-col justify-between p-8 sm:p-14 select-none transition-opacity duration-700">
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-widest text-[#a6825c] uppercase font-rdr-typewriter">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#8b0000] rounded-full animate-ping" />
          <span>ROCKSTAR GAMES PRESENTATION</span>
        </div>
        <div>1899 - 2026 EDITION</div>
      </div>

      {/* Main Center Branding & Spinning Cylinder */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-[#8b0000]/30 rounded-full blur-2xl animate-pulse" />
          {/* RDR2 Style Red Emblem Box */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#8b0000] bg-[#140b07] flex items-center justify-center p-3 shadow-[0_0_30px_rgba(139,0,0,0.8)]">
            {/* Spinning Revolver Chamber */}
            <svg
              className="w-16 h-16 text-[#d4af37] animate-[spin_4s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" opacity="0.3" />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <circle
                  key={i}
                  cx={50 + 30 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 30 * Math.sin((deg * Math.PI) / 180)}
                  r="8"
                  fill="#8b0000"
                  stroke="#d4af37"
                  strokeWidth="3"
                />
              ))}
              <circle cx="50" cy="50" r="12" fill="#d4af37" />
            </svg>
          </div>
        </div>

        <h1 className="font-rdr-title text-4xl sm:text-6xl md:text-7xl text-[#e6d2b5] tracking-wider text-shadow-lg mb-2">
          RED DEAD <span className="text-[#8b0000] drop-shadow-[0_0_15px_rgba(139,0,0,0.9)]">PORTFOLIO</span>
        </h1>
        <p className="font-rdr-journal text-2xl sm:text-3xl text-[#d4af37]">
          Maguluri Venkata Naga Siva Sai Harish
        </p>

        {/* Dynamic Tips Bar */}
        <div className="mt-8 max-w-xl min-h-[4rem] px-4 py-3 bg-[#190e09]/80 border-y border-[#3d2314] flex items-center justify-center">
          <p className="font-rdr-typewriter text-xs sm:text-sm text-[#c4a682] italic leading-relaxed animate-fade-in">
            "{RDR2_TIPS[tipIndex]}"
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-4xl mx-auto space-y-2">
        <div className="flex justify-between items-center font-rdr-typewriter text-xs text-[#8c6b4f]">
          <span>INITIALIZING 3D WESTERN WORLD</span>
          <span className="text-[#d4af37] font-bold">{progress}%</span>
        </div>

        <div className="relative w-full h-3 bg-[#1c100a] border border-[#4d2f1b] rounded-sm overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#8b0000] via-[#c85a17] to-[#d4af37] transition-all duration-200 ease-out shadow-[0_0_12px_#ff4500]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
