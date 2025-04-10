import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

import {
  ReactionType,
  useReactionCounts,
  useSubmitReaction,
} from "../../hooks/mediaReactions.hooks";
import { getOrCreateAnonymousId } from "../../utils/utils";
import { setNotify } from "../../redux/notifySlice";

const reactionLabels: Record<ReactionType, string> = {
  upvote: "Upvote",
  funny: "Funny",
  love: "Love",
  surprised: "Surprised",
  angry: "Angry",
  sad: "Sad",
};

const icons: Record<ReactionType, React.ReactNode> = {
  upvote: "👍",
  funny: "😂",
  love: "❤️",
  surprised: "😱",
  angry: "🤬",
  sad: "😢",
};

interface ReactionButtonsProps {
  mediaType: "movie" | "tv";
}

export default function ReactionButtons({ mediaType }: ReactionButtonsProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pendingReaction, setPendingReaction] = useState<ReactionType | null>(
    null
  );
  const [anonId, setAnonId] = useState("");

  const mediaId = router.query.id as string;
  const season = router.query.seasoncount
    ? Number(router.query.seasoncount)
    : undefined;
  const episode = router.query.e ? Number(router.query.e) : undefined;

  useEffect(() => {
    setAnonId(getOrCreateAnonymousId());
  }, []);

  const { data, isLoading, refetch } = useReactionCounts(
    anonId,
    mediaType,
    mediaId,
    season,
    episode
  );

  const counts: Record<ReactionType, number> = data?.counts ?? {
    upvote: 0,
    funny: 0,
    love: 0,
    surprised: 0,
    angry: 0,
    sad: 0,
  };
  const selectedReaction = data?.userReaction;

  const mutation = useSubmitReaction();

  const handleClick = (type: ReactionType) => {
    if (type === selectedReaction || pendingReaction !== null) return; // No action if already selected

    setPendingReaction(type);
    mutation.mutate(
      {
        mediaType,
        mediaId,
        season,
        episode,
        type,
        anonymousId: anonId,
      },
      {
        onSuccess: () => {
          dispatch(
            setNotify({
              isOpen: true,
              message: `You voted ${icons[type]}`,
              type: "success",
            })
          );

          refetch();
          setPendingReaction(null);
        },
        onError: () => {
          setPendingReaction(null);
        },
      }
    );
  };

  const reactionOrder: ReactionType[] = [
    "upvote",
    "funny",
    "love",
    "surprised",
    "angry",
    "sad",
  ];

  if (isLoading)
    return (
      <Typography width="100%" textAlign="center" padding={2}>
        Loading reactions...🥳 🥳 🥳
      </Typography>
    );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      paddingTop={2}
      paddingBottom={2}
      width="100%"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
            md: "1.25rem",
          },
        }}
      >
        Would you recommend this to your enemies 😈 ?
      </Typography>

      <Typography variant="body2" color="secondary.main" fontSize="1rem">
        {Object.values(counts).reduce((a, b) => a + b, 0)} community votes
      </Typography>

      <Box gap={2} display="flex" flexWrap="wrap" justifyContent="center">
        {reactionOrder.map((type) => {
          const isSelected = selectedReaction === type;
          const count = counts[type] ?? 0;

          return (
            <Tooltip title={reactionLabels[type]} key={type}>
              <span>
                <IconButton
                  onClick={() => handleClick(type)}
                  disabled={isSelected || pendingReaction === type}
                  sx={{
                    fontSize: {
                      xs: "1.2rem", // extra-small screens (mobile)
                      sm: "2rem", // small screens
                      md: "2.5rem", // medium and up
                    },
                    color: isSelected ? "primary.main" : "inherit",
                    border: isSelected ? "2px solid" : "2px solid transparent",
                    borderRadius: "50px",
                    backgroundColor: isSelected
                      ? "rgba(0, 0, 255, 0.05)"
                      : "transparent",
                    "&.Mui-disabled": {
                      color: "secondary.main",
                    },
                  }}
                >
                  {icons[type]}
                  <Typography
                    variant="caption"
                    sx={{ ml: 0.5, fontSize: "0.9rem" }}
                  >
                    {count}
                  </Typography>
                </IconButton>
              </span>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
