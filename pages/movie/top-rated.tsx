import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography, Grid } from "@mui/material";

import { styles as classes } from "../../styles/styles";
import Poster from "../../components/Poster/Poster";
import Loader from "../../components/Loader/Loader";
import { useTopMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";

function TopRated() {
  const {
    data: topMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useTopMovies();
  // console.log('topMovies: ', topMovies)

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Top rated movies to watch." media_type={"movie"} />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Top rated movies
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {topMovies?.pages.map((page) =>
            page.results.map((movie) => (
              <Grid item key={movie.id}>
                <Poster singleMovieData={movie} />
              </Grid>
            ))
          )}
        </Grid>
        {hasNextPage && (
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
        )}
      </Box>
    </>
  );
}

// Commented to Remove SSR
// export const getServerSideProps = withCSR(async () => {
//   const queryClient = new QueryClient();

//   try {
//     // fetching top rated movies detail
//     await queryClient.prefetchInfiniteQuery(
//       [MovieQueryKey.TopMovies],
//       ({ pageParam = 1 }) => getTopMovies(pageParam),
//       {
//         getNextPageParam: (lastPage) => {
//           return lastPage.page < lastPage.total_pages
//             ? lastPage.page + 1
//             : undefined;
//         },
//       }
//     );

//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// });

export default TopRated;
