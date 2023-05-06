import React from "react";
import Image from "next/image";
import { Box, Grid } from "@mui/material";
import { styles as classes } from "./imgRoll.styles";
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
            <Image
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUuMy3HQADlgGqs+StuAAAAABJRU5ErkJggg=="
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
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImgRoll;
