export const styles = {
  watchHead: {
    color: "secondary.main",
    marginTop: "20px",
    "& .backToInfo": {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "14px",
      marginBottom: "20px",
      "&:hover": {
        color: "text.primary",
      },
    },
  },
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  episodeBtns: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "20px 0",
  },
  episodeBtnBox: {
    flex: "1",
    m: 1,
  },
  episodeBtn: {
    width: "100%",
    whiteSpace: "nowrap",
  },
  moviePlayer: {
    width: "100%",
    "& iframe": {
      border: 0,
      marginTop: "20px",
      width: "100%",
      height: "calc(90vh - 80px)",
      boxSizing: "borderBox",
      "@media (max-width: 600px)": {
        // marginTop: "60px",
        width: "100%",
        height: "calc(35vh - 60px)",
        boxSizing: "border-box",
      },
    },
  },
};
