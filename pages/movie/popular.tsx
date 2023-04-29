import React from "react";
import {
  GetServerSidePropsContext,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Box, Grid, LinearProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Poster from "../../components/Poster/Poster";
import { MovieData } from "../../types/apiResponses";
import { styles as classes } from "../../styles/styles";

type PopularProps = {};

function Popular() {
  const {
    data: popularMovies,
    isLoading,
    fetchNextPage,
    isFetching,
  } = usePopularMovies();
  // console.log('popularMovies: ', popularMovies)

  if (isLoading)
    return (
      <LinearProgress
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}
      />
    );

  const loadMore = (): void => {
    fetchNextPage();
  };

  return (
    <Box sx={classes.pageContainer}>
      <Grid container sx={classes.moviesContainer}>
        {popularMovies?.pages.map((page) =>
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

const getPopularMovies = async (pageNum: number): Promise<MovieData> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return movieData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

const usePopularMovies = () => {
  return useInfiniteQuery(
    ["popularMovies"],
    ({ pageParam = 1 }) => getPopularMovies(pageParam),
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

// Bypass getServerSideProps() call to api if page route change is by nextjs
export const withCSR =
  (next: NextApiHandler) => async (ctx: GetServerSidePropsContext) => {
    // check is it a client side navigation
    const isCSR = ctx.req.url?.startsWith("/_next");

    if (isCSR) {
      return {
        props: {},
      };
    }

    return next?.(ctx.req as NextApiRequest, ctx.res as NextApiResponse);
  };

export const getServerSideProps = withCSR(async () => {
  console.log("CALLING serverside");
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
