import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, Edit, Trash2, Eye, Users, Calendar, 
  CheckCircle, XCircle, Play, Pause, BarChart3 
} from 'lucide-react';

interface Quiz {
  id: number;
  title: string;
  description: string;
  questionCount: number;
  totalAttempts: number;
  completionRate: number;
  avgScore: number;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

interface QuizManagementCardProps {
  quiz: Quiz;
  index: number;
  onAction: (action: string, quiz: Quiz) => void;
}

export const QuizManagementCard: React.FC<QuizManagementCardProps> = ({
  quiz,
  index,
  onAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Play size={12} className="text-green-600" />;
      case 'DRAFT': return <Pause size={12} className="text-yellow-600" />;
      case 'ARCHIVED': return <XCircle size={12} className="text-gray-600" />;
      default: return <HelpCircle size={12} className="text-gray-600" />;
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={20} className="text-blue-600" />
            <h3 className="font-semibold text-gray-800 truncate">{quiz.title}</h3>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{quiz.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(quiz.status)}`}>
            {getStatusIcon(quiz.status)}
            {quiz.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-600">Questions:</span>
          <p className="font-medium text-blue-600">{quiz.questionCount}</p>
        </div>
        <div>
          <span className="text-gray-600">Attempts:</span>
          <p className="font-medium text-green-600">{quiz.totalAttempts}</p>
        </div>
        <div>
          <span className="text-gray-600">Completion:</span>
          <p className="font-medium text-purple-600">{quiz.completionRate}%</p>
        </div>
        <div>
          <span className="text-gray-600">Avg Score:</span>
          <p className="font-medium text-orange-600">{quiz.avgScore}/10</p>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        <div>Created: {new Date(quiz.createdAt).toLocaleDateString()}</div>
        <div>Updated: {new Date(quiz.updatedAt).toLocaleDateString()}</div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction('view', quiz)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
        >
          <Eye size={14} />
          View
        </button>
        <button
          onClick={() => onAction('edit', quiz)}
          className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={() => onAction('analytics', quiz)}
          className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <BarChart3 size={14} />
        </button>
        <button
          onClick={() => onAction('delete', quiz)}
          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
};