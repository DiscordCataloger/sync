"use client";
import Register from "@/app/(frontend)/(components)/register";
import RegisterSocial from "@/app/(frontend)/(components)/registersocial";
import "@/app/(frontend)/(components)/register.css";
import { useState } from "react";

export default function RegisterPage() {
  const [slideOut, setSlideOut] = useState(false);

  function handleBacktoLogin() {
    setSlideOut(true);
  }

  return (
    <div
      className={`flex justify-center items-center ${
        slideOut ? "slide-in" : ""
      }`}
    >
      <Register handleBack={handleBacktoLogin} />
      <RegisterSocial />
    </div>
  );
}
