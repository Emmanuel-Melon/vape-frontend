import React from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  inStock: boolean;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  image: string;
  seller: string;
  views: number;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

interface ProductManagementCardProps {
  product: Product;
  index: number;
  onAction: (action: string, product: Product) => void;
}

export const ProductManagementCard: React.FC<ProductManagementCardProps> = ({
  product,
  index,
  onAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-emerald-100 text-emerald-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
            {product.status}
          </span>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.brand}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">${product.price}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Eye size={12} />
              {product.views}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${getConditionColor(product.condition)}`}>
            {product.condition.replace('-', ' ')}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <div>Seller: <span className="font-medium">{product.seller}</span></div>
          <div>Listed: {new Date(product.createdAt).toLocaleDateString()}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onAction('view', product)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
          >
            <Eye size={14} />
            View
          </button>
          <button
            onClick={() => onAction('edit', product)}
            className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
          >
            <Edit size={14} />
          </button>
          {product.status === 'PENDING' && (
            <button
              onClick={() => onAction('approve', product)}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              ✓
            </button>
          )}
          <button
            onClick={() => onAction('delete', product)}
            className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};