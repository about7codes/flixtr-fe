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

function Popular() {
  const {
    data: popularMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = usePopularMovies();
  // console.log("popularMovies: ", popularMovies);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Popular movies to watch." media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Popular movies
        </Typography>

        <Box>
          <FormControl fullWidth color="secondary">
            <InputLabel color="secondary" id="demo-simple-select-label">
              Age
            </InputLabel>
            <Select
              color="secondary"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              sx={{
                color: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                  "& .Mui-focused": {
                    borderColor: "#fff",
                  },
                },
                ".MuiSvgIcon-root": {
                  color: "secondary.main",
                },
              }}
              MenuProps={{
                sx: {
                  "& .MuiMenu-list, & .MuiMenu-paper": {
                    background: "#333",
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem color="secondary" value={10}>
                Ten
              </MenuItem>
              <MenuItem value={"en"}>America</MenuItem>
              <MenuItem value={"hi"}>India</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
