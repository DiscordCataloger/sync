import { RegisterPageComponent } from "@/app/(frontend)/(components)/register";
import "@/app/(frontend)/(components)/slide.css";
// import { useState } from "react";
import SlideProvider, { useSlide } from "../(slide)/slideProvider";
import "@/app/(frontend)/(components)/slide.css";

export const metadata = {
  title: "Sign Up For an Account on Sync!",
  description: "Account Signup on Sync",
};

export default function RegisterPage() {
  return (
    <SlideProvider>
      <RegisterPageComponent />
    </SlideProvider>
  );
}
