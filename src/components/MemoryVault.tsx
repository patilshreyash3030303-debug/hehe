import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, ArrowRight, Heart } from 'lucide-react';

const memories = [
  { id: 1, text: "Most Unhinged Chat", cat: "crim", rotate: -5, x: -100, y: -50 },
  { id: 2, text: "Rare Happy Moment", cat: "happy", rotate: 8, x: 100, y: -100 },
  { id: 3, text: "Evidence of Criminal Behavior", cat: "crim", rotate: -2, x: 50, y: 80 },
  { id: 4, text: "Needs Deletion ASAP", cat: "cringe", rotate: 12, x: -80, y: 100 },
];

export default function MemoryVault({ onNext }: { onNext: () => void }) {
  return (
    <section className="min-h-screen w-full bg-[#0a0710] py-20 px-4 relative overflow-hidden flex flex-col items-center">
      
      {/* Background */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-30 bg-[#e6daca]" style={{ maskImage: "radial-gradient(circle at center, black, transparent)", WebkitMaskImage: "radial-gradient(circle at center, black, transparent)" }}></div>

      <header className="z-10 text-center mb-20">
        <h2 className="font-typewriter text-neon-pink tracking-widest text-sm mb-2 uppercase">Phase 4</h2>
        <h1 className="text-4xl md:text-5xl font-handwriting text-white text-glow">
          The Memory Vault
        </h1>
        <p className="font-sans text-gray-300 mt-2 text-sm">
          Drag the polaroids to organize the evidence.
        </p>
      </header>

      <div className="relative flex-grow w-full max-w-4xl flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm pointer-events-none"></div>
        <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>

        {memories.map((mem) => (
          <motion.div
            key={mem.id}
            drag
            dragMomentum={false}
            initial={{ x: 0, y: 0, rotate: mem.rotate }}
            animate={{ x: mem.x, y: mem.y }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileDrag={{ scale: 1.1, zIndex: 20, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            className="absolute bg-white p-3 pb-12 rounded shadow-xl w-48 sm:w-56 cursor-grab active:cursor-grabbing border border-gray-200"
          >
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#e6daca]/80 shadow-sm transform rotate-[-2deg] mix-blend-multiply"></div>
            
            <div className="w-full aspect-square bg-[#1a1a1a] rounded-sm relative overflow-hidden flex items-center justify-center group">
               <Camera className="text-gray-600 w-8 h-8 group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="absolute bottom-3 left-0 w-full text-center">
              <span className="font-handwriting text-gray-800 text-lg leading-tight px-2 block">
                {mem.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-12 bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-typewriter tracking-widest text-sm shadow-xl hover:bg-white/20 transition-colors z-10 flex items-center gap-2"
      >
        PROCEED TO SECRETS <ArrowRight size={16} />
      </motion.button>
    </section>
  );
}
