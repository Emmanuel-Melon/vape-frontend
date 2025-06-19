import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { CommunityTemplate } from '../../types/explore';

interface CommunityStatsProps {
  templates: CommunityTemplate[];
}

export const CommunityStats: React.FC<CommunityStatsProps> = ({ templates }) => {
  const totalTemplates = templates.length;
  const totalDownloads = templates.reduce((acc, t) => acc + t.downloads, 0);
  const totalLikes = templates.reduce((acc, t) => acc + t.likes, 0);
  const totalContributors = new Set(templates.map(t => t.author)).size;

  return (
    <motion.div
      className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Users size={20} />
        Community Impact
      </h3>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalTemplates}</div>
          <div className="text-sm text-gray-600">Templates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {totalDownloads.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Downloads</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {totalLikes.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {totalContributors}
          </div>
          <div className="text-sm text-gray-600">Contributors</div>
        </div>
      </div>
    </motion.div>
  );
};
