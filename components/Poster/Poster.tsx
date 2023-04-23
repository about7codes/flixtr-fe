import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { styles as classes } from "./poster.styles";
import Link from "next/link";
import { MovieResult } from "../../types/apiResponses";
import { toUrlFriendly } from "../../utils/utils";

type PosterProps = {
  singleMovieData: MovieResult
};

const Poster = ({ singleMovieData }: PosterProps) => {
  const { id, title, release_date } = singleMovieData;


  const titleConverted = toUrlFriendly(title);

  return (
    <Box sx={classes.poster}>
      <Link href={`/movie/${id}/${titleConverted}`}>
        <Box sx={classes.posterUp}>
          <Image
            className="poster-img"
            src={
              "https://image.tmdb.org/t/p/w220_and_h330_face/" + singleMovieData.poster_path
            }
            //   layout="fill"
            //   placeholder="blur"
            // objectFit={"cover"}
            // objectPosition={"top"}
            width={150}
            height={225}
            // blurDataURL={"https://image.tmdb.org/t/p/w780" + (type==="movie"|| type==="tv"?item.poster_path:item.profile_path)}
            alt={"poster"}
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography variant="subtitle2" sx={classes.posterTitle}>{title}</Typography>
          <Typography variant="subtitle2">{new Date(release_date).getFullYear()}</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Poster;
