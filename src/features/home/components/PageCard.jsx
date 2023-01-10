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
import { useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ar";
import { setActivePage } from "../../../redux/reducers/pagesSlice";
import { getPage } from "../../services";
import { buildPage } from "../../services/db/db";
import { RunModal } from "../../../components";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fdfffc",
  padding: theme.spacing(2),
}));

const PageCard = ({ id, name, lastUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  moment.locale("ar");

  // modalType: addPage | deletePage | editPageName
  const [modalType, setModalType] = useState("");
  const [runModal, setRunModal] = useState(false);

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

  const runPage = (id) => {
    buildPage(id, setRunModal).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Grid item xs={12} md={6} xl={4}>
        <Item elevation={2}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="h3" variant="h3" fontWeight={500} noWrap>
                {name}
              </Typography>
              <IconButton
                color="success"
                aria-label="run page"
                // onClick={() => window.open("/output", "_blank")}
                onClick={() => {
                  setRunModal(true);

                  runPage(id);
                }}
              >
                <MdPlayArrow fontSize={40} />
              </IconButton>
            </Stack>
            {/* <Divider /> */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={openGrapes}
                sx={{ fontWeight: "bold" }}
              >
                تصميم واجهة الصفحة
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={openEditor}
                sx={{ fontWeight: "bold" }}
              >
                كود لغة عرب
              </Button>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <IconButton color="primary" onClick={openEditPageNameModal}>
                  <MdOutlineEdit />
                </IconButton>
                <IconButton color="error" onClick={openDeletePageModal}>
                  <MdDeleteOutline />
                </IconButton>
              </Box>
              <Box>
                {/* <Typography component="p" variant="body2">
                  اخر تحديث
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
      <RunModal open={runModal} />
    </>
  );
};

export default PageCard;
