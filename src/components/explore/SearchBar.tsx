import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

interface Category {
  value: string;
  label: string;
  count: number;
}

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: 'popular' | 'trending' | 'newest') => void;
  categories: Category[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="grid md:grid-cols-12 gap-4 items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-100">
        {/* Search Input */}
        <div className="relative md:col-span-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <div className="flex-1 flex gap-2 overflow-x-auto pb-2 -mb-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.label} <span className="text-xs opacity-80">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="md:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'popular' | 'trending' | 'newest')}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow bg-white"
          >
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};
