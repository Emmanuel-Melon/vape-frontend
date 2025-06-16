import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { z } from 'zod';
// Lucide icons can be mapped to question types or used generally
import { Sliders, HelpCircle, ListChecks, Edit3, BarChart3 } from 'lucide-react'; // Removed AlertTriangle, Loader2
import { QuizProgressBar } from './QuizProgressBar';
import { Footer } from '../Footer';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { QuizStepContent } from './QuizStepContent';
import { QuizNavigation } from './QuizNavigation';
// Removed QuizResults import
import { CloudBackground } from '../CloudBackground';
import { FloatingBubbles } from '../FloatingBubbles';
import {
  useSubmitQuizAnswers,
  QuizAnswerSchema,
  useQuizById, // Added for fetching quiz data
  Quiz as ApiQuizData, // Type for the fetched quiz data
  QuestionResponseSchema, // Zod schema for individual questions from API
} from '../../hooks/use-quizzes';
// Removed staticQuizData imports
import { motion } from 'framer-motion';

// Define types locally
export type QuizAnswer = z.infer<typeof QuizAnswerSchema>;
// QuestionDisplay will now be based on the API's QuestionResponseSchema
export type QuestionDisplay = z.infer<typeof QuestionResponseSchema>;

// Define a type for the answers state
// Keys are question.id (number), values are QuizAnswer objects
type SubmittedAnswers = Record<number, QuizAnswer>;

interface VaporizerQuizProps {
  quizId: number; // Restored quizId prop
}

