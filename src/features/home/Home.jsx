import { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { Navbar } from "../../components";
import { PageCard, Modal } from "./components";
import { useSelector } from "react-redux";

const Home = () => {
  const activeUser = useSelector((state) => state.user.user);

  const [open, setOpen] = useState(false);

  // modalType: add | delete | edit
  const [modalType, setModalType] = useState("");

  const openAddPageModal = () => {
    setModalType("create");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="column">
        <Navbar />
        <Box sx={{ flexGrow: 1 }} p={2}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            spacing={2}
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Typography
              align="center"
              component="h3"
              variant="h2"
              fontWeight={500}
            >
              الصفحات الخاصة بك
            </Typography>
            <Button
              onClick={openAddPageModal}
              variant="contained"
              size="large"
              startIcon={<IoAddOutline />}
              sx={{ fontSize: { xs: 15, md: 17, xl: 19 } }}
            >
              إضافة صفحة
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {activeUser?.pages?.map((page) => {
              return (
                <PageCard
                  key={page.id}
                  id={page.id}
                  name={page.name}
                  lastUpdate={page.lastUpdated}
                />
              );
            })}
          </Grid>
        </Box>
      </Stack>
      <Modal open={open} handleClose={handleClose} modalType={modalType} />
    </>
  );
};

export default Home;
