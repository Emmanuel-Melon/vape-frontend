import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Award, Battery, Zap, Shield, Wrench, DollarSign, Calendar, User } from 'lucide-react';
import { CloudBackground } from './CloudBackground';

// Dummy data - in a real app, this would come from a data store or API
const dummyResults = {
  '1': {
    id: '1',
    timestamp: Date.now() - 86400000,
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
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
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
        features: ['On-demand heating', 'Powerful extraction', 'Artisan crafted', 'Temperature dial'],
        pros: ['Incredible potency', 'Fast extraction', 'Beautiful wood design', 'On-demand capability'],
        cons: ['Learning curve', 'Fragile', 'Limited warranty support'],
        bestFor: ['Power users', 'On-demand preference', 'Experienced users'],
        notIdealFor: ['Beginners', 'Clumsy users', 'Warranty-conscious buyers'],
        warranty: '1 year',
        maintenanceLevel: 'medium',
        learningCurve: 'steep',
        matchScore: 92
      },
      alternatives: [],
      explanation: 'Perfect for experienced users seeking powerful performance with artisan craftsmanship',
      educationalContent: {
        temperatureGuide: [
          '350-375°F: Light effects, maximum flavor, good for beginners',
          '375-390°F: Balanced effects and flavor, most popular range',
          '390-410°F: Stronger effects, less flavor, more sedating'
        ],
        maintenanceTips: [
          'Clean after every 5-10 sessions for best performance',
          'Use isopropyl alcohol (90%+) for cleaning',
          'Let all parts dry completely before reassembling'
        ]
      },
      matchScore: 92
    }
  },
  '2': {
    id: '2',
    timestamp: Date.now() - 172800000,
    nickname: 'Budget Beginner Setup',
    preferences: {
      cannabisExperience: 'novice',
      primaryUse: 'medical',
      usagePattern: 'casual',
      userType: 'on-the-go',
      portability: 'pocket-size',
      budget: 120,
      priorities: {
        vaporPotency: 5,
        vaporComfort: 8,
        portability: 9,
        batteryLife: 7,
        buildQuality: 6,
        easeOfUse: 10,
        maintenance: 8,
        value: 9
      }
    },
    result: {
      primaryRecommendation: {
        id: 'potv-one',
        name: 'ONE',
        brand: 'Planet of the Vapes',
        price: 99,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'budget',
        heatingMethod: 'hybrid',
        type: 'portable',
        ratings: {
          vaporPotency: 7,
          vaporComfort: 7,
          portability: 9,
          batteryLife: 6,
          buildQuality: 7,
          easeOfUse: 9,
          maintenance: 8,
          value: 10
        },
        features: ['Dosing capsules', 'Precise temp control', 'Compact size', 'Easy loading'],
        pros: ['Excellent value', 'Very portable', 'Easy to use', 'Good flavor'],
        cons: ['Smaller battery', 'Limited power', 'Plastic construction'],
        bestFor: ['Beginners', 'Budget users', 'Casual users', 'Stealth needs'],
        notIdealFor: ['Heavy users', 'Power seekers'],
        warranty: '3 years',
        maintenanceLevel: 'low',
        learningCurve: 'easy',
        matchScore: 88
      },
      alternatives: [],
      explanation: 'Ideal for beginners with excellent value and ease of use',
      educationalContent: {
        temperatureGuide: [
          '350-375°F: Light effects, maximum flavor, good for beginners',
          '375-390°F: Balanced effects and flavor, most popular range'
        ],
        maintenanceTips: [
          'Clean after every 5-10 sessions for best performance',
          'Use isopropyl alcohol (90%+) for cleaning'
        ]
      },
      matchScore: 88
    }
  },
  '3': {
    id: '3',
    timestamp: Date.now() - 259200000,
    nickname: 'Home Session Beast',
    preferences: {
      cannabisExperience: 'experienced',
      primaryUse: 'recreational',
      usagePattern: 'heavy',
      userType: 'home-primary',
      portability: 'desktop',
      budget: 700,
      priorities: {
        vaporPotency: 10,
        vaporComfort: 10,
        portability: 2,
        batteryLife: 10,
        buildQuality: 10,
        easeOfUse: 7,
        maintenance: 6,
        value: 7
      }
    },
    result: {
      primaryRecommendation: {
        id: 'volcano-hybrid',
        name: 'Volcano Hybrid',
        brand: 'Storz & Bickel',
        price: 699,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'premium',
        heatingMethod: 'hybrid',
        type: 'desktop',
        ratings: {
          vaporPotency: 10,
          vaporComfort: 10,
          portability: 1,
          batteryLife: 10,
          buildQuality: 10,
          easeOfUse: 8,
          maintenance: 6,
          value: 7
        },
        features: ['Balloon and whip', 'App control', 'Medical certification', 'Precise heating'],
        pros: ['Ultimate vapor quality', 'Multiple delivery methods', 'Medical grade', 'Legendary reliability'],
        cons: ['Very expensive', 'Not portable', 'Overkill for casual use'],
        bestFor: ['Home users', 'Medical patients', 'Group sessions', 'Ultimate quality seekers'],
        notIdealFor: ['Portable needs', 'Budget users', 'Casual users'],
        warranty: '3 years',
        maintenanceLevel: 'medium',
        learningCurve: 'easy',
        matchScore: 96
      },
      alternatives: [],
      explanation: 'The ultimate home vaporizer for serious enthusiasts',
      educationalContent: {
        temperatureGuide: [
          '315-350°F: Terpene preservation, cerebral effects, flavor focus',
          '350-375°F: Balanced cannabinoid activation, daily use sweet spot',
          '375-400°F: Full spectrum extraction, body effects increase'
        ],
        maintenanceTips: [
          'Deep clean weekly with ultrasonic cleaner if available',
          'Keep spare parts (screens, O-rings) for quick replacements',
          'Monitor performance and replace when capacity drops'
        ]
      },
      matchScore: 96
    }
  }
};

