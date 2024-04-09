"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Signup from "../components/signup";
import ManageAccount from "../components/manage_account";

export default function LoginPage() {
  const router = useRouter();

  if (Cookies.get("loggedin")) {
    router.push("/manageAccount");
  }

  return (
    <div>
      <Signup />
      <a href="/login" className="cursor-pointer">
        Already have an account? Log in instead.
      </a>
    </div>
  );
}
