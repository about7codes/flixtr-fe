import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styles as classes } from "../../../../styles/watchMovie.styles";

function Watch() {
  const router = useRouter();
  const { id, name } = router.query;

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/movie/${id}/${name}`} className='backToInfo'>
          <Button variant="outlined" color='secondary' startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />} size='small'>
            Back to movie details
          </Button>
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
