import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentType } from "../../types/apiResponses";
dayjs.extend(relativeTime);

interface Props {
  comment: CommentType;
  userId: string;
  onReply: (parentId: string, content: string) => void;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export default function CommentItem({
  comment,
  userId,
  onReply,
  onEdit,
  onDelete,
}: Props) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  const handleReply = () => {
    if (text.trim()) {
      onReply(comment._id, text);
      setText("");
      setReplying(false);
    }
  };

  const handleEdit = () => {
    if (text.trim()) {
      onEdit(comment._id, text);
      setEditing(false);
    }
  };

  return (
    <Box id={comment._id} sx={{ mb: 2, ml: comment.parentComment ? 4 : 0 }}>
      <Box display="flex" alignItems="center" gap={1}>
        <Avatar src={`/assets/${comment.owner.propic}.png`} />
        <Typography variant="subtitle2" textTransform="capitalize">
          {comment.owner.name}
        </Typography>
        <Typography variant="caption" color="gray">
          {dayjs(comment.createdAt).fromNow()}
        </Typography>
      </Box>

      {!editing ? (
        <Typography
          sx={{
            ml: 6,
            mt: 0.5,
            ...(comment.content === "[deleted]" && {
              fontStyle: "italic",
              color: "#757575",
            }),
          }}
        >
          {comment.content}
        </Typography>
      ) : (
        <Box sx={{ ml: 6, mt: 1 }}>
          <TextField
            sx={{ backgroundColor: "primary.main" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
            fullWidth
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={handleEdit}
            size="small"
            sx={{ mt: 1 }}
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setEditing(false)}
            size="small"
            sx={{ mt: 1, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      )}

      <Box sx={{ ml: 6, mt: 0.5 }}>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => {
            setReplying(!replying);
            setText("");
          }}
        >
          <ReplyIcon fontSize="small" />
        </IconButton>
        {userId === comment.owner._id && (
          <>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => setEditing(!editing)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => onDelete(comment._id)}
              disabled={comment.content === "[deleted]"}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>

      {replying && (
        <Box sx={{ ml: 6, mt: 1, mb: 2 }}>
          <TextField
            sx={{ backgroundColor: "primary.main" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="small"
            fullWidth
            placeholder="Write a reply..."
          />
          <Button
            color="secondary"
            variant="contained"
            onClick={handleReply}
            size="small"
            sx={{ mt: 1 }}
          >
            Reply
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setReplying(false)}
            size="small"
            sx={{ mt: 1, ml: 1 }}
          >
            Cancel
          </Button>
        </Box>
      )}

      {/* Recursive rendering of replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply._id}
          comment={reply}
          userId={userId}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}
