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