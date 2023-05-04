import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

type Props = {};

const Loader = () => {
  return (
    <LinearProgress
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
      }}
    />
  );
};

export default Loader;
