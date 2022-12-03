import { Box, Stack } from "@mui/material";

const Body = () => {
  return (
    <>
      {/* main content width & left properties depend on the sidebar width */}
      <Box
        sx={{
          position: "relative",
          width: "calc(100% - 350px)",
          right: 0,
          left: "350px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box id="panel__basic-actions"></Box>
          <Box id="panel__devices"></Box>
        </Stack>
        <div id="editor"></div>
      </Box>
    </>
  );
};

export default Body;
