export const styles = {
  sliderContainer: {
    m: "60px 0",
    padding: "0 24px",
    "@media (max-width: 900px)": {
      m: "35px 0",
      padding: "0 10px",
    },
  },
  headTxt: {
    "@media (max-width: 900px)": {
      fontSize: "18px",
    },
  },
  subTxt: {
    "@media (max-width: 900px)": {
      fontSize: "12px",
    },
  },
  shareContainer: {
    maxWidth: "80%",
    width: "100%",
    m: "0 auto",
    mb: { xs: 4, sm: 4, md: 8 },
    p: 2,
    textAlign: "center",
    background: "#212121",
    borderRadius: "8px",
    "@media (min-width: 1400px)": {
      maxWidth: "1100px",
    },
  },
  shareHead: {
    fontSize: "12px",
    mb: 2,
    fontFamily: "monospace",
    color: "#7b7b7a",
  },
};
