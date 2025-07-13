import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Eye, Settings } from 'lucide-react';
import { QuestionEditor, QuestionType } from './QuestionEditor';

interface Quiz {
  id?: number;
  title: string;
  description: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
}

interface Question {
  id: string;
  text: string;
  subtitle?: string;
  type: QuestionType;
  order: number;
  maxRank?: number;
  rangeMin?: number;
  rangeMax?: number;
  rangeStep?: number;
  rangeDefault?: number;
  options: Array<{
    id: string;
    label: string;
    value: string;
    description?: string;
    order?: number;
  }>;
}

interface QuizEditorProps {
  quiz?: Quiz;
  onSave: (quiz: Quiz, questions: Question[]) => void;
  onCancel: () => void;
}

export const QuizEditor: React.FC<QuizEditorProps> = ({
  quiz,
  onSave,
  onCancel
}) => {
  const [quizData, setQuizData] = useState<Quiz>({
    title: quiz?.title || 'New Quiz',
    description: quiz?.description || '',
    status: quiz?.status || 'DRAFT'
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<'settings' | 'questions'>('settings');

  const handleSave = () => {
    onSave(quizData, questions);
  };

  const tabs = [
    { id: 'settings', label: 'Quiz Settings', icon: Settings },
    { id: 'questions', label: 'Questions', icon: Eye }
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {quiz ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            <p className="text-gray-600">Design your quiz questions and settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={16} />
              Save Quiz
            </button>
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={quizData.title}
                    onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={quizData.status}
                    onChange={(e) => setQuizData({ ...quizData, status: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="ACTIVE">Active</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quiz description"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Quiz Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Start with a welcome question to introduce the quiz</li>
                  <li>• Use single select for basic preference questions</li>
                  <li>• Use multi-select when users can choose multiple options</li>
                  <li>• Use ranking for priority-based questions</li>
                  <li>• Use range sliders for numeric preferences</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <QuestionEditor
              questions={questions}
              onQuestionsChange={setQuestions}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};