import React from "react";
// import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./castRoll.styles";
import { Cast } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";
import Link from "next/link";

type CastRollProps = {
  castList: Cast[];
};

const CastRoll = ({ castList }: CastRollProps) => {
  if (!castList?.length) return null;

  // console.log("castList: ", castList);

  return (
    <Box>
      <Typography variant="h5" sx={classes.headTxt}>
        Casts
      </Typography>
      <Grid container sx={classes.castRoll}>
        {castList.map((cast) => (
          <Link
            key={cast.id}
            shallow
            style={{ display: "flex", WebkitTapHighlightColor: "transparent" }}
            href={`/person/${cast.id}/${toUrlFriendly(cast.name)}`}
          >
            <Grid item sx={classes.castItem}>
              <Grid sx={classes.castImg}>
                {/* <Image
                  fill
                  placeholder="blur"
                  blurDataURL={blurData}
                  src={formatImgSrc(
                    "https://image.tmdb.org/t/p/w138_and_h175_face/",
                    cast.profile_path
                  )}
                  sizes={formatImgSrc(
                    "https://image.tmdb.org/t/p/w138_and_h175_face/",
                    cast.profile_path
                  )}
                  style={{ objectFit: "cover" }}
                  alt="backdrops"
                /> */}

                <LazyLoadImage
                  src={formatImgSrc(
                    "https://image.tmdb.org/t/p/w138_and_h175_face/",
                    cast.profile_path
                  )}
                  style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={cast.name}
                  effect="blur"
                />
              </Grid>
              <Grid sx={classes.castNames}>
                <Typography sx={classes.realName}>{cast.name}</Typography>
                <Typography sx={classes.ogName}>{cast.character}</Typography>
              </Grid>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default CastRoll;
