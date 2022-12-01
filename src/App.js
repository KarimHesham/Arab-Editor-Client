import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

import { cacheRtl, getDesignTokens } from "./theme";
import { Editor, Home, Landing, Register } from "./features";
import { auth } from "./config";

function App() {
  const [mode, setMode] = useState("light");
  const [user] = useAuthState(auth);

  const darkMode = useSelector((state) => state.theme.darkMode);

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
              <Route path="/" exact element={<Landing />} />
              <Route
                path="/register"
                element={user ? <Navigate to="/home" /> : <Register />}
              />
              <Route path="/home" element={<Home />} />
              <Route path="/editor/:pageId" element={<Editor />} />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
