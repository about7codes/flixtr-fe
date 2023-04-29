import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import TileSlider from "../../../../components/TileSider/TileSlider";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { getMovieById } from "../../../../api/movies.api";
import { useMovieById } from "../../../../hooks/movies.hooks";

type WatchProps = {};

function Watch() {
  const router = useRouter();
  const { id, name } = router.query;
  const { data: singleMovieData, isLoading } = useMovieById(id);

  if (isLoading) return (<LinearProgress />);

  const { recommendations, similar } = singleMovieData as MovieResult;

  return (
    <Grid container>
      <Grid item sx={classes.watchHead}>
        <Link href={`/movie/${id}/${name}`} className="backToInfo">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />}
            size="small"
          >
            Back to movie details
          </Button>
        </Link>

        <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
          Watching {typeof name === "string" && name?.replaceAll("-", " ")}
        </Typography>
      </Grid>

      <Grid item sx={classes.moviePlayer}>
        <iframe
          allowFullScreen
          id="watch-iframe"
          src={`${process.env.NEXT_PUBLIC_Player_URL}/movie?id=${id}`}
        ></iframe>
      </Grid>

      {[
        { movieData: recommendations?.results, title: "Recommended for you" },
        { movieData: similar?.results, title: "Related movies" },
      ].map(({ movieData, title }) => (
        <Grid item sx={{ p: "20px 0", width: "100%" }} key={title}>
          <TileSlider title={title} movieData={movieData} />
        </Grid>
      ))}

    </Grid>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id } = ctx.query;

  try {
    // fetching single movie details
    await queryClient.fetchQuery(['singleMovieData', id], () => getMovieById(id));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      },
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default Watch;
