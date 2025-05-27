import { useEffect, useRef } from "react";
import type { NextPage } from "next";
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
import ShareButtons from "../components/ShareButtons/ShareButtons";
import { disableAds } from "../utils/utils";
// import HilltopAd from "../components/Hilltop/Hilltop";
// import RmzGroup from "../components/RmzGroup/RmzGroup";
// import RmzLite from "../components/RmzLite/RmzLite";

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
    const width = window.innerWidth;

    const script1 = document.createElement("script");
    script1.async = true;
    script1.type = "application/javascript";
    script1.src = "https://a.magsrv.com/ad-provider.js";

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

    const adEl3 = document.createElement("ins");
    adEl3.className = "eas6a97888e2";
    adEl3.dataset.zoneid = "5583506";

    const adEl4 = document.createElement("ins");
    adEl4.className = "eas6a97888e2";
    adEl4.dataset.zoneid = "5583508";

    adRef.current?.appendChild(script1);

    if (width >= 1241) {
      adRef.current?.appendChild(adEl1);
      adRef.current?.appendChild(adEl2);
      adRef.current?.appendChild(adEl3);
      adRef.current?.appendChild(adEl4);
    } else if (width >= 950) {
      adRef.current?.appendChild(adEl1);
      adRef.current?.appendChild(adEl2);
      adRef.current?.appendChild(adEl3);
    } else if (width >= 620) {
      adRef.current?.appendChild(adEl1);
      adRef.current?.appendChild(adEl2);
    } else {
      adRef.current?.appendChild(adEl1);
    }

    adRef.current?.appendChild(script2);

    return () => {
      [script1, adEl1, adEl2, adEl3, adEl4, script2].forEach((el) => {
        try {
          adRef.current?.removeChild(el);
        } catch (_) {}
      });
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

        <Box sx={classes.shareContainer}>
          <Typography variant="h4" sx={classes.shareHead}>
            Enjoying the site? Feel free to share it with others — every bit
            helps!
          </Typography>
          <ShareButtons title={"Flixbaba - Watch Movies & TV Shows"} />
        </Box>

        {!disableAds && (
          // <>
          //   <div
          //     dangerouslySetInnerHTML={{
          //       __html: `
          //       <script>
          //         (function(jyyg){
          //         var d = document,
          //             s = d.createElement('script'),
          //             l = d.scripts[d.scripts.length - 1];
          //         s.settings = jyyg || {};
          //         s.src = "\/\/definitive-priority.com\/baXhV-s.daGhlQ0BYPWLcL\/cekmx9nuAZoU\/llkSPUT\/YZz\/NADPEM4sOUDYc\/t\/NTjhMN0CMVTqgR4FOIAa";
          //         s.async = true;
          //         s.referrerPolicy = 'no-referrer-when-downgrade';
          //         l.parentNode.insertBefore(s, l);
          //         })({})
          //       </script>
          //     `,
          //     }}
          //   ></div>
          //   <div
          //     dangerouslySetInnerHTML={{
          //       __html: `
          //       <script>
          //       (function(ostl){
          //       var d = document,
          //           s = d.createElement('script'),
          //           l = d.scripts[d.scripts.length - 1];
          //       s.settings = ostl || {};
          //       s.src = "\/\/definitive-priority.com\/bsXhVhs.d\/GslZ0CY\/Woca\/VeMmS9OusZ-UGlWkAPPTgYGzzNcDXIWwvNvjikqtUN\/jeMy0-MsjTA\/3OM\/Ak";
          //       s.async = true;
          //       s.referrerPolicy = 'no-referrer-when-downgrade';
          //       l.parentNode.insertBefore(s, l);
          //       })({})
          //       </script>
          //     `,
          //     }}
          //   ></div>
          //   <div
          //     dangerouslySetInnerHTML={{
          //       __html: `
          //       <script>
          //       (function(xfhwm){
          //       var d = document,
          //           s = d.createElement('script'),
          //           l = d.scripts[d.scripts.length - 1];
          //       s.settings = xfhwm || {};
          //       s.src = "\/\/definitive-priority.com\/buXtV.sZdnGSl-0\/Y\/Wrcr\/webmB9IuTZwU\/lVk-PoTIYlztNBD\/IQwUNZzFk\/tvNQjLMO0GMyjDAc4RM\/AG";
          //       s.async = true;
          //       s.referrerPolicy = 'no-referrer-when-downgrade';
          //       l.parentNode.insertBefore(s, l);
          //       })({})
          //       </script>
          //     `,
          //     }}
          //   ></div>
          //   <div
          //     dangerouslySetInnerHTML={{
          //       __html: `
          //       <script>
          //       (function(qzn){
          //       var d = document,
          //           s = d.createElement('script'),
          //           l = d.scripts[d.scripts.length - 1];
          //       s.settings = qzn || {};
          //       s.src = "\/\/definitive-priority.com\/bqX.VDs\/dFGplc0zY\/WEcq\/Uepm-9euOZnUEl-kIPsTxYbz\/NkDHIqwCOtDIkXt-NxjAMY0EMwjcAF5XMWAH";
          //       s.async = true;
          //       s.referrerPolicy = 'no-referrer-when-downgrade';
          //       l.parentNode.insertBefore(s, l);
          //       })({})
          //       </script>
          //     `,
          //     }}
          //   ></div>
          // </>
          // <HilltopAd
          //   pageName="homepage"
          //   scripts={[
          //     `(function(jyyg){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=jyyg||{};s.src="//definitive-priority.com/baXhV-s.daGhlQ0BYPWLcL/cekmx9nuAZoU/llkSPUT/YZz/NADPEM4sOUDYc/t/NTjhMN0CMVTqgR4FOIAa";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
          //     `(function(ostl){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=ostl||{};s.src="//definitive-priority.com/bsXhVhs.d/GslZ0CY/Woca/VeMmS9OusZ-UGlWkAPPTgYGzzNcDXIWwvNvjikqtUN/jeMy0-MsjTA/3OM/Ak";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
          //     `(function(xfhwm){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=xfhwm||{};s.src="//definitive-priority.com/buXtV.sZdnGSl-0/Y/Wrcr/webmB9IuTZwU/lVk-PoTIYlztNBD/IQwUNZzFk/tvNQjLMO0GMyjDAc4RM/AG";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
          //     `(function(qzn){var d=document,s=d.createElement('script'),l=d.scripts[d.scripts.length-1];s.settings=qzn||{};s.src="//definitive-priority.com/bqX.VDs/dFGplc0zY/WEcq/Uepm-9euOZnUEl-kIPsTxYbz/NkDHIqwCOtDIkXt-NxjAMY0EMwjcAF5XMWAH";s.async=true;s.referrerPolicy='no-referrer-when-downgrade';l.parentNode.insertBefore(s,l);})({})`,
          //   ]}
          // />
          // <div
          //   className="hilltop-zz"
          //   dangerouslySetInnerHTML={{
          //     __html: `
          //       <script>
          //         (function(fuvlsq){
          //           var d = document,
          //               s = d.createElement('script'),
          //               l = d.scripts[d.scripts.length - 1];
          //           s.settings = fuvlsq || {};
          //           s.src = "//definitive-priority.com/bAXwVas.daG/lw0jYCWwcK/veEmE9ruEZ-UEl-kVPyT/YTzINLD/EN4ROED_cGtGNBjVM/0jMLTPgB4iOTAU";
          //           s.async = true;
          //           s.referrerPolicy = 'no-referrer-when-downgrade';
          //           l.parentNode.insertBefore(s, l);
          //         })({})
          //       </script>
          //     `,
          //   }}
          // />
          <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
            ref={adRef}
          ></Box>
        )}

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
