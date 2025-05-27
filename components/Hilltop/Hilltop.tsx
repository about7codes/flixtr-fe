import { useEffect, useState } from "react";

interface RmzGroupProps {
  scripts: string[]; // raw JS banner scripts
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

    setVisibleScripts(scripts.slice(0, count));

    // Optional gtag analytics
    scripts.slice(0, count).forEach((_, index) => {
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
      {visibleScripts.map((script, index) => (
        <div
          key={index}
          style={{ width: 300, height: 250 }}
          dangerouslySetInnerHTML={{ __html: `<script>${script}</script>` }}
        />
      ))}
    </div>
  );
};

export default RmzGroup;
