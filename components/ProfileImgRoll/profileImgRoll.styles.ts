export const styles = {
  imgRoll: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    overflowX: "auto",
    margin: "20px 0",
  },
  imgItem: {
    position: "relative",
    width: "200px",
    height: "300px",
    overflow: "hidden",
    flex: "none",
    marginRight: "18px",
    borderRadius: "10px",
    "@media (max-width: 900px)": {
      width: "140px",
      height: "210px",
    },
  },
};
