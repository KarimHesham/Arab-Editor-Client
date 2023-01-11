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

  const initialValues =
    modalType === "delete" ? { name: "" } : { name: pageInfo?.name || "" };

  const dispatch = useDispatch();

  const setLoadingState = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setLoadingMessage = (msg) => {
    dispatch(setMessage(msg));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: modalType === "delete" ? null : pageNameValidation,
      onSubmit: (values, actions) => {
        switch (modalType) {
          case "create":
            if (values.name !== "") {
              setLoadingMessage("جارى إنشاء الصفحه...");
              setLoadingState(true);
              createPage(
                { name: values.name, username: activeUser.username },
                activeUser.uid,
                dispatch,
                setLoadingState,
                setLoadingMessage
              );
              handleClose();
            }

            break;
          case "edit":
            if (values.name !== "") {
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
              handleClose();
            }

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
    // eslint-disable-next-line
  }, [modalType]);

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
                required
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
                onClick={modalType === "delete" ? handleClose : null}
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
