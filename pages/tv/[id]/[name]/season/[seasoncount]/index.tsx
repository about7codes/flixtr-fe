import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FitScreenIcon from "@mui/icons-material/FitScreen";

import { SeriesResult } from "../../../../../../types/apiResponses";
import { styles as classes } from "../../../../../../styles/SeasonCount.styles";
import TvTileSlider from "../../../../../../components/TvTileSlider/TvTileSlider";
import {
  SeriesQueryKey,
  useSeriesById,
  useSeriesSeasonById,
} from "../../../../../../hooks/series.hooks";
import CustomHead from "../../../../../../components/CustomHead/CustomHead";
import { convertToNumber, disableAds } from "../../../../../../utils/utils";
import Comments from "../../../../../../components/Comments/Comments";
// import { topTvIframes, bottomTvIframes } from "../../../../../../utils/iframeUtils";
import ShareButtons from "../../../../../../components/ShareButtons/ShareButtons";
import { getSeriesSeasonById } from "../../../../../../apis/series.api";
import HmzGroup from "../../../../../../components/HmzGroup/HmzGroup";

// import GmcGroup from "../../../../../../components/GmcGroup/GmcGroup";
// import RmzGroup from "../../../../../../components/RmzGroup/RmzGroup";
// import RmzLite from "../../../../../../components/RmzLite/RmzLite";

