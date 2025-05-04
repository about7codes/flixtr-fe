import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  RedditIcon,
  FacebookShareCount,
  RedditShareCount,
} from "react-share";

import { Tooltip, Box, Typography } from "@mui/material";

type ShareButtonsProps = {
  url: string;
  title?: string;
};

export default function ShareButtons({ url, title = "" }: ShareButtonsProps) {
  const defaultHashtag = "flixbaba";

  const formattedTitleHashtag = title
    ? title
        .replace(/[^a-zA-Z0-9]/g, "") // remove spaces/special characters
        .toLowerCase()
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
      props: {
        hashtags: allHashtags,
      },
    },
    {
      name: "WhatsApp",
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
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

  return (
    <Box
      mt={2}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        gutterBottom
        sx={{
          mb: "16px",
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
            md: "1.25rem",
          },
        }}
      >
        Like this content? Share it with your friends!
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {buttons.map(({ name, Button, Icon, Count, props }) => (
          <Box key={name} textAlign="center">
            <Tooltip title={name} arrow>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.15)",
                  },
                }}
              >
                <Button url={url} title={title} {...props}>
                  <Icon size={32} round />
                </Button>
              </Box>
            </Tooltip>

            {Count && (
              <Count url={url}>
                {(shareCount) => (
                  <Typography variant="caption" display="block">
                    {shareCount || 0} shares
                  </Typography>
                )}
              </Count>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
