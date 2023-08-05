import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { setNotify } from "../redux/notifySlice";
import {
  addToWatchlist,
  getWatchlist,
  getWatchlistById,
  removeFromWatchlist,
} from "../apis/watchlist.api";

export enum WatchlistQueryKey {
  WatchlistAll = "WatchlistAll",
  WatchlistById = "WatchlistById",
}

export const useWatchlist = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useInfiniteQuery(
    [WatchlistQueryKey.WatchlistAll],
    ({ pageParam = 1 }) => getWatchlist(token ?? "", pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
      retry: false,
      enabled: !!token,
    }
  );
};

export const useWatchlistById = (tmdbId: number | undefined) => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useQuery(
    [WatchlistQueryKey.WatchlistById, tmdbId],
    () => getWatchlistById({ token, tmdbId }),
    {
      retry: false,
      enabled: !!token,
    }
  );
};

export const useAddToWatchlist = () => {
  const dispatch = useDispatch();
  const cache = useQueryClient();

  return useMutation(addToWatchlist, {
    onSuccess: (data) => {
      // Update cache data
      cache.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistById],
      });

      cache.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistAll],
        exact: true,
      });

      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Added successfull",
          type: "success",
        })
      );
      // console.log("Successdata", data);
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
  const cache = useQueryClient();

  return useMutation(removeFromWatchlist, {
    onSuccess: (data) => {
      // Update cache data
      cache.invalidateQueries({
        queryKey: [WatchlistQueryKey.WatchlistById],
      });
      cache.resetQueries({
        queryKey: [WatchlistQueryKey.WatchlistAll],
        exact: true,
      });

      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Removed.",
          type: "success",
        })
      );
      // console.log("Successdata", data);
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
