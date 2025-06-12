import React from 'react';
import { DollarSign } from 'lucide-react';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  experienceLevel: 'novice' | 'experienced' | null;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({ 
  value, 
  onChange, 
  min, 
  max, 
  experienceLevel 
}) => {
  const getBudgetCategory = (budget: number) => {
    if (budget < 100) return { label: 'Budget', color: 'text-green-600', description: 'Great starter options' };
    if (budget < 250) return { label: 'Mid-Range', color: 'text-blue-600', description: 'Quality and features' };
    if (budget < 400) return { label: 'Premium', color: 'text-purple-600', description: 'High-end performance' };
    return { label: 'Luxury', color: 'text-gold-600', description: 'Top-tier devices' };
  };

  const category = getBudgetCategory(value);
  const percentage = ((value - min) / (max - min)) * 100;

  // Suggested ranges based on experience
  const suggestedMin = experienceLevel === 'novice' ? 99 : 150;
  const suggestedMax = experienceLevel === 'novice' ? 250 : 400;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign size={24} className="text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-800">${value}</div>
              <div className={`text-sm font-medium ${category.color}`}>
                {category.label} - {category.description}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative mb-4">
          <input
            type="range"
            min={min}
            max={max}
            step="25"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10B981 0%, #10B981 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>${min}</span>
            <span>${max}</span>
          </div>
        </div>

        {experienceLevel && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm font-medium text-blue-800 mb-1">
              💡 Recommended for {experienceLevel} users
            </div>
            <div className="text-sm text-blue-700">
              ${suggestedMin} - ${suggestedMax} offers the best balance of quality and value for your experience level
            </div>
          </div>
        )}
      </div>

      {/* Quick Budget Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[99, 159, 299, 449].map((budget) => (
          <button
            key={budget}
            onClick={() => onChange(budget)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              value === budget
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <div className="font-medium">${budget}</div>
            <div className="text-xs text-gray-600">
              {getBudgetCategory(budget).label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};