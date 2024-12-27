import React from "react";
import { Box } from "@mui/material";
import { DiscussionEmbed } from "disqus-react";

type CommentsProps = {
  title: string;
};

const Comments = ({ title }: CommentsProps) => {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Box sx={{ width: "90%", margin: "0 auto" }}>
      <DiscussionEmbed
        shortname="flixbaba"
        config={{
          url: url,
          identifier: url,
          title: title,
        }}
      />
    </Box>
  );
};

export default Comments;
