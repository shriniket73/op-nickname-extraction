import React from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';

export const Disclaimer = () => (
  <div className="mt-8 p-4 border border-gray-200 rounded-lg text-sm text-gray-600">
    <p className="mb-4">
      This quiz is created for entertainment purposes only. The data is collected from YouTube and run through Sppech-to-text models 
      and may not be 100% accurate. Please enjoy it in the spirit of fun!
    </p>
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
      <Link 
        href="https://github.com/yourusername/og-gang-quiz" 
        className="flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors"
      >
        <Github className="w-4 h-4" />
        View on GitHub
      </Link>
      <Link 
        href="https://shriniket.me" 
        className="text-purple-900 hover:text-purple-700 transition-colors"
      >
        Made by Shriniket🔗
      </Link>
    </div>
  </div>
);
export default Disclaimer;