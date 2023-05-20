import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setNotify } from "../redux/notifySlice";
import { addToWatchlist, getWatchlistById } from "../api/watchlist.api";
import { useSession } from "next-auth/react";

export const useWatchlistById = (tmdbId: number) => {
  const { data } = useSession();
  const token = data?.user.authToken;

  return useQuery(
    ["watchlistMedia", tmdbId],
    () => getWatchlistById({ token, tmdbId }),
    {
      enabled: !!token,
    }
  );
};

export const useAddToWatchlist = () => {
  const dispatch = useDispatch();

  return useMutation(addToWatchlist, {
    onSuccess: (data) => {
      // Update cache data
      // cache.invalidateQueries("key");

      dispatch(
        setNotify({
          isOpen: true,
          message: "Added successfull",
          type: "success",
        })
      );
      console.log("Successdata", data);
    },
    onError: (error: any) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: error.message,
          type: "error",
        })
      );
      console.log("QueryError", error);
    },
  });
};
