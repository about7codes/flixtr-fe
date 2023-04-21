import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#191919",
    contrastText: "#fff",
  },
  secondary: {
    main: "#96bdd9",
    contrastText: "#fff",
  },
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#fff",
    },
    background: {
      default: "#191919",
    },
    primary: {
      main: "#222",
      contrastText: "#fff",
    },
    secondary: {
      main: "#96bdd9",
      contrastText: "#222",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            // backgroundColor: colors.primary.main,
            // color: colors.primary.contrastText,
            "& .MuiListItemIcon-root": {
              // color: colors.primary.contrastText,
            },
          },
          "&.Mui-selected:hover": {
            // backgroundColor: colors.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
