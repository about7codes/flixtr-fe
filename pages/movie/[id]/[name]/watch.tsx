import React, { useEffect, useMemo, useRef, useState } from "react";
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
import ShareButtons from "../../../../components/ShareButtons/ShareButtons";
import HmzGroup from "../../../../components/HmzGroup/HmzGroup";

// import { topMovieIframes, bottomMovieIframes, } from "../../../../utils/iframeUtils";
// import GmcGroup from "../../../../components/GmcGroup/GmcGroup";
// import RmzGroup from "../../../../components/RmzGroup/RmzGroup";
// import RmzLite from "../../../../components/RmzLite/RmzLite";

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
          // <Grid sx={classes.con}>
          //   {topMovieIframes.map(({ className, idzone, size }) => (
          //     <iframe
          //       key={idzone}
          //       className={className}
          //       src={`//a.magsrv.com/iframe.php?idzone=${idzone}&size=${size}`}
          //       width={size.split("x")[0]}
          //       height={size.split("x")[1]}
          //       scrolling="no"
          //       marginWidth={0}
          //       marginHeight={0}
          //       frameBorder="0"
          //     ></iframe>
          //   ))}
          // </Grid>

          <HmzGroup
            pageName="WatchMovieT"
            scriptSources={[
              "//definitive-priority.com/bmXJVgs/d.G/le0jYxW/cN/Remm/9/uDZeUylBk/PDTWYLzXOVTiUR2HM/zMEtt/N/jcM/5AN/TsYzzlMGgY",
              "//definitive-priority.com/b/X.VwsgdsG/l/0dYBWVci/QeEmv9Cu/ZLUqlgkiPlT/YWz/O/T/Uv2kNmDGEltkNWj_MX5gNsTTYe0kMfgz",
              "//definitive-priority.com/bCXhVjs.d/G/l/0lYIWfcw/Hetmg9RusZcUWlpkaPNTLYDz/O/T/Uf2nNRTwEdtBNfjjMt5NNaTAYc1VM/gK",
              "//definitive-priority.com/b.X/VcspddGCln0XY/WXcA/ye/mO9ZugZPUPlTk/P-TEYaz/O/ThUy2SNyjhEXtNN/jiMF5gNvTNYe2VM/gJ",
            ]}
          />

          // <RmzGroup
          //   bannerIds={["1449065", "1449066", "1449067", "1449068"]}
          //   ampId="329031"
          //   pageName="WatchMovie"
          // />
          // <RmzLite
          //   pageName="WatchMovie"
          //   spotIds={["1450809", "1450810", "1450811", "1450812"]}
          // />

          // <GmcGroup
          //   pageName="WatchMovieT"
          //   sources={[
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwMzcsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwMzgsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwMzksInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDAsInNyYyI6Mn0=eyJ.js",
          //   ]}
          // />
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
          sx={{ m: "5px 18px 10px 18px", maxWidth: "100px", width: "100%" }}
        >
          <FitScreenIcon />
        </Button>

        {!disableAds && (
          // <Grid sx={classes.con}>
          //   {bottomMovieIframes.map(({ className, idzone, size }) => (
          //     <iframe
          //       key={idzone}
          //       className={className}
          //       src={`//a.magsrv.com/iframe.php?idzone=${idzone}&size=${size}`}
          //       width={size.split("x")[0]}
          //       height={size.split("x")[1]}
          //       scrolling="no"
          //       marginWidth={0}
          //       marginHeight={0}
          //       frameBorder="0"
          //     ></iframe>
          //   ))}
          // </Grid>

          <HmzGroup
            pageName="WatchMovieB"
            scriptSources={[
              "//definitive-priority.com/bWXfVPs.dlGDlt0WYlWYcj/GeOmT9iulZvU/lWkuPaTGYxzwOfTyUn2UNTzEE_tsNejxM/5BNuT_YB3yMvgr",
              "//definitive-priority.com/b.XSVHsldNGul/0cYuWQcc/mesmR9vulZ/UXl/k_PhTkYAztOiTVUT2/O/D/EVtDNAjKMm5SN/TRYC4VMAgQ",
              "//definitive-priority.com/baXNV.srdhG/lf0kYEWRcN/_eamq9kufZgU/l/kmPITTYsz_O-TeUY2AONTOEGtbN/jUMr5/NNTNYG5qMAgA",
              "//definitive-priority.com/b.XdVisqdcGkl/0mYYWKc-/PeAmv9UuGZbUPlekWPST/YhzgO/T/UE3/MOD_EytiNojhML5QNqTqcTwwM-gB",
            ]}
          />

          // <RmzGroup
          //   bannerIds={["1449223", "1449224", "1449225", "1449226"]}
          //   ampId="329031"
          //   pageName="WatchMovie"
          // />
          // <RmzLite
          //   pageName="WatchMovie"
          //   spotIds={["1450814", "1450815", "1450816", "1450817"]}
          // />

          // <GmcGroup
          //   pageName="WatchMovieB"
          //   sources={[
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDEsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDIsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDMsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDQsInNyYyI6Mn0=eyJ.js",
          //   ]}
          // />
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
