import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowLeft, ArrowRight, Play, Eye, RotateCcw, 
  CheckCircle, Circle, Square, BarChart3, Sliders,
  MessageSquare, Star, Heart, ThumbsUp, Edit3, Save,
  Plus, Trash2, Settings
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

interface Quiz {
  id?: number;
  title: string;
  description: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
}

interface QuizPreviewProps {
  quiz: Quiz;
  questions: Question[];
  onClose: () => void;
  onSave?: (questions: Question[]) => void;
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({
  quiz,
  questions: initialQuestions,
  onClose,
  onSave
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingField, setEditingField] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetPreview = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const updateOption = (questionId: string, optionId: string, updates: Partial<QuestionOption>) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? {
            ...q,
            options: q.options.map(opt => 
              opt.id === optionId ? { ...opt, ...updates } : opt
            )
          }
        : q
    ));
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

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedOptions = question.options
      .filter(opt => opt.id !== optionId)
      .map((opt, index) => ({ ...opt, order: index + 1 }));

    updateQuestion(questionId, { options: updatedOptions });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(questions);
    }
    setIsEditMode(false);
  };

  const getQuestionIcon = (type: QuestionType) => {
    switch (type) {
      case 'WELCOME': return MessageSquare;
      case 'SINGLE_SELECT': return Circle;
      case 'MULTI_SELECT': return Square;
      case 'RANKED_SELECT': return BarChart3;
      case 'RANGE_SLIDER': return Sliders;
      default: return Circle;
    }
  };

  const EditableText: React.FC<{
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    multiline?: boolean;
  }> = ({ value, onChange, className = '', placeholder = '', multiline = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
      onChange(tempValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setTempValue(value);
      setIsEditing(false);
    };

    if (!isEditMode) {
      return <span className={className}>{value}</span>;
    }

    if (isEditing) {
      return (
        <div className="relative">
          {multiline ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`${className} border-2 border-blue-500 rounded px-2 py-1 bg-white resize-none`}
              placeholder={placeholder}
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className={`${className} border-2 border-blue-500 rounded px-2 py-1 bg-white`}
              placeholder={placeholder}
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
            />
          )}
        </div>
      );
    }

    return (
      <div 
        className={`${className} cursor-pointer hover:bg-blue-50 rounded px-2 py-1 transition-colors relative group`}
        onClick={() => setIsEditing(true)}
      >
        {value || <span className="text-gray-400">{placeholder}</span>}
        <Edit3 size={12} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 text-blue-500 bg-white rounded shadow" />
      </div>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const currentAnswer = answers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'WELCOME':
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Heart className="text-white" size={32} />
            </div>
            <div>
              <EditableText
                value={currentQuestion.text}
                onChange={(value) => updateQuestion(currentQuestion.id, { text: value })}
                className="text-3xl font-bold text-gray-800 mb-4 block"
                placeholder="Welcome message title"
              />
              {(currentQuestion.subtitle || isEditMode) && (
                <EditableText
                  value={currentQuestion.subtitle || ''}
                  onChange={(value) => updateQuestion(currentQuestion.id, { subtitle: value })}
                  className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed block"
                  placeholder="Welcome message description"
                  multiline
                />
              )}
            </div>
            <motion.button
              onClick={nextQuestion}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={20} />
              Get Started
            </motion.button>
          </motion.div>
        );

      case 'SINGLE_SELECT':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <EditableText
                value={currentQuestion.text}
                onChange={(value) => updateQuestion(currentQuestion.id, { text: value })}
                className="text-2xl font-bold text-gray-800 mb-2 block"
                placeholder="Question text"
              />
              {(currentQuestion.subtitle || isEditMode) && (
                <EditableText
                  value={currentQuestion.subtitle || ''}
                  onChange={(value) => updateQuestion(currentQuestion.id, { subtitle: value })}
                  className="text-gray-600 block"
                  placeholder="Question subtitle (optional)"
                />
              )}
            </div>
            <div className="grid gap-3 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={option.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    currentAnswer === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${isEditMode ? 'relative group' : 'cursor-pointer'}`}
                  onClick={() => !isEditMode && handleAnswer(currentQuestion.id, option.value)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isEditMode ? 1 : 1.02 }}
                  whileTap={{ scale: isEditMode ? 1 : 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      currentAnswer === option.value
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <EditableText
                        value={option.label}
                        onChange={(value) => updateOption(currentQuestion.id, option.id, { label: value })}
                        className="font-medium text-gray-800 block"
                        placeholder="Option label"
                      />
                      {(option.description || isEditMode) && (
                        <EditableText
                          value={option.description || ''}
                          onChange={(value) => updateOption(currentQuestion.id, option.id, { description: value })}
                          className="text-sm text-gray-600 mt-1 block"
                          placeholder="Option description (optional)"
                        />
                      )}
                    </div>
                    {isEditMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOption(currentQuestion.id, option.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isEditMode && (
                <motion.button
                  onClick={() => addOption(currentQuestion.id)}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Option
                </motion.button>
              )}
            </div>
          </div>
        );

      case 'MULTI_SELECT':
        const multiAnswers = currentAnswer || [];
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <EditableText
                value={currentQuestion.text}
                onChange={(value) => updateQuestion(currentQuestion.id, { text: value })}
                className="text-2xl font-bold text-gray-800 mb-2 block"
                placeholder="Question text"
              />
              {(currentQuestion.subtitle || isEditMode) && (
                <EditableText
                  value={currentQuestion.subtitle || ''}
                  onChange={(value) => updateQuestion(currentQuestion.id, { subtitle: value })}
                  className="text-gray-600 block"
                  placeholder="Question subtitle (optional)"
                />
              )}
              <p className="text-sm text-blue-600 mt-2">Select all that apply</p>
            </div>
            <div className="grid gap-3 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => {
                const isSelected = multiAnswers.includes(option.value);
                return (
                  <motion.div
                    key={option.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${isEditMode ? 'relative group' : 'cursor-pointer'}`}
                    onClick={() => {
                      if (!isEditMode) {
                        const newAnswers = isSelected
                          ? multiAnswers.filter((a: string) => a !== option.value)
                          : [...multiAnswers, option.value];
                        handleAnswer(currentQuestion.id, newAnswers);
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: isEditMode ? 1 : 1.02 }}
                    whileTap={{ scale: isEditMode ? 1 : 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <CheckCircle className="text-white" size={12} />
                        )}
                      </div>
                      <div className="flex-1">
                        <EditableText
                          value={option.label}
                          onChange={(value) => updateOption(currentQuestion.id, option.id, { label: value })}
                          className="font-medium text-gray-800 block"
                          placeholder="Option label"
                        />
                        {(option.description || isEditMode) && (
                          <EditableText
                            value={option.description || ''}
                            onChange={(value) => updateOption(currentQuestion.id, option.id, { description: value })}
                            className="text-sm text-gray-600 mt-1 block"
                            placeholder="Option description (optional)"
                          />
                        )}
                      </div>
                      {isEditMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOption(currentQuestion.id, option.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              {isEditMode && (
                <motion.button
                  onClick={() => addOption(currentQuestion.id)}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 hover:text-green-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Option
                </motion.button>
              )}
            </div>
          </div>
        );

      case 'RANKED_SELECT':
        const rankedAnswers = currentAnswer || [];
        const maxRank = currentQuestion.maxRank || 5;
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <EditableText
                value={currentQuestion.text}
                onChange={(value) => updateQuestion(currentQuestion.id, { text: value })}
                className="text-2xl font-bold text-gray-800 mb-2 block"
                placeholder="Question text"
              />
              {(currentQuestion.subtitle || isEditMode) && (
                <EditableText
                  value={currentQuestion.subtitle || ''}
                  onChange={(value) => updateQuestion(currentQuestion.id, { subtitle: value })}
                  className="text-gray-600 block"
                  placeholder="Question subtitle (optional)"
                />
              )}
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-sm text-purple-600">
                  Rank your top {maxRank} choices (1 = most important)
                </p>
                {isEditMode && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Max rank:</span>
                    <input
                      type="number"
                      value={maxRank}
                      onChange={(e) => updateQuestion(currentQuestion.id, { maxRank: parseInt(e.target.value) })}
                      className="w-12 px-1 py-0.5 text-xs border border-gray-300 rounded"
                      min="1"
                      max="10"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-3 max-w-2xl mx-auto">
              {currentQuestion.options.map((option, index) => {
                const rank = rankedAnswers.findIndex((a: string) => a === option.value) + 1;
                const isRanked = rank > 0;
                const canRank = rankedAnswers.length < maxRank || isRanked;
                
                return (
                  <motion.div
                    key={option.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      isRanked
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : canRank
                        ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        : 'border-gray-100 bg-gray-50 opacity-50'
                    } ${isEditMode ? 'relative group' : canRank ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => {
                      if (!isEditMode && canRank) {
                        if (isRanked) {
                          const newAnswers = rankedAnswers.filter((a: string) => a !== option.value);
                          handleAnswer(currentQuestion.id, newAnswers);
                        } else {
                          const newAnswers = [...rankedAnswers, option.value];
                          handleAnswer(currentQuestion.id, newAnswers);
                        }
                      }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={canRank && !isEditMode ? { scale: 1.02 } : {}}
                    whileTap={canRank && !isEditMode ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                        isRanked
                          ? 'border-purple-500 bg-purple-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {isRanked ? rank : '?'}
                      </div>
                      <div className="flex-1">
                        <EditableText
                          value={option.label}
                          onChange={(value) => updateOption(currentQuestion.id, option.id, { label: value })}
                          className="font-medium text-gray-800 block"
                          placeholder="Option label"
                        />
                        {(option.description || isEditMode) && (
                          <EditableText
                            value={option.description || ''}
                            onChange={(value) => updateOption(currentQuestion.id, option.id, { description: value })}
                            className="text-sm text-gray-600 mt-1 block"
                            placeholder="Option description (optional)"
                          />
                        )}
                      </div>
                      {isEditMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOption(currentQuestion.id, option.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              {isEditMode && (
                <motion.button
                  onClick={() => addOption(currentQuestion.id)}
                  className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Add Option
                </motion.button>
              )}
            </div>
          </div>
        );

      case 'RANGE_SLIDER':
        const rangeValue = currentAnswer !== undefined ? currentAnswer : (currentQuestion.rangeDefault || 5);
        const min = currentQuestion.rangeMin || 0;
        const max = currentQuestion.rangeMax || 10;
        const step = currentQuestion.rangeStep || 1;
        
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <EditableText
                value={currentQuestion.text}
                onChange={(value) => updateQuestion(currentQuestion.id, { text: value })}
                className="text-2xl font-bold text-gray-800 mb-2 block"
                placeholder="Question text"
              />
              {(currentQuestion.subtitle || isEditMode) && (
                <EditableText
                  value={currentQuestion.subtitle || ''}
                  onChange={(value) => updateQuestion(currentQuestion.id, { subtitle: value })}
                  className="text-gray-600 block"
                  placeholder="Question subtitle (optional)"
                />
              )}
            </div>
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{rangeValue}</div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
                {isEditMode && (
                  <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                    <div>
                      <label className="block text-gray-600 mb-1">Min</label>
                      <input
                        type="number"
                        value={min}
                        onChange={(e) => updateQuestion(currentQuestion.id, { rangeMin: parseFloat(e.target.value) })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Max</label>
                      <input
                        type="number"
                        value={max}
                        onChange={(e) => updateQuestion(currentQuestion.id, { rangeMax: parseFloat(e.target.value) })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Step</label>
                      <input
                        type="number"
                        step="0.1"
                        value={step}
                        onChange={(e) => updateQuestion(currentQuestion.id, { rangeStep: parseFloat(e.target.value) })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Default</label>
                      <input
                        type="number"
                        value={currentQuestion.rangeDefault || 5}
                        onChange={(e) => updateQuestion(currentQuestion.id, { rangeDefault: parseFloat(e.target.value) })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={rangeValue}
                  onChange={(e) => handleAnswer(currentQuestion.id, parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((rangeValue - min) / (max - min)) * 100}%, #e5e7eb ${((rangeValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full shadow-lg pointer-events-none"
                  style={{ left: `calc(${((rangeValue - min) / (max - min)) * 100}% - 12px)` }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown question type</div>;
    }
  };

  if (questions.length === 0) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 text-center"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Questions Yet</h2>
          <p className="text-gray-600 mb-6">This quiz doesn't have any questions to preview.</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close Preview
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="text-blue-600" size={20} />
              <h2 className="text-xl font-bold text-gray-800">Quiz Preview</h2>
              {isEditMode && (
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  Edit Mode
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {quiz.title}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setQuestions(initialQuestions);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
                <button
                  onClick={resetPreview}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderQuestion()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isFirstQuestion
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => {
              const Icon = getQuestionIcon(questions[index].type);
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : index < currentQuestionIndex
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>

          <button
            onClick={nextQuestion}
            disabled={isLastQuestion}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLastQuestion
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-md'
            }`}
          >
            {isLastQuestion ? 'Complete' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};