export const styles = {
  castRoll: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    overflowX: "auto",
    margin: "10px 0",
    pb: "4px",
    scrollbarColor: "#616161 transparent",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#616161",
    },
  },
  headTxt: {
    "@media (max-width: 900px)": {
      fontSize: "18px",
    },
  },
  castItem: {
    backgroundColor: "secondary.main",
    color: "primary.main",
    borderRadius: "10px",
    marginRight: "18px",
    overflow: "hidden",
    width: "138px",
    flex: "none",
    "@media (max-width: 900px)": {
      width: "115px",
      marginRight: "7px",
    },
  },
  castImg: {
    position: "relative",
    height: "175px",
    "@media (max-width: 900px)": {
      height: "140px",
    },
  },
  castNames: {
    padding: "10px",
    "@media (max-width: 900px)": {
      padding: "7px",
    },
  },
  realName: {
    fontWeight: "bold",
    fontSize: "16px",
    "@media (max-width: 900px)": {
      fontSize: "14px",
    },
  },
  ogName: {
    fontSize: "14px",
    "@media (max-width: 900px)": {
      lineHight: "1.3",
      fontSize: "12px",
    },
  },
};
