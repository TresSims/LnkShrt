"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Login from "../components/login";
import Signup from "../components/signup";
import ManageAccount from "../components/manage_account";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Cookies.get("loggedin"));

  useEffect(() => {
    if (!Cookies.get("loggedin")) {
      router.push("/login");
    }
  });

  return <ManageAccount />;
}
