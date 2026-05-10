import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Lock, Unlock, Zap, Crown } from 'lucide-react';

const typeSound = (ctx: AudioContext, char: string) => {
  if (ctx.state === 'suspended') ctx.resume();
  
  const isSpaceOrEnter = char === ' ' || char === '\n';
  const isPunctuation = ['.', ':', '!', '?'].includes(char);
  
  // Mechanical noise/thud
  const bufferSize = ctx.sampleRate * 0.1; // 100ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }
  
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  
  // Filter for structural mechanical sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = isSpaceOrEnter ? 800 : (isPunctuation ? 2500 : 1800 + Math.random() * 400);
  filter.Q.value = 0.5;
  
  const gain = ctx.createGain();
  const vol = isSpaceOrEnter ? 0.35 : (isPunctuation ? 0.3 : 0.2);
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (isSpaceOrEnter ? 0.1 : 0.05));
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noiseSource.start();
  
  // Metallic impact (key hitting paper)
  if (!isSpaceOrEnter) {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isPunctuation ? 5000 : 3500 + Math.random() * 800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.03);
    
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(vol * 0.4, ctx.currentTime + 0.002);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }
};

const LOG_ENTRIES = [
  { text: "Detecting masoomiyat levels...", emoji: "😇" },
  { text: "Scanning relationship decision history... Result: extremely questionable", emoji: "🤡" },
  { text: "Searching for best friendship choice... Match found: obviously me", emoji: "😌" },
  { text: "Detecting haramiyat levels... Status: dangerously active", emoji: "😈" },
  { text: "Badminton skill analysis... Subject believes national selection is near", emoji: "🏸" },
  { text: "Love life diagnostics... System failure detected", emoji: "💔" },
  { text: "Attendance records loading... ERROR: data missing", emoji: "📉" },
  { text: "Emotional attachment levels... Critically dangerous", emoji: "❤️" },
  { text: "Subject classification: impossible to replace.", emoji: "" }
];

