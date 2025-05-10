import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPopularSeries,
  getRecentSeries,
  getSeries,
  getSeriesById,
  getSeriesSeasonById,
  getTopSeries,
} from "../apis/series.api";

export enum SeriesQueryKey {
  SeriesData = "SeriesData",
  SingleShowData = "SingleShowData",
  TvShowSeasonData = "TvShowSeasonData",
  PopularSeries = "PopularSeries",
  RecentSeries = "RecentSeries",
  TopSeries = "TopSeries",
}

const options = {
  staleTime: 10 * 60 * 1000, // 10 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
  refetchOnWindowFocus: false,
  refetchInterval: false as false,
  keepPreviousData: true,
};

export const useSeries = () => {
  return useQuery([SeriesQueryKey.SeriesData], getSeries, options);
};

export const useSeriesById = (seriesId?: string | string[]) => {
  return useQuery(
    [SeriesQueryKey.SingleShowData, seriesId],
    () => getSeriesById(seriesId),
    options
  );
};

export const useSeriesSeasonById = (
  seriesId: string | string[] | undefined,
  seasonCount: string | string[] | undefined
) => {
  return useQuery(
    [SeriesQueryKey.TvShowSeasonData, seriesId, seasonCount],
    () => getSeriesSeasonById(seriesId, seasonCount),
    options
  );
};

export const usePopularSeries = () => {
  return useInfiniteQuery(
    [SeriesQueryKey.PopularSeries],
    ({ pageParam = 1 }) => getPopularSeries(pageParam),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useRecentSeries = () => {
  return useInfiniteQuery(
    [SeriesQueryKey.RecentSeries],
    ({ pageParam = 1 }) => getRecentSeries(pageParam),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};

export const useTopSeries = () => {
  return useInfiniteQuery(
    [SeriesQueryKey.TopSeries],
    ({ pageParam = 1 }) => getTopSeries(pageParam),
    {
      ...options,
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};
