import React from "react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/system";

const LoadingIndicator = ({ open, msg }) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {msg ? (
              <DialogContentText gutterBottom>{msg}</DialogContentText>
            ) : null}

            <CircularProgress color="primary" />
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoadingIndicator;