export default function InvestigationIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  const [typingStep, setTypingStep] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  const fullText1 = "WARNING: RESTRICTED ACCESS.";
  const fullText2 = "This website contains highly classified";
  const fullText3 = "information regarding one dangerously";
  const fullText4 = "chaotic human being. Proceed with caution.";

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    } catch(e) {}
    
    return () => {
      audioCtxRef.current?.close();
    }
  }, []);

  useEffect(() => {
    if (phase !== 0) return;

    let isCancelled = false;
    
    const typeText = async (text: string, setter: React.Dispatch<React.SetStateAction<string>>, delayMin = 30, delayMax = 50) => {
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) break;
        setter(text.substring(0, i));
        
        let char = '';
        if (i < text.length) {
           char = text[i];
           if (audioCtxRef.current) {
             typeSound(audioCtxRef.current, char);
           }
        }
        
        let delay = Math.random() * (delayMax - delayMin) + delayMin; 
        
        // Human rhythm variation
        if (char === '.' || char === ':' || char === ',' || char === '!') {
          delay += 150 + Math.random() * 100;
        } else if (char === ' ') {
          delay += 30 + Math.random() * 20;
        } else if (Math.random() > 0.95) {
          delay += 60; // mechanical hesitation
        }
        
        await new Promise(r => setTimeout(r, delay));
      }
    };

    const runSequence = async () => {
      // 1. Initial blink
      await new Promise(r => setTimeout(r, 800));
      if (isCancelled) return;
      setTypingStep(1);
      
      // 2. Type Warning
      await typeText(fullText1, setText1, 40, 80);
      if (isCancelled) return;
      setTypingStep(2);
      
      // 3. Short pause
      await new Promise(r => setTimeout(r, 600));
      if (isCancelled) return;
      
      // 4. Type paragraph
      await typeText(fullText2, setText2, 20, 50);
      if (isCancelled) return;
      setTypingStep(3);
      
      await typeText(fullText3, setText3, 20, 50);
      if (isCancelled) return;
      setTypingStep(4);

      await typeText(fullText4, setText4, 20, 50);
      if (isCancelled) return;
      setTypingStep(5);
      
      // 5. Final pause before transition
      await new Promise(r => setTimeout(r, 1200));
      if (isCancelled) return;
      setPhase(1);
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 0) return;
    
    let timer: NodeJS.Timeout;
    if (phase === 1) {
      // Reveal logs sequentially
      const logInterval = setInterval(() => {
        setLogIndex(prev => {
          if (prev >= LOG_ENTRIES.length) {
            clearInterval(logInterval);
            return prev;
          }
          if (audioCtxRef.current) {
             typeSound(audioCtxRef.current, '.'); // small tick sound for new log
          }
          return prev + 1;
        });
      }, 1000); // slightly slower to let them read

      timer = setTimeout(() => {
        clearInterval(logInterval);
        setPhase(2);
      }, 13000); // 9 logs * 1s + 4s of viewing time

      return () => {
        clearInterval(logInterval);
        clearTimeout(timer);
      };
    } else if (phase === 2) {
      timer = setTimeout(() => setPhase(3), 3000);
      return () => clearTimeout(timer);
    } else if (phase === 3) {
      timer = setTimeout(() => onComplete(), 4000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const BlinkingCursor = ({ active, color = 'bg-red-500' }: { active: boolean, color?: string }) => {
    if (!active) return null;
    return <span className={`inline-block w-2.5 h-4 ml-1 align-middle animate-[pulse_1s_ease-in-out_infinite] ${color}`}></span>;
  };

  return (
    <section className="absolute inset-0 bg-black flex flex-col items-center justify-center p-2 sm:p-6 text-center z-50 overflow-hidden">
      
      {/* VIGNETTE/CRT EFFECT OVERLAY */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.9)_100%)] z-10" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-10" />
      
      {/* Subtle scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div 
            key="typewriter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            className="max-w-lg w-full text-left px-4 relative z-20 flex flex-col"
          >
            <div className={`font-typewriter text-red-500 text-lg md:text-xl drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] min-h-[32px] mb-8 flex items-center ${typingStep > 0 && Math.random() > 0.95 ? 'opacity-80 translate-x-[1px]' : ''}`}>
              {text1}
              <BlinkingCursor active={typingStep <= 1 || typingStep === 2} color="bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            </div>

            <div className="font-typewriter text-gray-300 text-base md:text-lg leading-loose space-y-1">
              {typingStep >= 2 && (
                <div className="min-h-[28px] break-words">
                  {text2}
                  <BlinkingCursor active={typingStep === 2} color="bg-gray-300" />
                </div>
              )}
              {typingStep >= 3 && (
                <div className="min-h-[28px] break-words">
                  {text3}
                  <BlinkingCursor active={typingStep === 3} color="bg-gray-300" />
                </div>
              )}
              {typingStep >= 4 && (
                <div className="min-h-[28px] break-words">
                  {text4}
                  <BlinkingCursor active={typingStep >= 4} color="bg-gray-300" />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div 
            key="analysis-ui"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-2xl border border-red-900/40 bg-[#050000]/80 p-4 sm:p-6 rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.15)] flex flex-col font-typewriter text-left relative z-20 overflow-hidden"
          >
             {/* Header */}
             <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col space-y-1 text-red-800 text-[10px] sm:text-xs">
                  <span>// ACCESSING ARCHIVE...</span>
                  <span>// FILE: BIRTHDAY_GIRL.DOS</span>
                  <span>// CLEARANCE LEVEL: TOP SECRET</span>
                </div>
                <div className="border border-red-900/40 p-2 text-right">
                  <div className="text-red-500 tracking-widest text-sm sm:text-base font-bold">CLASSIFIED</div>
                  <div className="text-red-800 text-[8px] sm:text-[10px] tracking-wider mb-2">DO NOT DISTRIBUTE</div>
                  <div className="flex gap-[2px] h-3 opacity-60 justify-end">
                     {Array.from({length: 25}).map((_, i) => <div key={i} className={`bg-red-600 w-[1px] opacity-${Math.random() > 0.5 ? '100' : '40'}`}></div>)}
                  </div>
                </div>
             </div>

             {/* Title */}
             <div className="border-y border-red-900/40 py-2 mb-6 flex justify-between items-center px-2 sm:px-4">
                <span className="text-red-600 text-lg">*</span>
                <span className="text-red-500 text-sm sm:text-lg tracking-widest text-center font-bold">CLASSIFIED SUBJECT ANALYSIS</span>
                <span className="text-red-600 text-lg">*</span>
             </div>

             {/* Middle Section */}
             <div className="flex gap-3 sm:gap-4 border border-red-900/40 p-3 sm:p-4 mb-4 relative min-h-[220px]">
                
                {/* Left Info */}
                <div className="flex flex-col w-[28%] justify-between z-10">
                  <div>
                    <div className="text-red-900 text-[8px] sm:text-[9px] mb-0.5">SUBJECT ID:</div>
                    <div className="text-red-500 text-[10px] sm:text-xs tracking-wider leading-tight">THE BIRTHDAY GIRL</div>
                    <div className="text-red-700 mt-2 text-xs">♡</div>
                  </div>
                  <div className="mb-8">
                    <div className="text-red-900 text-[8px] sm:text-[9px] mb-0.5">STATUS:</div>
                    <div className="text-red-500 text-[10px] sm:text-xs tracking-wider animate-pulse flex items-center">
                       <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5 shadow-[0_0_5px_rgba(255,0,0,1)]"></div>
                       ANALYZING
                    </div>
                  </div>
                </div>

                {/* Center Image Container */}
                <div className="w-[44%] relative border border-transparent flex-shrink-0 flex items-center justify-center">
                  {/* Framing brackets */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600/50"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600/50"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600/50"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600/50"></div>
                  
                  {/* Silhouette mapping */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-red-950/10">
                    <img 
                      src="/silhouette.svg" 
                      alt="Subject" 
                      className="w-full h-[110%] object-cover object-bottom drop-shadow-[0_0_12px_rgba(255,20,20,0.8)] opacity-90"
                    />
                  </div>
                  
                  {/* Scanline */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                     <motion.div 
                        animate={{ y: ["-20%", "120%", "-20%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-12 bg-gradient-to-b from-transparent via-red-500/10 to-red-500/80 border-b-[2px] border-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,1)] z-10 relative"
                     >
                       <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-white opacity-80 blur-[1px]"></div>
                     </motion.div>
                  </div>
                </div>

                {/* Right Info */}
                <div className="flex flex-col w-[28%] justify-between items-end text-right z-10">
                  <div className="text-red-900 text-[8px] sm:text-[9px]">DIAGNOSTICS</div>
                  
                  <div className="w-12 h-12 sm:w-16 sm:h-16 border border-red-600/30 rounded-full flex items-center justify-center relative transform rotate-12 opacity-80 mb-8 mt-auto">
                     <div className="absolute inset-1 border border-dashed border-red-500/40 rounded-full"></div>
                     <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500/70" />
                     <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
                        <path id="circlePath2" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                        <text className="text-[11px] sm:text-[12px] font-bold fill-red-500/70 font-sans tracking-widest">
                           <textPath href="#circlePath2" startOffset="0%">TOP SECRET * EXTREME * </textPath>
                        </text>
                     </svg>
                  </div>
                </div>

                {/* Bottom stats inside Middle box */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end pointer-events-none">
                   {/* Segmented scanning progress bar */}
                   <div className="flex flex-col gap-1 w-1/3">
                      <div className="text-red-900 text-[7px] sm:text-[8px] tracking-widest">SCAN PROGRESS</div>
                      <div className="flex gap-[2px]">
                         {Array.from({length: 12}).map((_, i) => (
                           <motion.div 
                             key={i} 
                             animate={i < 9 ? { opacity: [0.3, 1, 0.3] } : {}}
                             transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                             className={`w-full h-1.5 sm:h-2 ${i < 9 ? 'bg-red-600 shadow-[0_0_5px_rgba(255,0,0,0.8)]' : 'border border-red-900/50'}`} 
                           />
                         ))}
                      </div>
                   </div>
                   
                   {/* Analysis stability waveform */}
                   <div className="flex flex-col gap-1 text-right w-1/3 items-end">
                     <div className="text-red-900 text-[7px] sm:text-[8px] tracking-widest">STABILITY</div>
                     <div className="flex items-center w-full justify-end">
                       <svg className="w-14 h-3 sm:w-16 sm:h-4 text-red-500 opacity-80" viewBox="0 0 100 20" preserveAspectRatio="none">
                         <motion.path 
                           d="M 0 10 Q 5 10, 10 10 T 20 10 T 30 10 T 40 15 T 50 2 T 60 18 T 70 8 T 80 12 T 90 10 L 100 10" 
                           fill="none" stroke="currentColor" strokeWidth="1.5"
                           strokeLinecap="round" strokeLinejoin="round"
                           animate={{ d: [
                             "M 0 10 Q 5 10, 10 10 T 20 10 T 30 15 T 40 2 T 50 18 T 60 8 T 70 12 T 80 10 T 90 10 L 100 10",
                             "M 0 10 Q 5 10, 10 10 T 20 10 T 30 5 T 40 18 T 50 3 T 60 15 T 70 5 T 80 10 T 90 10 L 100 10",
                             "M 0 10 Q 5 10, 10 10 T 20 10 T 30 15 T 40 2 T 50 18 T 60 8 T 70 12 T 80 10 T 90 10 L 100 10"
                           ]}}
                           transition={{ duration: 0.4, repeat: Infinity, ease: 'linear' }}
                         />
                       </svg>
                     </div>
                   </div>
                </div>
             </div>

             {/* System Logs */}
             <div className="border-t border-red-900/40 pt-3 relative flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-3 text-red-900 text-[9px] sm:text-[10px]">
                  <span>&gt; SYSTEM LOGS</span>
                  <span className="flex items-center gap-2">LIVE FEED <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_4px_rgba(255,0,0,1)]"></div></span>
                </div>

                <div className="space-y-2.5 font-mono text-[9.5px] sm:text-[11px] text-red-400 overflow-hidden">
                  <AnimatePresence>
                    {LOG_ENTRIES.slice(0, logIndex).map((log, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-2.5 items-start border-b border-red-900/20 pb-1.5"
                      >
                        <div className="w-1 h-1 rounded-full bg-red-600 mt-1.5 opacity-80 shadow-[0_0_5px_rgba(255,0,0,1)] shrink-0"></div>
                        <div className="leading-tight">
                          {log.text} <span className="opacity-100">{log.emoji}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
             </div>

             {/* Footer */}
             {logIndex >= LOG_ENTRIES.length && (
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mt-4 border border-rose-800/50 bg-[#1a0005]/50 p-3 sm:p-4 relative rounded shadow-[0_0_30px_rgba(255,30,80,0.2)]"
               >
                 <div className="text-rose-900 text-[8px] sm:text-[9px] mb-1">FINAL CLASSIFICATION</div>
                 <div className="flex justify-between items-center">
                   <div className="text-rose-400 text-[10px] sm:text-xs tracking-widest font-bold drop-shadow-[0_0_8px_rgba(255,100,150,0.8)]">DANGEROUSLY CHAOTIC. UNDENIABLY PRECIOUS.</div>
                   <div className="text-rose-500/80 hidden sm:block animate-pulse">♡</div>
                 </div>
               </motion.div>
             )}

             <div className="flex justify-between text-red-900 text-[7px] sm:text-[8px] mt-3 opacity-60">
               <span>&gt; ANALYSIS COMPLETE...</span>
               <span>[ 00:07 ]</span>
             </div>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div 
            key="flashes"
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
          >
            {/* Rapidly flashing words */}
            <motion.div 
              animate={{ 
                scale: [1, 2, 0.5, 3, 1],
                rotate: [0, 15, -15, 5, 0],
                opacity: [1, 0, 1, 0, 1]
              }}
              transition={{ duration: 2, times: [0, 0.25, 0.5, 0.75, 1] }}
              className="absolute font-sans font-black text-6xl text-white text-glow mix-blend-difference z-20 uppercase"
            >
              OVERTHINKER
            </motion.div>
            
            <motion.div 
              animate={{ 
                scale: [0.5, 1.5, 1, 2, 0.8],
                opacity: [0, 1, 0, 1, 0]
              }}
              transition={{ duration: 2, delay: 0.2 }}
              className="absolute font-typewriter font-bold text-5xl text-neon-pink z-20 rotate-12"
            >
              MEME HOARDER
            </motion.div>

            <motion.div 
              animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
              transition={{ duration: 2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
              className="absolute inset-0 border-[20px] border-neon-pink flex items-center justify-center p-8 bg-black/80"
            >
               <Unlock className="w-32 h-32 text-neon-pink animate-ping" />
            </motion.div>
          </motion.div>
        )}

        {phase === 3 && (
          <motion.div 
            key="happybday"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-handwriting text-white text-glow mb-4">
              Happy Birthday
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-neon-pink tracking-tight uppercase transform rotate-[-5deg]">
              Idiot 🎂
            </h2>
            <p className="mt-8 font-typewriter text-gray-400 text-sm tracking-widest uppercase">
              Access Granted. Opening Vault.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

