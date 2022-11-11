import { Stack } from "@mui/material";

import { Forms, Navbar } from "./components";

const Register = () => {
  return (
    <Stack direction="column" minHeight="100vh">
      <Navbar />
      <Forms />
    </Stack>
  );
};

export default Register;
