import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import TileSlider from "../../../../components/TileSider/TileSlider";
import { GetServerSidePropsContext } from "next";
import { MovieResult } from "../../../../types/apiResponses";

type WatchProps = {
  singleMovieData: MovieResult;
};

function Watch({ singleMovieData }: WatchProps) {
  const router = useRouter();
  const { id, name } = router.query;
  const { recommendations, similar } = singleMovieData;

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
  try {
    // fetching single movie details
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`
    );
    const data = await res.json();

    // failure if 'success' property exists
    if (data.hasOwnProperty("success")) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        singleMovieData: data,
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
