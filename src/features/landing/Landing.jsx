import React from "react";
import { Stack } from "@mui/material";

import { Header, Navbar } from "./components";

const Landing = () => {
  return (
    <Stack direction="column" minHeight="100vh">
      <Navbar />
      <Header />
    </Stack>
  );
};

export default Landing;
