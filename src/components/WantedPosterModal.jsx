import React from 'react';
import { Download, X, Award, CheckCircle2, Shield } from 'lucide-react';

export default function WantedPosterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#000]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-wanted-paper p-6 sm:p-10 border-8 border-[#8b0000] shadow-rdr-poster text-[#1a0f0a] my-8 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b0000] hover:text-[#000] font-rdr-title text-2xl font-bold"
        >
          ✕
        </button>

        {/* Double Stamped Red Border Container */}
        <div className="border-4 double border-[#8b0000] p-4 sm:p-6 text-center space-y-4">
          
          <p className="font-rdr-title text-[#8b0000] text-3xl sm:text-5xl font-bold tracking-widest stamped-text">
            WANTED
          </p>

          <p className="font-rdr-header text-xl sm:text-3xl text-[#1a0f0a] font-extrabold uppercase tracking-wide">
            MAGULURI HARISH
          </p>

          <div className="inline-block bg-[#8b0000] text-[#ffcc00] px-4 py-1 font-rdr-title text-sm sm:text-lg font-bold tracking-wider">
            BOUNTY: $15,000 REWARD
          </div>

          <p className="font-rdr-typewriter text-xs text-[#4a2e1b] max-w-md mx-auto italic font-bold">
            "FOR EXCELLENCE IN FULL-STACK SOFTWARE ENGINEERING, JAVA SPRING BOOT MICROSERVICES, REACT, AND AI COMPUTER VISION."
          </p>

          {/* Dossier Specifications Breakdown */}
          <div className="text-left bg-[#dfc59f]/60 p-4 border border-[#8c5a35] space-y-2 font-rdr-typewriter text-xs text-[#2b1810]">
            <p className="font-bold text-[#8b0000] border-b border-[#8c5a35] pb-1 uppercase">KNOWN CAPABILITIES & ALIASES:</p>
            <p><span className="font-bold">Full Name:</span> Maguluri Venkata Naga Siva Sai Harish</p>
            <p><span className="font-bold">Education:</span> B.Tech Computer Science & Engineering (LPU, 2026)</p>
            <p><span className="font-bold">Primary Weaponry:</span> Java 17, Spring Boot, React 18, PostgreSQL, PyTorch</p>
            <p><span className="font-bold">Certifications:</span> AWS Cloud Practitioner, DevOps (TuteDude), NPTEL Cloud</p>
            <p><span className="font-bold">Achievements:</span> Solved 50+ LeetCode SQL problems, Built AI Voice Agent AetherCall</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="mailto:harishmaguluri66@gmail.com"
              className="px-6 py-3 bg-[#8b0000] text-[#ffcc00] font-rdr-title text-xs uppercase tracking-widest hover:bg-[#b31212] transition-all flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF</span>
            </a>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#3a2214] text-[#e6d2b5] font-rdr-typewriter text-xs uppercase tracking-widest hover:bg-[#1f120a] transition-all"
            >
              CLOSE DOSSIER
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
