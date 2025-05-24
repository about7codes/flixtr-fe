import { useEffect, useState } from "react";

declare global {
  interface Window {
    clickLite?: {
      runSpot?: (spotId: number | string) => void;
      isInit?: boolean;
    };
  }
}

interface RmzLiteProps {
  spotIds: (number | string)[];
  pageName: string;
}

const RmzLite: React.FC<RmzLiteProps> = ({ spotIds, pageName }) => {
  const [visibleSpots, setVisibleSpots] = useState<(number | string)[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    let bannersToShow = 1;

    // Responsive logic
    if (width >= 1241) bannersToShow = 4;
    else if (width >= 950) bannersToShow = 3;
    else if (width >= 620) bannersToShow = 2;

    const selectedSpots = spotIds.slice(0, bannersToShow);
    setVisibleSpots(selectedSpots);

    // Analytics: send gtag events
    selectedSpots.forEach((id, index) => {
      try {
        window.gtag?.("event", `${pageName}${index + 1} banner ${id}`, {
          banner_id: id,
          banner_name: `Banner ${index + 1}`,
          screen_width: width,
          page_location: window.location.href,
        });
      } catch (e) {
        console.error("Error sending gtag event:", e);
      }
    });
  }, [spotIds, pageName]);

  useEffect(() => {
    const runHandler = () => {
      visibleSpots.forEach((id) => {
        window.clickLite?.runSpot?.(id);
      });
    };

    if (window.clickLite?.isInit) {
      runHandler();
    } else {
      document.addEventListener("clickLite", runHandler);
      return () => {
        document.removeEventListener("clickLite", runHandler);
      };
    }
  }, [visibleSpots]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "20px 0",
        width: "100%",
        minHeight: "250px",
      }}
    >
      {visibleSpots.map((spotId) => (
        <div key={spotId} data-clickadilla-banner={spotId}></div>
      ))}
    </div>
  );
};

export default RmzLite;
