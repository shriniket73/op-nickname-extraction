import React from 'react';
import { NicknameChoiceQuestion } from '../types/quiz.types';

interface CharacterNicknameProps {
  question: NicknameChoiceQuestion;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
  showingResult?: boolean;
  isCorrect?: boolean;
}

const CharacterNickname = ({ 
  question, 
  onAnswer, 
  selectedAnswer,
  showingResult,
  isCorrect 
}: CharacterNicknameProps) => {
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="w-full space-y-8">
      <h2 className="font-chomiku text-2xl text-[#1A1A1A] text-center">
        {question.question}
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = showingResult && option === question.correctAnswer;
          
          return (
            <button
              key={option}
              onClick={() => !showingResult && onAnswer(option)}
              disabled={showingResult}
              className={`group flex items-center space-x-4 px-6 py-3 transition-all mx-auto
                ${isSelected && showingResult 
                  ? isCorrect 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-red-50 text-red-700'
                  : isSelected 
                    ? 'bg-[#2D2D2D] text-white' 
                    : ''
                }
                ${!showingResult && !isSelected 
                  ? 'hover:border-2 hover:border-[#2D2D2D] hover:rounded-full' 
                  : isCorrectOption && !isSelected
                    ? 'border-2 border-green-500 rounded-full'
                    : ''
                }
              `}
            >
              <span className={`font-chomiku text-lg w-8 h-8 flex items-center justify-center rounded-full 
                ${isSelected 
                  ? showingResult
                    ? isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    : 'bg-white text-[#2D2D2D]'
                  : 'bg-[#2D2D2D] text-white'
                }`}>
                {optionLetters[index]}
              </span>
              <span className="font-chomiku text-lg whitespace-nowrap">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {showingResult && (
        <p className="font-chomiku text-base text-[#4A4A4A] text-center mt-6">
          {question.description}
        </p>
      )}
    </div>
  );
};

export default CharacterNickname;