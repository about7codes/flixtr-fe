import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import CustomHead from "../../components/CustomHead/CustomHead";
import { Box, Grid, Typography } from "@mui/material";
import Poster from "../../components/Poster/Poster";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

type WatchlistProps = {};

function Watchlist({}: WatchlistProps) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;
  console.log("status:", status);
  const isNotLogged = status === "unauthenticated";

  useEffect(() => {
    if (isNotLogged) {
      console.log("redirect to /login");
      signIn();
      return;
    }
  }, [isNotLogged]);

  const {
    data: watchlistData,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useWatchlist();
  // console.log("watchlistData: ", watchlistData);

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Your watchlist." media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Your watchlist
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {watchlistData?.pages.map((page) =>
            page.results.map((movie: any) => (
              <Grid item key={movie._id}>
                <Poster
                  singleMovieData={{
                    ...movie,
                    id: movie.tmdb_id,
                    title: movie.media_name,
                  }}
                />
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

export const getWatchlist = async (token: string, pageNum: number) => {
  try {
    const watchlistRes = await fetch(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/watchlist/all?page=${pageNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const watchlistData = await watchlistRes.json();

    if (watchlistData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");
    console.log(watchlistData);

    return watchlistData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
};

// export const useWatchlist = () => {
//   const { data: sessionData } = useSession();
//   const token = sessionData?.user.authToken;

//   return useQuery(["watchlist", token], () => getWatchlist(token ?? ""), {
//     enabled: !!token,
//   });
// };

export const useWatchlist = () => {
  const { data: sessionData } = useSession();
  const token = sessionData?.user.authToken;

  return useInfiniteQuery(
    ["watchlist"],
    ({ pageParam = 1 }) => getWatchlist(token ?? "", pageParam),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
      enabled: !!token,
    }
  );
};

export default Watchlist;
