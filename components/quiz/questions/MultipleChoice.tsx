import React from 'react';

interface MultipleChoiceProps {
  question: {
    question: string;
    options: string[];
    correctAnswer: string;
    description: string;
    videoLink?: string;
  };
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
  showingResult?: boolean;
  isCorrect?: boolean;
}

const MultipleChoice = ({
    question,
    onAnswer,
    selectedAnswer,
    showingResult,
    isCorrect
  }: MultipleChoiceProps) => {
    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  
    return (
      <div className="w-full space-y-6">
        <h2 className="font-chomiku text-xl md:text-2xl mb-12 text-[#1A1A1A] text-center">
          {question.question}
        </h2>
  
        <div className="grid grid-cols-2 gap-3 w-full max-w-2xl mx-auto">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            
            return (
              <button
                key={option}
                onClick={() => !showingResult && onAnswer(option)}
                disabled={showingResult}
                className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-3 transition-all duration-200
                  rounded-full border-2 ${
                    showingResult
                      ? 'border-transparent'
                      : isSelected
                        ? 'border-[#2D2D2D]'
                        : 'border-transparent hover:border-[#2D2D2D]'
                  }`}
              >
                <span className={`font-chomiku text-base md:text-lg w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full
                  ${isSelected ? 'bg-[#2D2D2D] text-white' : 'bg-gray-100'}`}
                >
                  {optionLetters[index]}
                </span>
                <span className={`font-chomiku text-sm md:text-lg text-left flex-1 ${
                  showingResult
                    ? isCorrectOption
                      ? 'text-green-600'
                      : isSelected && !isCorrect
                        ? 'text-red-600'
                        : 'text-[#1A1A1A]'
                    : 'text-[#1A1A1A]'
                }`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
  
        {showingResult && (
          <div className="text-center space-y-2">
            <p className="font-chomiku text-sm md:text-base text-[#1A1A1A]">
              {question.description}
            </p>
            {question.videoLink && (
              <a 
                href={question.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-chomiku text-sm md:text-base text-[#1A1A1A] hover:underline inline-block"
              >
                Watch Video →
              </a>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default MultipleChoice;