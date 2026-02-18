import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
  text: string | number;
  className?: string;
  delay?: number;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  as = 'span'
}) => {
  const Component = motion[as] as any; // Type assertion for dynamic motion component

  return (
    <motion.span 
      layout
      className={`relative inline-block overflow-hidden align-bottom ${className}`}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Component
          key={text}
          initial={{ y: '-30%', opacity: 0, filter: 'blur(3px)' }}
          animate={{ 
            y: '0%', 
            opacity: 1, 
            filter: 'blur(0px)',
            transition: { 
              y: { type: "spring", stiffness: 180, damping: 22, delay: delay },
              opacity: { duration: 0.25, delay: delay },
              filter: { duration: 0.25, delay: delay }
            }
          }}
          exit={{ 
            y: '30%', 
            opacity: 0, 
            filter: 'blur(3px)',
            transition: { duration: 0.15, ease: "easeIn" } // Fast exit, no delay
          }}
          className="block whitespace-pre-wrap"
        >
          {text}
        </Component>
      </AnimatePresence>
    </motion.span>
  );
};

export default AnimatedText;