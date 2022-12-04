import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { BiSave } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components";
import { setActivePage } from "../../redux/reducers/pagesSlice";
import { getPage, updatePage } from "../services";

const Editor = () => {
  const activePage = useSelector((state) => state.pages.activePage);
  const [codeInput, setCodeInput] = useState();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.darkMode);
  const pages = useSelector((state) => state.user.user.pages);

  const onChange = useCallback((value, viewUpdate) => {
    console.log("userCode:", value);
    setCodeInput(value);
  }, []);

  const openEditor = (page) => {
    dispatch(setActivePage(page));
    navigate(`/editor/${page.id}`);
  };

  const openGrapes = () => {
    navigate(`/grapes/${activePage.id}`);
  };

  useMemo(() => {
    console.log(activePage);
    getPage(activePage.id)
      .then((res) => {
        console.log(res[0]);
        dispatch(setActivePage({ ...res[0] }));
        setCodeInput(activePage.code);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Stack spacing={2} sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={3}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <IconButton
            onClick={() =>
              toggleSideBar ? setToggleSideBar(false) : setToggleSideBar(true)
            }
          >
            <IoMenuOutline style={{ width: "30px", height: "30px" }} />
          </IconButton>
          <Typography
            sx={{ maxWidth: "200px" }}
            component="p"
            variant="h4"
            noWrap
          >
            {activePage?.name}
          </Typography>
        </Stack>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button onClick={openGrapes} size="large" variant="outlined">
            تصميم وجهة الصفحة
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() =>
              updatePage({ ...activePage, code: codeInput }, "", "", dispatch)
            }
          >
            <BiSave style={{ width: "30px", height: "30px" }} />
          </Button>
          <Button color="success" variant="contained">
            <MdPlayArrow style={{ width: "35px", height: "35px" }} />
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ flexGrow: 1, height: "100%" }}>
        {toggleSideBar ? (
          <Box width="240px" mx={1}>
            {pages.map((page, index) => (
              <div key={index}>
                <Button
                  sx={{
                    fontSize: "17px",
                    textTransform: "initial",
                    justifyContent: "left",
                  }}
                  fullWidth
                  size="large"
                  variant={page.id === activePage?.id ? "outlined" : "text"}
                  onClick={() => openEditor(page)}
                >
                  <Typography component="p" noWrap>
                    {page.name}
                  </Typography>
                </Button>
                <Divider />
              </div>
            ))}
          </Box>
        ) : null}
        <CodeMirror
          style={{ flexGrow: 1 }}
          value={activePage?.code ? activePage?.code : "console.log('hello');"}
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
