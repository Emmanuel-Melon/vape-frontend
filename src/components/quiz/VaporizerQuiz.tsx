import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { Sliders, HelpCircle, ListChecks, Edit3, BarChart3, Loader2, AlertTriangle } from 'lucide-react';
import { QuizProgressBar } from './QuizProgressBar';
import { Footer } from '../layout/Footer';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { QuizStepContent } from './QuizStepContent';
import { QuizNavigation } from './QuizNavigation';
import { CloudBackground } from '../layout/CloudBackground';
import { FloatingBubbles } from '../FloatingBubbles';
import {
  useSubmitQuizAnswers,
  QuizAnswerSchema,
  useQuizById,
  QuestionResponseSchema,
} from '../../hooks/use-quizzes';

export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
export type QuestionDisplay = z.infer<typeof QuestionResponseSchema>;
type SubmittedAnswers = Record<number, QuizAnswer>;

interface VaporizerQuizProps {
  quizId: number;
}

const VaporizerQuiz: React.FC<VaporizerQuizProps> = ({ quizId }) => {
  const navigate = useNavigate();
  const { data: quizData, isLoading, isError, error } = useQuizById(quizId);
  const isMobile = useIsMobile();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswers>({});
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous' | 'initial'>('initial');
  const { mutate: submit, isPending: isSubmitting } = useSubmitQuizAnswers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 text-sky-700">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="mt-4 text-lg">Loading Quiz...</p>
      </div>
    );
  }

  if (isError || !quizData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
        <AlertTriangle className="w-12 h-12" />
        <p className="mt-4 text-lg font-semibold">Failed to load quiz</p>
        <p className="text-sm">{error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  const { questions } = quizData;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: QuizAnswer) => {
    setSubmittedAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setAnimationDirection('next');
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const finalAnswers = Object.values(submittedAnswers);
      if (finalAnswers.length !== totalQuestions) {
        alert('Please answer all questions before submitting.');
        return;
      }
      submit(
        {
          quizId, answers: finalAnswers,
          userId: ''
        },
        {
          onSuccess: (data) => navigate(`/quiz/results/${data.id}`),
          onError: (err: any) => {
            console.error('Quiz submission failed:', err);
            alert(`Failed to submit quiz: ${err.message || 'An unknown error occurred'}`);
          },
        }
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnimationDirection('previous');
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sen bg-sky-50 relative overflow-hidden">
      <CloudBackground />
      <FloatingBubbles />
      <div className="flex-grow flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl mx-auto">
          <QuizProgressBar 
            progress={progress} 
            currentQuestion={currentQuestionIndex + 1} 
            totalQuestions={totalQuestions} 
          />
          <AnimatePresence mode="wait">
            <QuizStepContent
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswerSelect}
              animationDirection={animationDirection}
              selectedAnswer={submittedAnswers[currentQuestion.id]}
            />
          </AnimatePresence>
          <QuizNavigation
            onNext={handleNext}
            onPrevious={handlePrevious}
            isNextDisabled={!submittedAnswers[currentQuestion.id]}
            isPreviousDisabled={currentQuestionIndex === 0}
            isSubmitting={isSubmitting}
            isFinalQuestion={currentQuestionIndex === totalQuestions - 1}
          />
        </div>
      </div>
      {!isMobile && <Footer />} 
    </div>
  );
};

export default VaporizerQuiz;
