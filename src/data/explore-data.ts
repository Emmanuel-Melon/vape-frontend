import { CommunityTemplate } from '../types/explore';

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
export const allTemplates = [
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
