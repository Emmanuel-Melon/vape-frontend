import React from 'react';
import { motion } from 'framer-motion';
// LucideIcon will be a React Component type
// We expect it to be passed as a component, e.g., User, MapPin from lucide-react
type LucideIconComponent = React.ComponentType<{ size?: number | string; className?: string; [key: string]: any }>;

interface StepConfigItem {
  id: string;
  label: string;
  icon: LucideIconComponent; // Updated type
  description: string;
  completed: boolean;
}

interface QuizProgressBarProps {
  stepConfig: StepConfigItem[];
  currentStepIndex: number;
  steps: string[]; // Array of step IDs
  isMobile: boolean;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ 
  stepConfig, 
  currentStepIndex, 
  steps, 
  isMobile 
}) => {
  return (
    <div className="mb-12">
      {/* Step Badges - Updated Styling */}
      <div className={`flex ${isMobile ? 'justify-around overflow-x-auto py-2' : 'justify-center'} items-start mb-6 relative gap-4 md:gap-8`}>
        {stepConfig.map((step, index) => {
          const isActive = index === currentStepIndex;
          // A step is completed if its 'completed' flag is true OR if it's an earlier step than current
          const isCompleted = step.completed || index < currentStepIndex; 
          const Icon = step.icon;

          let iconBgColor = 'bg-gray-300'; // Default for upcoming icon background
          let iconColor = 'text-gray-500';   // Default for upcoming icon color
          let textColor = 'text-black';  // Default for upcoming label text (black)
          let descriptionTextColor = 'text-black'; // Default for upcoming description text (black)
          let fontWeight = 'font-normal';

          if (isCompleted && !isActive) { // Completed but not active
            iconBgColor = 'bg-green-500';
            iconColor = 'text-white';
            textColor = 'text-green-600';
            descriptionTextColor = 'text-green-600'; // Description color for completed
            fontWeight = 'font-medium';
          } else if (isActive) { // Active step
            iconBgColor = 'bg-blue-500';
            iconColor = 'text-white';
            textColor = 'text-blue-600';
            descriptionTextColor = 'text-blue-600'; // Description color for active
            fontWeight = 'font-semibold';
          }

          return (
            <motion.div
              key={step.id}
              className={`flex flex-col items-center text-center cursor-default ${isMobile ? 'min-w-[70px]' : 'min-w-[90px]'}`}
              initial={{ opacity: 0, y: -10 }} // Changed to match old.tsx style: fade in and move down slightly
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }} // Changed to match old.tsx style: slightly longer stagger
            >
              <motion.div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${iconBgColor}`}
                whileHover={{ scale: 1.1 }}
              >
                <Icon size={isMobile ? 20 : 24} className={`${iconColor}`} />
              </motion.div>
              <div className={`mt-2 text-xs md:text-sm ${textColor} ${fontWeight} transition-colors duration-300`}>
                {step.label}
              </div>
              {!isMobile && (
                <div className={`text-xs ${descriptionTextColor} mt-0.5 max-w-[100px]`}>
                  {step.description}
                </div>
              )}
              {/* Connector lines removed as per new design */}
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStepIndex) / (steps.length -1)) * 100}%` }} // Adjusted for 0-indexed currentStepIndex
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
