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

// Note: forgetPassword is not submitting
// Note: may add confirm password in signUp & eye icons in password input
const Forms = () => {
  // formType: signUp | signIn | forgetPassword
  const [formType, setFormType] = useState("signUp");

  const initialValues =
    formType !== "forgetPassword" ? { email: "", password: "" } : { email: "" };

  const validationSchema =
    formType !== "forgetPassword"
      ? loginRegisterValidation
      : forgetPasswordValidation;

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
    setFormType("signIn");
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
          {formType === "signUp" || formType === "signIn" ? (
            <>
              <Button
                sx={{ fontSize: "20px" }}
                variant="outlined"
                size="large"
                startIcon={<FcGoogle />}
                fullWidth
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
            {formType !== "forgetPassword" && (
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
              onClick={
                formType === "forgetPassword" ? handleOpenModal : undefined
              }
            >
              {formType === "signIn"
                ? "تسجيل الدخول"
                : formType === "forgetPassword"
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

          {formType === "signIn" && (
            <Link
              component="button"
              variant="subtitle1"
              underline="hover"
              onClick={() => setFormType("forgetPassword")}
            >
              هل نسيت كلمة السر؟
            </Link>
          )}
          {formType === "signIn" ? (
            <Typography component="p" variant="subtitle1">
              لا تمتلك حساب؟{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("signUp")}
              >
                إنشاء حساب جديد
              </Link>
            </Typography>
          ) : formType === "signUp" ? (
            <Typography component="p" variant="subtitle1">
              هل لديك حساب؟{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("signIn")}
              >
                تسجيل الدخول
              </Link>
            </Typography>
          ) : (
            <Link
              component="button"
              variant="h4"
              underline="none"
              onClick={() => setFormType("signIn")}
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
