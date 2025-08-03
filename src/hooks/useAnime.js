import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { jikanApi } from '../api/jikanApi';

// Hook for searching anime
export const useSearchAnime = (query, page = 1, filters = {}) => {
  return useQuery(
    ['searchAnime', query, page, filters],
    () => jikanApi.searchAnime(query, page, filters),
    {
      enabled: !!query && query.length > 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
    }
  );
};

// Hook for infinite search results
export const useInfiniteSearchAnime = (query, filters = {}) => {
  return useInfiniteQuery(
    ['infiniteSearchAnime', query, filters],
    ({ pageParam = 1 }) => jikanApi.searchAnime(query, pageParam, filters),
    {
      enabled: !!query && query.length > 2,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination?.has_next_page) {
          return lastPage.pagination.current_page + 1;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
    }
  );
};

// Hook for top anime
export const useTopAnime = (page = 1, filter = 'bypopularity') => {
  return useQuery(
    ['topAnime', page, filter],
    () => jikanApi.getTopAnime(page, filter),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
    }
  );
};

// Hook for anime details
export const useAnimeDetails = (id) => {
  return useQuery(
    ['animeDetails', id],
    () => jikanApi.getAnimeById(id),
    {
      enabled: !!id,
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
    }
  );
};

// Hook for anime pictures
export const useAnimePictures = (id) => {
  return useQuery(
    ['animePictures', id],
    () => jikanApi.getAnimePictures(id),
    {
      enabled: !!id,
      staleTime: 60 * 60 * 1000, // 1 hour
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      retry: 2,
    }
  );
};

// Hook for anime relations
export const useAnimeRelations = (id) => {
  return useQuery(
    ['animeRelations', id],
    () => jikanApi.getAnimeRelations(id),
    {
      enabled: !!id,
      staleTime: 60 * 60 * 1000, // 1 hour
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      retry: 2,
    }
  );
};

// Hook for anime recommendations
export const useAnimeRecommendations = (id) => {
  return useQuery(
    ['animeRecommendations', id],
    () => jikanApi.getAnimeRecommendations(id),
    {
      enabled: !!id,
      staleTime: 60 * 60 * 1000, // 1 hour
      cacheTime: 24 * 60 * 60 * 1000, // 24 hours
      retry: 2,
    }
  );
};

// Hook for seasonal anime
export const useSeasonalAnime = (year, season, page = 1) => {
  return useQuery(
    ['seasonalAnime', year, season, page],
    () => jikanApi.getSeasonalAnime(year, season, page),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
    }
  );
};

// Hook for current season
export const useCurrentSeason = (page = 1) => {
  return useQuery(
    ['currentSeason', page],
    () => jikanApi.getCurrentSeason(page),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
    }
  );
};

// Hook for upcoming anime
export const useUpcomingAnime = (page = 1) => {
  return useQuery(
    ['upcomingAnime', page],
    () => jikanApi.getUpcomingAnime(page),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
    }
  );
};

// Hook for genres
export const useGenres = () => {
  return useQuery(
    ['genres'],
    () => jikanApi.getGenres(),
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      retry: 2,
    }
  );
};

// Hook for anime by genre
export const useAnimeByGenre = (genreId, page = 1) => {
  return useQuery(
    ['animeByGenre', genreId, page],
    () => jikanApi.getAnimeByGenre(genreId, page),
    {
      enabled: !!genreId,
      staleTime: 30 * 60 * 1000, // 30 minutes
      cacheTime: 60 * 60 * 1000, // 1 hour
      retry: 2,
    }
  );
};

// Hook for random anime
export const useRandomAnime = () => {
  return useQuery(
    ['randomAnime'],
    () => jikanApi.getRandomAnime(),
    {
      staleTime: 0, // Always fetch fresh random anime
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    }
  );
}; 