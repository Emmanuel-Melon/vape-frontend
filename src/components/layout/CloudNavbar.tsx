import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Leaf, User, Settings, LogOut, ChevronDown, Compass, Store, MessageCircle, Heart, ExternalLink, Menu, X, Info, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/useMediaQuery';

export const CloudNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  const navItems = [
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      description: 'Browse community templates',
      path: '/explore'
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: BookOpen,
      description: 'View saved recommendations',
      path: '/saved'
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      description: 'Learn about TryThisVape',
      path: '/about'
    },
    {
      id: 'store',
      label: 'Store',
      icon: Store,
      description: 'Setup your seller store',
      path: '/store-setup'
    }
  ];

  const communityLinks = [
    {
      id: 'discord',
      label: 'Discord',
      icon: MessageCircle,
      description: 'Join our community chat',
      href: 'https://discord.gg/trythisvape',
      color: 'from-indigo-500 to-purple-500',
      hoverColor: 'hover:from-indigo-400 hover:to-purple-400',
      members: '12.5K+'
    },
    {
      id: 'patreon',
      label: 'Support',
      icon: Heart,
      description: 'Support our mission',
      href: 'https://patreon.com/trythisvape',
      color: 'from-orange-500 to-red-500',
      hoverColor: 'hover:from-orange-400 hover:to-red-400',
      members: '850+'
    }
  ];

  const userMenuItems = [
    { icon: User, label: 'Profile', action: () => navigate('/my-profile') },
    { icon: Store, label: 'My Store', action: () => navigate('/store-setup') },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings') }, // Placeholder
    { icon: LogOut, label: 'Sign Out', action: () => { /* TODO: Implement proper logout */ navigate('/auth'); } } 
  ];

  const handleCommunityClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  // Hide navbar on mobile - it will be replaced by bottom navigation
  if (isMobile) {
    return null;
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Logo + Community Links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Leaf className="text-white" size={20} />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  TryThisVape
                </h1>
                <p className="text-xs text-gray-600 hidden lg:block">AI-Powered Recommendations</p>
              </div>
            </motion.div>

            {/* Community Links - Moved to left */}
            <div className="hidden lg:flex items-center gap-3">
              {communityLinks.map((link, index) => {
                const Icon = link.icon;
                
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => handleCommunityClick(link.href)}
                    className="relative group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`
                        relative px-3 py-2 rounded-full bg-gradient-to-r ${link.color} ${link.hoverColor} 
                        text-white shadow-lg transition-all duration-300 border border-white/20
                      `}
                      whileHover={{
                        boxShadow: [
                          '0 4px 20px rgba(0, 0, 0, 0.2)',
                          '0 8px 30px rgba(0, 0, 0, 0.3)',
                          '0 4px 20px rgba(0, 0, 0, 0.2)'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {Array.from({ length: 3 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/40 rounded-full"
                          style={{
                            left: `${10 + Math.cos(i * 120 * Math.PI / 180) * 20}px`,
                            top: `${10 + Math.sin(i * 120 * Math.PI / 180) * 20}px`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.7,
                          }}
                        />
                      ))}
                      
                      <div className="flex items-center gap-1.5 relative z-10">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: link.id === 'discord' ? [0, 10, -10, 0] : [0, -10, 10, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon size={14} />
                        </motion.div>
                        <span className="font-medium text-xs">{link.label}</span>
                        <ExternalLink size={10} className="opacity-70" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
                      initial={{ y: -10, scale: 0.9 }}
                      whileHover={{ y: 0, scale: 1 }}
                    >
                      <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl border border-gray-700">
                        <div className="font-medium">{link.description}</div>
                        <div className="text-gray-400 mt-1 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          {link.members} members
                        </div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${link.color} opacity-30`}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Section: Navigation + User */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Main Navigation Items */}
            <div className="flex items-center gap-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`relative group`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`
                        relative px-4 py-2 rounded-full transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                          : 'bg-white/40 backdrop-blur-sm text-gray-700 hover:bg-white/60 border border-white/50'
                        }
                      `}
                      animate={isActive ? {
                        boxShadow: [
                          '0 4px 20px rgba(34, 197, 94, 0.3)',
                          '0 8px 30px rgba(59, 130, 246, 0.4)',
                          '0 4px 20px rgba(34, 197, 94, 0.3)'
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isActive && (
                        <>
                          {Array.from({ length: 4 }, (_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white/60 rounded-full"
                              style={{
                                left: `${15 + Math.cos(i * 90 * Math.PI / 180) * 25}px`,
                                top: `${15 + Math.sin(i * 90 * Math.PI / 180) * 25}px`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                              }}
                            />
                          ))}
                        </>
                      )}
                      
                      <div className="flex items-center gap-2 relative z-10">
                        <motion.div
                          animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Icon size={16} />
                        </motion.div>
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                      initial={{ y: -10 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* User Avatar Dropdown / Login Button */}
            {isLoading ? (
              <div className="w-24 h-10 bg-gray-200/50 animate-pulse rounded-full"></div> // Placeholder for loading state
            ) : isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-full px-3 py-2 hover:bg-white/60 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                    {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                  </div>
                  <span className="font-medium text-gray-700 hidden xl:block text-sm">
                    {user.username || 'User'}
                  </span>
                  <motion.div
                    animate={{ rotate: showUserDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} className="text-gray-600" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-md border border-white/50 rounded-xl shadow-xl overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                            {user.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 truncate" title={user.username}>{user.username || 'User'}</div>
                            <div className="text-xs text-gray-600 truncate" title={user.email}>{user.email || 'No email'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        {userMenuItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <motion.button
                              key={item.label}
                              onClick={() => {
                                item.action();
                                setShowUserDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ x: 5 }}
                            >
                              <Icon size={16} className="text-gray-500" />
                              <span className="font-medium">{item.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showUserDropdown && (
                  <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setShowUserDropdown(false)}
                  />
                )}
              </div>
            ) : (
              <motion.button
                onClick={() => navigate('/auth')}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full px-4 py-2 hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <LogIn size={16} />
                <span className="font-medium text-sm">Sign In</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: showMobileMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>

          {/* Decorative Cloud Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-10 bg-white/5 rounded-full"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${15 + i * 15}%`,
                }}
                animate={{
                  x: [0, 20, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              className="lg:hidden mt-4 bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/50 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="grid grid-cols-2 gap-3">
                    {communityLinks.map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <motion.button
                          key={link.id}
                          onClick={() => {
                            handleCommunityClick(link.href);
                            setShowMobileMenu(false);
                          }}
                          className={`flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r ${link.color} text-white`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Icon size={16} />
                          <span className="font-medium text-sm">{link.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};