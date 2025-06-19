export interface CommunityTemplate {
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
