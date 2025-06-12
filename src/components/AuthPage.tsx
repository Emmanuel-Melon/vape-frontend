import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Leaf, ArrowRight, CheckCircle, AlertCircle, ToggleLeft as Google, Github, Apple } from 'lucide-react';
import { CloudBackground } from './CloudBackground';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  agreeToTerms?: string;
  general?: string;
}

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Signup specific validations
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      console.log(isLogin ? 'Login successful' : 'Signup successful', formData);
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof AuthFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`${provider} authentication`);
    // Implement social auth logic here
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen font-sen relative overflow-hidden">
      <CloudBackground />
      
      <div className="container mx-auto px-4 py-8 max-w-md relative z-10">
        {/* Logo Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
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
              <Leaf className="text-white" size={24} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                VapeFinder
              </h1>
              <p className="text-xs text-gray-600">AI-Powered Recommendations</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
            <motion.h2 
              className="text-2xl font-bold mb-2"
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? 'Welcome Back!' : 'Join VapeFinder'}
            </motion.h2>
            <p className="text-green-100">
              {isLogin 
                ? 'Sign in to access your personalized recommendations' 
                : 'Create your account and start your vaping journey'
              }
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Social Auth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialAuth('Google')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Google size={20} className="text-red-500" />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialAuth('Apple')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Apple size={18} className="text-gray-700" />
                  <span className="font-medium text-gray-700">Apple</span>
                </button>
                <button
                  onClick={() => handleSocialAuth('Github')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github size={18} className="text-gray-700" />
                  <span className="font-medium text-gray-700">GitHub</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errors.general && (
                <motion.div
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={16} />
                  <span className="text-sm">{errors.general}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login-form' : 'signup-form'}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Name Fields (Signup only) */}
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={formData.firstName || ''}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                              errors.firstName 
                                ? 'border-red-300 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-green-500'
                            }`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            value={formData.lastName || ''}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                              errors.lastName 
                                ? 'border-red-300 focus:ring-red-500' 
                                : 'border-gray-300 focus:ring-green-500'
                            }`}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                          errors.password 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password (Signup only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword || ''}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.confirmPassword 
                              ? 'border-red-300 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-green-500'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  )}

                  {/* Terms Agreement (Signup only) */}
                  {!isLogin && (
                    <div>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={formData.agreeToTerms || false}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">
                          I agree to the{' '}
                          <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  )}

                  {/* Forgot Password (Login only) */}
                  {isLogin && (
                    <div className="text-right">
                      <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                        Forgot your password?
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={toggleAuthMode}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>© 2024 VapeFinder. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Support</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};