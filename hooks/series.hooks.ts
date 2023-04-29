import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPopularSeries,
  getRecentSeries,
  getSeries,
  getSeriesById,
  getSeriesSeasonById,
  getTopSeries,
} from "../api/series.api";

export const useSeries = () => {
  return useQuery(["seriesData"], getSeries);
};

export const useSeriesById = (seriesId?: string | string[]) => {
  return useQuery(["singleShowData", seriesId], () => getSeriesById(seriesId));
};

export const useSeriesSeasonById = (
  seriesId: string | string[] | undefined,
  seasonCount: string | string[] | undefined
) => {
  return useQuery(["tvShowSeasonData", seriesId], () =>
    getSeriesSeasonById(seriesId, seasonCount)
  );
};

export const usePopularSeries = () => {
  return useInfiniteQuery(
    ["popularSeries"],
    ({ pageParam = 1 }) => getPopularSeries(pageParam),
    {
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
    ["recentSeries"],
    ({ pageParam = 1 }) => getRecentSeries(pageParam),
    {
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
    ["topSeries"],
    ({ pageParam = 1 }) => getTopSeries(pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
    }
  );
};
