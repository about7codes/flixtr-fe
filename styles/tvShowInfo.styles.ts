export const styles = {
  top: {
    position: "relative",
    padding: "0px 20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageBox: {
    margin: "40px 0px",
    // maxWidth: "300px",
    height: "450px",
    flex: "0 1 300px",
    position: "relative",
    "@media (max-width: 1000px)": {
      height: "330px",
      flex: "0 1 220px",
    },
  },
  detailMid: {
    flex: "1 1 320px",
    padding: "40px 30px",
  },
  mediaTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  belowTitle: {
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "auto 1fr",
    fontSize: "13px",
  },
  mediaBtns: {
    margin: "10px 0",
  },
  detailLast: {
    flex: "0 1 150px",
    display: "grid",
    placeContent: "center",
    padding: "40px 25px",
    background: "rgba(255,255,255, 0.1)",
    fontSize: "13px",
    "@media (max-width: 900px)": {
      flex: "1 1 150px",
      placeContent: "start",
    },
  },
  bulletHead: {
    fontWeight: "bold",
  },
  bulletInfo: {
    marginBottom: "5px",
    "& .bullet-link": {
      display: "block",
      maxWidth: "220px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "secondary.main",
    },
  },
  backgroundCover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    filter: "blur(20px)",
    opacity: "0.5",
    transform: "scale(1.2)",
    zIndex: "-1",
  },
};
