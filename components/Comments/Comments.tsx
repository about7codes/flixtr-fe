import React from "react";
import { Box } from "@mui/material";
import { DiscussionEmbed } from "disqus-react";

type CommentsProps = {
  title: string;
};

const Comments = ({ title }: CommentsProps) => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <DiscussionEmbed
        shortname="flixbaba"
        config={{
          url: pageUrl,
          identifier: pageUrl,
          title: title,
        }}
      />
    </Box>
  );
};

export default Comments;