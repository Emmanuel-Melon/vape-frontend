import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { User, MapPin, DollarSign, Sliders, CheckCircle } from 'lucide-react';
import { UserPreferences, QuizStep, QuizResult } from '../../types/vaporizer';
import { vaporizers } from '../../data/vaporizers';
import { QuizResults } from '../QuizResults';
import { SavedResultsModal } from '../SavedResultsModal';
import { CloudBackground } from '../CloudBackground';
import { FloatingBubbles } from '../FloatingBubbles';
import { Footer } from '../Footer';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { QuizProgressBar } from './QuizProgressBar';
import { QuizNavigation } from './QuizNavigation';
import { QuizStepContent } from './QuizStepContent';

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
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous' | 'initial'>('initial');

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
      setAnimationDirection('next');
      setCurrentStep(steps[currentStepIndex + 1]);
    } else {
      // For the transition to results, we might not need a specific direction for QuizStepContent
      // or we might want a 'fade out' type of animation. For now, let's not set direction for calc.
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setAnimationDirection('previous');
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

  if (showResults && results) {
    return (
      // Restored light gradient, overflow-hidden, and structure for results view
      <div className="min-h-screen font-sen relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
        <CloudBackground />
        <FloatingBubbles />
        
        <div className={`container mx-auto px-4 py-8 max-w-6xl relative z-10 ${isMobile ? 'pb-24' : ''}`}>
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

  return (
    // Ensured light gradient, overflow-hidden, and structure for main quiz view
    <div className="min-h-screen font-sen relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
      <CloudBackground />
      <FloatingBubbles />
      
      <div className={`container mx-auto px-4 py-8 max-w-4xl relative z-10 ${isMobile ? 'pb-24' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8">
          {/* Header text color should remain visible with gradient on light background */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Vaporizer Finder Quiz
          </h1>
          <p className="text-lg text-slate-700">
            Find your perfect vaporizer in just a few simple steps
          </p>
        </div>

        {/* QuizProgressBar component will now handle rendering of step badges and progress */}
        <QuizProgressBar 
          stepConfig={stepConfig}
          currentStepIndex={currentStepIndex}
          steps={steps}
          isMobile={isMobile} // Correctly placed isMobile prop
        />

        {/* Outer container for card and navigation */}
        <div className="relative mt-8 md:mt-12">
          {/* Static Card container for QuizStepContent */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 md:p-10 min-h-[400px] flex flex-col justify-between relative">
            <AnimatePresence mode="wait">
              <QuizStepContent 
                key={currentStep} 
                currentStep={currentStep}
                preferences={preferences}
                setPreferences={setPreferences}
                animationDirection={animationDirection}
              />
            </AnimatePresence>
          </div>

          {/* Navigation for the quiz, positioned relative to the outer container */}
          <QuizNavigation
            currentStepIndex={currentStepIndex}
            stepsLength={steps.length}
            canProceed={canProceed}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            isMobile={isMobile}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};