import { useEffect, useState } from "react";

declare global {
  interface Window {
    aclib?: {
      runBanner?: (options: { zoneId: string }) => void;
    };
    gtag?: (...args: any[]) => void;
  }
}

interface RmzGroupProps {
  zoneIds: string[];
  pageName: string;
}

const RmzGroup: React.FC<RmzGroupProps> = ({ zoneIds, pageName }) => {
  const [visibleZones, setVisibleZones] = useState<string[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    let count = 1;

    if (width >= 1241) count = 4;
    else if (width >= 950) count = 3;
    else if (width >= 620) count = 2;

    const selected = zoneIds.slice(0, count);
    setVisibleZones(selected);

    selected.forEach((id, index) => {
      try {
        window.gtag?.("event", `${pageName}${index + 1} banner ${id}`, {
          banner_id: id,
          banner_name: `Banner ${index + 1}`,
          screen_width: width,
          page_location: window.location.href,
        });
      } catch (err) {
        console.warn("gtag failed", err);
      }
    });
  }, [zoneIds, pageName]);

  useEffect(() => {
    if (visibleZones.length === 0) return;

    const interval = setInterval(() => {
      if (window.aclib?.runBanner) {
        visibleZones.forEach((id) => {
          const el = document.getElementById(`ad-zone-${id}`);
          if (el && el.childNodes.length === 0) {
            window.aclib!.runBanner!({ zoneId: id });
          }
        });
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [visibleZones]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        margin: "20px 0",
        width: "100%",
        minHeight: "250px",
      }}
    >
      {visibleZones.map((id) => (
        <div
          key={id}
          id={`ad-zone-${id}`}
          style={{ width: 300, height: 250 }}
        />
      ))}
    </div>
  );
};

export default RmzGroup;
