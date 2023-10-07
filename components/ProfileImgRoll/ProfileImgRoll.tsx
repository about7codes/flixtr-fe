import React from "react";
// import Image from "next/image";
import { Box, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./profileImgRoll.styles";
import { formatImgSrc } from "../../utils/utils";

type ImgRollProps = {
  imageList: { file_path: string }[];
};

const ImgRoll = ({ imageList }: ImgRollProps) => {
  if (!imageList.length) return null;

  return (
    <Box>
      <Grid container sx={classes.imgRoll}>
        {imageList.map((imageItem) => (
          <Grid item sx={classes.imgItem} key={imageItem.file_path}>
            {/* <Image
              fill
              placeholder="blur"
              blurDataURL={blurData}
              src={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                imageItem.file_path
              )}
              sizes={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                imageItem.file_path
              )}
              style={{ objectFit: "cover" }}
              alt="backdrops"
            /> */}

            <LazyLoadImage
              src={formatImgSrc(
                "https://image.tmdb.org/t/p/w780",
                imageItem.file_path
              )}
              style={{
                objectFit: "cover",
                objectPosition: "top",
                width: "100%",
                height: "100%",
              }}
              alt="profile-cover"
              effect="blur"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImgRoll;
