// Mock data
export const mockUsers = [
  {
    id: '1',
    username: 'vapemaster_92',
    email: 'vapemaster@email.com',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    avatar: 'https://avatar.iran.liara.run/public/boy?username=vapemaster_92',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    totalPurchases: 15,
    totalSales: 8
  },
  {
    id: '2',
    username: 'cloudchaser_x',
    email: 'cloudchaser@email.com',
    role: 'USER' as const,
    status: 'PENDING' as const,
    avatar: 'https://avatar.iran.liara.run/public/girl?username=cloudchaser_x',
    joinDate: '2024-02-20',
    lastActive: '1 day ago',
    totalPurchases: 3,
    totalSales: 12
  },
  {
    id: '3',
    username: 'admin_sarah',
    email: 'sarah@admin.com',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    avatar: 'https://avatar.iran.liara.run/public/girl?username=admin_sarah',
    joinDate: '2023-12-01',
    lastActive: '30 minutes ago',
    totalPurchases: 0,
    totalSales: 0
  }
];

export const mockProducts = [
  {
    id: '1',
    name: 'Storz & Bickel Mighty+',
    brand: 'Storz & Bickel',
    price: 399,
    category: 'Portable Vaporizer',
    inStock: true,
    condition: 'new' as const,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=300',
    seller: 'vapemaster_92',
    views: 245,
    status: 'ACTIVE' as const,
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'PAX 3 Complete Kit',
    brand: 'PAX',
    price: 199,
    category: 'Portable Vaporizer',
    inStock: false,
    condition: 'like-new' as const,
    image: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=300',
    seller: 'cloudchaser_x',
    views: 156,
    status: 'PENDING' as const,
    createdAt: '2024-01-22'
  }
];

export const mockQuizzes = [
  {
    id: 1,
    title: 'Vaporizer Preference Quiz',
    description: 'Help users find their perfect vaporizer based on their preferences and usage patterns.',
    questionCount: 12,
    totalAttempts: 1547,
    completionRate: 87,
    avgScore: 8.4,
    status: 'ACTIVE' as const,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25'
  },
  {
    id: 2,
    title: 'Advanced User Assessment',
    description: 'Detailed questionnaire for experienced users looking for specific features.',
    questionCount: 8,
    totalAttempts: 432,
    completionRate: 92,
    avgScore: 9.1,
    status: 'ACTIVE' as const,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15'
  },
  {
    id: 3,
    title: 'Beginner Friendly Quiz',
    description: 'Simple quiz for newcomers to vaping to understand basic preferences.',
    questionCount: 6,
    totalAttempts: 89,
    completionRate: 76,
    avgScore: 7.2,
    status: 'DRAFT' as const,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-22'
  }
];

// Mock quiz questions for preview
export const mockQuizQuestions = [
  {
    id: 'q1',
    text: 'Welcome to the Vaporizer Preference Quiz!',
    subtitle: 'This quiz will help us understand your preferences and recommend the perfect vaporizer for your needs. It should take about 3-5 minutes to complete.',
    type: 'WELCOME' as const,
    order: 1,
    options: []
  },
  {
    id: 'q2',
    text: 'What is your primary use case for a vaporizer?',
    subtitle: 'This helps us understand your main vaping goals.',
    type: 'SINGLE_SELECT' as const,
    order: 2,
    options: [
      { id: 'opt1', label: 'Medical/Therapeutic', value: 'medical', description: 'For pain relief, anxiety, or other medical conditions' },
      { id: 'opt2', label: 'Recreational/Social', value: 'recreational', description: 'For relaxation and social activities' },
      { id: 'opt3', label: 'Flavor Exploration', value: 'flavor', description: 'To experience different strains and flavors' },
      { id: 'opt4', label: 'Efficiency/Conservation', value: 'efficiency', description: 'To make your material last longer' }
    ]
  },
  {
    id: 'q3',
    text: 'Which features are most important to you?',
    subtitle: 'Select all features that matter for your ideal vaporizer.',
    type: 'MULTI_SELECT' as const,
    order: 3,
    options: [
      { id: 'opt5', label: 'Portability', value: 'portable', description: 'Easy to carry and use on-the-go' },
      { id: 'opt6', label: 'Battery Life', value: 'battery', description: 'Long-lasting power for extended sessions' },
      { id: 'opt7', label: 'Temperature Control', value: 'temp_control', description: 'Precise temperature settings' },
      { id: 'opt8', label: 'Easy Cleaning', value: 'easy_clean', description: 'Simple maintenance and cleaning' },
      { id: 'opt9', label: 'Vapor Quality', value: 'vapor_quality', description: 'Smooth, flavorful vapor production' },
      { id: 'opt10', label: 'Stealth/Discretion', value: 'stealth', description: 'Minimal odor and discreet appearance' }
    ]
  },
  {
    id: 'q4',
    text: 'Rank these vaporizer types by preference',
    subtitle: 'Order them from most preferred (1) to least preferred.',
    type: 'RANKED_SELECT' as const,
    order: 4,
    maxRank: 4,
    options: [
      { id: 'opt11', label: 'Desktop Vaporizer', value: 'desktop', description: 'Powerful, plug-in units for home use' },
      { id: 'opt12', label: 'Portable Dry Herb', value: 'portable_herb', description: 'Battery-powered, pocket-sized units' },
      { id: 'opt13', label: 'Pen-Style Vaporizer', value: 'pen_style', description: 'Ultra-compact, pen-like devices' },
      { id: 'opt14', label: 'Hybrid Vaporizer', value: 'hybrid', description: 'Versatile units for multiple materials' }
    ]
  },
  {
    id: 'q5',
    text: 'What is your budget range?',
    subtitle: 'Move the slider to indicate your preferred price range.',
    type: 'RANGE_SLIDER' as const,
    order: 5,
    rangeMin: 50,
    rangeMax: 500,
    rangeStep: 25,
    rangeDefault: 200,
    options: []
  }
];

export const mockActivities = [
  {
    id: '1',
    type: 'user_registered' as const,
    message: 'New user registered and completed verification',
    timestamp: '2 minutes ago',
    user: 'vape_newbie_23'
  },
  {
    id: '2',
    type: 'purchase_made' as const,
    message: 'Purchase completed for Storz & Bickel Mighty+',
    timestamp: '15 minutes ago',
    user: 'cloudchaser_x',
    amount: 399
  },
  {
    id: '3',
    type: 'product_listed' as const,
    message: 'New product listed pending approval',
    timestamp: '1 hour ago',
    user: 'vapemaster_92'
  },
  {
    id: '4',
    type: 'report_submitted' as const,
    message: 'User reported suspicious activity',
    timestamp: '2 hours ago',
    user: 'safety_first_88'
  }
];

export const mockRevenueData = [
  { month: 'Jan', revenue: 12500, transactions: 45 },
  { month: 'Feb', revenue: 15200, transactions: 52 },
  { month: 'Mar', revenue: 18900, transactions: 67 },
  { month: 'Apr', revenue: 22100, transactions: 78 },
  { month: 'May', revenue: 19800, transactions: 71 },
  { month: 'Jun', revenue: 25400, transactions: 89 }
];