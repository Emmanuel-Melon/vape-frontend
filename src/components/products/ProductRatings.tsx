import React from 'react';
import { motion } from 'framer-motion';

// Define the shape of the ratings data
interface RatingsData {
  vaporPotency: number;
  vaporComfort: number;
  portability: number;
  batteryLife: number;
  buildQuality: number;
  easeOfUse: number;
  maintenance: number;
  value: number;
}

interface ProductRatingsProps {
  ratings: RatingsData;
}

const RatingBar = ({ label, score }: { label: string, score: number }) => {
  const scorePercentage = score * 10;
  let colorClass = 'bg-green-500';
  if (score < 7) colorClass = 'bg-yellow-500';
  if (score < 4) colorClass = 'bg-red-500';

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-800">{score}/10</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${scorePercentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scorePercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const ProductRatings: React.FC<ProductRatingsProps> = ({ ratings }) => {
  const ratingItems = [
    { label: 'Vapor Potency', score: ratings.vaporPotency },
    { label: 'Vapor Comfort', score: ratings.vaporComfort },
    { label: 'Portability', score: ratings.portability },
    { label: 'Battery Life', score: ratings.batteryLife },
    { label: 'Build Quality', score: ratings.buildQuality },
    { label: 'Ease of Use', score: ratings.easeOfUse },
    { label: 'Maintenance', score: ratings.maintenance },
    { label: 'Value for Money', score: ratings.value },
  ];

  return (
    <div className="space-y-4 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800">Performance Scores</h3>
      {ratingItems.map(item => (
        <RatingBar key={item.label} label={item.label} score={item.score} />
      ))}
    </div>
  );
};
