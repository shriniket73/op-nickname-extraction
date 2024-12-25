import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { NicknameCountQuestion } from '../types/quiz.types';

interface NicknameCountProps {
  question: NicknameCountQuestion;
  onAnswer: (answer: [number, number]) => void;
  currentValue?: [number, number];
  showingResult?: boolean;
  isCorrect?: boolean;
}

const NicknameCount = ({
  question,
  onAnswer,
  currentValue,
  showingResult,
  isCorrect
}: NicknameCountProps) => {
  const FIXED_INTERVAL = 10;
  const defaultValue: [number, number] = currentValue || [
    Math.floor(question.min / 10) * 10,
    Math.floor(question.min / 10) * 10 + FIXED_INTERVAL
  ];

  const [range, setRange] = React.useState<[number, number]>(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    const lowerBound = Math.round(newValue[0] / 10) * 10;
    const upperBound = lowerBound + FIXED_INTERVAL;
    
    if (upperBound <= question.max) {
      setRange([lowerBound, upperBound]);
      onAnswer([lowerBound, upperBound]);
    }
  };

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <h2 className="font-chomiku text-xl md:text-2xl text-[#1A1A1A] text-center">
        {question.question}
      </h2>
      
      <div className="space-y-8 md:space-y-12 px-4 md:px-8">
        <div className="relative pt-6">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[range[0]]}
            onValueChange={handleValueChange}
            min={question.min}
            max={question.max - FIXED_INTERVAL}
            step={10}
            disabled={showingResult}
          >
            <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-[#2D2D2D] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[#2D2D2D] rounded-full hover:border-[#1A1A1A] focus:outline-none"
              aria-label="Range slider"
            />
          </Slider.Root>
        </div>
        
        <div className="text-center">
          <span className="font-chomiku text-2xl md:text-4xl text-[#1A1A1A]">
            {range[0]} - {range[1]}
          </span>
          <span className="font-chomiku text-base md:text-lg ml-2 text-[#4A4A4A]">
            nicknames
          </span>
        </div>

        {showingResult && (
          <div className={`text-center font-chomiku text-base md:text-lg ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}>
            {isCorrect 
              ? 'Correct! The answer falls within your range.'
              : `The correct answer was ${question.correctAnswer} nicknames.`
            }
          </div>
        )}
      </div>

      {showingResult && (
        <p className="font-chomiku text-sm md:text-base text-[#4A4A4A] text-center px-2">
          {question.description}
        </p>
      )}
    </div>
  );
};

export default NicknameCount;