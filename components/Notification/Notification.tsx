import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DomainChangeNotification = (): JSX.Element => {
  const oldDomain = "Flixbaba.com";
  const newDomain = "Flixbaba.net";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [notificationDismissed, setNotificationDismissed] =
    useState<boolean>(false);
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("domainNotificationDismissed");
    if (dismissed === "true") {
      setNotificationDismissed(true);
    }
  }, []);

  const handleDismiss = (): void => {
    localStorage.setItem("domainNotificationDismissed", "true");
    setNotificationDismissed(true);
  };

  const handleLearnMore = (): void => {
    setShowDetailDialog(true);
  };

  const handleDialogClose = (): void => {
    setShowDetailDialog(false);
  };

  const handleVisitNewDomain = (): void => {
    window.location.href = `https://${newDomain}`;
  };

  if (notificationDismissed) {
    return <></>;
  }

  return (
    <>
      {/* Banner notification */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: theme.zIndex.appBar - 1,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          py: 1,
          px: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", mb: isMobile ? 1 : 0 }}
        >
          <Typography variant={isMobile ? "body2" : "body1"} component="span">
            <strong>We&apos;ve moved!</strong> FLIXBABA is now available at
            <Button
              color="inherit"
              onClick={handleVisitNewDomain}
              sx={{
                textDecoration: "underline",
                mx: 0.5,
                p: 0,
                minWidth: "auto",
                fontWeight: "bold",
              }}
            >
              {newDomain}
            </Button>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={handleLearnMore}
            sx={{ borderColor: "rgba(0,0,0,0.5)" }}
          >
            Learn More
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleDismiss}
          >
            Got it
          </Button>
        </Box>
      </Box>

      {/* Detailed information dialog */}
      <Dialog
        open={showDetailDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
          },
        }}
      >
        <DialogTitle>We&apos;ve moved to a new domain!</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            We&apos;re excited to announce that FLIXBABA is now available at{" "}
            <strong>{newDomain}</strong>. While {oldDomain} will continue to
            work for now, we encourage you to start using our new domain.
          </Typography>
          <Typography paragraph>
            Your account, watchlist, and all your settings are already available
            at {newDomain} - simply log in with your existing credentials.
          </Typography>
          <Typography paragraph>
            Please update your bookmarks to {newDomain} for the best experience
            going forward.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
          <Button
            onClick={handleVisitNewDomain}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Visit {newDomain}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DomainChangeNotification;
