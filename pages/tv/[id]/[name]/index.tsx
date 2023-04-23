import React from 'react'
import Link from 'next/link';
import Image from "next/image";
import { GetServerSidePropsContext } from 'next';
import { Grid, Box, Typography, Button } from '@mui/material';
import { SeriesResult } from '../../../../types/apiResponses';
import { styles as classes } from '../../../../styles/tvShowInfo.styles';
import ImgRoll from '../../../../components/ImgRoll/ImgRoll';
import ClipRoll from '../../../../components/ClipRoll/ClipRoll';
import CastRoll from '../../../../components/CastRoll/CastRoll';
import TvTileSlider from '../../../../components/TvTileSlider/TvTileSlider';
import { formatImgSrc, formatMinutes, toUrlFriendly } from '../../../../utils/utils';
import SeasonRoll from '../../../../components/SeasonRoll/SeasonRoll';


type TvShowInfoProps = {
  singleShowData: SeriesResult;
}

function TvShowInfo({ singleShowData }: TvShowInfoProps) {
  console.log('tvInfo: ', singleShowData);

  const { id, backdrop_path, poster_path, name,
    episode_run_time, overview, homepage, genres, adult,
    status, first_air_date, number_of_episodes, number_of_seasons,
    spoken_languages, images: { backdrops }, seasons,
    credits: { cast }, videos, recommendations, similar
  } = singleShowData;

  return (
    <Grid>
      <Grid item sx={classes.top}>
        <Box sx={classes.backgroundCover} style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}>
        </Box>
        <Box sx={classes.imageBox}>
          <Image
            fill
            className="poster-img"
            placeholder="blur"
            style={poster_path ? { objectFit: 'cover', objectPosition: 'top' } : { objectFit: 'contain', objectPosition: 'center' }}
            blurDataURL={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            src={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            sizes={formatImgSrc("https://image.tmdb.org/t/p/w780", poster_path)}
            alt={name}
          />
        </Box>
        <Box sx={classes.detailMid}>
          <Box>
            <Typography variant="h4" sx={classes.mediaTitle}>{name}</Typography>
            <Grid sx={classes.belowTitle}>
              <Grid item>Series</Grid>
              <Grid item>{formatMinutes(episode_run_time[0])}</Grid>
            </Grid>
          </Box>
          <Box sx={classes.mediaBtns}>
            {new Date() > new Date(first_air_date) && (
              <Link href={`/movie/${id}/${toUrlFriendly(name)}/watch`}>
                <Button variant="contained" color="secondary" sx={{ m: 1, marginLeft: 0 }}>
                  Watch episode 1
                </Button>
              </Link>
            )}

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
            <Grid item sx={classes.bulletInfo}>{first_air_date}</Grid>
          </Grid>

          <Grid>
            <Grid item sx={classes.bulletHead}>Duration: </Grid>
            <Grid item sx={classes.bulletInfo}>{formatMinutes(episode_run_time[0])}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Total seasons: </Grid>
            <Grid item sx={classes.bulletInfo}>{number_of_seasons}</Grid>
          </Grid>
          <Grid>
            <Grid item sx={classes.bulletHead}>Total episodes: </Grid>
            <Grid item sx={classes.bulletInfo}>{number_of_episodes}</Grid>
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

      <Grid item sx={{ p: '20px 0' }}>
        <TvTileSlider title='Must watch shows' seriesData={recommendations.results} />
      </Grid>

      <Grid item sx={{ p: '20px 0' }}>
        <TvTileSlider title='Shows you may like' seriesData={similar.results} />
      </Grid>

    </Grid>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    // fetching single movie details
    const res = await fetch(`https://api.themoviedb.org/3/tv/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`);
    const data = await res.json();

    // failure if 'success' property exists
    if (data.hasOwnProperty('success')) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        singleShowData: data
      }
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }
}

export default TvShowInfo;