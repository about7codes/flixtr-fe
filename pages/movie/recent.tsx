import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { getRecentMovies } from "../../api/movies.api";
import { useRecentMovies } from "../../hooks/movies.hooks";

type RecentProps = {};

function Recent() {
  const {
    data: recentMovies,
    isLoading,
    fetchNextPage,
    isFetching,
  } = useRecentMovies();
  // console.log('RecentMovies: ', recentMovies)

  if (isLoading) return <Loader />;

  return (
    <Box sx={classes.pageContainer}>
      <Typography variant="h4" sx={classes.headTxt}>
        Recent movies
      </Typography>
      <Grid container sx={classes.moviesContainer}>
        {recentMovies?.pages.map((page) =>
          page.results.map((movie, index) => (
            <Grid item key={index}>
              <Poster singleMovieData={movie} />
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
    // fetching recent movies detail
    await queryClient.prefetchInfiniteQuery(
      ["recentMovies"],
      ({ pageParam = 1 }) => getRecentMovies(pageParam),
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
