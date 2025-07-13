import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Type, List, BarChart3, Sliders, MessageSquare, HelpCircle
} from 'lucide-react';

export type QuestionType = 'WELCOME' | 'SINGLE_SELECT' | 'MULTI_SELECT' | 'RANKED_SELECT' | 'RANGE_SLIDER';

interface QuestionOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  order?: number;
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
  options: QuestionOption[];
}

interface QuestionEditorProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  questions,
  onQuestionsChange
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const questionTypes = [
    { value: 'WELCOME', label: 'Welcome Screen', icon: MessageSquare, description: 'Introduction or welcome message' },
    { value: 'SINGLE_SELECT', label: 'Single Choice', icon: Type, description: 'Select one option' },
    { value: 'MULTI_SELECT', label: 'Multiple Choice', icon: List, description: 'Select multiple options' },
    { value: 'RANKED_SELECT', label: 'Ranking', icon: BarChart3, description: 'Rank options in order' },
    { value: 'RANGE_SLIDER', label: 'Range Slider', icon: Sliders, description: 'Select value from range' }
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      text: 'New Question',
      type: 'SINGLE_SELECT',
      order: questions.length + 1,
      options: []
    };
    onQuestionsChange([...questions, newQuestion]);
    setExpandedQuestion(newQuestion.id);
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    );
    onQuestionsChange(updatedQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = questions
      .filter(q => q.id !== questionId)
      .map((q, index) => ({ ...q, order: index + 1 }));
    onQuestionsChange(updatedQuestions);
    setExpandedQuestion(null);
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newOption: QuestionOption = {
      id: `opt_${Date.now()}`,
      label: 'New Option',
      value: `option_${question.options.length + 1}`,
      order: question.options.length + 1
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption]
    });
  };

  const updateOption = (questionId: string, optionId: string, updates: Partial<QuestionOption>) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options.map(opt =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options
      .filter(opt => opt.id !== optionId)
      .map((opt, index) => ({ ...opt, order: index + 1 }));

    updateQuestion(questionId, { options: updatedOptions });
  };

  const getQuestionTypeInfo = (type: QuestionType) => {
    return questionTypes.find(qt => qt.value === type);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Questions</h3>
        <button
          onClick={addQuestion}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Question
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((question, index) => {
          const typeInfo = getQuestionTypeInfo(question.type);
          const isExpanded = expandedQuestion === question.id;

          return (
            <motion.div
              key={question.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical size={16} />
                    <span className="text-sm font-medium">#{question.order}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {typeInfo && <typeInfo.icon size={16} className="text-blue-600" />}
                      <span className="font-medium text-gray-800">{question.text}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {typeInfo?.label}
                      </span>
                    </div>
                    {question.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{question.subtitle}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-gray-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Question Text
                          </label>
                          <input
                            type="text"
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subtitle (Optional)
                          </label>
                          <input
                            type="text"
                            value={question.subtitle || ''}
                            onChange={(e) => updateQuestion(question.id, { subtitle: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Type
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                          {questionTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <button
                                key={type.value}
                                onClick={() => updateQuestion(question.id, { type: type.value as QuestionType })}
                                className={`p-3 rounded-lg border transition-colors ${
                                  question.type === type.value
                                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Icon size={16} className="mx-auto mb-1" />
                                <div className="text-xs font-medium">{type.label}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Range Slider Settings */}
                      {question.type === 'RANGE_SLIDER' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Min Value
                            </label>
                            <input
                              type="number"
                              value={question.rangeMin || 0}
                              onChange={(e) => updateQuestion(question.id, { rangeMin: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Max Value
                            </label>
                            <input
                              type="number"
                              value={question.rangeMax || 10}
                              onChange={(e) => updateQuestion(question.id, { rangeMax: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Step
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={question.rangeStep || 1}
                              onChange={(e) => updateQuestion(question.id, { rangeStep: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Default
                            </label>
                            <input
                              type="number"
                              value={question.rangeDefault || 5}
                              onChange={(e) => updateQuestion(question.id, { rangeDefault: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* Ranking Settings */}
                      {question.type === 'RANKED_SELECT' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maximum Rank
                          </label>
                          <input
                            type="number"
                            value={question.maxRank || 5}
                            onChange={(e) => updateQuestion(question.id, { maxRank: parseInt(e.target.value) })}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {/* Options for select types */}
                      {['SINGLE_SELECT', 'MULTI_SELECT', 'RANKED_SELECT'].includes(question.type) && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Options
                            </label>
                            <button
                              onClick={() => addOption(question.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <Plus size={14} />
                              Add Option
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div key={option.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-500 w-8">#{optIndex + 1}</span>
                                <input
                                  type="text"
                                  value={option.label}
                                  onChange={(e) => updateOption(question.id, option.id, { label: e.target.value })}
                                  placeholder="Option label"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="text"
                                  value={option.value}
                                  onChange={(e) => updateOption(question.id, option.id, { value: e.target.value })}
                                  placeholder="Option value"
                                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => deleteOption(question.id, option.id)}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <HelpCircle size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No questions yet</p>
          <p className="text-sm">Click "Add Question" to get started</p>
        </div>
      )}
    </div>
  );
};