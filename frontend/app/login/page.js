"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Login from "../components/login";
import ManageAccount from "../components/manage_account";

export default function LoginPage() {
  const router = useRouter();

  if (Cookies.get("loggedin")) {
    router.push("/manageAccount");
  }

  return (
    <div>
      <Login />
      <a href="/signup" className="cursor-pointer">
        No account? Sign up instead.
      </a>
    </div>
  );
}
