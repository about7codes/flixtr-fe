export const styles = {
    container: {
      display: 'flex',
      marginBottom: '20px',
    },
    tile: {
      width: "3.5%",
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
    },
    tileCenter: {
      margin: '0 20px',
      width: "93%",
      height: "500px",
      "@media (max-width: 1400px)": {
        height: "450px",
      },
      "@media (max-width: 1300px)": {
        height: "450px",
      },
      "@media (max-width: 768px)": {
        margin: '0 5px',
        height: "350px",
      },
      "@media (max-width: 576px)": {
        height: "220px",
      },
    },
  };