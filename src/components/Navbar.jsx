import { Link } from "react-router-dom";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { MdBrightness6 } from "react-icons/md";
import { useDispatch } from "react-redux";

import logo from "../assets/arab-logo.png";
import { asyncToggleTheme } from "../store/reducers/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={45} />
        </Link>
        <IconButton onClick={() => dispatch(asyncToggleTheme())} size="large">
          <MdBrightness6 />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
