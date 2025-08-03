import React, { useState } from 'react';
import { useUpcomingAnime } from '../hooks/useAnime';
import AnimeCard from '../components/ui/AnimeCard';
import Pagination from '../components/ui/Pagination';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui/LoadingSkeleton';
import { Clock } from 'lucide-react';
import './Upcoming.css';

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: upcomingData,
    isLoading,
    error,
    refetch
  } = useUpcomingAnime(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="upcoming-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Clock size={32} />
            <h1 className="page-title">Upcoming</h1>
          </div>
        </div>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="upcoming-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Clock size={32} />
            <h1 className="page-title">Upcoming</h1>
          </div>
        </div>
        <ErrorMessage message={error.message} onRetry={refetch} />
      </div>
    );
  }

  if (!upcomingData?.data || upcomingData.data.length === 0) {
    return (
      <div className="upcoming-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Clock size={32} />
            <h1 className="page-title">Upcoming</h1>
          </div>
        </div>
        <EmptyState message="No upcoming anime found" />
      </div>
    );
  }

  return (
    <div className="upcoming-page">
      <div className="page-header">
        <div className="page-title-wrapper">
          <Clock size={32} />
          <h1 className="page-title">Upcoming</h1>
        </div>
        <p className="page-subtitle">
          Anime coming soon
        </p>
      </div>

      <div className="anime-grid">
        {upcomingData.data.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={upcomingData.pagination?.last_visible_page || 1}
        onPageChange={handlePageChange}
        hasNextPage={upcomingData.pagination?.has_next_page || false}
        hasPreviousPage={currentPage > 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Upcoming; 