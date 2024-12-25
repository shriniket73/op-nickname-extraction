// app/themes/page.tsx
'use client';

import ThemePlayground from '@/components/ThemePlayground';

export default function ThemesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-chomiku mb-8 text-center">Theme Options</h1>
      <ThemePlayground />
    </div>
  );
}