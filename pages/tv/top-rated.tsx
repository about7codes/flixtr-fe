import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";

import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";
import { useTopSeries } from "../../hooks/series.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { IConutry } from "../../utils/filterUtils";
import Filter from "../../components/Filter/Filter";

function TopRated() {
  const [country, setCountry] = useState<IConutry | undefined>();
  const [releaseYear, setReleaseYear] = useState<number | "">("");

  const {
    data: topSeries,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useTopSeries(releaseYear, country);
  // console.log("TopSeries: ", topSeries);

  // if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Top rated TV shows to watch." media_type="tv" />
      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Top rated Tv Shows
        </Typography>

        <Filter
          country={country}
          setCountry={setCountry}
          releaseYear={releaseYear}
          setReleaseYear={setReleaseYear}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container sx={classes.moviesContainer}>
              {topSeries?.pages.map((page) =>
                page.results.map((show) => (
                  <Grid item key={show.id}>
                    <TvPoster singleShowData={show} />
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
          </>
        )}
      </Box>
    </>
  );
}

// Commented to Remove SSR
// export const getServerSideProps = withCSR(async () => {
//   const queryClient = new QueryClient();

//   try {
//     // fetching top rated series detail
//     await queryClient.prefetchInfiniteQuery(
//       [SeriesQueryKey.TopSeries],
//       ({ pageParam = 1 }) => getTopSeries(pageParam),
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
