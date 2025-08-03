import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { debounce } from '../../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ 
  onSearch, 
  onFiltersChange, 
  filters = {}, 
  placeholder = "Search for anime...",
  showFilters = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Debounced search function
  const debouncedSearch = debounce((term, filters) => {
    if (term.length >= 2 || Object.keys(filters).length > 0) {
      onSearch(term, filters);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm, localFilters);
  }, [searchTerm, localFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setLocalFilters({});
    onFiltersChange?.({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, localFilters);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="search-input"
          />
          {(searchTerm || Object.keys(localFilters).length > 0) && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        {showFilters && (
          <button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`filter-toggle ${isFiltersOpen ? 'active' : ''}`}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
            Filters
          </button>
        )}
      </form>

      {showFilters && isFiltersOpen && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Type:</label>
            <select
              value={localFilters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
              <option value="ova">OVA</option>
              <option value="special">Special</option>
              <option value="ona">ONA</option>
              <option value="music">Music</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={localFilters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="airing">Currently Airing</option>
              <option value="complete">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating:</label>
            <select
              value={localFilters.rating || ''}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
              className="filter-select"
            >
              <option value="">All Ratings</option>
              <option value="g">All Ages</option>
              <option value="pg">Children</option>
              <option value="pg13">Teens 13+</option>
              <option value="r17">17+</option>
              <option value="r">Mild Nudity</option>
              <option value="rx">Hentai</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select
              value={localFilters.order_by || 'popularity'}
              onChange={(e) => handleFilterChange('order_by', e.target.value)}
              className="filter-select"
            >
              <option value="popularity">Popularity</option>
              <option value="score">Score</option>
              <option value="title">Title</option>
              <option value="start_date">Start Date</option>
              <option value="end_date">End Date</option>
              <option value="episodes">Episodes</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort order:</label>
            <select
              value={localFilters.sort || 'desc'}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="filter-select"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 