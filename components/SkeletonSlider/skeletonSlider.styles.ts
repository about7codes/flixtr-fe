export const styles = {
    container: {
      display: 'flex',
      overflow: 'hidden',
    },
    tile: {
      flexShrink: 0,
      padding: '10px 10px',
      width: 170,
      "@media (max-width: 900px)": {
        padding: '10px 3px',
        width: 114,
      },
    },
    image: {
      height: 223,
      "@media (max-width: 900px)": {
        height: 162,
      },
    },
    text: {
      fontSize: '13px',
    },
  };