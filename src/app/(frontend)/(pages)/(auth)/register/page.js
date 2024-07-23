"use client";
import Register from "@/app/(frontend)/(components)/register";
import RegisterSocial from "@/app/(frontend)/(components)/registersocial";
import "@/app/(frontend)/(components)/slide.css";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import SlideProvider, { useSlide } from "../(slide)/slideProvider";
import "@/app/(frontend)/(components)/slide.css";

export function RegisterPageComponent() {
  const router = useRouter();
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  let className = `flex justify-center items-center`;
  const registerButtonClicked = localStorage.getItem("registerButtonClicked");
  if (!!registerButtonClicked) {
    className += " slide-from-right";
    setTimeout(
      () => window.localStorage.removeItem("registerButtonClicked"),
      50
    );
  }
  const slidetoRight = () => {
    slideRightDispatch({ type: "SLIDETORIGHT" });
    setTimeout(() => {
      router.push("/login");
    }, 400);
    window.localStorage.setItem("backButtonClicked", "true");
  };

  if (slideRightState.slideRight) {
    className += " slide-to-right";
  }

  return (
    <div className={className}>
      <Register handleBack={slidetoRight} />
      <RegisterSocial />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <SlideProvider>
      <RegisterPageComponent />
    </SlideProvider>
  );
}
