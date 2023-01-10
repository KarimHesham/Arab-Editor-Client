import React from "react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/system";

const RunModal = ({ open }) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <DialogContentText gutterBottom>
              ...جارى بناء الصفحه
            </DialogContentText>
            <CircularProgress color="primary" />
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RunModal;
