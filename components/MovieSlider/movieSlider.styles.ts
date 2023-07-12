export const styles = {
  mediaSlide: {
    marginBottom: "10px",
  },
  mediaItem: {
    position: "relative",
    outline: "none",
    margin: "0 10px",
    "@media (max-width: 768px)": {
      margin: "0 3px",
    },
  },
  mediaItemImg: {
    position: "relative",
    height: "500px",
    "@media (max-width: 1400px)": {
      height: "450px",
    },
    "@media (max-width: 1300px)": {
      height: "450px",
    },
    "@media (max-width: 768px)": {
      height: "350px",
    },
    "@media (max-width: 576px)": {
      height: "220px",
    },
    "& img": {
      maxWidth: "100%",
      margin: "0 auto",
      marginBottom: "25px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
      borderRadius: "0 0 6px 6px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: -1,
      borderRadius: "0px 0px 5px 5px",
      // background: '#242428',
      // background: "-moz-linear-gradient(0deg,#242428 0,rgba(36,36,40,0) 50%,#242428 100%)",
      // background: "-webkit-linear-gradient(0deg,#242428 0,rgba(36,36,40,0) 50%,#242428 100%)",
      background:
        "linear-gradient(0deg,#242428 0,rgba(36,36,40,0) 70%,#242428 100%)",
      zIndex: 2,
    },
  },

  mediaItemBanner: {},
  overview: {
    lineHeight: "1.6",
    fontWeight: "300",
    mb: "20px",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    fontSize: "15px",
    "@media (max-width: 1300px)": {
      WebkitLineClamp: "2",
    },
    "@media (max-width: 576px)": {
      display: "none",
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "48px",
    "@media (max-width: 1400px)": {
      fontSize: "40px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "30px",
    },
    "@media (max-width: 768px)": {
      fontSize: "20px",
    },
    "@media (max-width: 576px)": {
      fontSize: "16px",
    },
  },
  rating: {
    fontSize: "18px",
    "@media (max-width: 1400px)": {
      fontSize: "18px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
    },
  },
  miBtns: {
    display: "flex",
  },
  watchBtn: {
    whiteSpace: "nowrap",
    width: "120px",
    "@media (max-width: 1400px)": {
      fontSize: "18px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "12px",
      width: "100px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
      width: "80px",
    },
  },
  detailBtn: {
    ml: "20px",
    width: "120px",
    "@media (max-width: 1400px)": {
      fontSize: "18px",
    },
    "@media (max-width: 1300px)": {
      fontSize: "14px",
    },
    "@media (max-width: 768px)": {
      fontSize: "12px",
      width: "100px",
      ml: "10px",
    },
    "@media (max-width: 576px)": {
      fontSize: "10px",
      width: "80px",
    },
  },
  mediaItemContent: {
    padding: "20px",
    zIndex: 3,
    width: "50%",
    position: "absolute",
    bottom: 0,
    opacity: 0,
    transition: "opacity 1s ease 150ms",
    "@media (max-width: 768px)": {
      width: "90%",
    },
    "@media (max-width: 576px)": {
      p: "10px",
    },
  },
  miContent: {
    mb: "20px",
    "@media (max-width: 768px)": {
      mb: "5px",
    },
  },
};
