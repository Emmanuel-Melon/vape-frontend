import React from 'react';
import { motion } from 'framer-motion';
import { CommunityTemplate } from '../../types/explore';
import { TemplateCard } from './TemplateCard';
import { Pagination } from '../Pagination';

interface TemplatesGridProps {
  templates: CommunityTemplate[];
  likedTemplates: Set<string>;
  bookmarkedTemplates: Set<string>;
  onToggleLike: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onViewProfile: (id: string) => void;
  onViewTemplate: (id: string) => void;
  onUseTemplate: (template: CommunityTemplate) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const TemplatesGrid: React.FC<TemplatesGridProps> = ({
  templates,
  currentPage,
  totalPages,
  onPageChange,
  ...cardProps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {templates.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700">No templates found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {totalPages > 1 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                className="justify-center"
              />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};
