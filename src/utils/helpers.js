// Debounce function for search input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format anime score
export const formatScore = (score) => {
  if (!score || score === 0) return 'N/A';
  return score.toFixed(1);
};

// Format anime members count
export const formatMembers = (members) => {
  if (!members) return 'N/A';
  if (members >= 1000000) {
    return `${(members / 1000000).toFixed(1)}M`;
  }
  if (members >= 1000) {
    return `${(members / 1000).toFixed(1)}K`;
  }
  return members.toString();
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get season name from number
export const getSeasonName = (season) => {
  const seasons = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
  };
  return seasons[season] || season;
};

// Get current season
export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

// Get current year
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Extract YouTube video ID from URL
export const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Generate YouTube embed URL
export const getYouTubeEmbedUrl = (url) => {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// Watchlist helpers
export const watchlist = {
  get: () => storage.get('watchlist', []),
  
  add: (anime) => {
    const current = watchlist.get();
    const exists = current.find(item => item.mal_id === anime.mal_id);
    if (!exists) {
      storage.set('watchlist', [...current, anime]);
      return true;
    }
    return false;
  },
  
  remove: (animeId) => {
    const current = watchlist.get();
    const filtered = current.filter(item => item.mal_id !== animeId);
    storage.set('watchlist', filtered);
  },
  
  has: (animeId) => {
    const current = watchlist.get();
    return current.some(item => item.mal_id === animeId);
  },
  
  toggle: (anime) => {
    if (watchlist.has(anime.mal_id)) {
      watchlist.remove(anime.mal_id);
      return false;
    } else {
      watchlist.add(anime);
      return true;
    }
  },
};

// Theme helpers
export const theme = {
  get: () => storage.get('theme', 'light'),
  
  set: (themeName) => {
    storage.set('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
  },
  
  toggle: () => {
    const current = theme.get();
    const newTheme = current === 'light' ? 'dark' : 'light';
    theme.set(newTheme);
    return newTheme;
  },
  
  init: () => {
    const savedTheme = theme.get();
    theme.set(savedTheme);
  },
};

// Sort options
export const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'score', label: 'Score' },
  { value: 'title', label: 'Title' },
  { value: 'start_date', label: 'Start Date' },
  { value: 'end_date', label: 'End Date' },
  { value: 'episodes', label: 'Episodes' },
];

// Filter options
export const filterOptions = {
  type: [
    { value: 'tv', label: 'TV' },
    { value: 'movie', label: 'Movie' },
    { value: 'ova', label: 'OVA' },
    { value: 'special', label: 'Special' },
    { value: 'ona', label: 'ONA' },
    { value: 'music', label: 'Music' },
  ],
  
  status: [
    { value: 'airing', label: 'Currently Airing' },
    { value: 'complete', label: 'Finished' },
    { value: 'upcoming', label: 'Upcoming' },
  ],
  
  rating: [
    { value: 'g', label: 'All Ages' },
    { value: 'pg', label: 'Children' },
    { value: 'pg13', label: 'Teens 13 or older' },
    { value: 'r17', label: '17+ (violence & profanity)' },
    { value: 'r', label: 'Mild Nudity' },
    { value: 'rx', label: 'Hentai' },
  ],
}; 