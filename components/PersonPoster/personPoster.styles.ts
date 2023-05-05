export const styles = {
  poster: {
    position: "relative",
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
    "@media (max-width: 900px)": {
      margin: "10px 3px",
      maxWidth: "108px",
    },
  },
  posterUp: {
    position: "relative",
    width: "150px",
    height: "225px",
    "@media (max-width: 900px)": {
      width: "108px",
      height: "162px",
    },
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
    "@media (max-width: 900px)": {
      fontSize: "11px",
    },
  },
  posterDept: {
    "@media (max-width: 900px)": {
      fontSize: "11px",
    },
  },
};
