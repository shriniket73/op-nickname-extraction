import React, { useState } from 'react';
import { XCircle, CheckCircle2, X } from 'lucide-react';
import MultipleChoice from '../questions/MultipleChoice';
import FrequencyOrder from '../questions/FrequencyOrder';
import NicknameCount from '../questions/NicknameCount';
import { QuizQuestion, QuizAnswer } from '../types/quiz.types';

interface AnswersModalProps {
  questions: QuizQuestion[];
  answers: Record<number, QuizAnswer>;
  onClose: () => void;
}

const AnswersModal = ({ questions, answers, onClose }: AnswersModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = questions[currentIndex];
    const currentAnswer = answers[currentQuestion.id];
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
  
    const renderQuestionResult = (question: QuizQuestion, answer: QuizAnswer) => {
      const props = {
        question,
        onAnswer: () => {},
        selectedAnswer: answer?.answer,
        showingResult: true,
        isCorrect: answer?.isCorrect
      };
  
      switch (question.type) {
        case 'nickname-choice':
        case 'character-nickname':
          return <MultipleChoice {...props} />;
        case 'frequency-order':
          return <FrequencyOrder 
            question={question}
            onAnswer={() => {}}
            currentOrder={answer?.answer as string[]}
            showingResult={true}
            isCorrect={answer?.isCorrect}
          />;
        case 'nickname-count':
          return <NicknameCount 
            question={question}
            onAnswer={() => {}}
            currentValue={answer?.answer as [number, number]}
            showingResult={true}
            isCorrect={answer?.isCorrect}
          />;
        default:
          return null;
      }
    };
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F5F5F5] rounded-xl shadow-lg w-[calc(100%-2rem)] max-w-2xl relative">
            <div className="p-4 md:p-6">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
      
              {/* Score Summary */}
              <div className="text-center mb-3">
                <div className="font-chomiku text-lg md:text-xl text-[#1A1A1A]">
                  Your Score: <span className="text-xl md:text-2xl">{correctAnswers}</span>/5
                </div>
              </div>
      
              {/* Question Counter */}
              <div className="flex items-center gap-2 mb-4">
                {currentAnswer?.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                )}
                <span className="font-chomiku text-sm md:text-base">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>
      
              {/* Content area - with height constraint */}
              <div className="px-1 md:px-4 min-h-[350px] md:min-h-[400px] flex items-center">
                <div className="w-full">
                  {renderQuestionResult(currentQuestion, currentAnswer)}
                </div>
              </div>
            </div>
      
            {/* Navigation arrows */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className={`pointer-events-auto p-2 md:p-4 font-chomiku text-2xl md:text-3xl
                         text-[#2D2D2D] disabled:text-[#4A4A4A] disabled:opacity-50 disabled:cursor-not-allowed
                         hover:text-[#1A1A1A] transition-colors z-20`}
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIndex === questions.length - 1}
                className={`pointer-events-auto p-2 md:p-4 font-chomiku text-2xl md:text-3xl
                         text-[#2D2D2D] disabled:text-[#4A4A4A] disabled:opacity-50 disabled:cursor-not-allowed
                         hover:text-[#1A1A1A] transition-colors z-20`}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      );
  };

export default AnswersModal;