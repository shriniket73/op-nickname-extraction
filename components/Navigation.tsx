// components/Navigation.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center space-x-8 mb-8">
      <Link 
        href="/" 
        className={`font-chomiku text-lg ${
          pathname === '/' 
            ? 'text-[#1A1A1A]' 
            : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
        } transition-colors`}
      >
        Quiz
      </Link>
      <Link 
        href="/for-nerds" 
        className={`font-chomiku text-lg ${
          pathname === '/for-nerds' 
            ? 'text-[#1A1A1A]' 
            : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
        } transition-colors`}
      >
        For Nerds
      </Link>
    </nav>
  );
};

export default Navigation;