import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Grid } from "@mui/material";

import { withCSR } from "../../HOC/withCSR";
import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { getRecentMovies } from "../../api/movies.api";
import { MovieQueryKey, useRecentMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";

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
    <>
      <CustomHead title="Most recent movies to watch." media_type={"movie"} />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Recent movies
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {recentMovies?.pages.map((page) =>
            page.results.map((movie) => (
              <Grid item key={movie.id}>
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
    </>
  );
}

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  try {
    // fetching recent movies detail
    await queryClient.prefetchInfiniteQuery(
      [MovieQueryKey.RecentMovies],
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
