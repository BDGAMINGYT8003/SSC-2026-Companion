import React, { useState } from 'react';
import { Translation, Language } from '../types';
import { PRACTICAL_INFO_EN, PRACTICAL_INFO_BN, INSTRUCTIONS_EN, INSTRUCTIONS_BN } from '../constants';
import { ChevronDown, AlertCircle, FlaskConical, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface InfoSectionProps {
  t: Translation;
  lang: Language;
  isDark: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ t, lang, isDark }) => {
  const [openSection, setOpenSection] = useState<'practical' | 'instructions' | null>(null);

  // Approximate delay start for the bottom section
  const baseDelay = 1.0; 

  const toggle = (section: 'practical' | 'instructions') => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const contentVariants = {
    closed: { height: 0, opacity: 0 },
    open: { 
      height: 'auto', 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-4">
      
      {/* Practical Info Card */}
      <motion.div 
        layout
        className={`
          rounded-2xl border overflow-hidden
          ${isDark 
            ? 'bg-zinc-900/50 border-zinc-800' 
            : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100'
          }
        `}
      >
        <button 
          onClick={() => toggle('practical')}
          className="w-full p-4 flex items-center justify-between focus:outline-none group select-none relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className={`
              p-2.5 rounded-xl transition-colors duration-300
              ${isDark ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}
            `}>
              <FlaskConical className="w-5 h-5" />
            </div>
            <span className={`font-bold text-sm sm:text-base ${isDark ? 'text-zinc-200' : 'text-gray-800'}`}>
              <AnimatedText text={t.practicalInfo} delay={baseDelay} />
            </span>
          </div>
          <motion.div
            animate={{ rotate: openSection === 'practical' ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {openSection === 'practical' && (
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              <div className="px-4 pb-6 pt-1">
                <div className={`h-[1px] w-full mb-4 ${isDark ? 'bg-zinc-800' : 'bg-gray-100'}`}></div>
                <div className={`leading-relaxed text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
                  <AnimatedText 
                    text={lang === Language.EN ? PRACTICAL_INFO_EN : PRACTICAL_INFO_BN} 
                    delay={0.1} // Immediate inside open accordion
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instructions Card */}
      <motion.div 
        layout
        className={`
          rounded-2xl border overflow-hidden
          ${isDark 
            ? 'bg-zinc-900/50 border-zinc-800' 
            : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100'
          }
        `}
      >
        <button 
          onClick={() => toggle('instructions')}
          className="w-full p-4 flex items-center justify-between focus:outline-none group select-none relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className={`
              p-2.5 rounded-xl transition-colors duration-300
              ${isDark ? 'bg-amber-900/20 text-amber-400' : 'bg-amber-50 text-amber-600'}
            `}>
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className={`font-bold text-sm sm:text-base ${isDark ? 'text-zinc-200' : 'text-gray-800'}`}>
              <AnimatedText text={t.instructions} delay={baseDelay + 0.1} />
            </span>
          </div>
          <motion.div
            animate={{ rotate: openSection === 'instructions' ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {openSection === 'instructions' && (
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              <div className="px-4 pb-6 pt-1">
                <div className={`h-[1px] w-full mb-4 ${isDark ? 'bg-zinc-800' : 'bg-gray-100'}`}></div>
                <ul className="space-y-3">
                  {(lang === Language.EN ? INSTRUCTIONS_EN : INSTRUCTIONS_BN).map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                      <AlertCircle className={`w-4 h-4 min-w-[16px] mt-0.5 ${isDark ? 'text-zinc-600' : 'text-gray-400'}`} />
                      <span className={`leading-relaxed ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
                        <AnimatedText text={inst} delay={0.1 + (idx * 0.05)} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default InfoSection;