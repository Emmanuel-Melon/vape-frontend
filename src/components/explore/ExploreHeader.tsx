import React from 'react';
import { motion } from 'framer-motion';

export const ExploreHeader: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-4xl mb-4"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🌟
      </motion.div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
        Explore Community Templates
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover curated vaporizer recommendations from our community of experts and enthusiasts. Purchase directly from trusted sellers.
      </p>
    </motion.div>
  );
};
