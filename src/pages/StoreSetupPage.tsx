import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, User, MapPin, Calendar, Award, Camera, Upload, 
  DollarSign, Package, Star, Shield, CheckCircle, 
  AlertCircle, Info, Plus, X, Edit3, Save
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';

interface StoreProfile {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  avatar: string;
  coverImage: string;
  specialties: string[];
  verificationStatus: 'pending' | 'verified' | 'none';
  storeSettings: {
    acceptsCustomOrders: boolean;
    responseTime: string;
    shippingRegions: string[];
    paymentMethods: string[];
  };
}

interface StoreProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  description: string;
  images: string[];
  inStock: boolean;
  quantity: number;
}

interface StoreTemplate {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  vaporizer: {
    name: string;
    brand: string;
    price: number;
  };
  preferences: any;
}

export const StoreSetupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'products' | 'templates' | 'analytics'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);

  const [storeProfile, setStoreProfile] = useState<StoreProfile>({
    displayName: 'John Doe',
    username: 'VapeExpert_John',
    bio: 'Cannabis enthusiast with 5+ years of experience. Specializing in premium vaporizers and beginner-friendly setups.',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    coverImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    specialties: ['Premium Vapes', 'Beginner Setups', 'Flavor Optimization'],
    verificationStatus: 'pending',
    storeSettings: {
      acceptsCustomOrders: true,
      responseTime: '24 hours',
      shippingRegions: ['United States', 'Canada'],
      paymentMethods: ['PayPal', 'Stripe', 'Crypto']
    }
  });

  const [products, setProducts] = useState<StoreProduct[]>([
    {
      id: 'prod-1',
      name: 'Mighty+ Vaporizer',
      brand: 'Storz & Bickel',
      price: 379,
      originalPrice: 399,
      category: 'Portable Vaporizer',
      condition: 'new',
      description: 'Brand new Mighty+ with full warranty. Includes all original accessories plus bonus dosing capsules.',
      images: ['https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300'],
      inStock: true,
      quantity: 3
    },
    {
      id: 'prod-2',
      name: 'Glass Stem Set',
      brand: 'Custom',
      price: 35,
      category: 'Accessories',
      condition: 'new',
      description: 'Handcrafted borosilicate glass stems. Set of 3 different lengths for various vaporizers.',
      images: ['https://images.pexels.com/photos/7148621/pexels-photo-7148621.jpeg?auto=compress&cs=tinysrgb&w=300'],
      inStock: true,
      quantity: 10
    }
  ]);

  const [templates, setTemplates] = useState<StoreTemplate[]>([
    {
      id: 'template-1',
      title: 'Premium Flavor Setup',
      description: 'Complete guide for maximum flavor extraction with premium convection vaporizers.',
      price: 25,
      category: 'advanced',
      vaporizer: {
        name: 'TinyMight 2',
        brand: 'TinyMight',
        price: 349
      },
      preferences: {}
    }
  ]);

  const specialtyOptions = [
    'Premium Vapes', 'Budget Vapes', 'Beginner Setups', 'Advanced Setups',
    'Flavor Optimization', 'Medical Cannabis', 'Desktop Vapes', 'Portable Vapes',
    'Accessories', 'Custom Builds', 'Maintenance', 'Consultation'
  ];

  const categoryOptions = [
    'Portable Vaporizer', 'Desktop Vaporizer', 'Accessories', 'Parts', 'Custom'
  ];

  const conditionOptions = [
    { value: 'new', label: 'New', description: 'Brand new, never used' },
    { value: 'like-new', label: 'Like New', description: 'Barely used, excellent condition' },
    { value: 'good', label: 'Good', description: 'Used but well maintained' },
    { value: 'fair', label: 'Fair', description: 'Shows wear but fully functional' }
  ];

  const getVerificationBadge = () => {
    switch (storeProfile.verificationStatus) {
      case 'verified':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">Verified Seller</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertCircle size={20} />
            <span className="font-medium">Verification Pending</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <Info size={20} />
            <span className="font-medium">Not Verified</span>
          </div>
        );
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

  const handleAddSpecialty = (specialty: string) => {
    if (!storeProfile.specialties.includes(specialty)) {
      setStoreProfile(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setStoreProfile(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Store Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
          <img
            src={storeProfile.coverImage}
            alt="Store cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
            <Camera size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative -mt-16 mb-4">
                <img
                  src={storeProfile.avatar}
                  alt={storeProfile.displayName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              {getVerificationBadge()}
            </div>

            {/* Store Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-1">{storeProfile.displayName}</h1>
                  <p className="text-gray-600 mb-2">@{storeProfile.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {storeProfile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      Joined March 2024
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input
                      type="text"
                      value={storeProfile.displayName}
                      onChange={(e) => setStoreProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={storeProfile.username}
                      onChange={(e) => setStoreProfile(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={storeProfile.bio}
                      onChange={(e) => setStoreProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={storeProfile.location}
                      onChange={(e) => setStoreProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mb-6">{storeProfile.bio}</p>
              )}

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {storeProfile.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {specialty}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSpecialty(specialty)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex flex-wrap gap-2">
                    {specialtyOptions
                      .filter(option => !storeProfile.specialties.includes(option))
                      .map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddSpecialty(option)}
                          className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm hover:bg-gray-50 transition-colors"
                        >
                          + {option}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* Store Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{products.length}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
                  <div className="text-sm text-gray-600">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                    4.9 <Star size={16} fill="currentColor" />
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">Sales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Store Settings */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Shield size={20} />
          Store Settings
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={storeProfile.storeSettings.acceptsCustomOrders}
                onChange={(e) => setStoreProfile(prev => ({
                  ...prev,
                  storeSettings: { ...prev.storeSettings, acceptsCustomOrders: e.target.checked }
                }))}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-gray-700">Accept custom orders</span>
            </label>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
              <select
                value={storeProfile.storeSettings.responseTime}
                onChange={(e) => setStoreProfile(prev => ({
                  ...prev,
                  storeSettings: { ...prev.storeSettings, responseTime: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="1 hour">Within 1 hour</option>
                <option value="24 hours">Within 24 hours</option>
                <option value="48 hours">Within 48 hours</option>
                <option value="1 week">Within 1 week</option>
              </select>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Regions</label>
              <div className="space-y-2">
                {['United States', 'Canada', 'Europe', 'Worldwide'].map((region) => (
                  <label key={region} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={storeProfile.storeSettings.shippingRegions.includes(region)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStoreProfile(prev => ({
                            ...prev,
                            storeSettings: {
                              ...prev.storeSettings,
                              shippingRegions: [...prev.storeSettings.shippingRegions, region]
                            }
                          }));
                        } else {
                          setStoreProfile(prev => ({
                            ...prev,
                            storeSettings: {
                              ...prev.storeSettings,
                              shippingRegions: prev.storeSettings.shippingRegions.filter(r => r !== region)
                            }
                          }));
                        }
                      }}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Verification Status */}
      <motion.div
        className="bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-blue-800 mb-4">Seller Verification</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20} />
            <div>
              <div className="font-medium text-gray-800">Identity Verified</div>
              <div className="text-sm text-gray-600">Government ID confirmed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="text-yellow-500" size={20} />
            <div>
              <div className="font-medium text-gray-800">Business License</div>
              <div className="text-sm text-gray-600">Pending review</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Info className="text-gray-500" size={20} />
            <div>
              <div className="font-medium text-gray-800">Expert Certification</div>
              <div className="text-sm text-gray-600">Not started</div>
            </div>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Complete Verification
        </button>
      </motion.div>
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      {/* Add Product Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Products ({products.length})</h2>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(product.condition)}`}>
                  {product.condition.replace('-', ' ')}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Mighty+ Vaporizer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., Storz & Bickel"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="299"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      {categoryOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                      {conditionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Detailed product description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );

  const renderTemplatesTab = () => (
    <div className="space-y-6">
      {/* Add Template Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Templates ({templates.length})</h2>
        <button
          onClick={() => setShowAddTemplate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {template.category}
              </div>
              <div className="text-lg font-bold text-green-600">${template.price}</div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-gray-800 mb-1">Recommended Vaporizer</h4>
              <p className="text-sm text-gray-600">{template.vaporizer.name} by {template.vaporizer.brand}</p>
              <p className="text-sm font-bold text-green-600">${template.vaporizer.price}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Store Analytics</h2>
      
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DollarSign className="mx-auto text-green-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-800">$2,450</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </motion.div>
        
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Package className="mx-auto text-blue-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-sm text-gray-600">Total Sales</div>
        </motion.div>
        
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="mx-auto text-yellow-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-800">4.9</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </motion.div>
        
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <User className="mx-auto text-purple-600 mb-2" size={24} />
          <div className="text-2xl font-bold text-gray-800">89</div>
          <div className="text-sm text-gray-600">Customers</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New sale', item: 'Mighty+ Vaporizer', amount: '$379', time: '2 hours ago' },
            { action: 'Template purchased', item: 'Premium Flavor Setup', amount: '$25', time: '5 hours ago' },
            { action: 'New review', item: '5 stars on Glass Stem Set', amount: '', time: '1 day ago' },
            { action: 'Product added', item: 'Custom WPA Adapter', amount: '', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-sm text-gray-600">{activity.item}</div>
              </div>
              <div className="text-right">
                {activity.amount && <div className="font-bold text-green-600">{activity.amount}</div>}
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

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
            🏪
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            My Store
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your seller profile, products, and templates. Start monetizing your vaping expertise today.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'templates', label: 'Templates', icon: Award },
              { id: 'analytics', label: 'Analytics', icon: DollarSign }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors min-w-0 ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
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
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </motion.div>
      </div>
    </div>
  );
};