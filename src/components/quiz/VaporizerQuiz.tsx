import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { User, MapPin, DollarSign, Sliders, CheckCircle } from 'lucide-react';
import { QuizStep, QuizResult, VaporizerRecommendation, SavedQuizResult } from '../../types/vaporizer';
import { UserPreferencesFormData, userPreferencesSchema } from '../../lib/schemas';
import { vaporizers as vaporizersData } from '../../data/vaporizers';
import { QuizProgressBar } from './QuizProgressBar';
import { Footer } from '../Footer';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { QuizStepContent } from './QuizStepContent';
import { QuizNavigation } from './QuizNavigation';
import { QuizResults } from '../QuizResults';
import { SavedResultsModal } from '../SavedResultsModal';
import { CloudBackground } from '../CloudBackground';
import { FloatingBubbles } from '../FloatingBubbles';

const VaporizerQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<QuizStep>('experience');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [showSavedResults, setShowSavedResults] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'previous' | 'initial'>('initial');
  const isMobile = useIsMobile();

  const defaultQuizValues: UserPreferencesFormData = {
    cannabisExperience: null,
    primaryUse: null,
    simplicityPreference: null,
    discretionImportance: null,
    heatingMethod: null,
    airflowPreference: null,
    temperatureControl: null,
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
      value: 5,
    },
  };

  const {
    control,
    handleSubmit, // Keep for potential future use (e.g. full form submission)
    watch,
    formState: { errors, touchedFields },
    // setValue, // No longer used directly in VaporizerQuiz
    trigger,
    getValues,
    reset,
  } = useForm<UserPreferencesFormData>({
    resolver: zodResolver(userPreferencesSchema),
    mode: 'onChange',
    defaultValues: defaultQuizValues,
  });

  const preferences = watch(); // Watch all form values for reactive UI updates

  const steps: QuizStep[] = ['experience', 'primaryUse', 'usagePattern', 'portability', 'budget', 'priorities']; // Added 'primaryUse', renamed 'usage' to 'usagePattern'
  const currentStepIndex = steps.indexOf(currentStep);

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
      completed: !!(touchedFields.cannabisExperience && !errors.cannabisExperience && getValues().cannabisExperience),
    },
    {
      id: 'primaryUse',
      label: 'Primary Use',
      icon: CheckCircle, // Consider a different icon if available/desired
      description: 'How you primarily use it',
      completed: !!(touchedFields.primaryUse && !errors.primaryUse && getValues().primaryUse),
    },
    {
      id: 'usagePattern',
      label: 'Usage Pattern',
      icon: CheckCircle, // Consider a different icon if available/desired
      description: 'How often you plan to use it',
      completed: !!(touchedFields.usagePattern && !errors.usagePattern && getValues().usagePattern),
    },
    {
      id: 'portability',
      label: 'Portability',
      icon: MapPin,
      description: 'Where you\'ll primarily use it',
      completed: !!(touchedFields.portability && !errors.portability && getValues().portability),
    },
    {
      id: 'budget',
      label: 'Budget',
      icon: DollarSign,
      description: 'Your price range',
      completed: !!(touchedFields.budget && !errors.budget && getValues().budget !== undefined && (getValues().budget ?? 0) >= 0),
    },
    {
      id: 'priorities',
      label: 'Priorities',
      icon: Sliders,
      description: 'What matters most to you',
      completed: 
        !!touchedFields.priorities &&
        !errors.priorities &&
        Object.values(getValues().priorities || {}).every((val) => (val as number) >= 1 && (val as number) <= 10) &&
        Object.keys(getValues().priorities || {}).length === Object.keys(defaultQuizValues.priorities).length,
    },
  ];
  
  const canProceed = (): boolean => {
    const formValues = getValues();
    switch (currentStep) {
      case 'experience':
        return !errors.cannabisExperience && !!formValues.cannabisExperience;
      case 'primaryUse':
        return !errors.primaryUse && !!formValues.primaryUse;
      case 'usagePattern':
        return !errors.usagePattern && !!formValues.usagePattern;
      case 'portability':
        return !errors.portability && !!formValues.portability;
      case 'budget':
        return !errors.budget && formValues.budget !== undefined && (formValues.budget ?? 0) >= 0;
      case 'priorities':
        const currentPriorities = formValues.priorities || {};
        // Ensure all keys from defaultQuizValues.priorities are present and valid
        const defaultPriorityKeys = Object.keys(defaultQuizValues.priorities) as Array<keyof typeof defaultQuizValues.priorities>;

        const allValuesValidAndInRange = defaultPriorityKeys.every(key => {
          const value = currentPriorities[key] as number;
          // Check if the value exists (could be 0, which is invalid for 1-10 range but is a number)
          // and is a number within the valid range 1-10.
          return typeof value === 'number' && value >= 1 && value <= 10;
        });

        if (!allValuesValidAndInRange) {
          // console.log('Priorities: Not all values valid or in range', currentPriorities);
          return false;
        }

        // Check if there are any specific error messages for any of the priority fields.
        const hasSpecificErrors = defaultPriorityKeys.some(key => {
          return errors.priorities?.[key as keyof UserPreferencesFormData['priorities']]?.message;
        });

        if (hasSpecificErrors) {
          // console.log('Priorities: Has specific errors', errors.priorities);
          return false;
        }
        
        // If all values are valid and in range, and no specific errors, then can proceed.
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof UserPreferencesFormData)[] | keyof UserPreferencesFormData = [];
    switch (currentStep) {
      case 'experience': fieldsToValidate = 'cannabisExperience'; break;
      case 'primaryUse': fieldsToValidate = 'primaryUse'; break;
      case 'usagePattern': fieldsToValidate = 'usagePattern'; break;
      case 'portability': fieldsToValidate = 'portability'; break;
      case 'budget': fieldsToValidate = 'budget'; break;
      case 'priorities': fieldsToValidate = 'priorities'; break;
    }

    const validationPassed = await trigger(fieldsToValidate);

    if (validationPassed) {
      const currentIndex = steps.indexOf(currentStep);
      if (currentIndex < steps.length - 1) {
        setAnimationDirection('next');
        setCurrentStep(steps[currentIndex + 1]);
      } else {
        const finalFormValues = getValues();
        const calculated = calculateResults(finalFormValues, vaporizersData);
        setResults(calculated);
        setShowResults(true);
        setAnimationDirection('next');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('Validation failed for step: ', currentStep, errors);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setAnimationDirection('previous');
      setCurrentStep(steps[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const calculateResults = (currentPrefs: UserPreferencesFormData, currentVaporizersData: VaporizerRecommendation[]): QuizResult => {
    const scoredVaporizers = currentVaporizersData.map((vaporizer) => {
      let score = 0;
      let maxScorePossible = 0;

      // Experience (Max 20)
      maxScorePossible += 20;
      if (currentPrefs.cannabisExperience === 'novice' && vaporizer.beginnerFriendly) score += 20;
      else if (currentPrefs.cannabisExperience === 'some-experience') score += 10; // General bonus for some-experience
      else if (currentPrefs.cannabisExperience === 'experienced' && vaporizer.advancedFeatures) score += 20; // Max score for experienced if advanced features match


      // Primary Use & Usage Pattern (Max 20)
      maxScorePossible += 20;
      if (currentPrefs.primaryUse === 'medical' && vaporizer.features?.includes('preciseTemperature')) score += 10;
      if (currentPrefs.primaryUse === 'recreational' && vaporizer.features?.includes('goodFlavor')) score += 5; // Adjusted score
      if (currentPrefs.primaryUse === 'both' && (vaporizer.features?.includes('preciseTemperature') || vaporizer.features?.includes('goodFlavor'))) score += 5; // Bonus for 'both'
      if (currentPrefs.usagePattern === 'daily' && vaporizer.ratings.batteryLife >= 4) score += 10; // Prioritize battery for daily
      if (currentPrefs.usagePattern === 'casual' && vaporizer.type === 'portable' && vaporizer.ratings.easeOfUse >=4) score +=10; // 'social' and 'occasional' map to 'casual'
      if (currentPrefs.usagePattern === 'heavy' && vaporizer.ratings.buildQuality >=4) score += 10; // Durability for heavy use
      if (currentPrefs.usagePattern === 'microdose' && vaporizer.features?.includes('microdosingCapable')) score += 10;
      
      // Portability (Max 15)
      maxScorePossible += 15;
      if (currentPrefs.portability === 'desktop' && vaporizer.type === 'desktop') score += 15; // 'home_only' and 'mostly_home' map to 'desktop'
      else if (currentPrefs.portability === 'pocket-size' && vaporizer.type === 'portable' && (vaporizer.features?.includes('Compact design') || vaporizer.features?.includes('Compact size'))) score += 15; // 'portable_compact' maps to 'pocket-size'
      else if (currentPrefs.portability === 'portable' && vaporizer.type === 'portable') score += 10; // 'portable_regular' maps to 'portable'
      else if (currentPrefs.portability === 'no-preference') score += 5;
      // Penalize if portability mismatch is strong
      else if (currentPrefs.portability === 'desktop' && vaporizer.type === 'portable') score -= 5;
      else if ((currentPrefs.portability === 'pocket-size' || currentPrefs.portability === 'portable') && vaporizer.type === 'desktop') score -= 5;

      // Budget (Max 15)
      maxScorePossible += 15;
      if (vaporizer.price <= (currentPrefs.budget ?? 200)) {
        score += 15; // Full points if within budget
      } else if (vaporizer.price <= (currentPrefs.budget ?? 200) * 1.2) {
        score += 7; // Partial points if slightly over
      }

      // Priorities (Max 30 - distributed among selected priorities)
      maxScorePossible += 30;
      const priorityScoreTotal = Object.entries(currentPrefs.priorities).reduce((acc, [key, value]) => {
        let priorityContribution = 0;
        const weight = value as number;
        switch (key as keyof UserPreferencesFormData['priorities']) {
          case 'vaporPotency': priorityContribution = (vaporizer.ratings.vaporPotency / 5) * weight * 0.6; break; // Max 3 per priority point (x5=15 total for this priority)
          case 'vaporComfort': priorityContribution = (vaporizer.ratings.vaporComfort / 5) * weight * 0.6; break;
          case 'portability': priorityContribution = (vaporizer.type === 'portable' ? 5 : vaporizer.type === 'desktop' ? 2 : 0 / 5) * weight * 0.6; break;
          case 'batteryLife': priorityContribution = (vaporizer.ratings.batteryLife / 5) * weight * 0.6; break;
          case 'buildQuality': priorityContribution = (vaporizer.ratings.buildQuality / 5) * weight * 0.6; break;
          case 'easeOfUse': priorityContribution = (vaporizer.ratings.easeOfUse / 5) * weight * 0.6; break;
          case 'maintenance': priorityContribution = ((5 - vaporizer.ratings.maintenanceRequired) / 5) * weight * 0.6; break;
          case 'value': 
            const valueScore = (vaporizer.price <= (currentPrefs.budget ?? 200)) ? 5 : (vaporizer.price <= (currentPrefs.budget ?? 200) * 1.2 ? 3 : 1);
            priorityContribution = (valueScore / 5) * weight * 0.6; 
            break;
        }
        return acc + priorityContribution;
      }, 0);
      score += priorityScoreTotal;
      
      return { ...vaporizer, score, matchScore: maxScorePossible > 0 ? Math.round((score / maxScorePossible) * 100) : 0 };
    });

    const sortedVaporizers = scoredVaporizers.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
    
    const primaryRecommendation = sortedVaporizers[0] || vaporizersData[0]; // Fallback
    const alternatives = sortedVaporizers.slice(1, 4);

    return {
      primaryRecommendation,
      alternatives,
      explanation: generateExplanation(primaryRecommendation, currentPrefs),
      educationalContent: {
        temperatureGuide: [
          '350-375°F (177-190°C): Best for flavor, mild effects.',
          '375-400°F (190-204°C): Balanced flavor and vapor, moderate effects.',
          '400-430°F (204-221°C): Maximum vapor, stronger effects, less flavor.',
        ],
        maintenanceTips: [
          'Regular cleaning (every 5-10 uses) preserves flavor and performance.',
          'Use isopropyl alcohol and cotton swabs for most parts.',
          'Check manufacturer instructions for specific cleaning advice.',
        ],
      },
      matchScore: primaryRecommendation.matchScore ?? 0,
    };
  };

  const generateExplanation = (vaporizer: VaporizerRecommendation, prefs: UserPreferencesFormData): string => {
    let reasons: string[] = [];
    if (prefs.cannabisExperience && vaporizer.beginnerFriendly && ['novice', 'some-experience'].includes(prefs.cannabisExperience)) reasons.push('it\'s beginner-friendly');
    else if (prefs.cannabisExperience === 'experienced' && vaporizer.advancedFeatures) reasons.push('it offers advanced features for experienced users');
    
    if (prefs.portability === 'pocket-size' && vaporizer.type === 'portable' && (vaporizer.features?.includes('Compact design') || vaporizer.features?.includes('Compact size'))) reasons.push('it\'s compact and portable');
    else if (prefs.portability === 'portable' && vaporizer.type === 'portable') reasons.push('it matches your portability needs');
    else if (prefs.portability === 'desktop' && vaporizer.type === 'desktop') reasons.push('it is a powerful desktop unit for home use');
    
    if (prefs.budget && vaporizer.price <= prefs.budget) reasons.push('it fits your budget');
    
    const topPriority = Object.entries(prefs.priorities).sort(([,a],[,b]) => (b as number) - (a as number))[0]?.[0] as keyof UserPreferencesFormData['priorities'];
    if (topPriority) {
        const ratingKey = topPriority === 'value' ? 'overall' : topPriority; // Assuming 'value' might map to an overall rating or be handled differently
        if (ratingKey !== 'overall' && vaporizer.ratings[ratingKey as keyof VaporizerRecommendation['ratings']] >= 4) {
             reasons.push(`it excels in ${topPriority.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        } else if (topPriority === 'value' && vaporizer.price <= (prefs.budget ?? 200)) {
            reasons.push('it offers great value for money');
        }
    }

    if (reasons.length === 0) return `The ${vaporizer.name} is a versatile and well-regarded option.`;
    return `The ${vaporizer.name} is a great choice because ${reasons.slice(0,3).join(', and ')}.`;
  };

  const handleRestartQuiz = () => {
    setCurrentStep('experience');
    reset(defaultQuizValues);
    setShowResults(false);
    setResults(null);
    setAnimationDirection('initial');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSaved = () => {
    setShowSavedResults(true);
  };

  const handleLoadResult = (savedResult: SavedQuizResult) => {
    reset(savedResult.preferences);
    setCurrentStep('experience'); // Or perhaps to the last step they were on if saved
    setShowResults(false);
    setResults(null);
    setShowSavedResults(false);
    setAnimationDirection('initial');
    // Potentially trigger calculation if all data is present
    // const loadedPrefs = savedResult.preferences;
    // if (steps.every(step => stepConfig.find(s => s.id === step)?.completed)) {
    //   const calculated = calculateResults(loadedPrefs, vaporizersData);
    //   setResults(calculated);
    //   setShowResults(true);
    // }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen font-sen relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
        <CloudBackground />
        <FloatingBubbles />
        <div className={`container mx-auto px-4 py-8 max-w-6xl relative z-10 ${isMobile ? 'pb-24' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
              Your Vaporizer Results
            </h1>
          </div>
          <QuizResults
            results={results}
            preferences={getValues()} // Pass current form values to results
            onRestart={handleRestartQuiz}
            onViewSaved={handleViewSaved}
          />
        </div>
        <Footer />
        <SavedResultsModal
          isOpen={showSavedResults}
          onClose={() => setShowSavedResults(false)}
          onLoadResult={handleLoadResult}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sen relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-100">
      <CloudBackground />
      <FloatingBubbles />
      <div className={`container mx-auto px-4 py-8 max-w-4xl relative z-10 ${isMobile ? 'pb-24' : ''}`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Vaporizer Finder Quiz
          </h1>
          <p className="text-lg text-slate-700">
            Find your perfect vaporizer in just a few simple steps.
          </p>
        </div>

        <QuizProgressBar
          stepConfig={stepConfig}
          currentStepIndex={currentStepIndex}
          steps={steps}
          isMobile={isMobile}
        />

        <div className="relative mt-8 md:mt-12">
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 md:p-10 min-h-[400px] flex flex-col justify-between relative">
            <AnimatePresence mode="wait">
              <QuizStepContent
                key={currentStep}
                currentStep={currentStep}
                preferences={preferences} // Pass watched form values
                // setValue={setValue} // Removed as QuizStepContent no longer accepts/uses it
                control={control}
                animationDirection={animationDirection}
              />
            </AnimatePresence>
            {/* QuizNavigation will be placed outside this inner div, but inside the parent relative div */}
          </div>
          {/* New QuizNavigation component integration */}
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

      <SavedResultsModal
        isOpen={showSavedResults}
        onClose={() => setShowSavedResults(false)}
        onLoadResult={handleLoadResult}
      />
      <Footer />
    </div>
  );
};

export default VaporizerQuiz;