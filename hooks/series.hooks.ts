import { useQuery } from "@tanstack/react-query";
import {
  getSeries,
  getSeriesById,
  getSeriesSeasonById,
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
