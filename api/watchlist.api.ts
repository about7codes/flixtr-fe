export const getWatchlistById = async ({
  token,
  tmdbId,
}: {
  token: string | undefined;
  tmdbId: number;
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

type MediaArgs = {
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
}: MediaArgs) => {
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
