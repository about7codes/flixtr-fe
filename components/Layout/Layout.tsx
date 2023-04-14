import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className="layout">
      <CssBaseline />
      <Box className="layout-inner">
        <Box>
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
