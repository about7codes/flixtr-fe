import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { SeriesResult } from "../../../../../../types/apiResponses";
import { styles as classes } from "../../../../../../styles/SeasonCount.styles";
import TvTileSlider from "../../../../../../components/TvTileSlider/TvTileSlider";
import {
  getSeriesById,
  getSeriesSeasonById,
} from "../../../../../../api/series.api";
import {
  SeriesQueryKey,
  useSeriesById,
  useSeriesSeasonById,
} from "../../../../../../hooks/series.hooks";
import CustomHead from "../../../../../../components/CustomHead/CustomHead";
import { convertToNumber } from "../../../../../../utils/utils";

type SeasonCountProps = {};

function SeasonCount() {
  const router = useRouter();

  const { id, name, seasoncount, e } = router.query;
  const [ep, setEp] = useState(1);

  const { data: tvShowSeasonData, isLoading: isSeasonLoading } =
    useSeriesSeasonById(id, seasoncount);
  const { data: tvShowData, isLoading: isShowLoading } = useSeriesById(id);

  useEffect(() => {
    const eNum = convertToNumber(e);
    if (eNum) setEp(eNum);
  }, []);

  if (isSeasonLoading || isShowLoading) return <LinearProgress />;

  const {
    recommendations,
    similar,
    name: showTitle,
  } = tvShowData as SeriesResult;

  // console.log(router.query);
  // console.log("tvShowData", tvShowData);
  // console.log('tvShowSeasonData', tvShowSeasonData)

  return (
    <>
      <CustomHead
        title={`Watching season ${seasoncount} episode ${ep} of ${showTitle}`}
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
          <Typography sx={{ textTransform: "capitalize", paddingLeft: "10px" }}>
            Watching season {seasoncount} episode {ep} of{" "}
            {typeof name === "string" && name?.replaceAll("-", " ")}
          </Typography>
        </Grid>

        <Grid item sx={classes.moviePlayer}>
          {/* <iframe
            allowFullScreen
            id="watch-iframe"
            src={`${process.env.NEXT_PUBLIC_Player_URL}/tv?id=${id}&s=${
              seasoncount ? seasoncount : 1
            }&e=${ep}`}
          ></iframe> */}
          <iframe
            allowFullScreen
            id="watch-iframe"
            src={`${process.env.NEXT_PUBLIC_Player_URL_VS}/${id}/${
              seasoncount ? seasoncount : 1
            }-${ep}/color-ADDC35`}
          ></iframe>
        </Grid>

        <Grid item sx={classes.episodeBtns}>
          {tvShowSeasonData?.episodes?.map(({ episode_number }) => (
            <Box sx={classes.episodeBtnBox} key={episode_number}>
              <Button
                variant="contained"
                sx={classes.episodeBtn}
                color={ep === episode_number ? "primary" : "secondary"}
                onClick={() => {
                  setEp(episode_number);
                  router.replace(
                    {
                      pathname: router.asPath.split("?")[0],
                      query: { e: episode_number },
                    },
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }}
              >
                Ep {episode_number}
              </Button>
            </Box>
          ))}
        </Grid>

        {[
          { movieData: recommendations?.results, title: "Recommended for you" },
          { movieData: similar?.results, title: "Related shows" },
        ].map(({ movieData, title }) => (
          <Grid item sx={{ p: "20px 0", width: "100%" }} key={title}>
            <TvTileSlider title={title} seriesData={movieData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { id, seasoncount } = ctx.query;

  try {
    await queryClient.fetchQuery([SeriesQueryKey.SingleShowData, id], () =>
      getSeriesById(id)
    );
    await queryClient.fetchQuery([SeriesQueryKey.TvShowSeasonData, id], () =>
      getSeriesSeasonById(id, seasoncount)
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

export default SeasonCount;
