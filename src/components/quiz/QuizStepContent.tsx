import React from 'react';
import { motion } from 'framer-motion';
import { QuestionDisplay, QuizAnswer } from './VaporizerQuiz'; // Import types from VaporizerQuiz
import { cn } from '../../lib/utils'; // For conditional class names

interface QuizStepContentProps {
  question: QuestionDisplay;
  onAnswer: (answer: QuizAnswer) => void;
  animationDirection: 'next' | 'previous' | 'initial';
  selectedAnswer: QuizAnswer | undefined;
}

export const QuizStepContent: React.FC<QuizStepContentProps> = ({
  question,
  onAnswer,
  animationDirection,
  selectedAnswer,
}) => {
  const variants = {
    enter: (direction: string) => ({
      x: direction === 'next' ? 100 : direction === 'previous' ? -100 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === 'next' ? -100 : direction === 'previous' ? 100 : 0,
      opacity: 0,
    }),
  };

  const handleSingleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const selectedOption = question?.options?.find(opt => opt.value === value);
    if (selectedOption) {
      onAnswer({ questionId: question.id, selectedOptionValue: value, optionId: selectedOption.id });
    }
  };

  const handleMultiSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = event.target.value;
    const checked = event.target.checked;

    let currentSelectedValues: string[] = [];
    if (selectedAnswer?.selectedOptionValues) {
      if (Array.isArray(selectedAnswer.selectedOptionValues)) {
        currentSelectedValues = selectedAnswer.selectedOptionValues as string[];
      } else if (typeof selectedAnswer.selectedOptionValues === 'string' && selectedAnswer.selectedOptionValues.length > 0) {
        // Fallback if it's somehow a string already (e.g. from older data or incorrect initial state)
        currentSelectedValues = selectedAnswer.selectedOptionValues.split(',');
      }
    }

    let newValues: string[];
    if (checked) {
      // Add value if checked, ensuring no duplicates if user clicks rapidly (though native checkbox handles this)
      newValues = Array.from(new Set([...currentSelectedValues, optionValue]));
    } else {
      newValues = currentSelectedValues.filter(val => val !== optionValue);
    }
    onAnswer({ questionId: question.id, selectedOptionValues: newValues, optionId: null }); // Pass as string[]
  };
  
  const handleRangeSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onAnswer({ questionId: question.id, rangeValue: value, optionId: null });
  };

  // Helper to check if a multi-select option is selected
  const isMultiOptionSelected = (optionValue: string): boolean => {
    if (!selectedAnswer || !selectedAnswer.selectedOptionValues) {
    return false;
  }

  // At this point, selectedAnswer.selectedOptionValues is known to be (string[] | string)
  // due to the schema change and the guard above.
  if (Array.isArray(selectedAnswer.selectedOptionValues)) {
    // selectedOptionValues is string[]
    return selectedAnswer.selectedOptionValues.includes(optionValue);
  } else {
    // If it's not an array, and its type is (string[] | string), it MUST be a string here.
    // TypeScript should infer selectedAnswer.selectedOptionValues as 'string'.
    return selectedAnswer.selectedOptionValues.split(',').includes(optionValue);
  }
  };

  return (
    <motion.div
      custom={animationDirection}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 min-h-[400px] flex flex-col justify-between"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 text-center">{question.text}</h2>
        {question.description && (
          <p className="text-sm md:text-base text-slate-600 mb-6 text-center">{question.description}</p>
        )}
        <div className="space-y-4">
          {question.type === 'WELCOME' && (
            <div className="text-center">
              <p className="text-lg text-slate-700">Let's get started!</p>
              {/* The WELCOME step usually doesn't have an input, but if it needed one, it would go here */}
            </div>
          )}
          {question.type === 'SINGLE_SELECT' && (
            <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question?.options?.map((option) => (
                <label
                  key={option.id}
                  htmlFor={`option-${option.id}`}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out",
                    selectedAnswer?.selectedOptionValue === option.value
                      ? "bg-sky-500 border-sky-600 text-white shadow-lg scale-105"
                      : "bg-white hover:bg-sky-50 hover:border-sky-300 border-slate-200 text-slate-700"
                  )}
                >
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={selectedAnswer?.selectedOptionValue === option.value}
                    onChange={handleSingleSelectChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">{option.label}</span>
                  {option.description && <span className="text-xs mt-1">{option.description}</span>}
                </label>
              ))}
            </div>
          )}
          {question.type === 'MULTI_SELECT' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question?.options?.map((option) => (
                <label
                  key={option.id}
                  htmlFor={`option-${option.id}`}
                  className={cn(
                    "flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out",
                    isMultiOptionSelected(option.value)
                      ? "bg-sky-500 border-sky-600 text-white shadow-lg scale-105"
                      : "bg-white hover:bg-sky-50 hover:border-sky-300 border-slate-200 text-slate-700"
                  )}
                >
                  <input
                    type="checkbox"
                    id={`option-${option.id}`}
                    value={option.value}
                    checked={isMultiOptionSelected(option.value)}
                    onChange={handleMultiSelectChange}
                    className="form-checkbox h-5 w-5 text-sky-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-sky-500"
                  />
                  <span className="text-sm font-semibold">{option.label}</span>
                </label>
              ))}
            </div>
          )}
          {question.type === 'RANGE_SLIDER' && question.rangeMin !== undefined && question.rangeMax !== undefined && (
            <div className="pt-4">
              <input
                type="range"
                min={question.rangeMin}
                max={question.rangeMax}
                step={question.rangeStep || 1}
                value={Number(selectedAnswer?.rangeValue) || question.rangeDefault || question.rangeMin}
                onChange={handleRangeSliderChange}
                className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <p className="text-center text-lg font-semibold text-sky-600 mt-4">
                {selectedAnswer?.rangeValue || question.rangeDefault || question.rangeMin}
                {question.unit && <span className="ml-1 text-sm text-slate-500">{question.unit}</span>}
              </p>
            </div>
          )}
          {question.type === 'RANKED_SELECT' && (
            <p className="text-center text-slate-500 italic">Ranked select UI (drag and drop) not yet implemented.</p>
          )}
        </div>
      </div>
      {question?.educationalTip && (
        <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
          <h4 className="font-semibold text-sky-700 mb-1">💡 Quick Tip</h4>
          <p className="text-xs text-slate-600">{question?.educationalTip}</p>
        </div>
      )}
    </motion.div>
  );
};
