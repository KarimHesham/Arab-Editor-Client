import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const getDesignTokens = (mode) => {
  return {
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: ["Tajawal", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Tajawal", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