export const ResultDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const result = id ? dummyResults[id as keyof typeof dummyResults] : null;

  if (!result) {
    return (
      <div className="min-h-screen font-sen relative overflow-hidden">
        <CloudBackground />
        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-3">Result Not Found</h2>
            <p className="text-gray-500 mb-6">The quiz result you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/saved')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Saved Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { primaryRecommendation, explanation, educationalContent, matchScore } = result.result;

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingIcon = (category: string) => {
    switch (category) {
      case 'vaporPotency': return <Zap size={16} />;
      case 'batteryLife': return <Battery size={16} />;
      case 'buildQuality': return <Shield size={16} />;
      case 'maintenance': return <Wrench size={16} />;
      case 'value': return <DollarSign size={16} />;
      default: return <Star size={16} />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/saved')}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white/90 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={20} />
          Back to Saved Results
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-4xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            🎯
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{result.nickname}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {formatDate(result.timestamp)}
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              {result.preferences.cannabisExperience} user
            </div>
          </div>
        </motion.div>

        {/* Primary Recommendation */}
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.img 
                src={primaryRecommendation.image} 
                alt={primaryRecommendation.name}
                className="w-24 h-24 rounded-lg object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{primaryRecommendation.name}</h2>
                <p className="text-lg text-gray-600">{primaryRecommendation.brand}</p>
                <motion.p 
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  ${primaryRecommendation.price}
                </motion.p>
              </div>
            </div>
            <div className="text-right">
              <motion.div 
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-bold mb-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {matchScore}% Match
              </motion.div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <Star size={20} fill={i < 4 ? 'currentColor' : 'none'} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Why it's perfect for you:</h3>
            <p className="text-gray-700 text-lg">{explanation}</p>
          </motion.div>

          {/* Detailed Ratings Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {Object.entries(primaryRecommendation.ratings).map(([key, rating], index) => (
              <motion.div 
                key={key} 
                className="bg-white rounded-lg p-4 text-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getRatingIcon(key)}
                  <span className={`font-bold text-lg ${getRatingColor(rating)}`}>{rating}/10</span>
                </div>
                <div className="text-sm text-gray-600 capitalize font-medium">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features and Details */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-lg">
                <Award size={20} className="text-green-600" />
                Key Features
              </h4>
              <ul className="space-y-2">
                {primaryRecommendation.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="text-gray-700 flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-lg">Best For</h4>
              <ul className="space-y-2">
                {primaryRecommendation.bestFor.map((use, index) => (
                  <motion.li 
                    key={index} 
                    className="text-gray-700 flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {use}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Educational Content */}
        <motion.div 
          className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <h3 className="text-xl font-bold text-blue-800 mb-6">Getting Started Guide</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 }}
            >
              <h4 className="font-semibold text-blue-700 mb-3">Temperature Guide</h4>
              <ul className="space-y-2">
                {educationalContent.temperatureGuide.map((guide, index) => (
                  <motion.li 
                    key={index} 
                    className="text-blue-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1 + index * 0.1 }}
                  >
                    {guide}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 }}
            >
              <h4 className="font-semibold text-blue-700 mb-3">Maintenance Tips</h4>
              <ul className="space-y-2">
                {educationalContent.maintenanceTips.map((tip, index) => (
                  <motion.li 
                    key={index} 
                    className="text-blue-700 flex items-start gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.3 + index * 0.1 }}
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Quiz Preferences Summary */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Quiz Preferences</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Experience Level</h4>
              <p className="text-gray-800 capitalize font-semibold">{result.preferences.cannabisExperience}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Primary Use</h4>
              <p className="text-gray-800 capitalize font-semibold">{result.preferences.primaryUse}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Budget</h4>
              <p className="text-gray-800 font-semibold">${result.preferences.budget}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};