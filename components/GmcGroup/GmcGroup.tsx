import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface GmcItemProps {
  source: string;
  id: string;
  index: number;
  pageName: string;
}

const GmcItem: React.FC<GmcItemProps> = ({ source, id, index, pageName }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src = source;
    script.async = true;

    script.onload = () => {
      try {
        const width = window.innerWidth;
        window.gtag?.("event", `${pageName}${index + 1} banner ${id}`, {
          banner_id: id,
          banner_name: `Banner ${index + 1}`,
          screen_width: width,
          page_location: window.location.href,
        });
        console.log("Gtag success");
      } catch (err) {
        console.warn("gtag failed", err);
      }
    };

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, [source, id, index, pageName]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: 300,
        height: 250,
        m: "auto",
      }}
    />
  );
};

interface GmcGroupProps {
  sources: string[]; // Up to 4 max
  pageName?: string;
}

const GmcGroup: React.FC<GmcGroupProps> = ({ sources, pageName = "page" }) => {
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const updateItemCount = () => {
      const width = window.innerWidth;
      if (width >= 1241) setItemsToShow(4);
      else if (width >= 950) setItemsToShow(3);
      else if (width >= 620) setItemsToShow(2);
      else setItemsToShow(1);
    };

    updateItemCount();
    window.addEventListener("resize", updateItemCount);
    return () => window.removeEventListener("resize", updateItemCount);
  }, []);

  const visibleSources = sources.slice(0, itemsToShow);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {visibleSources.map((source, index) => {
          const id = `gmc-${index + 1}`;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <GmcItem
                source={source}
                id={id}
                index={index}
                pageName={pageName}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GmcGroup;
