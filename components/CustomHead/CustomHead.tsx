import React from 'react'
import Head from 'next/head';

type CustomHeadProps = {
  title: string;
  media_type: "movie" | "tv";
}

const CustomHead = ({ title, media_type }: CustomHeadProps) => {
  const overview = 'Flixtr is the largest free streaming platform for movies and tv shows. Collaborative media and info service featuring high quality content for a huge selection of titles and new releases! Available in all countries.'
  return (
    <Head>
      <title>{`${title} ${media_type == "movie" ? "| Movies" : "| Tv Shows"} - Flixtr`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="title" content={"Flixtr - Watch Movies & TV Shows"} />
      <meta name="description" content={overview} />
      <meta
        name="keywords"
        content="Movies, TV Shows, Streaming, Reviews, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Flixtr" />
      <meta property="og:title" content={"Flixtr - Watch Movies & TV Shows"} />
      <meta property="og:description" content={overview} />
    </Head>
  )
}

export default CustomHead;