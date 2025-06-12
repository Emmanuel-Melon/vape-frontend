import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Star, Trash2, Edit3, Check, Calendar } from 'lucide-react';
import { SavedQuizResult } from '../types/vaporizer';
import { getSavedQuizResults, deleteSavedQuizResult, updateQuizResultNickname } from '../utils/quizStorage';

interface SavedResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadResult: (result: SavedQuizResult) => void;
}

export const SavedResultsModal: React.FC<SavedResultsModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoadResult 
}) => {
  const [savedResults, setSavedResults] = useState<SavedQuizResult[]>(getSavedQuizResults());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNickname, setEditingNickname] = useState('');

  const handleDelete = (id: string) => {
    deleteSavedQuizResult(id);
    setSavedResults(getSavedQuizResults());
  };

  const handleEditStart = (result: SavedQuizResult) => {
    setEditingId(result.id);
    setEditingNickname(result.nickname || '');
  };

  const handleEditSave = (id: string) => {
    updateQuizResultNickname(id, editingNickname);
    setSavedResults(getSavedQuizResults());
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingNickname('');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Saved Quiz Results</h2>
                <p className="text-green-100">View and manage your previous recommendations</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {savedResults.length === 0 ? (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Saved Results</h3>
                <p className="text-gray-500">Complete a quiz to save your recommendations here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        {editingId === result.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingNickname}
                              onChange={(e) => setEditingNickname(e.target.value)}
                              className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              autoFocus
                            />
                            <button
                              onClick={() => handleEditSave(result.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{result.nickname}</h3>
                            <button
                              onClick={() => handleEditStart(result)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <Edit3 size={14} />
                            </button>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(result.timestamp)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={14} />
                            {result.result.matchScore}% match
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={result.result.primaryRecommendation.image}
                        alt={result.result.primaryRecommendation.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {result.result.primaryRecommendation.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {result.result.primaryRecommendation.brand}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${result.result.primaryRecommendation.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Experience: <span className="font-medium capitalize">{result.preferences.cannabisExperience}</span>
                        {result.preferences.budget && (
                          <span className="ml-4">Budget: <span className="font-medium">${result.preferences.budget}</span></span>
                        )}
                      </div>
                      <button
                        onClick={() => onLoadResult(result)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        View Result
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};