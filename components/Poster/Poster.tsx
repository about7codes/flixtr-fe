import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { styles as classes } from "./poster.styles";
import Link from "next/link";

type PosterProps = {};

const Poster = () => {
  const id = 22;
  const title = "moviename";
  return (
    <Box sx={classes.poster}>
      <Link href={`/movie/${id}/${title}`}>
        <Box sx={classes.posterUp}>
          <Image
            className="poster-img"
            src={
              "https://image.tmdb.org/t/p/w220_and_h330_face/ccBe5BVeibdBEQU7l6P6BubajWV.jpg"
            }
            //   layout="fill"
            //   placeholder="blur"
            // objectFit={"cover"}
            // objectPosition={"top"}
            width={150}
            height={225}
            // blurDataURL={"https://image.tmdb.org/t/p/w780" + (type==="movie"|| type==="tv"?item.poster_path:item.profile_path)}
            alt={"movie"}
          />
        </Box>
        <Box sx={classes.posterDown}>
          <Typography variant="subtitle2">The Peripheral</Typography>
          <Typography variant="subtitle2">2022</Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default Poster;
