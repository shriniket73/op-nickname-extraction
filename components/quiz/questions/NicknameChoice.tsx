import React from 'react';
import { NicknameChoiceQuestion } from '../types/quiz.types';

interface NicknameChoiceProps {
  question: NicknameChoiceQuestion;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

const NicknameChoice = ({ question, onAnswer, selectedAnswer }: NicknameChoiceProps) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full space-y-8">
      <h2 className="font-chomiku text-2xl text-[#1A1A1A] text-center">
        {question.question}
      </h2>

      <div className="flex flex-col items-center space-y-4">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className={`group flex items-center space-x-4 px-6 py-3 transition-all duration-200 
              ${selectedAnswer === option 
                ? 'bg-[#2D2D2D] text-white rounded-full' 
                : 'hover:border-2 hover:border-[#2D2D2D] hover:rounded-full'
              }`}
          >
            <span className={`font-chomiku text-lg w-8 h-8 flex items-center justify-center rounded-full 
              ${selectedAnswer === option 
                ? 'bg-white text-[#2D2D2D]' 
                : 'bg-[#2D2D2D] text-white'
              }`}>
              {optionLetters[index]}
            </span>
            <span className="font-chomiku text-lg">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NicknameChoice;