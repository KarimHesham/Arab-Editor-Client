import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";

import { cacheRtl, getDesignTokens } from "./theme";
import { Grapes, Home, Landing, Register, Editor, Output } from "./features";

function App() {
  const [mode, setMode] = useState("light");

  const darkMode = useSelector((state) => state.theme.darkMode);
  const activeUser = useSelector((state) => state.user.user);

  useMemo(() => {
    if (darkMode) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [darkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                exact
                element={activeUser ? <Navigate to="/home" /> : <Landing />}
              />
              <Route
                path="/register"
                element={activeUser ? <Navigate to="/home" /> : <Register />}
              />
              <Route
                path="/home"
                element={activeUser ? <Home /> : <Navigate to="/register" />}
              />
              <Route
                path="/editor/:pageId"
                element={activeUser ? <Editor /> : <Navigate to="/register" />}
              />
              <Route
                path="/grapes/:pageId"
                element={activeUser ? <Grapes /> : <Navigate to="/register" />}
              />
              <Route
                path="/output"
                element={activeUser ? <Output /> : <Navigate to="/register" />}
              />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
