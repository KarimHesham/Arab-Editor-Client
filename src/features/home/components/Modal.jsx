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
import { createPage, deletePage, updatePage } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessage } from "../../../redux/reducers/loadingSlice";

const Modal = ({ open, handleClose, modalType, pageInfo }) => {
  const activeUser = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading.isLoading);
  const loadingMessage = useSelector((state) => state.loading.message);

  const dispatch = useDispatch();

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setLoadingMessage = (msg) => {
    dispatch(setMessage(msg));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues:
        modalType === "delete"
          ? null
          : {
              name: pageInfo?.name,
            },
      validationSchema: modalType === "delete" ? null : pageNameValidation,
      onSubmit: (values, actions) => {
        switch (modalType) {
          case "create":
            setLoadingMessage("جارى إنشاء الصفحه...");
            setLoadingState(true);
            createPage(
              { name: values.name, username: activeUser.username },
              activeUser.uid,
              dispatch,
              setLoadingState,
              setLoadingMessage
            );
            break;
          case "edit":
            setLoadingMessage("جارى التحديث...");
            setLoadingState(true);
            updatePage(
              { id: pageInfo?.id, name: values.name },
              activeUser,
              pageInfo,
              dispatch,
              setLoadingState,
              setLoadingMessage
            );
            break;
          case "delete":
            // setLoadingMessage("جارى مسح الصفحه...");
            setLoadingState(true);
            deletePage(
              pageInfo,
              activeUser,
              dispatch,
              setLoadingState,
              setLoadingMessage
            );
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
              <Button color="inherit" onClick={handleClose}>
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
