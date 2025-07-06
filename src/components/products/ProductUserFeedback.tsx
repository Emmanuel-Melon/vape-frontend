import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface UserFeedbackData {
  bestFor: string[];
  notIdealFor: string[];
}

interface ProductUserFeedbackProps {
  feedback: UserFeedbackData;
}

const FeedbackSection = ({ title, items, icon, iconClass }: { title: string, items: string[], icon: React.ReactNode, iconClass: string }) => (
  <div>
    <h4 className="font-semibold text-slate-800 flex items-center mb-2">
      <span className={`mr-2 ${iconClass}`}>{icon}</span>
      {title}
    </h4>
    <ul className="list-disc list-inside space-y-1 text-slate-600">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export const ProductUserFeedback: React.FC<ProductUserFeedbackProps> = ({ feedback }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
      <FeedbackSection 
        title="Best For..."
        items={feedback.bestFor}
        icon={<ThumbsUp size={18} />}
        iconClass="text-green-500"
      />
      <FeedbackSection 
        title="Not Ideal For..."
        items={feedback.notIdealFor}
        icon={<ThumbsDown size={18} />}
        iconClass="text-red-500"
      />
    </div>
  );
};
