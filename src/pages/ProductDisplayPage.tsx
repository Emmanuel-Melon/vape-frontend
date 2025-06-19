import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Factory, DollarSign, Thermometer, Tag, Info, Loader2, AlertTriangle, ChevronLeft, Star, CalendarDays, SlidersHorizontal, Award, Zap, Smile, Briefcase, BatteryCharging, ShieldCheck, Puzzle, Wrench, Gem, CheckCircle, ListChecks } from 'lucide-react';
import { CloudNavbar } from '../components/layout/CloudNavbar';
import { MobileNavbar } from '../components/layout/MobileNavbar';
import { CloudBackground } from '../components/layout/CloudBackground'; 
import { useIsMobile } from '../hooks/useMediaQuery';
import { useVaporizerBySlug } from '../hooks/use-vaporizers';
import { Vaporizer } from '../lib/schemas/vaporizerSchemas';

const ProductDisplayPage: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, isError } = useVaporizerBySlug(slug);
  const product = data as Vaporizer | undefined;

  interface AttributeScoreItem {
    icon: React.ElementType;
    label: string;
    score: number; // out of 10
    iconColor?: string;
  }

  const DUMMY_ATTRIBUTE_SCORES: AttributeScoreItem[] = [
    { icon: Zap, label: 'Vapor Potency', score: product?.expertScore ? Math.round(parseFloat(product.expertScore) * 0.8) : 7, iconColor: 'text-orange-500' }, // Example: derive from expertScore or default
    { icon: Smile, label: 'Vapor Comfort', score: 8, iconColor: 'text-lime-500' },
    { icon: Briefcase, label: 'Portability', score: 9, iconColor: 'text-blue-500' },
    { icon: BatteryCharging, label: 'Battery Life', score: 6, iconColor: 'text-green-500' },
    { icon: ShieldCheck, label: 'Build Quality', score: 7, iconColor: 'text-gray-500' },
    { icon: Puzzle, label: 'Ease Of Use', score: 9, iconColor: 'text-purple-500' },
    { icon: Wrench, label: 'Maintenance', score: 8, iconColor: 'text-teal-500' },
    { icon: Gem, label: 'Value for Money', score: product?.msrp ? (parseFloat(product.msrp) < 150 ? 9 : parseFloat(product.msrp) < 250 ? 7 : 5) : 7, iconColor: 'text-amber-500' }, // Example: derive from msrp or default
  ];

  const renderStars = (ratingString: string | null | undefined, maxStars = 5) => {
    const rating = ratingString ? parseFloat(ratingString) : 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStar;
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
        {halfStar === 1 && <Star key="half" className="h-5 w-5 text-yellow-400 fill-yellow-200" /> /* Simple half-star representation */}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
      </div>
    );
  };

  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex flex-col font-sen bg-sky-50">
      <CloudNavbar />
      <CloudBackground />
      <main className={`flex-grow container mx-auto px-4 py-8 max-w-5xl relative z-10 ${isMobile ? 'pb-20' : 'pt-20'}`}>
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sky-600 hover:text-sky-800 transition-colors group text-sm font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to results
        </motion.button>
        {isLoading && (
          <motion.div 
            className="flex flex-col items-center justify-center text-center py-16 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="animate-spin text-sky-600 h-12 w-12" />
            <p className="text-xl text-sky-700">Loading product details...</p>
          </motion.div>
        )}
        {isError && error && (
          <motion.div 
            className="flex flex-col items-center justify-center text-center py-16 space-y-4 bg-red-50 p-8 rounded-lg border border-red-200 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertTriangle className="text-red-500 h-12 w-12" />
            <p className="text-xl font-semibold text-red-700">Oops! Something went wrong.</p>
            <p className="text-md text-red-600">Error: {error.message}</p>
            <p className="text-sm text-slate-500">Please try refreshing the page or check back later.</p>
          </motion.div>
        )}
        {!isLoading && !isError && product && (
          <motion.div 
            className="bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border-2 border-green-300/70"
            variants={mainContentVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left Column: Image and Basic Info */}
              <motion.div className="md:w-1/3 flex flex-col items-center" variants={itemVariants}>
                <img 
                  src={product.imageUrl || '/vape.webp'} 
                  alt={product.name} 
                  className="w-full max-w-xs md:max-w-sm h-auto object-contain rounded-lg shadow-lg mb-4 border border-slate-200 bg-white p-2"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">{product.name}</h1>
                {product.manufacturer && (
                  <p className="text-md text-slate-600 text-center">by {product.manufacturer}</p>
                )}
                {product.msrp && (
                  <p className="text-2xl font-semibold text-green-600 mt-1 text-center">${product.msrp}</p>
                )}
              </motion.div>

              {/* Right Column: Details, Scores, etc. */}
              <motion.div className="md:w-2/3 space-y-6" variants={itemVariants}>
                <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-green-700">88% Match</h2> {/* Dummy Match % */}
                    {renderStars(product.userRating, 5)}
                  </div>
                  {product.description && (
                    <div className='mb-4'>
                      <h3 className="text-lg font-semibold text-slate-700 mb-1">Why it's perfect for you:</h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Attribute Scores Grid */}
                <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 text-center sm:text-left">Performance Breakdown</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {DUMMY_ATTRIBUTE_SCORES.map((attr, index) => (
                      <motion.div 
                        key={index} 
                        className="flex flex-col items-center justify-center text-center p-3 bg-slate-50 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                        variants={itemVariants}
                      >
                        <attr.icon className={`h-6 w-6 mb-1.5 ${attr.iconColor || 'text-sky-600'}`} />
                        <span className="text-xs font-medium text-slate-700">{attr.label}</span>
                        <span className={`text-sm font-bold ${attr.iconColor || 'text-sky-700'}`}>{attr.score}/10</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Features */}
                  {(product.bestFor && product.bestFor.length > 0 || product.heatingMethod || product.tempControl) && (
                    <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                      <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-3 gap-2">
                        <ListChecks className="text-sky-600 h-5 w-5" />
                        Key Features
                      </h3>
                      <ul className="space-y-1.5 text-sm text-slate-600">
                        {product.heatingMethod && <li className="flex items-center"><Thermometer size={16} className="mr-2 text-sky-500" /> Heating: {product.heatingMethod}</li>}
                        {product.tempControl && <li className="flex items-center"><SlidersHorizontal size={16} className="mr-2 text-sky-500" /> Temp Control: {product.tempControl}</li>}
                        {product.releaseDate && <li className="flex items-center"><CalendarDays size={16} className="mr-2 text-sky-500" /> Released: {new Date(product.releaseDate).toLocaleDateString()}</li>}
                        {/* You can add more derived or dummy key features here */}
                        {product.expertScore && <li className="flex items-center"><Award size={16} className="mr-2 text-yellow-500" /> Expert Score: {product.expertScore}/10</li>}
                      </ul>
                    </div>
                  )}

                  {/* Best For */}
                  {product.bestFor && product.bestFor.length > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-md border border-slate-200">
                      <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-3 gap-2">
                        <CheckCircle className="text-green-600 h-5 w-5" />
                        Best For
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {product.bestFor.map((item, index) => (
                          <li key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <motion.p variants={itemVariants} className="text-xs text-slate-400 text-center pt-2">
                  Product ID (Slug): {slug}
                </motion.p>

              </motion.div>
            </div>
          </motion.div>
        )}
        {!isLoading && !isError && !product && (
           <motion.div 
            className="flex flex-col items-center justify-center text-center py-16 space-y-4 bg-amber-50 p-8 rounded-lg border border-amber-200 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Info className="text-amber-500 h-12 w-12" />
            <p className="text-xl font-semibold text-amber-700">Product Not Found</p>
            <p className="text-md text-amber-600">The product details for "{slug}" could not be loaded.</p>
            <p className="text-sm text-slate-500">Please check the slug or try again later.</p>
          </motion.div>
        )}
      </main>
      {isMobile && <MobileNavbar />}
    </div>
  );
};

export default ProductDisplayPage;
