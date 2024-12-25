// src/components/quiz/data/questions.ts

import { QuizQuestion } from '../types/quiz.types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'nickname-choice',
    question: 'Which of these nicknames has never appeared in Tanmay\'s reactions?',
    options: [
      'Rider OP',
      'Gamer OP',
      'Amplifier OP',
      'Teacher OP'
    ],
    correctAnswer: 'Teacher OP',
    description: 'Teacher OP is still available'
  },
  {
    id: 2,
    type: 'frequency-order',
    question: 'Arrange these nicknames in order of their appearance frequency (most to least)',
    options: ['Writer OP', 'Prisoner OP', 'Rider OP', 'Shauhar OP'],
    correctOrder: ['Rider OP', 'Writer OP', 'Shauhar OP', 'Prisoner OP'],
    description: 'Fun Fact - Writer OP and Prisoner OP have appeared almost the same number of times in Tanmay reacts'
  },
  {
    id: 3,
    type: 'character-nickname',
    question: 'What is Vishal Dayama\'s OP name?',
    options: [
      'Husband OP',
      'Shauhar OP',
      'Provider OP',
      'Advertiser OP',
      'Aktually'
    ],
    correctAnswer: 'Aktually',
    description: 'Aktually he was introduced as Advertiser OP and then post shaadi it changed to Shauhar OP',
    videoLink: 'https://www.youtube.com/watch?v=51opUJ7Y47E'
  },
  {
    id: 4,
    type: 'character-nickname',
    question: 'What is Rohan Joshi\'s OP name?',
    options: [
      'Rider OP',
      'Prisoner OP',
      'Streamer OP',
      'Brother OP',
      'Aktually'
    ],
    correctAnswer: 'Aktually',
    description: 'Aktually he was introduced as Brother OP and then post covid it got changed to Prisoner OP',
    videoLink: 'https://www.youtube.com/watch?v=4LWg4LCmdWM'
  },
  {
    id: 5,
    type: 'nickname-count',
    question: 'How many unique OP nicknames have been used across all videos?',
    min: 0,
    max: 100,
    correctAnswer: 81,
    tolerance: 10,
    description: 'Based on our analysis of all videos, there are 81 unique nicknames used across all videos.'
  }
];