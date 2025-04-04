import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    Commento?: {
      setUser: (user: { email: string; name: string; avatar?: string }) => void;
    };
  }
}

type CommentsProps = {
  title: string;
};

const Comments = ({ title }: CommentsProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Initialize Commento only on client side
    if (typeof window === "undefined") return;

    const commentoUrl = "https://commentsdev.flixbaba.com";

    // Cleanup previous instance
    const existingScript = document.getElementById("commento-script");
    if (existingScript) existingScript.remove();

    const container = document.getElementById("commento-container");
    if (container) container.innerHTML = '<div id="commento"></div>';

    // Load Commento script
    const script = document.createElement("script");
    script.id = "commento-script";
    script.src = `${commentoUrl}/js/commento.js`;
    script.async = true;

    // Auto-login if session exists
    if (session?.user) {
      script.onload = () => {
        window.Commento?.setUser({
          email: session.user?.user?.email || "",
          name: session.user?.user.name || "",
          avatar: session.user?.user?.propic + "" || "",
        });
      };
    }

    document.body.appendChild(script);

    return () => {
      document.getElementById("commento-script")?.remove();
    };
  }, [session, router.asPath, title]); // Re-run when route or session changes

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <div id="commento-container">
        <div id="commento"></div>
      </div>
    </Box>
  );
};

export default Comments;
