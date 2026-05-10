/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import InvestigationIntro from './components/InvestigationIntro';
import TimelineSection from './components/TimelineSection';
import ChaosZone from './components/ChaosZone';
import MiniGames from './components/MiniGames';
import MemoryVault from './components/MemoryVault';
import OpenWhenSection from './components/OpenWhenSection';
import AppreciationSection from './components/AppreciationSection';
import FinalSurprise from './components/FinalSurprise';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentSection(prev => prev + 1);
  };

  return (
    <main className="w-full min-h-screen relative overflow-hidden bg-[#0a0710]">
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.div key="hero" exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }} transition={{ duration: 1.5 }}>
            <HeroSection onBegin={nextSection} />
          </motion.div>
        )}
        {currentSection === 1 && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <InvestigationIntro onComplete={nextSection} />
          </motion.div>
        )}
        {currentSection === 2 && (
          <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 1 }}>
            <TimelineSection onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 3 && (
          <motion.div key="chaos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <ChaosZone onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 4 && (
          <motion.div key="minigames" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <MiniGames onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 5 && (
          <motion.div key="vault" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <MemoryVault onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 6 && (
          <motion.div key="openwhen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <OpenWhenSection onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 7 && (
          <motion.div key="appreciation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <AppreciationSection onNext={nextSection} />
          </motion.div>
        )}
        {currentSection === 8 && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <FinalSurprise />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

