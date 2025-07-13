import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/layout/SectionHeader';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { VibeRecommendationResponse } from '../hooks/use-quizzes';

export const RecommendationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendation } = location.state as { recommendation: VibeRecommendationResponse } || {};

  // If no recommendation is found, redirect to home
  React.useEffect(() => {
    if (!recommendation) {
      navigate('/');
    }
  }, [recommendation, navigate]);

  if (!recommendation) {
    return null; // Will redirect in the useEffect
  }

  return (
    <PageContainer maxWidth="max-w-6xl">
      <div className="flex flex-col items-center py-8 px-4">
        <SectionHeader
          emoji="✨"
          title="Your Perfect Match"
          subtitle="Based on your vibe, we've found the ideal vaporizer for you."
        />

        <motion.div
          className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:flex">
            {recommendation.imageUrl && (
              <div className="md:flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6 md:w-64">
                <img
                  className="h-48 w-full object-contain md:h-full md:w-48"
                  src={recommendation.imageUrl}
                  alt={recommendation.name}
                />
              </div>
            )}
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Recommended for you
              </div>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {recommendation.name}
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {recommendation.description}
              </p>
              <div className="mt-4">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Price: </span>
                <span className="text-green-600 dark:text-green-400 font-bold">
                  ${recommendation.price.toFixed(2)}
                </span>
              </div>

              {recommendation.features && recommendation.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Key Features</h3>
                  <ul className="mt-2 space-y-1">
                    {recommendation.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-500">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <motion.button
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Home</span>
                </motion.button>
                <div className="flex space-x-3">
                  <motion.button
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ThumbsUp size={18} />
                    <span>Great Match</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ThumbsDown size={18} />
                    <span>Try Again</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};
