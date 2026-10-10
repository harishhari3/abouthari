import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SadieAdlerPortrait, CharlesSmithPortrait, DutchVanDerLindePortrait } from './CharacterAvatars';
import { ExternalLink, CheckCircle2, ShieldAlert, Cpu, Sparkles, Code } from 'lucide-react';

export default function MissionsProjects() {
  const [selectedMission, setSelectedMission] = useState(0);

  const missions = [
    {
      id: 'jobpulse',
      title: 'JobPulse — Full-Stack Job Search Portal',
      characterName: 'Sadie Adler',
      characterRole: 'Canyon Scout & Gunfighter',
      reward: '$10,000 REWARD',
      status: 'COMPLETED',
      period: 'Jul 2026 – Aug 2026',
      github: 'https://github.com/harishhari3',
      live: '#',
      portrait: <SadieAdlerPortrait className="w-full h-[320px]" />,
      techStack: ['Java 17', 'Spring Boot 3.3.5', 'Spring Security', 'JWT', 'React 18', 'Tailwind CSS', 'PostgreSQL', 'Adzuna API', 'Razorpay', 'Gemini AI API'],
      summary: 'Built a full-stack job search platform with a React (Vite) frontend and Spring Boot backend, integrating Adzuna API for live job listings with filtering and pagination.',
      highlights: [
        'Implemented JWT authentication with Spring Security and Google OAuth 2.0 login.',
        'Developed client-side resume parsing with pdfjs-dist and paid skill assessments with Razorpay.',
        'Built an embedded AI voice call-agent (AetherCall) using Web Speech API and Gemini API with Framer Motion animations.'
      ]
    },
    {
      id: 'image-cropping',
      title: 'AI-Powered Content-Aware Image Cropping System',
      characterName: 'Charles Smith',
      characterRole: 'Forest Tracker & Map Navigator',
      reward: '$8,500 REWARD',
      status: 'COMPLETED',
      period: 'Jan 2026 – Apr 2026',
      github: 'https://github.com/harishhari3',
      live: '#',
      portrait: <CharlesSmithPortrait className="w-full h-[320px]" />,
      techStack: ['Python', 'PyTorch', 'Detectron2', 'Keypoint RCNN', 'ResNeXt-101', 'Computer Vision'],
      summary: 'Developed an automated content-aware image cropping system using Detectron2 and Keypoint RCNN to intelligently resize images across multiple aspect ratios.',
      highlights: [
        'Integrated deep-learning-based pose estimation to keep primary subjects centered during transformation.',
        'Built high-performance computer vision pipeline in Python and PyTorch using ResNeXt-101 architecture.',
        'Preserved visual context and subject focus across dynamic social media aspect ratios.'
      ]
    },
    {
      id: 'test-automation',
      title: 'AI-Assisted Test Automation Framework & Cosmic Goods',
      characterName: 'Dutch van der Linde',
      characterRole: 'Saloon Mastermind & Strategist',
      reward: '$12,000 REWARD',
      status: 'COMPLETED',
      period: 'May 2026 – Jun 2026',
      github: 'https://github.com/harishhari3',
      live: '#',
      portrait: <DutchVanDerLindePortrait className="w-full h-[320px]" />,
      techStack: ['Java', 'Selenium WebDriver', 'TestNG', 'Maven', 'Node.js', 'Render', 'HTML/CSS/JS'],
      summary: 'Built a full-stack e-commerce storefront (Cosmic Goods) using Node.js and paired it with a Java-based Selenium WebDriver automated test suite.',
      highlights: [
        'Developed comprehensive automated test suites using Selenium WebDriver and TestNG with Page Object Model.',
        'Utilized GitHub Copilot to accelerate test script generation and test coverage reporting.',
        'Deployed full-stack e-commerce application on Render with responsive product catalogs.'
      ]
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen w-full py-24 px-4 bg-[#0a0604] overflow-hidden">
      
      {/* Background Volumetric Glow & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20 bg-gradient-to-b from-[#8b0000] via-[#c85a17]/10 to-transparent blur-3xl" />

      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-12">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#180d07] border-2 border-[#8b0000] rounded-sm text-xs font-rdr-typewriter text-[#d4af37]">
            <ShieldAlert className="w-4 h-4 text-[#8b0000]" />
            <span>MAJOR OUTLAW OPERATIONS & PROJECTS</span>
          </div>
          <h2 className="font-rdr-title text-4xl sm:text-6xl text-[#e6d2b5] tracking-wider">
            FEATURED <span className="text-[#8b0000]">MISSIONS</span>
          </h2>
          <p className="font-rdr-journal text-2xl text-[#d4af37] italic max-w-2xl mx-auto">
            "High-stakes engineering bounties completed across full-stack development, AI computer vision, and automation."
          </p>
        </motion.div>

        {/* Mission Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missions.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setSelectedMission(idx)}
              className={`cursor-pointer p-5 border-4 rounded-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                selectedMission === idx
                  ? 'bg-wanted-paper border-[#8b0000] shadow-[0_15px_30px_rgba(139,0,0,0.6)] scale-[1.02]'
                  : 'bg-[#180e08] border-[#4a2e1b] hover:border-[#8b0000] opacity-85 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-rdr-title text-xs px-2.5 py-1 border rounded-xs font-bold ${
                    selectedMission === idx ? 'bg-[#8b0000] text-[#ffcc00] border-[#d4af37]' : 'bg-[#120a06] text-[#c4a682] border-[#4a2e1b]'
                  }`}>
                    MISSION 0{idx + 1}
                  </span>
                  <span className={`font-rdr-typewriter text-xs font-bold ${selectedMission === idx ? 'text-[#8b0000]' : 'text-[#ffaa3b]'}`}>
                    {m.reward}
                  </span>
                </div>

                <h3 className={`font-rdr-title text-xl font-bold mb-2 leading-tight ${selectedMission === idx ? 'text-[#1a0e08]' : 'text-[#e6d2b5]'}`}>
                  {m.title}
                </h3>
                <p className={`font-rdr-typewriter text-xs mb-4 ${selectedMission === idx ? 'text-[#543520]' : 'text-[#a88968]'}`}>
                  Leader: {m.characterName} ({m.characterRole})
                </p>
              </div>

              <div className="pt-3 border-t border-current/20 flex items-center justify-between">
                <span className={`font-rdr-typewriter text-[11px] font-bold ${selectedMission === idx ? 'text-[#8b0000]' : 'text-[#d4af37]'}`}>
                  {m.period}
                </span>
                <span className={`font-rdr-title text-xs font-bold ${selectedMission === idx ? 'text-[#1a0e08]' : 'text-[#ffaa3b]'}`}>
                  INSPECT DOSSIER →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Mission Detailed Poster Display */}
        <motion.div
          key={selectedMission}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-wanted-paper border-4 border-[#8b0000] p-6 sm:p-8 rounded-sm shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 text-[#1a0e08] relative overflow-hidden"
        >
          {/* Metal Corner Rivets */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />

          {/* Left Character Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            {missions[selectedMission].portrait}
          </div>

          {/* Right Details */}
          <div className="lg:col-span-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#8b0000] pb-3">
                <div>
                  <span className="font-rdr-title text-xs text-[#8b0000] tracking-widest font-bold block">MISSION DOSSIER</span>
                  <h3 className="font-rdr-title text-2xl sm:text-3xl font-extrabold text-[#1a0e08]">
                    {missions[selectedMission].title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-rdr-title text-lg text-[#8b0000] font-bold block">{missions[selectedMission].reward}</span>
                  <span className="font-rdr-typewriter text-xs text-[#543520] font-bold">{missions[selectedMission].period}</span>
                </div>
              </div>

              <p className="font-rdr-journal text-xl sm:text-2xl leading-relaxed text-[#2b180d]">
                "{missions[selectedMission].summary}"
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-2">
                <h4 className="font-rdr-title text-sm text-[#8b0000] font-bold uppercase tracking-wider">OUTLAW ACHIEVEMENTS & CODE HIGHLIGHTS</h4>
                <ul className="space-y-1.5 font-rdr-typewriter text-xs text-[#1a0e08]">
                  {missions[selectedMission].highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8b0000] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className="pt-2">
                <h4 className="font-rdr-title text-xs text-[#6b452b] font-bold uppercase tracking-wider mb-2">ARMORY & TECH STACK</h4>
                <div className="flex flex-wrap gap-1.5">
                  {missions[selectedMission].techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#1a0e08] text-[#d4af37] font-rdr-typewriter text-[11px] font-bold rounded-xs border border-[#8b0000]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-4 border-t border-[#8b0000]/40 flex items-center justify-between">
              <a
                href={missions[selectedMission].github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#8b0000] text-[#ffcc00] border-2 border-[#d4af37] font-rdr-title text-xs font-bold tracking-wider hover:bg-[#b31212] transition-colors flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                <span>INSPECT REPOSITORY ON GITHUB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="font-rdr-typewriter text-xs text-[#6b452b] font-bold">
                STATUS: <span className="text-[#8b0000]">{missions[selectedMission].status}</span>
              </span>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
