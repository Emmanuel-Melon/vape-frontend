import React from 'react';
import { motion } from 'framer-motion';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  emoji?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange, name }) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <motion.label
          key={option.value}
          className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-green-300 ${
            value === option.value
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 bg-white/70 backdrop-blur-sm hover:bg-gray-50'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2">
                {option.emoji && (
                  <motion.span 
                    className="text-xl"
                    animate={{ rotate: value === option.value ? [0, 10, -10, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {option.emoji}
                  </motion.span>
                )}
                <div className="text-sm font-medium text-gray-900">{option.label}</div>
              </div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-1">{option.description}</div>
              )}
            </div>
          </div>
        </motion.label>
      ))}
    </div>
  );
};