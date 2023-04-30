import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Sidebar from "../Sidebar/Sidebar";
import { useCustomRedirect } from "../../hooks/app.hooks";
import SearchAuto from "../SearchAuto/SearchAuto";
import { SearchData } from "../../types/apiResponses";

type NavbarProps = {};

export const appRoutes = [
  {
    title: "Movies",
    icon: <OndemandVideoIcon color="secondary" />,
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
    icon: <LiveTvIcon color="secondary" />,
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
    icon: <SubscriptionsIcon color="secondary" />,
    path: "/watchlist",
  },
];

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const { customRedirect } = useCustomRedirect();
  const [searchVal, setSearchVal] = useState<string>();
  const [searchData, setSearchData] = useState<SearchData>();
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

  const handleCloseNavMenu = () => {
    setSidebarOpen(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenuLinks = (
    event: React.MouseEvent<HTMLElement>,
    title: string
  ) => {
    setAnchorElLinks(event.currentTarget);
    setOpenLinksMenu(title);
  };

  const handleCloseMenuLinks = () => {
    setAnchorElLinks(null);
    setOpenLinksMenu(null);
  };

  const getSearchResults = async () => {
    const data = await getSearchQuery(searchVal);
    setSearchData(data);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ color: "secondary.main" }}>
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
              FLIXTR
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
                    sx={{ my: 2, color: "secondary.main", display: "block" }}
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
                        background: "#333",
                      },
                    }}
                  >
                    {childRoutes &&
                      childRoutes.map(({ childTitle, childPath }) => (
                        <MenuItem
                          key={childPath}
                          sx={{
                            "&:hover": {
                              backgroundColor: "secondary.main",
                              color: "#303030",
                            },
                          }}
                          onClick={() => {
                            customRedirect(childPath ? childPath : "/");
                            handleCloseMenuLinks();
                          }}
                        >
                          {childTitle ? childTitle : ""}
                        </MenuItem>
                      ))}
                  </Menu>
                </Box>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchVal || ""}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyUp={(e) => {
                      if (
                        e.keyCode !== 38 &&
                        e.keyCode !== 40 &&
                        e.key == "Enter"
                      ) {
                        getSearchResults();
                      }
                    }}
                  />
                </Search>
                <SearchAuto searchData={searchData} />
              </Box>
              <Box sx={{ ml: 1 }}>
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
                      background: "#333",
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
                    <MenuItem
                      sx={{
                        "&:hover": {
                          background: "#96bdd9",
                          color: "#303030",
                        },
                      }}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginLeft: 0,
  // marginRight: 10,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const getSearchQuery = async (
  searchValue?: string | string[]
): Promise<SearchData> => {
  try {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${searchValue}`
    );
    const searchData = await searchRes.json();

    // console.log("SearchData", searchData);

    // failure if 'success' property exists
    if (searchData.hasOwnProperty("success"))
      throw new Error("Api call failed");

    return searchData;
  } catch (error) {
    console.log(error);
    throw new Error("Api call failed");
  }
};

export default Navbar;
