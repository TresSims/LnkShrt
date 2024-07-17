"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Axios from "axios";
import ErrorText from "./errorText";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function ManageAccount() {
  const router = useRouter();
  const [error, setError] = useState("");

  const changePassword = (values) => {
    let body = {
      password: values.password1,
    };

    let csrf = Cookies.get("csrftoken");
    let headers = {
      headers: {
        "X-CSRFToken": csrf,
      },
    };

    Axios.post("/api/manageUser/", body, headers)
      .then((response) => {
        setError("");
        Cookies.remove("loggedin");
        router.push("/login");
      })
      .catch((error) => {
        setError("Something went wrong, try again later.");
        console.log(error);
      });
  };

  const deleteAccount = (event) => {
    let csrf = Cookies.get("csrftoken");
    let headers = {
      headers: {
        "X-CSRFToken": csrf,
      },
    };

    Axios.delete("/api/manageUser/", headers)
      .then((response) => {
        Cookies.remove("loggedin");
        router.push("/login");
      })
      .catch((error) => {
        setError("Something went wrong, try again later.");
        console.log(error);
      });
  };

  const logOut = (event) => {
    let csrf = Cookies.get("csrftoken");
    let headers = {
      headers: {
        "X-CSRFToken": csrf,
      },
    };

    Axios.post("/api/logout/", {}, headers)
      .then((response) => {
        Cookies.remove("loggedin");
        router.push("/login");
      })
      .catch((error) => {
        setError("Something went wrong, try again later.");
        console.log(error);
      });
  };

  return (
    <div>
      <Formik
        initialValues={{ password1: "", password2: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password1) {
            errors.password1 = "Requried";
          } else if (values.password1 != values.password2) {
            errors.password1 = "Passwords do not match";
            errors.password2 = "Passwords do not match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          changePassword(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-around w-full border-2 border-solid border-white rounded-md p-4 text-sm md:text-lg">
            <label className="text-white text-lg pb-2">Change Password</label>
            <Field
              type="password"
              id="password1"
              className="flex-grow rounded-full px-5 p-2 m-1 text-black"
              placeholder="new password"
            />
            <ErrorMessage name="password1" component="div" />
            <Field
              required
              type="password"
              id="password2"
              className="flex-grow rounded-full px-5 p-2 m-1 text-black"
              placeholder="confirm new password"
            />
            <ErrorMessage name="password2" component="div" />
            <button
              type="submit"
              className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
            >
              Change Password
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex flex-row-reverse m-2 mt-10 text-white font-black text-sm md:text-lg">
        <button
          onClick={deleteAccount}
          className="flex flex-row text-xs md:text-lg m-2 bg-red-500 hover:bg-red-400 active:bg-red-600 p-2 px-4 rounded-full "
        >
          Delete Account
        </button>
        <button
          onClick={logOut}
          className="flex flex-row m-2 text-xs md:text-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-600 p-2 px-4 rounded-full "
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
