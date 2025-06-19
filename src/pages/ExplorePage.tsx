import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Users, TrendingUp, Award, Filter, Search, Eye, Heart, Download, ExternalLink, MessageCircle, Play, Bookmark, Settings } from 'lucide-react';
import { CloudBackground } from './CloudBackground';
import { Pagination } from './Pagination';
import { Footer } from './Footer';
import { TemplateDiscussion } from './TemplateDiscussion';

interface CommunityTemplate {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  authorBadge?: 'verified' | 'expert' | 'top-seller';
  likes: number;
  downloads: number;
  comments: number;
  category: 'beginner' | 'advanced' | 'budget' | 'premium' | 'medical' | 'recreational';
  tags: string[];
  vaporizer: {
    name: string;
    brand: string;
    price: number;
    image: string;
    matchScore: number;
  };
  preferences: {
    experience: string;
    budget: number;
    primaryUse: string;
    userType: string;
  };
  featured?: boolean;
  trending?: boolean;
  isPublic: boolean;
}

const communityTemplates: CommunityTemplate[] = [
  {
    id: 'template-1',
    title: 'Perfect Beginner Setup',
    description: 'Ideal for newcomers to vaping. Simple, reliable, and budget-friendly with excellent support.',
    author: 'VapeGuru_Mike',
    authorId: 'mike-johnson',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'expert',
    likes: 342,
    downloads: 1250,
    comments: 89,
    category: 'beginner',
    tags: ['Easy to use', 'Budget friendly', 'Reliable'],
    vaporizer: {
      name: 'ONE',
      brand: 'Planet of the Vapes',
      price: 99,
      image: 'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=400',
      matchScore: 95
    },
    preferences: {
      experience: 'Novice',
      budget: 120,
      primaryUse: 'Recreational',
      userType: 'Beginner-friendly'
    },
    featured: true,
    trending: true,
    isPublic: true
  },
  {
    id: 'template-2',
    title: 'Flavor Chaser\'s Dream',
    description: 'Pure convection heating for the ultimate flavor experience. Perfect for connoisseurs.',
    author: 'FlavorMaster_Sarah',
    authorId: 'sarah-chen',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'verified',
    likes: 567,
    downloads: 890,
    comments: 156,
    category: 'advanced',
    tags: ['Pure flavor', 'Convection', 'Premium'],
    vaporizer: {
      name: 'TinyMight 2',
      brand: 'TinyMight',
      price: 349,
      image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
      matchScore: 98
    },
    preferences: {
      experience: 'Experienced',
      budget: 400,
      primaryUse: 'Recreational',
      userType: 'Flavor chaser'
    },
    featured: true,
    isPublic: true
  },
  {
    id: 'template-3',
    title: 'Medical Patient Essential',
    description: 'Precise dosing and gentle vapor for medical users. Reliable and consistent performance.',
    author: 'Dr_GreenThumb',
    authorId: 'dr-martinez',
    authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'expert',
    likes: 423,
    downloads: 1100,
    comments: 203,
    category: 'medical',
    tags: ['Medical grade', 'Precise dosing', 'Gentle'],
    vaporizer: {
      name: 'Mighty+',
      brand: 'Storz & Bickel',
      price: 399,
      image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
      matchScore: 96
    },
    preferences: {
      experience: 'Intermediate',
      budget: 450,
      primaryUse: 'Medical',
      userType: 'Medical patient'
    },
    trending: true,
    isPublic: true
  },
  {
    id: 'template-4',
    title: 'Budget Beast Performance',
    description: 'Maximum value without compromising quality. Great performance at an unbeatable price.',
    author: 'BudgetVaper_Alex',
    authorId: 'alex-rodriguez',
    authorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'top-seller',
    likes: 289,
    downloads: 750,
    comments: 67,
    category: 'budget',
    tags: ['Best value', 'Budget', 'Performance'],
    vaporizer: {
      name: 'Lobo',
      brand: 'Planet of the Vapes',
      price: 159,
      image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
      matchScore: 92
    },
    preferences: {
      experience: 'Intermediate',
      budget: 180,
      primaryUse: 'Recreational',
      userType: 'Value seeker'
    },
    isPublic: true
  },
  {
    id: 'template-5',
    title: 'Ultimate Home Setup',
    description: 'Desktop powerhouse for serious enthusiasts. Unmatched vapor quality and group sessions.',
    author: 'HomeVapeKing',
    authorId: 'david-kim',
    authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'expert',
    likes: 678,
    downloads: 456,
    comments: 234,
    category: 'premium',
    tags: ['Desktop', 'Premium', 'Group sessions'],
    vaporizer: {
      name: 'Volcano Hybrid',
      brand: 'Storz & Bickel',
      price: 699,
      image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
      matchScore: 99
    },
    preferences: {
      experience: 'Expert',
      budget: 750,
      primaryUse: 'Recreational',
      userType: 'Home primary'
    },
    featured: true,
    isPublic: true
  },
  {
    id: 'template-6',
    title: 'Stealth Mode Portable',
    description: 'Ultra-discreet and pocket-friendly. Perfect for on-the-go vaping without drawing attention.',
    author: 'StealthVaper_Ninja',
    authorId: 'ninja-stealth',
    authorAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    authorBadge: 'verified',
    likes: 234,
    downloads: 890,
    comments: 45,
    category: 'recreational',
    tags: ['Stealth', 'Portable', 'Discreet'],
    vaporizer: {
      name: 'Venty',
      brand: 'Storz & Bickel',
      price: 449,
      image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
      matchScore: 94
    },
    preferences: {
      experience: 'Experienced',
      budget: 500,
      primaryUse: 'Recreational',
      userType: 'On-the-go'
    },
    isPublic: true
  }
];