function SeasonCount() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id, name, seasoncount = "1", e, p } = router.query;

  const [ep, setEp] = useState(1);
  const [player, setPlayer] = useState<1 | 2 | 3>(1);
  const [shareUrl, setShareUrl] = useState("");
  const [floatMode, setFloatMode] = useState(false);

  const [selectedSeason, setSelectedSeason] = useState(seasoncount);

  const playerUrls = useMemo(
    () => ({
      1: `${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/${selectedSeason}-${ep}/color-ADDC35`,
      2: `${process.env.NEXT_PUBLIC_Player_URL_SE}/tv/${id}/${selectedSeason}/${ep}?adFree=true`,
      3: `${process.env.NEXT_PUBLIC_Player_URL_AE}/tv/${id}/${selectedSeason}/${ep}?color=addc35`,
    }),
    [id, ep, selectedSeason]
  );

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
    useSeriesSeasonById(id, selectedSeason);

  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);
  // console.log("tvShowData", tvShowData);
  // console.log("tvShowSeasonData: " + selectedSeason, tvShowSeasonData);

  const scrollToPlayer = () => {
    const el = document.getElementById("players");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFloatToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setFloatMode(newValue);
    localStorage.setItem("floatMode", newValue.toString());
  };

  // [NEW] Navigation helpers
  const hasNextEpisode = useMemo(() => {
    if (tvShowSeasonData?.episodes && ep < tvShowSeasonData.episodes.length) {
      return true;
    }
    if (tvShowData?.seasons) {
      const currentSeasonIndex = tvShowData.seasons.findIndex(
        (season) => season.season_number === Number(selectedSeason)
      );
      return currentSeasonIndex < tvShowData.seasons.length - 1;
    }
    return false;
  }, [ep, selectedSeason, tvShowSeasonData?.episodes, tvShowData?.seasons]);

  const hasPrevEpisode = useMemo(() => {
    if (ep > 1) return true;
    if (tvShowData?.seasons) {
      const currentSeasonIndex = tvShowData.seasons.findIndex(
        (season) => season.season_number === Number(selectedSeason)
      );
      return currentSeasonIndex > 0;
    }
    return false;
  }, [ep, selectedSeason, tvShowData?.seasons]);

  // [NEW] Enhanced navigation handler
  const handleEpisodeNavigation = async (direction: "prev" | "next") => {
    if (direction === "next") {
      // Next episode in current season
      if (tvShowSeasonData?.episodes && ep < tvShowSeasonData.episodes.length) {
        const newEp = ep + 1;
        setEp(newEp);
        router.replace(
          {
            pathname: router.asPath.split("?")[0],
            query: { e: newEp, p: player },
          },
          undefined,
          { shallow: true }
        );
      }
      // Move to next season
      else if (tvShowData?.seasons) {
        const currentSeasonIndex = tvShowData.seasons.findIndex(
          (season) => season.season_number === Number(selectedSeason)
        );

        if (currentSeasonIndex < tvShowData.seasons.length - 1) {
          const nextSeason =
            tvShowData.seasons[currentSeasonIndex + 1].season_number;

          // Prefetch next season data
          await queryClient.prefetchQuery(
            [SeriesQueryKey.TvShowSeasonData, id, nextSeason],
            () => getSeriesSeasonById(id, nextSeason.toString())
          );

          setEp(1);

          router
            .push({
              pathname: `/tv/${id}/${name}/season/${nextSeason}`,
              query: { e: 1, p: player },
            })
            .then(scrollToPlayer);
        }
      }
    } else {
      // Previous episode in current season
      if (ep > 1) {
        const newEp = ep - 1;
        setEp(newEp);
        router.replace(
          {
            pathname: router.asPath.split("?")[0],
            query: { e: newEp, p: player },
          },
          undefined,
          { shallow: true }
        );
      }
      // Move to previous season
      else if (tvShowData?.seasons) {
        const currentSeasonIndex = tvShowData.seasons.findIndex(
          (season) => season.season_number === Number(selectedSeason)
        );

        if (currentSeasonIndex > 0) {
          const prevSeason =
            tvShowData.seasons[currentSeasonIndex - 1].season_number;

          // Prefetch previous season data
          const prevSeasonData = await queryClient.fetchQuery(
            [SeriesQueryKey.TvShowSeasonData, id, prevSeason],
            () => getSeriesSeasonById(id, prevSeason.toString())
          );

          const lastEp = prevSeasonData?.episodes?.length || 1;

          setEp(lastEp);

          router
            .push({
              pathname: `/tv/${id}/${name}/season/${prevSeason}`,
              query: { e: lastEp, p: player },
            })
            .then(scrollToPlayer);
        }
      }
    }
  };

  useEffect(() => {
    const storedFloat = localStorage.getItem("floatMode");
    setFloatMode(storedFloat === "true");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [e, p]);

  useEffect(() => {
    const eNum = convertToNumber(e);
    const pNum = convertToNumber(p);

    if (eNum) setEp(eNum);
    if (pNum) {
      if (pNum === 1 || pNum === 2 || pNum === 3) setPlayer(pNum);
    }
  }, [isShowLoading]);

  useEffect(() => {
    if (seasoncount) {
      setSelectedSeason(seasoncount.toString());
    }
  }, [seasoncount]);

  if (isSeasonLoading || isShowLoading) return <LinearProgress />;

  const {
    recommendations,
    similar,
    name: showTitle,
  } = tvShowData as SeriesResult;

  const changePlayer = (playerId: typeof player) => {
    setPlayer((prevPlayerId) => {
      if (prevPlayerId === playerId) return prevPlayerId;

      router.replace(
        {
          pathname: router.asPath.split("?")[0],
          query: { e: ep, p: playerId },
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
      <CustomHead
        title={`Watching season ${selectedSeason} episode ${ep} of ${showTitle}`}
        media_type="tv"
      />
      <Grid container>
        <Grid item sx={classes.watchHead}>
          <Link href={`/tv/${id}/${name}`} className="backToInfo">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIosNewIcon sx={classes.backIco} />}
              size="small"
            >
              Back to show details
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
            Watching season {selectedSeason} episode {ep} of{" "}
            {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>

        {!disableAds && (
          // <Grid sx={classes.con}>
          //   {topTvIframes.map(({ className, idzone, size }) => (
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
            pageName="WatchShowT"
            scriptSources={[
              "//definitive-priority.com/bgXmV.sYd_GQlJ0sYEWycW/aeJmB9zujZZUilxkWPxTyYgzjOhTNUW3/MgTtEbtzNnjIMo5/NmTHc/x_MDg-",
              "//definitive-priority.com/beXIVPsid.GXlx0hYrWfcD/Femm_9duaZWUPl/kxP/TlYdzrOeT_Us3lMzj-ErtxNij/Mp5aNRTocxyoMrgF",
              "//definitive-priority.com/b.XBVlsAdiGblf0iY/WncW/fe/mR9JuNZYUVlDkaP/TkY/zEOMTxUO3JMuzTEhtCNxjzM/5eNNTBc_zfMUge",
              "//definitive-priority.com/bWXbVEsqd.Gvlz0CYoWBci/Ge/mt9/uGZCUNl/ktP/ThYFz-OHTqU-3/NPDcEZtwNBjPMC5PNUTfcV0PMmgL",
            ]}
          />

          // <RmzGroup
          //   bannerIds={["1449228", "1449229", "1449230", "1449231"]}
          //   ampId="329485"
          //   pageName="WatchShow"
          // />
          // <RmzLite
          //   pageName="WatchShow"
          //   spotIds={["1450819", "1450820", "1450821", "1450822"]}
          // />

          // <GmcGroup
          //   pageName="WatchShowT"
          //   sources={[
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDUsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDYsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDcsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDgsInNyYyI6Mn0=eyJ.js",
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

        <Box sx={classes.tvconsole}>
          <Box sx={classes.tvconsoleTop}>
            {/* Season Switcher */}
            {tvShowData?.seasons && tvShowData?.seasons?.length > 0 && (
              <Box sx={classes.seasonSwitcher}>
                <FormControl
                  sx={classes.seasonSelect}
                  variant="filled"
                  size="small"
                  color="secondary"
                >
                  <InputLabel id="season-select-label">Season</InputLabel>
                  <Select
                    labelId="season-select-label"
                    value={selectedSeason}
                    label="Season"
                    onChange={(e) => {
                      const newSeason = e.target.value;
                      setSelectedSeason(newSeason);
                      setEp(1);
                      router
                        .push({
                          pathname: `/tv/${id}/${name}/season/${newSeason}`,
                          query: { e: 1, p: player },
                        })
                        .then(scrollToPlayer);
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiList-root": {
                            backgroundColor: "primary.main",
                          },
                        },
                      },
                    }}
                  >
                    {tvShowData.seasons.map((season) => (
                      <MenuItem
                        key={season.id}
                        value={season.season_number}
                        sx={classes.seasonSelectItem}
                      >
                        {season.name || `Season ${season.season_number}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box sx={classes.tvconsoleBottom}>
              <Button
                aria-label="Center video"
                title="Center video"
                color="secondary"
                variant="contained"
                onClick={scrollToPlayer}
                sx={{ m: "6px 0" }}
              >
                <FitScreenIcon />
              </Button>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={floatMode}
                      onChange={handleFloatToggle}
                    />
                  }
                  sx={{
                    whiteSpace: "nowrap",
                    "& .MuiFormControlLabel-label": { fontSize: "14px" },
                  }}
                  label="Float mode"
                  labelPlacement="start"
                />
              </FormGroup>
            </Box>
          </Box>

          {/* [NEW] Navigation Buttons */}
          <Box sx={classes.navButtons}>
            <ButtonGroup
              variant="contained"
              aria-label="Navigation buttons"
              fullWidth
              sx={floatMode ? classes.floatMode : undefined}
            >
              <Button
                onClick={() => handleEpisodeNavigation("prev")}
                disabled={!hasPrevEpisode}
                startIcon={<ArrowBackIosNewIcon />}
                sx={{
                  ...classes.navButton,
                  borderTopLeftRadius: { md: "4px" },
                }}
              >
                <Box sx={classes.textContainer}>
                  {ep === 1 && tvShowData?.seasons ? (
                    <>
                      <Typography variant="body2" sx={classes.text1}>
                        Previous Season
                      </Typography>
                      <Typography variant="caption" sx={classes.text2}>
                        Season {Number(selectedSeason) - 1}, Last Episode
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" sx={classes.text1}>
                        Previous
                      </Typography>
                      <Typography variant="caption" sx={classes.text2}>
                        Ep {ep - 1}
                      </Typography>
                    </>
                  )}
                </Box>
              </Button>
              <Button
                onClick={() => handleEpisodeNavigation("next")}
                disabled={!hasNextEpisode}
                endIcon={<ArrowForwardIosIcon />}
                sx={{
                  ...classes.navButton,
                  borderTopRightRadius: { md: "4px" },
                }}
              >
                <Box sx={classes.textContainer}>
                  {tvShowSeasonData?.episodes &&
                  ep === tvShowSeasonData.episodes.length &&
                  tvShowData?.seasons ? (
                    <>
                      <Typography variant="body2" sx={classes.text1}>
                        Next Season
                      </Typography>
                      <Typography variant="caption" sx={classes.text2}>
                        Season {Number(selectedSeason) + 1}, Episode 1
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" sx={classes.text1}>
                        Next
                      </Typography>
                      <Typography variant="caption" sx={classes.text2}>
                        Ep {ep + 1}
                      </Typography>
                    </>
                  )}
                </Box>
              </Button>
            </ButtonGroup>
          </Box>
        </Box>

        <Grid item sx={classes.episodeBtns}>
          {tvShowSeasonData?.episodes?.map(({ episode_number }) => (
            <Box sx={classes.episodeBtnBox} key={episode_number}>
              <Button
                variant="contained"
                sx={classes.episodeBtn}
                color={ep === episode_number ? "secondary" : "primary"}
                onClick={() => {
                  setEp((prevEp) => {
                    if (prevEp === episode_number) return prevEp;

                    router.replace(
                      {
                        pathname: router.asPath.split("?")[0],
                        query: {
                          e: episode_number,
                          p: player,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );

                    return episode_number;
                  });
                }}
              >
                Ep {episode_number}
              </Button>
            </Box>
          ))}
        </Grid>

        {!disableAds && (
          // <Grid sx={classes.con}>
          //   {bottomTvIframes.map(({ className, idzone, size }) => (
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
            pageName="WatchShowB"
            scriptSources={[
              "//definitive-priority.com/bDXzVts.dIG/lw0/YmWzcp/Yecmj9/ukZGU/lOkTP/T_YszSOsTEUT3dNUTbEEtuNKj/MQ5ONATtc/1LMrgM",
              "//definitive-priority.com/bTX.VSs/d/Gtl/0sYwWDcg/Je/m/9GuUZSUtlHkuP/ThYCzAONTgUK3aNcj/E-tAN/jpM/5QNhTIcX2QMxge",
              "//definitive-priority.com/bzX-V.ssdyGYlN0TYJWRcO/JeZm/9TuTZaU/lEkXPZTdY/zsOlTxUu3NNjzMEltMN/jcMO5/NVT/cz3/MBgW",
              "//definitive-priority.com/bnX.V/shdPGMlT0/YcW-cd/LeYmX9PuoZyUWlIksP/TbYZz/ORTEU/3/OwDTEDtoNUjlMU5/NeTOch4GMAgW",
            ]}
          />

          // <RmzGroup
          //   bannerIds={["1449232", "1449233", "1449234", "1449235"]}
          //   ampId="329485"
          //   pageName="WatchShow"
          // />
          // <RmzLite
          //   pageName="WatchShow"
          //   spotIds={["1450823", "1450824", "1450825", "1450826"]}
          // />

          // <GmcGroup
          //   pageName="WatchShowB"
          //   sources={[
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNDksInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNTAsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNTEsInNyYyI6Mn0=eyJ.js",
          //     "https://curoax.com/na/waWQiOjEyMDI2MjMsInNpZCI6MTUxNTkyMCwid2lkIjo3MTMwNTIsInNyYyI6Mn0=eyJ.js",
          //   ]}
          // />
        )}

        <ShareButtons
          url={shareUrl}
          title={`Watch ${showTitle} - S${selectedSeason}E${ep}`}
          header="Like this episode? Share it with your friends!"
        />
        <Comments media_type="tv" />

        {[
          { movieData: recommendations?.results, title: "Recommended for you" },
          { movieData: similar?.results, title: "Related shows" },
        ].map(({ movieData, title }) => (
          <Grid item sx={classes.mustWatch} key={title}>
            <TvTileSlider title={title} seriesData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();
//   const { id, seasoncount } = ctx.query;

//   try {
//     await queryClient.fetchQuery([SeriesQueryKey.SingleShowData, id], () =>
//       getSeriesById(id)
//     );
//     await queryClient.fetchQuery([SeriesQueryKey.TvShowSeasonData, id], () =>
//       getSeriesSeasonById(id, seasoncount)
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

export default SeasonCount;
