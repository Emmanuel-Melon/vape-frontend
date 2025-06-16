import { QuestionResponseSchema, QuestionTypeEnum, QuizResponseSchema } from '../hooks/use-quizzes';
import { z } from 'zod';

// Infer the type for a single question and the whole quiz response
export type QuestionDisplay = z.infer<typeof QuestionResponseSchema>;
export type StaticQuizData = z.infer<typeof QuizResponseSchema>;

export const staticQuizData: StaticQuizData = {
  id: 1, // Default quiz ID for submission
  title: 'Vaporizer Finder Quiz (Static)',
  description: 'Find your perfect vaporizer by answering a few questions.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  questions: [
    {
      id: 101,
      quizId: 1,
      text: "What's your experience with vaporizers?",
      subtitle: 'This helps us recommend the right complexity level for you.',
      type: QuestionTypeEnum.enum.SINGLE_SELECT,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [
        { id: 201, questionId: 101, label: 'Novice (New to vaping)', value: 'novice', order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 202, questionId: 101, label: 'Intermediate (Used a few times)', value: 'intermediate', order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 203, questionId: 101, label: 'Experienced (Vape enthusiast)', value: 'experienced', order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
    },
    {
      id: 102,
      quizId: 1,
      text: 'How often do you plan to use it?',
      subtitle: 'Usage frequency affects battery life and durability needs.',
      type: QuestionTypeEnum.enum.SINGLE_SELECT,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [
        { id: 204, questionId: 102, label: 'Daily', value: 'daily', order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 205, questionId: 102, label: 'A few times a week (Casual)', value: 'casual', order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 206, questionId: 102, label: 'Multiple times a day (Heavy)', value: 'heavy', order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
    },
    {
      id: 103,
      quizId: 1,
      text: 'Where will you primarily use it?',
      subtitle: 'Location determines whether you need portable or desktop power.',
      type: QuestionTypeEnum.enum.SINGLE_SELECT,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [
        { id: 207, questionId: 103, label: 'Mostly at home (Desktop might be an option)', value: 'desktop', order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 208, questionId: 103, label: 'On the go (Portable is key)', value: 'portable', order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 209, questionId: 103, label: 'No preference / Both', value: 'no-preference', order: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
    },
    {
      id: 104,
      quizId: 1,
      text: "What's your budget?",
      subtitle: "We'll find the best value within your price range.",
      type: QuestionTypeEnum.enum.RANGE_SLIDER,
      order: 4,
      rangeMin: 50,
      rangeMax: 800,
      rangeStep: 10,
      rangeDefault: 200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [], // Range sliders typically don't have options in this schema
    },
    // Placeholder for a simplified priorities question
    {
      id: 105,
      quizId: 1,
      text: 'How important is vapor potency to you?',
      subtitle: 'Rate on a scale of 1 (Not important) to 10 (Very important).',
      type: QuestionTypeEnum.enum.RANGE_SLIDER,
      order: 5,
      rangeMin: 1,
      rangeMax: 10,
      rangeStep: 1,
      rangeDefault: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      options: [],
    },
  ],
};
