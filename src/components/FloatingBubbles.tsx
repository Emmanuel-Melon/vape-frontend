import React from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

export const FloatingBubbles: React.FC = () => {
  // Generate random bubbles with different properties
  const bubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20, // 20-80px
    x: Math.random() * 100, // 0-100%
    y: Math.random() * 100, // 0-100%
    duration: Math.random() * 15 + 10, // 10-25 seconds
    delay: Math.random() * 5, // 0-5 seconds delay
    color: [
      'from-green-400/20 to-blue-400/20',
      'from-blue-400/20 to-purple-400/20',
      'from-purple-400/20 to-pink-400/20',
      'from-pink-400/20 to-red-400/20',
      'from-yellow-400/20 to-orange-400/20',
      'from-cyan-400/20 to-teal-400/20'
    ][Math.floor(Math.random() * 6)],
    opacity: Math.random() * 0.4 + 0.1 // 0.1-0.5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full bg-gradient-to-br ${bubble.color} backdrop-blur-sm border border-white/10`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -100, -200, -100, 0],
            x: [0, 30, -20, 40, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [bubble.opacity, bubble.opacity * 1.5, bubble.opacity * 0.5, bubble.opacity * 1.2, bubble.opacity],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Extra small floating particles */}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large ambient bubbles */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/5"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.1, 0.2, 0.05, 0.1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive hover bubbles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`interactive-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-green-300/10 to-blue-300/10 backdrop-blur-sm border border-white/20 cursor-pointer"
          style={{
            width: Math.random() * 40 + 30,
            height: Math.random() * 40 + 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.5,
            opacity: 0.8,
            transition: { duration: 0.3 }
          }}
        />
      ))}
    </div>
  );
};