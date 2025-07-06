import React from 'react';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
  isSubmitting: boolean;
  isFinalQuestion: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onNext,
  onPrevious,
  isNextDisabled,
  isPreviousDisabled,
  isSubmitting,
  isFinalQuestion,
}) => {
  return (
    <div className={`flex ${isFinalQuestion ? 'justify-end' : 'justify-between'} items-center mt-8`}>
      {!isFinalQuestion && (
        <motion.button
          onClick={onPrevious}
          disabled={isPreviousDisabled || isSubmitting}
          className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isPreviousDisabled || isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isPreviousDisabled || isSubmitting ? 1 : 0.95 }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </motion.button>
      )}

      <motion.button
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className="flex items-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-slate-400 disabled:to-slate-500"
        whileHover={{ scale: isNextDisabled || isSubmitting ? 1 : 1.05, y: isNextDisabled || isSubmitting ? 0 : -2 }}
        whileTap={{ scale: isNextDisabled || isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : isFinalQuestion ? (
          <CheckCircle className="w-5 h-5 mr-2" />
        ) : null}
        {isSubmitting ? 'Submitting...' : isFinalQuestion ? 'Finish & See Results' : 'Next'}
        {!isSubmitting && !isFinalQuestion && <ChevronRight className="w-5 h-5 ml-2" />}
      </motion.button>
    </div>
  );
};
