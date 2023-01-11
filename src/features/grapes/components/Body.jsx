import { Box, Stack } from "@mui/material";
import { BiCodeBlock } from "react-icons/bi";
import { IoMdPlay } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "../../../components";
import { setLoading, setMessage } from "../../../redux/reducers/loadingSlice";
import { buildPage } from "../../services/db/db";

const Body = () => {
  const loading = useSelector((state) => state.loading.isLoading);
  const loadingMessage = useSelector((state) => state.loading.message);
  const activePage = useSelector((state) => state.pages.activePage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setLoadingMessage = (msg) => {
    dispatch(setMessage(msg));
  };

  const openEditor = () => {
    navigate(`/editor/${activePage.id}`);
  };
  const runPage = () => {
    buildPage(activePage, setLoadingState, setLoadingMessage).catch((err) => {
      console.log(err);
    });
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
            onClick={() => {
              setLoadingMessage("جارى بناء الصفحه...");
              setLoadingState(true);
              runPage();
            }}
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

      <LoadingIndicator open={loading} msg={loadingMessage} />
    </Box>
  );
};

export default Body;
