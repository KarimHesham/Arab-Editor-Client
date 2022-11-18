import { useMemo, useState } from "react";
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";

import {
  loginRegisterValidation,
  forgetPasswordValidation,
} from "./../../../utils/validation";
import ForgetPassModal from "./ForgetPassModal";
import { authenticate } from "../services/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Note: may add confirm password in signUp & eye icons in password input
const Forms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // formType: signUp | signIn | forgetPassword
  const [formType, setFormType] = useState("register");

  const initialValues =
    formType !== "reset" ? { email: "", password: "" } : { email: "" };

  const validationSchema =
    formType !== "reset" ? loginRegisterValidation : forgetPasswordValidation;

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      formType === "reset"
        ? authenticate(formType, "", payload.email)
        : authenticate(formType, "local", payload, dispatch, navigate);

      actions.resetForm();
    },
  });

  useMemo(() => {
    if (values.email === "") {
      touched.email = false;
    }
    if (values.password === "") {
      touched.password = false;
    }
  }, [formType]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setFormType("login");
    setOpenModal(false);
  };

  return (
    <>
      <Stack flex={1} alignItems="center" justifyContent="center" py={1}>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{ width: "90%", maxWidth: "350px" }}
        >
          {formType === "register" || formType === "login" ? (
            <>
              <Button
                sx={{ fontSize: "20px" }}
                variant="outlined"
                size="large"
                startIcon={<FcGoogle />}
                fullWidth
                onClick={() => authenticate(formType, "google", "")}
              >
                حساب جوجل
              </Button>
              <Typography component="span">أو</Typography>
            </>
          ) : (
            <Typography component="p" variant="h3" align="center" mb={3}>
              يرجى إدخال بريدك الإلكتروني لتغيير كلمة المرور
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="البريد الإلكتروني"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              fullWidth
              required
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
            />
            {formType !== "reset" && (
              <>
                <TextField
                  sx={{ marginTop: "20px" }}
                  label="كلمه المرور"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  fullWidth
                  required
                  error={errors.password && touched.password}
                  helperText={touched.password && errors.password}
                />
              </>
            )}

            <Button
              type="submit"
              sx={{ marginTop: "30px", fontSize: 20 }}
              size="large"
              variant="contained"
              fullWidth
              onClick={formType === "reset" ? handleOpenModal : undefined}
            >
              {formType === "login"
                ? "تسجيل الدخول"
                : formType === "reset"
                ? "تغيير كلمة المرور"
                : "إنشاء حساب"}
            </Button>
            {isSubmitting && (
              <LoadingButton
                loading
                sx={{ marginTop: 30, fontSize: 20 }}
                size="large"
                variant="contained"
                fullWidth
              >
                Loading
              </LoadingButton>
            )}
          </form>

          {formType === "login" && (
            <Link
              component="button"
              variant="subtitle1"
              underline="hover"
              onClick={() => setFormType("reset")}
            >
              هل نسيت كلمة السر؟
            </Link>
          )}
          {formType === "login" ? (
            <Typography component="p" variant="subtitle1">
              لا تمتلك حساب؟{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("register")}
              >
                إنشاء حساب جديد
              </Link>
            </Typography>
          ) : formType === "register" ? (
            <Typography component="p" variant="subtitle1">
              هل لديك حساب؟{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("login")}
              >
                تسجيل الدخول
              </Link>
            </Typography>
          ) : (
            <Link
              component="button"
              variant="h4"
              underline="none"
              onClick={() => setFormType("login")}
            >
              إلغاء
            </Link>
          )}
        </Stack>
      </Stack>
      <ForgetPassModal
        handleCloseModal={handleCloseModal}
        openModal={openModal}
      />
    </>
  );
};

export default Forms;
