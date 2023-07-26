import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Typography } from "@mui/material";

import PersonPoster from "../PersonPoster/PersonPoster";
import { PeopleResult } from "../../types/apiResponses";
import { styles as classes } from "./personTileSlider.styles";

type TileSliderProps = {
  title?: string;
  peopleData?: PeopleResult[];
};

const TileSlider = ({ title, peopleData }: TileSliderProps) => {
  if (!peopleData?.length) return null;

  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToScroll: 1,
    variableWidth: true,
    // centerPadding: "20px",
  };

  return (
    <Container>
      {title && (
        <Typography variant="h5" textAlign="center" sx={classes.headTxt}>
          {title}
        </Typography>
      )}
      <Box>
        <Slider {...settings}>
          {peopleData?.map((singlePersonData, index) => (
            <div key={index}>
              <PersonPoster singlePersonData={singlePersonData} />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default TileSlider;
