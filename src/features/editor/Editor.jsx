import React, { useCallback, useMemo, useState } from "react";
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

import { Navbar, LoadingIndicator } from "../../components";
import { setActivePage } from "../../redux/reducers/pagesSlice";
import { getPage, updatePage } from "../services";
import { buildPage } from "../services/db/db";
import { setLoading, setMessage } from "../../redux/reducers/loadingSlice";

const Editor = () => {
  const activePage = useSelector((state) => state.pages.activePage);
  const activeUser = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading.isLoading);
  const loadingMessage = useSelector((state) => state.loading.message);
  const theme = useSelector((state) => state.theme.darkMode);
  const pages = useSelector((state) => state.user.user.pages);

  const [codeInput, setCodeInput] = useState();
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setLoadingMessage = (msg) => {
    dispatch(setMessage(msg));
  };

  const onChange = useCallback((value, viewUpdate) => {
    console.log("userCode:", value);
    setCodeInput(value);
  }, []);

  const openEditor = (page) => {
    getPage(page.id)
      .then((res) => {
        dispatch(setActivePage({ ...res[0] }));
        navigate(`/editor/${page.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openGrapes = () => {
    navigate(`/grapes/${activePage.id}`);
  };

  useMemo(() => {
    getPage(activePage.id)
      .then((res) => {
        dispatch(setActivePage({ ...res[0] }));
        setCodeInput(activePage.code.arab || "");
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  const runPage = () => {
    buildPage(
      {
        ...activePage,
        code: { ...activePage.code, arab: codeInput },
      },
      setLoadingState,
      setLoadingMessage
    ).catch((err) => {
      console.log(err);
    });
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
              updatePage(
                {
                  ...activePage,
                  code: { ...activePage.code, arab: codeInput },
                },
                activeUser,
                "",
                dispatch
              )
            }
          >
            <BiSave style={{ width: "30px", height: "30px" }} />
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setLoadingMessage("جارى بناء الصفحه...");
              setLoadingState(true);
              runPage();
            }}
          >
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
          value={activePage?.code?.arab ? activePage?.code.arab : ""}
          theme={theme ? "dark" : "light"}
          height="100%"
          width="100%"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </Stack>
      <LoadingIndicator open={loading} msg={loadingMessage} />
    </Stack>
  );
};

export default Editor;
