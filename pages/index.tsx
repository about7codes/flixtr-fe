import type { GetServerSidePropsContext, NextPage } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Box, LinearProgress, Typography } from "@mui/material";

import styles from "../styles/Home.module.css";
import { styles as classes } from "../styles/Home.styles";
import { MovieQueryKey, useMovies } from "../hooks/movies.hooks";
import { SeriesQueryKey, useSeries } from "../hooks/series.hooks";
import { PeopleQueryKey, usePeople } from "../hooks/people.hooks";
import { getMovies } from "../api/movies.api";
import { getSeries } from "../api/series.api";
import { getPeople } from "../api/people.api";
import TileSlider from "../components/TileSider/TileSlider";
import TvTileSlider from "../components/TvTileSlider/TvTileSlider";
import CustomHead from "../components/CustomHead/CustomHead";
import PersonTileSlider from "../components/PersonTileSlider/PersonTileSlider";
import { useEffect, useRef } from "react";

type HomeProps = {};

const Home: NextPage<HomeProps> = () => {
  const { data: movieData, isLoading: isMoviesLoading } = useMovies();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  const { data: peopleData, isLoading: isPeopleLoading } = usePeople();
  // console.log("MovieDATA", movieData);
  // console.log("MovieDATA", toPercent(movieData[1].vote_average || 0));
  // console.log("seriesDATA", seriesData);
  // console.log("peopleDATA", peopleData);

  const adRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.type = "application/javascript";
    script1.src = "https://a.exdynsrv.com/ad-provider.js";

    const script2 = document.createElement("script");
    script2.async = true;
    script2.type = "application/javascript";
    script2.innerHTML =
      '(AdProvider = window.AdProvider || []).push({"serve": {}});';

    const adEl1 = document.createElement("ins");
    adEl1.className = "eas6a97888ec52c042c679a36e919843cca";
    adEl1.dataset.zoneid = "5018914";

    const adEl2 = document.createElement("ins");
    adEl2.className = "eas6a97888ec52c042c679a36e919843cca";
    adEl2.dataset.zoneid = "5019068";

    adRef.current?.appendChild(script1);
    adRef.current?.appendChild(adEl1);
    adRef.current?.appendChild(adEl2);
    adRef.current?.appendChild(script2);

    return () => {
      adRef.current?.removeChild(script1);
      adRef.current?.removeChild(adEl1);
      adRef.current?.removeChild(adEl2);
      adRef.current?.removeChild(script2);
    };
  }, []);

  return (
    <>
      <CustomHead
        title="Flixtr - Watch Movies & TV Shows"
        media_type={"movie"}
      />

      <div className={styles.container}>
        {(isMoviesLoading || isSeriesLoading || isPeopleLoading) && (
          <LinearProgress />
        )}

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Movies
            </Typography>
            <Typography variant="body1" sx={classes.subTxt}>
              The most recent movies recommended by our community
            </Typography>
          </Box>
          <TileSlider movieData={movieData} />
        </Box>

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Shows
            </Typography>
            <Typography variant="body1" sx={classes.subTxt}>
              The most recent shows recommended by our community
            </Typography>
          </Box>
          <TvTileSlider seriesData={seriesData} />
        </Box>

        <Box sx={{ display: "flex" }} ref={adRef}></Box>

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Artists
            </Typography>
            <Typography variant="body1" sx={classes.subTxt}>
              The top rated artists recommended by our community
            </Typography>
          </Box>
          <PersonTileSlider peopleData={peopleData} />
        </Box>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery([MovieQueryKey.MovieData], getMovies);
    await queryClient.fetchQuery([SeriesQueryKey.SeriesData], getSeries);
    await queryClient.fetchQuery([PeopleQueryKey.PeopleData], getPeople);

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

export default Home;
