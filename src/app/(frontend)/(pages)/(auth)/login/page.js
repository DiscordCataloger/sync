"use client";
import Login from "@/app/(frontend)/(components)/login";
import Typewriter from "typewriter-effect";
import { slideReducer } from "../(slide)/slide";
import { useRouter } from "next/navigation";
import "@/app/(frontend)/(components)/slide.css";
import { useEffect } from "react";
import SlideProvider from "../(slide)/slideProvider";
import { useSlide } from "../(slide)/slideProvider";

export function LoginPageComponent() {
  const router = useRouter();
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  function slideToLeft() {
    slideLeftDispatch({ type: "SLIDETOLEFT" });
    setTimeout(() => {
      router.push("/register");
    }, 400);
    localStorage.setItem("registerButtonClicked", "true");
  }

  const backButtonClicked = localStorage.getItem("backButtonClicked");
  let className = `flex flex-col md:flex-row md:justify-center items-center`;
  if (!!backButtonClicked) {
    className += " slide-from-left";
    setTimeout(() => localStorage.removeItem("backButtonClicked"), 100);
  }

  if (slideLeftState.slideLeft) {
    className += " slide-to-left";
  }

  return (
    <div>
      <div className={className}>
        <h1 className="md:ml-4 mt-11 md:text-6xl text-[#A8A8FF] font-bold md:my-[200px] md:w-[700px] md:h-[130px] text-md my-[24px] w-[300px] h-[10px]">
          <Typewriter
            options={{ loop: true }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Start Your Chat Journey Here!")
                .pauseFor(1000)
                .deleteChars(18)
                .typeString("Social Life Here!")
                .pauseFor(1000)
                .deleteChars(17)
                .typeString("Gaming Experience Here!")
                .pauseFor(1000)
                .deleteChars(23)
                .typeString("Work Life Here!")
                .pauseFor(1000)
                .deleteAll()
                .start();
            }}
          />
        </h1>
        <Login handleRegister={slideToLeft} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <SlideProvider>
      <LoginPageComponent />
    </SlideProvider>
  );
}
