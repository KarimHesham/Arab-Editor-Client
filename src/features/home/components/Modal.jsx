import { useMemo } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useFormik } from "formik";

import { pageNameValidation } from "../../../utils/validation";
import { createPage } from "../../services";
import { useSelector } from "react-redux";

const Modal = ({ open, handleClose, modalType }) => {
  const activeUser = useSelector((state) => state.user.user);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: pageNameValidation,
      onSubmit: (values, actions) => {
        createPage({ name: values.name, username: activeUser.username });
        actions.resetForm();
      },
    });

  useMemo(() => {
    if (values.name === "") {
      touched.name = false;
    }
  }, [handleClose]);

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
          {modalType === "addPage"
            ? "إضافة صفحة"
            : modalType === "deletePage"
            ? "مسح الصفحة"
            : "تغيير اسم الصفحة"}
        </DialogTitle>
        <DialogContent>
          {modalType === "deletePage" ? (
            <DialogContentText gutterBottom>
              هل أنت متأكد من أنك تريد حذف هذه الصفحة نهائيًا
            </DialogContentText>
          ) : (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                label="اسم الصفحة"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                fullWidth
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
              <DialogActions sx={{ marginTop: "20px", padding: 0 }}>
                <Button color="error" onClick={handleClose}>
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  {modalType === "addPage"
                    ? "إضافة"
                    : modalType === "editPageName"
                    ? "تغيير"
                    : "مسح"}
                </Button>
              </DialogActions>
            </form>
          )}
          {modalType === "deletePage" && (
            <DialogActions sx={{ marginTop: "20px", padding: 0 }}>
              <Button color="error" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                مسح
              </Button>
            </DialogActions>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
