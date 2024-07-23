"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./slide.css";
import RegisterSocial from "./registersocial";
import { useRouter } from "next/navigation";
import { useSlide } from "../(pages)/(auth)/(slide)/slideProvider";

export default function Register({ handleBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  function emailOnChange(e) {
    setEmail(e.target.value);
  }
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  function displayNameOnChange(e) {
    setDisplayName(e.target.value);
  }

  function repeatPasswordOnChange(e) {
    setRepeatPassword(e.target.value);
  }

  function registerOnClick() {
    if (password === repeatPassword) {
      return;
    } else {
    }
  }

  function registerSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`bg-[#F6F6F6] min-w-[270px] min-h-[300px] md:min-h-[400px] md:w-[550px] pt-[24px] rounded-l-lg mt-[20px] md:mt-[10px]`}
    >
      <button onClick={handleBack} className="mb-[2px] md:mb-[0px] md:mt-[2px]">
        <svg
          class="w-[24px] md:w-[36px] md:h-[36px] text-gray-800 dark:text-white inline"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m14 8-4 4 4 4"
          />
        </svg>

        <span className="text-[12px] md:text-[16px]">Back</span>
      </button>

      <form onSubmit={registerSubmit}>
        <p className="mx-[24px] -mt-[22px] md:-mt-[30px] text-[12px] md:text-[16px] text-[#1E1E1E] text-center">
          Start your journey today!
        </p>

        <div className="grid place-content-center">
          <button className="opacity-0 -mt-[120px] relative top-[120px] rounded-[50%] w-[120px] h-[120px] hover:opacity-100 hover:bg-[#134B70]/[0.65] text-center flex flex-col items-center justify-center">
            <p className="text-xl text-[#E1EBE6]">Add</p>
            <p className="text-xl text-[#E1EBE6]">Profile</p>
            <p className="text-xl text-[#E1EBE6]">Pic</p>
          </button>
          <Image
            src="/chat_bot.png"
            height={120}
            width={120}
            alt="avatar"
            className="rounded-[50%]"
          />
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px]">
          <label
            for="email"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md md:h-[40px] h-[25px] w-full border-2 border-[#B3B3B3]"
            value={email}
            onChange={emailOnChange}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for="password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Display Name
          </label>
          <input
            id="display-name"
            name="display-name"
            type="text"
            placeholder="Display Name"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={displayName}
            onChange={displayNameOnChange}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for
            password="password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={password}
            onChange={passwordOnChange}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for="repeat-password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Confirm Password
          </label>
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            placeholder="Confirm Password"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={repeatPassword}
            onChange={repeatPasswordOnChange}
          ></input>
          <Button
            size="default"
            variant="default"
            className="mt-[15px] text-[12px] md:text-[16px] bg-[#1D33A8] text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export function RegisterPageComponent() {
  const router = useRouter();
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  let className = `flex flex-col md:flex-row justify-center items-center`;
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
