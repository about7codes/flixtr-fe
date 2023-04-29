import Head from "next/head";
import type { GetServerSidePropsContext, NextPage } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Box, LinearProgress, Typography } from "@mui/material";

import TileSlider from "../components/TileSider/TileSlider";
import TvTileSlider from "../components/TvTileSlider/TvTileSlider";
import { PeopleData, PeopleResult } from "../types/apiResponses";
import styles from "../styles/Home.module.css";
import { styles as classes } from '../styles/Home.styles';
import { getMovies } from "../api/movies.api";
import { MovieQueryKey, useMovies } from "../hooks/movies.hooks";
import { getSeries } from "../api/series.api";
import { SeriesQueryKey, useSeries } from "../hooks/series.hooks";

type HomeProps = {};

const Home: NextPage<HomeProps> = () => {
  const { data: movieData, isLoading: isMoviesLoading } = useMovies();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  const { data: peopleData, isLoading: isPeopleLoading } = usePeople();
  // console.log("MovieDATA", movieData);
  // console.log("seriesDATA", seriesData);
  // console.log("peopleDATA", peopleData);

  return (
    <div className={styles.container}>
      {(isMoviesLoading || isSeriesLoading || isPeopleLoading) &&
        <LinearProgress />
      }
      <Head>
        <title>Flixtr movie App</title>
        <meta name="description" content="Flixtr movie App, a next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box sx={classes.sliderContainer}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={classes.headTxt}>Trending Movies</Typography>
          <Typography variant="body1" sx={classes.subTxt}>
            Here are some of the most recent movies recommended by our community
          </Typography>
        </Box>
        <TileSlider movieData={movieData} />
      </Box>

      <Box sx={classes.sliderContainer}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={classes.headTxt}>Trending Shows</Typography>
          <Typography variant="body1" sx={classes.subTxt}>
            Here are some of the most recent shows recommended by our community
          </Typography>
        </Box>
        <TvTileSlider seriesData={seriesData} />
      </Box>
    </div>
  );
};

export const getPeople = async (): Promise<PeopleResult[]> => {
  try {
    const peopleRes = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
    );
    const peopleData: PeopleData = await peopleRes.json();

    if (peopleData.hasOwnProperty('success')) throw new Error('Api call failed');

    return peopleData.results;

  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
}

export const usePeople = () => {
  return useQuery(['peopleData'], getPeople);
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery([MovieQueryKey.MovieData], getMovies);
    await queryClient.fetchQuery([SeriesQueryKey.SeriesData], getSeries);
    await queryClient.fetchQuery(['peopleData'], getPeople);

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

export default Home;
