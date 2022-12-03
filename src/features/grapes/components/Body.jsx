import { Box, Stack } from "@mui/material";
import { BsFileEarmarkCode } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
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
        width: "calc(100% - 350px)",
        right: 0,
        left: "350px",
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
            <BsFileEarmarkCode />
          </div>
          <div className="gjs-pn-btn gjs-two-color" title="تجربة الموقع">
            <MdPlayArrow />
          </div>
        </Stack>
        <Box id="panel__devices"></Box>
      </Stack>
      <div id="editor"></div>
    </Box>
  );
};

export default Body;
