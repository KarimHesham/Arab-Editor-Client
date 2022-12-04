import { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsExport from "grapesjs-plugin-export";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

import { Body, Sidebar } from "./components";
import { panels, i18n, deviceManager, styleManager } from "./config";
import "./style.css";
import { useSelector } from "react-redux";
import { storageManager } from "./config/storageManager";

const MyBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fdfffc",
  "& .gjs-one-bg": {
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fdfffc",
  },
  "& .gjs-two-color": {
    color: theme.palette.mode === "dark" ? "#42a5f5" : "#1976d2",
  },
  "& .gjs-three-bg": {
    backgroundColor: theme.palette.mode === "dark" ? "#42a5f5" : "#1976d2",
    color: "#fdfffc",
  },
  "& .gjs-four-color": {
    color: theme.palette.mode === "dark" ? "#1976d2" : "#1565c0",
  },
  "& .gjs-four-color-h:hover": {
    color: theme.palette.mode === "dark" ? "#1976d2" : "#1565c0",
  },
  "& .gjs-pn-active": {
    color: "#7b1fa2",
  },
  input: {
    color:
      theme.palette.mode === "dark" ? "#fff !important" : "#000 !important",
  },
  "& #gjs-sm-add": {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
}));

const Grapes = () => {
  const [editor, setEditor] = useState(null);
  const activePage = useSelector((state) => state.pages.activePage);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      storageManager: storageManager(activePage.id),
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
  }, [activePage.pageId]);

  return (
    <MyBox>
      <Sidebar />
      <Body />
    </MyBox>
  );
};

export default Grapes;
