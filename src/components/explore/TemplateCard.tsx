import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Bookmark, Settings } from 'lucide-react';
import { CommunityTemplate } from '../../types/explore';
import { getCategoryColor, getBadgeColor, getBadgeIcon } from '../../utils/style-helpers';

interface TemplateCardProps {
  template: CommunityTemplate;
  isLiked: boolean;
  isBookmarked: boolean;
  onToggleLike: (id: string) => void;
  onToggleBookmark: (id: string) => void;
  onViewProfile: (id: string) => void;
  onViewTemplate: (id: string) => void;
  onUseTemplate: (template: CommunityTemplate) => void;
  index: number;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isLiked,
  isBookmarked,
  onToggleLike,
  onToggleBookmark,
  onViewProfile,
  onViewTemplate,
  onUseTemplate,
  index,
}) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center mb-3">
          <img
            src={template.authorAvatar}
            alt={template.author}
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
            onClick={() => onViewProfile(template.authorId)}
          />
          <div className="flex-1">
            <div className="flex items-center">
              <h3
                className="font-bold text-gray-800 cursor-pointer"
                onClick={() => onViewProfile(template.authorId)}
              >
                {template.author}
              </h3>
              {template.authorBadge && (
                <span
                  className={`ml-2 w-4 h-4 text-white text-xs flex items-center justify-center rounded-full ${getBadgeColor(template.authorBadge)}`}
                  title={template.authorBadge.charAt(0).toUpperCase() + template.authorBadge.slice(1)}
                >
                  {getBadgeIcon(template.authorBadge)}
                </span>
              )}
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(template.category)}`}>
              {template.category}
            </span>
          </div>
          <button
            onClick={() => onToggleLike(template.id)}
            className={`flex items-center gap-1 text-sm transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            {template.likes + (isLiked ? 1 : 0)}
          </button>
        </div>
        
        {/* Template Title and Description */}
        <h2
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer"
          onClick={() => onViewTemplate(template.id)}
        >
          {template.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">
          {template.description}
        </p>
        
        {/* Vaporizer Info */}
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-4 border border-gray-200">
          <img
            src={template.vaporizer.image}
            alt={template.vaporizer.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">{template.vaporizer.name}</h4>
            <p className="text-sm text-gray-600">{template.vaporizer.brand}</p>
            <p className="text-sm font-bold text-green-600">${template.vaporizer.price}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-green-600">{template.vaporizer.matchScore}%</div>
            <div className="text-xs text-gray-500">match</div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Three buttons at the bottom */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewTemplate(template.id)}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
          >
            <Eye size={14} />
            View
          </button>
          <button
            onClick={() => onToggleBookmark(template.id)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center ${
              isBookmarked
                ? 'bg-blue-100 text-blue-600 border border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onUseTemplate(template)}
            className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium flex items-center justify-center border border-orange-300"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
