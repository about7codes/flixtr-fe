import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import InsightsIcon from "@mui/icons-material/Insights";
import StarIcon from "@mui/icons-material/Star";
import { signIn, signOut, useSession } from "next-auth/react";

import Sidebar from "../Sidebar/Sidebar";
import { useCustomRedirect, usePageLoading } from "../../hooks/app.hooks";
import SearchAuto from "../SearchAuto/SearchAuto";
import { styles as classes } from "./navbar.styles";
import { useQuery } from "@tanstack/react-query";
import { MovieQueryKey } from "../../hooks/movies.hooks";
import { getSearchQuery } from "../../apis/search.api";
import Loader from "../Loader/Loader";
import { useRouter } from "next/router";

export const appRoutes = [
  {
    title: "Movies",
    icon: <OndemandVideoIcon />,
    childRoutes: [
      {
        childTitle: "Popular",
        childPath: "/movie/popular",
        childIcon: <InsightsIcon />,
      },
      {
        childTitle: "Recent",
        childPath: "/movie/recent",
        childIcon: <AutoModeIcon />,
      },
      {
        childTitle: "Top rated",
        childPath: "/movie/top-rated",
        childIcon: <StarIcon />,
      },
    ],
  },
  {
    title: "TV Shows",
    icon: <LiveTvIcon />,
    childRoutes: [
      {
        childTitle: "Popular",
        childPath: "/tv/popular",
        childIcon: <InsightsIcon />,
      },
      {
        childTitle: "Recent",
        childPath: "/tv/recent",
        childIcon: <AutoModeIcon />,
      },
      {
        childTitle: "Top rated",
        childPath: "/tv/top-rated",
        childIcon: <StarIcon />,
      },
    ],
  },
  {
    title: "Watchlist",
    icon: <SubscriptionsIcon />,
    path: "/watchlist",
  },
];

const settings = ["Profile", "Logout"];

const Navbar = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  // console.log("sessionData: ", sessionData);

  const isPageLoading = usePageLoading();
  const { customRedirect } = useCustomRedirect();

  const [searchVal, setSearchVal] = useState<string>();
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  const [isMobileSearch, setIsMobileSearch] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElLinks, setAnchorElLinks] = useState<null | HTMLElement>(null);
  const [openLinksMenu, setOpenLinksMenu] = useState<null | string>(null);

  const {
    data: searchData,
    isFetching,
    isError,
  } = useSearchQuery(searchVal ? searchVal : "");

  // console.log("QueryErrorxx: ", error);
  // console.log("isLoading: ", isLoading);
  // console.log("isFetching: ", isFetching);

  const handleOpenNavMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setSidebarOpen(false);
  };

  const handleCloseUserMenu = async (
    event: React.MouseEvent<HTMLElement>,
    btnKey?: string
  ) => {
    if (btnKey == "Logout") await signOut({ redirect: false });
    if (btnKey == settings[0]) customRedirect("/profile");
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

  return (
    <>
      {isPageLoading && <Loader />}
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ color: "secondary.main" }} id="app-nav">
          <Toolbar disableGutters>
            <Avatar
              src="/assets/flixtr.png"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: "24px",
                height: "24px",
              }}
            />

            <Typography
              noWrap
              variant="h6"
              component={Link}
              href="/"
              sx={classes.logoTxt}
            >
              FLIXBABA
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
            <Avatar
              src="/assets/flixtr.png"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                width: "24px",
                height: "24px",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={classes.logoTxtMob}
            >
              FLIXBABA
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
                    onFocus={() => setIsResultsVisible(true)}
                    onBlur={() => setIsResultsVisible(false)}
                    onKeyUp={(e) => {
                      if (e.key == "Enter") {
                        e.currentTarget.blur();
                        customRedirect("/search?q=" + (searchVal ?? ""));
                      }
                    }}
                  />

                  {isFetching && (
                    <LinearProgress
                      color="secondary"
                      sx={{
                        backgroundColor: "primary.main",
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        zIndex: 2,
                      }}
                    />
                  )}
                </Search>
                <SearchAuto
                  searchVal={searchVal}
                  searchData={searchData}
                  isResultsVisible={isResultsVisible}
                  isError={isError}
                />
              </Box>
              <Box sx={{ ml: 1, display: { xs: "none", md: "flex" } }}>
                {sessionData?.user ? (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={`/assets/${
                          sessionData.user?.user?.propic ?? 1
                        }.png`}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      router.pathname !== "/login" ? signIn() : null
                    }
                  >
                    Login
                  </Button>
                )}
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
                          backgroundColor: "secondary.main",
                          color: "#303030",
                        },
                      }}
                      key={setting}
                      onClick={(e) => handleCloseUserMenu(e, setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  onClick={() => setIsMobileSearch((prev) => !prev)}
                  aria-label="upload picture"
                  sx={{ color: isMobileSearch ? "#fff" : "secondary.main" }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>

          {isMobileSearch && (
            <Box
              sx={{
                mb: 1,
                position: "relative",
                display: { xs: "block", md: "none" },
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  autoFocus
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchVal || ""}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setIsResultsVisible(true)}
                  onBlur={() => setIsResultsVisible(false)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                      customRedirect("/search?q=" + (searchVal ?? ""));
                    }
                  }}
                />

                {isFetching && (
                  <LinearProgress
                    color="secondary"
                    sx={{
                      backgroundColor: "primary.main",
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      zIndex: 2,
                    }}
                  />
                )}
              </Search>
              <SearchAuto
                searchVal={searchVal}
                searchData={searchData}
                isResultsVisible={isResultsVisible}
                isError={isError}
              />
            </Box>
          )}
        </Container>
      </AppBar>
      <Sidebar
        sidebarOpen={sidebarOpen}
        handleCloseNavMenu={handleCloseNavMenu}
      />
    </>
  );
};

export const useSearchQuery = (searchQuery?: string | string[]) => {
  return useQuery(
    [MovieQueryKey.SearchQuery, searchQuery],
    () => getSearchQuery(1, searchQuery),
    { enabled: !!searchQuery }
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
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
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default Navbar;
