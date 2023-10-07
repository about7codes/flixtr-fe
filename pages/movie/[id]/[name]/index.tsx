import React, { useEffect, useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import ImgRoll from "../../../../components/ImgRoll/ImgRoll";
import CastRoll from "../../../../components/CastRoll/CastRoll";
import ClipRoll from "../../../../components/ClipRoll/ClipRoll";
import TileSlider from "../../../../components/TileSider/TileSlider";
import { styles as classes } from "../../../../styles/movieInfo.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { useMovieById } from "../../../../hooks/movies.hooks";
import {
  formatImgSrc,
  formatMinutes,
  formatToUSD,
  toUrlFriendly,
} from "../../../../utils/utils";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import { scrollToTop } from "../../../../hooks/app.hooks";
import { signIn, useSession } from "next-auth/react";
import {
  useWatchlistById,
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "../../../../hooks/watchlist.hooks";
import { setNotify } from "../../../../redux/notifySlice";

// TODO: refactor this component page
function MovieInfo() {
  const { data: sessionData, status: loginStatus } = useSession();
  const isNotLogged = loginStatus === "unauthenticated";
  const dispatch = useDispatch();
  const router = useRouter();

  const [watchlistExists, setWatchlistExists] = useState(false);
  const { data: singleMovieData, isLoading } = useMovieById(router.query.id);

  const { mutateAsync: addWatchlist, isLoading: isLoadingPost } =
    useAddToWatchlist();
  const { mutateAsync: removeWatchlist, isLoading: isLoadingRemove } =
    useRemoveFromWatchlist();

  const {
    data: watchlistData,
    isLoading: isWatchlistLoad,
    isFetching,
    error,
  } = useWatchlistById(singleMovieData?.id);

  useEffect(() => {
    setWatchlistExists(false);
    if (watchlistData?.media) setWatchlistExists(true);
    if (error) setWatchlistExists(false);
  }, [singleMovieData?.id, isWatchlistLoad, isFetching, error]);

  if (isLoading) return <LinearProgress />;

  const {
    id,
    backdrop_path,
    poster_path,
    title,
    runtime,
    overview,
    homepage,
    genres,
    adult,
    status,
    release_date,
    revenue,
    budget,
    imdb_id,
    spoken_languages,
    images: { backdrops },
    credits: { cast },
    videos,
    recommendations,
    similar,
  } = singleMovieData as MovieResult;

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
        media_type: "movie",
        media_name: title,
        release_date: release_date,
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
      <CustomHead title={title} media_type={"movie"} />
      <Grid sx={classes.main}>
        <Grid item sx={classes.top}>
          <Box
            sx={classes.backgroundCover}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
            }}
          ></Box>
          <Box sx={classes.imageBox}>
            {/* <Image
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
              alt={title}
              /> */}

            <LazyLoadImage
              placeholderSrc="/assets/flixtr-placeholder.svg"
              src={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
              style={{
                objectFit: "cover",
                objectPosition: "top",
                width: "100%",
                height: "100%",
              }}
              effect="blur"
              alt={title}
            />
          </Box>
          <Box sx={classes.detailMid}>
            <Box>
              <Typography variant="h4" sx={classes.mediaTitle}>
                {title}
              </Typography>
              <Grid sx={classes.belowTitle}>
                <Grid item>Movie</Grid>
                <Grid item>{formatMinutes(runtime)}</Grid>
              </Grid>
            </Box>
            <Box sx={classes.mediaBtns}>
              {new Date() > new Date(release_date) && (
                <Link
                  href={`/movie/${id}/${toUrlFriendly(title)}/watch`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={classes.watchBtn}
                  >
                    Watch now
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
                Imdb:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {imdb_id ? (
                  <Link
                    href={`https://www.imdb.com/title/${imdb_id}`}
                    target="_blank"
                    className="bullet-link"
                  >
                    {`https://www.imdb.com/title/${imdb_id}`}
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
                {release_date}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Budget:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {formatToUSD(budget)}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Revenue:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {formatToUSD(revenue)}
              </Grid>
            </Grid>
            <Grid>
              <Grid item sx={classes.bulletHead}>
                Duration:{" "}
              </Grid>
              <Grid item sx={classes.bulletInfo}>
                {formatMinutes(runtime)}
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
          <ImgRoll imageList={backdrops} />
        </Grid>

        <Grid item>
          <ClipRoll clipList={videos.results} />
        </Grid>

        <Grid item>
          <CastRoll castList={cast} />
        </Grid>

        {[
          { movieData: recommendations?.results, title: "Our recommendations" },
          { movieData: similar?.results, title: "Something similar" },
        ].map(({ movieData, title }) => (
          <Grid
            item
            key={title}
            sx={{ p: "20px 0" }}
            onClick={() => scrollToTop()}
          >
            <TileSlider title={title} movieData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id } = ctx.query;

//   try {
//     // fetching single movie details
//     await queryClient.fetchQuery([MovieQueryKey.SingleMovieData, id], () =>
//       getMovieById(id)
//     );

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default MovieInfo;
