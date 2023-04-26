import React from 'react'
import Link from 'next/link';
import Image from "next/image";
import { GetServerSidePropsContext } from 'next';
import { Grid, Box, Typography, Button, LinearProgress } from '@mui/material';
import { SeriesResult } from '../../../../types/apiResponses';
import { styles as classes } from '../../../../styles/tvShowInfo.styles';
import ImgRoll from '../../../../components/ImgRoll/ImgRoll';
import ClipRoll from '../../../../components/ClipRoll/ClipRoll';
import CastRoll from '../../../../components/CastRoll/CastRoll';
import TvTileSlider from '../../../../components/TvTileSlider/TvTileSlider';
import { formatImgSrc, formatMinutes, toUrlFriendly } from '../../../../utils/utils';
import SeasonRoll from '../../../../components/SeasonRoll/SeasonRoll';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';


type TvShowInfoProps = {}

function TvShowInfo() {
  const router = useRouter();
  const { data: singleShowData, isLoading } = useSeriesById(router.query.id);
  // console.log('tvInfo: ', singleShowData);

  if (isLoading) return (<LinearProgress />);

  const { id, backdrop_path, poster_path, name,
    episode_run_time, overview, homepage, genres, adult,
    status, first_air_date, number_of_episodes, number_of_seasons,
    spoken_languages, images: { backdrops }, seasons,
    credits: { cast }, videos, recommendations, similar
  } = singleShowData as SeriesResult;

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
              <Link href={`/tv/${id}/${toUrlFriendly(name)}/season/1`}>
                <Button variant="contained" color="secondary" sx={classes.watchBtn}>
                  Watch episode 1
                </Button>
              </Link>
            )}

            {false ? (
              <Button variant="outlined" color="error" sx={classes.watchlistBtn}>
                Remove from watchlist
              </Button>
            ) : (
              <Button variant="outlined" color="secondary" sx={classes.watchlistBtn}>
                Add to watchlist
              </Button>
            )}
          </Box>
          <Box>
            <Typography variant="body1" sx={classes.overview}>{overview}</Typography>
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

      {[
        { movieData: recommendations?.results, title: "Must watch shows" },
        { movieData: similar?.results, title: "Shows you may like" },
      ].map(({ movieData, title }) => (
        <Grid item sx={{ p: '20px 0' }} key={title}>
          <TvTileSlider title={title} seriesData={movieData} />
        </Grid>
      ))}

    </Grid>
  )
}

export const getSeriesById = async (seriesId?: string | string[]): Promise<SeriesResult> => {
  try {
    const showRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`
    );
    const showData: SeriesResult = await showRes.json();

    // failure if 'success' property exists
    if (showData.hasOwnProperty('success')) throw new Error('Api call failed');

    return showData;

  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
}

export const useSeriesById = (seriesId?: string | string[]) => {
  return useQuery(['singleShowData', seriesId], () => getSeriesById(seriesId));
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id } = ctx.query;

  try {
    // fetching single movie details
    await queryClient.fetchQuery(['singleShowData', id], () => getSeriesById(id));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
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