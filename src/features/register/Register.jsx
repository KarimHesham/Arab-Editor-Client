import { Stack } from "@mui/material";

import { Navbar } from "../../components";
import { Forms } from "./components";

const Register = () => {
  return (
    <Stack direction="column" minHeight="100vh">
      <Navbar />
      <Forms />
    </Stack>
  );
};

export default Register;
