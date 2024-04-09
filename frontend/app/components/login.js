"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import ErrorText from "./errorText";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();

    let body = {
      username: event.target.email.value,
      password: event.target.pass.value,
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
    <form onSubmit={login} className="flex flex-col space-around w-full">
      <label className="text-white font-black text-lg pb-4">Login</label>
      <ErrorText error={error} />
      <input
        required
        type="email"
        id="email"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="you@example.com"
      />
      <input
        required
        type="password"
        id="pass"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="password"
      />
      <button
        type="submit"
        className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
      >
        Login
      </button>
    </form>
  );
}
