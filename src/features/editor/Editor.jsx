import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { IoMenuOutline } from "react-icons/io5";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components";
import { setActivePage } from "../../redux/reducers/pagesSlice";

const Editor = () => {
  const activePage = useSelector((state) => state.pages.activePage);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.darkMode);
  const pages = useSelector((state) => state.user.user.pages);

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("userCode:", value);
  }, []);

  const openPage = (page) => {
    dispatch(setActivePage(page));
    navigate(`/editor/${page.id}`);
  };

  return (
    <Stack spacing={2} sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={3}
      >
        <IconButton
          onClick={() =>
            toggleSideBar ? setToggleSideBar(false) : setToggleSideBar(true)
          }
        >
          <IoMenuOutline style={{ width: "30px", height: "30px" }} />
        </IconButton>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography component="p" variant="h3">
            {activePage.name}
          </Typography>
          <Button color="success" variant="contained">
            <MdPlayArrow style={{ width: "40px", height: "40px" }} />
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ flexGrow: 1, height: "100%" }}>
        {toggleSideBar ? (
          <Box width="240px">
            {pages.map((page) => (
              <>
                <Button
                  sx={{ fontSize: "17px", textTransform: "initial" }}
                  fullWidth
                  size="large"
                  variant="text"
                  key={page.id}
                  onClick={() => openPage(page)}
                >
                  <Typography component="p" noWrap>
                    {page.name}
                  </Typography>
                </Button>
                <Divider />
              </>
            ))}
          </Box>
        ) : null}
        <CodeMirror
          style={{ flexGrow: 1 }}
          value="console.log('hello world!');"
          theme={theme ? "dark" : "light"}
          height="100%"
          width="100%"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </Stack>
    </Stack>
  );
};

export default Editor;
