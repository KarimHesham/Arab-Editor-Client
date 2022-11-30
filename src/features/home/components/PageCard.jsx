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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fdfffc",
  padding: theme.spacing(2),
}));

const PageCard = ({ id, name }) => {
  const navigate = useNavigate();
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
              />
              <Chip
                label="كود لغة عرب"
                variant="outlined"
                color="secondary"
                clickable={true}
                onClick={() => navigate("/editor")}
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
                  زمن
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
        pageInfo={{ id: id, name: name }}
      />
    </>
  );
};

export default PageCard;
