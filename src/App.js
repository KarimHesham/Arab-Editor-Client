import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";

import { cacheRtl, getDesignTokens } from "./theme";
import { Register } from "./features/register";
import { Landing } from "./features/landing";

function App() {
  const [mode, setMode] = useState("light");
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
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
