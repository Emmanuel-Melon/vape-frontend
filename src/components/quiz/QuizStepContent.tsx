import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizStep } from '../../types/vaporizer'; 
import { UserPreferencesFormData } from '../../lib/schemas'; 
import { UseFormSetValue, Control, Controller, FieldError } from 'react-hook-form'; 
import { RadioGroup, RadioOption } from '../RadioGroup'; 
import { BudgetSlider } from '../BudgetSlider';
import { PrioritySlider } from '../PrioritySlider';
import { initialExperienceOptions, commonQuestions, educationalContent as allEducationalContent } from '../../data/quizContent';

interface QuizStepContentProps {
  currentStep: QuizStep;
  preferences: UserPreferencesFormData; 
  // setValue: UseFormSetValue<UserPreferencesFormData>; // Removed as it's unused with Controller
  control: Control<UserPreferencesFormData>; 
  animationDirection: 'next' | 'previous' | 'initial';
}

const FieldErrorMessage: React.FC<{ error?: FieldError | { message?: string } }> = ({ error }) => {
  if (!error?.message) return null;
  return <p className="text-sm text-red-600 mt-1">{error.message}</p>;
};

export const QuizStepContent: React.FC<QuizStepContentProps> = ({
  currentStep,
  preferences, 
  // setValue, // Removed as it's unused with Controller
  control,
  animationDirection,
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
            <Controller
              name="cannabisExperience"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    options={initialExperienceOptions}
                    value={field.value || ''}
                    onChange={field.onChange}
                    name={field.name}
                  />
                  <FieldErrorMessage error={error} />
                </>
              )}
            />
          </div>
        );
      case 'primaryUse':
        const primaryUseOptions: RadioOption[] = commonQuestions.find(q => q.id === 'primaryUse')?.options || [];
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                How will you primarily use your vaporizer?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
                This helps us tailor recommendations for your main activities.
              </p>
            </div>
            <Controller
              name="primaryUse"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    options={primaryUseOptions}
                    value={field.value || ''}
                    onChange={field.onChange}
                    name={field.name}
                  />
                  <FieldErrorMessage error={error} />
                </>
              )}
            />
          </div>
        );
      case 'usagePattern':
        const usageOptions: RadioOption[] = commonQuestions.find(q => q.id === 'usagePattern')?.options || [];
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-gray-100 mb-4">
                How often do you plan to use it?
              </h2>
              <p className="text-black dark:text-gray-300 text-lg">
                Usage frequency affects battery life and durability needs.
              </p>
            </div>
            <Controller
              name="usagePattern"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    options={usageOptions}
                    value={field.value || ''}
                    onChange={field.onChange}
                    name={field.name}
                  />
                  <FieldErrorMessage error={error} />
                </>
              )}
            />
          </div>
        );
      case 'portability':
        const portabilityOptions: RadioOption[] = commonQuestions.find(q => q.id === 'portability')?.options || [];
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
            <Controller
              name="portability"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <RadioGroup
                    options={portabilityOptions}
                    value={field.value || ''}
                    onChange={field.onChange}
                    name={field.name}
                  />
                  <FieldErrorMessage error={error} />
                </>
              )}
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
            <Controller
              name="budget"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <BudgetSlider
                    value={field.value}
                    onChange={field.onChange}
                    min={50}
                    max={800}
                    experienceLevel={preferences.cannabisExperience} 
                  />
                  <FieldErrorMessage error={error} />
                </>
              )}
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
            <Controller
              name="priorities"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <PrioritySlider
                    priorities={field.value}
                    onChange={field.onChange}
                  />
                  <FieldErrorMessage error={error} /> 
                  {error?.root?.message && <FieldErrorMessage error={error.root} />}
                </>
              )}
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
        const currentExperience = preferences.cannabisExperience;
        if (currentExperience && allEducationalContent.experience) {
          if (currentExperience in allEducationalContent.experience) {
            tipContent = allEducationalContent.experience[currentExperience as keyof typeof allEducationalContent.experience];
            tipTitle = "Experience Tip:";
            bgColor = "bg-blue-50";
            textColor = "text-blue-700";
            titleColor = "text-blue-800";
          } else {
            console.warn(`Educational content for experience '${currentExperience}' not found.`);
          }
        }
        break;
      case 'usage':
        if (preferences.usagePattern && allEducationalContent.usage) {
          tipContent = allEducationalContent.usage[preferences.usagePattern as keyof typeof allEducationalContent.usage];
          // if (preferences.primaryUse && allEducationalContent.primaryUse) { // This key does not exist on allEducationalContent
          //   const primaryUseTip = allEducationalContent.primaryUse[preferences.primaryUse as keyof typeof allEducationalContent.primaryUse];
          //   tipContent = primaryUseTip ? `${primaryUseTip} ${tipContent || ''}` : tipContent;
          // }
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

  return (
    <motion.div
      initial={{ opacity: 0, x: animationDirection === 'next' ? 100 : animationDirection === 'previous' ? -100 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animationDirection === 'next' ? -100 : animationDirection === 'previous' ? 100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex-grow flex flex-col justify-between" 
    >
      <div>{renderStepSpecificContent()}</div>

      <AnimatePresence>
        {currentEducationalContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }} 
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
