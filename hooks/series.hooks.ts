import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getPopularSeries,
  getRecentSeries,
  getSeries,
  getSeriesById,
  getSeriesSeasonById,
  getTopSeries,
} from "../apis/series.api";
import { IConutry } from "../utils/filterUtils";

export enum SeriesQueryKey {
  SeriesData = "SeriesData",
  SingleShowData = "SingleShowData",
  TvShowSeasonData = "TvShowSeasonData",
  PopularSeries = "PopularSeries",
  RecentSeries = "RecentSeries",
  TopSeries = "TopSeries",
}

export const useSeries = () => {
  return useQuery([SeriesQueryKey.SeriesData], getSeries);
};

export const useSeriesById = (seriesId?: string | string[]) => {
  return useQuery([SeriesQueryKey.SingleShowData, seriesId], () =>
    getSeriesById(seriesId)
  );
};

export const useSeriesSeasonById = (
  seriesId: string | string[] | undefined,
  seasonCount: string | string[] | undefined
) => {
  return useQuery([SeriesQueryKey.TvShowSeasonData, seriesId], () =>
    getSeriesSeasonById(seriesId, seasonCount)
  );
};

export const usePopularSeries = (
  releaseYear?: number | "",
  conutry?: IConutry
) => {
  return useInfiniteQuery(
    [SeriesQueryKey.PopularSeries, conutry, releaseYear],
    (prop) => getPopularSeries(prop),
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

export const useRecentSeries = (
  releaseYear?: number | "",
  conutry?: IConutry
) => {
  return useInfiniteQuery(
    [SeriesQueryKey.RecentSeries, conutry, releaseYear],
    (prop) => getRecentSeries(prop),
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

export const useTopSeries = (releaseYear?: number | "", conutry?: IConutry) => {
  return useInfiniteQuery(
    [SeriesQueryKey.TopSeries, conutry, releaseYear],
    (prop) => getTopSeries(prop),
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
