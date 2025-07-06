import React from 'react';

interface QuizProgressBarProps {
  progress: number; // Percentage, 0-100
  currentQuestion: number; // 1-indexed
  totalQuestions: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({
  progress,
  currentQuestion,
  totalQuestions,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-sky-700">
          Question {currentQuestion} of {totalQuestions}
        </p>
        <p className="text-sm font-semibold text-green-600">
          {Math.round(progress)}%
        </p>
      </div>
      <div className="w-full bg-sky-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
