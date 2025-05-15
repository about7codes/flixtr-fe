export const styles = {
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
  backIco: {
    marginRight: "5px",
    fontSize: "14px",
  },
  tvconsole: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap-reverse",
    width: "100%",
    padding: "16px 32px 0 32px",
    flexDirection: "row",
    "@media (max-width: 900px)": {
      flexDirection: "column-reverse",
      padding: "16px 25px 0 25px",
      alignItems: "center",
    },
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
      padding: "8px 15px 0 15px",
      alignItems: "center",
    },
  },
  tvconsoleTop: {
    display: "flex",
    flex: 1,
    gap: 1,
    paddingRight: "10px",
    "@media (max-width: 988px)": {
      paddingRight: 0,
      justifyContent: "space-between",
      width: "100%",
    },
  },
  tvconsoleBottom: {
    display: "flex",
    alignItems: "center",
    bgcolor: "#2b2b2b",
    borderRadius: "4px 4px 0 0",
    p: "0px 8px 0px 8px",
  },
  navButtons: {
    width: "100%",
    maxWidth: "400px",
    "& .MuiButtonGroup-root": {
      width: "100%",
    },
    "@media (max-width: 988px)": {
      maxWidth: "100%",
      mb: "20px",
    },
    "@media (max-width: 768px)": {
      mb: "15px",
    },
  },
  navButton: {
    borderRadius: 0,
    color: "secondary.main",
    backgroundColor: "#2b2b2b",
    "& .MuiTypography-root": {
      color: "inherit",
    },
    "&.Mui-disabled": {
      backgroundColor: "#2b2b2b",
      // backgroundColor: "#212121",
      color: "#424242",
    },
    "@media (max-width: 988px)": {
      borderRadius: "4px",
    },
  },
  floatMode: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    width: "100%",
  },
  textContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mx: 1,
  },
  text1: {
    fontWeight: "bold",
    fontSize: { xs: "12px", sm: "14px" },
  },
  text2: {
    display: "block",
    lineHeight: 1.1,
    fontSize: { xs: "10px", sm: "12px" },
  },
  seasonSwitcher: {
    maxWidth: { sm: "100%", md: "300px" },
    width: "100%",
  },
  seasonSelect: {
    width: "100%",
    "& .MuiInputBase-root, & .MuiInputBase-root:hover, & .Mui-focused": {
      // backgroundColor: "rgba(255,255,255, 0.1)",
      backgroundColor: "#2b2b2b",
    },
    "& .MuiSelect-select": {
      fontSize: "14px",
    },
    "& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused": {
      color: "secondary.main",
      background: "none",
      fontSize: "14px",
      top: "3px",
    },
    "& .MuiSvgIcon-root": {
      color: "secondary.main",
    },
  },
  seasonSelectItem: {
    "&.MuiMenuItem-root:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    "&.MuiMenuItem-root.Mui-selected": {
      backgroundColor: "secondary.main",
      color: "secondary.contrastText",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "secondary.main",
      color: "secondary.contrastText",
    },
  },
  episodeBtns: {
    backgroundColor: "#000",
    borderRadius: "6px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(85px, 1fr) )",
    justifyItems: "center",
    width: "100%",
    margin: "20px",
    mt: 0,
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
      mt: 0,
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
  alertBar: {
    backgroundColor: "#addc3512",
    color: "secondary.main",
    padding: "0 10px",
    m: "0 24px 0 24px",
    "@media (max-width: 900px)": {
      width: "calc(100% - 20px)",
      m: "0px 10px 0 10px",
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
