import { Box, Stack } from "@mui/material";
import { BiCodeBlock } from "react-icons/bi";
import { IoMdPlay } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const activePage = useSelector((state) => state.pages.activePage);
  const navigate = useNavigate();

  const openEditor = () => {
    navigate(`/editor/${activePage.id}`);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "calc(100% - 300px)",
        right: 0,
        left: "300px",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box id="panel__basic-actions"></Box>
        <Stack direction="row">
          <div
            className="gjs-pn-btn gjs-two-color"
            title="كود لغة عرب"
            onClick={openEditor}
          >
            <BiCodeBlock />
          </div>
          <div
            onClick={() => window.open("/output", "_blank")}
            style={{ color: "#2e7d32" }}
            className="gjs-pn-btn gjs-two-color"
            title="تجربة الموقع"
          >
            <IoMdPlay />
          </div>
        </Stack>
        <Box id="panel__devices"></Box>
      </Stack>
      <div id="editor"></div>
    </Box>
  );
};

export default Body;
