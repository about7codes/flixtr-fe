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

// TODO: remove if not used
const getMovieStreamable = async (
  movieId: string | string[] | undefined
): Promise<boolean> => {
  if (movieId === undefined || Array.isArray(movieId)) {
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_Player_URL_VS}/${movieId}`,
      {
        method: "HEAD",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error movie not available to stream:", error);
    return false;
  }
};

export const getPopularMovies = async (pageNum: number): Promise<MovieData> => {
  // &with_original_language=hi
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    // console.log(movieData);
    return movieData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getRecentMovies = async (pageNum: number): Promise<MovieData> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return movieData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getTopMovies = async (pageNum: number): Promise<MovieData> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return movieData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};
