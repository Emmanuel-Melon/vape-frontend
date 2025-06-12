import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, Users, Award, Target, Heart, Star, Quote, 
  CheckCircle, Zap, Shield, TrendingUp, Globe, 
  MessageCircle, Coffee, Lightbulb, Rocket, 
  ChevronDown, ChevronUp, HelpCircle
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';
import { Footer } from './Footer';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
  featured?: boolean;
  category: 'user' | 'expert' | 'seller';
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  expertise: string[];
}

interface Stat {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
  description: string;
  color: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'quiz' | 'recommendations' | 'technical' | 'sellers';
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How does TryThisVape\'s recommendation algorithm work?',
    answer: 'Our AI-powered algorithm analyzes your responses to our comprehensive quiz, considering factors like experience level, usage patterns, budget, and personal priorities. It then matches these preferences against our extensive database of vaporizers, taking into account real user reviews, expert evaluations, and technical specifications to provide personalized recommendations with match scores.',
    category: 'quiz'
  },
  {
    id: 'faq-2',
    question: 'Is TryThisVape free to use?',
    answer: 'Yes! Taking our vaporizer finder quiz and getting personalized recommendations is completely free. We also offer free access to community templates and basic features. Some premium templates from expert sellers may have a small fee, but the core recommendation service will always be free.',
    category: 'general'
  },
  {
    id: 'faq-3',
    question: 'How accurate are the recommendations?',
    answer: 'Our recommendations have a 94% satisfaction rate based on user feedback. We continuously improve our algorithm using machine learning and real user data. However, personal preferences can be subjective, which is why we provide detailed explanations for each recommendation and offer alternatives.',
    category: 'recommendations'
  },
  {
    id: 'faq-4',
    question: 'Can I save and compare multiple quiz results?',
    answer: 'Absolutely! You can save unlimited quiz results with custom nicknames, compare different scenarios (like different budgets or use cases), and easily access your saved recommendations anytime. This is perfect for exploring different options or sharing results with friends.',
    category: 'quiz'
  },
  {
    id: 'faq-5',
    question: 'Do you sell vaporizers directly?',
    answer: 'No, TryThisVape is a recommendation platform, not a retailer. We connect you with verified sellers and trusted retailers who offer the products we recommend. This allows us to remain unbiased in our recommendations and focus purely on finding the best match for your needs.',
    category: 'general'
  },
  {
    id: 'faq-6',
    question: 'How do you verify sellers on your platform?',
    answer: 'All sellers go through a comprehensive verification process including identity verification, business license validation, and reputation checks. We also monitor customer feedback and maintain quality standards. Verified sellers display badges indicating their verification status.',
    category: 'sellers'
  },
  {
    id: 'faq-7',
    question: 'What if I\'m not happy with my recommended vaporizer?',
    answer: 'While we can\'t control the purchase experience (since we don\'t sell directly), we encourage feedback on our recommendations. If a recommendation doesn\'t work out, let us know! We use this feedback to improve our algorithm. Many of our partner sellers also offer return policies.',
    category: 'recommendations'
  },
  {
    id: 'faq-8',
    question: 'How often do you update your vaporizer database?',
    answer: 'We update our database continuously as new products are released and as we gather more user feedback. Our team of experts regularly reviews and tests new vaporizers, and we update product information, ratings, and availability in real-time.',
    category: 'technical'
  },
  {
    id: 'faq-9',
    question: 'Can I use TryThisVape if I\'m a complete beginner?',
    answer: 'Absolutely! TryThisVape is designed to be beginner-friendly. Our quiz includes educational content, and we provide detailed explanations for our recommendations. We also offer beginner-specific templates and guides to help you get started safely and confidently.',
    category: 'general'
  },
  {
    id: 'faq-10',
    question: 'Do you have a mobile app?',
    answer: 'Currently, TryThisVape is a web-based platform optimized for mobile browsers. Our responsive design works seamlessly on all devices. We\'re considering a dedicated mobile app based on user demand - let us know if you\'d be interested!',
    category: 'technical'
  },
  {
    id: 'faq-11',
    question: 'How can I become a verified seller on TryThisVape?',
    answer: 'To become a verified seller, visit our Store Setup page and complete the verification process. You\'ll need to provide business documentation, identity verification, and meet our quality standards. Once approved, you can create templates, list products, and connect with customers.',
    category: 'sellers'
  },
  {
    id: 'faq-12',
    question: 'What makes TryThisVape different from other vaporizer sites?',
    answer: 'Unlike review sites or retailers, we focus purely on personalized matching using AI. We don\'t sell products, so our recommendations are unbiased. We combine expert knowledge, user feedback, and advanced algorithms to provide recommendations tailored specifically to your needs and preferences.',
    category: 'general'
  }
];

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Chen',
    role: 'Cannabis Consultant',
    company: 'Green Wellness',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'TryThisVape completely transformed how I recommend devices to my clients. The AI-powered matching is incredibly accurate, and my clients are consistently happy with their purchases.',
    rating: 5,
    featured: true,
    category: 'expert'
  },
  {
    id: 'test-2',
    name: 'Mike Rodriguez',
    role: 'First-time Vaper',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'I was completely overwhelmed by all the vaporizer options out there. TryThisVape made it so simple - answered a few questions and got the perfect recommendation. Love my new device!',
    rating: 5,
    featured: true,
    category: 'user'
  },
  {
    id: 'test-3',
    name: 'Alex Thompson',
    role: 'Vape Store Owner',
    company: 'CloudNine Vapes',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'As a seller on TryThisVape, I\'ve seen a 300% increase in qualified leads. Customers come to me already knowing what they want, making sales much smoother.',
    rating: 5,
    featured: true,
    category: 'seller'
  },
  {
    id: 'test-4',
    name: 'Dr. Emily Watson',
    role: 'Medical Cannabis Specialist',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'The precision of TryThisVape\'s recommendations for medical patients is outstanding. It considers dosing needs and ease of use perfectly.',
    rating: 5,
    category: 'expert'
  },
  {
    id: 'test-5',
    name: 'Jordan Kim',
    role: 'Cannabis Enthusiast',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'I\'ve tried dozens of vaporizers over the years. TryThisVape helped me discover devices I never would have considered, and they\'ve become my favorites.',
    rating: 5,
    category: 'user'
  },
  {
    id: 'test-6',
    name: 'Lisa Park',
    role: 'Budtender',
    company: 'Elevated Dispensary',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    content: 'TryThisVape has become an essential tool in our dispensary. We use it to help customers find the right device, and it\'s never let us down.',
    rating: 5,
    category: 'expert'
  }
];

