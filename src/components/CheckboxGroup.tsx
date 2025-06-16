import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  name?: string; // Name for the group, useful for aria-label or form submission
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  name,
}) => {
  const handleChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };

  return (
    <div className="space-y-4" role="group" aria-label={name || 'Checkbox group'}>
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <motion.label
            key={option.value}
            htmlFor={`${name || 'checkbox'}-${option.value}`}
            className={`block p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg ${ 
              isSelected
                ? 'border-green-500 bg-green-50 shadow-md ring-2 ring-green-400'
                : 'border-gray-300 bg-white hover:border-green-400 shadow-sm'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start">
              {/* Visually Hidden Actual Checkbox Input */}
              <input
                type="checkbox"
                name={name ? `${name}-${option.value}` : option.value}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                disabled={option.disabled}
                className="sr-only" // Visually hidden
                id={`${name || 'checkbox'}-${option.value}`} // ID for the label
              />

              {/* Custom Checkbox Visual Indicator */}
              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 
                              ${isSelected ? 'border-green-600 bg-green-600' : 'border-gray-400 bg-white'}`}
              >
                {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>

              {/* Icon/Emoji + Text Content */}
              <div className="flex-1">
                <div className="flex items-center">
                  {option.emoji && (
                    <span className="text-xl mr-2 leading-none">{option.emoji}</span>
                  )}
                  <span className="text-base font-medium text-gray-800">{option.label}</span>
                </div>
                {option.description && (
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                )}
              </div>
            </div>
          </motion.label>
        );
      })}
    </div>
  );
};
