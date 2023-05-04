import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  getPopularMovies,
  getRecentMovies,
  getTopMovies,
} from "../api/movies.api";

export enum MovieQueryKey {
  MovieData = "MovieData",
  SingleMovieData = "SingleMovieData",
  PopularMovies = "PopularMovies",
  RecentMovies = "RecentMovies",
  TopMovies = "TopMovies",
  SearchQuery = "SearchQuery",
  SearchPageQuery = "SearchPageQuery",
}

export const useMovies = () => {
  return useQuery([MovieQueryKey.MovieData], getMovies);
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery([MovieQueryKey.SingleMovieData, movieId], () =>
    getMovieById(movieId)
  );
};

export const usePopularMovies = () => {
  return useInfiniteQuery(
    [MovieQueryKey.PopularMovies],
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
    [MovieQueryKey.RecentMovies],
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
    [MovieQueryKey.TopMovies],
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