const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'David Chen',
    role: 'Founder & CEO',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Former cannabis industry executive with 10+ years of experience. Passionate about making vaping accessible to everyone.',
    expertise: ['Cannabis Industry', 'Product Strategy', 'AI/ML']
  },
  {
    id: 'team-2',
    name: 'Maria Rodriguez',
    role: 'Head of Product',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'UX designer turned product leader. Believes in creating intuitive experiences that solve real problems.',
    expertise: ['Product Design', 'User Research', 'Cannabis Education']
  },
  {
    id: 'team-3',
    name: 'James Wilson',
    role: 'Lead Engineer',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
    bio: 'Full-stack engineer with expertise in AI and machine learning. Builds the technology that powers our recommendations.',
    expertise: ['Machine Learning', 'Backend Systems', 'Data Science']
  }
];

const stats: Stat[] = [
  {
    icon: Users,
    value: '50K+',
    label: 'Happy Users',
    description: 'People who found their perfect vaporizer',
    color: 'text-green-600'
  },
  {
    icon: Star,
    value: '4.9',
    label: 'Average Rating',
    description: 'User satisfaction score',
    color: 'text-yellow-600'
  },
  {
    icon: Zap,
    value: '1M+',
    label: 'Recommendations',
    description: 'Personalized matches made',
    color: 'text-blue-600'
  },
  {
    icon: Award,
    value: '500+',
    label: 'Expert Reviews',
    description: 'Professional evaluations',
    color: 'text-purple-600'
  }
];

