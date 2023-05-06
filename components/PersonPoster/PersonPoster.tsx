import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

import { styles as classes } from "./personPoster.styles";
import { PeopleResult } from "../../types/apiResponses";
import { blurData, formatImgSrc, toUrlFriendly } from "../../utils/utils";

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
          <Image
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
