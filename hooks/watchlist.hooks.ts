import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { setNotify } from "../redux/notifySlice";
import {
  addToWatchlist,
  getWatchlistById,
  removeFromWatchlist,
} from "../api/watchlist.api";

export const useWatchlistById = (tmdbId: number | undefined) => {
  const { data } = useSession();
  const token = data?.user.authToken;

  return useQuery(
    ["watchlistMedia", tmdbId],
    () => getWatchlistById({ token, tmdbId }),
    {
      enabled: !!token,
      retry: false,
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
          message: data.message ?? "Added successfull",
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

export const useRemoveFromWatchlist = () => {
  const dispatch = useDispatch();

  return useMutation(removeFromWatchlist, {
    onSuccess: (data) => {
      // Update cache data
      // cache.invalidateQueries("key");

      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Removed.",
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
