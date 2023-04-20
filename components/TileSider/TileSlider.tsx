import React from "react";
import Image from "next/image";
import { Box, Container, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styles as classes } from "./tileSlider.styles";
import Poster from "../Poster/Poster";
import { MovieData } from "../../types/apiResponses";

type TileSliderProps = {
  movieData?: MovieData[];
};

const TileSlider = ({ movieData }: TileSliderProps) => {
  console.log("TileSlider", movieData);
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    variableWidth: true,
    // centerPadding: "20px",
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Trending Movies</Typography>
        <Typography variant="body1">
          Here are some of the most recent movies recommended by our community
        </Typography>
      </Box>
      <Box>
        <Slider {...settings}>
          {[0, 1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num}>
              <Poster />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TileSlider;
