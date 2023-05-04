import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import CustomHead from "../../components/CustomHead/CustomHead";
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { MovieQueryKey } from "../../hooks/movies.hooks";
import { useRouter } from "next/router";
import { getSearchQuery } from "../../api/search.api";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid } from "@mui/material";
import Poster from "../../components/Poster/Poster";
import { styles as classes } from "../../styles/styles";
import { MediaType } from "../../types/apiResponses";
import PersonPoster from "../../components/PersonPoster/PersonPoster";
import TvPoster from "../../components/TvPoster/TvPoster";

type SearchPageProps = {};

function SearchPage({}: SearchPageProps) {
  const router = useRouter();
  const { q } = router.query;

  const {
    data: searchResults,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    refetch,
  } = useSearchPageQuery(q);
  console.log("searchResults: ", searchResults);

  useEffect(() => {
    refetch();
  }, [q]);

  return (
    <>
      <CustomHead title={"Search result for " + q} media_type={"movie"} />

      <Box sx={classes.pageContainer}>
        <Typography variant="h4" sx={classes.headTxt}>
          Search results for: {q}
        </Typography>
        <Grid container sx={classes.moviesContainer}>
          {searchResults?.pages.map((page) =>
            page.results.map((media) => (
              <Grid item key={media.id}>
                {media.media_type === MediaType.Movie ? (
                  <Poster singleMovieData={media} />
                ) : media.media_type === MediaType.Tv ? (
                  <TvPoster singleShowData={media} />
                ) : (
                  <PersonPoster singlePersonData={media} />
                )}
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

export const useSearchPageQuery = (searchQuery?: string | string[]) => {
  return useInfiniteQuery(
    [MovieQueryKey.SearchPageQuery],
    ({ pageParam = 1 }) => getSearchQuery(pageParam, searchQuery),
    {
      getNextPageParam: ({ page, total_pages }) => {
        return page < total_pages ? page + 1 : undefined;
      },
      select: (data) => {
        return data;
      },
      enabled: !!searchQuery,
    }
  );
};

export default SearchPage;
