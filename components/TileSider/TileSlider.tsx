import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography } from "@mui/material";
import Poster from "../Poster/Poster";
import { MovieResult } from "../../types/apiResponses";
import { styles as classes } from "./tileSlider.styles";

type TileSliderProps = {
  title?: string;
  movieData?: MovieResult[];
};

const TileSlider = ({ title, movieData }: TileSliderProps) => {
  if (!movieData?.length) return null;

  // console.log("TileSlider", movieData);
  const settings = {
    arrows: true,
    dots: false,
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
      {title && <Typography variant='h5' textAlign='center'>{title}</Typography>}
      <Box>
        <Slider {...settings}>
          {movieData?.map((singleMovieData, index) => (
            <div key={index}>
              <Poster singleMovieData={singleMovieData} />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TileSlider;
