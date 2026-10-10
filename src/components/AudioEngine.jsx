import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX, Crosshair, Film } from 'lucide-react';

export default function AudioEngine({ isMuted, onToggleMute, isDeadeyeActive, toggleDeadeye }) {
  const audioCtxRef = useRef(null);

  const toggleSound = () => {
    onToggleMute();
  };

  const playRevolverClick = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  useEffect(() => {
    if (isDeadeyeActive) {
      playRevolverClick();
    }
  }, [isDeadeyeActive]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Deadeye Mode Toggle Button */}
      <button
        onClick={() => {
          toggleDeadeye();
          playRevolverClick();
        }}
        className={`px-4 py-2 rounded-xs border-2 flex items-center gap-2 font-rdr-typewriter text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl ${
          isDeadeyeActive
            ? 'bg-[#8b0000] border-[#ffcc00] text-[#ffcc00] animate-pulse shadow-[0_0_20px_rgba(255,69,0,0.8)]'
            : 'bg-[#180d08]/90 border-[#6b452b] text-[#d4af37] hover:border-[#8b0000] hover:text-[#fff]'
        }`}
        title="Toggle Dead Eye Slow-Mo Target Mode"
      >
        <Crosshair className={`w-4 h-4 ${isDeadeyeActive ? 'rotate-90 text-[#ffcc00]' : ''}`} />
        <span>{isDeadeyeActive ? 'DEAD EYE ACTIVE' : 'DEAD EYE [OFF]'}</span>
      </button>

      {/* RDR2 Trailer Video Soundtrack Toggle */}
      <button
        onClick={toggleSound}
        className="px-4 py-2 bg-[#180d08]/90 border-2 border-[#6b452b] text-[#d4af37] rounded-full hover:border-[#8b0000] hover:text-[#fff] transition-all shadow-2xl flex items-center gap-2 font-rdr-typewriter text-xs"
        title={isMuted ? 'Unmute RDR2 Trailer Soundtrack & Video Audio' : 'Mute Video Audio'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 opacity-60" />
            <span>TRAILER AUDIO: MUTED</span>
          </>
        ) : (
          <>
            <Film className="w-4 h-4 text-[#ff7700] animate-spin" />
            <span className="text-[#ffcc00] font-bold">RDR2 SOUNDTRACK: PLAYING</span>
          </>
        )}
      </button>
    </div>
  );
}
