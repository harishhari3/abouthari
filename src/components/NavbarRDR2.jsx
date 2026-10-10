import React, { useState, useEffect } from 'react';
import { Compass, Download } from 'lucide-react';

export default function NavbarRDR2({ activeSection, scrollToSection }) {
  const [bounty, setBounty] = useState(15000);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounty((prev) => prev + Math.floor(Math.random() * 35));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'hero', name: 'I. HERO', character: 'Arthur Morgan' },
    { id: 'about', name: 'II. STORY', character: 'John Marston' },
    { id: 'projects', name: 'III. MISSIONS', character: 'Gang Operations' },
    { id: 'skills', name: 'IV. ARMORY', character: 'Skills Board' },
    { id: 'contact', name: 'V. CAMPSITE', character: 'Telegraph' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#090503] via-[#090503]/90 to-transparent p-3 sm:px-8 border-b border-[#3a2215]/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left Side: Wanted Bounty HUD & RDR2 Core Meters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1c100a] px-3 py-1.5 border border-[#8b0000] rounded-xs shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8b0000] animate-ping" />
            <span className="font-rdr-title text-xs tracking-wider text-[#e6d2b5]">WANTED</span>
            <span className="font-rdr-typewriter text-xs text-[#d4af37] font-bold">
              ${bounty.toLocaleString()}
            </span>
          </div>

          {/* RDR2 Core Meters (Health / Stamina / Dead Eye) */}
          <div className="hidden md:flex items-center gap-2">
            {/* Health Core */}
            <div className="relative w-7 h-7 rounded-full border-2 border-[#8b0000] bg-[#140b07] flex items-center justify-center" title="Health Core: 100%">
              <div className="w-4 h-4 rounded-full bg-[#8b0000]" />
            </div>
            {/* Stamina Core */}
            <div className="relative w-7 h-7 rounded-full border-2 border-[#d4af37] bg-[#140b07] flex items-center justify-center" title="Stamina Core: 100%">
              <div className="w-4 h-4 rounded-full bg-[#d4af37]" />
            </div>
            {/* Dead Eye Core */}
            <div className="relative w-7 h-7 rounded-full border-2 border-[#c85a17] bg-[#140b07] flex items-center justify-center" title="Dead Eye Core: Level 5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff7700] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Center: Section Navigation Markers */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full py-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-xs font-rdr-typewriter text-xs transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8b0000] text-[#ffcc00] border border-[#d4af37] shadow-[0_0_12px_rgba(139,0,0,0.8)] font-bold'
                    : 'text-[#c4a682] hover:text-[#e6d2b5] hover:bg-[#1f130b]/80'
                }`}
              >
                {isActive && <Compass className="w-3.5 h-3.5 text-[#ffcc00] animate-spin" />}
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Resume Action Link */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="mailto:harishmaguluri66@gmail.com"
            className="px-3 py-1.5 border border-[#6b452b] bg-[#140c07] text-[#d4af37] hover:border-[#8b0000] hover:text-[#fff] transition-all font-rdr-typewriter text-xs flex items-center gap-1.5 rounded-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>GET RESUME</span>
          </a>
        </div>

      </div>
    </nav>
  );
}
