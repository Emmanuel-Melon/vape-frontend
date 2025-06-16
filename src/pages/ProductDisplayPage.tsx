import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Factory, DollarSign, Thermometer, Tag, Info, Loader2, AlertTriangle, ChevronLeft } from 'lucide-react';
import { CloudNavbar } from '../components/CloudNavbar';
import { MobileNavbar } from '../components/MobileNavbar';
import { CloudBackground } from '../components/CloudBackground'; 
import { useIsMobile } from '../hooks/useMediaQuery';
import { useVaporizerBySlug } from '../hooks/use-vaporizers';
import { Vaporizer } from '../lib/schemas/vaporizerSchemas';

const ProductDisplayPage: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, isError } = useVaporizerBySlug(slug);
  const product = data as Vaporizer | undefined;

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
            className="md:flex md:gap-6 lg:gap-8 items-start"
            variants={mainContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Floating Image Section */}
            <motion.div 
              className="md:w-1/3 md:max-w-sm flex-shrink-0 mb-6 md:mb-0 mx-auto md:mx-0 flex items-center justify-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src={product.imageUrl || '/vape.webp'} 
                alt={product.name} 
                className="w-full h-auto object-contain max-w-[300px] md:max-w-full md:max-h-[400px]"
              />
            </motion.div>

            {/* Textual Details Card (Stylized) */}
            <motion.div 
              className="md:flex-1 bg-gradient-to-br from-white to-sky-50 shadow-xl rounded-xl p-6 md:p-8 lg:p-10 border border-sky-100"
              variants={itemVariants}
            >
              {/* Core Info Section (Name, Manufacturer, MSRP) */} 
              <div className="flex flex-col space-y-3 md:space-y-4 text-center md:text-left mb-6 md:mb-8">
                <motion.h1 variants={itemVariants} className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800">
                  {product.name}
                </motion.h1>
                
                {product.manufacturer && (
                  <motion.div variants={itemVariants} className="flex items-center text-md lg:text-lg text-slate-600 gap-2 justify-center md:justify-start">
                    <Factory className="text-sky-600 h-5 w-5 flex-shrink-0" />
                    <span>By {product.manufacturer}</span>
                  </motion.div>
                )}
                
                {product.msrp && (
                  <motion.div variants={itemVariants} className="flex items-center text-2xl lg:text-3xl font-semibold text-sky-700 gap-2 justify-center md:justify-start">
                    <DollarSign className="text-sky-600 h-6 lg:h-7 w-6 lg:w-7 flex-shrink-0" />
                    <span>${product.msrp}</span>
                    <span className="text-xs lg:text-sm text-slate-500 font-normal">(MSRP)</span>
                  </motion.div>
                )}
              </div>

              {/* Bottom Section: Description, Attributes, etc. */}
              <div className="space-y-6 pt-6 border-t border-sky-200">
                {product.description && (
                  <motion.div variants={itemVariants} className="prose prose-lg prose-slate max-w-none">
                    <h2 className="flex items-center text-xl font-semibold text-slate-700 mb-2 gap-2">
                      <Info className="text-sky-600 h-5 w-5 flex-shrink-0" />
                      About this Vaporizer
                    </h2>
                    <p className="text-slate-600 leading-relaxed">{product.description}</p>
                  </motion.div>
                )}

                {(product.bestFor && product.bestFor.length > 0 || product.heatingMethod) && (
                  <motion.div variants={itemVariants} className="mt-4 pt-5 border-t border-sky-200 space-y-4">
                    {product.bestFor && product.bestFor.length > 0 && (
                      <div>
                        <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-2 gap-2">
                          <Tag className="text-sky-600 h-5 w-5 flex-shrink-0" />
                          Ideal For:
                        </h3>
                        <ul className="flex flex-wrap gap-2.5">
                          {product.bestFor.map((item, index) => (
                            <motion.li 
                              key={index} 
                              className="bg-sky-100 text-sky-800 text-sm font-medium px-3.5 py-1.5 rounded-full shadow-sm border border-sky-200 hover:bg-sky-200 transition-colors cursor-default"
                              whileHover={{ y: -2 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.heatingMethod && (
                      <div>
                        <h3 className="flex items-center text-lg font-semibold text-slate-700 mb-1 gap-2">
                          <Thermometer className="text-sky-600 h-5 w-5 flex-shrink-0" />
                          Heating Method:
                        </h3>
                        <p className="text-slate-600 pl-7 text-md">{product.heatingMethod}</p>
                      </div>
                    )}
                  </motion.div>
                )}
                <motion.p variants={itemVariants} className="mt-6 text-xs text-slate-400 pt-4 border-t border-sky-100">
                  Product ID (Slug): {slug}
                </motion.p>
              </div>
            </motion.div>
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
