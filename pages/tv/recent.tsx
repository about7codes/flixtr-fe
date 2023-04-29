import React from "react";
import { useInfiniteQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import { SeriesData } from "../../types/apiResponses";
import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";

type RecentProps = {};

function Recent() {
  const {
    data: recentSeries,
    isLoading,
    fetchNextPage,
    isFetching,
  } = useRecentSeries();
  // console.log('recentSeries: ', recentSeries)

  if (isLoading) return <Loader />;

  return (
    <Box sx={classes.pageContainer}>
      <Typography variant="h4" sx={classes.headTxt}>
        Most recent TV Shows
      </Typography>
      <Grid container sx={classes.moviesContainer}>
        {recentSeries?.pages.map((page) =>
          page.results.map(show => (
            <Grid item key={show.id}>
              <TvPoster singleShowData={show} />
            </Grid>
          ))
        )}
      </Grid>
      <Grid container justifyContent="center">
        <LoadingButton
          onClick={() => fetchNextPage()}
          loading={isFetching || isLoading}
          loadingIndicator="Loading…"
          color="secondary"
          variant="contained"
          size="large"
          sx={classes.loadBtn}
        >
          show more
        </LoadingButton>
      </Grid>
    </Box>
  );
}

export const getRecentSeries = async (pageNum: number): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const seriesData: SeriesData = await seriesRes.json();

    if (seriesData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return seriesData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
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

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  try {
    // fetching recent series detail
    await queryClient.prefetchInfiniteQuery(
      ["recentSeries"],
      ({ pageParam = 1 }) => getRecentSeries(pageParam),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.page < lastPage.total_pages
            ? lastPage.page + 1
            : undefined;
        },
      }
    );

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
});

export default Recent;
