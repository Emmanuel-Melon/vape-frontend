import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Package, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'user_registered' | 'product_listed' | 'purchase_made' | 'report_submitted' | 'user_verified';
  message: string;
  timestamp: string;
  user?: string;
  amount?: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered': return <User size={16} className="text-blue-600" />;
      case 'product_listed': return <Package size={16} className="text-green-600" />;
      case 'purchase_made': return <DollarSign size={16} className="text-purple-600" />;
      case 'report_submitted': return <AlertTriangle size={16} className="text-red-600" />;
      case 'user_verified': return <CheckCircle size={16} className="text-emerald-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_registered': return 'bg-blue-100 border-blue-200';
      case 'product_listed': return 'bg-green-100 border-green-200';
      case 'purchase_made': return 'bg-purple-100 border-purple-200';
      case 'report_submitted': return 'bg-red-100 border-red-200';
      case 'user_verified': return 'bg-emerald-100 border-emerald-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${getActivityColor(activity.type)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                {activity.user && (
                  <span className="text-xs text-blue-600 font-medium">by {activity.user}</span>
                )}
                {activity.amount && (
                  <span className="text-xs text-green-600 font-medium">${activity.amount}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};