import React from 'react';
import { motion } from 'framer-motion';
import MouseTrackingAvatar from './MouseTrackingAvatar';
import { Download, Scroll, ChevronDown, Award } from 'lucide-react';

export default function HeroArthur({ onExplore, onOpenPoster }) {
  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 pt-24 pb-16 overflow-hidden bg-rdr-dark glow-godrays">
      
      {/* Background Golden Sunset & Mountain Range Silhouette */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff9a3c]/30 to-transparent" />
        <div className="absolute bottom-1/3 left-10 text-[#ff8c3c]/20 font-rdr-typewriter text-xs tracking-widest animate-pulse">
          🚂 PACIFIC UNION STEAM EXPRESS ---&#x3E; BLACKWATER & VALENTINE
        </div>
      </div>

      {/* Volumetric Sun Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] pointer-events-none opacity-30 bg-gradient-to-b from-[#ffaa3b] via-[#c85a17]/20 to-transparent blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left / Top Title Banner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
        >
          
          {/* Rockstar Style Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1a0e08] border-2 border-[#8b0000] rounded-sm text-xs font-rdr-typewriter text-[#d4af37] shadow-[0_0_15px_rgba(139,0,0,0.6)]"
          >
            <Award className="w-4 h-4 text-[#8b0000]" />
            <span>FULL-STACK & SOFTWARE ENGINEER</span>
          </motion.div>

          {/* Cracked RDR2 Title Font */}
          <div className="space-y-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-rdr-title text-3xl sm:text-4xl text-[#c89d47] tracking-widest uppercase text-shadow-lg"
            >
              MAGULURI HARISH
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-rdr-title text-5xl sm:text-7xl lg:text-8xl text-[#e6d2b5] tracking-wider text-shadow-xl leading-none"
            >
              RED DEAD <span className="text-[#8b0000] drop-shadow-[0_0_20px_rgba(139,0,0,0.8)]">PORTFOLIO</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-rdr-journal text-2xl sm:text-3xl text-[#d4af37] italic mt-2"
            >
              "Outlaws for Life, Engineers for Innovation"
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-rdr-typewriter text-xs sm:text-sm text-[#c4a682] max-w-xl leading-relaxed"
          >
            Welcome to an interactive Wild West experience featuring real-world full-stack architecture, Java Spring Boot microservices, React frontends, AI computer vision, and automated testing frameworks.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <button
              onClick={onExplore}
              className="px-6 py-3.5 bg-[#8b0000] border-2 border-[#d4af37] text-[#ffcc00] font-rdr-title text-sm uppercase tracking-widest hover:bg-[#b31212] hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(139,0,0,0.7)] flex items-center gap-2 cursor-pointer"
            >
              <Scroll className="w-5 h-5" />
              <span>ENTER THE WILD WEST</span>
            </button>

            <button
              onClick={onOpenPoster}
              className="px-5 py-3.5 bg-[#1c100a] border-2 border-[#6b452b] text-[#e6d2b5] font-rdr-typewriter text-xs uppercase tracking-widest hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>INSPECT WANTED DOSSIER</span>
            </button>
          </motion.div>

          {/* Resume Summary Quick Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-4 flex flex-wrap gap-2 justify-center lg:justify-start text-[11px] font-rdr-typewriter text-[#a88968]"
          >
            <span className="px-2.5 py-1 bg-[#180d07] border border-[#4a2e1b]">📍 Hyderabad, India</span>
            <span className="px-2.5 py-1 bg-[#180d07] border border-[#4a2e1b]">🎓 B.Tech CSE (LPU)</span>
            <span className="px-2.5 py-1 bg-[#180d07] border border-[#4a2e1b]">⚙️ Java 17 / Spring Boot</span>
            <span className="px-2.5 py-1 bg-[#180d07] border border-[#4a2e1b]">⚡ React 18 / PyTorch</span>
          </motion.div>

        </motion.div>

        {/* Right 3D Interactive Mouse Tracking Avatar */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-center justify-center relative"
        >
          <MouseTrackingAvatar className="w-full" />
        </motion.div>

      </div>

      {/* Scroll Down Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={onExplore}
      >
        <span className="font-rdr-typewriter text-[10px] text-[#c4a682] tracking-widest uppercase animate-pulse">
          SCROLL TO RIDE INTO STORY
        </span>
        <ChevronDown className="w-5 h-5 text-[#d4af37] animate-bounce" />
      </motion.div>

    </section>
  );
}
