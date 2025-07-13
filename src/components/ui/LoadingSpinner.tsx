import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Target, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
  icon?: 'brain' | 'sparkles' | 'target' | 'zap';
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'blue' | 'green' | 'orange';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  title = 'Processing...',
  subtitle = 'Please wait while we work our magic',
  icon = 'brain',
  size = 'lg',
  color = 'purple'
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'brain': return Brain;
      case 'sparkles': return Sparkles;
      case 'target': return Target;
      case 'zap': return Zap;
      default: return Brain;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'purple': return {
        gradient: 'from-purple-500 to-pink-500',
        dots: 'bg-purple-500'
      };
      case 'blue': return {
        gradient: 'from-blue-500 to-cyan-500',
        dots: 'bg-blue-500'
      };
      case 'green': return {
        gradient: 'from-green-500 to-emerald-500',
        dots: 'bg-green-500'
      };
      case 'orange': return {
        gradient: 'from-orange-500 to-red-500',
        dots: 'bg-orange-500'
      };
      default: return {
        gradient: 'from-purple-500 to-pink-500',
        dots: 'bg-purple-500'
      };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return {
        container: 'w-16 h-16',
        icon: 24,
        title: 'text-xl',
        subtitle: 'text-base',
        dot: 'w-2 h-2'
      };
      case 'md': return {
        container: 'w-20 h-20',
        icon: 32,
        title: 'text-2xl',
        subtitle: 'text-lg',
        dot: 'w-2.5 h-2.5'
      };
      case 'lg': return {
        container: 'w-24 h-24',
        icon: 40,
        title: 'text-3xl',
        subtitle: 'text-lg',
        dot: 'w-3 h-3'
      };
      default: return {
        container: 'w-24 h-24',
        icon: 40,
        title: 'text-3xl',
        subtitle: 'text-lg',
        dot: 'w-3 h-3'
      };
    }
  };

  const Icon = getIcon();
  const colors = getColorClasses();
  const sizes = getSizeClasses();

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rotating Icon */}
      <motion.div
        className={`${sizes.container} bg-gradient-to-br ${colors.gradient} rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Icon className="text-white" size={sizes.icon} />
      </motion.div>
      
      {/* Title */}
      <h2 className={`${sizes.title} font-bold text-gray-800 mb-4`}>
        {title}
      </h2>
      
      {/* Subtitle */}
      <p className={`${sizes.subtitle} text-gray-600 mb-8`}>
        {subtitle}
      </p>
      
      {/* Animated Dots */}
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${sizes.dot} ${colors.dots} rounded-full`}
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
