import React from 'react';

/**
 * CharacterAvatars Component
 * Uses uploaded high-resolution Red Dead Redemption character photos:
 * - john_marston.jpg
 * - abigail_roberts.jpg
 * - jack_marston.jpg
 * - javier_escuella.jpg
 */

export const ArthurMorganPortrait = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Golden Sunset Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b2500]/50 via-[#d45d00]/30 to-transparent rounded-2xl blur-2xl" />

      {/* Main Character Image Card */}
      <div className="relative z-10 w-full max-w-md h-[460px] sm:h-[520px] rounded-sm p-3 bg-wanted-paper border-4 border-[#8b0000] shadow-rdr-poster transform group-hover:scale-105 transition-transform duration-500">
        
        {/* Metal Corner Rivets */}
        <div className="absolute top-1 left-1 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
        <div className="absolute top-1 right-1 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
        <div className="absolute bottom-1 left-1 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />

        <div className="w-full h-full relative overflow-hidden border-2 border-[#8b0000] rounded-xs">
          <img
            src="/john_marston.jpg"
            alt="John Marston Outlaw"
            className="w-full h-full object-cover filter contrast-[115%] brightness-95 sepia-[20%] group-hover:scale-110 transition-transform duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140a05] via-transparent to-[#140a05]/40" />

          {/* Wanted Poster Tag Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#180e08]/90 p-2.5 border-2 border-[#8b0000] text-center shadow-lg">
            <span className="font-rdr-title text-[#8b0000] text-sm tracking-widest font-bold block">WANTED OUTLAW</span>
            <span className="font-rdr-header text-[#e6d2b5] text-xs uppercase font-bold">JOHN MARSTON / HARISH MAGULURI</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const JohnMarstonPortrait = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Campfire Warm Fire Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#ff4500]/40 via-[#8b0000]/25 to-transparent rounded-2xl blur-2xl animate-pulse" />

      <div className="relative z-10 w-full max-w-md h-[460px] sm:h-[500px] rounded-sm p-3 bg-wanted-paper border-4 border-[#593922] shadow-rdr-poster">
        <div className="w-full h-full relative overflow-hidden border-2 border-[#8c5a35] rounded-xs">
          <img
            src="/john_marston.jpg"
            alt="John Marston by Campfire"
            className="w-full h-full object-cover filter contrast-[110%] brightness-90 sepia-[25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#190e09] via-transparent to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 bg-[#180d07]/90 p-2 border border-[#8b0000] text-center">
            <span className="font-rdr-title text-[#d4af37] text-xs tracking-wider uppercase">OUTLAW STORY & JOURNAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SadieAdlerPortrait = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#c85a17]/30 via-[#8b0000]/15 to-transparent rounded-2xl blur-xl" />
      
      <div className="relative z-10 w-full max-w-sm h-[340px] sm:h-[380px] p-2.5 bg-wanted-paper border-4 border-[#8b0000] shadow-rdr-poster rounded-sm">
        <div className="w-full h-full relative overflow-hidden border border-[#8b0000]">
          <img
            src="/abigail_roberts.jpg"
            alt="Abigail Roberts Mission"
            className="w-full h-full object-cover filter contrast-[115%] brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-transparent to-transparent" />
          
          <div className="absolute bottom-2 left-2 right-2 bg-[#8b0000] text-[#ffcc00] p-1.5 text-center font-rdr-title text-xs font-bold">
            MISSION I: ABIGAIL ROBERTS & JOBPULSE
          </div>
        </div>
      </div>
    </div>
  );
};

export const CharlesSmithPortrait = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b3d2b]/40 via-[#d4af37]/15 to-transparent rounded-2xl blur-xl" />

      <div className="relative z-10 w-full max-w-sm h-[340px] sm:h-[380px] p-2.5 bg-wanted-paper border-4 border-[#4d2f1b] shadow-rdr-poster rounded-sm">
        <div className="w-full h-full relative overflow-hidden border border-[#543520]">
          <img
            src="/jack_marston.jpg"
            alt="Jack Marston Forest Mission"
            className="w-full h-full object-cover filter contrast-[110%] brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142114] via-transparent to-transparent" />

          <div className="absolute bottom-2 left-2 right-2 bg-[#2b3d2b] text-[#d4af37] p-1.5 text-center font-rdr-title text-xs font-bold border border-[#d4af37]">
            MISSION II: JACK MARSTON & AI CROPPING
          </div>
        </div>
      </div>
    </div>
  );
};

export const DutchVanDerLindePortrait = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-[#8b0000]/40 via-[#d4af37]/20 to-transparent rounded-2xl blur-xl" />

      <div className="relative z-10 w-full max-w-sm h-[340px] sm:h-[380px] p-2.5 bg-wanted-paper border-4 border-[#d4af37] shadow-rdr-poster rounded-sm">
        <div className="w-full h-full relative overflow-hidden border border-[#d4af37]">
          <img
            src="/javier_escuella.jpg"
            alt="Javier Escuella Saloon Mission"
            className="w-full h-full object-cover filter contrast-[120%] brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c100a] via-transparent to-transparent" />

          <div className="absolute bottom-2 left-2 right-2 bg-[#1c100a] text-[#ffcc00] p-1.5 text-center font-rdr-title text-xs font-bold border border-[#8b0000]">
            MISSION III: JAVIER ESCUELLA & AUTOMATION
          </div>
        </div>
      </div>
    </div>
  );
};
