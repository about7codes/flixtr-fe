import { Skeleton, Box } from "@mui/material";
import { styles as classes } from "./skeletonMovieSlider.styles";

const SkeletonMovieSlider = () => {

  return (
    <Box sx={classes.container}>
      <Skeleton variant="rounded" sx={classes.tile} />
      <Skeleton variant="rounded" sx={classes.tileCenter} />
      <Skeleton variant="rounded" sx={classes.tile} />
    </Box>
  );
}

export default SkeletonMovieSlider;