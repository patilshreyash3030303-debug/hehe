import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MiniGames({ onNext }: { onNext: () => void }) {
  const [balloons, setBalloons] = useState(
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: 120 + Math.random() * 50,
      color: ['#ff2a85', '#b32aff', '#ff7eb3', '#7e2aff'][Math.floor(Math.random() * 4)],
      speed: 10 + Math.random() * 20,
      popped: false
    }))
  );

  const [score, setScore] = useState(0);

  const popBalloon = (id: number) => {
    setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setScore(s => s + 1);
  };

  return (
    <section className="min-h-screen w-full bg-[#0a0710] relative overflow-hidden flex flex-col items-center justify-between py-10">
      {/* Dreamy Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b1f] to-[#0a0710]"></div>
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[20%] left-[-10%] w-[50%] aspect-square rounded-full bg-neon-pink/10 blur-[100px]"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-[20%] right-[-10%] w-[60%] aspect-square rounded-full bg-neon-purple/10 blur-[120px]"
        />
      </div>

      <header className="z-10 text-center mt-10">
        <h2 className="font-typewriter text-neon-pink tracking-widest text-sm mb-2 uppercase">Phase 3</h2>
        <h1 className="text-4xl md:text-5xl font-handwriting text-white text-glow">
          Pop The Chaos
        </h1>
        <p className="font-sans text-gray-300 mt-2 text-sm">
          Pop all the balloons to unlock the vault. ({score}/{balloons.length})
        </p>
      </header>

      <div className="relative flex-grow w-full z-10 pointer-events-none">
        <AnimatePresence>
          {balloons.map(balloon => !balloon.popped && (
            <motion.div
              key={balloon.id}
              initial={{ y: '100%', x: `${balloon.x}vw` }}
              animate={{ y: '-20%' }}
              transition={{ duration: balloon.speed, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 cursor-crosshair pointer-events-auto"
              onClick={() => popBalloon(balloon.id)}
              whileHover={{ scale: 1.1 }}
            >
              {/* Balloon Graphic */}
              <div 
                className="w-16 h-20 rounded-[50%] relative flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: balloon.color, 
                  boxShadow: `0 0 20px ${balloon.color}80, inset -5px -5px 15px rgba(0,0,0,0.3)` 
                }}
              >
                <div className="absolute top-2 right-3 w-4 h-6 rounded-[50%] bg-white/30 transform rotate-12"></div>
                {/* Knot */}
                <div className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px]" style={{ borderBottomColor: balloon.color }}></div>
                {/* String */}
                <svg className="absolute -bottom-12 w-6 h-12" viewBox="0 0 24 48" fill="none">
                  <path d="M12,0 Q24,12 12,24 T12,48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="z-10 h-24 flex items-center justify-center">
        <AnimatePresence>
          {score >= balloons.length && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neon-pink text-white px-8 py-3 rounded-full font-typewriter tracking-widest text-sm flex items-center gap-2 box-glow hover:bg-neon-pink/80 transition-colors"
              onClick={onNext}
            >
              <Sparkles size={16} /> VAULT UNLOCKED <ArrowRight size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
