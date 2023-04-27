import { useQuery } from "@tanstack/react-query";
import { getMovieById, getMovies } from "../api/movies.api";

export const useMovies = () => {
  return useQuery(["movieData"], getMovies);
};

export const useMovieById = (movieId?: string | string[]) => {
  return useQuery(["singleMovieData", movieId], () => getMovieById(movieId));
};
