import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const REACTIONS = [
  "upvote",
  "funny",
  "love",
  "surprised",
  "angry",
  "sad",
] as const;
export type ReactionType = (typeof REACTIONS)[number];

interface ReactionData {
  mediaType: "movie" | "tv";
  mediaId: string;
  season?: number;
  episode?: number;
  type: ReactionType;
  anonymousId: string;
}

export function useSubmitReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReactionData) =>
      axios.post(`${process.env.NEXT_PUBLIC_BE_ROUTE}/mediareaction`, data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries([
        "media-reaction-counts",
        data.mediaType,
        data.mediaId,
        data.season,
        data.episode,
      ]);
    },
  });
}

export function useReactionCounts(
  anonymousId: string,
  mediaType: "movie" | "tv",
  mediaId: string,
  season?: number,
  episode?: number
) {
  return useQuery({
    queryKey: [
      "media-reaction-counts",
      anonymousId,
      mediaType,
      mediaId,
      season,
      episode,
    ],
    queryFn: async () => {
      const params = {
        anonymousId,
        mediaType,
        mediaId,
        ...(season != null && { season }),
        ...(episode != null && { episode }),
      };

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_ROUTE}/mediareaction`,
        { params }
      );
      return res.data as {
        counts: Record<ReactionType, number>;
        userReaction: ReactionType | null;
      };
    },
  });
}
