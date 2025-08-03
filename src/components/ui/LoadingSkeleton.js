import React from 'react';
import './LoadingSkeleton.css';

export const AnimeCardSkeleton = () => (
  <div className="anime-card-skeleton">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  </div>
);

export const AnimeDetailSkeleton = () => (
  <div className="anime-detail-skeleton">
    <div className="skeleton-hero">
      <div className="skeleton-image large"></div>
      <div className="skeleton-info">
        <div className="skeleton-title large"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
    <div className="skeleton-synopsis">
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="search-skeleton">
    <div className="skeleton-input"></div>
    <div className="skeleton-filters">
      <div className="skeleton-button"></div>
      <div className="skeleton-button"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export const PaginationSkeleton = () => (
  <div className="pagination-skeleton">
    <div className="skeleton-button"></div>
    <div className="skeleton-button"></div>
    <div className="skeleton-button"></div>
  </div>
);

export const LoadingSpinner = ({ size = 'medium' }) => (
  <div className={`loading-spinner ${size}`}>
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-message">
    <div className="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="retry-button">
        Try Again
      </button>
    )}
  </div>
);

export const EmptyState = ({ message, icon = '📺' }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3>No results found</h3>
    <p>{message}</p>
  </div>
); 