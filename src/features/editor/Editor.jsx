import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Navbar } from "../../components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Box, Stack } from "@mui/system";
import { IoMenuOutline } from "react-icons/io5";

const Editor = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const theme = useSelector((state) => state.theme.darkMode);
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("userCode:", value);
  }, []);

  return (
    <Stack>
      <Navbar />
      <Stack direction="row">
        {toggleSideBar ? (
          <Box>
            <Stack height="100px" width="200px"></Stack>
          </Box>
        ) : null}

        <Box sx={{ flexGrow: 1 }}>
          <Stack bgcolor="primary" justifyContent="center">
            <IoMenuOutline
              onClick={() =>
                toggleSideBar ? setToggleSideBar(false) : setToggleSideBar(true)
              }
            />
          </Stack>
          <CodeMirror
            value="console.log('hello world!');"
            theme={theme ? "dark" : "light"}
            width="100%"
            height="100vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Editor;
