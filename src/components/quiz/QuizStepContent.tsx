import React from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { QuestionResponseSchema } from '../../hooks/use-quizzes';
import { RadioGroup } from '../RadioGroup';
import { CheckboxGroup } from '../CheckboxGroup';
import { RangeSlider } from '../RangeSlider';
import { RankOrderList } from '../RankOrderList';
import { educationalContent } from '../../data/quizContent'; // Import educational content

// Define types locally using zod infer
export type QuestionDisplay = z.infer<typeof QuestionResponseSchema>;

// Explicitly define the schema for the 'answer' payload part
const AnswerObjectSchema = z.object({
  selectedOptionValue: z.string().optional(),
  selectedOptionValues: z.array(z.string()).optional(),
  rankedOptions: z.array(z.object({
    optionValue: z.string(),
    rank: z.number(),
  })).optional(),
  rangeValue: z.number().optional(),
});
export type AnswerPayload = z.infer<typeof AnswerObjectSchema>;

interface QuizStepContentProps {
  question: QuestionDisplay;
  currentAnswer: AnswerPayload | undefined;
  onAnswerChange: (answerPayload: Partial<AnswerPayload>) => void;
  animationDirection: 'next' | 'previous' | 'initial';
}

interface EducationalTip {
  title: string;
  content: string;
  bgColor: string;
  textColor: string;
  titleColor: string;
}

const getEducationalContentForQuestion = (
  question: QuestionDisplay,
  currentAnswer: AnswerPayload | undefined
): EducationalTip | null => {
  let topic: keyof typeof educationalContent | null = null;
  let answerValue: string | undefined = currentAnswer?.selectedOptionValue;

  // Placeholder logic to determine topic based on question text
  // This should be refined based on how questions are categorized in your API data
  const questionTextLower = question.text.toLowerCase();
  if (questionTextLower.includes('experience')) {
    topic = 'experience';
  } else if (questionTextLower.includes('how often do you plan to use it')) {
    topic = 'usage';
  } else if (questionTextLower.includes('where will you primarily use it')) {
    topic = 'portability';
  }

  // Handle specific answer value mapping if needed (e.g., 'pocket-size' to 'portable' for tips)
  if (topic === 'portability' && answerValue === 'pocket-size') {
    answerValue = 'portable'; // Use 'portable' tip for 'pocket-size' answers
  }

  if (topic && answerValue && educationalContent[topic] && (educationalContent[topic] as any)[answerValue]) {
    const contentString = (educationalContent[topic] as any)[answerValue];
    return {
      title: "💡 Pro Tip!",
      content: contentString,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      titleColor: "text-blue-800",
    };
  }

  return null;
};

export const QuizStepContent: React.FC<QuizStepContentProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  animationDirection,
}) => {
  const renderStepSpecificContent = () => {
    const { type, text, subtitle, options, rangeMin, rangeMax, rangeStep, rangeDefault } = question;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
            {text}
          </h2>
          {subtitle && (
            <p className="text-black dark:text-gray-300 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {type === 'WELCOME' && (
          <div className="text-center text-gray-700 dark:text-gray-300">
            <p>Click next to begin!</p>
          </div>
        )}

        {type === 'SINGLE_SELECT' && options && (
          <RadioGroup
            options={options.map(opt => ({ 
              label: opt.label, 
              value: opt.value, 
              description: opt.description 
            }))}
            value={currentAnswer?.selectedOptionValue || ''}
            onChange={(value) => onAnswerChange({ selectedOptionValue: value })}
            name={question.id.toString()}
          />
        )}

        {type === 'MULTI_SELECT' && options && (
          <CheckboxGroup
            options={options.map(opt => ({ 
              label: opt.label, 
              value: opt.value, 
              description: opt.description 
            }))}
            selectedValues={currentAnswer?.selectedOptionValues || []}
            onChange={(values) => onAnswerChange({ selectedOptionValues: values })}
            name={question.id.toString()}
          />
        )}

        {type === 'RANKED_SELECT' && options && (
          <RankOrderList
            options={options.map(opt => ({ id: opt.value, content: opt.label }))}
            rankedItems={(
              currentAnswer?.rankedOptions
                ?.slice()
                .sort((a, b) => a.rank - b.rank)
                .map(item => item.optionValue)
            ) || options.map(opt => opt.value)}
            onChange={(newRankedValues) => {
              const newRankedOptions = newRankedValues.map((optionValue, index) => ({
                optionValue,
                rank: index + 1,
              }));
              onAnswerChange({ rankedOptions: newRankedOptions });
            }}
            name={question.id.toString()}
          />
        )}

        {type === 'RANGE_SLIDER' && (
          <RangeSlider
            min={rangeMin ?? 0}
            max={rangeMax ?? 100}
            step={rangeStep ?? 1}
            value={currentAnswer?.rangeValue ?? rangeDefault ?? rangeMin ?? 0}
            onChange={(value) => onAnswerChange({ rangeValue: value })}
            name={question.id.toString()}
            showValue={true}
          />
        )}
      </div>
    );
  };

  const tip = getEducationalContentForQuestion(question, currentAnswer);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: animationDirection === 'next' ? 100 : animationDirection === 'previous' ? -100 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animationDirection === 'next' ? -100 : animationDirection === 'previous' ? 100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex-grow flex flex-col justify-between"
    >
      <div>{renderStepSpecificContent()}</div>
      {tip && (
        <motion.div 
          className={`mt-8 p-6 rounded-xl border border-opacity-20 ${tip.bgColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} // Added exit animation from old.tsx
          transition={{ duration: 0.3 }} // Removed delay from old.tsx
        >
          <h3 className={`font-semibold mb-2 ${tip.titleColor}`}>{tip.title}</h3>
          <p className={tip.textColor}>{tip.content}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
