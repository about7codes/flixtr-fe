import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import {
  Button,
  ButtonGroup,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import TileSlider from "../../../../components/TileSider/TileSlider";
import { styles as classes } from "../../../../styles/watchMovie.styles";
import { MovieResult } from "../../../../types/apiResponses";
import { getMovieById } from "../../../../api/movies.api";
import { MovieQueryKey, useMovieById } from "../../../../hooks/movies.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import { convertToNumber } from "../../../../utils/utils";

type WatchProps = {};

function Watch() {
  const router = useRouter();
  const { id, name, p } = router.query;
  const [player, setPlayer] = useState<1 | 2 | 3>(1);
  const { data: singleMovieData, isLoading } = useMovieById(id);

  useEffect(() => {
    const pNum = convertToNumber(p);

    if (pNum) {
      if (pNum === 1) setPlayer(pNum);
      if (pNum === 2) setPlayer(pNum);
      if (pNum === 3) setPlayer(pNum);
    }
  }, []);

  if (isLoading) return <LinearProgress />;

  const { recommendations, similar, title } = singleMovieData as MovieResult;

  const changePlayer = (playerId: typeof player) => {
    setPlayer((prevPlayerId) => {
      if (prevPlayerId === playerId) return prevPlayerId;

      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: { p: playerId },
        },
        undefined,
        {
          shallow: true,
        }
      );

      return playerId;
    });
  };

  return (
    <>
      <CustomHead title={"Watching " + title} media_type={"movie"} />
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
          <ButtonGroup
            variant="contained"
            aria-label="Media player list"
            sx={{
              width: "100%",
              mt: "15px",
            }}
          >
            <Button
              fullWidth
              color={player === 1 ? "secondary" : "primary"}
              onClick={() => changePlayer(1)}
            >
              Player #1
            </Button>
            <Button
              fullWidth
              color={player === 2 ? "secondary" : "primary"}
              onClick={() => changePlayer(2)}
            >
              Player #2
            </Button>
            <Button
              fullWidth
              color={player === 3 ? "secondary" : "primary"}
              onClick={() => changePlayer(3)}
            >
              Player #3
            </Button>
          </ButtonGroup>

          {/* <iframe
            allowFullScreen
            id="watch-iframe"
            src={`${process.env.NEXT_PUBLIC_Player_URL}/movie?id=${id}`}
          ></iframe> */}

          {player === 1 && (
            <iframe
              allowFullScreen
              id="watch-iframe1"
              src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/color-ADDC35`}
            ></iframe>
          )}

          {player === 2 && (
            <iframe
              allowFullScreen
              id="watch-iframe2"
              src={`${process.env.NEXT_PUBLIC_Player_URL_SE}video_id=${id}`}
            ></iframe>
          )}

          {player === 3 && (
            <iframe
              allowFullScreen
              id="watch-iframe3"
              src={`${process.env.NEXT_PUBLIC_Player_URL_AE}/movie/tmdb/${id}`}
            ></iframe>
          )}
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

export default Watch;
