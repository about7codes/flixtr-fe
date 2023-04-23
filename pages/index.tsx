import Head from "next/head";
import type { GetServerSidePropsContext, NextPage } from "next";
import TileSlider from "../components/TileSider/TileSlider";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { MovieResult, PeopleResult, SeriesResult } from "../types/apiResponses";
import { Box, Typography } from "@mui/material";
import TvTileSlider from "../components/TvTileSlider/TvTileSlider";

type HomeProps = {
  movieData: MovieResult[];
  seriesData: SeriesResult[];
  peopleData: PeopleResult[];
};

const Home: NextPage<HomeProps> = ({ movieData, seriesData, peopleData }) => {
  // console.log("MovieDATA", movieData);
  console.log("seriesDATA", seriesData);
  // console.log("peopleDATA", peopleData);
  return (
    <div className={styles.container}>
      <Head>
        <title>Flixtr movie App</title>
        <meta name="description" content="Flixtr movie App, a next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box sx={{ m: '60px 0' }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Trending Movies</Typography>
          <Typography variant="body1">
            Here are some of the most recent movies recommended by our community
          </Typography>
        </Box>
        <TileSlider movieData={movieData} />
      </Box>

      <Box sx={{ m: '60px 0' }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Trending Shows</Typography>
          <Typography variant="body1">
            Here are some of the most recent shows recommended by our community
          </Typography>
        </Box>
        <TvTileSlider seriesData={seriesData} />
      </Box>
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
    );
    const seriesRes = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.TMDB_KEY}`
    );
    const peopleRes = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_KEY}`
    );

    const movieData = await movieRes.json();
    const seriesData = await seriesRes.json();
    const peopleData = await peopleRes.json();

    return {
      props: {
        movieData: movieData.results,
        seriesData: seriesData.results,
        peopleData: peopleData.results,
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
