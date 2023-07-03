import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Grid, Box, Typography, Button, LinearProgress } from "@mui/material";

import { SeriesResult } from "../../../../types/apiResponses";
import { styles as classes } from "../../../../styles/tvShowInfo.styles";
import ImgRoll from "../../../../components/ImgRoll/ImgRoll";
import ClipRoll from "../../../../components/ClipRoll/ClipRoll";
import CastRoll from "../../../../components/CastRoll/CastRoll";
import TvTileSlider from "../../../../components/TvTileSlider/TvTileSlider";
import SeasonRoll from "../../../../components/SeasonRoll/SeasonRoll";
import { getSeriesById } from "../../../../api/series.api";
import { SeriesQueryKey, useSeriesById } from "../../../../hooks/series.hooks";
import {
  blurData,
  formatImgSrc,
  formatMinutes,
  toUrlFriendly,
} from "../../../../utils/utils";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import { scrollToTop } from "../../../../hooks/app.hooks";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlistById,
} from "../../../../hooks/watchlist.hooks";
import { LoadingButton } from "@mui/lab";
import { signIn, useSession } from "next-auth/react";
import { setNotify } from "../../../../redux/notifySlice";
import { useDispatch } from "react-redux";

type TvShowInfoProps = {};

function TvShowInfo() {
  const { data: sessionData, status: loginStatus } = useSession();
  const isNotLogged = loginStatus === "unauthenticated";
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: singleShowData, isLoading } = useSeriesById(router.query.id);
  const [watchlistExists, setWatchlistExists] = useState(false);

  const { mutateAsync: addWatchlist, isLoading: isLoadingPost } =
    useAddToWatchlist();
  const { mutateAsync: removeWatchlist, isLoading: isLoadingRemove } =
    useRemoveFromWatchlist();

  const {
    data: watchlistData,
    isLoading: isWatchlistLoad,
    isFetching,
    error,
  } = useWatchlistById(singleShowData?.id);

  useEffect(() => {
    console.log("watchlistData: ", watchlistData);
    setWatchlistExists(false);
    if (watchlistData?.media) setWatchlistExists(true);
    if (error) setWatchlistExists(false);
  }, [singleShowData?.id, isWatchlistLoad, isFetching, error]);

  if (isLoading) return <LinearProgress />;

  const {
    id,
    backdrop_path,
    poster_path,
    name,
    episode_run_time,
    overview,
    homepage,
    genres,
    adult,
    status,
    first_air_date,
    number_of_episodes,
    number_of_seasons,
    spoken_languages,
    images: { backdrops },
    seasons,
    credits: { cast },
    videos,
    recommendations,
    similar,
  } = singleShowData as SeriesResult;

  const handleAddToWatchlist = async () => {
    try {
      if (isNotLogged) {
        dispatch(
          setNotify({
            isOpen: true,
            message: "Login to add to your watchlist.",
            type: "warning",
          })
        );
        return signIn();
      }

      const data = await addWatchlist({
        token: sessionData?.user.authToken ?? "",
        tmdb_id: id,
        media_type: "tv",
        media_name: name,
        release_date: first_air_date,
        poster_path: poster_path,
      });

      setWatchlistExists(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveWatchlist = async () => {
    try {
      const data = await removeWatchlist({
        token: sessionData?.user.authToken ?? "",
        tmdbId: id,
      });

      setWatchlistExists(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CustomHead title={name} media_type="tv" />
      <Grid>
        <Grid item sx={classes.top}>
          <Box
            sx={classes.backgroundCover}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
            }}
          ></Box>
          <Box sx={classes.imageBox}>
            <Image
              fill
              className="poster-img"
              placeholder="blur"
              style={
                poster_path
                  ? { objectFit: "cover", objectPosition: "top" }
                  : { objectFit: "contain", objectPosition: "center" }
              }
              blurDataURL={blurData}
              src={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
              sizes={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                poster_path
              )}
              alt={name}
            />
          </Box>
          <Box sx={classes.detailMid}>
            <Box>
              <Typography variant="h4" sx={classes.mediaTitle}>
                {name}
              </Typography>
              <Grid sx={classes.belowTitle}>
                <Grid item>Series</Grid>
                <Grid item>{formatMinutes(episode_run_time[0])}</Grid>
              </Grid>
            </Box>
            <Box sx={classes.mediaBtns}>
              {new Date() > new Date(first_air_date) && (
                <Link
                  href={`/tv/${id}/${toUrlFriendly(name)}/season/1`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={classes.watchBtn}
                  >
                    Watch episode 1
                  </Button>
                </Link>
              )}

              {watchlistExists ? (
                <LoadingButton
                  loading={isLoadingRemove}
                  variant="outlined"
                  color="error"
                  sx={classes.watchlistBtn}
                  onClick={handleRemoveWatchlist}
                >
                  Remove from watchlist
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={isLoadingPost}
                  variant="outlined"
                  color="secondary"
                  sx={classes.watchlistBtn}
                  onClick={handleAddToWatchlist}
                >
                  Add to watchlist
                </LoadingButton>
              )}
            </Box>
            <Box>
              <Typography variant="body1" sx={classes.overview}>
                {overview}
              </Typography>
            </Box>
          </Box>

          <Box sx={classes.detailLast}>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Homepage:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {homepage ? (
                  <Link href={homepage} target="_blank" className="bullet-link">
                    {homepage}
                  </Link>
                ) : (
                  "N/A"
                )}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Genres:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {genres?.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    {genre.name}
                    {index < genres.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Adult:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {adult ? "Yes" : "No"}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Status:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {status}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Release date:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {first_air_date}
              </Grid>
            </Grid>

            <Grid>
              <Grid item sx={classes.bulletHead}>
                Duration:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {formatMinutes(episode_run_time[0])}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Total seasons:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {number_of_seasons}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Total episodes:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {number_of_episodes}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Language:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {spoken_languages?.map((lang, index) => (
                  <React.Fragment key={lang.english_name}>
                    {lang.english_name}
                    {index < spoken_languages.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item>
          <SeasonRoll seasonList={seasons} showId={id} showName={name} />
        </Grid>

        <Grid item>
          <ImgRoll imageList={backdrops} />
        </Grid>

        <Grid item>
          <ClipRoll clipList={videos.results} />
        </Grid>

        <Grid item>
          <CastRoll castList={cast} />
        </Grid>

        {[
          { seriesData: recommendations?.results, title: "Must watch shows" },
          { seriesData: similar?.results, title: "Shows you may like" },
        ].map(({ seriesData, title }) => (
          <Grid
            item
            key={title}
            sx={{ p: "20px 0" }}
            onClick={() => scrollToTop()}
          >
            <TvTileSlider title={title} seriesData={seriesData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id } = ctx.query;

  try {
    // fetching single movie details
    await queryClient.fetchQuery([SeriesQueryKey.SingleShowData, id], () =>
      getSeriesById(id)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default TvShowInfo;
