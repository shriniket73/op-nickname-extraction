// types/quiz.types.ts

export type QuestionType = 'nickname-choice' | 'frequency-order' | 'character-nickname' | 'nickname-count';

export interface BaseQuestion {
  id: number;
  type: QuestionType;
  question: string;
  description: string;
  videoLink?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'nickname-choice' | 'character-nickname';
  options: string[];
  correctAnswer: string;
}

export interface FrequencyOrderQuestion extends BaseQuestion {
  type: 'frequency-order';
  options: string[];
  correctOrder: string[];
}

export interface NicknameCountQuestion extends BaseQuestion {
  type: 'nickname-count';
  min: number;
  max: number;
  correctAnswer: number;
  tolerance: number;
}

export type QuizQuestion = 
  | MultipleChoiceQuestion 
  | FrequencyOrderQuestion 
  | NicknameCountQuestion;

export interface QuizAnswer {
  questionId: number;
  answer: string | number | string[] | [number, number];
  isCorrect: boolean;
}