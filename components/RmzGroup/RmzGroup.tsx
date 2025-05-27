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

  // Determine how many banners to show based on screen width
  useEffect(() => {
    const width = window.innerWidth;
    let count = 1;
    if (width >= 1241) count = 4;
    else if (width >= 950) count = 3;
    else if (width >= 620) count = 2;

    const selected = zoneIds.slice(0, count);
    setVisibleZones(selected);

    // Send analytics event
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

  // Inject Adcash lib once
  useEffect(() => {
    if (!document.getElementById("aclib")) {
      const script = document.createElement("script");
      script.id = "aclib";
      script.src = "//acscdn.com/script/aclib.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Inject inline script tag per zone
  useEffect(() => {
    visibleZones.forEach((zoneId) => {
      const container = document.getElementById(`ad-zone-${zoneId}`);
      if (container && !container.querySelector("script")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `aclib.runBanner({ zoneId: '${zoneId}' });`;
        container.appendChild(script);
      }
    });
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
      {visibleZones.map((zoneId) => (
        <div
          key={zoneId}
          id={`ad-zone-${zoneId}`}
          style={{ width: 300, height: 250 }}
        />
      ))}
    </div>
  );
};

export default RmzGroup;
