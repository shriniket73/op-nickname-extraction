import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/custom-progress'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MultipleChoice from './questions/MultipleChoice';
import FrequencyOrder from './questions/FrequencyOrder';
import NicknameCount from './questions/NicknameCount';
import QuizResults from './results/QuizResults';
import QuizLoading from './results/QuizLoading';
import { quizQuestions } from './data/questions';
import { QuizQuestion, QuizAnswer } from './types/quiz.types';
import { useQuizState } from '@/hooks/useQuizState';

const QuizContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { quizState, saveQuizResults, clearQuizResults } = useQuizState();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  React.useEffect(() => {
    if (quizState?.isCompleted) {
      setAnswers(quizState.answers);
      setShowResults(true);
    }
  }, [quizState]);

  const renderQuestion = (question: QuizQuestion) => {
    const currentAnswer = answers[question.id]?.answer;

    switch (question.type) {
        case 'nickname-choice':
        case 'character-nickname':
          return (
            <MultipleChoice
              question={question}
              onAnswer={handleAnswer}
              selectedAnswer={currentAnswer as string}
              showingResult={showResults}
              isCorrect={answers[question.id]?.isCorrect}
            />
          );
              case 'frequency-order':
                return (
                  <FrequencyOrder
                    question={question}
                    onAnswer={handleAnswer}
                    currentOrder={currentAnswer as string[]}
                    showingResult={showResults}
                    isCorrect={answers[question.id]?.isCorrect}
                  />
                );
        case 'nickname-count':
            return (
              <NicknameCount
                question={question}
                onAnswer={handleAnswer}
                currentValue={currentAnswer as [number, number]}
                showingResult={showResults}
                isCorrect={answers[question.id]?.isCorrect}
              />
            );
    }
  };

  const handleAnswer = (answer: string | number | [number, number] | string[]) => {
    let isCorrect = false;
    
    switch (currentQuestion.type) {
      case 'nickname-count':
        // For range slider, check if correct answer falls within the selected range
        const range = answer as [number, number];
        isCorrect = currentQuestion.correctAnswer >= range[0] && 
                    currentQuestion.correctAnswer <= range[1];
        break;
      case 'frequency-order':
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentQuestion.correctOrder);
        break;
      default:
        isCorrect = answer === currentQuestion.correctAnswer;
    }
  
    setAnswers({
      ...answers,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        answer,
        isCorrect
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSubmitting(true);
      saveQuizResults(answers, quizQuestions);
      // No need for setTimeout here as the loading component will handle its own timing
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const hasCurrentAnswer = answers[currentQuestion.id]?.answer !== undefined;

  if (isSubmitting) {
    return <QuizLoading onComplete={() => {
      setIsSubmitting(false);
      setShowResults(true);
    }} />;
  }

  if (showResults) {
    return (
      <QuizResults 
        answers={answers} 
        questions={quizQuestions} 
        onRestartQuiz={() => {
          clearQuizResults(); // Add this line
          setCurrentQuestionIndex(0);
          setAnswers({});
          setShowResults(false);
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <Progress 
        value={progress} 
        className="h-1.5 bg-gray-100" 
      />
      
      {/* Question */}
      <div className="min-h-[300px]">
        {renderQuestion(currentQuestion)}
      </div>
      
      {/* Navigation */}
      {/* Navigation */}
<div className="flex justify-between pt-4">
  {currentQuestionIndex > 0 && (
    <Button
      onClick={handlePrevious}
      variant="ghost"
      className="font-chomiku text-lg text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-50"
    >
      <ChevronLeft className="w-4 h-4 mr-2" />
      Previous
    </Button>
  )}
  
  {/* This empty div ensures Next button stays right-aligned when Previous is hidden */}
  {currentQuestionIndex === 0 && <div></div>}

  <Button
    onClick={handleNext}
    disabled={!hasCurrentAnswer}
    variant="ghost"
    className="font-chomiku text-lg text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-50"
  >
    {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
    {currentQuestionIndex !== quizQuestions.length - 1 && (
      <ChevronRight className="w-4 h-4 ml-2" />
    )}
  </Button>
</div>
    </div>
  );
};

export default QuizContainer;