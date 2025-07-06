import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { apiUrl } from '../config'; // Assuming apiUrl is configured

// Zod Schemas based on payloads.md

// Question Option Schemas
export const QuestionOptionRequestSchema = z.object({
  label: z.string(),
  value: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
});

export const QuestionOptionResponseSchema = QuestionOptionRequestSchema.extend({
  id: z.number(),
  questionId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Question Type Enum
export const QuestionTypeEnum = z.enum([
  'WELCOME',
  'SINGLE_SELECT',
  'MULTI_SELECT',
  'RANKED_SELECT',
  'RANGE_SLIDER',
]);

// Question Schemas
export const QuestionRequestSchema = z.object({
  text: z.string(),
  subtitle: z.string().optional(),
  type: QuestionTypeEnum,
  order: z.number(),
  options: z.array(QuestionOptionRequestSchema).optional(),
  maxRank: z.number().optional(),
  rangeMin: z.number().optional(),
  rangeMax: z.number().optional(),
  rangeStep: z.number().optional(),
  rangeDefault: z.number().optional(),
});

export const QuestionResponseSchema = QuestionRequestSchema.extend({
  id: z.number(),
  quizId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  options: z.array(QuestionOptionResponseSchema).optional(), // Override with response schema
});

// Quiz Schemas
export const CreateQuizInputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(QuestionRequestSchema).min(1),
});

export const QuizResponseSchema = CreateQuizInputSchema.extend({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  questions: z.array(QuestionResponseSchema).min(1), // Override with response schema
});

// Quiz Answer Schemas (for submission)
export const RankedAnswerItemSchema = z.object({
  optionValue: z.string(),
  rank: z.number(),
});

export const QuizAnswerSchema = z.object({
  type: QuestionTypeEnum, // Added: as per payloads.md, each answer needs its question type
  questionId: z.number(),
  selectedOptionValue: z.string().optional(), // For SINGLE_SELECT
  selectedOptionValues: z.union([z.array(z.string()), z.string()]).optional(), // For MULTI_SELECT (can be string or string[])
  rankedOptions: z.array(RankedAnswerItemSchema).optional(), // Renamed from rankedAnswers to match payloads.md
  rangeValue: z.number().optional(), // For RANGE_SLIDER
  optionId: z.number().nullable().optional(), // ID of the specific option chosen (e.g., for single-select)
});

export const SubmitQuizAnswersInputSchema = z.object({
  quizId: z.number(), // Added: required quizId
  userId: z.string(), // Changed to required string as per payloads.md
  answers: z.array(QuizAnswerSchema).min(1),
  // rawAnswersJson removed as it's not in payloads.md for this endpoint
});

// Quiz Submission Response Schema (Updated based on actual API response)
export const QuizSubmissionResponseSchema = z.object({
  id: z.number(), // This is the UserQuizAttempt ID
  userId: z.string(),
  quizId: z.number(),
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime(),
  // rawAnswersJson from the API response is an array of the answers as submitted by the client
  rawAnswersJson: z.array(QuizAnswerSchema), 
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  // answers from the API response is an array of detailed answer records with nested question and option data
  answers: z.array(z.any()), // Keeping as z.any() for now due to complexity, not immediately used by frontend after submission for redirection
  primaryRecommendationId: z.string(),
});

// Quiz Attempt Schema (for fetching a specific attempt)
// The QuizSubmissionResponseSchema now accurately represents a Quiz Attempt object from the API.
export const QuizAttemptSchema = QuizSubmissionResponseSchema;

// Type Inference
export type CreateQuizInput = z.infer<typeof CreateQuizInputSchema>;
export type Quiz = z.infer<typeof QuizResponseSchema>;
export type SubmitQuizAnswersInput = z.infer<typeof SubmitQuizAnswersInputSchema>;
export type QuizSubmission = z.infer<typeof QuizSubmissionResponseSchema>;
export type QuizAttempt = z.infer<typeof QuizAttemptSchema>;

// API Fetching Functions

// GET /api/quizzes (Assumed endpoint for listing all quizzes)
const fetchQuizzes = async (): Promise<Quiz[]> => {
  const response = await fetch(`${apiUrl}/api/quizzes`, { credentials: 'include' });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for fetching quizzes: ${errorBody}`);
  }
  return response.json();
};

// GET /api/quizzes/:id
const fetchQuizById = async (id: number | string): Promise<Quiz> => {
  const response = await fetch(`${apiUrl}/api/quizzes/${id}`, { credentials: 'include' });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for fetching quiz ${id}: ${errorBody}`);
  }
  return response.json();
};

// POST /api/quizzes
const createQuiz = async (data: CreateQuizInput): Promise<Quiz> => {
  const validatedData = CreateQuizInputSchema.parse(data);
  const response = await fetch(`${apiUrl}/quizzes`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for creating quiz: ${errorBody}`);
  }
  return response.json();
};

// POST /api/quizzes/attempts (as per payloads.md)
const submitQuizAnswers = async (data: SubmitQuizAnswersInput): Promise<QuizSubmission> => {
  const validatedData = SubmitQuizAnswersInputSchema.parse(data);
  // The quizId is now part of the 'data' object, so the URL doesn't need it explicitly appended like before.
  const response = await fetch(`${apiUrl}/api/quizzes/attempts`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedData),
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for submitting answers to quiz ${data.quizId}: ${errorBody}`);
  }
  return response.json();
};

// GET /api/quiz-attempts/:attemptId
const fetchQuizAttempt = async (attemptId: number | string): Promise<QuizAttempt> => {
  const response = await fetch(`${apiUrl}/quiz-attempts/${attemptId}`, { credentials: 'include' });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Network response was not ok for fetching quiz attempt ${attemptId}: ${errorBody}`);
  }
  return response.json();
};

// React Query Hooks

export const useQuizzes = () => {
  return useQuery<Quiz[], Error>({
    queryKey: ['quizzes'],
    queryFn: fetchQuizzes,
  });
};

export const useQuizById = (id: number | string | undefined) => {
  return useQuery<Quiz, Error>({
    queryKey: ['quiz', id],
    queryFn: () => fetchQuizById(id!),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation<Quiz, Error, CreateQuizInput>({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
};

export const useSubmitQuizAnswers = () => { // quizId is no longer passed here, it's part of the mutation variables
  const queryClient = useQueryClient();
  return useMutation<QuizSubmission, Error, SubmitQuizAnswersInput>({
    mutationFn: submitQuizAnswers, // submitQuizAnswers now takes the whole payload directly
    onSuccess: (data, variables) => {
      // Invalidate attempts for this quiz or specific attempt if needed
      // 'variables' here refers to the input of the mutationFn, which is SubmitQuizAnswersInput
      queryClient.invalidateQueries({ queryKey: ['quizAttempts', variables.quizId] });
      // 'data.id' is the ID of the quiz attempt that was just created/submitted.
      if (data.id) { 
        queryClient.invalidateQueries({ queryKey: ['quizAttempt', data.id] });
      }
    },
  });
};

export const useQuizAttempt = (attemptId: number | string | undefined) => {
  return useQuery<QuizAttempt, Error>({
    queryKey: ['quizAttempt', attemptId],
    queryFn: () => fetchQuizAttempt(attemptId!),
    enabled: !!attemptId, // Only run query if attemptId is provided
  });
};
