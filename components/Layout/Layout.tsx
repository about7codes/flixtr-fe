import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Notify from "../Notify/Notify";
import ResourceValidator from "../ResourceValidator/ResourceValidator";
import DomainChangeNotification from "../Notification/Notification";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className="layout">
      <CssBaseline />
      <Notify />
      {/* <ResourceValidator /> */}
      <Box className="layout-inner">
        <Box>
          <DomainChangeNotification />
          <Navbar />
        </Box>
        <Box className="main">{children}</Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
