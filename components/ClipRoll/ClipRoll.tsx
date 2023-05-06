import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { styles as classes } from "./clipRoll.styles";
import { ClipResults } from "../../types/apiResponses";
import { blurData } from "../../utils/utils";

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
                <Image
                  fill
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                  blurDataURL={blurData}
                  src={"https://i.ytimg.com/vi/" + clip.key + "/hqdefault.jpg"}
                  sizes={
                    "https://i.ytimg.com/vi/" + clip.key + "/hqdefault.jpg"
                  }
                  alt={clip.name}
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
