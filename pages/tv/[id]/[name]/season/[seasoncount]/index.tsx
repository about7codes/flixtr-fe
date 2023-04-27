import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { SeriesResult } from '../../../../../../types/apiResponses';
import { styles as classes } from '../../../../../../styles/SeasonCount.styles';
import TvTileSlider from '../../../../../../components/TvTileSlider/TvTileSlider';
import { getSeriesById, getSeriesSeasonById } from '../../../../../../api/series.api';
import { useSeriesById, useSeriesSeasonById } from '../../../../../../hooks/series.hooks';

type SeasonCountProps = {}

function SeasonCount() {
  const router = useRouter();
  const { id, name, seasoncount } = router.query;
  const [ep, setEp] = useState(1);

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } = useSeriesSeasonById(id, seasoncount);
  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  if (isSeasonLoading || isShowLoading) return (<LinearProgress />);

  const { recommendations, similar } = tvShowData as SeriesResult;

  console.log('tvShowData', tvShowData)
  // console.log('tvShowSeasonData', tvShowSeasonData)

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/tv/${id}/${name}`} className='backToInfo'>
          <Button variant="outlined" color='secondary' startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />} size='small'>
            Back to show details
          </Button>
        </Link>
        <Typography sx={{ textTransform: 'capitalize', paddingLeft: "10px", }}>Watching season {seasoncount} episode {ep} of {typeof name === 'string' && name?.replaceAll('-', ' ')}</Typography>
      </Grid>

      <Grid item sx={classes.moviePlayer}>
        <iframe
          allowFullScreen
          id="watch-iframe"
          src={`${process.env.NEXT_PUBLIC_Player_URL}/tv?id=${id}&s=${seasoncount ? seasoncount : 1}&e=${ep}`}
        ></iframe>
      </Grid>

      <Grid item sx={classes.episodeBtns}>
        {tvShowSeasonData?.episodes?.map(({ episode_number }) => (
          <Box sx={classes.episodeBtnBox} key={episode_number}>
            <Button
              variant='contained'
              sx={classes.episodeBtn}
              color={ep === episode_number ? 'primary' : 'secondary'}
              onClick={() => setEp(episode_number)}
            // disabled={ep === episode_number}
            >
              Ep {episode_number}
            </Button>
          </Box>
        ))}
      </Grid>

      {[
        { movieData: recommendations?.results, title: "Recommended for you" },
        { movieData: similar?.results, title: "Related shows" },
      ].map(({ movieData, title }) => (
        <Grid item sx={{ p: '20px 0', width: '100%' }} key={title}>
          <TvTileSlider title={title} seriesData={movieData} />
        </Grid>
      ))}

    </Grid>
  )
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id, seasoncount } = ctx.query;

  try {
    await queryClient.fetchQuery(['singleShowData', id], () => getSeriesById(id));
    await queryClient.fetchQuery(['tvShowSeasonData', id], () => getSeriesSeasonById(id, seasoncount));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default SeasonCount