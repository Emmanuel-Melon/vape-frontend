import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Loader } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { ProductHeader } from '../components/products/ProductHeader';
import { ProductDetails } from '../components/products/ProductDetails';
import { ProductRatings } from '../components/products/ProductRatings';
import { ProductUserFeedback } from '../components/products/ProductUserFeedback';
import { useProduct } from '../hooks/useProduct'; // Assuming a custom hook for fetching data

const mainContentVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ProductDisplayPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, isLoading, isError, error } = useProduct(productId); // Using a custom hook

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin text-green-500 h-12 w-12" />
        </div>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <motion.div 
          className="flex flex-col items-center justify-center text-center py-16 space-y-4 bg-red-50 p-8 rounded-lg border border-red-200 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="text-red-500 h-12 w-12" />
          <p className="text-xl font-semibold text-red-700">Oops! Something went wrong.</p>
          <p className="text-md text-red-600">Error: {error?.message || 'Unknown error'}</p>
          <p className="text-sm text-slate-500">Please try refreshing the page or check back later.</p>
        </motion.div>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <p>Product not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <motion.div 
        className="bg-gradient-to-br from-slate-50 via-sky-50 to-cyan-50 p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border-2 border-green-300/70"
        variants={mainContentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <ProductHeader product={product} />
          <motion.div className="md:w-2/3 space-y-6" variants={itemVariants}>
            <ProductRatings ratings={product.ratings} />
            <ProductDetails product={product} />
            <ProductUserFeedback feedback={{ bestFor: product.bestFor, notIdealFor: product.notIdealFor }} />
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default ProductDisplayPage;
