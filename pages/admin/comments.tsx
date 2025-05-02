import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Chip,
  Avatar,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useDispatch } from "react-redux";
import { setNotify } from "../../redux/notifySlice";

const fetchAdminComments = async (token: string, pageParam: number) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_BE_ROUTE + "/comments/admin?page=" + pageParam,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

type DeleteCommentArgs = {
  token: string;
  commentId: string;
};

const deleteComment = async ({ token, commentId }: DeleteCommentArgs) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BE_ROUTE}/comments/admin/${commentId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const AdminCommentsPage = () => {
  const [page, setPage] = useState(1);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = session?.user.authToken;

  const { data, isLoading, error } = useQuery(
    ["adminComments", page], // Add page to query key
    () => fetchAdminComments(token ?? "", page), // Pass current page
    {
      enabled: !!session?.user?.user?.isAdmin,
      keepPreviousData: true, // Smooth transitions between pages
    }
  );

  const mutation = useMutation(deleteComment, {
    onSuccess: (data) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: data.message ?? "Comment deleted.",
          type: "success",
        })
      );
      queryClient.invalidateQueries(["adminComments"]);
    },
    onError: (error: any) => {
      dispatch(
        setNotify({
          isOpen: true,
          message: error.response.data.error,
          type: "error",
        })
      );
    },
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (!session?.user?.user?.isAdmin) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography>You are not authorized to view this page.</Typography>
      </Box>
    );
  }

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  if (error) return <Typography>Error loading comments</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        All Comments (Admin) ({data?.total || 0})
      </Typography>

      {data?.comments && data.comments.length === 0 && (
        <Typography>No comments found.</Typography>
      )}

      {data?.comments.map((comment: any) => (
        <Box
          key={comment._id}
          id={comment._id}
          p={2}
          mb={2}
          border="1px solid #424242"
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Box fontWeight="bold">
              <Chip
                sx={{ textTransform: "capitalize" }}
                size="small"
                color="secondary"
                label={comment.owner?.name || "Unknown User"}
                avatar={
                  <Avatar src={`/assets/${comment.owner?.propic || 1}.png`} />
                }
              />{" "}
              <Chip
                color="warning"
                label={comment.media_type.toUpperCase()}
                size="small"
              />{" "}
              <Chip
                color="secondary"
                label={"#" + comment.tmdb_id}
                size="small"
              />{" "}
              {comment.media_type === "tv" && (
                <>
                  <Chip
                    color="info"
                    label={"Season " + comment.season}
                    size="small"
                  />{" "}
                  <Chip
                    color="info"
                    label={"Episode " + comment.episode}
                    size="small"
                  />{" "}
                </>
              )}
              {comment.parentComment && (
                <Chip
                  color="success"
                  label={"Reply to #" + comment.parentComment}
                  size="small"
                />
              )}
            </Box>
            <Typography>{comment.content}</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                const commentId = encodeURIComponent(comment._id) || "";

                const url =
                  comment.media_type === "movie"
                    ? `${window.location.origin}/movie/${comment.tmdb_id}/moviename/watch#${commentId}`
                    : `${window.location.origin}/tv/${
                        comment.tmdb_id
                      }/showname/season/${comment.season || 1}?e=${
                        comment.episode || 1
                      }&p=1#${commentId}`;

                window.open(url, "_blank", "noopener,noreferrer");
              }}
            >
              <OpenInNewIcon color="info" />
            </IconButton>
            <IconButton
              onClick={() =>
                mutation.mutate({ token: token ?? "", commentId: comment._id })
              }
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {data.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "text.primary",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminCommentsPage;
