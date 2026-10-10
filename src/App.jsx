import React, { useState, useEffect } from 'react';
import RDR2Loader from './components/RDR2Loader';
import Canvas3DScene from './components/Canvas3DScene';
import NavbarRDR2 from './components/NavbarRDR2';
import HeroArthur from './components/HeroArthur';
import AboutJohn from './components/AboutJohn';
import MissionsProjects from './components/MissionsProjects';
import SkillsNoticeBoard from './components/SkillsNoticeBoard';
import ContactCampsite from './components/ContactCampsite';
import AudioEngine from './components/AudioEngine';
import DeadeyeOverlay from './components/DeadeyeOverlay';
import WantedPosterModal from './components/WantedPosterModal';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDeadeyeActive, setIsDeadeyeActive] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Scroll spy & smooth section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, window.scrollY / (totalHeight || 1)));
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen bg-[#0e0906] text-[#e5d4b8] font-rdr-typewriter overflow-x-hidden ${isDeadeyeActive ? 'deadeye-active' : ''}`}>
      
      {/* RDR2 Authentic Loading Screen */}
      {!loadingComplete && (
        <RDR2Loader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Film Grain & Vignette Cinema Overlays */}
      <div className="film-grain" />
      <div className="vignette-overlay" />

      {/* Real-time 3D Video & Particle Canvas Scene */}
      <Canvas3DScene scrollProgress={scrollProgress} isMuted={isMuted} />

      {/* Dead-Eye Target Painter Overlay */}
      <DeadeyeOverlay isActive={isDeadeyeActive} />

      {/* RDR2 HUD Navbar */}
      <NavbarRDR2 activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-0">
        
        {/* Section 1: Arthur Morgan Hero */}
        <HeroArthur
          onExplore={() => scrollToSection('about')}
          onOpenPoster={() => setIsPosterOpen(true)}
        />

        {/* Section 2: John Marston Campfire Story */}
        <AboutJohn />

        {/* Section 3: Sadie, Charles, Dutch Missions */}
        <MissionsProjects />

        {/* Section 4: Rustic Armory Notice Board */}
        <SkillsNoticeBoard />

        {/* Section 5: Early-Dawn Campsite & Telegraph */}
        <ContactCampsite />

      </main>

      {/* Audio Engine & Deadeye Controls */}
      <AudioEngine
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isDeadeyeActive={isDeadeyeActive}
        toggleDeadeye={() => setIsDeadeyeActive(!isDeadeyeActive)}
      />

      {/* Wanted Poster Resume Dossier Modal */}
      <WantedPosterModal
        isOpen={isPosterOpen}
        onClose={() => setIsPosterOpen(false)}
      />

    </div>
  );
}
