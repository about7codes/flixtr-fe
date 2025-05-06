export const styles = {
  shareButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shareButton: {
    display: "inline-block",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.15)",
    },
  },
  header: {
    mb: "16px",
    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
  },
  copyButton: {
    display: "inline-block",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.15)",
      borderRadius: "50%",
      backgroundColor: "secondary.main",
    },
  },
  copyButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "secondary.main",
  },
};
