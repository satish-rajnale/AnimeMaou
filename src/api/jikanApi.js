import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for rate limiting
api.interceptors.request.use(
  (config) => {
    // Add delay to respect rate limits (1 request per second)
    return new Promise((resolve) => {
      setTimeout(() => resolve(config), 1000);
    });
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (error.response?.status === 404) {
      throw new Error('Anime not found.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw new Error('Network error. Please try again.');
  }
);

// API functions
export const jikanApi = {
  // Search anime with filters and pagination
  searchAnime: async (query, page = 1, filters = {}) => {
    const params = {
      q: query,
      page,
      limit: 20,
      ...filters,
    };
    
    return api.get('/anime', { params });
  },

  // Get top anime
  getTopAnime: async (page = 1, filter = 'bypopularity') => {
    return api.get(`/top/anime?page=${page}&filter=${filter}`);
  },

  // Get anime by ID with full details
  getAnimeById: async (id) => {
    return api.get(`/anime/${id}/full`);
  },

  // Get anime pictures
  getAnimePictures: async (id) => {
    return api.get(`/anime/${id}/pictures`);
  },

  // Get anime relations (prequels, sequels, etc.)
  getAnimeRelations: async (id) => {
    return api.get(`/anime/${id}/relations`);
  },

  // Get anime recommendations
  getAnimeRecommendations: async (id) => {
    return api.get(`/anime/${id}/recommendations`);
  },

  // Get seasonal anime
  getSeasonalAnime: async (year, season, page = 1) => {
    return api.get(`/seasons/${season}/${year}?page=${page}`);
  },

  // Get current season anime
  getCurrentSeason: async (page = 1) => {
    return api.get(`/seasons/now?page=${page}`);
  },

  // Get upcoming anime
  getUpcomingAnime: async (page = 1) => {
    return api.get(`/seasons/upcoming?page=${page}`);
  },

  // Get genres list
  getGenres: async () => {
    return api.get('/genres/anime');
  },

  // Get anime by genre
  getAnimeByGenre: async (genreId, page = 1) => {
    return api.get(`/anime?genres=${genreId}&page=${page}&order_by=popularity&sort=desc`);
  },

  // Get random anime
  getRandomAnime: async () => {
    return api.get('/random/anime');
  },
};

export default jikanApi; 