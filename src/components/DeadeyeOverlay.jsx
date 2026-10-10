import React, { useState } from 'react';
import { Crosshair } from 'lucide-react';

export default function DeadeyeOverlay({ isActive }) {
  const [targets, setTargets] = useState([]);

  if (!isActive) return null;

  const handleClick = (e) => {
    const newTarget = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setTargets((prev) => [...prev.slice(-8), newTarget]);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[8000] cursor-crosshair select-none bg-[#8b0000]/10 deadeye-active pointer-events-auto"
    >
      {/* Dead-Eye Banner Top */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#8b0000] text-[#ffcc00] px-6 py-2 border-2 border-[#ffcc00] font-rdr-title text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(255,204,0,0.8)] animate-pulse">
        🎯 DEAD EYE MODE ACTIVE: CLICK ANYWHERE TO PAINT X TARGET MARKERS!
      </div>

      {/* Target X Marks */}
      {targets.map((t) => (
        <div
          key={t.id}
          style={{ left: `${t.x}px`, top: `${t.y}px` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping-once"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-rdr-title text-3xl font-black text-[#ff0000] drop-shadow-[0_0_8px_#ff0000]">
              ✕
            </span>
            <div className="absolute w-8 h-8 border border-[#ff0000] rounded-full animate-ping" />
          </div>
        </div>
      ))}
    </div>
  );
}
