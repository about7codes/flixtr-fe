import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";

import ImgRoll from "../../../../components/ImgRoll/ImgRoll";
import CastRoll from "../../../../components/CastRoll/CastRoll";
import ClipRoll from "../../../../components/ClipRoll/ClipRoll";
import TileSlider from "../../../../components/TileSider/TileSlider";
import { styles as classes } from "../../../../styles/movieInfo.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { getMovieById } from "../../../../api/movies.api";
import { MovieQueryKey, useMovieById } from "../../../../hooks/movies.hooks";
import {
  formatImgSrc,
  formatMinutes,
  formatToUSD,
  toUrlFriendly,
} from "../../../../utils/utils";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import { scrollToTop } from "../../../../hooks/app.hooks";

type MovieInfoProps = {};

function MovieInfo() {
  const router = useRouter();
  const { data: singleMovieData, isLoading } = useMovieById(router.query.id);
  // console.log('movieInfo: ', singleMovieData);

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

  return (
    <>
      <CustomHead title={title} media_type={"movie"} />
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
              blurDataURL="/assets/abstract-bg.png"
              src={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
              sizes={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                poster_path
              )}
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

              {false ? (
                <Button
                  variant="outlined"
                  color="error"
                  sx={classes.watchlistBtn}
                >
                  Remove from watchlist
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={classes.watchlistBtn}
                >
                  Add to watchlist
                </Button>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id } = ctx.query;

  try {
    // fetching single movie details
    await queryClient.fetchQuery([MovieQueryKey.SingleMovieData, id], () =>
      getMovieById(id)
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

export default MovieInfo;
