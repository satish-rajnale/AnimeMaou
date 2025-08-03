import React, { useState } from 'react';
import { useTopAnime } from '../hooks/useAnime';
import AnimeCard from '../components/ui/AnimeCard';
import Pagination from '../components/ui/Pagination';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui/LoadingSkeleton';
import { TrendingUp } from 'lucide-react';
import './TopAnime.css';

const TopAnime = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('bypopularity');

  const {
    data: topAnimeData,
    isLoading,
    error,
    refetch
  } = useTopAnime(currentPage, filter);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="top-anime-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <TrendingUp size={32} />
            <h1 className="page-title">Top Anime</h1>
          </div>
        </div>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="top-anime-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <TrendingUp size={32} />
            <h1 className="page-title">Top Anime</h1>
          </div>
        </div>
        <ErrorMessage message={error.message} onRetry={refetch} />
      </div>
    );
  }

  if (!topAnimeData?.data || topAnimeData.data.length === 0) {
    return (
      <div className="top-anime-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <TrendingUp size={32} />
            <h1 className="page-title">Top Anime</h1>
          </div>
        </div>
        <EmptyState message="No top anime found" />
      </div>
    );
  }

  return (
    <div className="top-anime-page">
      <div className="page-header">
        <div className="page-title-wrapper">
          <TrendingUp size={32} />
          <h1 className="page-title">Top Anime</h1>
        </div>
        <p className="page-subtitle">
          Discover the most popular and highly-rated anime of all time
        </p>
      </div>

      {/* Filter Options */}
      <div className="filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'bypopularity' ? 'active' : ''}`}
            onClick={() => handleFilterChange('bypopularity')}
          >
            By Popularity
          </button>
          <button
            className={`filter-button ${filter === 'favorite' ? 'active' : ''}`}
            onClick={() => handleFilterChange('favorite')}
          >
            By Favorites
          </button>
          <button
            className={`filter-button ${filter === 'airing' ? 'active' : ''}`}
            onClick={() => handleFilterChange('airing')}
          >
            Currently Airing
          </button>
          <button
            className={`filter-button ${filter === 'upcoming' ? 'active' : ''}`}
            onClick={() => handleFilterChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-button ${filter === 'tv' ? 'active' : ''}`}
            onClick={() => handleFilterChange('tv')}
          >
            TV Series
          </button>
          <button
            className={`filter-button ${filter === 'movie' ? 'active' : ''}`}
            onClick={() => handleFilterChange('movie')}
          >
            Movies
          </button>
        </div>
      </div>

      {/* Anime Grid */}
      <div className="anime-grid">
        {topAnimeData.data.map((anime, index) => (
          <div key={anime.mal_id} className="anime-card-wrapper">
            <div className="rank-badge">#{((currentPage - 1) * 25) + index + 1}</div>
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={topAnimeData.pagination?.last_visible_page || 1}
        onPageChange={handlePageChange}
        hasNextPage={topAnimeData.pagination?.has_next_page || false}
        hasPreviousPage={currentPage > 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TopAnime; 