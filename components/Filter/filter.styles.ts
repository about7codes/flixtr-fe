import { colors } from "../../theme";

export const styles = {
  filter: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  selectMain: {
    m: "20px 0",
  },
  selectLabel: { color: "secondary.main" },
  select: {
    color: "#fff",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "secondary.main",
      "& .Mui-focused": {
        borderColor: "#fff",
      },
    },
    ".MuiSvgIcon-root": {
      color: "secondary.main",
    },
  },
  selectMenu: {
    "& .MuiMenu-list, & .MuiMenu-paper": {
      background: "#333",
    },
    "& .Mui-selected, & .Mui-selected:hover": {
      backgroundColor: `${colors.secondary.main} !important`,
      color: `${colors.secondary.contrastText} !important`,
    },
  },
};
