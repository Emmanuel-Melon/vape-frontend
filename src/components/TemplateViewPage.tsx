import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, Award, Calendar, User, Heart, Download, 
  MessageCircle, Eye, ShoppingCart, Share2, Bookmark,
  ThumbsUp, Filter, SortDesc, ExternalLink, CheckCircle
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';
import { TemplateDiscussion } from './TemplateDiscussion';

interface TemplateDetails {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: 'verified' | 'expert' | 'top-seller';
    reputation: number;
  };
  likes: number;
  downloads: number;
  comments: number;
  category: string;
  tags: string[];
  price: number;
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
  content: {
    overview: string;
    features: string[];
    instructions: string[];
    tips: string[];
    temperatureGuide: Array<{
      temp: string;
      description: string;
      effects: string;
    }>;
    maintenanceSchedule: Array<{
      frequency: string;
      task: string;
      importance: 'low' | 'medium' | 'high';
    }>;
  };
  reviews: {
    averageRating: number;
    totalReviews: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  isPurchased?: boolean;
}

// Mock template data
const mockTemplate: TemplateDetails = {
  id: 'template-1',
  title: 'Perfect Beginner Setup',
  description: 'A comprehensive guide for newcomers to vaping. This template covers everything from device selection to optimal usage techniques, ensuring a smooth and enjoyable introduction to vaporizing.',
  author: {
    id: 'mike-johnson',
    name: 'VapeGuru_Mike',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'expert',
    reputation: 2840
  },
  likes: 342,
  downloads: 1250,
  comments: 89,
  category: 'beginner',
  tags: ['Easy to use', 'Budget friendly', 'Reliable', 'Step-by-step'],
  price: 15,
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
  content: {
    overview: 'This template is designed specifically for those new to vaporizing. It provides a complete roadmap from unboxing your first device to mastering the art of temperature control and maintenance. The guide focuses on the Planet of the Vapes ONE, an excellent entry-level device that offers reliability, ease of use, and great value.',
    features: [
      'Complete setup walkthrough with photos',
      'Temperature recommendations for different effects',
      'Dosing guidelines for beginners',
      'Maintenance schedule and cleaning tips',
      'Troubleshooting common issues',
      'Safety guidelines and best practices',
      'Accessory recommendations',
      'Progressive learning path'
    ],
    instructions: [
      'Unbox your device and identify all components',
      'Charge the battery fully before first use (2-3 hours)',
      'Download the companion app if available',
      'Start with the lowest temperature setting (320°F)',
      'Load a small amount (rice grain size) for first session',
      'Take slow, gentle draws for 10-15 seconds',
      'Wait 5-10 minutes between draws to assess effects',
      'Clean the device after every 3-5 sessions'
    ],
    tips: [
      'Start low and go slow - you can always use more',
      'Grind your material to a fine, even consistency',
      'Don\'t pack the chamber too tightly',
      'Keep spare batteries charged and ready',
      'Store your device in a cool, dry place',
      'Keep a usage journal to track preferences',
      'Join online communities for support and tips'
    ],
    temperatureGuide: [
      {
        temp: '320-350°F',
        description: 'Light, flavorful vapor',
        effects: 'Mild effects, maximum flavor, good for beginners'
      },
      {
        temp: '350-375°F',
        description: 'Balanced vapor production',
        effects: 'Moderate effects, good flavor retention'
      },
      {
        temp: '375-400°F',
        description: 'Dense, potent vapor',
        effects: 'Stronger effects, less flavor, more sedating'
      },
      {
        temp: '400°F+',
        description: 'Maximum extraction',
        effects: 'Very strong effects, minimal flavor, highly sedating'
      }
    ],
    maintenanceSchedule: [
      {
        frequency: 'After each session',
        task: 'Empty the chamber and brush out residue',
        importance: 'medium'
      },
      {
        frequency: 'Every 3-5 sessions',
        task: 'Clean the mouthpiece and vapor path',
        importance: 'high'
      },
      {
        frequency: 'Weekly',
        task: 'Deep clean all removable parts',
        importance: 'high'
      },
      {
        frequency: 'Monthly',
        task: 'Replace screens and check battery health',
        importance: 'medium'
      }
    ]
  },
  reviews: {
    averageRating: 4.8,
    totalReviews: 156,
    breakdown: {
      5: 120,
      4: 28,
      3: 6,
      2: 1,
      1: 1
    }
  },
  createdAt: '2024-01-15',
  updatedAt: '2024-03-10',
  isPublic: true,
  isPurchased: false
};

