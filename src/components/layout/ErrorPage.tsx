import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, ArrowLeft, RefreshCw, AlertTriangle, 
  FileX, Wifi, Server, Bug, HelpCircle 
} from 'lucide-react';
import { CloudBackground } from './CloudBackground';

interface ErrorPageProps {
  type?: '404' | 'network' | 'server' | 'general' | 'maintenance';
  title?: string;
  message?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRefreshButton?: boolean;
  customActions?: Array<{
    label: string;
    action: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

const errorConfigs = {
  '404': {
    icon: FileX,
    emoji: '🔍',
    title: 'Page Not Found',
    message: 'Oops! The page you\'re looking for doesn\'t exist.',
    description: 'The page might have been moved, deleted, or you entered the wrong URL.',
    color: 'blue'
  },
  network: {
    icon: Wifi,
    emoji: '📡',
    title: 'Connection Problem',
    message: 'Unable to connect to our servers.',
    description: 'Please check your internet connection and try again.',
    color: 'orange'
  },
  server: {
    icon: Server,
    emoji: '⚠️',
    title: 'Server Error',
    message: 'Something went wrong on our end.',
    description: 'Our team has been notified and is working to fix this issue.',
    color: 'red'
  },
  maintenance: {
    icon: RefreshCw,
    emoji: '🔧',
    title: 'Under Maintenance',
    message: 'We\'re currently performing scheduled maintenance.',
    description: 'We\'ll be back online shortly. Thank you for your patience.',
    color: 'purple'
  },
  general: {
    icon: AlertTriangle,
    emoji: '❌',
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred.',
    description: 'Please try again or contact support if the problem persists.',
    color: 'gray'
  }
};

export const ErrorPage: React.FC<ErrorPageProps> = ({
  type = 'general',
  title,
  message,
  description,
  showHomeButton = true,
  showBackButton = true,
  showRefreshButton = true,
  customActions = []
}) => {
  const navigate = useNavigate();
  const config = errorConfigs[type];
  const Icon = config.icon;

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          gradient: 'from-blue-500 to-cyan-500',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'orange':
        return {
          gradient: 'from-orange-500 to-yellow-500',
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-600',
          button: 'bg-orange-600 hover:bg-orange-700'
        };
      case 'red':
        return {
          gradient: 'from-red-500 to-pink-500',
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'purple':
        return {
          gradient: 'from-purple-500 to-indigo-500',
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const colors = getColorClasses(config.color);

  const handleGoHome = () => navigate('/');
  const handleGoBack = () => navigate(-1);
  const handleRefresh = () => window.location.reload();

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Error Icon/Emoji */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="text-8xl mb-4"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {config.emoji}
              </motion.div>
              
              <motion.div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${colors.gradient} shadow-lg`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="text-white" size={32} />
              </motion.div>
            </motion.div>

            {/* Error Content */}
            <motion.div
              className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border ${colors.border} p-8 mb-8`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {title || config.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-4">
                {message || config.message}
              </p>
              
              <p className="text-gray-500 max-w-md mx-auto">
                {description || config.description}
              </p>

              {/* Error Code for 404 */}
              {type === '404' && (
                <motion.div
                  className={`inline-block mt-4 px-4 py-2 ${colors.bg} ${colors.text} rounded-full text-sm font-medium`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Error Code: 404
                </motion.div>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Primary Actions */}
              {showHomeButton && (
                <motion.button
                  onClick={handleGoHome}
                  className={`flex items-center gap-2 px-6 py-3 ${colors.button} text-white rounded-lg font-medium transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={20} />
                  Go Home
                </motion.button>
              )}

              {/* Secondary Actions */}
              <div className="flex gap-3">
                {showBackButton && (
                  <motion.button
                    onClick={handleGoBack}
                    className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft size={18} />
                    Go Back
                  </motion.button>
                )}

                {showRefreshButton && (
                  <motion.button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw size={18} />
                    Refresh
                  </motion.button>
                )}
              </div>

              {/* Custom Actions */}
              {customActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={action.action}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    action.variant === 'primary'
                      ? `${colors.button} text-white`
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {action.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Help Section */}
            <motion.div
              className={`mt-8 p-4 ${colors.bg} rounded-lg border ${colors.border}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <HelpCircle className={colors.text} size={20} />
                <h3 className={`font-medium ${colors.text}`}>Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                If you continue to experience issues, our support team is here to help.
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <a href="#" className={`${colors.text} hover:underline font-medium`}>
                  Contact Support
                </a>
                <a href="#" className={`${colors.text} hover:underline font-medium`}>
                  Help Center
                </a>
                <a href="#" className={`${colors.text} hover:underline font-medium`}>
                  Status Page
                </a>
              </div>
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-br ${colors.gradient} rounded-full opacity-20`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};