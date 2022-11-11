import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const Header = () => {
  return (
    <Stack flex={1} alignItems="center" justifyContent="center" py={1}>
      <Link to="/register">
        <Button variant="contained" size="large" sx={{ fontSize: 30 }}>
          ابدأ الآن
        </Button>
      </Link>
    </Stack>
  );
};

export default Header;
