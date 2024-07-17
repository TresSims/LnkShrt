"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const login = (values) => {
    let body = {
      username: values.username,
      password: values.password,
    };

    let csrf = Cookies.get("csrftoken");
    let headers = {
      headers: {
        "X-CSRFToken": csrf,
      },
    };

    Axios.post("/api/login/", body, headers)
      .then((response) => {
        Cookies.set("loggedin", true);
        router.push("/manageAccount");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.non_field_errors[0]);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        login(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-around w-full text-sm md:text-lg">
          <Field
            type="email"
            name="email"
            placeholder="you@example.com"
            className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            className="flex-grow rounded-full px-5 p-2 m-1 text-black"
            placeholder="password"
          />
          <ErrorMessage name="password" component="div" />
          <button
            type="submit"
            className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-xs md:text-lg rounded-full w-48"
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
