import { Stack, Skeleton, Box } from "@mui/material";
import { styles as classes } from "./skeletonSlider.styles";

const SkeletonSlider = () => {
  const numOfSkeletons = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Box sx={classes.container}>
      {
        numOfSkeletons.map((num: number) => (
          <Stack key={num} spacing={1} sx={classes.tile}>
            <Skeleton variant="rounded" sx={classes.image} />
            <Skeleton variant="text" sx={classes.text} />
            <Skeleton variant="text" sx={classes.text} />
          </Stack>
        ))
      }
    </Box>
  );
}

export default SkeletonSlider;