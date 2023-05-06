import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { styles as classes } from "./tvPosterAlt.styles";
import { SeriesResult } from "../../types/apiResponses";
import {
  blurData,
  formatImgSrc,
  toPercent,
  toUrlFriendly,
} from "../../utils/utils";

type TvPosterAltProps = {
  singleShowData: SeriesResult;
};

const TvPosterAlt = ({ singleShowData }: TvPosterAltProps) => {
  const { id, name, first_air_date, poster_path, vote_average } =
    singleShowData;
  const titleConverted = toUrlFriendly(name);

  return (
    <Link href={`/tv/${id}/${titleConverted}`} style={{ display: "block" }}>
      <Grid container sx={classes.posterAlt}>
        <Grid item sx={classes.posterImg}>
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
        </Grid>
        <Grid item sx={classes.posterTxt}>
          <Typography variant="h6" sx={classes.posterTxtHead}>
            {name}
          </Typography>
          <Box sx={classes.posterTxtSub}>
            <Box>{first_air_date}</Box>
            <Box sx={classes.posterType}>TV</Box>
            <Box>{`${toPercent(vote_average)}%`}</Box>
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
};

export default TvPosterAlt;
