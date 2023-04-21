import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Sidebar from "../Sidebar/Sidebar";
import { useCustomRedirect } from "../../hooks/app.hooks";

type NavbarProps = {};

export const appRoutes = [
  {
    title: "Movies",
    childRoutes: [
      {
        childTitle: "Popular",
        childPath: "/movie/popular",
      },
      {
        childTitle: "Recent",
        childPath: "/movie/recent",
      },
      {
        childTitle: "Top rated",
        childPath: "/movie/top-rated",
      },
    ],
  },
  {
    title: "TV Shows",
    childRoutes: [
      {
        childTitle: "Popular",
        childPath: "/tv/popular",
      },
      {
        childTitle: "Recent",
        childPath: "/tv/recent",
      },
      {
        childTitle: "Top rated",
        childPath: "/tv/top-rated",
      },
    ],
  },
  {
    title: "Watchlist",
    path: "/watchlist",
  },
];

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const { customRedirect } = useCustomRedirect();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElLinks, setAnchorElLinks] = useState<null | HTMLElement>(null);
  const [openLinksMenu, setOpenLinksMenu] = useState<null | string>(null);



  const handleOpenNavMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    console.log("path: ", path);
    setSidebarOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenuLinks = (event: React.MouseEvent<HTMLElement>, title: string) => {
    setAnchorElLinks(event.currentTarget);
    setOpenLinksMenu(title);
  };

  const handleCloseMenuLinks = () => {
    setAnchorElLinks(null);
    setOpenLinksMenu(null);
  };


  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FLIXTR
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* desktop btn links */}
              {appRoutes.map(({ title, path, childRoutes }) => (
                <Box key={title}>
                  <Button
                    onClick={(e) => {
                      if (path) {
                        customRedirect(path);
                      } else {
                        handleClickMenuLinks(e, title);
                      }
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {title}
                  </Button>
                  <Menu
                    id="link-menu"
                    anchorEl={anchorElLinks}
                    open={openLinksMenu == title}
                    onClose={handleCloseMenuLinks}
                    sx={{
                      "& .MuiMenu-list, & .MuiMenu-paper": {
                        background: '#333'
                      },
                    }}
                  >
                    {childRoutes && childRoutes.map(({ childTitle, childPath }) => (
                      <MenuItem
                        key={childPath}
                        sx={{
                          "&:hover": {
                            background: '#96bdd9',
                            color: '#303030',
                          },
                        }}
                        onClick={() => {
                          customRedirect(childPath ? childPath : '/');
                          handleCloseMenuLinks();
                        }}
                      >{childTitle ? childTitle : ''}</MenuItem>

                    ))}
                  </Menu>
                </Box>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                  // src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiMenu-list, & .MuiMenu-paper": {
                    background: '#333'
                  },
                }}

                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}

              >
                {settings.map((setting) => (
                  <MenuItem sx={{
                    "&:hover": {
                      background: '#96bdd9',
                      color: '#303030',
                    },
                  }} key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleCloseNavMenu={handleCloseNavMenu}
      />
    </>
  );
};

export default Navbar;
