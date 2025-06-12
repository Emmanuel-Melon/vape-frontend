import React from 'react';
import { Star, Zap, Wind, Battery, Shield, Wrench, DollarSign, Heart } from 'lucide-react';

interface PrioritySliderProps {
  priorities: {
    vaporPotency: number;
    vaporComfort: number;
    portability: number;
    batteryLife: number;
    buildQuality: number;
    easeOfUse: number;
    maintenance: number;
    value: number;
  };
  onChange: (priorities: PrioritySliderProps['priorities']) => void;
}

const priorityConfig = [
  { key: 'vaporPotency', label: 'Vapor Potency', icon: Zap, description: 'Strength and density of vapor' },
  { key: 'vaporComfort', label: 'Vapor Smoothness', icon: Heart, description: 'Gentle on throat and lungs' },
  { key: 'portability', label: 'Portability', icon: Wind, description: 'Size and discretion' },
  { key: 'batteryLife', label: 'Battery Life', icon: Battery, description: 'Usage time between charges' },
  { key: 'buildQuality', label: 'Build Quality', icon: Shield, description: 'Durability and materials' },
  { key: 'easeOfUse', label: 'Ease of Use', icon: Star, description: 'Simple operation and learning curve' },
  { key: 'maintenance', label: 'Low Maintenance', icon: Wrench, description: 'Easy to clean and maintain' },
  { key: 'value', label: 'Value for Money', icon: DollarSign, description: 'Performance per dollar spent' }
];

export const PrioritySlider: React.FC<PrioritySliderProps> = ({ priorities, onChange }) => {
  const handleSliderChange = (key: string, value: number) => {
    onChange({
      ...priorities,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      {priorityConfig.map(({ key, label, icon: Icon, description }) => (
        <div key={key} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Icon size={20} className="text-blue-600" />
              <div>
                <div className="font-medium text-gray-800">{label}</div>
                <div className="text-sm text-gray-600">{description}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {priorities[key as keyof typeof priorities]}
            </div>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={priorities[key as keyof typeof priorities]}
              onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(priorities[key as keyof typeof priorities] - 1) * 11.11}%, #E5E7EB ${(priorities[key as keyof typeof priorities] - 1) * 11.11}%, #E5E7EB 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};