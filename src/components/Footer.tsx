import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Mail, Phone, MapPin, Heart, Star, 
  Twitter, Instagram, Youtube, Github, 
  ArrowUp, ExternalLink, Shield, Award,
  Users, Zap, Coffee, MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Vaporizer Quiz', href: '/', internal: true },
        { label: 'Browse Templates', href: '/explore', internal: true },
        { label: 'Saved Results', href: '/saved', internal: true },
        { label: 'Seller Dashboard', href: '/store-setup', internal: true }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Vaping Guide', href: '#' },
        { label: 'Temperature Guide', href: '#' },
        { label: 'Maintenance Tips', href: '#' },
        { label: 'Safety Guidelines', href: '#' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Expert Reviews', href: '#' },
        { label: 'User Forums', href: '#' },
        { label: 'Success Stories', href: '#' },
        { label: 'Become a Seller', href: '/store-setup', internal: true },
        { label: 'Affiliate Program', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', internal: true },
        { label: 'Our Mission', href: '/about', internal: true },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-400' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Users' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Zap, value: '1M+', label: 'Recommendations' },
    { icon: Award, value: '500+', label: 'Expert Reviews' }
  ];

  const handleLinkClick = (href: string, internal?: boolean) => {
    if (internal) {
      navigate(href);
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-green-400/10 to-blue-400/10 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Community Spotlight Section */}
        <motion.div
          className="border-b border-gray-700/50 py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <motion.div
                className="text-4xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Join Our Amazing Community!
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Connect with fellow vaping enthusiasts, get exclusive content, and support our mission to help everyone find their perfect vaporizer!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Discord Community */}
              <motion.a
                href="https://discord.gg/trythisvape"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* Discord Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        className="text-3xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💬
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">Discord Community</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-purple-200 text-sm">12,500+ Members Online</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-purple-100 mb-6 leading-relaxed">
                    Join our vibrant Discord server for real-time discussions, exclusive giveaways, 
                    expert Q&As, and connect with the most passionate vaping community!
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-purple-200">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>12.5K Members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>24/7 Active</span>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Join Now
                      <ExternalLink size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Floating Discord Icons */}
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/10 text-2xl"
                    style={{
                      left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 60}%`,
                      top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    💬
                  </motion.div>
                ))}
              </motion.a>

              {/* Patreon Support */}
              <motion.a
                href="https://patreon.com/trythisvape"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 hover:from-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Patreon Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M15 0l15 15-15 15L0 15z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        className="text-3xl"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ❤️
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">Support Us</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-orange-200 text-sm">850+ Supporters</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-orange-100 mb-6 leading-relaxed">
                    Help us keep TryThisVape free and ad-free! Get exclusive perks, early access to features, 
                    and special supporter badges in our community.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-orange-200">
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>850 Patrons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>$5+ Perks</span>
                      </div>
                    </div>
                    <motion.div
                      className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      Become a Patron
                      <ExternalLink size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Floating Heart Icons */}
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/10 text-xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </motion.a>
            </div>

            {/* Community Benefits */}
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { icon: '🎁', label: 'Exclusive Giveaways' },
                { icon: '🔥', label: 'Early Access' },
                { icon: '🏆', label: 'Special Badges' },
                { icon: '💡', label: 'Expert Tips' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <div className="text-sm text-gray-300 font-medium">{benefit.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="border-b border-gray-700/50 py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Trusted by the Community</h3>
              <p className="text-gray-400">Join thousands of satisfied users finding their perfect vaporizer</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Leaf className="text-white" size={24} />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    TryThisVape
                  </h2>
                  <p className="text-gray-400 text-sm">AI-Powered Recommendations</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Discover your perfect vaporizer with our AI-powered recommendation engine. 
                Join thousands of users who've found their ideal device through our personalized quiz.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={16} />
                  <span className="text-sm">hello@trythisvape.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={16} />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleLinkClick(social.href)}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <social.icon size={18} />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05), duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href, link.internal)}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                      >
                        {link.label}
                        {!link.internal && (
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="border-t border-gray-700/50 py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Coffee size={24} className="text-green-400" />
                <h3 className="text-2xl font-bold">Stay in the Loop</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Get the latest vaporizer reviews, tips, and exclusive deals delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                  <Mail size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <span>© {currentYear} TryThisVape. All rights reserved.</span>
                <div className="flex items-center gap-4">
                  <button className="hover:text-white transition-colors">Privacy Policy</button>
                  <button className="hover:text-white transition-colors">Terms of Service</button>
                  <button className="hover:text-white transition-colors">Cookie Policy</button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Heart size={16} className="text-red-400" fill="currentColor" />
                  </motion.div>
                  <span>for the vaping community</span>
                </div>

                <motion.button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUp size={18} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          className="border-t border-gray-700/50 py-6 bg-gray-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span className="text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span className="text-xs">Expert Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span className="text-xs">Community Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                <span className="text-xs">24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};