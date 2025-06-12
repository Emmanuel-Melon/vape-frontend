import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  emojiAnimation?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  emoji,
  emojiAnimation = true,
}) => {
  return (
    <motion.div
      className="text-center mb-12 sm:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {emoji && (
        <motion.div
          className="text-4xl sm:text-5xl mb-4 sm:mb-6"
          animate={emojiAnimation ? { 
            scale: [1, 1.1, 1, 1.05, 1], 
            rotate: [0, 3, -3, 2, -2, 0]
          } : {}}
          transition={emojiAnimation ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          {emoji}
        </motion.div>
      )}
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg sm:text-xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
