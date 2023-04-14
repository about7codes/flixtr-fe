import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type SidebarProps = {
  sidebarOpen: boolean;
  handleCloseNavMenu: () => void;
};

const Sidebar = ({ sidebarOpen, handleCloseNavMenu }: SidebarProps) => {
  const list = () => (
    <Box
      sx={{ width: 250, background: "#222", height: "100%" }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Signin", "Watchlist", "Movies", "TV Shows"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color="secondary" />
                ) : (
                  <MailIcon color="secondary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color="secondary" />
                ) : (
                  <MailIcon color="secondary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={sidebarOpen} onClose={handleCloseNavMenu}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
