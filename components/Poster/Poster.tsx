import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, CircularProgress, Typography } from "@mui/material";

import { styles as classes } from "./poster.styles";
import { MovieResult } from "../../types/apiResponses";
import {
  blurData,
  formatImgSrc,
  toPercent,
  toUrlFriendly,
} from "../../utils/utils";

type PosterProps = {
  singleMovieData: MovieResult;
};

const Poster = ({ singleMovieData }: PosterProps) => {
  console.log("singleMovieData:", singleMovieData);
  const { id, title, release_date, poster_path } = singleMovieData;
  const titleConverted = toUrlFriendly(title);

  return (
    <Box sx={classes.poster}>
      <Link
        shallow
        href={`/movie/${id}/${titleConverted}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Box sx={classes.posterUp}>
          <Image
            fill
            placeholder="blur"
            className="poster-img"
            blurDataURL={blurData}
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            sizes={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              poster_path
            )}
            style={{ objectFit: "cover", objectPosition: "top" }}
            alt={titleConverted}
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography
            variant="subtitle2"
            sx={classes.posterTitle}
            title={title}
          >
            {title}
          </Typography>
          <Typography variant="subtitle2" sx={classes.posterYear}>
            {new Date(release_date).getFullYear()}
          </Typography>
        </Box>

        <Box sx={classes.ratings}>
          <Box sx={classes.ratingsInner}>
            <CircularProgress
              color="secondary"
              variant="determinate"
              value={toPercent(singleMovieData.vote_average)}
            />
            <Box sx={classes.ratingsTxt}>
              <Typography
                title="Ratings"
                variant="caption"
                component="div"
                color="secondary"
              >{`${toPercent(singleMovieData.vote_average)}%`}</Typography>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Poster;
