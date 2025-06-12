import { SavedQuizResult, UserPreferences, QuizResult } from '../types/vaporizer';

const STORAGE_KEY = 'vaporizer-quiz-results';

export const saveQuizResult = (preferences: UserPreferences, result: QuizResult, nickname?: string): string => {
  const savedResult: SavedQuizResult = {
    id: generateId(),
    timestamp: Date.now(),
    preferences,
    result,
    nickname: nickname || `Quiz ${new Date().toLocaleDateString()}`
  };

  const existingResults = getSavedQuizResults();
  const updatedResults = [savedResult, ...existingResults].slice(0, 10); // Keep only last 10 results
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
  return savedResult.id;
};

export const getSavedQuizResults = (): SavedQuizResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading saved quiz results:', error);
    return [];
  }
};

export const getSavedQuizResult = (id: string): SavedQuizResult | null => {
  const results = getSavedQuizResults();
  return results.find(result => result.id === id) || null;
};

export const deleteSavedQuizResult = (id: string): void => {
  const results = getSavedQuizResults();
  const filteredResults = results.filter(result => result.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResults));
};

export const updateQuizResultNickname = (id: string, nickname: string): void => {
  const results = getSavedQuizResults();
  const updatedResults = results.map(result => 
    result.id === id ? { ...result, nickname } : result
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResults));
};

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};