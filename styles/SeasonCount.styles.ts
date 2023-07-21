export const styles = {
  watchHead: {
    padding: "0 24px",
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
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  episodeBtns: {
    backgroundColor: "#000",
    borderRadius: "6px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr) )",
    justifyItems: "center",
    width: "100%",
    margin: "20px",
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
    "@media (max-width: 900px)": {
      margin: "20px 10px",
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
        width: "100%",
        height: "calc(35vh - 60px)",
        boxSizing: "border-box",
      },
    },
  },
  btnGroup: {
    width: "calc(100% - 48px)",
    m: "15px 24px 0 24px",
    "@media (max-width: 900px)": {
      width: "calc(100% - 20px)",
      m: "15px 10px 0 10px",
    },
  },
  mustWatch: {
    width: "100%",
    p: "20px",
    "@media (max-width: 900px)": {
      p: "10px",
    },
  },
};
