import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Battery, Zap, Shield, Wrench, DollarSign, RotateCcw, ExternalLink, Save, BookOpen } from 'lucide-react';
import { QuizResult, UserPreferences } from '../types/vaporizer';
import { SaveResultModal } from './SaveResultModal';
import { saveQuizResult } from '../utils/quizStorage';

interface QuizResultsProps {
  results: QuizResult;
  preferences: UserPreferences;
  onRestart: () => void;
  onViewSaved: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({ 
  results, 
  preferences, 
  onRestart, 
  onViewSaved 
}) => {
  const { primaryRecommendation, alternatives, explanation, educationalContent, matchScore } = results;
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingIcon = (category: string) => {
    switch (category) {
      case 'vaporPotency': return <Zap size={16} />;
      case 'batteryLife': return <Battery size={16} />;
      case 'buildQuality': return <Shield size={16} />;
      case 'maintenance': return <Wrench size={16} />;
      case 'value': return <DollarSign size={16} />;
      default: return <Star size={16} />;
    }
  };

  const handleSaveResult = (nickname: string) => {
    saveQuizResult(preferences, results, nickname);
    setIsSaved(true);
  };

  const getDefaultNickname = () => {
    const experience = preferences.cannabisExperience || 'user';
    const budget = preferences.budget;
    const date = new Date().toLocaleDateString();
    return `${experience.charAt(0).toUpperCase() + experience.slice(1)} - $${budget} - ${date}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-4xl mb-4"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          🎉
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Perfect Vaporizer</h2>
        <p className="text-gray-600">Based on your preferences, here's what we recommend</p>
      </motion.div>

      {/* Save Result Banner */}
      {!isSaved && (
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Save size={20} className="text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-800">Save Your Results</h3>
                <p className="text-sm text-blue-600">Keep this recommendation for future reference</p>
              </div>
            </div>
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Save Now
            </button>
          </div>
        </motion.div>
      )}

      {isSaved && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                ✓
              </motion.div>
            </div>
            <div>
              <h3 className="font-medium text-green-800">Results Saved!</h3>
              <p className="text-sm text-green-600">You can access this recommendation anytime from your saved results</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Primary Recommendation */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.img 
              src={primaryRecommendation.image} 
              alt={primaryRecommendation.name}
              className="w-20 h-20 rounded-lg object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{primaryRecommendation.name}</h3>
              <p className="text-lg text-gray-600">{primaryRecommendation.brand}</p>
              <motion.p 
                className="text-2xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                ${primaryRecommendation.price}
              </motion.p>
            </div>
          </div>
          <div className="text-right">
            <motion.div 
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {matchScore}% Match
            </motion.div>
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <Star size={16} fill={i < 4 ? 'currentColor' : 'none'} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h4 className="font-semibold text-gray-800 mb-2">Why it's perfect for you:</h4>
          <p className="text-gray-700">{explanation}</p>
        </motion.div>

        {/* Ratings Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {Object.entries(primaryRecommendation.ratings).map(([key, rating], index) => (
            <motion.div 
              key={key} 
              className="bg-white rounded-lg p-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                {getRatingIcon(key)}
                <span className={`font-bold ${getRatingColor(rating)}`}>{rating}/10</span>
              </div>
              <div className="text-xs text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Award size={16} className="text-green-600" />
              Key Features
            </h4>
            <ul className="space-y-1">
              {primaryRecommendation.features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-gray-700 flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Best For</h4>
            <ul className="space-y-1">
              {primaryRecommendation.bestFor.map((use, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-gray-700 flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {use}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Alternative Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Alternative Options</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {alternatives.map((vape, index) => (
            <motion.div 
              key={vape.id} 
              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <img 
                src={vape.image} 
                alt={vape.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-800">{vape.name}</h4>
              <p className="text-sm text-gray-600">{vape.brand}</p>
              <p className="text-lg font-bold text-green-600 mb-2">${vape.price}</p>
              <div className="text-xs text-gray-500">
                {vape.matchScore}% match
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Educational Content */}
      <motion.div 
        className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <h3 className="text-xl font-bold text-blue-800 mb-4">Getting Started Guide</h3>
        
        {educationalContent.gettingStarted && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <h4 className="font-semibold text-blue-700 mb-2">Tips for Beginners</h4>
            <ul className="space-y-2">
              {educationalContent.gettingStarted.map((tip, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-blue-700 flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.0 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2 }}
          >
            <h4 className="font-semibold text-blue-700 mb-2">Temperature Guide</h4>
            <ul className="space-y-2">
              {educationalContent.temperatureGuide.map((guide, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-blue-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 + index * 0.1 }}
                >
                  {guide}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.4 }}
          >
            <h4 className="font-semibold text-blue-700 mb-2">Maintenance Tips</h4>
            <ul className="space-y-2">
              {educationalContent.maintenanceTips.map((tip, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-blue-700 flex items-start gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 + index * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8 }}
      >
        <motion.button
          onClick={onViewSaved}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BookOpen size={20} />
          View Saved Results
        </motion.button>
        <motion.button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
          Take Quiz Again
        </motion.button>
        <motion.button 
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ExternalLink size={20} />
          View Detailed Reviews
        </motion.button>
      </motion.div>

      {/* Save Result Modal */}
      <SaveResultModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveResult}
        defaultNickname={getDefaultNickname()}
      />
    </div>
  );
};