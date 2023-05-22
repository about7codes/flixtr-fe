export const styles = {
  drawer: {
    ".MuiDrawer-paperAnchorLeft": {
      backgroundColor: "primary.main",
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
  },
  profileBtn: {
    p: "40px",
    display: "grid",
    placeContent: "center",
  },
  profileIco: {
    bgcolor: "secondary.main",
    width: 100,
    height: 100,
    p: 2,
    fontSize: "50px",
  },
};
