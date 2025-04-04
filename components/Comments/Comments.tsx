import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { cleanUrl } from "../../utils/utils";
import { useSession } from "next-auth/react";

type CommentsProps = {
  title: string;
};

const Comments = ({ title }: CommentsProps) => {
  const pageUrl =
    typeof window !== "undefined" ? cleanUrl(window.location.href) : "";
  const { data: session } = useSession();

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    const commentoUrl = "https://commentsdev.flixbaba.com";

    const setupCommento = async () => {
      // 1. Create container div if needed
      const container = document.getElementById("commento-container");
      if (!container) return;

      if (!document.getElementById("commento")) {
        const commentoDiv = document.createElement("div");
        commentoDiv.id = "commento";
        commentoDiv.setAttribute("data-page-id", pageUrl);
        container.appendChild(commentoDiv);
      }

      // 2. Set auth token securely
      if (session?.user?.authToken) {
        try {
          await fetch(`${commentoUrl}/api/commento-token`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.authToken}`,
            },
          });
        } catch (error) {
          console.error("Commento token error:", error);
        }
      }

      // 3. Prevent duplicate script loading
      if (
        document.querySelector(`script[src^="${commentoUrl}/js/commento.js"]`)
      ) {
        return;
      }

      // 4. Configure Commento before loading
      // @ts-ignore
      window.commento = {
        apiUrl: `${commentoUrl}/api`,
        cssUrl: `${commentoUrl}/css/commento.css`,
        // @ts-ignore
        ...window.commento,
      };

      // 5. Load script with cache busting
      script = document.createElement("script");
      script.src = `${commentoUrl}/js/commento.js?ts=${Date.now()}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onerror = () => console.error("Commento failed to load");

      document.body.appendChild(script);
    };

    const timer = setTimeout(setupCommento, 150);

    return () => {
      clearTimeout(timer);
      if (script?.parentNode) {
        document.body.removeChild(script);
      }
      const div = document.getElementById("commento");
      if (div?.parentNode) {
        div.parentNode.removeChild(div);
      }
    };
  }, [session, pageUrl]);

  return (
    <Box sx={{ mt: 4 }}>
      <div id="commento-container" data-testid="comments-section" />
    </Box>
  );
};

export default Comments;
