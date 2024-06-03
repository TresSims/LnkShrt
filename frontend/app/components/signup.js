"use client";

import { useRouter } from "next/navigation";
import Axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Signup() {
  const router = useRouter();

  const signup = (values) => {
    let csrf = Cookies.get("csrftoken");
    var headers = {
      headers: {
        "X-CSRFToken": csrf,
      },
    };

    let body = {
      username: values.username,
      password: values.password1,
    };

    Axios.post("api/signup/", body, headers)
      .then((response) => {
        router.push("/login");
        setError("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password1: "", password2: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        } else if (values.password1 != values.password2) {
          errors.password1 = "Passwords do not match";
          errors.password2 = "Passwords do not match";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        submit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-around w-full">
          <Field
            type="email"
            name="email"
            placeholder="you@example.com"
            className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password1"
            placeholder="password"
            className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          />
          <ErrorMessage name="password1" component="div" />
          <Field
            type="password"
            name="password2"
            placeholder="password"
            className="flex-grow rounded-full px-5 p-2 m-1 text-black"
          />
          <ErrorMessage name="password2" component="div" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
          >
            Sign-up
          </button>
        </Form>
      )}
    </Formik>
  );
}
