import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from './layout/PageContainer';
import { SectionHeader } from './layout/SectionHeader';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <PageContainer maxWidth="max-w-full">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <SectionHeader 
          emoji="🌿"
          title="Welcome to TryThisVape"
          subtitle="Find your perfect vaporizer in just a few simple steps. Our AI-powered quiz guides you to the best device for your needs and preferences."
        />
        <motion.button
          onClick={handleStartQuiz}
          className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center space-x-2 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Start Your Quiz</span>
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </PageContainer>
  );
};
