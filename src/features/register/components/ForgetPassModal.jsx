import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ForgetPassModal({ handleCloseModal, openModal }) {
  return (
    <div>
      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogContent dividers>
          <Typography gutterBottom>
            ستتلقى رسالة بريد إلكتروني تحتوي على إرشادات حول إعادة تعيين كلمة
            المرور الخاصة بك. إذا لم يصل ، فتأكد من التحقق من مجلد الرسائل غير
            المرغوب فيها.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            العودة لتسجيل الدخول
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
