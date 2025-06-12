import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface QuizNavigationProps {
  currentStepIndex: number;
  stepsLength: number;
  canProceed: () => boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  isMobile: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentStepIndex,
  stepsLength,
  canProceed,
  handlePrevious,
  handleNext,
  isMobile,
}) => {
  return (
    <>
      {/* Desktop Side Arrows */}
      {!isMobile && currentStepIndex > 0 && (
        <motion.button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800"
          style={{ marginLeft: '-64px' }} // Adjust as needed for spacing from the main content card
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} // Added exit animation
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} // Adjusted whileTap scale
        >
          <ChevronLeft size={24} />
        </motion.button>
      )}
      {!isMobile && canProceed() && (
        <motion.button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white"
          style={{ marginRight: '-64px' }} // Adjust as needed
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }} // Added exit animation
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} // Adjusted whileTap scale
        >
          {currentStepIndex === stepsLength - 1 ? <Search size={24} /> : <ChevronRight size={24} />}
        </motion.button>
      )}

      {/* Mobile Bottom Navigation */}
      <AnimatePresence>
        {isMobile && (currentStepIndex > 0 || canProceed()) && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 border-t border-gray-200 shadow-top-lg z-50 flex justify-between items-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {currentStepIndex > 0 ? (
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
            ) : (
              <div></div> // Empty div to maintain spacing
            )}

            {canProceed() && (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg"
              >
                <span>{currentStepIndex === stepsLength - 1 ? 'Get Results' : 'Next'}</span>
                {currentStepIndex === stepsLength - 1 ? <Search size={20} /> : <ChevronRight size={20} />}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
