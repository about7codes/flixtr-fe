import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type WatchlistProps = {};

function Watchlist({}: WatchlistProps) {
  const { data: sessionData } = useSession();
  console.log(sessionData?.user.authToken);

  const { data } = useWatchlist();
  console.log("data; ", data);

  useEffect(() => {
    // console.log(res);
  }, []);
  return <div>Watchlist Tiles</div>;
}

export const getWatchlist = async (token: string) => {
  try {
    const watchlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const watchlistData = await watchlistRes.json();

    if (watchlistData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");
    console.log(watchlistData);

    return watchlistData.watchlist;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

export const useWatchlist = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useQuery(["watchlist", token], () => getWatchlist(token ?? ""), {
    enabled: !!token,
  });
};

export default Watchlist;
