import React, { useState, useRef } from 'react';
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

  const draggedIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (showingResult) return;
    draggedIndex.current = index;
    e.dataTransfer.setData('text/plain', index.toString());
    
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    if (showingResult) return;
    dragOverIndex.current = index;

    const itemsCopy = [...items];
    const draggedItem = itemsCopy[draggedIndex.current!];
    
    // Remove item from its original position
    itemsCopy.splice(draggedIndex.current!, 1);
    // Insert it at the new position
    itemsCopy.splice(dragOverIndex.current, 0, draggedItem);

    draggedIndex.current = index;
    setItems(itemsCopy);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (showingResult) return;
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (showingResult) return;
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    onAnswer(items);
    draggedIndex.current = null;
    dragOverIndex.current = null;
  };

  // Mobile touch handling
  const touchStartIndex = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const dragElement = useRef<HTMLDivElement | null>(null);
  const initialY = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (showingResult) return;
    touchStartIndex.current = index;
    touchStartTime.current = Date.now();
    initialY.current = e.touches[0].clientY;
    dragElement.current = e.currentTarget as HTMLDivElement;
  };

  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    if (showingResult || !isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const profileElement = elements.find(el => el.hasAttribute('data-profile-index'));
    
    if (profileElement) {
      const newIndex = Number(profileElement.getAttribute('data-profile-index'));
      if (newIndex !== touchStartIndex.current && newIndex >= 0 && newIndex < items.length) {
        const newItems = [...items];
        const [draggedItem] = newItems.splice(touchStartIndex.current!, 1);
        newItems.splice(newIndex, 0, draggedItem);
        setItems(newItems);
        touchStartIndex.current = newIndex;
      }
    }

    if (dragElement.current) {
      const deltaY = touch.clientY - initialY.current;
      dragElement.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (showingResult) return;
    setIsDragging(false);
    if (dragElement.current) {
      dragElement.current.style.transform = '';
      dragElement.current.style.zIndex = '';
    }
    onAnswer(items);
    touchStartIndex.current = null;
    dragElement.current = null;
  };

  const renderProfileList = (itemList: string[], isCorrectOrder: boolean = false) => (
    <div className="flex justify-center gap-4 md:gap-8 mb-2">
      {itemList.map((item, index) => (
        <div
          key={`${item}-${isCorrectOrder ? 'correct' : 'user'}`}
          data-profile-index={index}
          draggable={!showingResult && !isCorrectOrder}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onTouchStart={(e) => {
            handleTouchStart(e, index);
            // Start dragging after a short hold
            setTimeout(() => {
              if (touchStartIndex.current === index) {
                setIsDragging(true);
                if (dragElement.current) {
                  dragElement.current.style.zIndex = '10';
                }
              }
            }, 200);
          }}
          onTouchMove={(e) => handleTouchMove(e, index)}
          onTouchEnd={handleTouchEnd}
          className={`flex flex-col items-center transition-transform 
            ${!showingResult && !isCorrectOrder ? 'cursor-move touch-none select-none' : ''}`}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Image
              src={profileImages[item]}
              alt={item}
              layout="fill"
              objectFit="cover"
              className={`rounded-full border-2 transition-transform ${
                showingResult && !isCorrectOrder
                  ? isCorrect
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-[#2D2D2D]'
              }`}
              priority
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