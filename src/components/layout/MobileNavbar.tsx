import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Compass, BookOpen, Store, User, 
  MessageCircle, Heart, Plus, Search, Info 
} from 'lucide-react';

export const MobileNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      color: 'text-green-500'
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      path: '/explore',
      color: 'text-blue-500'
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: BookOpen,
      path: '/saved',
      color: 'text-purple-500'
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      path: '/about',
      color: 'text-orange-500'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/auth',
      color: 'text-pink-500'
    }
  ];

  const communityButtons = [
    {
      id: 'discord',
      icon: MessageCircle,
      href: 'https://discord.gg/vapefinder',
      color: 'from-indigo-500 to-purple-500',
      label: 'Discord'
    },
    {
      id: 'patreon',
      icon: Heart,
      href: 'https://patreon.com/vapefinder',
      color: 'from-orange-500 to-red-500',
      label: 'Support'
    }
  ];

  const handleNavigation = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleCommunityClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Community Quick Actions */}
      <div className="flex justify-center gap-3 px-4 py-2 border-b border-gray-100">
        {communityButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={button.id}
              onClick={() => handleCommunityClick(button.href)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${button.color} text-white text-xs font-medium shadow-sm`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={12} />
              <span>{button.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Main Navigation */}
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="relative flex flex-col items-center justify-center p-2 min-w-[60px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active Background */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl"
                  layoutId="activeBackground"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon Container */}
              <motion.div
                className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${
                  isActive 
                    ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg' 
                    : 'text-gray-500'
                }`}
                animate={isActive ? {
                  boxShadow: [
                    '0 4px 15px rgba(34, 197, 94, 0.3)',
                    '0 6px 20px rgba(59, 130, 246, 0.4)',
                    '0 4px 15px rgba(34, 197, 94, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Icon size={16} />
                </motion.div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <span className={`text-xs font-medium transition-colors relative z-10 ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {item.label}
              </span>

              {/* Floating Particles for Active Item */}
              {isActive && (
                <>
                  {Array.from({ length: 3 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-green-400 rounded-full"
                      style={{
                        left: `${30 + Math.cos(i * 120 * Math.PI / 180) * 15}px`,
                        top: `${15 + Math.sin(i * 120 * Math.PI / 180) * 15}px`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.7,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Safe Area */}
      <div className="h-safe-area-inset-bottom bg-white/50" />
    </motion.div>
  );
};