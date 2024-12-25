// First, let's create a hook to manage quiz state - hooks/useQuizState.ts

import { useState, useEffect } from 'react';
import { QuizAnswer, QuizQuestion } from '@/components/quiz/types/quiz.types';

interface QuizState {
  isCompleted: boolean;
  answers: Record<number, QuizAnswer>;
  questions: QuizQuestion[];
}

export const useQuizState = () => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved state on mount
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      setQuizState(JSON.parse(savedState));
    }
    setIsLoading(false);
  }, []);

  const saveQuizResults = (answers: Record<number, QuizAnswer>, questions: QuizQuestion[]) => {
    const newState = {
      isCompleted: true,
      answers,
      questions
    };
    localStorage.setItem('quizState', JSON.stringify(newState));
    setQuizState(newState);
  };

  const clearQuizResults = () => {
    localStorage.removeItem('quizState');
    setQuizState(null);
  };

  return {
    quizState,
    isLoading,
    saveQuizResults,
    clearQuizResults
  };
};