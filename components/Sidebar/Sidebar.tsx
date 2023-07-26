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
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { styles as classes } from "./sidebar.styles";
import { appRoutes } from "../Navbar/Navbar";
import { useCustomRedirect } from "../../hooks/app.hooks";

type SidebarProps = {
  sidebarOpen: boolean;
  handleCloseNavMenu: () => void;
};

const Sidebar = ({ sidebarOpen, handleCloseNavMenu }: SidebarProps) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { customRedirect } = useCustomRedirect();

  const [isDropped, setIsDropped] = useState(appRoutes[0].title);

  const handleSignIn = () => {
    if (router.pathname !== "/login") signIn();
    handleCloseNavMenu();
  };

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
            <ListItemButton selected={router.asPath === path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
              {!path && (isDropped == title ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={isDropped == title} timeout="auto" unmountOnExit>
              {childRoutes &&
                childRoutes.map(({ childTitle, childPath, childIcon }) => (
                  <List component="div" disablePadding key={childPath}>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        customRedirect(childPath);
                        handleCloseNavMenu();
                      }}
                      selected={router.asPath === childPath}
                    >
                      <ListItemIcon>{childIcon}</ListItemIcon>
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
        {sessionData?.user ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={async () => {
                await signOut({ redirect: false });
                handleCloseNavMenu();
              }}
            >
              <ListItemIcon>
                <LogoutIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSignIn}
                selected={router.pathname === "/login"}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Signin" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  customRedirect("/signup");
                  handleCloseNavMenu();
                }}
                selected={router.pathname === "/signup"}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={handleCloseNavMenu}
        sx={classes.drawer}
      >
        {sessionData?.user ? (
          <ButtonBase
            sx={classes.profileBtn}
            onClick={() => {
              customRedirect("/profile"); // to profile page
              handleCloseNavMenu();
            }}
          >
            <Avatar
              sx={classes.profileIco}
              src={`/assets/${sessionData?.user?.user?.propic ?? 1}.png`}
            />
          </ButtonBase>
        ) : (
          <ButtonBase sx={classes.profileBtn} onClick={handleSignIn}>
            <Avatar sx={classes.profileIco}>
              <LoginIcon fontSize="inherit" />
            </Avatar>
          </ButtonBase>
        )}

        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
