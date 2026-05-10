import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalSurprise() {
  const [countdown, setCountdown] = useState(3);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !showContent) {
      setShowContent(true);
      fireConfetti();
    }
  }, [countdown, showContent]);

  const fireConfetti = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    var interval: any = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <section className="min-h-screen w-full bg-black relative overflow-hidden flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            className="flex items-center justify-center"
          >
            <motion.h1 
              key={countdown}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="text-9xl font-typewriter text-neon-pink font-bold text-glow"
            >
              {countdown}
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="w-full flex flex-col items-center z-10"
          >
             <h1 className="text-4xl md:text-6xl text-center font-black font-sans text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-purple-500 to-neon-pink uppercase tracking-tighter mb-8 drop-shadow-[0_0_15px_rgba(255,42,133,0.5)]">
               HAPPY BIRTHDAY TO THE MOST AMAZING HUMAN EVER
             </h1>

             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl max-w-xl w-full text-center shadow-[0_0_50px_rgba(255,42,133,0.2)] mb-12">
               <Heart className="w-16 h-16 text-neon-pink mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,42,133,0.8)]" fill="#ff2a85" />
               <p className="font-handwriting text-3xl md:text-5xl text-white mb-6">
                 Thank you for being my person.
               </p>
               <p className="font-typewriter text-gray-400 text-sm tracking-widest uppercase">
                 Subject investigation successfully closed.
               </p>
             </div>

             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex items-center gap-3 bg-neon-pink text-white px-8 py-4 rounded-full font-sans font-bold text-lg shadow-[0_0_20px_rgba(255,42,133,0.6)] hover:bg-neon-pink/80 transition-colors"
             >
               <PlayCircle size={24} /> Play Our Song
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
