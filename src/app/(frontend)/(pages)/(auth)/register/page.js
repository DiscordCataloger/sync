"use client";
import Register from "@/app/(frontend)/(components)/register";
import RegisterSocial from "@/app/(frontend)/(components)/registersocial";
import "@/app/(frontend)/(components)/register.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [slideIn, setSlideIn] = useState(false);
  function slideInAnimation() {
    setSlideIn(true);
  }

  function handleBack() {
    slideInAnimation();
    setTimeout(() => {
      router.push("/login");
    }, 500); // Wait for the animation to complete before changing the URL
  }

  return (
    <div
      className={`flex justify-center items-center ${
        !!slideIn ? "slide-in" : ""
      }`}
    >
      <Register handleBack={handleBack} />
      <RegisterSocial />
    </div>
  );
}
