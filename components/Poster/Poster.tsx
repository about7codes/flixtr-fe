import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { styles as classes } from "./poster.styles";
import { MovieResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type PosterProps = {
  singleMovieData: MovieResult
};

const Poster = ({ singleMovieData }: PosterProps) => {

  const { id, title, release_date, poster_path } = singleMovieData;
  const titleConverted = toUrlFriendly(title);

  return (
    <Box sx={classes.poster}>
      <Link href={`/movie/${id}/${titleConverted}`} shallow>
        <Box sx={classes.posterUp}>
          <Image
            fill
            placeholder="blur"
            className="poster-img"
            blurDataURL={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            src={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            sizes={formatImgSrc('https://image.tmdb.org/t/p/w220_and_h330_face/', poster_path)}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            alt={titleConverted}
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography variant="subtitle2" sx={classes.posterTitle} title={title}>{title}</Typography>
          <Typography variant="subtitle2">{new Date(release_date).getFullYear()}</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Poster;
