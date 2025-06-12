import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, User, MapPin, DollarSign, Sliders, CheckCircle } from 'lucide-react';
import { UserPreferences, QuizStep, QuizResult, SavedQuizResult } from '../types/vaporizer';
import { initialExperienceOptions, commonQuestions, educationalContent } from '../data/quizContent';
import { vaporizers } from '../data/vaporizers';
import { RadioGroup } from './RadioGroup';
import { PrioritySlider } from './PrioritySlider';
import { BudgetSlider } from './BudgetSlider';
import { QuizResults } from './QuizResults';
import { SavedResultsModal } from './SavedResultsModal';
import { CloudBackground } from './CloudBackground';
import { FloatingBubbles } from './FloatingBubbles';
import { Footer } from './Footer';
import { useIsMobile } from '../hooks/useMediaQuery';

export const VaporizerQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<QuizStep>('experience');
  const [preferences, setPreferences] = useState<UserPreferences>({
    cannabisExperience: null,
    primaryUse: null,
    usagePattern: null,
    userType: null,
    portability: null,
    budget: 200,
    priorities: {
      vaporPotency: 5,
      vaporComfort: 5,
      portability: 5,
      batteryLife: 5,
      buildQuality: 5,
      easeOfUse: 5,
      maintenance: 5,
      value: 5
    }
  });
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [showSavedResults, setShowSavedResults] = useState(false);
  const isMobile = useIsMobile();

  const steps: QuizStep[] = ['experience', 'usage', 'portability', 'budget', 'priorities'];
  const currentStepIndex = steps.indexOf(currentStep);

  // Only scroll to top when showing results or restarting
  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  const stepConfig = [
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: User, 
      description: 'Your vaping experience level',
      completed: preferences.cannabisExperience !== null
    },
    { 
      id: 'usage', 
      label: 'Usage', 
      icon: CheckCircle, 
      description: 'How often you plan to use it',
      completed: preferences.usagePattern !== null
    },
    { 
      id: 'portability', 
      label: 'Location', 
      icon: MapPin, 
      description: 'Where you\'ll primarily use it',
      completed: preferences.portability !== null
    },
    { 
      id: 'budget', 
      label: 'Budget', 
      icon: DollarSign, 
      description: 'Your price range',
      completed: preferences.budget > 0
    },
    { 
      id: 'priorities', 
      label: 'Priorities', 
      icon: Sliders, 
      description: 'What matters most to you',
      completed: true
    }
  ];

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const calculateResults = () => {
    const scoredVaporizers = vaporizers.map(vaporizer => {
      let score = 0;
      let maxScore = 0;

      // Experience level matching
      if (preferences.cannabisExperience === 'novice' && vaporizer.beginnerFriendly) {
        score += 20;
      } else if (preferences.cannabisExperience === 'experienced' && vaporizer.advancedFeatures) {
        score += 15;
      }
      maxScore += 20;

      // Usage pattern matching
      if (preferences.usagePattern === 'daily' && vaporizer.ratings.batteryLife >= 4) {
        score += 15;
      } else if (preferences.usagePattern === 'casual' && vaporizer.ratings.easeOfUse >= 4) {
        score += 15;
      } else if (preferences.usagePattern === 'heavy' && vaporizer.sessionVape) {
        score += 15;
      }
      maxScore += 15;

      // Portability matching
      if (preferences.portability === 'desktop' && vaporizer.type === 'desktop') {
        score += 25;
      } else if (preferences.portability === 'portable' && vaporizer.type === 'portable') {
        score += 25;
      } else if (preferences.portability === 'no-preference') {
        score += 15;
      }
      maxScore += 25;

      // Budget matching
      if (vaporizer.price <= preferences.budget) {
        const budgetScore = Math.max(0, 20 - ((vaporizer.price / preferences.budget) * 10));
        score += budgetScore;
      }
      maxScore += 20;

      // Priority matching
      const priorityWeights = preferences.priorities;
      const totalPriorityWeight = Object.values(priorityWeights).reduce((sum, weight) => sum + weight, 0);
      
      Object.entries(priorityWeights).forEach(([key, weight]) => {
        const normalizedWeight = (weight / totalPriorityWeight) * 20;
        if (key === 'vaporPotency') {
          score += (vaporizer.ratings.vaporPotency / 5) * normalizedWeight;
        } else if (key === 'easeOfUse') {
          score += (vaporizer.ratings.easeOfUse / 5) * normalizedWeight;
        } else if (key === 'portability') {
          score += (vaporizer.type === 'portable' ? 1 : 0.5) * normalizedWeight;
        } else if (key === 'batteryLife') {
          score += (vaporizer.ratings.batteryLife / 5) * normalizedWeight;
        } else if (key === 'buildQuality') {
          score += (vaporizer.ratings.buildQuality / 5) * normalizedWeight;
        } else if (key === 'value') {
          const priceScore = vaporizer.price <= preferences.budget ? 1 : 0.5;
          score += priceScore * normalizedWeight;
        }
      });
      maxScore += 20;

      const percentage = Math.round((score / maxScore) * 100);
      
      return {
        ...vaporizer,
        matchScore: percentage
      };
    });

    const sortedResults = scoredVaporizers
      .sort((a, b) => b.matchScore - a.matchScore);

    const primaryRecommendation = sortedResults[0];
    const alternatives = sortedResults.slice(1, 4);

    const result: QuizResult = {
      primaryRecommendation,
      alternatives,
      explanation: generateExplanation(primaryRecommendation, preferences),
      educationalContent: {
        temperatureGuide: [
          '350-375°F: Light effects, maximum flavor, good for beginners',
          '375-390°F: Balanced effects and flavor, most popular range',
          '390-410°F: Stronger effects, less flavor, more sedating'
        ],
        maintenanceTips: [
          'Clean after every 5-10 sessions for best performance',
          'Use isopropyl alcohol (90%+) for cleaning',
          'Let all parts dry completely before reassembling'
        ]
      },
      matchScore: primaryRecommendation.matchScore
    };

    setResults(result);
    setShowResults(true);
  };

  const generateExplanation = (vaporizer: any, prefs: UserPreferences): string => {
    const reasons: string[] = [];

    if (prefs.cannabisExperience === 'novice' && vaporizer.beginnerFriendly) {
      reasons.push('perfect for beginners');
    }
    if (prefs.cannabisExperience === 'experienced' && vaporizer.advancedFeatures) {
      reasons.push('offers advanced features for experienced users');
    }
    if (vaporizer.price <= prefs.budget) {
      reasons.push('fits within your budget');
    }
    if (prefs.portability === 'portable' && vaporizer.type === 'portable') {
      reasons.push('provides excellent portability');
    }
    if (prefs.portability === 'desktop' && vaporizer.type === 'desktop') {
      reasons.push('delivers powerful desktop performance');
    }

    const topReasons = reasons.slice(0, 3);
    return `This vaporizer is ${topReasons.join(', ')} based on your preferences.`;
  };

  const handleStartOver = () => {
    setCurrentStep('experience');
    setPreferences({
      cannabisExperience: null,
      primaryUse: null,
      usagePattern: null,
      userType: null,
      portability: null,
      budget: 200,
      priorities: {
        vaporPotency: 5,
        vaporComfort: 5,
        portability: 5,
        batteryLife: 5,
        buildQuality: 5,
        easeOfUse: 5,
        maintenance: 5,
        value: 5
      }
    });
    setShowResults(false);
    setResults(null);
    // Scroll to top when restarting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSaved = () => {
    setShowSavedResults(true);
  };

  const getEducationalContent = () => {
    switch (currentStep) {
      case 'experience':
        if (!preferences.cannabisExperience) return null;
        return {
          title: "Did you know?",
          content: educationalContent.experience[preferences.cannabisExperience as keyof typeof educationalContent.experience],
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          titleColor: "text-blue-800"
        };
      case 'usage':
        if (!preferences.usagePattern) return null;
        return {
          title: "Pro Tip:",
          content: educationalContent.usage[preferences.usagePattern as keyof typeof educationalContent.usage],
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          titleColor: "text-green-800"
        };
      case 'portability':
        if (!preferences.portability) return null;
        return {
          title: "Good to know:",
          content: educationalContent.portability[preferences.portability as keyof typeof educationalContent.portability],
          bgColor: "bg-purple-50",
          textColor: "text-purple-700",
          titleColor: "text-purple-800"
        };
      case 'budget':
        return {
          title: "Budget Guide:",
          content: preferences.budget < 100 
            ? "Entry-level vaporizers with basic features and decent performance."
            : preferences.budget < 200
            ? "Mid-range options with better build quality and more features."
            : preferences.budget < 300
            ? "Premium vaporizers with excellent performance and advanced features."
            : "Top-tier devices with the best technology and materials available.",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          titleColor: "text-yellow-800"
        };
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'experience':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What's your experience with vaporizers?
              </h2>
              <p className="text-gray-600 text-lg">
                This helps us recommend the right complexity level for you
              </p>
            </div>
            <RadioGroup
              options={initialExperienceOptions}
              value={preferences.cannabisExperience || ''}
              onChange={(value) => setPreferences(prev => ({ ...prev, cannabisExperience: value as any }))}
              name="experience"
            />
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                How often do you plan to use it?
              </h2>
              <p className="text-gray-600 text-lg">
                Usage frequency affects battery life and durability needs
              </p>
            </div>
            <RadioGroup
              options={commonQuestions[0].options}
              value={preferences.usagePattern || ''}
              onChange={(value) => setPreferences(prev => ({ ...prev, usagePattern: value as any }))}
              name="usage"
            />
          </div>
        );

      case 'portability':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Where will you primarily use it?
              </h2>
              <p className="text-gray-600 text-lg">
                Location determines whether you need portable or desktop power
              </p>
            </div>
            <RadioGroup
              options={commonQuestions[1].options}
              value={preferences.portability || ''}
              onChange={(value) => setPreferences(prev => ({ ...prev, portability: value as any }))}
              name="portability"
            />
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What's your budget?
              </h2>
              <p className="text-gray-600 text-lg">
                We'll find the best value within your price range
              </p>
            </div>
            <BudgetSlider
              value={preferences.budget}
              onChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}
              min={50}
              max={800}
              experienceLevel={preferences.cannabisExperience}
            />
          </div>
        );

      case 'priorities':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                What matters most to you?
              </h2>
              <p className="text-gray-600 text-lg">
                Rank these features by importance (1 = least important, 10 = most important)
              </p>
            </div>
            <PrioritySlider
              priorities={preferences.priorities}
              onChange={(priorities) => setPreferences(prev => ({ ...prev, priorities }))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen font-sen relative overflow-hidden">
        <CloudBackground />
        <FloatingBubbles />
        
        <div className={`container mx-auto px-4 py-8 max-w-6xl relative z-10 ${isMobile ? 'pb-4' : ''}`}>
          <QuizResults
            results={results}
            preferences={preferences}
            onRestart={handleStartOver}
            onViewSaved={handleViewSaved}
          />
        </div>

        <Footer />

        <SavedResultsModal
          isOpen={showSavedResults}
          onClose={() => setShowSavedResults(false)}
          onLoadResult={(result) => {
            setPreferences(result.preferences);
            setResults(result.result);
            setShowSavedResults(false);
          }}
        />
      </div>
    );
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'experience':
        return preferences.cannabisExperience !== null;
      case 'usage':
        return preferences.usagePattern !== null;
      case 'portability':
        return preferences.portability !== null;
      case 'budget':
        return preferences.budget > 0;
      case 'priorities':
        return true;
      default:
        return false;
    }
  };

  const currentEducationalContent = getEducationalContent();

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      <FloatingBubbles />
      
      <div className={`container mx-auto px-4 py-8 max-w-4xl relative z-10 ${isMobile ? 'pb-4' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Vaporizer Finder Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Find your perfect vaporizer in just a few simple steps
          </p>
        </div>

        {/* Step Badges */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 overflow-x-auto pb-2">
            {stepConfig.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStepIndex === index;
              const isCompleted = step.completed && currentStepIndex > index;
              const isPast = currentStepIndex > index;
              
              return (
                <motion.div
                  key={step.id}
                  className={`flex flex-col items-center min-w-0 ${isMobile ? 'flex-shrink-0' : ''}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-green-500 to-blue-500 border-green-500 text-white shadow-lg' 
                      : isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isPast
                      ? 'bg-gray-300 border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-blue-400 opacity-30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-green-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </div>
                    {!isMobile && (
                      <div className="text-xs text-gray-400 mt-1 max-w-20">
                        {step.description}
                      </div>
                    )}
                  </div>
                  
                  {index < stepConfig.length - 1 && (
                    <div className={`hidden md:block absolute top-6 left-full w-16 h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} style={{ transform: 'translateX(12px)' }} />
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Quiz Content with Side Navigation */}
        <div className="relative">
          {/* Left Arrow - Hidden on mobile and first step */}
          {!isMobile && currentStepIndex > 0 && (
            <motion.button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 hover:text-gray-800"
              style={{ marginLeft: '-64px' }} // 8px spacing from card
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}

          {/* Right Arrow - Hidden on mobile */}
          {!isMobile && canProceed() && (
            <motion.button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white"
              style={{ marginRight: '-64px' }} // 8px spacing from card
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStepIndex === steps.length - 1 ? <Search size={24} /> : <ChevronRight size={24} />}
            </motion.button>
          )}

          {/* Quiz Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
              style={{ minHeight: '500px' }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Educational Content - Separate Card Below */}
        <AnimatePresence>
          {currentEducationalContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${currentEducationalContent.bgColor} rounded-xl p-6 border border-opacity-20 mt-8`}
            >
              <h3 className={`font-semibold ${currentEducationalContent.titleColor} mb-2`}>
                {currentEducationalContent.title}
              </h3>
              <p className={currentEducationalContent.textColor}>
                {currentEducationalContent.content}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Buttons - Only show if not first step or can proceed */}
        {(currentStepIndex > 0 || canProceed()) && (
          <div className="flex justify-between items-center mt-8">
            {currentStepIndex > 0 ? (
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
            ) : (
              <div></div> // Empty div to maintain spacing
            )}

            {canProceed() && (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md hover:shadow-lg"
              >
                <span>{currentStepIndex === steps.length - 1 ? 'Get Results' : 'Next'}</span>
                {currentStepIndex === steps.length - 1 ? <Search size={20} /> : <ChevronRight size={20} />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};