export const AboutPage: React.FC = () => {
  const [activeTestimonialCategory, setActiveTestimonialCategory] = useState<'all' | 'user' | 'expert' | 'seller'>('all');
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'general' | 'quiz' | 'recommendations' | 'technical' | 'sellers'>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredTestimonials = activeTestimonialCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeTestimonialCategory);

  const filteredFaqs = activeFaqCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeFaqCategory);

  const featuredTestimonials = testimonials.filter(t => t.featured);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌿
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            About TryThisVape
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to help everyone find their perfect vaporizer through AI-powered recommendations, 
            expert insights, and a passionate community of cannabis enthusiasts.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To democratize access to cannabis vaporization by providing personalized, AI-driven recommendations 
              that help users find devices perfectly suited to their needs, experience level, and preferences.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              A world where every cannabis user has access to the perfect vaporization experience, supported by 
              technology, community knowledge, and expert guidance that makes the complex simple.
            </p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-16 border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <stat.icon size={28} className={stat.color} />
                  </div>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from users, experts, and sellers who've experienced the TryThisVape difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Quote className="text-white" size={16} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="mt-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    testimonial.category === 'user' ? 'bg-green-100 text-green-700' :
                    testimonial.category === 'expert' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {testimonial.category === 'user' ? 'User' : 
                     testimonial.category === 'expert' ? 'Expert' : 'Seller'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="text-green-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about TryThisVape and how we help you find the perfect vaporizer.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* FAQ Category Filter */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All Questions', count: faqs.length },
                  { value: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length },
                  { value: 'quiz', label: 'Quiz & Results', count: faqs.filter(f => f.category === 'quiz').length },
                  { value: 'recommendations', label: 'Recommendations', count: faqs.filter(f => f.category === 'recommendations').length },
                  { value: 'technical', label: 'Technical', count: faqs.filter(f => f.category === 'technical').length },
                  { value: 'sellers', label: 'For Sellers', count: faqs.filter(f => f.category === 'sellers').length }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFaqCategory(filter.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFaqCategory === filter.value
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="p-6">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <h3 className="font-semibold text-gray-800 pr-4">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown size={20} className="text-gray-500" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-white border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            <div className="mt-3">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                faq.category === 'general' ? 'bg-blue-100 text-blue-700' :
                                faq.category === 'quiz' ? 'bg-green-100 text-green-700' :
                                faq.category === 'recommendations' ? 'bg-purple-100 text-purple-700' :
                                faq.category === 'technical' ? 'bg-orange-100 text-orange-700' :
                                'bg-pink-100 text-pink-700'
                              }`}>
                                {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Contact Support */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <MessageCircle className="mx-auto text-blue-600 mb-3" size={32} />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Still have questions?</h3>
                  <p className="text-gray-600 mb-4">
                    Can't find what you're looking for? Our support team is here to help!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Contact Support
                    </button>
                    <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                      Join Discord Community
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">More Testimonials</h3>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All', count: testimonials.length },
                  { value: 'user', label: 'Users', count: testimonials.filter(t => t.category === 'user').length },
                  { value: 'expert', label: 'Experts', count: testimonials.filter(t => t.category === 'expert').length },
                  { value: 'seller', label: 'Sellers', count: testimonials.filter(t => t.category === 'seller').length }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveTestimonialCategory(filter.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTestimonialCategory === filter.value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTestimonials.filter(t => !t.featured).map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h5 className="font-medium text-gray-800">{testimonial.name}</h5>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to revolutionizing how people discover and choose vaporizers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TryThisVape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'User-First',
                description: 'Every decision we make prioritizes user experience and satisfaction.',
                color: 'from-red-500 to-pink-500'
              },
              {
                icon: Shield,
                title: 'Trust & Safety',
                description: 'We maintain the highest standards for product recommendations and seller verification.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Globe,
                title: 'Accessibility',
                description: 'Making cannabis vaporization knowledge accessible to everyone, everywhere.',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: Rocket,
                title: 'Innovation',
                description: 'Continuously improving our AI and technology to serve users better.',
                color: 'from-purple-500 to-indigo-500'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Vaporizer?</h2>
          <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who've discovered their ideal vaping experience through our AI-powered recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
            >
              Take the Quiz
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/explore'}
            >
              Explore Templates
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};