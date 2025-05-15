import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

interface RmzGroupProps {
  bannerIds: string[]; // Up to 4
  ampId: string;
}

const RmzGroup: React.FC<RmzGroupProps> = ({ bannerIds, ampId }) => {
  const rmzRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rmzRef.current;
    if (!container) return;

    container.innerHTML = "";

    const width = window.innerWidth;
    let bannersToShow = 1;

    if (width >= 1241) bannersToShow = 4;
    else if (width >= 950) bannersToShow = 3;
    else if (width >= 620) bannersToShow = 2;

    for (let i = 0; i < Math.min(bannersToShow, bannerIds.length); i++) {
      const div = document.createElement("div");
      div.setAttribute("data-banner-id", bannerIds[i]);
      container.appendChild(div);

      try {
        window.gtag?.("event", `banner ${bannerIds[i]}`, {
          banner_id: bannerIds[i],
          banner_name: `Banner ${i + 1}`,
          screen_width: width,
          page_location: window.location.href,
        });
      } catch (e) {
        console.error("Error sending gtag event:", e);
      }
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://js.wpadmngr.com/static/adManager.js";
    script.setAttribute("data-admpid", ampId);

    document.body.appendChild(script);

    return () => {
      script.remove();
      container.innerHTML = "";
    };
  }, [bannerIds, ampId]);

  return (
    <Box
      ref={rmzRef}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "20px 0",
        width: "100%",
        minHeight: "250px",
      }}
    />
  );
};

export default RmzGroup;
