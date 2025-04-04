import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Comments = ({ title }: { title: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const commentoUrl = "https://commentsdev.flixbaba.com";

    // Remove any existing Commento instance
    document.getElementById("commento")?.remove();
    const container = document.getElementById("commento-container");
    if (container) {
      container.innerHTML = `<div id="commento" data-commento-root="${commentoUrl}"></div>`;
    }

    // Create and append Commento script
    const script = document.createElement("script");
    script.src = `${commentoUrl}/js/commento.js`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Auto-login if session exists
      if (session?.user) {
        fetch(`${commentoUrl}/api/oauth/sso`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user?.user?.email || "",
            name: session.user?.user?.name || "",
            avatar: session.user?.user?.propic
              ? `${commentoUrl}/avatars/${session.user.user.propic}`
              : "",
          }),
        });
      }
    };

    return () => {
      // Proper cleanup on unmount
      script.remove();
      document.getElementById("commento")?.remove();
    };
  }, [session, router.asPath, title]); // Re-run when session or route changes

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <div id="commento-container">
        <div
          id="commento"
          data-commento-root="https://commentsdev.flixbaba.com"
        ></div>
      </div>
    </Box>
  );
};

export default Comments;
