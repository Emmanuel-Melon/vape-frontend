import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  name?: string;
  label?: string; // Optional label for the slider (e.g., "Price Range")
  unit?: string; // Optional unit for the value (e.g., "$")
  showValue?: boolean; // Whether to display the current value
  className?: string;
  inputClassName?: string;
  valueDisplayClassName?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  name,
  label,
  unit = '',
  showValue = true,
  className = 'w-full',
  inputClassName = 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700',
  valueDisplayClassName = 'text-sm text-gray-700 dark:text-gray-300 mt-1 text-center',
}) => {
  // Internal state to manage the displayed value during dragging, if needed for more complex interactions
  // For now, we'll directly use the 'value' prop for simplicity, assuming parent controls it.

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  };

  return (
    <div className={className}>
      {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className={inputClassName}
      />
      {showValue && (
        <div className={valueDisplayClassName}>
          {unit}{value}
        </div>
      )}
    </div>
  );
};
