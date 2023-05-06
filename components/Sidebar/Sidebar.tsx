import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Collapse,
  Avatar,
  ButtonBase,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import { appRoutes } from "../Navbar/Navbar";
import { useCustomRedirect } from "../../hooks/app.hooks";
import { useRouter } from "next/router";

type SidebarProps = {
  sidebarOpen: boolean;
  handleCloseNavMenu: () => void;
};

const Sidebar = ({ sidebarOpen, handleCloseNavMenu }: SidebarProps) => {
  const router = useRouter();
  const { customRedirect } = useCustomRedirect();

  const [isDropped, setIsDropped] = useState(appRoutes[0].title);

  const list = () => (
    <Box sx={{ width: 250, height: "100%" }} role="presentation">
      <Divider />
      <List>
        {/* mobile btn links */}
        {appRoutes.map(({ title, icon, path, childRoutes }) => (
          <ListItem
            key={title}
            disablePadding
            onClick={() => {
              if (path) {
                customRedirect(path);
                handleCloseNavMenu();
              } else {
                setIsDropped(title);
              }
            }}
            sx={{ display: "block" }}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
              {!path && (isDropped == title ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={isDropped == title} timeout="auto" unmountOnExit>
              {childRoutes &&
                childRoutes.map(({ childTitle, childPath }) => (
                  <List component="div" disablePadding key={childPath}>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        customRedirect(childPath);
                        handleCloseNavMenu();
                      }}
                      selected={router.asPath === childPath}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={childTitle} />
                    </ListItemButton>
                  </List>
                ))}
            </Collapse>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {["Signin", "Signout", "Signup"].map((text, index) => (
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
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={handleCloseNavMenu}
        sx={{
          ".MuiDrawer-paperAnchorLeft": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <ButtonBase
          sx={{
            p: "40px",
            display: "grid",
            placeContent: "center",
          }}
          onClick={() => {
            customRedirect("/"); // to profile page
            handleCloseNavMenu();
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: 100,
              height: 100,
              fontSize: "50px",
            }}
          >
            JD
          </Avatar>
        </ButtonBase>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
