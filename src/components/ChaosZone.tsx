import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, AlertCircle, TrendingDown, BatteryWarning, ArrowRight } from 'lucide-react';

export default function ChaosZone({ onNext }: { onNext: () => void }) {
  const [windows, setWindows] = useState([
    { id: 1, title: 'DAILY_REPORT.exe', type: 'report', x: 10, y: 50, z: 10 },
    { id: 2, title: 'ROAST_GENERATOR.app', type: 'roast', x: -10, y: -20, z: 20 },
    { id: 3, title: 'SYSTEM_WARNING', type: 'alert', x: 0, y: 120, z: 30 },
  ]);

  const bringToFront = (id: number) => {
    const maxZ = Math.max(...windows.map(w => w.z));
    setWindows(windows.map(w => w.id === id ? { ...w, z: maxZ + 1 } : w));
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <section className="min-h-screen w-full bg-[#0a0710] py-20 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Glitch Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] z-0" />
      
      <header className="absolute top-10 text-center z-10 w-full pointer-events-none">
        <h2 className="font-typewriter text-neon-pink tracking-widest text-sm mb-2 uppercase">Phase 2</h2>
        <h1 className="text-4xl font-black text-white mix-blend-difference tracking-tighter uppercase glitch-effect" data-text="THE CHAOS ZONE">
          THE CHAOS ZONE
        </h1>
      </header>

      <div className="relative w-full max-w-lg h-[600px]">
        {windows.map((win) => (
          <motion.div
            key={win.id}
            drag
            dragMomentum={false}
            onPointerDown={() => bringToFront(win.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: win.x, y: win.y }}
            style={{ zIndex: win.z }}
            className={`absolute left-0 right-0 mx-auto w-[90%] max-w-[320px] glass-panel rounded overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing border ${
               win.type === 'alert' ? 'border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : 'border-white/10'
            }`}
          >
            {/* Window Header */}
            <div className={`px-3 py-2 flex items-center justify-between border-b ${
              win.type === 'alert' ? 'bg-red-900/40 border-red-500/30 text-red-200' : 'bg-white/5 border-white/10 text-white'
            }`}>
              <div className="font-typewriter text-xs tracking-wider font-bold truncate flex-1">
                {win.title}
              </div>
              <button onClick={() => closeWindow(win.id)} className="hover:bg-white/20 rounded p-1 transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Window Body */}
            <div className="p-4 bg-black/40 backdrop-blur-md relative">
              {win.type === 'report' && (
                <div className="space-y-4">
                   <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                     <TrendingDown className="text-neon-pink" size={24} />
                     <div>
                       <div className="font-sans text-xs text-gray-400">Tasks Completed Today</div>
                       <div className="font-typewriter text-xl font-bold text-white">0.00</div>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <BatteryWarning className="text-orange-400" size={24} />
                     <div>
                       <div className="font-sans text-xs text-gray-400">Social Battery</div>
                       <div className="font-typewriter text-sm font-bold text-orange-400">CRITICALLY LOW</div>
                     </div>
                   </div>
                   <div className="font-handwriting text-neon-pink text-lg text-center mt-2 border-t border-white/10 pt-2">
                     "Professional Overthinker"
                   </div>
                </div>
              )}

              {win.type === 'roast' && (
                <div className="flex flex-col items-center">
                  <div className="w-full h-24 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded flex items-center justify-center mb-4 border border-white/10">
                    <span className="font-typewriter text-neon-pink text-center px-4 leading-tight">
                      Loading your worst traits...
                    </span>
                  </div>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white font-sans text-sm font-bold py-2 rounded transition-colors border border-white/10">
                    GENERATE NEW ROAST
                  </button>
                </div>
              )}

              {win.type === 'alert' && (
                <div className="flex items-start gap-4">
                  <AlertCircle className="text-red-500 shrink-0 mt-1" size={32} />
                  <div>
                    <h3 className="font-sans font-bold text-red-400 mb-1">DRAMA LEVELS CRITICAL</h3>
                    <p className="font-sans text-xs text-gray-300">
                      Subject has been overthinking a minor interaction for 4 consecutive hours. Immediate intervention required (send snacks).
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="absolute bottom-10 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-2 rounded-full font-typewriter text-sm tracking-widest transition-all z-50 flex items-center gap-2 backdrop-blur-sm"
      >
        ESCAPE CHAOS <ArrowRight size={16} />
      </motion.button>
    </section>
  );
}
