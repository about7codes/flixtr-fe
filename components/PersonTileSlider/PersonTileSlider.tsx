import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';

import PersonPoster from "../PersonPoster/PersonPoster";
import { PeopleResult } from "../../types/apiResponses";
import { styles as classes } from "./personTileSlider.styles";

type TileSliderProps = {
  title?: string;
  peopleData?: PeopleResult[];
};

const TileSlider = ({ title, peopleData }: TileSliderProps) => {
  if (!peopleData?.length) return null;

  const sliderOptions = {
    slidesPerView: 7,
    pagination: false,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 2500,
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
          {peopleData?.map((singlePersonData, index) => (
            <SwiperSlide key={index} style={{ display: 'grid', placeContent: 'center' }}>
              <PersonPoster singlePersonData={singlePersonData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      
    </Container>
  );
};

export default TileSlider;
