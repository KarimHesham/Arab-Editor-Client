import { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsExport from "grapesjs-plugin-export";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { Body, Sidebar } from "./components";
import { panels, i18n, deviceManager, styleManager } from "./config";
import "./styles/style.css";
import { useSelector } from "react-redux";
import { storageManager } from "./config/storageManager";

const MyBox = styled(Box)(({ theme }) => ({
  "& .gjs-one-bg": {
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fdfffc",
  },
  "& .gjs-two-color , input , & select.gjs-input-unit": {
    color: theme.palette.mode === "dark" ? "#B8B8B8" : "rgba(0, 0, 0, 0.87)",
  },
  "& .gjs-four-color , .gjs-four-color-h:hover , & .gjs-pn-btn": {
    color: theme.palette.mode === "dark" ? "#42A5F5" : "#1565c0",
  },
  "& .gjs-four-color-h:hover": {
    color: theme.palette.mode === "dark" ? "#eee" : "#000",
  },
  "& .gjs-pn-active": {
    color: theme.palette.mode === "dark" ? "#ba68c8" : "#7b1fa2",
  },
  "& .gjs-color-warn": {
    color: theme.palette.mode === "dark" ? "#ba68c8" : "#7b1fa2",
  },
  "& .gjs-clm-sel-id": {
    color: theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
  },
  "& #gjs-sm-add , #gjs-clm-new": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

const Grapes = () => {
  // eslint-disable-next-line
  const [editor, setEditor] = useState(null);
  const activePage = useSelector((state) => state.pages.activePage);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      storageManager: storageManager(activePage),
      plugins: [gjsBlocksBasic, gjsExport],
      pluginsOpts: {
        gjsBlocksBasic: {},
        gjsExport: {},
      },
      i18n: i18n,
      panels: panels,
      deviceManager: deviceManager,
      selectorManager: {
        appendTo: "#style-container",
      },
      styleManager: styleManager,
      blockManager: {
        appendTo: "#blocks-container",
      },
      layerManager: {
        appendTo: "#layer-container",
      },
      traitManager: {
        appendTo: "#trait-container",
      },
    });

    editor.Commands.add("desktop", {
      run: (editor) => editor.setDevice("desktop"),
    });

    editor.Commands.add("mobilePortrait", {
      run: (editor) => editor.setDevice("mobilePortrait"),
    });

    editor.Commands.add("tablet", {
      run: (editor) => editor.setDevice("tablet"),
    });

    editor.Commands.add("undo", {
      run: (editor) => editor.UndoManager.undo(),
    });

    editor.Commands.add("redo", {
      run: (editor) => editor.UndoManager.redo(),
    });

    setEditor(editor);
    // eslint-disable-next-line
  }, [activePage.pageId]);

  return (
    <MyBox>
      <Sidebar />
      <Body />
    </MyBox>
  );
};

export default Grapes;
