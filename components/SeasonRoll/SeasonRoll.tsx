import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Box, Typography, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { ShowSeason } from "../../types/apiResponses";
import { styles as classes } from "./seasonRoll.styles";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type SeasonRollProps = {
  seasonList: ShowSeason[];
  showId: number;
  showName: string;
};

const SeasonRoll = ({ seasonList, showId, showName }: SeasonRollProps) => {
  if (!seasonList.length) return null;

  return (
    <Box>
      <Typography variant="h5">Seasons</Typography>
      <Grid container sx={classes.seasonRoll}>
        {seasonList.map(
          (season, index) =>
            season.season_number !== 0 && (
              <Grid item sx={classes.seasonItem} key={index}>
                <Link
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  href={`/tv/${showId}/${toUrlFriendly(showName)}/season/${
                    season.season_number
                  }`}
                >
                  <Grid sx={classes.seasonImg}>
                    {/* <Image
                      fill
                      placeholder="blur"
                      blurDataURL={blurData}
                      src={formatImgSrc(
                        "https://image.tmdb.org/t/p/w138_and_h175_face/",
                        season.poster_path
                      )}
                      sizes={formatImgSrc(
                        "https://image.tmdb.org/t/p/w138_and_h175_face/",
                        season.poster_path
                      )}
                      style={{ objectFit: "cover" }}
                      alt="backdrops"
                    /> */}

                    <LazyLoadImage
                      src={formatImgSrc(
                        "https://image.tmdb.org/t/p/w138_and_h175_face/",
                        season.poster_path
                      )}
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        width: "100%",
                        height: "100%",
                      }}
                      alt="seasons-cover"
                      effect="blur"
                    />

                    <Box sx={classes.seasonBadge}>{season.season_number}</Box>
                  </Grid>
                  <Grid sx={classes.seasonNames}>
                    <Typography sx={classes.seasonName}>
                      {season.name}
                    </Typography>
                    <Typography sx={classes.sub}>
                      {season.episode_count} episodes
                    </Typography>
                    <Typography sx={classes.sub}>{season.air_date}</Typography>
                  </Grid>
                </Link>
              </Grid>
            )
        )}
      </Grid>
    </Box>
  );
};

export default SeasonRoll;
