import React from "react";
import Link from "next/link";
import { Box, Collapse, Paper, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { styles as classes } from "./searchAuto.styles";
import { MediaType, SearchData } from "../../types/apiResponses";
import PosterAlt from "../PosterAlt/PosterAlt";
import TvPosterAlt from "../TvPosterAlt/TvPosterAlt";
import PersonPosterAlt from "../PersonPosterAlt/PersonPosterAlt";
import { InfiniteData } from "@tanstack/react-query";

type SearchAutoProps = {
  searchData?: SearchData;
  searchVal?: string;
  isResultsVisible: boolean;
  isError: boolean;
};

const SearchAuto = ({
  searchVal,
  searchData,
  isResultsVisible,
}: SearchAutoProps) => {
  // console.log("SearchData", searchData);
  // const results = searchData?.pages[0].results

  return (
    <Paper sx={classes.searchAuto}>
      <Collapse in={isResultsVisible} timeout={{ enter: 300, exit: 500 }}>
        {searchData?.results?.slice(0, 4).map((media) => (
          <Box key={media.id}>
            {media.media_type === MediaType.Movie ? (
              <PosterAlt singleMovieData={media} />
            ) : media.media_type === MediaType.Tv ? (
              <TvPosterAlt singleShowData={media} />
            ) : (
              <PersonPosterAlt singlePersonData={media} />
            )}
          </Box>
        ))}

        {searchData?.results?.length && searchData?.results?.length > 4 ? (
          <Link href={"/search?q=" + (searchVal ?? "")} shallow>
            <Box
              color="secondary.main"
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "background.default",
                },
              }}
            >
              <Typography fontSize={12}>See more results</Typography>
              <LaunchIcon sx={{ fontSize: 18, ml: "5px" }} />
            </Box>
          </Link>
        ) : null}

        {searchData?.results?.length == 0 && (
          <Box
            color="secondary.main"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <Typography fontSize={12}>Nothing found</Typography>
            <SearchOffIcon sx={{ fontSize: 18, ml: "5px" }} />
          </Box>
        )}
      </Collapse>
    </Paper>
  );
};

export default SearchAuto;
