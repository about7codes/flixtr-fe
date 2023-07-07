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
    backgroundColor: "#000",
    borderRadius: "6px",
    // display: "flex",
    // flexWrap: "wrap",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr) )",
    justifyItems: "center",
    width: "100%",
    margin: "20px 0",
    maxHeight: "230px",
    overflow: "hidden",
    overflowY: "auto",
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
    "& #watch-iframe1": {
      backgroundColor: "primary.main",
    },
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
