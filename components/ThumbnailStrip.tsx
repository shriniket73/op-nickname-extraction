'use client';

import React from 'react';
import Image from 'next/image';

const ThumbnailStrip = () => {
  // Base thumbnails array
  const baseThumbnails = Array.from({ length: 30 }, (_, i) => `thumbnail${i + 1}.jpg`);
  
  // Repeat thumbnails 4 times to ensure screen coverage
  const thumbnails = [...baseThumbnails, ...baseThumbnails, ...baseThumbnails, ...baseThumbnails];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white overflow-hidden">
      {/* Main container with rotation */}
      <div className="absolute -inset-1/4 w-[150%] h-[150%] sm:-inset-0 sm:w-full sm:h-full">
        <div 
          className="w-full h-full flex flex-wrap gap-2 sm:gap-4 opacity-20"
          style={{
            transform: 'rotate(-8deg) scale(1.1)', // Adjusted for smaller devices
          }}
        >
          {thumbnails.map((filename, index) => (
            <div
              key={index}
              className="w-[20vw] h-[15vw] sm:w-48 sm:h-32 relative transition-transform duration-300"
              style={{
                transform: `translateY(${(index % 3) * 10}px)`, // Reduced translation for smaller screens
              }}
            >
              <Image
                src={`/images/thumbnails/${filename}`}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="grayscale"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailStrip;
