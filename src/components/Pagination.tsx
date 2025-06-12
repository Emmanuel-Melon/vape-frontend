import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 7,
  className = ''
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      const startPage = Math.max(2, currentPage - Math.floor((maxVisiblePages - 4) / 2));
      const endPage = Math.min(totalPages - 1, currentPage + Math.floor((maxVisiblePages - 4) / 2));
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push('ellipsis');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const PageButton: React.FC<{
    page: number;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
  }> = ({ page, isActive = false, disabled = false, children }) => (
    <motion.button
      onClick={() => handlePageClick(page)}
      disabled={disabled}
      className={`
        relative px-3 py-2 min-w-[40px] h-10 rounded-lg font-medium transition-all duration-200
        ${isActive
          ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
          : disabled
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }
        ${!disabled && !isActive ? 'hover:shadow-md' : ''}
      `}
      whileHover={!disabled && !isActive ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg"
          layoutId="activePageBackground"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  return (
    <motion.div
      className={`flex items-center justify-center gap-1 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* First Page Button */}
      {showFirstLast && currentPage > 1 && (
        <PageButton page={1} disabled={currentPage === 1}>
          First
        </PageButton>
      )}

      {/* Previous Button */}
      <PageButton page={currentPage - 1} disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </PageButton>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === 'ellipsis' ? (
            <div className="px-3 py-2 text-gray-400">
              <MoreHorizontal size={16} />
            </div>
          ) : (
            <PageButton page={page as number} isActive={page === currentPage}>
              {page}
            </PageButton>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <PageButton page={currentPage + 1} disabled={currentPage === totalPages}>
        <ChevronRight size={16} />
      </PageButton>

      {/* Last Page Button */}
      {showFirstLast && currentPage < totalPages && (
        <PageButton page={totalPages} disabled={currentPage === totalPages}>
          Last
        </PageButton>
      )}
    </motion.div>
  );
};