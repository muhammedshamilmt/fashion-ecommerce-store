'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 1.2,
    ease: "easeOut"
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => {
  return (
    <motion.section 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedContainer = ({ children, className = "" }: AnimatedSectionProps) => {
  return (
    <motion.div 
      className={className}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedItem = ({ children, className = "" }: AnimatedSectionProps) => {
  return (
    <motion.div 
      className={className}
      variants={fadeInUp}
    >
      {children}
    </motion.div>
  );
};

export { fadeInUp, staggerContainer }; 