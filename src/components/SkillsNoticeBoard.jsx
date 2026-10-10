import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Database, Terminal, Cpu, CheckSquare, Award } from 'lucide-react';

export default function SkillsNoticeBoard() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'ALL SKILLS & WEAPONS' },
    { id: 'languages', label: 'LANGUAGES' },
    { id: 'fullstack', label: 'FULL STACK & WEB' },
    { id: 'ai', label: 'AI & DATA SCIENCE' },
    { id: 'tools', label: 'DEVELOPER TOOLS' }
  ];

  const skills = [
    { name: 'Java 17 / OOP', level: 92, category: 'languages', icon: '☕', desc: 'Spring Boot 3.3.5, REST APIs, Microservices, Hibernate, Security' },
    { name: 'Python', level: 88, category: 'languages', icon: '🐍', desc: 'PyTorch, OpenCV, Detectron2, Computer Vision, Keypoint RCNN' },
    { name: 'JavaScript (ES6+)', level: 90, category: 'languages', icon: '⚡', desc: 'React 18, Vite, Async/Await, DOM, State Management' },
    { name: 'React 18 / Vite', level: 92, category: 'fullstack', icon: '⚛️', desc: 'Tailwind CSS, Framer Motion, Axios, Component Architecture' },
    { name: 'Spring Boot & JWT', level: 89, category: 'fullstack', icon: '🍃', desc: 'Spring Security, OAuth 2.0, Maven, RESTful Web Services' },
    { name: 'PostgreSQL & SQL', level: 85, category: 'fullstack', icon: '🛢️', desc: 'Relational Schema Design, Complex Queries, Indexing, JPA' },
    { name: 'PyTorch & AI Models', level: 84, category: 'ai', icon: '🧠', desc: 'Deep Learning, ResNeXt-101, Gemini AI API, Pose Estimation' },
    { name: 'Selenium WebDriver', level: 86, category: 'tools', icon: '🧪', desc: 'Test Automation, TestNG, Page Object Model, E2E Testing' },
    { name: 'Git & GitHub', level: 94, category: 'tools', icon: '🐙', desc: 'Branch Management, Version Control, CI/CD, Pull Requests' },
    { name: 'Render & Vercel', level: 85, category: 'tools', icon: '🚀', desc: 'Cloud Deployment, Environment Variables, Webhook Triggers' },
    { name: 'HTML5 & CSS3', level: 95, category: 'fullstack', icon: '🎨', desc: 'Responsive Design, Flexbox, Grid, Animations, UI/UX' },
    { name: 'Postman & REST APIs', level: 90, category: 'tools', icon: '📬', desc: 'API Testing, Integration Workflows, Request Authorization' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative min-h-screen w-full py-24 px-4 bg-[#0d0805] overflow-hidden">
      
      {/* Background Poster Notice Board Texture */}
      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#180d07] border-2 border-[#8b0000] rounded-sm text-xs font-rdr-typewriter text-[#d4af37]">
            <Award className="w-4 h-4 text-[#8b0000]" />
            <span>VALENTINE SHERIFF'S ARMORY & SKILLS NOTICE BOARD</span>
          </div>
          <h2 className="font-rdr-title text-4xl sm:text-6xl text-[#e6d2b5] tracking-wider">
            TECHNICAL <span className="text-[#8b0000]">ARMORY</span>
          </h2>
          <p className="font-rdr-journal text-2xl text-[#d4af37] italic max-w-xl mx-auto">
            "Weapons forged in computer science, software engineering, and artificial intelligence."
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 font-rdr-title text-xs tracking-widest uppercase transition-all rounded-xs cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#8b0000] text-[#ffcc00] border-2 border-[#d4af37] shadow-xl'
                  : 'bg-[#180e08] text-[#c4a682] border border-[#4a2e1b] hover:text-[#e6d2b5] hover:border-[#8b0000]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-wanted-paper p-5 border-4 border-[#8b0000] rounded-sm text-[#1a0e08] shadow-2xl relative overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform"
            >
              {/* Corner Rivet */}
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#d4af37] rounded-full border border-[#1a0f0a]" />

              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#8b0000]/30 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{skill.icon}</span>
                    <h3 className="font-rdr-title text-lg font-bold text-[#1a0e08]">{skill.name}</h3>
                  </div>
                  <span className="font-rdr-typewriter text-xs text-[#8b0000] font-extrabold">{skill.level}% MASTERY</span>
                </div>

                <p className="font-rdr-typewriter text-xs text-[#543520] leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="pt-3">
                <div className="w-full h-3 bg-[#120a06] rounded-xs border border-[#8b0000] overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#8b0000] via-[#c85a17] to-[#d4af37] rounded-xs"
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
