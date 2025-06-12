import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Check } from 'lucide-react';

interface SaveResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nickname: string) => void;
  defaultNickname: string;
}

export const SaveResultModal: React.FC<SaveResultModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultNickname
}) => {
  const [nickname, setNickname] = useState(defaultNickname);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
    onSave(nickname);
    setIsSaving(false);
    onClose();
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
          className="bg-white rounded-xl shadow-2xl max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Save size={24} />
                <div>
                  <h2 className="text-xl font-bold">Save Your Results</h2>
                  <p className="text-green-100 text-sm">Give your quiz result a memorable name</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Result Name
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., My Perfect Vape, Weekend Session Setup..."
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                You can change this name later if needed
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!nickname.trim() || isSaving}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Save Result
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};