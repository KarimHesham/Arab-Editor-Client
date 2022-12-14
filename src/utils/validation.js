import * as yup from "yup";

// note: may add email regex and password regex
export const loginRegisterValidation = yup.object().shape({
  email: yup
    .string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .required("يرجى إدخال البريد الإلكتروني"),
  password: yup
    .string()
    .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
    .required("يرجى إدخال كلمة المرور"),
});

export const forgetPasswordValidation = yup.object().shape({
  email: yup
    .string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .required("يرجى إدخال البريد الإلكتروني"),
});

export const pageNameValidation = yup.object().shape({
  name: yup.string().required("يرجى إدخال اسم الصقحة"),
});
