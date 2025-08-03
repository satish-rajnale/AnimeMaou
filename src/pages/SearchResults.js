import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchAnime } from '../hooks/useAnime';
import SearchBar from '../components/ui/SearchBar';
import AnimeCard from '../components/ui/AnimeCard';
import Pagination from '../components/ui/Pagination';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/ui/LoadingSkeleton';
import { Search } from 'lucide-react';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  
  const query = searchParams.get('q') || '';
  const filters = Object.fromEntries(searchParams.entries());
  delete filters.q; // Remove query from filters

  const {
    data: searchData,
    isLoading,
    error,
    refetch
  } = useSearchAnime(query, currentPage, filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, JSON.stringify(filters)]);

  const handleSearch = (newQuery, newFilters) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!query) {
    return (
      <div className="search-results-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Search size={32} />
            <h1 className="page-title">Search Anime</h1>
          </div>
          <p className="page-subtitle">
            Find your favorite anime
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
        <EmptyState 
          message="Enter a search term to find anime" 
          icon="🔍"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="search-results-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Search size={32} />
            <h1 className="page-title">Search Results</h1>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Search size={32} />
            <h1 className="page-title">Search Results</h1>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
        <ErrorMessage message={error.message} onRetry={refetch} />
      </div>
    );
  }

  if (!searchData?.data || searchData.data.length === 0) {
    return (
      <div className="search-results-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Search size={32} />
            <h1 className="page-title">Search Results</h1>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
        <EmptyState 
          message={`No results found for "${query}"`} 
          icon="😕"
        />
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="page-header">
        <div className="page-title-wrapper">
          <Search size={32} />
          <h1 className="page-title">Search Results</h1>
        </div>
        <p className="page-subtitle">
          {searchData.pagination?.items?.total || 0} results for "{query}"
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="anime-grid">
        {searchData.data.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={searchData.pagination?.last_visible_page || 1}
        onPageChange={handlePageChange}
        hasNextPage={searchData.pagination?.has_next_page || false}
        hasPreviousPage={currentPage > 1}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchResults; 