import * as yup from "yup";

export const registerValidation = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const authSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return { initialValues, authSchema };
};
