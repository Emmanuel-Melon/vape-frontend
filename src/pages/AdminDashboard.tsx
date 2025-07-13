import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Package, TrendingUp, AlertTriangle,
  Search, Filter, Download, Settings, Bell, Eye,
  BarChart3, PieChart, CheckCircle, HelpCircle, Plus
} from 'lucide-react';
import { CloudBackground } from '../components/layout/CloudBackground';
import { CloudNavbar } from '../components/layout/CloudNavbar';
import { StatsCard } from '../components/admin/StatsCard';
import { UserManagementCard } from '../components/admin/UserManagementCard';
import { ProductManagementCard } from '../components/admin/ProductManagementCard';
import { QuizManagementCard } from '../components/admin/QuizManagementCard';
import { ActivityFeed } from '../components/admin/ActivityFeed';
import { RevenueChart } from '../components/admin/RevenueChart';
import { QuizEditor } from '../components/admin/QuizEditor';
import { QuizPreview } from '../components/admin/QuizPreview';
import { mockUsers, mockProducts, mockQuizzes, mockQuizQuestions, mockActivities, mockRevenueData } from '../data/admin';


export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'quizzes' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuizEditor, setShowQuizEditor] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [showQuizPreview, setShowQuizPreview] = useState(false);
  const [previewingQuiz, setPreviewingQuiz] = useState<any>(null);

  const handleUserAction = (action: string, user: any) => {
    console.log(`Action: ${action} for user:`, user);
    // Handle user actions here
  };

  const handleProductAction = (action: string, product: any) => {
    console.log(`Action: ${action} for product:`, product);
    // Handle product actions here
  };

  const handleQuizAction = (action: string, quiz: any) => {
    console.log(`Action: ${action} for quiz:`, quiz);
    switch (action) {
      case 'view':
        setPreviewingQuiz(quiz);
        setShowQuizPreview(true);
        break;
      case 'edit':
        setEditingQuiz(quiz);
        setShowQuizEditor(true);
        break;
      case 'analytics':
        // Handle quiz analytics
        break;
      case 'delete':
        // Handle delete quiz
        break;
    }
  };

  const handleSaveQuiz = (quizData: any, questions: any[]) => {
    console.log('Saving quiz:', quizData, questions);
    // Handle save quiz logic here
    setShowQuizEditor(false);
    setEditingQuiz(null);
  };

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'analytics', label: 'Analytics', icon: PieChart }
  ];

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      <CloudNavbar />
      
      {/* Main Content */}
      <div className="pt-20">
        {/* Page Content */}
        <div className="container mx-auto px-6 py-8 relative z-10">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage users, products, quizzes, and monitor platform activity</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/60 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-white/50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Total Users"
                  value="2,547"
                  change="12%"
                  changeType="increase"
                  icon={Users}
                  color="bg-blue-600"
                  index={0}
                />
                <StatsCard
                  title="Active Products"
                  value="1,234"
                  change="8%"
                  changeType="increase"
                  icon={Package}
                  color="bg-green-600"
                  index={1}
                />
                <StatsCard
                  title="Quiz Completions"
                  value="2,068"
                  change="23%"
                  changeType="increase"
                  icon={HelpCircle}
                  color="bg-purple-600"
                  index={2}
                />
                <StatsCard
                  title="Pending Reviews"
                  value="47"
                  change="3%"
                  changeType="decrease"
                  icon={AlertTriangle}
                  color="bg-orange-600"
                  index={3}
                />
              </div>

              {/* Charts and Activity */}
              <div className="grid lg:grid-cols-2 gap-8">
                <RevenueChart data={mockRevenueData} type="line" />
                <ActivityFeed activities={mockActivities} />
              </div>

              {/* Quick Actions */}
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { title: 'Verify Users', count: 12, color: 'bg-blue-600', icon: CheckCircle },
                  { title: 'Review Products', count: 8, color: 'bg-green-600', icon: Eye },
                  { title: 'Quiz Analytics', count: 5, color: 'bg-purple-600', icon: HelpCircle },
                  { title: 'System Alerts', count: 2, color: 'bg-yellow-600', icon: Bell }
                ].map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.title}
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 text-left"
                      whileHover={{ scale: 1.02, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">{action.count}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">User Management</h3>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.map((user, index) => (
                  <UserManagementCard
                    key={user.id}
                    user={user}
                    index={index}
                    onAction={handleUserAction}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Product Management</h3>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Package size={16} />
                    Add Product
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product, index) => (
                  <ProductManagementCard
                    key={product.id}
                    product={product}
                    index={index}
                    onAction={handleProductAction}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quizzes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Quiz Management</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setEditingQuiz(null);
                      setShowQuizEditor(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={16} />
                    Create Quiz
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockQuizzes.map((quiz, index) => (
                  <QuizManagementCard
                    key={quiz.id}
                    quiz={quiz}
                    index={index}
                    onAction={handleQuizAction}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <RevenueChart data={mockRevenueData} type="bar" />
                <RevenueChart data={mockRevenueData} type="line" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <StatsCard
                  title="Conversion Rate"
                  value="3.2%"
                  change="0.5%"
                  changeType="increase"
                  icon={TrendingUp}
                  color="bg-emerald-600"
                  index={0}
                />
                <StatsCard
                  title="Avg. Quiz Score"
                  value="8.4/10"
                  change="0.3"
                  changeType="increase"
                  icon={HelpCircle}
                  color="bg-blue-600"
                  index={1}
                />
                <StatsCard
                  title="User Satisfaction"
                  value="4.8/5"
                  change="0.2"
                  changeType="increase"
                  icon={CheckCircle}
                  color="bg-green-600"
                  index={2}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Editor Modal */}
      <AnimatePresence>
        {showQuizEditor && (
          <QuizEditor
            quiz={editingQuiz}
            onSave={handleSaveQuiz}
            onCancel={() => {
              setShowQuizEditor(false);
              setEditingQuiz(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Quiz Preview Modal */}
      <AnimatePresence>
        {showQuizPreview && previewingQuiz && (
          <QuizPreview
            quiz={previewingQuiz}
            questions={mockQuizQuestions}
            onClose={() => {
              setShowQuizPreview(false);
              setPreviewingQuiz(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};