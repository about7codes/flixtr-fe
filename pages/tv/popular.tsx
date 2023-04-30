import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";
import { getPopularSeries } from "../../api/series.api";
import { SeriesQueryKey, usePopularSeries } from "../../hooks/series.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";

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
    <>
      <CustomHead title="Popular TV shows to watch." media_type="tv" />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Popular Tv Shows
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {popularSeries?.pages.map((page) =>
            page.results.map((show) => (
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
    </>
  );
}

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  try {
    // fetching popular series detail
    await queryClient.prefetchInfiniteQuery(
      [SeriesQueryKey.PopularSeries],
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
