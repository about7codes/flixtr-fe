import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { useMovieById } from "../../../../hooks/movies.hooks";
import CustomHead from "../../../../components/CustomHead/CustomHead";
import { convertToNumber, disableAds } from "../../../../utils/utils";
import Comments from "../../../../components/Comments/Comments";
import {
  topMovieIframes,
  bottomMovieIframes,
} from "../../../../utils/iframeUtils";

function Watch() {
  const router = useRouter();
  const { id, name, p } = router.query;
  const [player, setPlayer] = useState<1 | 2 | 3>(1);

  const playerUrls = useMemo(
    () => ({
      1: `${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/color-ADDC35`,
      2: `${process.env.NEXT_PUBLIC_Player_URL_SE}video_id=${id}`,
      3: `${process.env.NEXT_PUBLIC_Player_URL_AE}/movie/${id}?color=addc35`,
    }),
    [id]
  );

  const { data: singleMovieData, isLoading } = useMovieById(id);

  useEffect(() => {
    const pNum = convertToNumber(p);

    if (pNum) {
      if (pNum === 1) setPlayer(pNum);
      if (pNum === 2) setPlayer(pNum);
      if (pNum === 3) setPlayer(pNum);
    }
  }, [isLoading]);

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

        {!disableAds && (
          <Grid sx={classes.con}>
            {topMovieIframes.map(({ className, idzone, size }) => (
              <iframe
                key={idzone}
                className={className}
                src={`//a.magsrv.com/iframe.php?idzone=${idzone}&size=${size}`}
                width={size.split("x")[0]}
                height={size.split("x")[1]}
                scrolling="no"
                marginWidth={0}
                marginHeight={0}
                frameBorder="0"
              ></iframe>
            ))}
          </Grid>
        )}

        <Grid item sx={classes.moviePlayer}>
          <ButtonGroup
            variant="contained"
            aria-label="Media player list"
            sx={classes.btnGroup}
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

          <iframe
            allowFullScreen
            id={`watch-iframe${player}`}
            src={playerUrls[player]}
          />

          {/* 
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
              src={`${process.env.NEXT_PUBLIC_Player_URL_AE}/movie/${id}?color=addc35`}
            ></iframe>
          )}
           */}
        </Grid>

        {!disableAds && (
          <Grid sx={classes.con}>
            {bottomMovieIframes.map(({ className, idzone, size }) => (
              <iframe
                key={idzone}
                className={className}
                src={`//a.magsrv.com/iframe.php?idzone=${idzone}&size=${size}`}
                width={size.split("x")[0]}
                height={size.split("x")[1]}
                scrolling="no"
                marginWidth={0}
                marginHeight={0}
                frameBorder="0"
              ></iframe>
            ))}
          </Grid>
        )}

        <Comments media_type="movie" />

        {[
          { movieData: recommendations?.results, title: "Recommended for you" },
          { movieData: similar?.results, title: "Related movies" },
        ].map(({ movieData, title }) => (
          <Grid item sx={classes.mustWatch} key={title}>
            <TileSlider title={title} movieData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id } = ctx.query;

//   try {
//     // fetching single movie details
//     await queryClient.fetchQuery([MovieQueryKey.SingleMovieData, id], () =>
//       getMovieById(id)
//     );

//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default Watch;
