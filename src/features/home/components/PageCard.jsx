import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { MdOutlineEdit, MdDeleteOutline, MdPlayArrow } from "react-icons/md";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ar";
import { setActivePage } from "../../../redux/reducers/pagesSlice";
import { getPage } from "../../services";
import { buildPage } from "../../services/db/db";
import { LoadingIndicator } from "../../../components";
import { setLoading, setMessage } from "../../../redux/reducers/loadingSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fdfffc",
  padding: theme.spacing(2),
}));

const PageCard = ({ id, name, lastUpdate }) => {
  const loading = useSelector((state) => state.loading.isLoading);
  const loadingMessage = useSelector((state) => state.loading.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setLoadingMessage = (msg) => {
    dispatch(setMessage(msg));
  };

  const [open, setOpen] = useState(false);

  moment.locale("ar");

  // modalType: addPage | deletePage | editPageName
  const [modalType, setModalType] = useState("");

  const openEditPageNameModal = () => {
    setModalType("edit");
    setOpen(true);
  };
  const openDeletePageModal = () => {
    setModalType("delete");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openEditor = () => {
    getPage(id)
      .then((res) => {
        dispatch(setActivePage({ ...res[0] }));
        navigate(`/editor/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openGrapes = () => {
    getPage(id)
      .then((res) => {
        dispatch(setActivePage({ ...res[0] }));
        navigate(`/grapes/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const runPage = () => {
    buildPage({ id, name }, setLoadingState, setLoadingMessage).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Grid item xs={12} md={6} xl={4}>
        <Item elevation={2}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="center">
              <IconButton
                size="small"
                color="primary"
                onClick={openEditPageNameModal}
              >
                <MdOutlineEdit />
              </IconButton>
              <Typography component="h3" variant="h3" fontWeight={500} noWrap>
                {name}
              </Typography>

              {/* <IconButton
                color="success"
                aria-label="run page"
                // onClick={() => window.open("/output", "_blank")}
                onClick={() => {
                  setRunModal(true);
                  runPage(id);
                }}
              >
                <MdPlayArrow fontSize={40} />
              </IconButton> */}
            </Stack>
            {/* <Divider /> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onClick={openGrapes}
                  sx={{ fontWeight: "bold" }}
                >
                  ?????????? ?????????? ????????????
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={openEditor}
                  sx={{ fontWeight: "bold" }}
                >
                  ?????? ?????? ??????
                </Button>
              </Stack>

              <IconButton
                color="success"
                aria-label="run page"
                // onClick={() => window.open("/output", "_blank")}
                onClick={() => {
                  setLoadingMessage("???????? ???????? ????????????...");
                  setLoadingState(true);
                  runPage();
                }}
              >
                <MdPlayArrow fontSize={40} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <IconButton color="error" onClick={openDeletePageModal}>
                  <MdDeleteOutline />
                </IconButton>
              </Box>
              <Box>
                {/* <Typography component="p" variant="body2">
                  ?????? ??????????
                </Typography> */}
                <Typography component="p" variant="body2">
                  {moment(lastUpdate).locale("ar").fromNow()}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Item>
      </Grid>
      <Modal
        open={open}
        handleClose={handleClose}
        modalType={modalType}
        pageInfo={{ id: id, name: name, lastUpdate: lastUpdate }}
      />
      <LoadingIndicator open={loading} msg={loadingMessage} />
    </>
  );
};

export default PageCard;
