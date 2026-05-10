import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, X, ArrowRight } from 'lucide-react';

const envelopes = [
  { id: 1, title: 'Open when sad', color: 'bg-blue-900/30 border-blue-400/50', msg: 'You are so much stronger than whatever is making you sad right now. I am literally just a text away. Eat a snack, take a breath, and remember I love you.' },
  { id: 2, title: 'Open when angry', color: 'bg-red-900/30 border-red-400/50', msg: 'Okay, whoever made you mad is officially my enemy too. Write down their name, we ride at dawn. Seriously though, venting is allowed. Let it out.' },
  { id: 3, title: 'Open when missing me', color: 'bg-pink-900/30 border-pink-400/50', msg: 'I miss you more, idiot. Go look at our weirdest photos in your camera roll and you will feel better. Or just call me.' },
  { id: 4, title: 'Open when stressed', color: 'bg-orange-900/30 border-orange-400/50', msg: 'Close your eyes. Unclench your jaw. Drop your shoulders. Drink some water. Everything is going to be okay, you always figure it out. You got this.' },
];

export default function OpenWhenSection({ onNext }: { onNext: () => void }) {
  const [activeEnvelope, setActiveEnvelope] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#0a0710] to-[#12050b] py-20 px-4 relative flex flex-col items-center">
      
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 0.5, 0] }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute"
          >
             <Heart className="text-neon-pink/20" size={24 + Math.random() * 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <header className="z-10 text-center mb-16">
        <h2 className="font-typewriter text-pink-300 tracking-widest text-sm mb-2 uppercase">Phase 5</h2>
        <h1 className="text-4xl md:text-5xl font-handwriting text-white text-glow">
          For The Bad Days
        </h1>
        <p className="font-sans text-gray-400 mt-2 text-sm italic">
          (Because I can't always physically slap sense into you)
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl z-10 flex-grow content-start">
        {envelopes.map((env) => (
          <motion.div
            key={env.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveEnvelope(env.id)}
            className={`w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer border backdrop-blur-sm shadow-xl transition-all hover:shadow-[0_0_20px_rgba(255,42,133,0.3)] ${env.color}`}
            layoutId={`envelope-${env.id}`}
          >
            <Mail className="w-12 h-12 text-white/70 mb-4" />
            <h3 className="font-handwriting text-2xl text-white text-center">{env.title}</h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeEnvelope && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
             <motion.div
               layoutId={`envelope-${activeEnvelope}`}
               className="w-full max-w-lg bg-[#e6daca] rounded-lg p-8 relative overflow-hidden shadow-2xl"
             >
               <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#c89c6c] to-transparent opacity-30"></div>
               <button 
                 onClick={() => setActiveEnvelope(null)}
                 className="absolute top-4 right-4 text-gray-800 hover:text-black hover:bg-black/10 rounded-full p-1 transition-colors"
               >
                 <X size={24} />
               </button>
               
               <h3 className="font-typewriter text-gray-500 text-sm mb-6 uppercase tracking-widest border-b border-gray-400/30 pb-2">
                 {envelopes.find(e => e.id === activeEnvelope)?.title}
               </h3>
               
               <p className="font-handwriting text-gray-900 text-2xl md:text-3xl leading-relaxed">
                 {envelopes.find(e => e.id === activeEnvelope)?.msg}
               </p>

               <div className="mt-8 flex justify-end">
                 <Heart className="text-red-500 w-8 h-8 rotate-12" fill="currentColor" />
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-12 mb-8 bg-transparent border-none text-gray-400 hover:text-white flex flex-col items-center font-typewriter text-xs tracking-widest gap-2 transition-colors z-10"
      >
        <span>FEELING BETTER?</span>
        <ArrowRight size={16} className="text-neon-pink" />
      </motion.button>
    </section>
  );
}
