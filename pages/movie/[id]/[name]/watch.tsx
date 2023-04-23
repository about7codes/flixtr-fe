import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styles as classes } from "../../../../styles/watchMovie.styles";

function Watch() {
  const router = useRouter();
  const { id, name } = router.query;

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/movie/${id}/${name}`} className='backToInfo'>
          <ArrowBackIosNewIcon sx={classes.backIco} />
          <Typography sx={classes.backTxt}>Back to movie details</Typography>
        </Link>

        <Typography sx={{ textTransform: 'capitalize', paddingLeft: "10px", }}>Watching {typeof name === 'string' && name?.replaceAll('-', ' ')}</Typography>
      </Grid>

      <Grid item sx={classes.moviePlayer}>
        <iframe
          allowFullScreen
          id="watch-iframe"
          src={`${process.env.NEXT_PUBLIC_Player_URL}/movie?id=${id}`}
        ></iframe>
      </Grid>

    </Grid>
  );
}

export default Watch;
