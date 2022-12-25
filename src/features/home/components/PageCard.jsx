import { useState } from "react";
import {
  Box,
  Chip,
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
import moment from "moment/min/moment-with-locales";
import { setActivePage } from "../../../redux/reducers/pagesSlice";
import { getPage } from "../../services";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fdfffc",
  padding: theme.spacing(2),
}));

const PageCard = ({ id, name, lastUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

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
              <IconButton color="success" aria-label="run page">
                <MdPlayArrow fontSize={40} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={1}>
              <Chip
                label="تصميم وجهة الصفحة"
                variant="outlined"
                color="primary"
                clickable={true}
                onClick={openGrapes}
              />
              <Chip
                label="كود لغة عرب"
                variant="outlined"
                color="secondary"
                clickable={true}
                onClick={openEditor}
              />
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
                <Typography component="p" variant="body2">
                  اخر تحديث
                </Typography>
                <Typography component="p" variant="body2" fontWeight={600}>
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
    </>
  );
};

export default PageCard;
