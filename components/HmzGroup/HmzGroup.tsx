import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface HmzProps {
  scriptSrc: string;
  id: string;
  index: number;
  pageName: string;
  width?: string;
  height?: string;
}

const Hmz: React.FC<HmzProps> = ({
  scriptSrc,
  id,
  index,
  pageName,
  width = "300",
  height = "250",
}) => {
  const hmzRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hmzRef.current || hmzRef.current.hasChildNodes()) return;

    const iframe = document.createElement("iframe");
    iframe.src = "about:blank";
    iframe.width = width;
    iframe.height = height;
    iframe.style.border = "none";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-popups"
    );

    iframe.onload = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          const script = doc.createElement("script");
          script.src = scriptSrc;
          script.async = true;
          doc.head.appendChild(script);

          // Analytics
          const screenWidth = window.innerWidth;
          window.gtag?.("event", `${pageName}${index + 1} banner ${id}`, {
            banner_id: id,
            banner_name: `Banner ${index + 1}`,
            screen_width: screenWidth,
            page_location: window.location.href,
          });
        }
      } catch (e) {
        console.error("HMZ loading error:", e);
      }
    };

    hmzRef.current.appendChild(iframe);

    return () => {
      if (hmzRef.current?.contains(iframe)) {
        hmzRef.current.removeChild(iframe);
      }
    };
  }, [scriptSrc, id, index, pageName, width, height]);

  return (
    <Box
      ref={hmzRef}
      sx={{
        width: `${width}px`,
        height: `${height}px`,
        m: "auto",
      }}
    />
  );
};

interface HmzGroupProps {
  scriptSources: string[]; // Up to 4 max
  pageName?: string;
  hmzWidth?: string;
  hmzHeight?: string;
}

const HmzGroup: React.FC<HmzGroupProps> = ({
  scriptSources,
  pageName = "page",
  hmzWidth = "300",
  hmzHeight = "250",
}) => {
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

  const visibleSources = scriptSources.slice(0, itemsToShow);

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
          const id = `Hmz-${index + 1}`;
          return (
            <Grid
              item
              key={id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Hmz
                id={id}
                index={index}
                width={hmzWidth}
                height={hmzHeight}
                scriptSrc={source}
                pageName={pageName}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HmzGroup;

//////////////////

// <div
//   id="some_id"
//   ref={(el) => {
//     if (el && !el.hasChildNodes()) {
//       const iframe = document.createElement("iframe");
//       iframe.src = "about:blank";
//       iframe.width = "300";
//       iframe.height = "250";
//       iframe.style.border = "none";
//       iframe.onload = function () {
//         try {
//           const s = iframe.contentDocument?.createElement("script");
//           if (s) {
//             s.src =
//               "https://definitive-priority.com/b/XyV.scdUGVlL0yY_WocX/jeomK9HujZOUalIktPxTXYDzZNTDFEM4KOTDTcptHN/jnMR0IMhTFgB4/OIAp";
//             iframe.contentDocument?.head.appendChild(s);
//           }
//         } catch (e) {}
//       };
//       el.appendChild(iframe);
//     }
//   }}
// />
