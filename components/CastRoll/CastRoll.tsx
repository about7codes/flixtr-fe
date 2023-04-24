import React from 'react';
import Image from "next/image";
import { Box, Grid, Typography } from '@mui/material';
import { styles as classes } from './castRoll.styles';
import { Cast } from '../../types/apiResponses';
import { formatImgSrc } from '../../utils/utils';

type CastRollProps = {
  castList: Cast[]
}

const CastRoll = ({ castList }: CastRollProps) => {
  if (!castList?.length) return null;

  return (
    <Box>
      <Typography variant='h5' sx={classes.headTxt}>Casts</Typography>
      <Grid container sx={classes.castRoll}>

        {castList.map((cast, index) => (
          <Grid item sx={classes.castItem} key={index}>
            <Grid sx={classes.castImg}>
              <Image
                fill
                placeholder="blur"
                blurDataURL={formatImgSrc('https://image.tmdb.org/t/p/w138_and_h175_face/', cast.profile_path)}
                src={formatImgSrc('https://image.tmdb.org/t/p/w138_and_h175_face/', cast.profile_path)}
                sizes={formatImgSrc('https://image.tmdb.org/t/p/w138_and_h175_face/', cast.profile_path)}
                style={{ objectFit: 'cover' }}
                alt='backdrops'
              />
            </Grid>
            <Grid sx={classes.castNames}>
              <Typography sx={classes.realName}>{cast.name}</Typography>
              <Typography sx={classes.ogName}>{cast.character}</Typography>
            </Grid>
          </Grid>
        ))}

      </Grid>
    </Box>
  )
}

export default CastRoll;