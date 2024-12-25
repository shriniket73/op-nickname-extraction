import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const funnyMessages = [
  "Consulting with OG Gang members...",
  "Checking your OP level...",
  "Aktually analyzing your answers...",
  "Running quantum calculations..."
];

const QuizLoading = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([0]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Show a new message every 1 second
    funnyMessages.forEach((_, index) => {
      if (index > 0) {
        timeout = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, index]);
        }, index * 1000);
      }
    });

    // Complete after showing all messages + 1 second
    timeout = setTimeout(onComplete, (funnyMessages.length * 1000) + 1000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#F5F5F5] flex items-center justify-center z-50">
      <div className="text-center space-y-8 p-8 max-w-md">
        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-white flex items-center justify-center shadow-lg">
          <Image
            src="/images/tanmay-end.gif"
            alt="Loading"
            width={192} // Matches w-48 (48 * 4 = 192px)
            height={192} // Matches h-48 (48 * 4 = 192px)
            objectFit="cover" // Ensures the GIF maintains aspect ratio
          />
        </div>
        <div className="space-y-4">
          {funnyMessages.map((message, index) => (
            <p
              key={message}
              className={`font-chomiku text-xl text-[#1A1A1A] transition-opacity duration-500 ${
                visibleMessages.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizLoading;
