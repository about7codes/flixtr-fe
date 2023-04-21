import React from "react";
import { GetServerSidePropsContext } from "next";
import { MovieResult } from "../../../../types/apiResponses";

type MovieInfoProps = {
  singleMovieData: MovieResult;
};

function MovieInfo({ singleMovieData }: MovieInfoProps) {
  console.log('movieInfo: ', singleMovieData);
  return <div>
    <div>MovieInfo</div>
    <div>id: {singleMovieData.id}</div>
    <div>name: {singleMovieData.title}</div>
    <div>MovieInfo</div>
  </div>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  try {
    // fetching single movie details
    const res = await fetch(`https://api.themoviedb.org/3/movie/${ctx.query.id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,videos,credits,recommendations,similar`);
    const data = await res.json();

    // failure if 'success' property exists
    if (data.hasOwnProperty('success')) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        singleMovieData: data
      }
    };

  } catch (error) {
    console.log(error);
    return {
      notFound: true
    };
  }

}

export default MovieInfo;
