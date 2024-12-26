'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import QuizContainer from '@/components/quiz/QuizContainer';
import Link from 'next/link';
import { useQuizState } from '@/hooks/useQuizState';
import { ArrowUpRight } from 'lucide-react';
import NicknameTable from '@/components/NicknameTable';

// For nerds content as a component
const ForNerdsContent = () => (
  <div className="prose prose-lg max-w-4xl mx-auto">
    <h2 className="font-chomiku text-2xl text-[#1A1A1A] mb-4 text-center">Behind the Scenes: How I Built This</h2>
    <h5 className="flex items-center gap-1 mb-4">
          Refer to the detailerd blog
          <Link 
            href="https://www.shriniket.me/blog/extracting-name-from-youtube" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#1A1A1A] hover:text-[#4A4A4A] transition-colors text-sm md:text-base underline"
          >
            here<ArrowUpRight className="w-4 h-4" />
          </Link>
        </h5>
    
    <div className="space-y-6 text-[#1A1A1A]">
      <section>
        <h3 className="font-chomiku text-xl mb-2">Data Collection & Processing</h3>
        <p>
          Processed 512 YouTube videos using two different transcription models: Whisper and Deepgram. 
          Each video&apos;s transcription was analyzed to extract nicknames using both regex patterns and GPT-based extraction.
        </p>
      </section>

      <section>
        <h3 className="font-chomiku text-xl mb-2">The Pipeline</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Fetch video from yt-dlp and extract first 2 min audio using ffmpeg</li>
          <li>Transcribe the clipped audio using Whisper and Deepgram APIs</li>
          <li>Extract Nickname using regex pattern matching, finding the words ending with &quot;er OP&quot; and prompted GPT-4o to analyse the text to find similar or matching names</li>
          <li>Manual verification and post processing of extracted names</li>
          <li>Quiz generation from validated data</li>
        </ol>
      </section>

      <section>
        <h3 className="font-chomiku text-xl mb-2">Technical Stack</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Next.js for the frontend framework</li>
          <li>TypeScript for type safety</li>
          <li>yt-dlp and ffmpeg for video and audio processing</li>
          <li>Custom data processing scripts for nickname analysis</li>
        </ul>
      </section>
    </div>
  </div>
);

export default function Home() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [activeSection, setActiveSection] = useState('quiz');
  const { quizState } = useQuizState();

  return (
    <div className="max-w-4xl mx-auto bg-transparent">
      <h1 className="text-center font-chomiku text-4xl md:text-6xl mb-8 text-[#1A1A1A]">
        Are you Aktually OP?
      </h1>

      <nav className="flex justify-center space-x-10 mb-8">
        <Button 
          onClick={() => setActiveSection('quiz')}
          variant="ghost"
          size="lg"
          className={`font-chomiku text-xl border-2 border-[#2D2D2D] transition-colors ${
            activeSection === 'quiz' 
              ? 'bg-[#2D2D2D] text-white' 
              : 'text-[#1A1A1A] hover:bg-[#2D2D2D] hover:text-white'
          }`}
        >
          Quiz
        </Button>
        <Button 
          onClick={() => setActiveSection('nicknames')}
          variant="ghost"
          size="lg"
          className={`font-chomiku text-xl border-2 border-[#2D2D2D] transition-colors ${
            activeSection === 'nicknames' 
              ? 'bg-[#2D2D2D] text-white' 
              : 'text-[#1A1A1A] hover:bg-[#2D2D2D] hover:text-white'
          }`}
        >
          Nicknames
        </Button>
        <Button 
          onClick={() => setActiveSection('for-nerds')}
          variant="ghost"
          size="lg"
          className={`font-chomiku text-xl border-2 border-[#2D2D2D] transition-colors ${
            activeSection === 'for-nerds' 
              ? 'bg-[#2D2D2D] text-white' 
              : 'text-[#1A1A1A] hover:bg-[#2D2D2D] hover:text-white'
          }`}
        >
          For Nerds
        </Button>
      </nav>  

      {activeSection === 'quiz' && (
        <div className="quiz-card bg-[#F5F5F5] rounded-xl shadow-lg p-8 text-center space-y-6 max-w-2xl mx-auto">
          {!isQuizStarted && !quizState?.isCompleted ? (
            <div className="text-center">
              <h2 className="font-chomiku text-2xl text-[#1A1A1A] mb-4">Welcome to the Quiz!</h2>
              <p className="mb-8 text-[#4A4A4A] font-chomiku">Test your knowledge of OG Gang nicknames</p>
              <Button 
                onClick={() => setIsQuizStarted(true)}
                variant="ghost"
                size="lg"
                className="font-chomiku text-xl text-[#1A1A1A] border-2 border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-colors"
              >
                Start Quiz
              </Button>
            </div>
          ) : (
            <QuizContainer />
          )}
        </div>
      )}

      {activeSection === 'nicknames' && (
        <NicknameTable />
      )}
      {activeSection === 'for-nerds' && (
      <div className="quiz-card bg-[#F5F5F5] rounded-xl shadow-lg p-8 space-y-6 max-w-2xl mx-auto">
      
      <ForNerdsContent />
      </div>
      )}
    </div>
  );
}