const VaporizerQuiz: React.FC<VaporizerQuizProps> = ({ quizId }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswers>({});
  // Removed showApiResults and finalResults states
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous' | 'initial'>('initial');

  // Fetch quiz data from API
  const { data: rawQuizData, isLoading: isLoadingQuiz, error: quizError } = useQuizById(quizId);

  const submitQuizMutation = useSubmitQuizAnswers();

  // Transform quiz data for specific questions (Budget and Priorities)
  const quizData = React.useMemo(() => {
    if (!rawQuizData) return undefined;
    return {
      ...rawQuizData,
      questions: rawQuizData.questions.map(q => {
        if (q.id === 5 && q.type === 'SINGLE_SELECT') { // Budget Question ID from DB
          return {
            ...q,
            type: 'RANGE_SLIDER' as QuestionDisplay['type'], // Override type
            rangeMin: 50,
            rangeMax: 800,
            rangeStep: 10,
            rangeDefault: 200,
            options: q.options || [], // Ensure options array exists even if empty
          };
        }
        if (q.id === 6 && q.type === 'SINGLE_SELECT') { // Priorities Question ID from DB
          return {
            ...q,
            type: 'RANKED_SELECT' as QuestionDisplay['type'], // Override type
            // Inject options for ranking, as DB provides an empty array for SINGLE_SELECT
            options: [
              { id: 301, questionId: q.id, label: 'Flavor Quality', value: 'flavor', description: undefined, order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
              { id: 302, questionId: q.id, label: 'Vapor Potency', value: 'potency', description: undefined, order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
              { id: 303, questionId: q.id, label: 'Ease of Use', value: 'ease_of_use', description: undefined, order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
              { id: 304, questionId: q.id, label: 'Discreetness', value: 'discreetness', description: undefined, order: 4, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
              { id: 305, questionId: q.id, label: 'Battery Life', value: 'battery_life', description: undefined, order: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
            ],
          };
        }
        return q;
      }),
    };
  }, [rawQuizData]);

  const handleAnswerChange = (questionId: number, answerPayload: Partial<QuizAnswer>) => {
    // Find the question to get its type for the answer payload
    const question = questions.find(q => q.id === questionId);
    if (!question) {
      console.error(`Question with id ${questionId} not found for answer.`);
      return;
    }

    const fullAnswer: QuizAnswer = {
      questionId: questionId,
      type: question.type, // Added question type to the answer object
      selectedOptionValue: answerPayload.selectedOptionValue,
      selectedOptionValues: answerPayload.selectedOptionValues,
      rankedOptions: answerPayload.rankedOptions, // Changed from rankedAnswers to rankedOptions
      rangeValue: answerPayload.rangeValue,
    };

    try {
      QuizAnswerSchema.parse(fullAnswer);
      setSubmittedAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: fullAnswer,
      }));
    } catch (e) {
      console.error("Invalid answer format for question:", questionId, fullAnswer, e);
    }
  };
  
  const getIconForQuestionType = (type: QuestionDisplay['type']) => {
    switch (type) {
      case 'WELCOME': return HelpCircle;
      case 'SINGLE_SELECT': return ListChecks;
      case 'MULTI_SELECT': return ListChecks; 
      case 'RANKED_SELECT': return BarChart3;
      case 'RANGE_SLIDER': return Sliders;
      default: return Edit3;
    }
  };

  const questions: QuestionDisplay[] = quizData?.questions || [];
  const currentQuestion: QuestionDisplay | undefined = questions[currentQuestionIndex];

  const progressStepConfig = questions.map((question) => ({
    id: question.id.toString(),
    label: question.text.substring(0, 20) + (question.text.length > 20 ? '...' : ''),
    icon: getIconForQuestionType(question.type),
    description: question.subtitle || question.text,
    completed: !!submittedAnswers[question.id],
  }));

  const canProceed = (): boolean => {
    if (!currentQuestion) return false;
    const currentAnswer = submittedAnswers[currentQuestion.id];
    if (!currentAnswer) return false;

    switch (currentQuestion.type) {
      case 'SINGLE_SELECT':
        return !!currentAnswer.selectedOptionValue;
      case 'MULTI_SELECT':
        return !!currentAnswer.selectedOptionValues && currentAnswer.selectedOptionValues.length > 0;
      case 'RANKED_SELECT':
        return !!currentAnswer.rankedOptions && currentAnswer.rankedOptions.length > 0; // Changed from rankedAnswers
      case 'RANGE_SLIDER':
        return currentAnswer.rangeValue !== undefined && currentAnswer.rangeValue !== null;
      case 'WELCOME':
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (!quizData) return;

    if (currentQuestionIndex < questions.length - 1) {
      setAnimationDirection('next');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answersToSubmit = Object.values(submittedAnswers);
      const answerableQuestionsCount = questions.filter(q => q.type !== 'WELCOME').length;
      if (answersToSubmit.length !== answerableQuestionsCount) {
      }
      
      // Object.values(submittedAnswers) directly provides QuizAnswer[]
      // as handleAnswerChange ensures each answer includes its 'type'.
      const submissionPayload = {
        quizId: quizId,
        userId: "0a4000fe-e860-4710-a14d-1271955ce1b5", // Added userId as per payloads.md (required string)
        answers: answersToSubmit, // Directly use answersToSubmit (which is Object.values(submittedAnswers))
      };

      console.log('Submitting payload to /api/quizzes/attempts:', submissionPayload);
      submitQuizMutation.mutate(
        submissionPayload,
        {
          onSuccess: (data) => {
            console.log('Submission successful, API response:', data);
            if (data.primaryRecommendationId) {
              navigate(`/products/${data.primaryRecommendationId}`);
            } else {
              // Fallback or error handling if primaryRecommendationId is missing
              console.error('Primary recommendation ID missing in API response');
              // Optionally, navigate to a generic error page or show an error message
              // For now, let's navigate to a placeholder or home
              navigate('/'); 
            }
          },
          onError: (error: Error) => {
            console.error('Submission failed:', error);
            // Handle submission error, e.g., show an error message to the user
            // Optionally, navigate to an error page
            // For now, we can log and perhaps navigate to home or show an inline error
            // alert('Quiz submission failed. Please try again.'); // Simple alert for now
          }
        }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setAnimationDirection('previous');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // const handleRestartQuiz = () => {
  //   setCurrentQuestionIndex(0);
  //   setSubmittedAnswers({});
  //   // setShowApiResults(false); // This state is removed
  //   submitQuizMutation.reset();
  //   setAnimationDirection('initial');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

    if (isLoadingQuiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sen bg-gradient-to-br from-slate-50 to-sky-100">
        {/* Consider adding a spinner/loader component here */}
        <p className="text-xl text-slate-700">Loading quiz...</p>
      </div>
    );
  }

  if (quizError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sen bg-gradient-to-br from-slate-50 to-sky-100">
        <HelpCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-xl text-red-700">Error loading quiz: {quizError.message}</p>
        {/* Optionally, add a retry button */}
      </div>
    );
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sen bg-gradient-to-br from-slate-50 to-sky-100">
        <HelpCircle className="h-12 w-12 text-slate-500 mb-4" />
        <p className="text-xl text-slate-700">Quiz not found or has no questions.</p>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen font-sen relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
      <CloudBackground />
      <FloatingBubbles />
      <div className={`container mx-auto px-4 py-8 max-w-4xl relative z-10 ${isMobile ? 'pb-24' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            {quizData.title || 'Vaporizer Finder Quiz'}
          </h1>
          {quizData.description && (
            <p className="text-lg text-slate-700">
              {quizData.description}
            </p>
          )}
        </div>

        <QuizProgressBar
          stepConfig={progressStepConfig}
          currentStepIndex={currentQuestionIndex}
          steps={quizData.questions.map(q => q.id.toString())}
          isMobile={isMobile}
        />

        <AnimatePresence mode="wait" custom={animationDirection}>
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id} // Key for AnimatePresence to correctly handle transitions
              initial={{ opacity: 0, x: animationDirection === 'next' ? 20 : (animationDirection === 'previous' ? -20 : 0) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: animationDirection === 'next' ? -20 : (animationDirection === 'previous' ? 20 : 0) }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8" // Styles from old.tsx
              style={{ minHeight: '500px' }} // Style from old.tsx
            >
              <QuizStepContent
                // key prop is no longer needed here as it's on the parent motion.div for AnimatePresence
                question={currentQuestion}
                onAnswerChange={(answer: Partial<QuizAnswer>) => handleAnswerChange(currentQuestion.id, answer)}
                currentAnswer={submittedAnswers[currentQuestion.id]}
                animationDirection={animationDirection} // This controls internal animations of QuizStepContent
              />
            </motion.div>
          )}
        </AnimatePresence>

        <QuizNavigation
          currentStepIndex={currentQuestionIndex}
          stepsLength={quizData.questions.length}
          canProceed={canProceed}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          isMobile={isMobile}
        />
      </div>
      <Footer />
      {/* Consider re-evaluating SavedResultsModal for API context */}
       {/* <SavedResultsModal
        isOpen={showSavedResults}
        onClose={() => setShowSavedResults(false)}
        onLoadResult={handleLoadResult}
      /> */}
    </div>
  );
};

export default VaporizerQuiz;