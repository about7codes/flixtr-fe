import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import CustomHead from "../../components/CustomHead/CustomHead";
import { Box, Grid, Typography } from "@mui/material";
import Poster from "../../components/Poster/Poster";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  WatchlistData,
  WatchlistMediaType,
} from "../../types/watchlist.apiResponses";
import TvPoster from "../../components/TvPoster/TvPoster";
import { MovieResult, SeriesResult } from "../../types/apiResponses";
import { useWatchlist } from "../../hooks/watchlist.hooks";

type WatchlistProps = {};

function Watchlist({}: WatchlistProps) {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;
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
        {!watchlistData ? (
          <Box sx={classes.emptyList}>
            <Image
              width={128}
              height={128}
              src="/assets/alone.png"
              alt="empty"
            />
            <Typography variant="h4" sx={classes.headTxt}>
              Nothing added to your watchlist yet.
            </Typography>
          </Box>
        ) : (
          <Typography variant="h4" sx={classes.headTxt}>
            Your watchlist
          </Typography>
        )}
        <Grid container sx={classes.moviesContainer}>
          {watchlistData?.pages.map((page) =>
            page.results.map((media) => (
              <Grid item key={media._id}>
                {media.media_type === WatchlistMediaType.Movie ? (
                  <Poster
                    singleMovieData={
                      {
                        ...media,
                        id: media.tmdb_id,
                        title: media.media_name,
                      } as unknown as MovieResult
                    }
                  />
                ) : (
                  <TvPoster
                    singleShowData={
                      {
                        ...media,
                        id: media.tmdb_id,
                        name: media.media_name,
                        first_air_date: media.release_date,
                      } as unknown as SeriesResult
                    }
                  />
                )}
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

export default Watchlist;
