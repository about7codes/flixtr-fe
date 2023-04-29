import React from "react";
import { QueryClient, dehydrate, useInfiniteQuery } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import { SeriesData } from "../../types/apiResponses";
import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";

type PopularProps = {};

function Popular() {
  const {
    data: popularSeries,
    isLoading,
    fetchNextPage,
    isFetching,
  } = usePopularSeries();
  // console.log('popularSeries: ', popularSeries)

  if (isLoading) return <Loader />;

  return (
    <Box sx={classes.pageContainer}>
      <Typography variant="h4" sx={classes.headTxt}>
        Popular Tv Shows
      </Typography>
      <Grid container sx={classes.moviesContainer}>
        {popularSeries?.pages.map((page) =>
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

export const getPopularSeries = async (pageNum: number): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
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

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  try {
    // fetching popular series detail
    await queryClient.prefetchInfiniteQuery(
      ["popularSeries"],
      ({ pageParam = 1 }) => getPopularSeries(pageParam),
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

export default Popular;
