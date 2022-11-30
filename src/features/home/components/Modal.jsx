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
import { createPage, deletePage } from "../../services";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ open, handleClose, modalType, pageInfo }) => {
  const activeUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues:
        modalType === "delete"
          ? null
          : {
              name: "",
            },
      validationSchema: modalType === "delete" ? null : pageNameValidation,
      onSubmit: (values, actions) => {
        switch (modalType) {
          case "create":
            createPage(
              { name: values.name, username: activeUser.username },
              activeUser.uid,
              dispatch
            );
            break;
          case "delete":
            deletePage(pageInfo.id, pageInfo.name, activeUser, dispatch);
            break;
          default:
            break;
        }

        actions.resetForm();
      },
    });

  useMemo(() => {
    if (values.name === "") {
      touched.name = false;
    }
  }, [touched, values.name]);

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
          {modalType === "create"
            ? "إضافة صفحة"
            : modalType === "delete"
            ? "مسح الصفحة"
            : "تغيير اسم الصفحة"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            {modalType === "delete" ? (
              <DialogContentText gutterBottom>
                هل أنت متأكد من أنك تريد حذف هذه الصفحة نهائيًا
              </DialogContentText>
            ) : (
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
            )}
            <DialogActions sx={{ marginTop: "20px", padding: 0 }}>
              <Button color="error" onClick={handleClose}>
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                color={modalType === "delete" ? "error" : "primary"}
                onClick={handleClose}
              >
                {modalType === "create"
                  ? "إضافة"
                  : modalType === "edit"
                  ? "تغيير"
                  : "مسح"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
