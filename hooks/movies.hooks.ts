import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieById,
  getPopularMovies,
  getRecentMovies,
  getTopMovies,
} from "../apis/movies.api";
import { IConutry } from "../utils/filterUtils";

export enum MovieQueryKey {
  MovieData = "MovieData",
  MovieStreamable = "MovieStreamable",
  SingleMovieData = "SingleMovieData",
  PopularMovies = "PopularMovies",
  RecentMovies = "RecentMovies",
  TopMovies = "TopMovies",
  SearchQuery = "SearchQuery",
  SearchPageQuery = "SearchPageQuery",
}

const options = {
  staleTime: 10 * 60 * 1000, // 10 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
  refetchOnWindowFocus: false,
  refetchInterval: false as false,
  keepPreviousData: true,
};

export const useMovies = () => {
  return useQuery([MovieQueryKey.MovieData], getMovies, options);
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery(
    [MovieQueryKey.SingleMovieData, movieId],
    () => getMovieById(movieId),
    options
  );
};

export const usePopularMovies = (
  releaseYear?: number | "",
  conutry?: IConutry
) => {
  return useInfiniteQuery(
    [MovieQueryKey.PopularMovies, conutry, releaseYear],
    (props) => getPopularMovies(props),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useRecentMovies = (
  releaseYear?: number | "",
  conutry?: IConutry
) => {
  return useInfiniteQuery(
    [MovieQueryKey.RecentMovies, conutry, releaseYear],
    (props) => getRecentMovies(props),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useTopMovies = (releaseYear?: number | "", conutry?: IConutry) => {
  return useInfiniteQuery(
    [MovieQueryKey.TopMovies, conutry, releaseYear],
    (prop) => getTopMovies(prop),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};