export const TemplateViewPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'guide' | 'reviews'>('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // In a real app, fetch template data based on templateId
  const template = mockTemplate;

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

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handlePurchase = () => {
    // Implement purchase logic
    console.log('Purchasing template:', template.id);
  };

  const handleUseTemplate = () => {
    // Implement template usage logic
    console.log('Using template:', template.id);
    navigate('/');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Template Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">About This Template</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{template.content.overview}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">What's Included</h4>
            <ul className="space-y-2">
              {template.content.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Your Preferences</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience Level:</span>
                <span className="font-medium">{template.preferences.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Budget Range:</span>
                <span className="font-medium">${template.preferences.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Use:</span>
                <span className="font-medium">{template.preferences.primaryUse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">User Type:</span>
                <span className="font-medium">{template.preferences.userType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Vaporizer */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recommended Vaporizer</h3>
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
          <img
            src={template.vaporizer.image}
            alt={template.vaporizer.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-800">{template.vaporizer.name}</h4>
            <p className="text-gray-600 mb-2">{template.vaporizer.brand}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">${template.vaporizer.price}</p>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{template.vaporizer.matchScore}%</div>
                <div className="text-sm text-gray-500">match score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGuideTab = () => (
    <div className="space-y-6">
      {/* Step-by-step Instructions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Step-by-Step Guide</h3>
        <div className="space-y-4">
          {template.content.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700 pt-1">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Guide */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Temperature Guide</h3>
        <div className="space-y-4">
          {template.content.temperatureGuide.map((guide, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">{guide.temp}</h4>
                <span className="text-sm text-gray-600">{guide.description}</span>
              </div>
              <p className="text-gray-700 text-sm">{guide.effects}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Pro Tips</h3>
        <div className="grid gap-3">
          {template.content.tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                💡
              </div>
              <p className="text-blue-800 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Maintenance Schedule</h3>
        <div className="space-y-3">
          {template.content.maintenanceSchedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">{item.frequency}</div>
                <div className="text-sm text-gray-600">{item.task}</div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(item.importance)}`}>
                {item.importance} priority
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">User Reviews</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">{template.reviews.averageRating}</div>
            <div className="flex justify-center mb-2">
              {renderStars(template.reviews.averageRating)}
            </div>
            <div className="text-gray-600">{template.reviews.totalReviews} reviews</div>
          </div>
          <div className="space-y-2">
            {Object.entries(template.reviews.breakdown)
              .reverse()
              .map(([stars, count]) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${(count / template.reviews.totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-4">Recent Reviews</h4>
        <div className="space-y-4">
          {/* Mock reviews */}
          {[
            {
              author: 'NewVaper_Alex',
              rating: 5,
              date: '2 days ago',
              content: 'Perfect for beginners! The step-by-step guide made everything so easy to understand.'
            },
            {
              author: 'VapeEnthusiast_Sam',
              rating: 4,
              date: '1 week ago',
              content: 'Great template with lots of useful tips. The temperature guide is especially helpful.'
            }
          ].map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{review.author}</span>
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/explore')}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={20} />
          Back to Explore
        </motion.button>

        {/* Template Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Template Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </div>
                  <div className="text-2xl font-bold text-green-600">${template.price}</div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{template.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{template.description}</p>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={template.author.avatar}
                  alt={template.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{template.author.name}</span>
                    {template.author.badge && (
                      <div className={`w-5 h-5 ${getBadgeColor(template.author.badge)} rounded-full flex items-center justify-center text-white text-xs`}>
                        {getBadgeIcon(template.author.badge)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{template.author.reputation} reputation</div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Heart size={16} />
                  {template.likes} likes
                </div>
                <div className="flex items-center gap-1">
                  <Download size={16} />
                  {template.downloads} downloads
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {template.comments} comments
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  {Math.floor(template.downloads * 1.5)} views
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-2">${template.price}</div>
                  <div className="text-sm text-gray-600">One-time purchase</div>
                </div>

                {template.isPurchased ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleUseTemplate}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <CheckCircle size={20} />
                      Use This Template
                    </button>
                    <div className="text-center text-sm text-green-600 font-medium">
                      ✓ Already purchased
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handlePurchase}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors font-medium mb-4"
                  >
                    <ShoppingCart size={20} />
                    Purchase Template
                  </button>
                )}

                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked ? 'bg-red-100 text-red-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    Like
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isBookmarked ? 'bg-blue-100 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    Save
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{new Date(template.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updated:</span>
                    <span className="font-medium">{new Date(template.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(template.reviews.averageRating)}
                      <span className="font-medium ml-1">({template.reviews.totalReviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'guide', label: 'Complete Guide', icon: Award },
              { id: 'reviews', label: 'Reviews', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'guide' && renderGuideTab()}
          {activeTab === 'reviews' && renderReviewsTab()}
        </motion.div>

        {/* Discussion Button */}
        {template.isPublic && (
          <motion.div
            className="fixed bottom-8 right-8 z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setShowDiscussion(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle size={20} />
              <span className="hidden sm:inline">Join Discussion</span>
              <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {template.comments}
              </div>
            </button>
          </motion.div>
        )}
      </div>

      {/* Template Discussion Modal */}
      {template.isPublic && (
        <TemplateDiscussion
          templateId={template.id}
          templateTitle={template.title}
          isOpen={showDiscussion}
          onClose={() => setShowDiscussion(false)}
        />
      )}
    </div>
  );
};