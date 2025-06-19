export const getCategoryColor = (category: string) => {
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

export const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'verified': return 'bg-blue-500';
    case 'expert': return 'bg-purple-500';
    case 'top-seller': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

export const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case 'verified': return '✓';
    case 'expert': return '🎓';
    case 'top-seller': return '⭐';
    default: return '';
  }
};

export const getBadgeLabel = (badge: string) => {
  switch (badge) {
    case 'verified': return 'Verified Seller';
    case 'expert': return 'Community Expert';
    case 'top-seller': return 'Top Seller';
    default: return '';
  }
};

export const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'new': return 'bg-green-100 text-green-800';
    case 'like-new': return 'bg-blue-100 text-blue-800';
    case 'good': return 'bg-yellow-100 text-yellow-800';
    case 'fair': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
