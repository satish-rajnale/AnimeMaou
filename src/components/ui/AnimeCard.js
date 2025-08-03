import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Play, Calendar, Users } from 'lucide-react';
import { formatScore, formatMembers, truncateText, watchlist } from '../../utils/helpers';
import './AnimeCard.css';

const AnimeCard = ({ anime, showWatchlistButton = true }) => {
  const [imageError, setImageError] = useState(false);
  const [isWatchlistHovered, setIsWatchlistHovered] = useState(false);
  
  const isInWatchlist = watchlist.has(anime.mal_id);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = watchlist.toggle(anime);
    // You could add a toast notification here
    console.log(added ? 'Added to watchlist' : 'Removed from watchlist');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'currently airing':
        return 'airing';
      case 'finished airing':
        return 'finished';
      case 'not yet aired':
        return 'upcoming';
      default:
        return 'unknown';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'tv':
        return 'tv';
      case 'movie':
        return 'movie';
      case 'ova':
        return 'ova';
      case 'special':
        return 'special';
      case 'ona':
        return 'ona';
      case 'music':
        return 'music';
      default:
        return 'default';
    }
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card">
      <div className="anime-card-image-container">
        {!imageError ? (
          <img
            src={anime.images?.jpg?.image_url || anime.image_url}
            alt={anime.title}
            className="anime-card-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="anime-card-image-placeholder">
            <Play size={48} />
            <span>Image not available</span>
          </div>
        )}
        
        <div className="anime-card-overlay">
          {showWatchlistButton && (
            <button
              className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlistToggle}
              onMouseEnter={() => setIsWatchlistHovered(true)}
              onMouseLeave={() => setIsWatchlistHovered(false)}
              aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              <Heart 
                size={20} 
                fill={isInWatchlist ? 'currentColor' : 'none'} 
              />
            </button>
          )}
          
          {anime.score && (
            <div className="anime-card-score">
              <Star size={16} fill="currentColor" />
              <span>{formatScore(anime.score)}</span>
            </div>
          )}
        </div>

        {anime.status && (
          <div className={`anime-card-status ${getStatusColor(anime.status)}`}>
            {anime.status}
          </div>
        )}
      </div>

      <div className="anime-card-content">
        <h3 className="anime-card-title" title={anime.title}>
          {truncateText(anime.title, 50)}
        </h3>
        
        <div className="anime-card-meta">
          {anime.type && (
            <span className={`anime-card-type ${getTypeColor(anime.type)}`}>
              {anime.type}
            </span>
          )}
          
          {anime.episodes && (
            <span className="anime-card-episodes">
              {anime.episodes} {anime.episodes === 1 ? 'episode' : 'episodes'}
            </span>
          )}
        </div>

        <div className="anime-card-stats">
          {anime.members && (
            <div className="anime-card-stat">
              <Users size={14} />
              <span>{formatMembers(anime.members)}</span>
            </div>
          )}
          
          {anime.year && (
            <div className="anime-card-stat">
              <Calendar size={14} />
              <span>{anime.year}</span>
            </div>
          )}
        </div>

        {anime.synopsis && (
          <p className="anime-card-synopsis">
            {truncateText(anime.synopsis, 100)}
          </p>
        )}

        {anime.genres && anime.genres.length > 0 && (
          <div className="anime-card-genres">
            {anime.genres.slice(0, 3).map((genre) => (
              <span key={genre.mal_id} className="anime-card-genre">
                {genre.name}
              </span>
            ))}
            {anime.genres.length > 3 && (
              <span className="anime-card-genre-more">
                +{anime.genres.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default AnimeCard; 