import React, { useState } from 'react';
import { useCurrentSeason } from '../hooks/useAnime';
import AnimeCard from '../components/ui/AnimeCard';
import Pagination from '../components/ui/Pagination';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui/LoadingSkeleton';
import { Calendar } from 'lucide-react';
import './Seasonal.css';

const Seasonal = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: seasonalData,
    isLoading,
    error,
    refetch
  } = useCurrentSeason(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="seasonal-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Calendar size={32} />
            <h1 className="page-title">This Season</h1>
          </div>
        </div>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="seasonal-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Calendar size={32} />
            <h1 className="page-title">This Season</h1>
          </div>
        </div>
        <ErrorMessage message={error.message} onRetry={refetch} />
      </div>
    );
  }

  if (!seasonalData?.data || seasonalData.data.length === 0) {
    return (
      <div className="seasonal-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Calendar size={32} />
            <h1 className="page-title">This Season</h1>
          </div>
        </div>
        <EmptyState message="No seasonal anime found" />
      </div>
    );
  }

  return (
    <div className="seasonal-page">
      <div className="page-header">
        <div className="page-title-wrapper">
          <Calendar size={32} />
          <h1 className="page-title">This Season</h1>
        </div>
        <p className="page-subtitle">
          Currently airing anime for this season
        </p>
      </div>

      <div className="anime-grid">
        {seasonalData.data.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={seasonalData.pagination?.last_visible_page || 1}
        onPageChange={handlePageChange}
        hasNextPage={seasonalData.pagination?.has_next_page || false}
        hasPreviousPage={currentPage > 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Seasonal; 