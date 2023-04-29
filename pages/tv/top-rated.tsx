import { useInfiniteQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";
import { withCSR } from "../../HOC/withCSR";
import { SeriesData } from "../../types/apiResponses";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import TvPoster from "../../components/TvPoster/TvPoster";
import { styles as classes } from "../../styles/styles";

type TopRatedProps = {};

function TopRated({ }: TopRatedProps) {
  const {
    data: topSeries,
    isLoading,
    fetchNextPage,
    isFetching,
  } = useTopSeries();
  // console.log('TopSeries: ', topSeries)

  if (isLoading) return <Loader />;

  return (
    <Box sx={classes.pageContainer}>
      <Typography variant="h4" sx={classes.headTxt}>
        Top rated Tv Shows
      </Typography>
      <Grid container sx={classes.moviesContainer}>
        {topSeries?.pages.map((page) =>
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

export const getTopSeries = async (pageNum: number): Promise<SeriesData> => {
  try {
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
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

export const useTopSeries = () => {
  return useInfiniteQuery(
    ["topSeries"],
    ({ pageParam = 1 }) => getTopSeries(pageParam),
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
    // fetching top rated series detail
    await queryClient.prefetchInfiniteQuery(
      ["topSeries"],
      ({ pageParam = 1 }) => getTopSeries(pageParam),
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

export default TopRated;
