export const styles = {
  poster: {
    color: "secondary.main",
    maxWidth: "150px",
    width: "100%",
    margin: "10px",
    "& .poster-img": {
      borderRadius: "8px",
    },
    "&:hover": {
      color: "#fff",
    },
  },
  posterUp: {
    position: "relative",
    width: "150px",
    height: "225px",
  },
  posterDown: {
    paddingTop: "10px",
  },
  posterTitle: {
    fontSize: "0.85rem",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "500",
  },
};
