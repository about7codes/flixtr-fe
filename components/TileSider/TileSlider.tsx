import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container } from "@mui/material";
import Poster from "../Poster/Poster";
import { MovieResult } from "../../types/apiResponses";
import { styles as classes } from "./tileSlider.styles";

type TileSliderProps = {
  movieData?: MovieResult[];
};

const TileSlider = ({ movieData }: TileSliderProps) => {
  // console.log("TileSlider", movieData);
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
