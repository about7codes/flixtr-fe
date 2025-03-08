import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useDetectAdBlock as useDetect } from "adblock-detect-react";
import { styles as classes } from "./resourceValidator.styles";

const ResourceValidator = () => {
  const detected = useDetect();
  const [open, setOpen] = useState(detected);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (open) {
      htmlElement.classList.add("no-scroll");
    } else {
      htmlElement.classList.remove("no-scroll");
    }

    return () => {
      htmlElement.classList.remove("no-scroll");
    };
  }, [open]);

  useEffect(() => {
    if (detected) setOpen(true);
  }, [detected]);

  type eventType =
    | React.MouseEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLDivElement>;
  type reasonType = "backdropClick" | "escapeKeyDown" | "buttonClick";

  const handleClose = (event: eventType, reason: reasonType) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }

    const isStillEnabled = useDetect();
    if (!isStillEnabled) setOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={classes.modalBox}>
        <Typography id="modal-title" variant="h6" component="h2">
          Ad Blocker Detected
        </Typography>
        <Typography id="modal-description" sx={classes.modalDesc}>
          We rely on ads to keep our service free. Please disable your ad
          blocker to continue using our site.
        </Typography>
        <Button
          onClick={handleRefresh}
          sx={classes.modalBtn}
          variant="contained"
          color="secondary"
          fullWidth
        >
          Refresh Page
        </Button>
      </Box>
    </Modal>
  );
};

export default ResourceValidator;
