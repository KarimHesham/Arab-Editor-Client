import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import logo from "../../../assets/arab-logo.png";

const Header = () => {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center" py={1}>
      <img src={logo} alt="" width={200} height={150} />
      <Stack height={20} />
      <Link to="/register">
        <Button variant="contained" size="large" sx={{ fontSize: 30 }}>
          ابدأ الآن
        </Button>
      </Link>
    </Stack>
  );
};

export default Header;
