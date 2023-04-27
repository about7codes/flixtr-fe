import { MovieData, MovieResult } from "../types/apiResponses";

export const getMovies = async (): Promise<MovieResult[]> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return movieData.results;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getMovieById = async (
  movieId?: string | string[]
): Promise<MovieResult> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`
    );
    const movieData: MovieResult = await movieRes.json();

    // failure if 'success' property exists
    if (movieData.hasOwnProperty("success")) throw new Error("Api call failed");

    return movieData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};
