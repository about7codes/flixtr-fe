export const styles = {
  seasonRoll: {
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
  seasonItem: {
    backgroundColor: "secondary.main",
    color: "primary.main",
    borderRadius: "10px",
    marginRight: "18px",
    overflow: "hidden",
    width: "138px",
    flex: "none",
    transition: "transform .4s ease",
    "&:hover": {
      transform: "scale(.9)",
      transition: "transform .4s ease",
    },
    "@media (max-width: 900px)": {
      width: "110px",
      marginRight: "7px",
    },
  },
  seasonImg: {
    position: "relative",
    height: "175px",
    "@media (max-width: 900px)": {
      height: "140px",
    },
  },
  seasonBadge: {
    position: "absolute",
    top: "0px",
    right: 0,
    width: "25px",
    height: "20px",
    borderRadius: "0px 10px",
    background: "red",
    color: "text.primary",
    fontSize: "14px",
    display: "grid",
    placeContent: "center",
  },
  seasonNames: {
    padding: "10px",
    "@media (max-width: 900px)": {
      padding: "7px",
    },
  },
  seasonName: {
    fontWeight: "bold",
    fontSize: "16px",
    "@media (max-width: 900px)": {
      fontSize: "14px",
    },
  },
  sub: {
    fontSize: "14px",
    "@media (max-width: 900px)": {
      fontSize: "12px",
    },
  },
};
