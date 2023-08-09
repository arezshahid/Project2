import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { registerValidation } from "../Utils/Validation/registerValidation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { initialValues, authSchema } = registerValidation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authSchema}
      onSubmit={(values) => {
        let uid = uuidv4();
        let user = {
          id: uid,
          name: values.name,
          email: values.email,
          password: values.password,
        };
        let Users = JSON.parse(localStorage.getItem("Users")!);
        if (Users == null) {
          localStorage.setItem("Users", JSON.stringify([user]));
        } else {
          if (Users.some((u: any) => u.email === user.email)) {
            alert("User already exists");
          } else {
            Users.push(user);
            localStorage.setItem("Users", JSON.stringify(Users));
            console.log(Users);
          }
        }
      }}
    >
      <Form>
        <Field className="mt-4" name="name" type="text" placeholder="Name" />
        {!name && <ErrorMessage name="name" />}

        <Field className="mt-4" name="email" type="email" placeholder="Email" />
        {!email && <ErrorMessage name="email" />}

        <Field
          className="mt-4"
          name="password"
          type="password"
          placeholder="Password"
        />
        {!password && <ErrorMessage name="password" />}

        <Button className="mt-4" type="submit" variant="dark">
          Submit
        </Button>
      </Form>
    </Formik>
  );
};
