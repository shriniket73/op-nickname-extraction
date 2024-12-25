import React, { useState } from 'react';
import { FrequencyOrderQuestion } from '../types/quiz.types';
import Image from 'next/image';

interface FrequencyOrderProps {
  question: FrequencyOrderQuestion;
  onAnswer: (answer: string[]) => void;
  currentOrder?: string[];
  showingResult?: boolean;
  isCorrect?: boolean;
}

const FrequencyOrder = ({ 
  question, 
  onAnswer, 
  currentOrder = [], 
  showingResult = false,
  isCorrect = false 
}: FrequencyOrderProps) => {
  const profileImages: Record<string, string> = {
    'Rider OP': '/images/profiles/rider-final.png',
    'Writer OP': '/images/profiles/kullu-final.png',
    'Prisoner OP': '/images/profiles/roshan-final.png',
    'Shauhar OP': '/images/profiles/vishal-final.png',
  };

  const [items, setItems] = useState(
    currentOrder.length ? currentOrder : [...question.options]
  );

  const handleDragStart = (e: React.DragEvent, fromIndex: number) => {
    if (showingResult) return;
    e.dataTransfer.setData('text/plain', fromIndex.toString());
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    if (showingResult) return;
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData('text/plain'));
    
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    
    setItems(newItems);
    onAnswer(newItems);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (showingResult) return;
    e.preventDefault();
  };

  const renderProfileList = (itemList: string[], isCorrectOrder: boolean = false) => (
    <div className="flex justify-center gap-4 md:gap-8 mb-2">
      {itemList.map((item, index) => (
        <div
          key={`${item}-${isCorrectOrder ? 'correct' : 'user'}`}
          draggable={!showingResult}
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
          className={`flex flex-col items-center ${!showingResult ? 'cursor-move' : ''}`}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={profileImages[item]}
              alt={item}
              layout="fill" // Ensures the image fills the container
              objectFit="cover" // Maintains aspect ratio
              className={`rounded-full border-2 ${
                showingResult && !isCorrectOrder
                  ? isCorrect
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-[#2D2D2D]'
              }`}
              priority // Optional: Use if images are critical for above-the-fold content
            />
            <div
              className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white text-[#2D2D2D] rounded-full 
                            flex items-center justify-center font-chomiku text-xs
                            border border-[#2D2D2D] shadow-sm"
            >
              {index + 1}
            </div>
          </div>
          <span className="font-chomiku text-sm mt-1 text-center">{item}</span>
        </div>
      ))}
    </div>
  );
  
  
  return (
    <div className="w-full space-y-8">
      <h2 className="font-chomiku text-lg md:text-xl mb-12 text-[#1A1A1A] text-center">
        {question.question}
      </h2>
  
      {showingResult ? (
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="font-chomiku text-base text-center mb-2">Your Answer</p>
            {renderProfileList(items)}
          </div>
          
          {!isCorrect && (
            <div className="space-y-1 pt-4 border-t border-gray-200">
              <p className="font-chomiku text-base text-center mb-2">Correct Order</p>
              {renderProfileList(question.correctOrder, true)}
            </div>
          )}
        </div>
      ) : (
        <>
          {renderProfileList(items)}
          <p className="text-center font-chomiku text-lg text-[#4A4A4A]">
            Drag to arrange from highest to lowest frequency
          </p>
        </>
      )}
    </div>
  );
};

export default FrequencyOrder;