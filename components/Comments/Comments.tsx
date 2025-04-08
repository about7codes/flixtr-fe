import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import CommentItem from "../CommentItem/CommentItem";
import { CommentType } from "../../types/apiResponses";

export default function Comments({
  media_type,
}: {
  media_type: "movie" | "tv";
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [totalAllComments, setTotalAllComments] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const mediaId = Number(router.query.id);
  const seasonNumber = router.query.seasoncount
    ? Number(router.query.seasoncount)
    : undefined;
  const episodeNumber = router.query.e ? Number(router.query.e) : undefined;

  const userId = session?.user?.user._id || "";
  const token = session?.user?.authToken;

  const fetchComments = async (reset = false) => {
    if (!mediaId || loading) return;
    setLoading(true);

    const currentPage = reset ? 1 : page;
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/${media_type}/${mediaId}`
    );
    url.searchParams.append("page", currentPage.toString());
    url.searchParams.append("limit", "10");

    if (media_type === "tv") {
      if (seasonNumber !== undefined) {
        url.searchParams.append("season", seasonNumber.toString());
      }
      if (episodeNumber !== undefined) {
        url.searchParams.append("episode", episodeNumber.toString());
      }
    }

    const { data } = await axios.get(url.toString());

    setComments((prev) =>
      reset ? data.comments : [...prev, ...data.comments]
    );
    setTotalAllComments(data.totalAllComments || 0); // 🔧 store count
    setHasMore(currentPage * data.limit < data.totalAllComments);
    setPage(currentPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (!router.isReady) return;
    setPage(1);
    setComments([]);
    fetchComments(true); // Reset comments on load
  }, [router.isReady, mediaId, seasonNumber, episodeNumber]);

  const postComment = async () => {
    if (!newComment.trim() || !token) return;

    const payload: any = {
      tmdb_id: mediaId,
      media_type,
      content: newComment,
    };

    if (media_type === "tv") {
      if (seasonNumber !== undefined) payload.season = seasonNumber;
      if (episodeNumber !== undefined) payload.episode = episodeNumber;
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/add`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNewComment("");
    setPage(1);
    fetchComments(true);
  };

  const handleReply = async (parentId: string, content: string) => {
    if (!token) return;

    const payload: any = {
      tmdb_id: mediaId,
      media_type,
      content,
      parentComment: parentId,
    };

    if (media_type === "tv") {
      if (seasonNumber !== undefined) payload.season = seasonNumber;
      if (episodeNumber !== undefined) payload.episode = episodeNumber;
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/add`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchComments(true); // refetch all for updated nesting
  };

  const handleEdit = async (id: string, content: string) => {
    if (!token) return;
    await axios.put(
      `${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchComments(true);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await axios.delete(`${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchComments(true);
  };

  if (status === "loading") return <CircularProgress />;

  return (
    <Box sx={{ m: 3, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Comments ({totalAllComments})
      </Typography>

      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          p: 2,
          mb: 2,
          borderRadius: "6px",
          color: "#222",
          backgroundColor: "secondary.main",
        }}
      >
        If you don&apos;t mind, please leave a comment and share your thoughts
        with everyone—it will make the website even more lively! Many people are
        eager to read your comments! 😁
      </Typography>

      {session ? (
        <>
          <TextField
            sx={{ backgroundColor: "primary.main" }}
            placeholder="Write a comment..."
            fullWidth
            multiline
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={postComment}
            sx={{ mt: 1 }}
          >
            Post Comment
          </Button>
        </>
      ) : (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Sign in to post a comment.
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        {comments.length === 0 ? (
          <Typography variant="body2">No comments yet.</Typography>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              userId={userId}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </Box>

      {hasMore && (
        <Button
          onClick={() => fetchComments()}
          variant="outlined"
          color="secondary"
          disabled={loading}
          sx={{ mt: 2, width: "100%" }}
        >
          {loading ? "Loading..." : "Load more comments"}
        </Button>
      )}
    </Box>
  );
}
