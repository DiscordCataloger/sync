"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./slide.css";
import RegisterSocial from "./registersocial";
import { useRouter } from "next/navigation";
import { useSlide } from "../(pages)/(auth)/(slide)/slideProvider";
import Required from "./required";
import { useScreenDetector } from "./useScreenDetector";
import RegisterSocialMobile from "./registerSocialMobile";

export function Register({ handleBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameRequired, setDisplayNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [repeatPasswordRequired, setRepeatPassWordRequired] = useState(false);

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

  function registerSubmit(e) {
    e.preventDefault();
  }

  // Functions for when a user input either email or password
  function onDisplayNameKeyPress(e) {
    if (!e.target.value) {
      setDisplayNameRequired(true);
    }
    if (!!e.target.value) {
      setDisplayNameRequired(false);
    }
  }
  function onEmailKeyPress(e) {
    if (!e.target.value) {
      setEmailRequired(true);
    }
    if (!!e.target.value) {
      setEmailRequired(false);
    }
  }
  function onPasswordKeyPress(e) {
    if (!e.target.value) {
      setPasswordRequired(true);
    }
    if (!!e.target.value) {
      setPasswordRequired(false);
    }
  }
  function onRepeatPasswordKeyPress(e) {
    if (!e.target.value) {
      setRepeatPassWordRequired(true);
    }
    if (!!e.target.value) {
      setRepeatPassWordRequired(false);
    }
  }

  return (
    <div
      className={`bg-[#F6F6F6] min-w-[270px] min-h-[300px] md:min-h-[400px] md:w-[550px] pt-[12px] md:pt-[24px] rounded-tl-lg rounded-tr-lg md:rounded-tr-none md:rounded-l-lg mt-[20%] md:mt-[5%]`}
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
            {emailRequired ? <Required error={`Required`} /> : ""}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md md:h-[40px] h-[25px] w-full border-2 border-[#B3B3B3]"
            value={email}
            onChange={emailOnChange}
            onKeyUp={(e) => onEmailKeyPress(e)}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for="password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Display Name
            {displayNameRequired ? <Required error={`Required`} /> : ""}
          </label>
          <input
            id="display-name"
            name="display-name"
            type="text"
            placeholder="Display Name"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={displayName}
            onChange={displayNameOnChange}
            onKeyUp={(e) => onDisplayNameKeyPress(e)}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for
            password="password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Password
            {passwordRequired ? <Required error={`Required`} /> : ""}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={password}
            onChange={passwordOnChange}
            onKeyUp={(e) => onPasswordKeyPress(e)}
          ></input>
        </div>

        <div className="flex flex-col justify-start items-start mx-[24px] my-[12px]">
          <label
            for="repeat-password"
            className="text-[12px] md:text-[16px] pb-1 text-[#1E1E1E]"
          >
            Confirm Password
            {repeatPasswordRequired ? <Required error={`Required`} /> : ""}
          </label>
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            placeholder="Confirm Password"
            className="text-[12px] md:text-[16px] pl-2 text-gray-950 rounded-md h-[25px] md:h-[40px] w-full border-2 border-[#B3B3B3]"
            value={repeatPassword}
            onChange={repeatPasswordOnChange}
            onKeyUp={(e) => onRepeatPasswordKeyPress(e)}
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

export default function RegisterPageComponent() {
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

  const { isMobile, isDesktop } = useScreenDetector();

  return (
    <div className={className}>
      <Register handleBack={slidetoRight} />
      {isMobile && <RegisterSocialMobile />}
      {isDesktop && <RegisterSocial />}
    </div>
  );
}
