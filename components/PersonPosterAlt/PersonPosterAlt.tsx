import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";

import { styles as classes } from "./personPosterAlt.styles";
import { Gender, PeopleResult } from "../../types/apiResponses";
import { blurData, formatImgSrc, toUrlFriendly } from "../../utils/utils";

type PersonPosterAltProps = {
  singlePersonData: PeopleResult;
};

const PersonPosterAlt = ({ singlePersonData }: PersonPosterAltProps) => {
  const { id, name, gender, profile_path, known_for_department, known_for } =
    singlePersonData;
  const nameConverted = toUrlFriendly(name);

  return (
    <Link href={`/person/${id}/${nameConverted}`} style={{ display: "block" }}>
      <Grid container sx={classes.posterAlt}>
        <Grid item sx={classes.posterImg}>
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
        </Grid>
        <Grid item sx={classes.posterTxt}>
          <Typography variant="h6" sx={classes.posterTxtHead}>
            {name}
          </Typography>
          <Box sx={classes.posterTxtSub}>
            <Box>{gender === Gender.Male ? "Male" : "Female"}</Box>
            <Box sx={classes.posterType}>{known_for_department}</Box>
            <Box>{known_for[0]?.title || known_for[0]?.name || "N/A"}</Box>
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
};

export default PersonPosterAlt;
