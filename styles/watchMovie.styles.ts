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
  btnGroup: {
    width: "100%",
    mt: "15px",
    padding: "0 24px",
    "@media (max-width: 900px)": {
      padding: "0 10px",
    },
  },
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
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
};
