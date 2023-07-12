import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography } from "@mui/material";

import { styles as classes } from "./movieSlider.styles";
import { MovieResult } from "../../types/apiResponses";
import { blurData, formatImgSrc, toUrlFriendly } from "../../utils/utils";
import Link from "next/link";
import { useIsMobile } from "../../hooks/app.hooks";

type MovieSliderProps = {
  movieData?: MovieResult[];
};

const MovieSlider = ({ movieData }: MovieSliderProps) => {
  const isMobile = useIsMobile();

  if (!movieData?.length) return null;

  const config = {
    arrows: false,
    dots: false,
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: -1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "ease",
    centerPadding: isMobile ? "20px" : "50px",
  };

  return (
    <Box sx={classes.mediaSlide}>
      <div>
        <Slider {...config}>
          {movieData?.map(({ id, title, backdrop_path, overview }, i) => (
            <div key={id}>
              <Box sx={classes.mediaItem}>
                <Box sx={classes.mediaItemBanner}>
                  <Box sx={classes.mediaItemImg}>
                    <Image
                      fill
                      placeholder="blur"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      blurDataURL={blurData}
                      src={formatImgSrc(
                        "https://image.tmdb.org/t/p/original",
                        backdrop_path
                      )}
                      sizes={formatImgSrc(
                        "https://image.tmdb.org/t/p/w780",
                        backdrop_path
                      )}
                      alt={title}
                    />
                  </Box>
                </Box>

                <Box
                  className="media-item-content"
                  sx={classes.mediaItemContent}
                >
                  <Box sx={classes.miContent}>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={classes.rating}
                    >
                      #{i + 1} Spotlight
                    </Typography>
                    <Typography variant="h4" sx={classes.title}>
                      {title}
                    </Typography>
                  </Box>
                  <Box sx={classes.miContent}>
                    <Typography variant="body1" sx={classes.overview}>
                      {overview}
                    </Typography>
                  </Box>
                  <Box sx={classes.miBtns}>
                    <Link
                      href={`/movie/${id}/${toUrlFriendly(title)}/watch`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={classes.watchBtn}
                      >
                        Watch now
                      </Button>
                    </Link>
                    <Link
                      href={`/movie/${id}/${toUrlFriendly(title)}`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={classes.detailBtn}
                      >
                        Details
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default MovieSlider;
