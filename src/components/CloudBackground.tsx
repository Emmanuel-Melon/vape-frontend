import React from 'react';
import { motion } from 'framer-motion';

export const CloudBackground: React.FC = () => {
  const clouds = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 30,
    delay: Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          style={{
            width: cloud.size,
            height: cloud.size * 0.6,
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional floating particles */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};