import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JohnMarstonPortrait } from './CharacterAvatars';
import { BookOpen, GraduationCap, Flame, Star, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export default function AboutJohn() {
  const [activeTab, setActiveTab] = useState('journal'); // 'journal' | 'education' | 'training'

  const journalEntries = [
    {
      date: "August 2026 - Blackwater Camp",
      title: "The Engineer's Journal",
      text: "I am Maguluri Venkata Naga Siva Sai Harish, a Computer Science Engineering graduate (B.Tech 2026) with a passion for building robust full-stack applications. I work with Java, Spring Boot, React, SQL, and Python AI models. My goal is to build scalable systems that handle high throughput and complex business logic.",
      quote: "We're more ghosts than people, but our code lives forever."
    },
    {
      date: "Campfire Reflections - LPU & CipherSchools",
      title: "Education & Growth",
      text: "Completed Bachelor of Technology in Computer Science & Engineering at Lovely Professional University (7 CGPA). Specialized in REST API architecture, JWT authentication, Data Structures, and cloud deployments.",
      quote: "Knowledge is the sharpest weapon in the Wild West."
    }
  ];

  return (
    <section id="about" className="relative min-h-screen w-full py-20 px-4 flex flex-col justify-center items-center bg-[#0b0704] glow-campfire overflow-hidden">
      
      {/* Floating Campfire Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ember-particle w-2 h-2 left-1/4 bottom-10 animate-[emberRise_4s_infinite]" />
        <div className="ember-particle w-1.5 h-1.5 left-1/3 bottom-20 animate-[emberRise_3s_infinite]" />
        <div className="ember-particle w-2.5 h-2.5 right-1/4 bottom-16 animate-[emberRise_5s_infinite]" />
        <div className="ember-particle w-1 h-1 right-1/3 bottom-28 animate-[emberRise_3.5s_infinite]" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: John Marston Campfire Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          <div className="relative w-full max-w-md h-[460px] sm:h-[520px]">
            <JohnMarstonPortrait className="w-full h-full" />

            {/* Campfire Label Box */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#180e08]/90 border border-[#8b0000] px-4 py-2 text-center rounded-sm shadow-2xl">
              <p className="font-rdr-title text-[#d4af37] text-sm tracking-wider uppercase">CHAPTER II: THE STORY</p>
              <p className="font-rdr-typewriter text-xs text-[#c4a682]">John Marston by the Campfire</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Aged Journal & Personal Bio */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          
          {/* Section Header */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a0e08] border border-[#d4af37] rounded-sm text-xs font-rdr-typewriter text-[#ffaa3b]">
              <Flame className="w-4 h-4 text-[#ff5500] animate-pulse" />
              <span>NIGHT AT THE CAMPSITE</span>
            </div>
            <h2 className="font-rdr-title text-4xl sm:text-5xl text-[#e6d2b5] tracking-wide">
              JOHN MARSTON'S <span className="text-[#8b0000]">JOURNAL</span>
            </h2>
            <p className="font-rdr-journal text-xl text-[#d4af37] italic">
              "A man's worth is measured by his craft and loyalty."
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start border-b border-[#4a2e1b] pb-3">
            <button
              onClick={() => setActiveTab('journal')}
              className={`px-4 py-2 font-rdr-title text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'journal'
                  ? 'bg-[#8b0000] text-[#ffcc00] border border-[#d4af37] shadow-lg'
                  : 'bg-[#1a0e08] text-[#c4a682] hover:text-[#e6d2b5] border border-[#3d2414]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>OUTLAW JOURNAL</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 font-rdr-title text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-[#8b0000] text-[#ffcc00] border border-[#d4af37] shadow-lg'
                  : 'bg-[#1a0e08] text-[#c4a682] hover:text-[#e6d2b5] border border-[#3d2414]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC DECREE (LPU)</span>
            </button>

            <button
              onClick={() => setActiveTab('training')}
              className={`px-4 py-2 font-rdr-title text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'training'
                  ? 'bg-[#8b0000] text-[#ffcc00] border border-[#d4af37] shadow-lg'
                  : 'bg-[#1a0e08] text-[#c4a682] hover:text-[#e6d2b5] border border-[#3d2414]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CIPHERSCHOOLS TRAININGS</span>
            </button>
          </div>

          {/* Tab Content 1: Journal Entries */}
          {activeTab === 'journal' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {journalEntries.map((entry, idx) => (
                <div key={idx} className="bg-wanted-paper p-5 border-2 border-[#8b0000] rounded-sm text-[#2b180d] shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-[#8b0000]/30 pb-2 mb-3">
                    <h3 className="font-rdr-title text-lg text-[#8b0000] tracking-wider">{entry.title}</h3>
                    <span className="font-rdr-typewriter text-[11px] text-[#6b452b] font-bold">{entry.date}</span>
                  </div>
                  <p className="font-rdr-journal text-xl sm:text-2xl leading-relaxed text-[#1a0e08] mb-3">
                    "{entry.text}"
                  </p>
                  <p className="font-rdr-typewriter text-xs text-[#8b0000] font-bold italic">
                    — {entry.quote}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab Content 2: Education */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-[#190e08] p-6 border-2 border-[#d4af37] rounded-sm space-y-4 text-[#e6d2b5]"
            >
              <div className="flex items-center justify-between border-b border-[#4a2e1b] pb-3">
                <div>
                  <h3 className="font-rdr-title text-xl text-[#d4af37]">LOVELY PROFESSIONAL UNIVERSITY</h3>
                  <p className="font-rdr-typewriter text-xs text-[#c4a682]">Phagwara, Punjab, India</p>
                </div>
                <span className="px-3 py-1 bg-[#8b0000] text-[#ffcc00] font-rdr-typewriter text-xs font-bold border border-[#d4af37]">
                  2022 – 2026
                </span>
              </div>
              <p className="font-rdr-header text-sm text-[#e6d2b5] font-bold">
                BACHELOR OF TECHNOLOGY — COMPUTER SCIENCE & ENGINEERING
              </p>
              <p className="font-rdr-typewriter text-xs text-[#c4a682] leading-relaxed">
                Graduated with a cumulative CGPA of 7.0. Gained extensive coursework mastery in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Engineering, and Computer Networks.
              </p>
            </motion.div>
          )}

          {/* Tab Content 3: Training & Certificates */}
          {activeTab === 'training' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="bg-[#1c100a] p-5 border border-[#8b0000] rounded-sm text-[#e6d2b5] space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-rdr-title text-base text-[#d4af37]">JAVA FULL STACK WEB DEVELOPMENT</h4>
                  <span className="font-rdr-typewriter text-xs text-[#ffaa3b]">CipherSchools (Jun – Jul 2024)</span>
                </div>
                <p className="font-rdr-typewriter text-xs text-[#c4a682]">
                  Mastered Spring Boot microservices, REST APIs, Hibernate ORM, SQL databases, JWT authentication, and responsive React frontend development.
                </p>
              </div>

              <div className="bg-[#1c100a] p-5 border border-[#8b0000] rounded-sm text-[#e6d2b5] space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-rdr-title text-base text-[#d4af37]">DEEP LEARNING & COMPUTER VISION</h4>
                  <span className="font-rdr-typewriter text-xs text-[#ffaa3b]">LPU Capstone (Jan – Apr 2026)</span>
                </div>
                <p className="font-rdr-typewriter text-xs text-[#c4a682]">
                  Built AI pose estimation pipelines using PyTorch, Detectron2, and ResNeXt-101 for intelligent content-aware image cropping.
                </p>
              </div>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
