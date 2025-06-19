import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Trash2, Edit3, Check, X, Search, SortDesc, Eye } from 'lucide-react';
import { SavedQuizResult } from '../types/vaporizer';
import { CloudBackground } from './CloudBackground';
import { Pagination } from './Pagination';
import { Footer } from './Footer';

// Dummy saved results with stock images
const dummyResults: SavedQuizResult[] = [
  {
    id: '1',
    timestamp: Date.now() - 86400000, // 1 day ago
    nickname: 'My Perfect Daily Driver',
    preferences: {
      cannabisExperience: 'experienced',
      primaryUse: 'recreational',
      usagePattern: 'daily',
      userType: 'flavor-chaser',
      portability: 'portable',
      budget: 350,
      priorities: {
        vaporPotency: 8,
        vaporComfort: 9,
        portability: 7,
        batteryLife: 8,
        buildQuality: 9,
        easeOfUse: 6,
        maintenance: 7,
        value: 8
      }
    },
    result: {
      primaryRecommendation: {
        id: 'tinymight2',
        name: 'TinyMight 2',
        brand: 'TinyMight',
        price: 349,
        image: 'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'mid-range',
        heatingMethod: 'convection',
        type: 'portable',
        ratings: {
          vaporPotency: 10,
          vaporComfort: 7,
          portability: 8,
          batteryLife: 7,
          buildQuality: 8,
          easeOfUse: 6,
          maintenance: 6,
          value: 8
        },
        features: ['On-demand heating', 'Powerful extraction', 'Artisan crafted'],
        pros: ['Incredible potency', 'Fast extraction'],
        cons: ['Learning curve', 'Fragile'],
        bestFor: ['Power users', 'On-demand preference'],
        notIdealFor: ['Beginners', 'Clumsy users'],
        warranty: '1 year',
        maintenanceLevel: 'medium',
        learningCurve: 'steep',
        matchScore: 92
      },
      alternatives: [],
      explanation: 'Perfect for experienced users seeking powerful performance',
      educationalContent: {
        temperatureGuide: [],
        maintenanceTips: []
      },
      matchScore: 92
    }
  },
  // Generate more dummy results for pagination demo with different stock images
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 2}`,
    timestamp: Date.now() - (i + 2) * 86400000,
    nickname: `Quiz Result ${i + 2}`,
    preferences: {
      cannabisExperience: ['novice', 'experienced'][Math.floor(Math.random() * 2)] as 'novice' | 'experienced',
      primaryUse: ['medical', 'recreational', 'both'][Math.floor(Math.random() * 3)] as 'medical' | 'recreational' | 'both',
      usagePattern: ['casual', 'daily', 'heavy', 'microdose'][Math.floor(Math.random() * 4)] as any,
      userType: ['flavor-chaser', 'on-the-go', 'home-primary', 'efficiency-focused'][Math.floor(Math.random() * 4)] as any,
      portability: ['pocket-size', 'portable', 'desktop', 'no-preference'][Math.floor(Math.random() * 4)] as any,
      budget: Math.floor(Math.random() * 500) + 100,
      priorities: {
        vaporPotency: Math.floor(Math.random() * 10) + 1,
        vaporComfort: Math.floor(Math.random() * 10) + 1,
        portability: Math.floor(Math.random() * 10) + 1,
        batteryLife: Math.floor(Math.random() * 10) + 1,
        buildQuality: Math.floor(Math.random() * 10) + 1,
        easeOfUse: Math.floor(Math.random() * 10) + 1,
        maintenance: Math.floor(Math.random() * 10) + 1,
        value: Math.floor(Math.random() * 10) + 1
      }
    },
    result: {
      primaryRecommendation: {
        id: `vape-${i}`,
        name: ['ONE', 'TinyMight 2', 'Mighty+', 'Volcano Hybrid'][Math.floor(Math.random() * 4)],
        brand: ['Planet of the Vapes', 'TinyMight', 'Storz & Bickel'][Math.floor(Math.random() * 3)],
        price: Math.floor(Math.random() * 500) + 99,
        image: [
          'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/6663574/pexels-photo-6663574.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/7148624/pexels-photo-7148624.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/5797992/pexels-photo-5797992.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/6663575/pexels-photo-6663575.jpeg?auto=compress&cs=tinysrgb&w=400'
        ][Math.floor(Math.random() * 6)],
        category: 'mid-range' as any,
        heatingMethod: 'convection' as any,
        type: 'portable' as any,
        ratings: {
          vaporPotency: Math.floor(Math.random() * 10) + 1,
          vaporComfort: Math.floor(Math.random() * 10) + 1,
          portability: Math.floor(Math.random() * 10) + 1,
          batteryLife: Math.floor(Math.random() * 10) + 1,
          buildQuality: Math.floor(Math.random() * 10) + 1,
          easeOfUse: Math.floor(Math.random() * 10) + 1,
          maintenance: Math.floor(Math.random() * 10) + 1,
          value: Math.floor(Math.random() * 10) + 1
        },
        features: ['Feature 1', 'Feature 2'],
        pros: ['Pro 1', 'Pro 2'],
        cons: ['Con 1', 'Con 2'],
        bestFor: ['Users'],
        notIdealFor: ['Others'],
        warranty: '1 year',
        maintenanceLevel: 'medium' as any,
        learningCurve: 'easy' as any,
        matchScore: Math.floor(Math.random() * 30) + 70
      },
      alternatives: [],
      explanation: 'Great choice for your needs',
      educationalContent: {
        temperatureGuide: [],
        maintenanceTips: []
      },
      matchScore: Math.floor(Math.random() * 30) + 70
    }
  }))
];

const ITEMS_PER_PAGE = 12;

export const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const [savedResults, setSavedResults] = useState<SavedQuizResult[]>(dummyResults);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNickname, setEditingNickname] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'match' | 'price'>('date');
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (id: string) => {
    setSavedResults(prev => prev.filter(result => result.id !== id));
  };

  const handleEditStart = (result: SavedQuizResult) => {
    setEditingId(result.id);
    setEditingNickname(result.nickname || '');
  };

  const handleEditSave = (id: string) => {
    setSavedResults(prev => prev.map(result => 
      result.id === id ? { ...result, nickname: editingNickname } : result
    ));
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingNickname('');
  };

  const handleViewResult = (id: string) => {
    navigate(`/results/${id}`);
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

  const filteredAndSortedResults = savedResults
    .filter(result => 
      result.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.result.primaryRecommendation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.result.primaryRecommendation.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.timestamp - a.timestamp;
        case 'match':
          return b.result.matchScore - a.result.matchScore;
        case 'price':
          return a.result.primaryRecommendation.price - b.result.primaryRecommendation.price;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = filteredAndSortedResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📚
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Saved Recommendations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal collection of vaporizer recommendations. Easily access and manage your saved quiz results.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search saved results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <SortDesc size={20} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'match' | 'price')}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="match">Sort by Match %</option>
                  <option value="price">Sort by Price</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Grid */}
        {paginatedResults.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">
              {searchTerm ? 'No results found' : 'No saved results yet'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Complete the vaporizer finder quiz to save your first recommendation'
              }
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Results ({filteredAndSortedResults.length})
              </h2>
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedResults.length)} of {filteredAndSortedResults.length} results
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={result.result.primaryRecommendation.image}
                      alt={result.result.primaryRecommendation.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    {/* Additional overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[400px]">
                    {/* Top Section - Title and Actions */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {editingId === result.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editingNickname}
                                onChange={(e) => setEditingNickname(e.target.value)}
                                className="flex-1 px-3 py-2 text-white bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70"
                                autoFocus
                                placeholder="Enter nickname..."
                              />
                              <button
                                onClick={() => handleEditSave(result.id)}
                                className="p-2 bg-green-500/80 hover:bg-green-500 rounded-lg transition-colors"
                              >
                                <Check size={16} className="text-white" />
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                              >
                                <X size={16} className="text-white" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-white drop-shadow-lg">{result.nickname}</h3>
                              <button
                                onClick={() => handleEditStart(result)}
                                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Edit3 size={14} className="text-white" />
                              </button>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} className="text-white" />
                        </button>
                      </div>
                      
                      {/* Date and Match Score */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <Calendar size={14} />
                          {formatDate(result.timestamp)}
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Star size={14} className="text-yellow-400" />
                          <span className="text-white font-bold">{result.result.matchScore}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Product Info */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-center mb-4">
                        <h4 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
                          {result.result.primaryRecommendation.name}
                        </h4>
                        <p className="text-white/90 text-lg mb-2">
                          {result.result.primaryRecommendation.brand}
                        </p>
                        <p className="text-3xl font-bold text-green-400 drop-shadow-lg">
                          ${result.result.primaryRecommendation.price}
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-xs text-white/80 mb-1">Experience</div>
                          <div className="font-bold text-white capitalize text-sm">
                            {result.preferences.cannabisExperience}
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                          <div className="text-xs text-white/80 mb-1">Budget</div>
                          <div className="font-bold text-white text-sm">
                            ${result.preferences.budget}
                          </div>
                        </div>
                      </div>

                      {/* Top Ratings */}
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-white/90 mb-2 text-center">Top Ratings</h5>
                        <div className="flex justify-center gap-2">
                          {Object.entries(result.result.primaryRecommendation.ratings)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([key, rating]) => (
                              <div key={key} className="bg-green-500/80 text-white px-2 py-1 rounded-full text-xs font-bold">
                                {rating}/10
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Action Button */}
                    <div>
                      <motion.button
                        onClick={() => handleViewResult(result.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye size={16} />
                        View Full Results
                      </motion.button>
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="justify-center"
                />
              </motion.div>
            )}
          </>
        )}

        {/* Stats Summary */}
        <motion.div
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Vaping Journey</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{savedResults.length}</div>
              <div className="text-sm text-gray-600">Saved Results</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(savedResults.reduce((acc, r) => acc + r.result.matchScore, 0) / savedResults.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Match Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${Math.round(savedResults.reduce((acc, r) => acc + r.result.primaryRecommendation.price, 0) / savedResults.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {savedResults.filter(r => r.preferences.cannabisExperience === 'experienced').length}
              </div>
              <div className="text-sm text-gray-600">Expert Level</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};