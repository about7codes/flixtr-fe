import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";
import { getRecentSeries } from "../../api/series.api";
import { useRecentSeries } from "../../hooks/series.hooks";

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
  );
}

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
