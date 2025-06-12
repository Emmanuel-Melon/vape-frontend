import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPreferences, QuizStep } from '../../types/vaporizer';
import { RadioGroup } from '../RadioGroup';
import { BudgetSlider } from '../BudgetSlider';
import { PrioritySlider } from '../PrioritySlider';
import { initialExperienceOptions, commonQuestions, educationalContent as allEducationalContent } from '../../data/quizContent';

interface QuizStepContentProps {
  currentStep: QuizStep;
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  animationDirection: 'next' | 'previous' | 'initial'; // Added animationDirection prop
}

// cardVariants removed as animations will be directly on motion.div using animationDirection prop


export const QuizStepContent: React.FC<QuizStepContentProps> = ({
  currentStep,
  preferences,
  setPreferences,
  animationDirection, // Destructure new prop
}) => {
  const renderStepSpecificContent = () => {
    switch (currentStep) {
      case 'experience':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                What's your experience with vaporizers?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
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
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                How often do you plan to use it?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
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
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                Where will you primarily use it?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
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
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                What's your budget?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
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
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                What matters most to you?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
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

  const getEducationalContentForStep = () => {
    let tipContent: string | undefined;
    let tipTitle: string = "Pro Tip:";
    let bgColor = "bg-gray-50";
    let textColor = "text-gray-700";
    let titleColor = "text-gray-800";

    switch (currentStep) {
      case 'experience':
        if (preferences.cannabisExperience && allEducationalContent.experience) {
          tipContent = allEducationalContent.experience[preferences.cannabisExperience as keyof typeof allEducationalContent.experience];
          tipTitle = "Experience Tip:";
          bgColor = "bg-blue-50";
          textColor = "text-blue-700";
          titleColor = "text-blue-800";
        }
        break;
      case 'usage':
        if (preferences.usagePattern && allEducationalContent.usage) {
          tipContent = allEducationalContent.usage[preferences.usagePattern as keyof typeof allEducationalContent.usage];
          tipTitle = "Usage Tip:";
          bgColor = "bg-green-50";
          textColor = "text-green-700";
          titleColor = "text-green-800";
        }
        break;
      case 'portability':
        if (preferences.portability && allEducationalContent.portability) {
          const portabilityKey = preferences.portability === 'pocket-size' ? 'portable' : preferences.portability;
          tipContent = allEducationalContent.portability[portabilityKey as keyof typeof allEducationalContent.portability];
          tipTitle = "Portability Tip:";
          bgColor = "bg-purple-50";
          textColor = "text-purple-700";
          titleColor = "text-purple-800";
        }
        break;
      case 'budget':
        tipTitle = "Budget Guide:";
        bgColor = "bg-yellow-50";
        textColor = "text-yellow-700";
        titleColor = "text-yellow-800";
        if (preferences.budget < 100) tipContent = "Entry-level vaporizers offer basic features and decent performance, great for starting out.";
        else if (preferences.budget < 200) tipContent = "Mid-range options provide a balance of better build quality, more features, and good vapor.";
        else if (preferences.budget < 300) tipContent = "Premium vaporizers deliver excellent performance, advanced features, and superior materials.";
        else tipContent = "Top-tier devices boast the best technology, materials, and an unparalleled vaping experience.";
        break;
      case 'priorities':
        // No specific tip for priorities in this format
        return null;
      default:
        return null;
    }

    if (!tipContent) return null;

    return {
      title: tipTitle,
      content: tipContent,
      bgColor,
      textColor,
      titleColor,
    };
  };

  const currentEducationalContent = getEducationalContentForStep();
  // const direction = 1; // Removed, will use animationDirection prop

  return (
    // AnimatePresence mode="wait" was removed from here, it's now in VaporizerQuiz.tsx
    // The key={currentStep} is also applied in VaporizerQuiz.tsx to this component instance
    <motion.div
      // variants={cardVariants} // Removed
      // initial="initial" // Removed
      // animate="animate" // Removed
      // exit="exit" // Removed
      // custom={direction} // Removed
      initial={{ opacity: 0, x: animationDirection === 'next' ? 100 : animationDirection === 'previous' ? -100 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animationDirection === 'next' ? -100 : animationDirection === 'previous' ? 100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex-grow flex flex-col justify-between" // Removed card styles, added layout styles
    >
      <div>{renderStepSpecificContent()}</div>

      {/* Educational content's own animation can remain as is */}
      <AnimatePresence>
        {currentEducationalContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }} // Keep delay for educational content to appear after main content
            className={`mt-8 p-4 rounded-lg ${currentEducationalContent.bgColor} dark:bg-opacity-20`}
          >
            <h3 className={`font-semibold ${currentEducationalContent.titleColor} dark:text-opacity-90 mb-2`}>
              {currentEducationalContent.title}
            </h3>
            <p className={`${currentEducationalContent.textColor} dark:text-opacity-80`}>
              {currentEducationalContent.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    // AnimatePresence closing tag removed
  );

};
