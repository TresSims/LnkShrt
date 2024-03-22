"use client";

import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";
import ManageAccount from "../components/manage_account";

export default function LoginPage() {
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLogin = () => {
    setLogin(!login);
  };

  if (loggedIn) {
    return (
      <>
        <ManageAccount />
      </>
    );
  }

  return (
    <>
      {login && <Login />}
      {!login && <Signup />}
      <a onClick={toggleLogin} className="cursor-pointer">
        {login && "Don't have an account? Sign up instead."}
        {!login && "Already have an account? Log in instead."}
      </a>
    </>
  );
}
