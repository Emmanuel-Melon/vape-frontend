import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageContainer } from '../components/layout/PageContainer';
import { SectionHeader } from '../components/layout/SectionHeader';
import { ArrowRight, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { useVibeRecommendation } from '../hooks/use-quizzes';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [promptText, setPromptText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  
  // Use the vibe recommendation hook
  const vibeRecommendation = useVibeRecommendation();

  const handleStartQuiz = () => {
    setIsLoadingQuiz(true);
    // Simulate a small delay to show the loading spinner
    setTimeout(() => {
      navigate('/quiz');
    }, 1500);
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const result = await vibeRecommendation.mutateAsync({ text: promptText });
      // Navigate to results page with the recommendation data
      navigate('/recommendation', { state: { recommendation: result } });
    } catch (error) {
      console.error('Error getting recommendation:', error);
      // Handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer maxWidth="max-w-full">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
        <div className="max-w-lg mx-auto">
          <SectionHeader 
            emoji="🌿"
            title="Welcome to TryThisVape"
            subtitle="Find your perfect vaporizer in just a few simple steps. Choose how you'd like to discover your ideal device."
          />
        </div>
        
        <div className="flex flex-col gap-12 items-center">
          {/* Quiz Option */}
          <div className="max-w-lg mx-auto text-center">
            <div className="flex items-center justify-center mb-4 text-green-500">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Take Our Guided Quiz</h3>
            <p className="text-gray-600 mb-6">
              Answer a few simple questions and our AI will match you with the perfect vaporizer based on your preferences.
            </p>
            {isLoadingQuiz ? (
              <LoadingSpinner 
                icon="target"
                color="green"
                title="Loading Quiz..."
                subtitle="Preparing your personalized vaporizer quiz"
                size="md"
              />
            ) : (
              <motion.button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Start Quiz</span>
                <ArrowRight size={20} />
              </motion.button>
            )}
          </div>
          
          {/* Separator */}
          <div className="flex items-center justify-center max-w-lg mx-auto w-full">
            <div className="w-1/3 h-px bg-gray-300"></div>
            <div className="mx-4 rounded-full bg-amber-500 p-2">
              <Sparkles size={24} className="text-white" />
            </div>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>
          
          {/* Vibe Description Option */}
          <div className="max-w-lg mx-auto text-center">
            <div className="flex items-center justify-center mb-4 text-purple-500">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Describe Your Vibe</h3>
            <p className="text-gray-600 mb-6">
              Tell us about your mood, situation, or preferences in your own words and let our AI find your perfect match.
            </p>
            
            <motion.form 
              onSubmit={handlePromptSubmit}
              className="w-full"
            >
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Example: celebrating the progress we made so far with this app we're building. I'm in my bed right now!"
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] bg-white/80 text-gray-800 mb-6"
                required
              />
              {isSubmitting ? (
                <LoadingSpinner 
                  icon="sparkles"
                  color="purple"
                  title="Finding your perfect match..."
                  subtitle="Our AI is analyzing your vibe to find the ideal vaporizer"
                  size="md"
                />
              ) : (
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 text-lg"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Get Recommendation</span>
                  <ArrowRight size={20} />
                </motion.button>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
