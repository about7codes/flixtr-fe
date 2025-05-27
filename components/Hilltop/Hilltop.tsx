import { useEffect, useState } from "react";

interface RmzGroupProps {
  scripts: string[]; // JavaScript code strings (without <script> tags)
  pageName: string;
}

const RmzGroup: React.FC<RmzGroupProps> = ({ scripts, pageName }) => {
  const [visibleScripts, setVisibleScripts] = useState<string[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    let count = 1;

    if (width >= 1241) count = 4;
    else if (width >= 950) count = 3;
    else if (width >= 620) count = 2;

    const selected = scripts.slice(0, count);
    setVisibleScripts(selected);

    selected.forEach((_, index) => {
      try {
        window.gtag?.("event", `${pageName}${index + 1} banner`, {
          banner_name: `Banner ${index + 1}`,
          screen_width: width,
          page_location: window.location.href,
        });
      } catch (err) {
        console.warn("gtag failed", err);
      }
    });
  }, [scripts, pageName]);

  useEffect(() => {
    visibleScripts.forEach((code, index) => {
      const container = document.getElementById(`hilltop-banner-${index}`);
      if (!container) return;

      // Prevent duplicate injection
      if (container.getAttribute("data-loaded") === "true") return;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.text = code;
      container.appendChild(script);
      container.setAttribute("data-loaded", "true");
    });
  }, [visibleScripts]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "16px",
        margin: "20px 0",
        width: "100%",
      }}
    >
      {visibleScripts.map((_, index) => (
        <div
          key={index}
          id={`hilltop-banner-${index}`}
          style={{ width: 300, height: 250 }}
        />
      ))}
    </div>
  );
};

export default RmzGroup;
