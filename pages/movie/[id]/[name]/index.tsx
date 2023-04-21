import React from "react";
import { GetServerSidePropsContext } from "next";

type MovieInfoProps = {};

function MovieInfo({ data }: any) {
  // console.log('movieInfo: ', data);
  return <div>
    <div>MovieInfo</div>
    <div>id: {data.id}</div>
    <div>name: {data.title}</div>
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
        data
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
