import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-white overflow-hidden pointer-events-none"
        >
          {/* Subtle noise and radial glow */}
          <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 relative flex items-center justify-center">
              <img 
                src="/brand/fr_monogram_white.png" 
                alt="FRED RELICS" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              />
            </div>

            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              className="h-[1px] bg-white/40 mb-4"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-mono"
            >
              NOT JUST ACCESSORIES. RELICS.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
