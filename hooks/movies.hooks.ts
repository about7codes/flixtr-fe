import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  getPopularMovies,
  getRecentMovies,
  getTopMovies,
} from "../api/movies.api";

export const useMovies = () => {
  return useQuery(["movieData"], getMovies);
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery(["singleMovieData", movieId], () => getMovieById(movieId));
};

export const usePopularMovies = () => {
  return useInfiniteQuery(
    ["popularMovies"],
    ({ pageParam = 1 }) => getPopularMovies(pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useRecentMovies = () => {
  return useInfiniteQuery(
    ["recentMovies"],
    ({ pageParam = 1 }) => getRecentMovies(pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useTopMovies = () => {
  return useInfiniteQuery(
    ["topMovies"],
    ({ pageParam = 1 }) => getTopMovies(pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};
