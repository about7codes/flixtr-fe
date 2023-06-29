export const styles = {
  footerMain: {
    textAlign: "center",
    backgroundColor: "#212121",
    overflow: "hidden",
    "@media (max-width: 900px)": {
      paddingBottom: "50px",
    },
  },
  footerXD: {
    paddingTop: "70px",
    backgroundColor: "secondary.main",
    opacity: 1,
    // backgroundImage:
    //   "repeating-radial-gradient( circle at 0 0, transparent 0, #ff0000 10px ), repeating-linear-gradient( #ff434355, #ff4343 )",
  },
  footerXDtxt: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "-47px",
    color: "#303030",
    fontSize: "150px",
  },
  footerInner: {
    padding: "70px 70px 50px 70px",
    backgroundColor: "#303030",
    color: "#fff",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 900px)": {
      padding: "70px 20px 50px 20px",
    },
  },
  footerLinks: {
    width: "100%",
    flex: "1",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    padding: "0 10px",
    marginBottom: "20px",
  },
  footerColHead: {
    marginBottom: "15px",
    fontSize: "1rem",
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  footerTopHead: {
    textTransform: "uppercase",
    color: "secondary.main",
    fontWeight: "bold",
    fontSize: "2rem",
    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  socials: {
    width: "auto",
    "@media (max-width: 1000px)": {
      marginTop: "20px",
    },
  },
  socialLogo: {
    margin: "0 10px",
    display: "block",
    width: "30px",
    height: "30px",
  },
  footerBottom: {
    // display: "flex",
    display: "none",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  playstore: {
    width: "auto",
    flexDirection: "column",
    "@media (max-width: 900px)": {
      flexDirection: "initial",
      justifyContent: "center",
    },
  },
  downloadLogo: {
    margin: "0 5px",
    // marginLeft: "10px",
    display: "block",
    width: "185px",
    // height: "54px",
  },
  footerLinksMob: {
    display: "none",
    marginBottom: "20px",
    justifyContent: "center",
    "@media (max-width: 900px)": {
      display: "flex",
    },
    "@media (max-width: 768px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  altlink: {
    margin: "4px 8px",
    color: "#fff",
  },
};
