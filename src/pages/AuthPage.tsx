import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CloudNavbar } from '../components/layout/CloudNavbar';
import { MobileNavbar } from '../components/layout/MobileNavbar';
import { CloudBackground } from '../components/layout/CloudBackground';
import { useIsMobile } from '../hooks/useMediaQuery';
import {
  loginSchema as apiLoginSchema, // Rename to avoid conflict
  LoginInput,
  RegisterInput,
  useLogin,
  useRegister,
} from '../hooks/use-auth';

// Form-specific schemas
const authPageLoginSchema = apiLoginSchema; // Use the existing schema for login

const authPageRegisterSchema = z.object({
  // username: z.string().min(1, 'Username is required'), // Username removed
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AuthPageLoginFormData = LoginInput;
type AuthPageRegisterFormData = z.infer<typeof authPageRegisterSchema>;
type AuthFormData = AuthPageLoginFormData | AuthPageRegisterFormData;

const AuthPage: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const formMethods = useForm<AuthFormData>({
    resolver: zodResolver(isLoginView ? authPageLoginSchema : authPageRegisterSchema),
    mode: 'onChange',
    // Default values will be set in useEffect to ensure they update with isLoginView
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = formMethods;

  useEffect(() => {
    const defaultValues = isLoginView
      ? { email: '', password: '' }
      : { /*username: '',*/ email: '', password: '', confirmPassword: '' }; // Username removed
    reset(defaultValues as AuthFormData); // Reset with correct default values for the current view
    setServerError(null); // Clear server error on view toggle
    setShowPassword(false); // Reset password visibility
    setShowConfirmPassword(false); // Reset confirm password visibility
  }, [isLoginView, reset]);

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    setServerError(null);
    try {
      if (isLoginView) {
        await loginMutation.mutateAsync(data as AuthPageLoginFormData);
        console.log('Login successful');
        navigate('/');
      } else {
        const { confirmPassword, ...registerApiData } = data as AuthPageRegisterFormData;
        await registerMutation.mutateAsync(registerApiData as RegisterInput); // Ensure type compatibility
        console.log('Registration successful');
       navigate('/');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setServerError(error.message || (isLoginView ? 'Login failed. Please try again.' : 'Registration failed. Please try again.'));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputFieldClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-lg bg-sky-50 border ${hasError ? 'border-red-500' : 'border-sky-200'} focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-500' : 'focus:ring-sky-500'} focus:border-transparent transition-shadow shadow-sm placeholder-slate-400 text-slate-700`;
  const iconClass = "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sky-500";
  const errorTextClass = "text-red-500 text-xs mt-1 ml-1";

  const isLoading = isSubmitting || loginMutation.isPending || registerMutation.isPending;

  // Typed errors for cleaner access
  const typedErrors = errors as FieldErrors<AuthPageRegisterFormData>; // Cast for register view specific fields

  return (
    <div className="min-h-screen flex flex-col font-sen bg-sky-100">
      <CloudNavbar />
      <CloudBackground />
      <main className={`flex-grow flex items-center justify-center p-4 relative z-10 ${isMobile ? 'pb-20 pt-16' : 'pt-20'}`}>
        <motion.div
          className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-8 md:p-10 border border-sky-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-3">
            {isLoginView ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-center text-slate-500 mb-8">
            {isLoginView ? 'Log in to continue your journey.' : 'Join us and find your perfect vape setup.'}
          </p>

          {serverError && (
            <motion.div 
              className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm"
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
            >
              <AlertCircle size={18} /> 
              {serverError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username field removed for !isLoginView */}
            <div>
              <div className="relative">
                <Mail className={iconClass} />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register('email')}
                  className={`${inputFieldClass(!!errors.email)} pl-10`}
                />
              </div>
              {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
            </div>
            <div>
              <div className="relative">
                <Lock className={iconClass} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register('password')}
                  className={`${inputFieldClass(!!errors.password)} pl-10`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-700">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className={errorTextClass}>{errors.password.message}</p>}
            </div>
            {!isLoginView && (
              <div>
                <div className="relative">
                  <Lock className={iconClass} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...register('confirmPassword' as keyof AuthPageRegisterFormData)}
                    className={`${inputFieldClass(!!typedErrors.confirmPassword)} pl-10`}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-700">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {typedErrors.confirmPassword && <p className={errorTextClass}>{typedErrors.confirmPassword.message}</p>}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? <Loader2 size={20} className="animate-spin"/> : (isLoginView ? <LogIn size={20}/> : <UserPlus size={20} />)}
              {isLoading ? 'Processing...' : (isLoginView ? 'Log In' : 'Sign Up')}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLoginView(!isLoginView);
              }}
              disabled={isLoading}
              className="text-sm text-sky-600 hover:text-sky-800 hover:underline font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
            </button>
          </div>
          
          {isLoginView && (
             <div className="mt-4 text-center">
                <Link to="/forgot-password" className={`text-xs text-slate-500 hover:text-sky-600 hover:underline ${isLoading ? 'pointer-events-none opacity-70' : ''}`}>
                    Forgot Password?
                </Link>
            </div>
          )}
        </motion.div>
      </main>
      {isMobile && <MobileNavbar />}
    </div>
  );
};

export default AuthPage;
