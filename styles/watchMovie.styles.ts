export const styles = {
  main: {
    padding: "0 24px",
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  mustWatch: {
    p: "20px",
    width: "100%",
    "@media (max-width: 900px)": {
      p: "10px",
    },
  },
  watchHead: {
    padding: "0 24px",
    color: "secondary.main",
    marginTop: "20px",
    marginBottom: "20px",
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
  con: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    padding: "20px 0",
    "& .con2": {
      "@media (max-width: 620px)": {
        display: "none",
      },
    },
    "& .con3": {
      "@media (max-width: 950px)": {
        display: "none",
      },
    },
    "& .con4": {
      "@media (max-width: 1240px)": {
        display: "none",
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
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  moviePlayer: {
    width: "100%",
    "& #watch-iframe1, & #watch-iframe2": {
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
};
