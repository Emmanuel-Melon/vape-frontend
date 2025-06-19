import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { CommunityTemplate } from '../../types/explore';
import { TemplateCard } from './TemplateCard';

interface FeaturedTemplatesProps {
  templates: CommunityTemplate[];
  likedTemplates: Set<string>;
  bookmarkedTemplates: Set<string>;
  onToggleLike: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onViewProfile: (id: string) => void;
  onViewTemplate: (id: string) => void;
  onUseTemplate: (template: CommunityTemplate) => void;
}

export const FeaturedTemplates: React.FC<FeaturedTemplatesProps> = ({
  templates,
  ...cardProps
}) => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Featured Templates</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <TemplateCard
            key={template.id}
            template={template}
            isLiked={cardProps.likedTemplates.has(template.id)}
            isBookmarked={cardProps.bookmarkedTemplates.has(template.id)}
            onToggleLike={cardProps.onToggleLike}
            onToggleBookmark={cardProps.onToggleBookmark}
            onViewProfile={cardProps.onViewProfile}
            onViewTemplate={cardProps.onViewTemplate}
            onUseTemplate={cardProps.onUseTemplate}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};
