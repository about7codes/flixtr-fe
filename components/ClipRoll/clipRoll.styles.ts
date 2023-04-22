export const styles = {
  clipRoll: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    overflowX: "auto",
    margin: "10px 0",
  },
  clipItem: {
    position: "relative",
    width: "320px",
    height: "180px",
    overflow: "hidden",
    flex: "none",
    marginRight: "18px",
    borderRadius: "10px",
    "& .clipLink": {
      width: "inherit",
      height: "inherit",
    },
  },
  clipThumb: {
    width: "inherit",
    height: "inherit",
    position: "relative",
  },
  ytLogo: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "100%",
    height: "100%",
    transform: "translate(-50%,-50%)",
    zIndex: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  },
  ytLogoIco: {
    fontSize: "55px",
    color: "red",
  },
};
