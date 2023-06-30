import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styles as classes } from "./tvPoster.styles";
import { SeriesResult } from "../../types/apiResponses";
import {
  blurData,
  formatImgSrc,
  toPercent,
  toUrlFriendly,
} from "../../utils/utils";

type TvPosterProps = {
  singleShowData: SeriesResult;
};

const TvPoster = ({ singleShowData }: TvPosterProps) => {
  const { id, name, first_air_date, poster_path, vote_average } =
    singleShowData;
  const titleConverted = toUrlFriendly(name);

  return (
    <Box sx={classes.poster}>
      <Link
        shallow
        href={`/tv/${id}/${titleConverted}`}
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
          <Typography variant="subtitle2" sx={classes.posterTitle} title={name}>
            {name}
          </Typography>

          <Box sx={classes.posterYearMain}>
            <Typography variant="subtitle2" sx={classes.posterYear}>
              {new Date(first_air_date).getFullYear()}
            </Typography>

            <Typography variant="subtitle2" sx={classes.posterType}>
              TV
            </Typography>
          </Box>
        </Box>

        {vote_average ? (
          <Box sx={classes.ratings}>
            <Box sx={classes.ratingsInner}>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={toPercent(vote_average)}
              />
              <Box sx={classes.ratingsTxt}>
                <Typography
                  title="Ratings"
                  variant="caption"
                  component="div"
                  color="secondary"
                >{`${toPercent(vote_average)}%`}</Typography>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Link>
    </Box>
  );
};

export default TvPoster;
