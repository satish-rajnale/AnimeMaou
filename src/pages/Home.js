import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTopAnime, useCurrentSeason, useUpcomingAnime } from '../hooks/useAnime';
import SearchBar from '../components/ui/SearchBar';
import AnimeCard from '../components/ui/AnimeCard';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui/LoadingSkeleton';
import { TrendingUp, Calendar, Clock } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({});

  // Fetch data using React Query
  const {
    data: topAnimeData,
    isLoading: topAnimeLoading,
    error: topAnimeError
  } = useTopAnime(1, 'bypopularity');

  const {
    data: currentSeasonData,
    isLoading: currentSeasonLoading,
    error: currentSeasonError
  } = useCurrentSeason(1);

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError
  } = useUpcomingAnime(1);

  const handleSearch = (query, filters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
  };

  const renderAnimeSection = (title, subtitle, data, loading, error, icon) => {
    if (loading) {
      return (
        <section className="anime-section">
          <div className="section-header">
            <div className="section-title-wrapper">
              {icon}
              <h2 className="section-title">{title}</h2>
            </div>
            <p className="section-subtitle">{subtitle}</p>
          </div>
          <div className="anime-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="anime-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section className="anime-section">
          <div className="section-header">
            <div className="section-title-wrapper">
              {icon}
              <h2 className="section-title">{title}</h2>
            </div>
          </div>
          <ErrorMessage 
            message={error.message} 
            onRetry={() => window.location.reload()}
          />
        </section>
      );
    }

    if (!data?.data || data.data.length === 0) {
      return (
        <section className="anime-section">
          <div className="section-header">
            <div className="section-title-wrapper">
              {icon}
              <h2 className="section-title">{title}</h2>
            </div>
          </div>
          <EmptyState message="No anime found" />
        </section>
      );
    }

    return (
      <section className="anime-section">
        <div className="section-header">
          <div className="section-title-wrapper">
            {icon}
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="anime-grid">
          {data.data.slice(0, 12).map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Amazing Anime
          </h1>
          <p className="hero-subtitle">
            Explore thousands of anime titles, from classics to the latest releases
          </p>
          <SearchBar 
            onSearch={handleSearch}
            onFiltersChange={setSearchFilters}
            placeholder="Search for anime, characters, or genres..."
          />
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="search-results-section">
          <div className="section-header">
            <h2 className="section-title">Search Results</h2>
            <p className="section-subtitle">
              Results for "{searchQuery}"
            </p>
          </div>
          {/* Search results would be rendered here */}
        </section>
      )}

      {/* Top Anime Section */}
      {renderAnimeSection(
        "Top Anime",
        "Most popular anime of all time",
        topAnimeData,
        topAnimeLoading,
        topAnimeError,
        <TrendingUp size={24} />
      )}

      {/* Current Season Section */}
      {renderAnimeSection(
        "This Season",
        "Currently airing anime",
        currentSeasonData,
        currentSeasonLoading,
        currentSeasonError,
        <Calendar size={24} />
      )}

      {/* Upcoming Anime Section */}
      {renderAnimeSection(
        "Upcoming",
        "Anime coming soon",
        upcomingData,
        upcomingLoading,
        upcomingError,
        <Clock size={24} />
      )}
    </div>
  );
};

export default Home; 