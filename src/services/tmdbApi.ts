import axios from 'axios';
import { Movie } from '../types';

const API_KEY = '21a58db368df2452cf19008fe9208b45';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId: number): Promise<Movie | null> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    if (!query.trim()) return [];
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query: query.trim(),
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getImageUrl = (path: string): string => {
  return `${IMAGE_BASE_URL}${path}`;
};

export default tmdbApi;
