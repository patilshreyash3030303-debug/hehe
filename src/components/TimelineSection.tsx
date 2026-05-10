import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, ArrowDown, Sparkles } from 'lucide-react';

const timelineData = [
  {
    year: '2021',
    title: 'The Beginning',
    caption: 'Before we knew we were both crazy.',
    funnyDesc: 'Exhibit A: The first time we hung out and awkwardly pretended to be normal functioning members of society.',
    rotation: -3,
    align: 'left'
  },
  {
    year: '2022',
    title: 'Peak Chaos',
    caption: 'The era of questionable decisions.',
    funnyDesc: 'If the FBI saw our texts from this year, we would both be serving life sentences.',
    rotation: 2,
    align: 'right'
  },
  {
    year: '2023',
    title: 'Academic Depression Era',
    caption: 'Running on iced coffee and delusions.',
    funnyDesc: 'Remember when we thought we had our lives together? Me neither.',
    rotation: -2,
    align: 'left'
  },
  {
    year: '2024',
    title: 'Still Alive Somehow',
    caption: 'Upgraded from dumb to slightly less dumb.',
    funnyDesc: 'CEO of sending me 15 reels in a row at 3 AM and getting mad when I fall asleep.',
    rotation: 4,
    align: 'right'
  }
];

export default function TimelineSection({ onNext }: { onNext: () => void }) {
  return (
    <section className="min-h-screen w-full bg-[#0a0710] py-20 px-4 flex flex-col relative overflow-hidden">
      
      {/* Background doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[10%] font-handwriting text-5xl text-neon-pink">XOXO</div>
        <div className="absolute top-[50%] right-[10%] font-handwriting text-6xl text-white transform rotate-45">???</div>
        <div className="absolute bottom-[20%] left-[20%] text-neon-pink"><Sparkles size={40} /></div>
      </div>

      <header className="mb-16 text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-typewriter text-neon-pink tracking-widest text-sm mb-2 uppercase"
        >
          Phase 1
        </motion.h2>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-handwriting text-white text-glow"
        >
          The Chaos Archive
        </motion.h1>
        <p className="font-sans text-gray-400 mt-2 max-w-sm mx-auto text-sm">
          A chronological review of our shared brain cells deteriorating.
        </p>
      </header>

      <div className="relative max-w-2xl mx-auto w-full z-10 flex-grow pb-24">
        {/* Glowing Timeline Path */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-pink via-purple-500 to-transparent -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(255,42,133,0.5)]"></div>

        <div className="flex flex-col gap-12 md:gap-24">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50, rotate: item.rotation - 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotation }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring" }}
              className={`relative flex ${item.align === 'left' ? 'md:justify-start' : 'md:justify-end'} pl-16 md:pl-0 w-full`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 top-6 w-4 h-4 bg-white border-4 border-neon-pink rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,42,133,1)] z-20"></div>
              
              <div className={`w-full md:w-5/12 bg-[#e6daca] p-4 pb-12 rounded-sm shadow-xl relative ${item.align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}>
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 shadow-sm transform -rotate-2 mix-blend-overlay border border-white/20"></div>
                
                {/* Image Placeholder */}
                <div className="w-full aspect-[4/3] bg-gray-900 rounded-sm mb-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-typewriter text-red-500/50 border-4 border-red-500/20 m-2 rotate-[-5deg]">
                    EVIDENCE_{item.year}
                  </div>
                  <Heart className="absolute bottom-2 right-2 text-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" fill="#ff2a85" />
                </div>

                <div className="font-handwriting text-gray-900 text-3xl font-bold mb-1">
                  {item.year}
                </div>
                <div className="font-sans text-gray-800 font-bold text-lg mb-2 leading-tight">
                  {item.title}
                </div>
                <div className="font-typewriter text-gray-700 text-xs mb-4">
                  "{item.caption}"
                </div>

                <div className="bg-orange-100/50 p-2 rounded border border-orange-200/50 relative">
                  <div className="font-sans text-xs text-gray-800 italic leading-relaxed">
                    {item.funnyDesc}
                  </div>
                </div>

                {/* Voice Note Button Fake */}
                <button className="absolute bottom-[-15px] right-2 bg-neon-pink text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group">
                  <Play size={16} fill="white" />
                  <span className="max-w-0 overflow-hidden font-sans text-xs group-hover:max-w-[100px] transition-all duration-300 whitespace-nowrap">Play audio</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mx-auto mt-12 bg-transparent border-2 border-neon-pink text-neon-pink px-8 py-3 rounded-full font-typewriter tracking-widest text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(255,42,133,0.3)] hover:bg-neon-pink/10 transition-colors z-20"
      >
        NEXT PHASE <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
