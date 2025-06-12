import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, MapPin, Calendar, Award, TrendingUp, 
  Heart, Download, ShoppingCart, Eye, MessageCircle, 
  Shield, Verified, Crown, Package, DollarSign, Users
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';

interface SellerProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  badge: 'verified' | 'expert' | 'top-seller';
  location: string;
  joinDate: string;
  bio: string;
  stats: {
    totalSales: number;
    rating: number;
    reviews: number;
    templates: number;
    followers: number;
  };
  specialties: string[];
  templates: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    likes: number;
    downloads: number;
    category: string;
    vaporizer: {
      name: string;
      brand: string;
      price: number;
      image: string;
    };
  }>;
  products: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    inStock: boolean;
    condition: 'new' | 'like-new' | 'good' | 'fair';
    description: string;
  }>;
}

const sellerProfiles: Record<string, SellerProfile> = {
  'mike-johnson': {
    id: 'mike-johnson',
    username: 'VapeGuru_Mike',
    displayName: 'Mike Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'expert',
    location: 'Denver, CO',
    joinDate: '2022-03-15',
    bio: 'Cannabis industry veteran with 8+ years of experience. Specializing in beginner-friendly setups and budget recommendations. Former dispensary manager turned vaping consultant.',
    stats: {
      totalSales: 1250,
      rating: 4.9,
      reviews: 342,
      templates: 15,
      followers: 2840
    },
    specialties: ['Beginner Setups', 'Budget Vapes', 'Medical Cannabis', 'Customer Support'],
    templates: [
      {
        id: 'template-1',
        title: 'Perfect Beginner Setup',
        description: 'Complete starter kit with everything you need',
        price: 15,
        likes: 342,
        downloads: 1250,
        category: 'beginner',
        vaporizer: {
          name: 'ONE',
          brand: 'Planet of the Vapes',
          price: 99,
          image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
      },
      {
        id: 'template-7',
        title: 'Medical Micro-Dosing Guide',
        description: 'Precise dosing for medical patients',
        price: 20,
        likes: 189,
        downloads: 567,
        category: 'medical',
        vaporizer: {
          name: 'ArGo',
          brand: 'Arizer',
          price: 199,
          image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
      }
    ],
    products: [
      {
        id: 'prod-1',
        name: 'Planet of the Vapes ONE',
        brand: 'Planet of the Vapes',
        price: 89,
        originalPrice: 99,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Portable Vaporizer',
        inStock: true,
        condition: 'new',
        description: 'Brand new, sealed in box. Perfect for beginners with dosing capsules included.'
      },
      {
        id: 'prod-2',
        name: 'Arizer ArGo',
        brand: 'Arizer',
        price: 179,
        originalPrice: 199,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Portable Vaporizer',
        inStock: true,
        condition: 'like-new',
        description: 'Lightly used, excellent condition. Includes all original accessories plus extra stems.'
      },
      {
        id: 'prod-3',
        name: 'Dosing Capsule Set (40pc)',
        brand: 'S&B',
        price: 25,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Accessories',
        inStock: true,
        condition: 'new',
        description: 'Official Storz & Bickel dosing capsules. Perfect for precise dosing and easy cleanup.'
      }
    ]
  },
  'sarah-chen': {
    id: 'sarah-chen',
    username: 'FlavorMaster_Sarah',
    displayName: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    badge: 'verified',
    location: 'Portland, OR',
    joinDate: '2021-08-22',
    bio: 'Flavor enthusiast and cannabis sommelier. I specialize in convection vaporizers and terpene preservation. Certified cannabis consultant with a passion for education.',
    stats: {
      totalSales: 890,
      rating: 4.8,
      reviews: 234,
      templates: 12,
      followers: 1950
    },
    specialties: ['Flavor Optimization', 'Convection Vapes', 'Terpene Education', 'Premium Devices'],
    templates: [
      {
        id: 'template-2',
        title: 'Flavor Chaser\'s Dream',
        description: 'Ultimate flavor experience setup',
        price: 25,
        likes: 567,
        downloads: 890,
        category: 'advanced',
        vaporizer: {
          name: 'TinyMight 2',
          brand: 'TinyMight',
          price: 349,
          image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
      }
    ],
    products: [
      {
        id: 'prod-4',
        name: 'TinyMight 2',
        brand: 'TinyMight',
        price: 329,
        originalPrice: 349,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Portable Vaporizer',
        inStock: true,
        condition: 'new',
        description: 'Authentic TinyMight 2 with warranty. Includes custom wooden stems and cooling unit.'
      },
      {
        id: 'prod-5',
        name: 'Glass Stem Collection',
        brand: 'Custom',
        price: 45,
        image: 'https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300',
        category: 'Accessories',
        inStock: true,
        condition: 'new',
        description: 'Handcrafted borosilicate glass stems for enhanced flavor. Set of 3 different lengths.'
      }
    ]
  }
};

export const SellerProfilePage: React.FC = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'templates' | 'products'>('templates');
  
  const seller = sellerId ? sellerProfiles[sellerId] : null;

  if (!seller) {
    return (
      <div className="min-h-screen font-sen relative overflow-hidden">
        <CloudBackground />
        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <div className="text-center py-16">
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-3">Seller Not Found</h2>
            <p className="text-gray-500 mb-6">The seller profile you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      case 'verified': return <Verified size={16} />;
      case 'expert': return <Award size={16} />;
      case 'top-seller': return <Crown size={16} />;
      default: return null;
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case 'verified': return 'Verified Seller';
      case 'expert': return 'Community Expert';
      case 'top-seller': return 'Top Seller';
      default: return '';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

        {/* Seller Header */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                <img
                  src={seller.avatar}
                  alt={seller.displayName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className={`absolute -bottom-2 -right-2 ${getBadgeColor(seller.badge)} rounded-full p-2 text-white shadow-lg`}>
                  {getBadgeIcon(seller.badge)}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{seller.displayName}</h1>
                <p className="text-gray-600 mb-2">@{seller.username}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 ${getBadgeColor(seller.badge)} text-white rounded-full text-sm font-medium mb-3`}>
                  {getBadgeIcon(seller.badge)}
                  {getBadgeLabel(seller.badge)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {seller.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    Joined {new Date(seller.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and Bio */}
            <div className="flex-1">
              <p className="text-gray-700 mb-6">{seller.bio}</p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{seller.stats.totalSales}</div>
                  <div className="text-xs text-gray-600">Total Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                    {seller.stats.rating}
                    <Star size={16} fill="currentColor" />
                  </div>
                  <div className="text-xs text-gray-600">{seller.stats.reviews} Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{seller.stats.templates}</div>
                  <div className="text-xs text-gray-600">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{seller.stats.followers}</div>
                  <div className="text-xs text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{seller.products.length}</div>
                  <div className="text-xs text-gray-600">Products</div>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle size={16} />
                  Message
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users size={16} />
                  Follow
                </button>
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
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Award size={20} />
              Templates ({seller.templates.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'products'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Package size={20} />
              Products ({seller.products.length})
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'templates' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        {template.category}
                      </div>
                      <div className="text-lg font-bold text-green-600">${template.price}</div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="flex items-center gap-3 mb-4 bg-gray-50 rounded-lg p-3">
                      <img
                        src={template.vaporizer.image}
                        alt={template.vaporizer.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{template.vaporizer.name}</h4>
                        <p className="text-sm text-gray-600">{template.vaporizer.brand}</p>
                        <p className="text-sm font-bold text-green-600">${template.vaporizer.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart size={14} />
                          {template.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Download size={14} />
                          {template.downloads}
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                        <ShoppingCart size={14} />
                        Buy Template
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
                        {product.condition.replace('-', ' ')}
                      </span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">{product.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      {product.originalPrice && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          Save ${product.originalPrice - product.price}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="flex gap-2">
                      <button 
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                          product.inStock
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Trust & Safety */}
        <motion.div
          className="mt-12 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-blue-600" size={24} />
            <h3 className="text-lg font-bold text-blue-800">Trust & Safety</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-blue-700">
              <Verified size={16} />
              <span>Identity Verified</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <Shield size={16} />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <Award size={16} />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};