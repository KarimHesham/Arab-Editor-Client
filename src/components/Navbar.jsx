import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdBrightness6, MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/arab-logo.png";
import { asyncToggleTheme } from "../redux/reducers/themeSlice";
import { authenticate } from "../features/services/auth/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const activeUser = useSelector((state) => state.user.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useMemo(() => {
  //   if (user) {
  //   }
  // }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/home" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={45} />
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <IconButton onClick={() => dispatch(asyncToggleTheme())}>
            <MdBrightness6 style={{ width: "30px", height: "30px" }} />
          </IconButton>

          {user ? (
            <div>
              <IconButton onClick={handleClick}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  alt=""
                  src={activeUser?.photoURL && activeUser?.photoURL}
                ></Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{ marginTop: "38px" }}
              >
                <Box px={2} pb={1}>
                  <Typography component="p" variant="subtitle1">
                    مرحبًا
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={600}
                  >
                    {activeUser?.username}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => {
                    authenticate("logout", "", "", dispatch, navigate);
                    handleClose();
                  }}
                >
                  <MdOutlineLogout
                    style={{ paddingLeft: "10px", fontSize: "25px" }}
                  />
                  تسجيل خروج
                </MenuItem>
              </Menu>
            </div>
          ) : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
