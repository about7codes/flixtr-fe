import React from "react";
// import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./clipRoll.styles";
import { ClipResults } from "../../types/apiResponses";

type ClipRollProps = {
  clipList: ClipResults[];
};

const ClipRoll = ({ clipList }: ClipRollProps) => {
  if (!clipList.length) return null;

  return (
    <Box>
      <Typography variant="h5" sx={classes.headTxt}>
        Clips & Trailers
      </Typography>

      <Grid container sx={classes.clipRoll}>
        {clipList.map((clip) => (
          <Box key={clip.key} sx={classes.clipItem}>
            <a
              href={"https://www.youtube.com/watch?v=" + clip.key}
              target="_blank"
              rel="noreferrer"
              className="clipLink"
            >
              <Box sx={classes.clipThumb}>
                {/* <Image
                  fill
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                  blurDataURL={blurData}
                  src={"https://i.ytimg.com/vi/" + clip.key + "/hqdefault.jpg"}
                  sizes={
                    "https://i.ytimg.com/vi/" + clip.key + "/hqdefault.jpg"
                  }
                  alt={clip.name}
                /> */}

                <LazyLoadImage
                  src={"https://i.ytimg.com/vi/" + clip.key + "/hqdefault.jpg"}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={clip.name}
                  effect="blur"
                />

                <Box sx={classes.ytLogo}>
                  <YouTubeIcon sx={classes.ytLogoIco} />
                </Box>
              </Box>
            </a>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ClipRoll;
