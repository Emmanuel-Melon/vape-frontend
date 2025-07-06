import React from 'react';
import { CloudBackground } from './CloudBackground';
import { Footer } from './Footer';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, maxWidth = 'max-w-7xl' }) => {
  return (
    <div className="min-h-screen font-sen relative overflow-hidden bg-white">
      <CloudBackground />
      <main className={`container mx-auto px-4 py-8 ${maxWidth} relative z-10`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
