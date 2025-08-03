import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Heart, Menu, X } from 'lucide-react';
import { theme, watchlist } from '../../utils/helpers';
import './Header.css';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Initialize theme
    const currentTheme = theme.get();
    setIsDark(currentTheme === 'dark');
    theme.init();

    // Update watchlist count
    const updateWatchlistCount = () => {
      const watchlistItems = watchlist.get();
      setWatchlistCount(watchlistItems.length);
    };

    updateWatchlistCount();
    window.addEventListener('storage', updateWatchlistCount);

    return () => {
      window.removeEventListener('storage', updateWatchlistCount);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.toggle();
    setIsDark(newTheme === 'dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-logo" onClick={closeMobileMenu}>
            <span className="logo-icon">🎌</span>
            <span className="logo-text">AnimeMaou</span>
          </Link>
        </div>

        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/top" 
            className={`nav-link ${isActive('/top') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Top Anime
          </Link>
          <Link 
            to="/seasonal" 
            className={`nav-link ${isActive('/seasonal') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Seasonal
          </Link>
          <Link 
            to="/upcoming" 
            className={`nav-link ${isActive('/upcoming') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Upcoming
          </Link>
          <Link 
            to="/watchlist" 
            className={`nav-link ${isActive('/watchlist') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Heart size={16} />
            Watchlist
            {watchlistCount > 0 && (
              <span className="watchlist-badge">{watchlistCount}</span>
            )}
          </Link>
        </nav>

        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </header>
  );
};

export default Header; 