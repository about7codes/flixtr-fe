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

    const setupCommento = async () => {
      // 1. Ensure the commento div exists
      if (!document.getElementById("commento")) {
        const commentoDiv = document.createElement("div");
        commentoDiv.id = "commento";
        commentoDiv.setAttribute("data-page-id", pageUrl);
        document.body.appendChild(commentoDiv);
      }

      // 2. Set auth token if logged in
      if (session?.user?.authToken) {
        try {
          await fetch("https://devbe.flixbaba.com/auth/commento-token", {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.authToken}`,
            },
          });
        } catch (error) {
          console.error("Failed to set Commento token:", error);
        }
      }

      // 3. Check if script already exists
      if (document.querySelector('script[src*="commento.js"]')) return;

      // 4. Load script with error handling
      script = document.createElement("script");
      script.src = "https://commentsdev.flixbaba.com/js/commento.js";
      script.async = true;
      script.onerror = () => console.error("Commento script failed to load");

      // 5. Temporary fix for initialization error
      // @ts-ignore
      if (!window.commento) {
        // @ts-ignore
        window.commento = {} as any;
      }

      document.body.appendChild(script);
    };

    // Small delay to ensure DOM stability
    const timer = setTimeout(setupCommento, 100);

    return () => {
      clearTimeout(timer);
      if (script) document.body.removeChild(script);

      const commentoDiv = document.getElementById("commento");
      if (commentoDiv) document.body.removeChild(commentoDiv);

      // Cleanup global commento object
      // @ts-ignore
      if (window.commento) delete window.commento;
    };
  }, [session, pageUrl]);

  return (
    <Box sx={{ mt: 4 }}>
      {/* Render placeholder div */}
      <div id="commento-container" data-testid="comments-section" />
    </Box>
  );
};

export default Comments;
