import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function AppreciationSection({ onNext }: { onNext: () => void }) {
  return (
    <section className="min-h-screen w-full bg-[#050308] relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12">
      
      {/* Soft Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,42,133,0.15)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           viewport={{ once: true }}
           className="space-y-12"
        >
          <h2 className="font-typewriter text-gray-500 tracking-[0.3em] text-xs md:text-sm uppercase mb-12">
            Loading Emotional Core...
          </h2>

          <p className="font-handwriting text-3xl md:text-5xl text-white text-glow font-bold leading-relaxed">
            Okay, jokes aside...
          </p>

          <p className="font-sans text-xl md:text-2xl text-gray-300 leading-loose italic max-w-lg mx-auto font-light">
            Thank you for existing.
          </p>

          <div className="flex flex-col gap-6 text-left my-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm"
            >
              <p className="font-handwriting text-2xl text-gray-200">
                You make the hard days infinitely better, and the good days absolutely unforgettable.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 1 }} viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm self-end"
            >
              <p className="font-handwriting text-2xl text-gray-200">
                You're the only person who matches my exact level of absolute crazy.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        viewport={{ once: true }}
        onClick={onNext}
        className="mt-8 text-gray-400 hover:text-white flex items-center gap-3 font-typewriter text-xs tracking-[0.2em] uppercase transition-colors z-10 p-4"
      >
        <span>Access final file</span> <ArrowRight size={16} className="text-neon-pink" />
      </motion.button>
    </section>
  );
}
