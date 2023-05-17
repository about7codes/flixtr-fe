import React from "react";
import { Grid, ButtonBase, Avatar, Typography } from "@mui/material";
import { styles as classes } from "./avatarSelector.styles";

type AvatarSelectorProps = {
  avatarPic: number;
  setAvatarPic: (selectedAvatarPic: number) => void;
};

const AvatarSelector = ({ avatarPic, setAvatarPic }: AvatarSelectorProps) => {
  return (
    <Grid container sx={classes.avatarMain}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <Grid
          key={num}
          sx={{
            ...classes.avatarBox,
            borderColor: avatarPic === num ? "secondary.main" : "transparent",
          }}
        >
          <ButtonBase
            sx={classes.avatarBtn}
            onClick={() => {
              if (avatarPic !== num) setAvatarPic(num);
            }}
          >
            <Avatar
              src={`/assets/${num}.png`}
              sx={classes.avatarIco}
              alt="Remy Sharp"
            />
          </ButtonBase>
        </Grid>
      ))}
      <Typography sx={classes.cap}>Choose profile pic</Typography>
    </Grid>
  );
};

export default AvatarSelector;
