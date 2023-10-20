import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

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
  const sliderOptions = {
    slidesPerView: 7,
    pagination: false,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
      },
      420: {
        slidesPerView: 3,
      },
      550: {
        slidesPerView: 4,
      },
      650: {
        slidesPerView: 5,
      },
      786: {
        slidesPerView: 6,
      },
      900: {
        slidesPerView: 5,
      },
      1050: {
        slidesPerView: 6,
      },
      1200: {
        slidesPerView: 7,
      }
    }
  };

  return (
    <Container>
      {title && (
        <Typography variant="h5" textAlign="center" sx={classes.headTxt}>
          {title}
        </Typography>
      )}

      <Box className="multi-slider">
        <Swiper
          {...sliderOptions}
          modules={[Autoplay, Navigation]}
        >
          {movieData?.map((singleMovieData, index) => (
            <SwiperSlide key={index} style={{ display: 'grid', placeContent: 'center' }}>
              <Poster singleMovieData={singleMovieData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

    </Container>
  );
};

export default TileSlider;