// Generate more templates for pagination demo
const allTemplates = [
  ...communityTemplates,
  ...Array.from({ length: 20 }, (_, i) => ({
    ...communityTemplates[i % communityTemplates.length],
    id: `template-${i + 7}`,
    title: `${communityTemplates[i % communityTemplates.length].title} ${i + 2}`,
    likes: Math.floor(Math.random() * 500) + 100,
    downloads: Math.floor(Math.random() * 1000) + 200,
    comments: Math.floor(Math.random() * 100) + 10,
  }))
];

const ITEMS_PER_PAGE = 9;

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'newest'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CommunityTemplate | null>(null);
  const [likedTemplates, setLikedTemplates] = useState<Set<string>>(new Set());
  const [bookmarkedTemplates, setBookmarkedTemplates] = useState<Set<string>>(new Set());

  const categories = [
    { value: 'all', label: 'All Templates', count: allTemplates.length },
    { value: 'beginner', label: 'Beginner', count: allTemplates.filter(t => t.category === 'beginner').length },
    { value: 'advanced', label: 'Advanced', count: allTemplates.filter(t => t.category === 'advanced').length },
    { value: 'budget', label: 'Budget', count: allTemplates.filter(t => t.category === 'budget').length },
    { value: 'premium', label: 'Premium', count: allTemplates.filter(t => t.category === 'premium').length },
    { value: 'medical', label: 'Medical', count: allTemplates.filter(t => t.category === 'medical').length },
    { value: 'recreational', label: 'Recreational', count: allTemplates.filter(t => t.category === 'recreational').length }
  ];

  const filteredTemplates = allTemplates
    .filter(template => 
      (selectedCategory === 'all' || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        case 'newest':
          return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTemplates = filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const featuredTemplates = allTemplates.filter(t => t.featured).slice(0, 3);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'budget': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'recreational': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'verified': return 'bg-blue-500';
      case 'expert': return 'bg-purple-500';
      case 'top-seller': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'verified': return '✓';
      case 'expert': return '🎓';
      case 'top-seller': return '⭐';
      default: return '';
    }
  };

  const handleUseTemplate = (template: CommunityTemplate) => {
    console.log('Using template:', template);
    navigate('/');
  };

  const handleViewProfile = (authorId: string) => {
    navigate(`/seller/${authorId}`);
  };

  const handleViewTemplate = (templateId: string) => {
    navigate(`/template/${templateId}`);
  };

  const handleOpenDiscussion = (template: CommunityTemplate) => {
    setSelectedTemplate(template);
    setShowDiscussion(true);
  };

  const handleToggleLike = (templateId: string) => {
    setLikedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  const handleToggleBookmark = (templateId: string) => {
    setBookmarkedTemplates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(templateId)) {
        newSet.delete(templateId);
      } else {
        newSet.add(templateId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
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
            🌟
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Explore Community Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover curated vaporizer recommendations from our community of experts and enthusiasts. Purchase directly from trusted sellers.
          </p>
        </motion.div>

        {/* Featured Templates */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Featured Templates</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Stats at the top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Heart size={14} className={likedTemplates.has(template.id) ? 'text-red-500 fill-current' : ''} />
                      {template.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      {template.downloads}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </div>
                    {template.trending && (
                      <div className="flex items-center gap-1 text-orange-600 text-xs font-medium">
                        <TrendingUp size={12} />
                        Trending
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                
                {/* Author with Profile Link */}
                <div 
                  className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-white/50 rounded-lg p-2 -m-2 transition-colors"
                  onClick={() => handleViewProfile(template.authorId)}
                >
                  <div className="relative">
                    <img
                      src={template.authorAvatar}
                      alt={template.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {template.authorBadge && (
                      <div className={`absolute -top-1 -right-1 w-4 h-4 ${getBadgeColor(template.authorBadge)} rounded-full flex items-center justify-center text-white text-xs`}>
                        {getBadgeIcon(template.authorBadge)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 flex items-center gap-1">
                      {template.author}
                      <ExternalLink size={12} className="text-gray-400" />
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.authorBadge === 'expert' && 'Community Expert'}
                      {template.authorBadge === 'verified' && 'Verified Seller'}
                      {template.authorBadge === 'top-seller' && 'Top Seller'}
                      {!template.authorBadge && 'Community Member'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={template.vaporizer.image}
                    alt={template.vaporizer.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{template.vaporizer.name}</h4>
                    <p className="text-sm text-gray-600">${template.vaporizer.price}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm font-bold text-green-600">{template.vaporizer.matchScore}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                </div>
                
                {/* Three buttons at the bottom */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewTemplate(template.id)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={() => handleToggleBookmark(template.id)}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center ${
                      bookmarkedTemplates.has(template.id)
                        ? 'bg-blue-100 text-blue-600 border border-blue-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    <Bookmark size={14} fill={bookmarkedTemplates.has(template.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleUseTemplate(template)}
                    className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium flex items-center justify-center border border-orange-300"
                  >
                    <Settings size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search templates, tags, or vaporizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'trending' | 'newest')}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Templates ({filteredTemplates.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTemplates.length)} of {filteredTemplates.length} results
            </div>
          </div>
          
          {paginatedTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No templates found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Template Header with Stats */}
                    <div className="p-6 pb-4">
                      {/* Stats moved to the top */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button
                            onClick={() => handleToggleLike(template.id)}
                            className={`flex items-center gap-1 transition-colors ${
                              likedTemplates.has(template.id) ? 'text-red-500' : 'hover:text-red-500'
                            }`}
                          >
                            <Heart size={14} fill={likedTemplates.has(template.id) ? 'currentColor' : 'none'} />
                            {template.likes + (likedTemplates.has(template.id) ? 1 : 0)}
                          </button>
                          <div className="flex items-center gap-1">
                            <Download size={14} />
                            {template.downloads}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                            {template.category}
                          </div>
                          {template.trending && (
                            <div className="flex items-center gap-1 text-orange-600 text-xs font-medium">
                              <TrendingUp size={12} />
                              Trending
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{template.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      
                      {/* Author with Profile Link */}
                      <div 
                        className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                        onClick={() => handleViewProfile(template.authorId)}
                      >
                        <div className="relative">
                          <img
                            src={template.authorAvatar}
                            alt={template.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          {template.authorBadge && (
                            <div className={`absolute -top-1 -right-1 w-4 h-4 ${getBadgeColor(template.authorBadge)} rounded-full flex items-center justify-center text-white text-xs`}>
                              {getBadgeIcon(template.authorBadge)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-800 flex items-center gap-1">
                            {template.author}
                            <ExternalLink size={12} className="text-gray-400" />
                          </div>
                          <div className="text-xs text-gray-500">
                            {template.authorBadge === 'expert' && 'Community Expert'}
                            {template.authorBadge === 'verified' && 'Verified Seller'}
                            {template.authorBadge === 'top-seller' && 'Top Seller'}
                            {!template.authorBadge && 'Community Member'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Vaporizer Info */}
                      <div className="flex items-center gap-3 mb-4 bg-gray-50 rounded-lg p-3">
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
                          onClick={() => handleViewTemplate(template.id)}
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          onClick={() => handleToggleBookmark(template.id)}
                          className={`px-3 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center ${
                            bookmarkedTemplates.has(template.id)
                              ? 'bg-blue-100 text-blue-600 border border-blue-300'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                          }`}
                        >
                          <Bookmark size={14} fill={bookmarkedTemplates.has(template.id) ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium flex items-center justify-center border border-orange-300"
                        >
                          <Settings size={14} />
                        </button>
                      </div>
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
                  transition={{ delay: 0.8 }}
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
        </motion.div>

        {/* Community Stats */}
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
              <div className="text-2xl font-bold text-green-600">{allTemplates.length}</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {allTemplates.reduce((acc, t) => acc + t.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {allTemplates.reduce((acc, t) => acc + t.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(allTemplates.map(t => t.author)).size}
              </div>
              <div className="text-sm text-gray-600">Contributors</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Template Discussion Modal */}
      {selectedTemplate && (
        <TemplateDiscussion
          templateId={selectedTemplate.id}
          templateTitle={selectedTemplate.title}
          isOpen={showDiscussion}
          onClose={() => {
            setShowDiscussion(false);
            setSelectedTemplate(null);
          }}
        />
      )}
    </div>
  );
};