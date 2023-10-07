import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { styles as classes } from "./personPoster.styles";
import { PeopleResult } from "../../types/apiResponses";
import { formatImgSrc, toUrlFriendly } from "../../utils/utils";

type PersonPosterProps = {
  singlePersonData: PeopleResult;
};

const PersonPoster = ({ singlePersonData }: PersonPosterProps) => {
  const { id, name, profile_path, known_for_department } = singlePersonData;
  const nameConverted = toUrlFriendly(name);

  return (
    <Box sx={classes.poster}>
      <Link href={`/person/${id}/${nameConverted}`} shallow>
        <Box sx={classes.posterUp}>
          {/* <Image
            fill
            placeholder="blur"
            className="poster-img"
            blurDataURL={blurData}
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              profile_path
            )}
            sizes={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              profile_path
            )}
            style={{ objectFit: "cover", objectPosition: "top" }}
            alt={nameConverted}
          /> */}

          <LazyLoadImage
            src={formatImgSrc(
              "https://image.tmdb.org/t/p/w220_and_h330_face/",
              profile_path
            )}
            style={{
              objectFit: "cover",
              objectPosition: "top",
              width: "100%",
              height: "100%",
            }}
            className="poster-img"
            alt={nameConverted}
            effect="blur"
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography variant="subtitle2" sx={classes.posterTitle} title={name}>
            {name}
          </Typography>
          <Typography variant="subtitle2" sx={classes.posterDept}>
            {known_for_department}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default PersonPoster;
