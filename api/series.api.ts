import { SeriesResult, SeriesData, ShowSeason } from "../types/apiResponses";

export const getSeries = async (): Promise<SeriesResult[]> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const seriesData: SeriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData.results;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getSeriesById = async (
  seriesId?: string | string[]
): Promise<SeriesResult> => {
  try {
    const showRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`
    );
    const showData: SeriesResult = await showRes.json();

    // failure if 'success' property exists
    if (showData.hasOwnProperty("success")) throw new Error("Api call failed");

    return showData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};

// TODO: remove if not used
const getSeriesStreamable = async (
  seriesId: string | string[] | undefined
): Promise<boolean> => {
  if (seriesId === undefined || Array.isArray(seriesId)) {
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_Player_URL_VS}/${seriesId}/1-1`,
      {
        method: "HEAD",
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error tv show not available to stream:", error);
    return false;
  }
};

export const getSeriesSeasonById = async (
  seriesId: string | string[] | undefined,
  seasonCount: string | string[] | undefined
): Promise<ShowSeason> => {
  try {
    const showSeasonRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonCount}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`
    );
    const showSeasonData: ShowSeason = await showSeasonRes.json();

    // failure if 'success' property exists
    if (showSeasonData.hasOwnProperty("success"))
      throw new Error("Api call failed");

    return showSeasonData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};

export const getPopularSeries = async (
  pageNum: number
): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const seriesData: SeriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getRecentSeries = async (pageNum: number): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&with_original_language=en&page=${pageNum}`
    );
    const seriesData: SeriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const getTopSeries = async (pageNum: number): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const seriesData: SeriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};
