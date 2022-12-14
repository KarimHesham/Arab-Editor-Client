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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../services/auth/auth";

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
      const payload =
        formType !== "reset"
          ? {
              email: values.email,
              password: values.password,
            }
          : { email: values.email };

      formType === "reset"
        ? authenticate(formType, "", payload, dispatch, navigate)
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
    // eslint-disable-next-line
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
                onClick={() =>
                  authenticate(formType, "google", "", dispatch, navigate)
                }
              >
                ???????? ????????
              </Button>
              <Typography component="span">????</Typography>
            </>
          ) : (
            <Typography component="p" variant="h3" align="center" mb={3}>
              ???????? ?????????? ?????????? ???????????????????? ???????????? ???????? ????????????
            </Typography>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="???????????? ????????????????????"
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
                  label="???????? ????????????"
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
                ? "?????????? ????????????"
                : formType === "reset"
                ? "?????????? ???????? ????????????"
                : "?????????? ????????"}
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
              ???? ???????? ???????? ??????????
            </Link>
          )}
          {formType === "login" ? (
            <Typography component="p" variant="subtitle1">
              ???? ?????????? ??????????{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("register")}
              >
                ?????????? ???????? ????????
              </Link>
            </Typography>
          ) : formType === "register" ? (
            <Typography component="p" variant="subtitle1">
              ???? ???????? ??????????{" "}
              <Link
                component="button"
                variant="subtitle1"
                underline="hover"
                onClick={() => setFormType("login")}
              >
                ?????????? ????????????
              </Link>
            </Typography>
          ) : (
            <Link
              component="button"
              variant="h4"
              underline="none"
              onClick={() => setFormType("login")}
            >
              ??????????
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
