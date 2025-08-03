import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNextPage = false,
  hasPreviousPage = false,
  isLoading = false 
}) => {
  if (!totalPages || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      // Adjust start if we're near the end
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      
      <div className="pagination-controls">
        {/* First page button */}
        <button
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || isLoading}
          aria-label="Go to first page"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous page button */}
        <button
          className={`pagination-button ${!hasPreviousPage ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage || isLoading}
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        <div className="page-numbers">
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`pagination-button page-number ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
              disabled={isLoading}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next page button */}
        <button
          className={`pagination-button ${!hasNextPage ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          aria-label="Go to next page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last page button */}
        <button
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Go to last page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {isLoading && (
        <div className="pagination-loading">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination; 