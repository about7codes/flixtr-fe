import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { MovieResult, MovieData } from "../../types/apiResponses";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import Poster from "../../components/Poster/Poster";

type PopularProps = {};

function Popular() {
  const [page, setPage] = useState(1);
  const { data: popularMovies, isLoading, isPreviousData } = usePopularMovies(page);
  const [allMovies, setAllMovies] = useState(popularMovies || []);
  console.log('popularMovies: ', popularMovies)
  console.log('isPreviousData: ', isPreviousData)

  if (isLoading) return (<LinearProgress sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%'
  }} />);

  const loadMore = (): void => {
    const oldMovies = [...allMovies];
    setPage(prev => prev + 1);
    if (!isPreviousData) setAllMovies([...oldMovies, ...(popularMovies || [])]);
  }

  return (
    <Box>
      <Grid container justifyContent='center'>
        {allMovies?.map((movie, i) => (
          <Grid item key={i}>
            <Poster singleMovieData={movie} />

          </Grid>
        ))}

      </Grid>
      <Button onClick={loadMore} color="secondary" variant="contained">
        mo movies
      </Button>
    </Box>
  );
}

const getPopularMovies = async (pageNum: number): Promise<MovieResult[]> => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${pageNum}`
    );
    const movieData: MovieData = await movieRes.json();

    if (movieData.hasOwnProperty("success"))
      throw new Error("Api call failed, check console.");

    return movieData.results;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed, check console.");
  }
}

const usePopularMovies = (pageNum: number) => {
  return useQuery({ queryKey: ['popularMovies', pageNum], queryFn: () => getPopularMovies(pageNum), keepPreviousData: true });
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const pageNum = 1;

  try {
    // fetching popular movies detail
    await queryClient.fetchQuery(['popularMovies', pageNum], () => getPopularMovies(pageNum));

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    }
  }
}

export default Popular;
