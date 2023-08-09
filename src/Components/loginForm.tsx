import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { loginValidation } from "../Utils/Validation/loginValidation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { constants } from "../Utils/Constants/constants";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { initialValues, authSchema } = loginValidation();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authSchema}
      onSubmit={(values) => {
        let Users = JSON.parse(localStorage.getItem("Users")!);
        let userIndex = Users.findIndex(
          (u: any) => u.email === values.email && u.password === values.password
        );
        if (userIndex > -1) {
          console.log("Logged in with:", values.email, values.password);
          navigate(constants.home, { state: Users[userIndex] });
        } else {
          alert("Invalid Credentials");
        }
      }}
    >
      <Form>
        <Field className="mt-4" name="email" type="email" placeholder="Email" />
        {!email && <ErrorMessage name="email" />}

        <Field
          className="mt-4"
          name="password"
          type="password"
          placeholder="Password"
        />
        {!password && (
          <ErrorMessage name="password">
            {(msg: string) => <div className="text-danger mt-2">{msg}</div>}
          </ErrorMessage>
        )}

        <Button className="mt-4" type="submit" variant="dark">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
