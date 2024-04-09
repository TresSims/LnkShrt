"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import ErrorText from "./errorText";

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");

  const signup = async (event) => {
    event.preventDefault();

    let pass1 = event.target.pass1.value;
    let pass2 = event.target.pass2.value;
    let email = event.target.email.value;

    if (pass1 == pass2) {
      var body = {
        username: email,
        password: pass1,
      };

      let csrf = Cookies.get("csrftoken");
      var headers = {
        headers: {
          "X-CSRFToken": csrf,
        },
      };

      Axios.post("api/signup/", body, headers)
        .then((response) => {
          router.push("/login");
          setError("");
        })
        .catch((error) => {
          setError("Something went wrong, try again later");
          console.log(error);
        });
    } else {
      setError("Username and password must match");
    }
  };

  return (
    <form onSubmit={signup} className="flex flex-col space-around w-full">
      <label className="text-white font-black text-lg pb-4">Sign Up</label>
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
        id="pass1"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="password"
      />
      <input
        required
        type="password"
        id="pass2"
        className="flex-grow rounded-full px-5 p-2 m-1 text-black"
        placeholder="password"
      />
      <button
        type="submit"
        className="ms-10 font-black text-white bg-orange-500 disabled:bg-gray-200 p-2 self-end hover:bg-amber-500 active:bg-amber-400 text-lg rounded-full w-48"
      >
        Sign-up
      </button>
    </form>
  );
}
