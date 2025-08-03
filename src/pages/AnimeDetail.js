import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnimeDetails, useAnimePictures, useAnimeRelations, useAnimeRecommendations } from '../hooks/useAnime';
import { LoadingSpinner, ErrorMessage, AnimeDetailSkeleton } from '../components/ui/LoadingSkeleton';
import { formatScore, formatMembers, formatDate, truncateText, getYouTubeEmbedUrl, watchlist } from '../utils/helpers';
import { Star, Heart, Play, Calendar, Users, ExternalLink, ArrowLeft } from 'lucide-react';
import './AnimeDetail.css';

const AnimeDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);

  // Fetch anime data
  const {
    data: anime,
    isLoading: animeLoading,
    error: animeError
  } = useAnimeDetails(id);

  const {
    data: pictures,
    isLoading: picturesLoading
  } = useAnimePictures(id);

  const {
    data: relations,
    isLoading: relationsLoading
  } = useAnimeRelations(id);

  const {
    data: recommendations,
    isLoading: recommendationsLoading
  } = useAnimeRecommendations(id);

  if (animeLoading) {
    return <AnimeDetailSkeleton />;
  }

  if (animeError) {
    return (
      <div className="anime-detail-error">
        <ErrorMessage 
          message={animeError.message} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!anime?.data) {
    return (
      <div className="anime-detail-error">
        <ErrorMessage message="Anime not found" />
      </div>
    );
  }

  const animeData = anime.data;
  const isInWatchlist = watchlist.has(animeData.mal_id);
  const trailerUrl = getYouTubeEmbedUrl(animeData.trailer?.url);

  const handleWatchlistToggle = () => {
    const added = watchlist.toggle(animeData);
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

  return (
    <div className="anime-detail-page">
      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="anime-hero">
        <div className="anime-hero-image">
          <img
            src={animeData.images?.jpg?.large_image_url || animeData.images?.jpg?.image_url}
            alt={animeData.title}
            className="hero-image"
          />
          <div className="hero-overlay">
            {trailerUrl && (
              <button
                className="trailer-button"
                onClick={() => setShowTrailer(true)}
              >
                <Play size={24} />
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        <div className="anime-hero-content">
          <div className="anime-header">
            <h1 className="anime-title">{animeData.title}</h1>
            {animeData.title_english && animeData.title_english !== animeData.title && (
              <h2 className="anime-title-english">{animeData.title_english}</h2>
            )}
            {animeData.title_japanese && (
              <h3 className="anime-title-japanese">{animeData.title_japanese}</h3>
            )}
          </div>

          <div className="anime-meta">
            <div className="anime-score">
              <Star size={20} fill="currentColor" />
              <span className="score-value">{formatScore(animeData.score)}</span>
              <span className="score-users">({formatMembers(animeData.scored_by)} users)</span>
            </div>

            <div className="anime-rank">
              {animeData.rank && (
                <span className="rank-badge">#{animeData.rank}</span>
              )}
            </div>

            <div className="anime-status">
              <span className={`status-badge ${getStatusColor(animeData.status)}`}>
                {animeData.status}
              </span>
            </div>
          </div>

          <div className="anime-actions">
            <button
              className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
              onClick={handleWatchlistToggle}
            >
              <Heart size={20} fill={isInWatchlist ? 'currentColor' : 'none'} />
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </button>

            <a
              href={animeData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link-button"
            >
              <ExternalLink size={20} />
              View on MyAnimeList
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="anime-content">
        <div className="anime-main">
          {/* Synopsis */}
          <section className="anime-section">
            <h2 className="section-title">Synopsis</h2>
            <p className="anime-synopsis">
              {animeData.synopsis || 'No synopsis available.'}
            </p>
          </section>

          {/* Information */}
          <section className="anime-section">
            <h2 className="section-title">Information</h2>
            <div className="anime-info-grid">
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{animeData.type || 'Unknown'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Episodes:</span>
                <span className="info-value">{animeData.episodes || 'Unknown'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Duration:</span>
                <span className="info-value">{animeData.duration || 'Unknown'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rating:</span>
                <span className="info-value">{animeData.rating || 'Unknown'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Aired:</span>
                <span className="info-value">
                  {animeData.aired?.from ? formatDate(animeData.aired.from) : 'Unknown'}
                  {animeData.aired?.to && ` to ${formatDate(animeData.aired.to)}`}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Season:</span>
                <span className="info-value">
                  {animeData.season ? `${animeData.season} ${animeData.year}` : 'Unknown'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Broadcast:</span>
                <span className="info-value">{animeData.broadcast?.string || 'Unknown'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Source:</span>
                <span className="info-value">{animeData.source || 'Unknown'}</span>
              </div>
            </div>
          </section>

          {/* Genres */}
          {animeData.genres && animeData.genres.length > 0 && (
            <section className="anime-section">
              <h2 className="section-title">Genres</h2>
              <div className="anime-genres">
                {animeData.genres.map((genre) => (
                  <Link
                    key={genre.mal_id}
                    to={`/genre/${genre.mal_id}`}
                    className="genre-tag"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Studios */}
          {animeData.studios && animeData.studios.length > 0 && (
            <section className="anime-section">
              <h2 className="section-title">Studios</h2>
              <div className="anime-studios">
                {animeData.studios.map((studio) => (
                  <span key={studio.mal_id} className="studio-tag">
                    {studio.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="anime-sidebar">
          {/* Pictures */}
          {pictures?.data && pictures.data.length > 0 && (
            <section className="anime-section">
              <h2 className="section-title">Pictures</h2>
              <div className="anime-pictures">
                {pictures.data.slice(0, 6).map((picture, index) => (
                  <img
                    key={index}
                    src={picture.jpg.image_url}
                    alt={`${animeData.title} - Image ${index + 1}`}
                    className="anime-picture"
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Relations */}
          {relations?.data && relations.data.length > 0 && (
            <section className="anime-section">
              <h2 className="section-title">Related Anime</h2>
              <div className="anime-relations">
                {relations.data.slice(0, 5).map((relation) => (
                  <div key={relation.entry.mal_id} className="relation-item">
                    <span className="relation-type">{relation.relation}</span>
                    <Link
                      to={`/anime/${relation.entry.mal_id}`}
                      className="relation-title"
                    >
                      {relation.entry.name}
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations?.data && recommendations.data.length > 0 && (
        <section className="anime-section recommendations-section">
          <h2 className="section-title">Recommendations</h2>
          <div className="recommendations-grid">
            {recommendations.data.slice(0, 6).map((rec) => (
              <div key={rec.entry.mal_id} className="recommendation-card">
                <img
                  src={rec.entry.images?.jpg?.image_url}
                  alt={rec.entry.title}
                  className="recommendation-image"
                />
                <div className="recommendation-content">
                  <h3 className="recommendation-title">{rec.entry.title}</h3>
                  <p className="recommendation-count">
                    {rec.votes} users recommend this
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="trailer-close"
              onClick={() => setShowTrailer(false)}
            >
              ×
            </button>
            <iframe
              src={trailerUrl}
              title="Anime Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="trailer-iframe"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetail; 