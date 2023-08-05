import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import Loader from "../../components/Loader/Loader";
import { usePopularMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { IConutry, countries } from "../../utils/filterUtils";

function Popular() {
  const [country, setCountry] = React.useState<IConutry | undefined>();

  const {
    data: popularMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = usePopularMovies(country);
  // console.log("popularMovies: ", popularMovies);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = countries.find(
      (country) => country.name === event.target.value
    );

    setCountry(selectedCountry);
  };

  // if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Popular movies to watch." media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Popular movies
        </Typography>

        <Box>
          <FormControl
            fullWidth
            size="small"
            color="secondary"
            sx={classes.selectMain}
          >
            <InputLabel sx={classes.selectLabel} id="country-select-label">
              Country
            </InputLabel>
            <Select
              color="secondary"
              labelId="country-select-label"
              id="country-select"
              value={country?.name || ""}
              label="Country"
              onChange={handleChange}
              sx={classes.select}
              MenuProps={{
                sx: classes.selectMenu,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries.map(({ name, langCode }) => (
                <MenuItem key={name} value={name}>
                  {`${name} (${langCode})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Grid container sx={classes.moviesContainer}>
              {popularMovies?.pages.map((page) =>
                page.results.map((movie) => (
                  <Grid item key={movie.id}>
                    <Poster singleMovieData={movie} />
                  </Grid>
                ))
              )}
            </Grid>
            {hasNextPage && (
              <Grid container justifyContent="center">
                <LoadingButton
                  onClick={() => fetchNextPage()}
                  loading={isFetching || isLoading}
                  loadingIndicator="Loading…"
                  color="secondary"
                  variant="contained"
                  size="large"
                  sx={classes.loadBtn}
                >
                  show more
                </LoadingButton>
              </Grid>
            )}
          </>
        )}
      </Box>
    </>
  );
}

// Commented to Remove SSR
// export const getServerSideProps = withCSR(async () => {
//   const queryClient = new QueryClient();

//   try {
//     // fetching popular movies detail
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
// });

export default Popular;
