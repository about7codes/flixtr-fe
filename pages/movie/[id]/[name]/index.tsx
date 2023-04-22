import React from "react";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { MovieResult } from "../../../../types/apiResponses";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styles as classes } from "../../../../styles/movieInfo.styles";
import Link from "next/link";
import { formatMinutes, formatToUSD } from "../../../../utils/utils";

type MovieInfoProps = {
  singleMovieData: MovieResult;
};

function MovieInfo({ singleMovieData }: MovieInfoProps) {
  console.log('movieInfo: ', singleMovieData);
  const { backdrop_path, poster_path, title, runtime, overview, homepage, genres, adult, status, release_date, revenue, budget, imdb_id, spoken_languages } = singleMovieData;

  return (
    <Grid>
      <Grid item sx={classes.top}>
        <Box sx={classes.backgroundCover} style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}>
        </Box>
        <Box sx={classes.imageBox}>
          <Image
            width={220}
            height={330}
            className="poster-img"
            src={"https://image.tmdb.org/t/p/w780" + poster_path}
            alt={"poster"}
          />
        </Box>
        <Box sx={classes.detailMid}>
          <Box>
            <Typography variant="h4" sx={classes.mediaTitle}>{title}</Typography>
            <Grid sx={classes.belowTitle}>
              <Grid item>Movie</Grid>
              <Grid item>{formatMinutes(runtime)}</Grid>
            </Grid>
          </Box>
          <Box sx={classes.mediaBtns}>
            <Button variant="contained" color="secondary" sx={{ m: 1, marginLeft: 0 }}>
              Watch now
            </Button>
            {false ? (
              <Button variant="outlined" color="error">
                Remove from watchlist
              </Button>
            ) : (
              <Button variant="outlined" color="secondary">
                Add to watchlist
              </Button>
            )}
          </Box>
          <Box>
            <Typography variant="body1">{overview}</Typography>
          </Box>
        </Box>

        <Box sx={classes.detailLast}>
          <Grid>
            <Grid item sx={classes.bulletHead}>Homepage: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {homepage ? (
                <Link href={homepage} target="_blank" className="bullet-link">
                  {homepage}
                </Link>
              ) : 'N/A'}
            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Imdb: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {imdb_id ? (
                <Link href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" className="bullet-link">
                  {`https://www.imdb.com/title/${imdb_id}`}
                </Link>
              ) : 'N/A'}

            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Genres: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {genres?.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  {genre.name}
                  {index < genres.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Adult: </Grid>
            <Grid item sx={classes.bulletInfo}>{adult ? 'Yes' : 'No'}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Status: </Grid>
            <Grid item sx={classes.bulletInfo}>{status}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Release date: </Grid>
            <Grid item sx={classes.bulletInfo}>{release_date}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Budget: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatToUSD(budget)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Revenue: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatToUSD(revenue)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Duration: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatMinutes(runtime)}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Language: </Grid>
            <Grid item sx={classes.bulletInfo}>
              {spoken_languages?.map((lang, index) => (
                <React.Fragment key={lang.english_name}>
                  {lang.english_name}
                  {index < spoken_languages.length - 1 && ', '}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item>

      </Grid>
    </Grid>
  );

}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  try {
    // fetching single movie details
    const res = await fetch(`https://api.themoviedb.org/3/movie/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`);
    const data = await res.json();

    // failure if 'success' property exists
    if (data.hasOwnProperty('success')) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        singleMovieData: data
      }
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }

}

export default MovieInfo;
