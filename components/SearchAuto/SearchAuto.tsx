import React from "react";
import { MediaType, SearchData } from "../../types/apiResponses";
import { Box, Paper } from "@mui/material";
import { styles as classes } from "./searchAuto.styles";
import PosterAlt from "../PosterAlt/PosterAlt";

type SearchAutoProps = {
  searchData?: SearchData;
};

const SearchAuto = ({ searchData }: SearchAutoProps) => {
  console.log("SearchData", searchData);

  return (
    <Paper sx={classes.searchAuto}>
      {searchData?.results?.slice(0, 4).map((media) => (
        <Box key={media.id}>
          {media.media_type === MediaType.Movie ? (
            <PosterAlt singleMovieData={media} />
          ) : media.media_type === MediaType.Tv ? (
            media.name
          ) : (
            "Person"
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default SearchAuto;
