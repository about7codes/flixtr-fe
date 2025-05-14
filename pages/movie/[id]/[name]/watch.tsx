import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FitScreenIcon from "@mui/icons-material/FitScreen";

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
import ShareButtons from "../../../../components/ShareButtons/ShareButtons";

function Watch() {
  const router = useRouter();
  const { id, name, p } = router.query;
  const [player, setPlayer] = useState<1 | 2 | 3>(1);
  const [shareUrl, setShareUrl] = useState("");

  const playerUrls = useMemo(
    () => ({
      1: `${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/color-ADDC35`,
      2: `${process.env.NEXT_PUBLIC_Player_URL_SE}/movie/${id}?adFree=true`,
      3: `${process.env.NEXT_PUBLIC_Player_URL_AE}/movie/${id}?color=addc35`,
    }),
    [id]
  );

  const { data: singleMovieData, isLoading } = useMovieById(id);

  const scrollToPlayer = () => {
    const el = document.getElementById("players");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [p]);

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

          <Button
            aria-label="Center video"
            title="Center video"
            color="secondary"
            variant="contained"
            onClick={scrollToPlayer}
            sx={{ p: "3px 0", m: "0 0 10px 10px" }}
          >
            <FitScreenIcon />
          </Button>

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

        <Alert severity="info" sx={classes.alertBar} color="success">
          Video not playing? Please switch to another player.
        </Alert>

        <Grid item sx={classes.moviePlayer} id="players">
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

          {player === 1 && (
            <iframe
              allowFullScreen
              id="watch-iframe1"
              src={playerUrls[player]}
            ></iframe>
          )}

          {player === 2 && (
            <iframe
              allowFullScreen
              id="watch-iframe2"
              src={playerUrls[player]}
            ></iframe>
          )}

          {player === 3 && (
            <iframe
              allowFullScreen
              id="watch-iframe3"
              src={playerUrls[player]}
            ></iframe>
          )}
        </Grid>

        <Button
          aria-label="Center video"
          title="Center video"
          color="secondary"
          variant="contained"
          onClick={scrollToPlayer}
          sx={{ m: "5px 18px 0px 18px", maxWidth: "100px", width: "100%" }}
        >
          <FitScreenIcon />
        </Button>

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

        <ShareButtons
          title={title}
          url={shareUrl}
          header="Like this movie? Share it with your friends!"
        />
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
