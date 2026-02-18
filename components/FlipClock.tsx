import React from 'react';
import { TimeLeft, Translation } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipClockProps {
  timeLeft: TimeLeft;
  labels: Translation;
  isDark: boolean;
}

const TimeUnit = ({ value, label, isDark }: { value: number; label: string; isDark: boolean }) => {
  const formattedValue = value.toString().padStart(2, '0');
  
  return (
    <div className="flex flex-col items-center mx-1 sm:mx-2 md:mx-4">
      <div className="relative perspective">
        {/* The Card */}
        <div className={`
          relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 
          rounded-lg shadow-xl overflow-hidden
          flex items-center justify-center
          ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'}
          border-b-4
        `}>
          {/* Top Half Highlight */}
          <div className={`absolute top-0 left-0 right-0 h-1/2 opacity-10 pointer-events-none z-10 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
          
          {/* Center Line */}
          <div className={`absolute top-1/2 left-0 right-0 h-[1px] z-20 ${isDark ? 'bg-black/50' : 'bg-gray-300'}`}></div>

          {/* Rolling Numbers */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={formattedValue}
                initial={{ y: '100%', filter: 'blur(5px)', opacity: 0 }}
                animate={{ y: '0%', filter: 'blur(0px)', opacity: 1 }}
                exit={{ y: '-100%', filter: 'blur(5px)', opacity: 0 }}
                transition={{ 
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`
                  absolute
                  text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tighter
                  ${isDark ? 'text-blue-400' : 'text-blue-600'}
                  drop-shadow-sm
                `}
              >
                {formattedValue}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <span className={`mt-3 text-xs sm:text-sm font-medium uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
};

const FlipClock: React.FC<FlipClockProps> = ({ timeLeft, labels, isDark }) => {
  return (
    <div className="flex flex-row justify-center items-center py-6 sm:py-10">
      <TimeUnit value={timeLeft.days} label={labels.days} isDark={isDark} />
      <span className={`text-2xl sm:text-4xl pb-8 font-mono ${isDark ? 'text-zinc-700' : 'text-gray-300'}`}>:</span>
      <TimeUnit value={timeLeft.hours} label={labels.hours} isDark={isDark} />
      <span className={`text-2xl sm:text-4xl pb-8 font-mono ${isDark ? 'text-zinc-700' : 'text-gray-300'}`}>:</span>
      <TimeUnit value={timeLeft.minutes} label={labels.minutes} isDark={isDark} />
      <span className={`text-2xl sm:text-4xl pb-8 font-mono ${isDark ? 'text-zinc-700' : 'text-gray-300'}`}>:</span>
      <TimeUnit value={timeLeft.seconds} label={labels.seconds} isDark={isDark} />
    </div>
  );
};

export default FlipClock;