import React from 'react';
import { Exam, Group, Language, Translation } from '../types';
import { formatDate } from '../utils/timeUtils';
import { CheckCircle2, Clock, Calendar, Hourglass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText from './AnimatedText';

interface ExamListProps {
  exams: Exam[];
  selectedGroup: Group;
  lang: Language;
  t: Translation;
  isDark: boolean;
}

const ExamList: React.FC<ExamListProps> = ({ exams, selectedGroup, lang, t, isDark }) => {
  
  // Filter exams based on group
  const filteredExams = exams.filter(exam => 
    exam.groups.includes(selectedGroup)
  );

  // Helper to check status
  const getStatus = (dateStr: string, timeStr: string) => {
    const examDate = new Date(`${dateStr}T${timeStr === '10:00 AM' ? '13:00:00' : '16:00:00'}+06:00`).getTime();
    const now = new Date().getTime();
    if (now > examDate) return 'completed';
    return 'upcoming';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGroup}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="space-y-4"
        >
          {filteredExams.map((exam, index) => {
            const status = getStatus(exam.date, exam.time);
            const isCompleted = status === 'completed';
            
            // Stagger delay calculation: Base (0.4s) + Index Stagger
            const cardDelay = 0.45 + (index * 0.06);
            
            // Calculate Gap
            let gapText = null;
            if (index > 0) {
               const prevExam = filteredExams[index - 1];
               const currDate = new Date(exam.date);
               const prevDate = new Date(prevExam.date);
               const diffTime = currDate.getTime() - prevDate.getTime();
               const diffDays = Math.round(diffTime / (1000 * 3600 * 24)) - 1;
               
               if (diffDays <= 0) {
                 gapText = t.noGap;
               } else {
                 const dayLabel = diffDays === 1 ? t.day : t.days;
                 gapText = `${diffDays} ${dayLabel} ${t.gapPrep}`;
               }
            }

            return (
              <motion.div 
                key={exam.id}
                variants={itemVariants}
                layout // Enable layout animation for smooth resizing
                layoutId={exam.id}
                className={`
                  group relative overflow-hidden rounded-2xl border transition-colors duration-300
                  ${isDark 
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' 
                    : 'bg-white border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md'
                  }
                  ${isCompleted ? 'opacity-60 grayscale' : 'opacity-100'}
                `}
              >
                {/* Active Highlight Bar */}
                {!isCompleted && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-600"></div>
                )}

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`
                        text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
                        ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-500'}
                      `}>
                         <span className="mr-1"><AnimatedText text={t.examCode} delay={cardDelay} />:</span>
                         {exam.code}
                      </span>
                      {index === 0 && !isCompleted && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 animate-pulse">
                          NEXT
                        </span>
                      )}
                    </div>
                    
                    <div className={`text-lg sm:text-xl font-bold mb-2 ${isDark ? 'text-zinc-100' : 'text-gray-900'}`}>
                      <AnimatedText 
                        text={lang === Language.EN ? exam.subjectEn : exam.subjectBn} 
                        delay={cardDelay + 0.05} 
                        as="h3"
                      />
                    </div>
                    
                    {/* Meta Row: Date, Time, Gap */}
                    <div className={`
                      flex flex-col sm:flex-row sm:items-center gap-y-2 sm:gap-6 text-sm 
                      ${isDark ? 'text-zinc-400' : 'text-gray-500'}
                    `}>
                      {/* Date & Time Container */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 opacity-70" />
                          <AnimatedText text={formatDate(exam.date, lang)} delay={cardDelay + 0.1} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 opacity-70" />
                          <span>{exam.time}</span>
                        </div>
                      </div>

                      {/* Gap Info */}
                      {gapText && (
                        <div className={`
                          flex items-center gap-1.5 font-medium text-xs sm:text-sm
                          ${isDark ? 'text-amber-500/90' : 'text-amber-600'}
                        `}>
                          <Hourglass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <AnimatedText text={gapText} delay={cardDelay + 0.15} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="flex items-center justify-end sm:justify-center mt-2 sm:mt-0">
                     {isCompleted ? (
                       <div className="flex items-center gap-2 text-green-500">
                         <span className="text-sm font-medium"><AnimatedText text={t.completed} delay={cardDelay} /></span>
                         <CheckCircle2 className="w-6 h-6" />
                       </div>
                     ) : (
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center
                          ${isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-50 text-gray-300'}
                          group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors
                        `}>
                          <span className="font-mono font-bold text-sm">#{index + 1}</span>
                        </div>
                     )}
                  </div>

                </div>
              </motion.div>
            );
          })}
          
          {filteredExams.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-10 ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}
            >
              <AnimatedText text={t.noExam} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExamList;