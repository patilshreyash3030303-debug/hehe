import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Menu, ArrowRight } from 'lucide-react';

export default function HeroSection({ onBegin }: { onBegin: () => void }) {
  const [musicOn, setMusicOn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [systemState, setSystemState] = useState<'idle' | 'loading' | 'ready'>('idle');

  useEffect(() => {
    if (systemState === 'loading') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextVal = prev + Math.floor(Math.random() * 6) + 2;
          if (nextVal >= 100) {
            clearInterval(interval);
            setSystemState('ready');
            return 100;
          }
          return nextVal;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [systemState]);

  const handleButtonClick = () => {
    if (systemState === 'idle') {
      setSystemState('loading');
    } else if (systemState === 'ready') {
      onBegin();
    }
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-between py-4 px-4 overflow-hidden max-h-[900px] mx-auto">
      {/* Background doodles & particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.img 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1, rotate: -15 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='%23ff2a85' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20,50 Q50,0 80,50 Q50,100 20,50'/%3E%3C/svg%3E" 
          className="absolute top-20 left-10 w-12 h-12 opacity-50"
          alt=""
        />
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-12 text-neon-pink text-4xl font-handwriting"
        >
          ♡
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 right-10 text-neon-pink text-3xl font-handwriting"
        >
          ☆
        </motion.div>
      </div>

      {/* Top Header */}
      <header className="relative w-full flex items-center justify-between z-10 max-w-sm mx-auto">
        <button className="text-neon-pink p-2">
          <Menu size={28} />
        </button>
        <div className="flex items-center gap-2 text-xs font-typewriter tracking-widest text-gray-400">
          <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse"></span>
          CLASSIFIED & CONFIDENTIAL
          <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse"></span>
        </div>
        <button 
          onClick={() => setMusicOn(!musicOn)}
          className="flex items-center gap-2 bg-black/40 border border-neon-pink/30 rounded-full px-3 py-1.5 text-xs text-neon-pink backdrop-blur-md transition-all hover:bg-neon-pink/10"
        >
          {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          ON
        </button>
      </header>

      {/* Main Title Area */}
      <div className="relative z-10 flex flex-col items-center mt-2 w-full shrink-0">
        <motion.div 
          initial={{ rotate: -15, opacity: 0 }}
          animate={{ rotate: -15, opacity: 1 }}
          className="absolute -top-4 left-4 md:left-1/4 text-neon-pink"
        >
          <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 70 L50 20 L80 70 M30 50 L70 50" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M50 20 Q50 -10 50 -10" strokeLinecap="round" />
          </svg>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-handwriting text-xl text-white mb-0 leading-tight"
        >
          A VERY
        </motion.h2>
        
        <motion.h1 
          className="text-[2.5rem] sm:text-[3.5rem] font-bold text-center leading-[0.9] text-white text-glow mb-1 tracking-wider"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          TOP SECRET<br />
          INVESTIGATION
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-2 relative"
        >
          <div className="bg-red-900/40 border-y-2 border-red-500/50 backdrop-blur-sm px-4 py-0.5 transform -rotate-2">
            <p className="font-typewriter text-red-200 text-xs tracking-wider">
              is about to begin...
            </p>
          </div>
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-8 top-1 text-white font-handwriting text-2xl transform rotate-45"
          >
            ╰→
          </motion.div>
        </motion.div>
      </div>

      {/* The File Folder Graphic */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative mt-4 w-full max-w-[270px] aspect-[4/4.5] select-none z-10 shrink-0"
      >
        {/* Back of folder */}
        <div className="absolute inset-0 bg-[#bd9062] rounded-lg shadow-2xl transform rotate-2"></div>
        {/* Front of folder */}
        <div className="absolute inset-0 top-4 bg-[#d1a074] rounded-lg shadow-xl shadow-black/50 transform -rotate-1 origin-bottom border-t border-white/20">
          <div className="absolute top-2 left-2 border-2 border-red-600 text-red-600 font-bold font-typewriter px-2 py-0.5 text-[10px] transform -rotate-3 mix-blend-multiply opacity-80">
            CONFIDENTIAL
          </div>
        </div>

        {/* Polaroid */}
        <div className="absolute top-2 left-3 right-5 bottom-2 bg-[#f8f5f2] rounded shadow-xl p-2.5 flex flex-col transform rotate-1 transition-transform hover:rotate-2 hover:scale-105 duration-500 z-10 border border-gray-200">
          
          {/* Photo Area */}
          <div className="relative w-full h-[65%] min-h-[160px] bg-[#0a050f] overflow-hidden rounded-sm pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] border border-white/5">
            {/* Cinematic backlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10 w-full h-full"></div>
            
            {/* Intense cinematic glow behind silhouette */}
            <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ff2a85]/30 rounded-full blur-[30px] z-10"></div>
            <div className="absolute top-[35%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#b32aff]/40 rounded-full blur-[20px] z-10"></div>

            {/* Custom File Upload Silhouette */}
            <div className="absolute bottom-0 w-full h-full z-20 flex flex-col items-center justify-end">
               <img 
                 src="/silhouette.png" 
                 alt="Silhouette"
                 className="w-full h-full object-cover object-bottom mix-blend-multiply opacity-95 drop-shadow-[0_0_15px_rgba(255,42,133,0.3)]"
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   const svgFallback = e.currentTarget.nextElementSibling as HTMLElement;
                   if (svgFallback) svgFallback.style.display = 'block';
                 }}
               />
               {/* Fallback SVG if image is not found */}
               <svg style={{display: 'none'}} className="w-full h-[95%] drop-shadow-[0_0_20px_rgba(255,42,133,0.3)]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMAX meet">
                 <defs>
                   <filter id="glow">
                     <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                     <feMerge>
                       <feMergeNode in="coloredBlur"/>
                       <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                   </filter>
                 </defs>
                 
                 {/* Main profile path */}
                 <path d="
                    M 60 15
                    C 45 15, 40 22, 38 32
                    Q 36 38, 34 40
                    Q 37 42, 37 43
                    Q 35 44, 35 45
                    Q 36 46, 36 46
                    Q 34 49, 36 51
                    Q 40 55, 42 62
                    Q 38 70, 32 73
                    C 15 85, 5 95, 0 100
                    L 100 100
                    C 95 85, 90 70, 85 55
                    C 80 35, 75 15, 60 15 Z" 
                    fill="#020102" 
                    stroke="#ff2a85" strokeWidth="0.4" strokeOpacity="0.8" style={{ filter: 'url(#glow)' }}
                 />
                 
                 {/* Loose flowing hair strands for cinematic detail */}
                 <path d="M 42 62 Q 40 75, 48 85 Q 45 95, 50 100" stroke="#ff2a85" strokeWidth="0.2" fill="none" opacity="0.6" />
                 <path d="M 85 55 Q 95 75, 80 100" stroke="#b32aff" strokeWidth="0.3" fill="none" opacity="0.5" />
                 <path d="M 78 30 Q 88 50, 75 80" stroke="#ff2a85" strokeWidth="0.2" fill="none" opacity="0.3" />
               </svg>
            </div>
            
            {/* Neon Crown */}
            <motion.div 
              animate={{ opacity: [0.8, 1, 0.8], y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-[8%] left-[60%] -translate-x-1/2 z-30 text-neon-pink scale-[0.5] origin-center rotate-[15deg] drop-shadow-[0_0_15px_rgba(255,42,133,1)]"
            >
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="4">
                <path d="M10 30 L20 10 L30 25 L40 10 L50 30 Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            
            {/* Ambient Sparkles */}
            <motion.div animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute left-[15%] top-[25%] text-white text-base drop-shadow-[0_0_5px_white] z-20">✧</motion.div>
            <motion.div animate={{ opacity: [0.1, 0.9, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute right-[15%] top-[40%] text-neon-pink text-sm drop-shadow-[0_0_5px_currentColor] z-20">✦</motion.div>
          </div>
          
          {/* Handwritten text with plenty of space */}
          <div className="flex-1 w-full flex items-center justify-center p-2 z-20">
             <div className="font-handwriting text-gray-800 text-[15px] sm:text-[17px] leading-relaxed transform -rotate-2 opacity-95 w-full text-center">
               Dangerously funny.<br/>Hopelessly chaotic.
             </div>
          </div>
          
          {/* Top Secret Stamp - moved to left so it balances the sticky note */}
          <div className="absolute bottom-1 left-1 w-[50px] h-[50px] border-[1.5px] border-black/60 rounded-full flex items-center justify-center transform -rotate-[20deg] mix-blend-multiply opacity-50 z-30 pointer-events-none">
            <div className="text-center scale-[0.6] origin-center">
              <div className="text-[6px] uppercase tracking-widest font-sans border-b border-black">Do Not Share</div>
              <div className="font-bold text-[8px] uppercase my-[2px] font-sans">Top Secret</div>
              <div className="text-[6px] uppercase tracking-widest font-sans border-t border-black">Do Not Share</div>
            </div>
          </div>
        </div>

        {/* Paperclips */}
        <div className="absolute -top-1 left-8 w-3 h-8 rounded-full border-2 border-slate-300/80 transform -rotate-12 shadow-sm z-20 bg-transparent"></div>
        <div className="absolute top-2 right-12 w-3 h-8 rounded-full border-2 border-slate-300/80 transform rotate-12 shadow-sm z-20 bg-transparent"></div>

        {/* Sticky note - moved to top right to fill empty space behind silhouette head */}
        <div className="absolute top-3 -right-4 bg-[#ff4da6] p-2 shadow-lg transform rotate-6 z-20 w-[95px] pb-3 border border-[#ff66b3]">
          <div className="w-full h-1 bg-white/20 absolute top-0 left-0"></div>
          <div className="font-typewriter text-[8px] text-black/80 mb-0.5 mt-1 ml-1 leading-none">Subject ID:</div>
          <div className="font-typewriter text-[10px] font-bold text-black border-b border-black/20 pb-0.5 mb-1.5 mx-1 leading-tight">THE BIRTHDAY GIRL</div>
          <div className="font-handwriting text-right text-[12px] text-black/90 mr-1 leading-none">♡</div>
        </div>

        {/* Label bottom taped */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#ff1a75] border border-[#ff4da6] py-1 px-4 shadow-lg transform -rotate-1 z-20 flex items-center justify-center min-w-[130px]">
           {/* tape pieces */}
           <div className="absolute -top-1.5 -left-1 w-5 h-3 bg-white/30 backdrop-blur-sm -rotate-6"></div>
           <div className="absolute -top-1.5 -right-1 w-5 h-3 bg-white/30 backdrop-blur-sm rotate-6"></div>
           
           <div className="font-typewriter font-bold text-white text-[11px] tracking-wider whitespace-nowrap pt-0.5">
             100% MY PERSON ♡
           </div>
        </div>
      </motion.div>

      {/* Loading & Action Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-10 w-full max-w-[260px] sm:max-w-xs mt-4 flex flex-col items-center gap-3 shrink-0"
      >
        <div className="w-full glass-panel border border-[#ff2a85]/20 bg-[#1e1423]/60 rounded-md p-3 pb-2.5 shadow-[0_0_15px_rgba(255,42,133,0.1)]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink shadow-[0_0_6px_rgba(255,42,133,1)]"></span>
            <span className="font-typewriter text-[9px] tracking-widest text-[#a89fad]">SYSTEM STATUS</span>
          </div>
          <div className="flex justify-between items-end mb-2 font-typewriter text-[11px] text-[#d6ced9]">
            <span className="uppercase tracking-widest leading-none">
              {systemState === 'idle' ? 'AWAITING INITIALIZATION...' : systemState === 'loading' ? 'INITIALIZING FILES...' : 'SYSTEM READY.'}
            </span>
            <span className="leading-none">{progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#0a0710]/80 rounded-[3px] border border-white/10 relative p-[1px]">
            <motion.div 
              className="h-full bg-neon-pink rounded-[2px] relative overflow-hidden shadow-[0_0_12px_rgba(255,42,133,0.8)]" 
              style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
              layout
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
            </motion.div>
          </div>
        </div>

        <motion.button 
          whileHover={systemState !== 'loading' ? { scale: 1.05 } : {}}
          whileTap={systemState !== 'loading' ? { scale: 0.95 } : {}}
          onClick={handleButtonClick}
          disabled={systemState === 'loading'}
          className={`relative w-full py-2.5 rounded-xl font-typewriter text-sm sm:text-base tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
            systemState === 'ready' 
            ? 'bg-neon-pink/20 text-white border border-neon-pink box-glow hover:bg-neon-pink/30 cursor-pointer'
            : systemState === 'idle'
            ? 'bg-[#1a1016] text-[#ff2a85] border border-[#ff2a85]/50 hover:bg-[#ff2a85]/10 hover:border-[#ff2a85] cursor-pointer shadow-[0_0_10px_rgba(255,42,133,0.2)]'
            : 'bg-gray-800/50 text-gray-500 border border-gray-700 cursor-not-allowed'
          }`}
        >
          {systemState === 'idle' && 'INITIALIZE SYSTEM'}
          {systemState === 'loading' && 'PROCESSING...'}
          {systemState === 'ready' && <>BEGIN INVESTIGATION <ArrowRight size={16} className="text-neon-pink" /></>}
        </motion.button>
        
        <p className="font-handwriting text-gray-400 text-sm tracking-wide mb-2">
          ( don't worry, it's totally safe... maybe <span className="font-sans">👀</span> )
        </p>
      </motion.div>

      {/* Bottom decorative notes */}
      <div className="absolute bottom-6 right-2 md:right-8 z-20 scale-75 md:scale-100 origin-bottom-right">
        <div className="bg-gray-200 text-gray-800 font-handwriting text-sm md:text-lg p-1.5 px-3 md:p-2 md:px-4 transform rotate-[-10deg] shadow-lg">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 md:w-8 md:h-2 bg-white/40 shadow-sm transform rotate-3"></div>
          P.S. she has no idea<br/>this exists 😈
        </div>
      </div>
    </section>
  );
}
