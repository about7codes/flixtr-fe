import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Typography, Box } from '@mui/material';
import { MovieResult, SeriesResult } from '../../types/apiResponses';
import Poster from '../Poster/Poster';
import TvPoster from '../TvPoster/TvPoster';

type TvTileSliderProps = {
  title?: string;
  seriesData?: SeriesResult[];
}

const TvTileSlider = ({ title, seriesData }: TvTileSliderProps) => {
  if (!seriesData?.length) return null;

  // console.log("TileSlider", seriesData);
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
          {seriesData?.map((singleShowData, index) => (
            <div key={index}>
              <TvPoster singleShowData={singleShowData} />
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}

export default TvTileSlider;