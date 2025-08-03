import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimeCard from '../components/ui/AnimeCard';
import { EmptyState } from '../components/ui/LoadingSkeleton';
import { Heart, Trash2 } from 'lucide-react';
import { watchlist } from '../utils/helpers';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    const items = watchlist.get();
    setWatchlistItems(items);
  }, []);

  const handleRemoveFromWatchlist = (animeId) => {
    watchlist.remove(animeId);
    setWatchlistItems(watchlist.get());
  };

  if (watchlistItems.length === 0) {
    return (
      <div className="watchlist-page">
        <div className="page-header">
          <div className="page-title-wrapper">
            <Heart size={32} />
            <h1 className="page-title">My Watchlist</h1>
          </div>
          <p className="page-subtitle">
            Your saved anime will appear here
          </p>
        </div>
        <EmptyState 
          message="Your watchlist is empty" 
          icon="💔"
        />
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="page-header">
        <div className="page-title-wrapper">
          <Heart size={32} />
          <h1 className="page-title">My Watchlist</h1>
        </div>
        <p className="page-subtitle">
          {watchlistItems.length} anime in your watchlist
        </p>
      </div>

      <div className="anime-grid">
        {watchlistItems.map((anime) => (
          <div key={anime.mal_id} className="anime-card-wrapper">
            <button
              className="remove-button"
              onClick={() => handleRemoveFromWatchlist(anime.mal_id)}
              aria-label="Remove from watchlist"
            >
              <Trash2 size={16} />
            </button>
            <AnimeCard anime={anime} showWatchlistButton={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist; 