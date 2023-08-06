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
import { useExploreMovies } from "../../hooks/movies.hooks";
import CustomHead from "../../components/CustomHead/CustomHead";
import { IConutry, countries } from "../../utils/countries";

function Explore() {
  const [country, setCountry] = React.useState<IConutry | undefined>();

  const {
    data: exploreMovies,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useExploreMovies(country);
  // console.log("ExploreMovies: ", ExploreMovies);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = countries.find(
      (country) => country.name === event.target.value
    );

    setCountry(selectedCountry);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <CustomHead title="Explore movies to watch." media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Explore movies
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
              MenuProps={{ sx: classes.selectMenu }}
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
              {exploreMovies?.pages.map((page) =>
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

export default Explore;
