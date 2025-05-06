import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  FacebookShareCount,
  RedditShareCount,
} from "react-share";

import { useEffect, useState } from "react";
import { Tooltip, Box, Typography, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { styles as classes } from "./shareButtons.styles";

type ShareButtonsProps = {
  url?: string;
  header?: string;
  title?: string;
};

export default function ShareButtons({
  url,
  header = "",
  title = "",
}: ShareButtonsProps) {
  const defaultHashtag = "flixbaba";
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const formattedTitleHashtag = title
    ? title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    : null;

  const allHashtags = formattedTitleHashtag
    ? [defaultHashtag, formattedTitleHashtag]
    : [defaultHashtag];

  const hashtagWithHash = `#${defaultHashtag}`;

  const buttons = [
    {
      name: "Facebook",
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      Count: FacebookShareCount,
      props: { hashtag: hashtagWithHash },
    },
    {
      name: "Twitter",
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      props: { hashtags: allHashtags },
    },
    {
      name: "Telegram",
      Button: TelegramShareButton,
      Icon: TelegramIcon,
    },
    {
      name: "Reddit",
      Button: RedditShareButton,
      Icon: RedditIcon,
      Count: RedditShareCount,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url ?? shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box mt={2} sx={classes.shareButtons}>
      {header && (
        <Typography
          gutterBottom
          fontWeight="bold"
          variant="subtitle2"
          sx={classes.header}
        >
          {header}
        </Typography>
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
        {buttons.map(({ name, Button, Icon, Count, props }) => (
          <Box key={name} textAlign="center" width="52px" whiteSpace="nowrap">
            <Tooltip title={name} arrow>
              <Box component="span" sx={classes.shareButton}>
                <Button url={url ?? shareUrl} title={title} {...props}>
                  <Icon size={32} round />
                </Button>
              </Box>
            </Tooltip>
            {Count && (
              <Count url={url ?? shareUrl}>
                {(shareCount) => (
                  <Typography variant="caption" display="block">
                    {shareCount || 0} shares
                  </Typography>
                )}
              </Count>
            )}
          </Box>
        ))}

        {/* Copy Link */}
        <Box textAlign="center">
          <Tooltip title="Copy link" arrow>
            <Box component="span" sx={classes.copyButton}>
              <IconButton onClick={handleCopy} sx={classes.copyButtonIcon}>
                {copied ? (
                  <CheckIcon fontSize="small" color="success" />
                ) : (
                  <ContentCopyIcon fontSize="small" />
                )}
              </IconButton>
            </Box>
          </Tooltip>
          <Typography variant="caption" display="block" mt="6px">
            {copied ? "Copied!" : "Copy link"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
