import React, { useState, useEffect, useMemo } from 'react';
import { Group, Language, Exam } from './types';
import { EXAM_SCHEDULE, TRANSLATIONS } from './constants';
import { getTimeRemaining } from './utils/timeUtils';
import FlipClock from './components/FlipClock';
import ExamList from './components/ExamList';
import InfoSection from './components/InfoSection';
import AnimatedText from './components/AnimatedText';
import { Settings, Moon, Sun, GraduationCap, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // --- Persistent State ---
  
  // Group Preference
  const [selectedGroup, setSelectedGroup] = useState<Group>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ssc_companion_group');
      if (saved && Object.values(Group).includes(saved as Group)) return saved as Group;
    }
    return Group.SCIENCE;
  });

  // Language Preference
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
       const saved = localStorage.getItem('ssc_companion_lang');
       return (saved === 'bn') ? Language.BN : Language.EN;
    }
    return Language.EN;
  });

  // Theme Preference - Initialized to match the head script logic exactly
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ssc_companion_theme');
      return saved === null ? true : saved === 'true'; // Default to true (Dark) if null
    }
    return true;
  });

  const [now, setNow] = useState(Date.now());
  const t = TRANSLATIONS[lang];

  // --- Effects for Persistence ---
  useEffect(() => {
    localStorage.setItem('ssc_companion_group', selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('ssc_companion_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('ssc_companion_theme', String(isDark));
    
    // Only toggle the class. Background color is handled by CSS in index.html based on this class.
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Tick every second to update UI
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Logic ---
  
  // 1. Identify the Target Exam
  const nextExam = useMemo(() => {
    const groupExams = EXAM_SCHEDULE.filter(e => e.groups.includes(selectedGroup));
    groupExams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentTimestamp = new Date().getTime();
    return groupExams.find(e => {
       const examEndTime = new Date(`${e.date}T13:00:00+06:00`).getTime();
       return examEndTime > currentTimestamp;
    });
  }, [selectedGroup, now]);

  // 2. Smart Label Logic
  const heroLabel = useMemo(() => {
    const groupExams = EXAM_SCHEDULE.filter(e => e.groups.includes(selectedGroup));
    const examsStarted = groupExams.some(e => {
       const examEndTime = new Date(`${e.date}T13:00:00+06:00`).getTime();
       return examEndTime < now;
    });
    return examsStarted ? t.nextExam : t.startsIn;
  }, [selectedGroup, now, t]);

  // 3. Calculate Time Left
  const timeLeft = useMemo(() => {
    if (!nextExam) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
    return getTimeRemaining(nextExam.date, nextExam.time);
  }, [nextExam, now]);

  // 4. Calculate Progress
  const progress = useMemo(() => {
    const groupExams = EXAM_SCHEDULE.filter(e => e.groups.includes(selectedGroup));
    const total = groupExams.length;
    const passed = groupExams.filter(e => {
      const examEndTime = new Date(`${e.date}T13:00:00+06:00`).getTime();
      return examEndTime < now;
    }).length;
    return total === 0 ? 0 : (passed / total) * 100;
  }, [selectedGroup, now]);


  // --- Event Handlers ---
  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(prev => prev === Language.EN ? Language.BN : Language.EN);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>
      
      {/* --- Sticky Header --- */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className={`
          sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300
          ${isDark ? 'bg-black/70 border-zinc-800' : 'bg-white/70 border-gray-200'}
        `}
      >
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className={`p-2 rounded-lg ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-600 text-white'}`}
            >
               <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <div>
              <h1 className="font-bold text-sm sm:text-base leading-tight">
                <AnimatedText text={t.title} delay={0} />
              </h1>
              <div className={`text-[10px] sm:text-xs uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
                <AnimatedText text={t.subtitle} delay={0.05} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Lang Toggle */}
            <button 
              onClick={toggleLang}
              className={`
                relative px-3 py-1.5 rounded-full text-xs font-bold border transition-all overflow-hidden
                ${isDark 
                  ? 'border-zinc-700 hover:bg-zinc-800 text-zinc-300' 
                  : 'border-gray-200 hover:bg-gray-100 text-gray-700'}
              `}
            >
              <AnimatePresence mode="wait">
                <motion.span 
                  key={lang}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="block"
                >
                  {lang === Language.EN ? 'বাংলা' : 'ENG'}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`
                p-2 rounded-full transition-all relative
                ${isDark ? 'bg-zinc-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}
              `}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- Main Content --- */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-8 sm:space-y-12 pb-24 overflow-x-hidden">
        
        {/* --- Hero / Countdown Section --- */}
        <section className="text-center relative">
          <AnimatePresence mode="wait">
            {nextExam ? (
              <motion.div 
                key={nextExam.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                 <span className={`
                   inline-block py-1 px-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4
                   ${isDark ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' : 'bg-blue-50 text-blue-600 border border-blue-100'}
                 `}>
                   <AnimatedText text={heroLabel} delay={0.1} />
                 </span>
                 
                 <div className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                   <AnimatedText 
                     text={lang === Language.EN ? nextExam.subjectEn : nextExam.subjectBn} 
                     delay={0.15}
                     as="h2"
                     className="leading-tight"
                   />
                 </div>
                 
                 <div className={`text-sm sm:text-base mb-2 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                   <AnimatedText text={`${nextExam.time} • ${nextExam.date}`} delay={0.2} />
                 </div>

                 <FlipClock timeLeft={timeLeft} labels={t} isDark={isDark} />

                 <div className="mt-4 flex justify-center">
                   <motion.div 
                     animate={{ y: [0, 8, 0] }}
                     transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                   >
                    <ArrowDown className={`w-5 h-5 ${isDark ? 'text-zinc-600' : 'text-gray-300'}`} />
                   </motion.div>
                 </div>
              </motion.div>
            ) : (
              <motion.div 
                key="completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20"
              >
                 <h2 className="text-3xl font-bold mb-4">{t.goodLuck}</h2>
                 <p className="text-zinc-500">All exams for this group are completed.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- Progress Bar --- */}
        <section className="px-2">
           <div className="flex justify-between items-end mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
                <AnimatedText text={t.seasonProgress} delay={0.25} />
              </span>
              <span className={`text-sm font-mono ${isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
                {Math.round(progress)}%
              </span>
           </div>
           <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}>
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
           </div>
        </section>

        {/* --- Controls & List --- */}
        <section>
          {/* Custom Tabs with Layout Animation */}
          <div className={`
             flex p-1 rounded-xl mb-8 relative
             ${isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-100 border border-gray-200'}
          `}>
            {[Group.SCIENCE, Group.COMMERCE, Group.ARTS].map((grp, idx) => {
               const isActive = selectedGroup === grp;
               let label = '';
               if (grp === Group.SCIENCE) label = t.groupScience;
               if (grp === Group.COMMERCE) label = t.groupCommerce;
               if (grp === Group.ARTS) label = t.groupArts;

               return (
                 <button
                   key={grp}
                   onClick={() => setSelectedGroup(grp)}
                   className={`
                     flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-lg relative z-10 transition-colors
                     ${isActive 
                       ? (isDark ? 'text-white' : 'text-blue-600') 
                       : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-gray-500 hover:text-gray-700')
                     }
                   `}
                 >
                   {isActive && (
                     <motion.div
                       layoutId="activeTab"
                       className={`absolute inset-0 rounded-lg shadow-sm ${isDark ? 'bg-zinc-800' : 'bg-white'}`}
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                       style={{ zIndex: -1 }}
                     />
                   )}
                   <AnimatedText text={label} delay={0.3 + (idx * 0.05)} />
                 </button>
               )
            })}
          </div>

          <div className="flex items-center gap-2 mb-6">
             <div className={`h-[1px] flex-1 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
             <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>
               <AnimatedText text={t.routineTitle} delay={0.4} />
             </span>
             <div className={`h-[1px] flex-1 ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}></div>
          </div>

          <ExamList 
            exams={EXAM_SCHEDULE} 
            selectedGroup={selectedGroup} 
            lang={lang} 
            t={t} 
            isDark={isDark} 
          />

          <InfoSection t={t} lang={lang} isDark={isDark} />

        </section>

      </main>
      
      {/* Background Decor */}
      <div className={`fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-60'}`}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow"></div>
      </div>

    </div>
  );
};

export default App;