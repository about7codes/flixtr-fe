import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { withCSR } from "../../HOC/withCSR";
import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { getPopularMovies } from "../../api/movies.api";
import { usePopularMovies } from "../../hooks/movies.hooks";

type PopularProps = {};

function Popular() {
  const {
    data: popularMovies,
    isLoading,
    fetchNextPage,
    isFetching,
  } = usePopularMovies();
  // console.log('popularMovies: ', popularMovies)

  if (isLoading) return <Loader />;

  return (
    <Box sx={classes.pageContainer}>
      <Typography variant="h4" sx={classes.headTxt}>
        Popular movies
      </Typography>
      <Grid container sx={classes.moviesContainer}>
        {popularMovies?.pages.map((page) =>
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
  );
}

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  try {
    // fetching popular movies detail
    await queryClient.prefetchInfiniteQuery(
      ["popularMovies"],
      ({ pageParam = 1 }) => getPopularMovies(pageParam),
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
