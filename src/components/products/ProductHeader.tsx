import React from 'react';
import { motion } from 'framer-motion';

// A specific type for the product data needed by this component
interface ProductHeaderData {
  name: string;
  imageUrl?: string;
  manufacturer?: string;
  msrp?: number;
}

interface ProductHeaderProps {
  product: ProductHeaderData;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
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
  );
};
