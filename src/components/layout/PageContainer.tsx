import React from 'react';
import { CloudBackground } from '../CloudBackground';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: 'max-w-6xl' | 'max-w-7xl' | 'max-w-full';
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, maxWidth = 'max-w-6xl' }) => {
  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      <div className={`container mx-auto px-4 py-8 ${maxWidth} relative z-10`}>
        {children}
      </div>
    </div>
  );
};
