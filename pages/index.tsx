import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import styles from "../styles/Home.module.css";
import { styles as classes } from "../styles/Home.styles";
import { useMovies, usePopularMovies } from "../hooks/movies.hooks";
import { useSeries } from "../hooks/series.hooks";
import { usePeople } from "../hooks/people.hooks";
import TileSlider from "../components/TileSider/TileSlider";
import TvTileSlider from "../components/TvTileSlider/TvTileSlider";
import CustomHead from "../components/CustomHead/CustomHead";
import PersonTileSlider from "../components/PersonTileSlider/PersonTileSlider";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import SkeletonSlider from "../components/SkeletonSlider/SkeletonSlider";
import SkeletonMovieSlider from "../components/SkeletonMovieSlider/SkeletonMovieSlider";

type HomeProps = {};

const Home: NextPage<HomeProps> = () => {
  const { data: popularMovies, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: movieData, isLoading: isMoviesLoading } = useMovies();
  const { data: seriesData, isLoading: isSeriesLoading } = useSeries();
  const { data: peopleData, isLoading: isPeopleLoading } = usePeople();
  // console.log("MovieDATA", movieData);
  // console.log("MovieDATA", toPercent(movieData[1].vote_average || 0));
  // console.log("seriesDATA", seriesData);

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
    adEl1.className = "eas6a97888e2";
    adEl1.dataset.zoneid = "5494226";

    const adEl2 = document.createElement("ins");
    adEl2.className = "eas6a97888e2";
    adEl2.dataset.zoneid = "5494228";

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
        title="Flixbaba - Watch Movies & TV Shows"
        media_type={"movie"}
      />

      <div className={styles.container}>
        {(isPopularLoading ||
          isMoviesLoading ||
          isSeriesLoading ||
          isPeopleLoading) && <LinearProgress />}

        <Box>
          {isPopularLoading ? (
            <SkeletonMovieSlider />
          ) : (
            <MovieSlider movieData={popularMovies?.pages[0].results} />
          )}
        </Box>

        <Box sx={{ ...classes.sliderContainer, m: "20px 0 60px 0" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Movies
            </Typography>
            <Typography variant="body1" sx={classes.subTxt}>
              The most recent movies recommended by our community
            </Typography>
          </Box>

          {isMoviesLoading ? (
            <SkeletonSlider />
          ) : (
            <TileSlider movieData={movieData} />
          )}
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

          {isSeriesLoading ? (
            <SkeletonSlider />
          ) : (
            <TvTileSlider seriesData={seriesData} />
          )}
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          ref={adRef}
        ></Box>

        <Box sx={classes.sliderContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={classes.headTxt}>
              Trending Artists
            </Typography>
            <Typography variant="body1" sx={classes.subTxt}>
              The top rated artists recommended by our community
            </Typography>
          </Box>

          {isPeopleLoading ? (
            <SkeletonSlider />
          ) : (
            <PersonTileSlider peopleData={peopleData} />
          )}
        </Box>
      </div>
    </>
  );
};

// Commented to Remove SSR
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const queryClient = new QueryClient();

//   try {
//     await queryClient.prefetchInfiniteQuery(
//       [MovieQueryKey.PopularMovies],
//       ({ pageParam = 1 }) => getPopularMovies(pageParam),
//       {
//         getNextPageParam: (lastPage) => {
//           return lastPage.page < lastPage.total_pages
//             ? lastPage.page + 1
//             : undefined;
//         },
//       }
//     );

//     await queryClient.fetchQuery([MovieQueryKey.MovieData], getMovies);
//     await queryClient.fetchQuery([SeriesQueryKey.SeriesData], getSeries);
//     await queryClient.fetchQuery([PeopleQueryKey.PeopleData], getPeople);

//     return {
//       props: {
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//     };
//   }
// }

export default Home;
