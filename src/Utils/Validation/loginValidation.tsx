import * as yup from "yup";

export const loginValidation = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const authSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return { initialValues, authSchema };
};
