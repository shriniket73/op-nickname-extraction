import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import ThumbnailStrip from '@/components/ThumbnailStrip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Are you Aktually OP?',
  description: 'Test your knowledge of Tanmay Bhat video nicknames!',
  authors: [{ name: 'OG Gang' }],
  keywords: ['Tanmay Bhat', 'Quiz', 'OG Gang', 'Nicknames', 'YouTube'],
  openGraph: {
    title: 'Are you Aktually OP?',
    description: 'Test your knowledge of Tanmay Bhat video nicknames!',
    type: 'website',
    locale: 'en_US',
    siteName: 'OG Gang Quiz',
  },
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen`}>
        {/* Background ThumbnailStrip */}
        <div className="fixed inset-0 z-[-1]">
          <ThumbnailStrip />
        </div>
        {/* Main Content */}
        <main className="relative z-[1] container mx-auto min-h-screen p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
