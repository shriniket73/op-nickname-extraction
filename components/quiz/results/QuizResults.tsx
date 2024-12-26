/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Copy, Share2, CheckCircle2, XCircle,MessageCircle,Instagram,Github } from 'lucide-react';
import Link from 'next/link';
import { QuizQuestion, QuizAnswer } from '../types/quiz.types';
import MultipleChoice from '../questions/MultipleChoice';
import FrequencyOrder from '../questions/FrequencyOrder';
import NicknameCount from '../questions/NicknameCount';
import AnswersModal from './AnswersModal';

interface QuizResultsProps {
  answers: Record<number, QuizAnswer>;
  questions: QuizQuestion[];
  onRestartQuiz: () => void;
}

const getFanLevel = (score: number) => {
  if (score === 5) return {
    title: "Ultimate OG Gang Member! 🐐",
    message: "You're officially certified OP!"
  };
  if (score === 4) return {
    title: "Almost OP! 🔥",
    message: "Just one step away from achieving peak OG status!"
  };
  if (score === 3) return {
    title: "Rising Star! ⭐",
    message: "You're getting there! Keep watching those reactions!"
  };
  if (score === 2) return {
    title: "Upcoming Fan! 📈",
    message: "Time to binge-watch more Tanmay videos!"
  };
  return {
    title: "New to the Gang! 🌱",
    message: "Welcome to the beginning of your OG journey!"
  };
};

const ShareButton = ({ platform, onClick }: { platform: string; onClick: () => void }) => {
    const icons = {
      twitter: <Twitter className="w-5 h-5" />,
      facebook: <Facebook className="w-5 h-5" />,
      instagram: <Instagram className="w-5 h-5" />,
      whatsapp: <MessageCircle className="w-5 h-5" />,
      copy: <Copy className="w-5 h-5" />
    };
  
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full hover:bg-gray-100"
        onClick={onClick}
      >
        {icons[platform as keyof typeof icons]}
      </Button>
    );
  };


  const ScoreCard = ({ 
    score, 
    total, 
    fanLevel, 
    onSeeAnswers, 
    onTryAgain 
  }: { 
    score: number;
    total: number;
    fanLevel: { title: string; message: string };
    onSeeAnswers: () => void;
    onTryAgain: () => void;
  }) => {
    const handleShare = (platform: string) => {
        const text = `I scored ${score}/${total} in the OG Gang Quiz! ${fanLevel.title}`;
        const url = typeof window !== 'undefined' ? window.location.href : '';
      
        const shareUrls = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
          instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
          whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
          copy: url
        };
      
        if (platform === 'copy' && typeof navigator !== 'undefined') {
          navigator.clipboard.writeText(text + ' ' + url);
          return;
        }
      
        const shareUrl = shareUrls[platform as keyof typeof shareUrls];
        if (shareUrl && typeof window !== 'undefined') {
          const windowFeatures = 'width=600,height=400,left=350,top=100,noopener,noreferrer';
          window.open(shareUrl, '_blank', windowFeatures);
        }
      };
  
      return (
        <div className="bg-[#F5F5F5] rounded-xl shadow-lg p-4 md:p-8 w-full max-w-2xl mx-auto space-y-6 md:space-y-8">
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="font-chomiku text-2xl md:text-3xl text-[#1A1A1A] px-2">
              {fanLevel.title}
            </h2>
            <div className="text-4xl md:text-6xl font-chomiku text-[#1A1A1A]">
              {score}/{total}
            </div>
            <p className="font-chomiku text-lg md:text-xl text-[#4A4A4A] px-2">
              {fanLevel.message}
            </p>
          </div>
    
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <Button 
              variant="ghost" 
              size="lg"
              className="font-chomiku text-lg md:text-xl text-[#1A1A1A] border-2 border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-colors w-44 md:w-48"
              onClick={onSeeAnswers}
            >
              See Answers
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="font-chomiku text-lg md:text-xl text-[#1A1A1A] border-2 border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-colors w-44 md:w-48"
              onClick={onTryAgain}
            >
              Try Again
            </Button>
          </div>
    
          <div className="pt-4 md:pt-6 border-t">
            <p className="text-center font-chomiku text-sm md:text-base text-[#4A4A4A] mb-3 md:mb-4">
              Share your score
            </p>
            <div className="flex justify-center gap-2 md:gap-4">
              <ShareButton platform="twitter" onClick={() => handleShare('twitter')} />
              <ShareButton platform="facebook" onClick={() => handleShare('facebook')} />
              <ShareButton platform="instagram" onClick={() => handleShare('instagram')} />
              <ShareButton platform="whatsapp" onClick={() => handleShare('whatsapp')} />
              <ShareButton platform="copy" onClick={() => handleShare('copy')} />
            </div>
          </div>
    
          {/* Disclaimer Section */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t">
            <p className="mb-4 text-center font-chomiku text-[#1A1A1A] text-sm md:text-base px-2">
            This quiz is created for entertainment purposes only. The data is collected from YouTube and run through Sppech-to-text models 
            and may not be 100% accurate. Please enjoy it in the spirit of fun!
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-2 md:gap-0">
              <Link 
                href="https://github.com/shriniket73/op-nickname-extraction" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#4A4A4A] transition-colors underline font-chomiku text-sm md:text-base"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </Link>
              <Link 
                href="https://shriniket.me" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] hover:text-[#4A4A4A] transition-colors font-chomiku text-sm md:text-base underline"
              >
                Made by Shriniket
              </Link>
            </div>
          </div>
        </div>
      );
    };


// Update the QuizResults component:
const QuizResults = ({ answers, questions, onRestartQuiz }: QuizResultsProps) => {
    const [showingDetails, setShowingDetails] = useState(false);
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const fanLevel = getFanLevel(correctAnswers);
  
    return (
      <div className="w-full max-w-2xl mx-auto">
        <ScoreCard
          score={correctAnswers}
          total={questions.length}
          fanLevel={fanLevel}
          onSeeAnswers={() => setShowingDetails(true)}
          onTryAgain={onRestartQuiz}
        />
        
        {showingDetails && (
          <AnswersModal
            questions={questions}
            answers={answers}
            onClose={() => setShowingDetails(false)}
          />
        )}
      </div>
    );
  };

export default QuizResults;