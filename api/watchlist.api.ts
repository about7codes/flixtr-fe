import { WatchlistData } from "../types/watchlist.apiResponses";

export const getWatchlist = async (
  token: string,
  pageNum: number
): Promise<WatchlistData> => {
  try {
    const watchlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/all?page=${pageNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const watchlistData: WatchlistData = await watchlistRes.json();

    if (watchlistData.hasOwnProperty("error"))
      throw new Error(watchlistData.error);

    if (watchlistData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return watchlistData;
  } catch (error: any) {
    console.log(error);
    if (error?.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Api call failed, check console.");
    }
  }
};

export const getWatchlistById = async ({
  token,
  tmdbId,
}: {
  token: string | undefined;
  tmdbId: number | undefined;
}) => {
  try {
    const mediaRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/${tmdbId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const mediaData = await mediaRes.json();

    if (mediaData.hasOwnProperty("error")) throw new Error(mediaData.error);

    // failure if 'success' property exists
    if (mediaData.hasOwnProperty("success")) throw new Error("Api call failed");

    console.log(mediaData);

    return mediaData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};

type AddMediaArgs = {
  token: string;
  tmdb_id: number;
  media_type: string;
  media_name: string;
  release_date: string;
  poster_path: string;
};

export const addToWatchlist = async ({
  token,
  tmdb_id,
  media_type,
  media_name,
  release_date,
  poster_path,
}: AddMediaArgs) => {
  try {
    const watchlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdb_id,
          media_type,
          media_name,
          release_date,
          poster_path,
        }),
      }
    );

    const watchlistData = await watchlistRes.json();

    if (watchlistData.hasOwnProperty("error"))
      throw new Error(watchlistData.error);

    if (watchlistData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");
    // console.log(watchlistData);

    return watchlistData;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

type RemoveMediaArgs = {
  token: string;
  tmdbId: number;
};

export const removeFromWatchlist = async ({
  token,
  tmdbId,
}: RemoveMediaArgs) => {
  try {
    const watchlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/delete/${tmdbId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const watchlistData = await watchlistRes.json();

    if (watchlistData.hasOwnProperty("error"))
      throw new Error(watchlistData.error);

    if (watchlistData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");
    // console.log(watchlistData);

    return watchlistData;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
