import { Theme } from "@mui/material";

export const styles = {
  sign: {
    display: "flex",
    alignItems: "center",
    height: "calc(100% - 64px)",
  },
  signInner: {
    maxWidth: "370px",
    margin: "30px auto",
    flexDirection: "column",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#222",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  logo: {},
  signInnerHeader: {
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  field: {
    alignItems: "flex-end",
  },
  fieldInput: {
    flex: 1,
  },
  input: {
    label: {
      color: "secondary.main",
    },
    "& .MuiInputBase-root:before": {
      borderColor: "secondary.main",
    },
  },
  submit: {
    marginTop: "15px",
  },
  altBtn: {
    textDecoration: "none",
  },
  links: {
    marginTop: "5px",
    textAlign: "right",
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      color: (theme: Theme) => theme.palette.primary.main,
    },
  },
};
