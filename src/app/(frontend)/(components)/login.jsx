"use client";
import { useState, useEffect, useRef } from "react";
import Switch from "./switch";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import SlideProvider, {
  useSlide,
} from "../(pages)/(auth)/(slide)/slideProvider";
import Required from "./required";

export function Login() {
  // usereducer for sliding animations
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  const router = useRouter(); // URL changing function

  // various useStates
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPassWordRequired] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Event value change of email field
  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  // Event value change of password field
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  // Submitting the login form
  function loginSubmit(e) {
    e.preventDefault();
    if (!emailRequired && !passwordRequired) {
    }
  }

  // Functions for when a user input either email or password
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
      setPassWordRequired(true);
    }
    if (!!e.target.value) {
      setPassWordRequired(false);
    }
  }

  // Validating email before submission
  const ref = useRef(null);

  function emailValidation(e) {
    const re = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;
    if (!e.target.value.match(re)) {
      setEmailValidate(true);
    } else {
      setEmailValidate(false);
    }
  }

  // Function for login page sliding to the left to make room for register page
  function handleRegister() {
    slideLeftDispatch({ type: "SLIDETOLEFT" });
    setTimeout(() => {
      router.push("/register");
    }, 400);
    window.localStorage.setItem("registerButtonClicked", "true");
  }

  // Function for login page sliding to the left to make room for forget_credentials page
  const handleForget = () => {
    slideLeftDispatch({ type: "SLIDETOLEFT" });
    setTimeout(() => {
      router.push("/forget_credentials");
    }, 400);
    window.localStorage.setItem("forgetButtonClicked", "true");
  };

  return (
    <div className="bg-[#F6F6F6] md:mt-[5%] md:mr-6 w-[300px] md:w-[550px] pt-[24px] rounded-lg">
      <form method="POST  " noValidate onSubmit={loginSubmit}>
        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
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
        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
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
        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
          <Button
            size="default"
            variant="default"
            className="text-[12px] md:text-[16px] bg-[#1D33A8] text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full"
          >
            Sign In
          </Button>
          <div className="flex justify-start items-center mt-[24px]">
            <Switch
              isOn={isOn}
              handleToggle={() => setIsOn(!isOn)}
              onColor="rgb(59, 130, 246)"
            />
            <div className="text-[#1E1E1E] mx-3 md:pt-1 text-[13px] md:text-[20px]">
              Remember Me
            </div>
          </div>
        </div>
      </form>
      <div className="mx-[24px] flex justify-between items-center">
        <div className="h-0 w-16 md:w-44 border border-gray-300"></div>
        <span className="min-w-[100px] text-[13px] md:text-[13px] text-[#aeb5bf] font-semibold">
          or log in with
        </span>
        <div className="h-0 w-16 md:w-44 border border-gray-300"></div>
      </div>
      <div className="mx-[80px] mt-[10px] flex md:justify-between justify-center items-center">
        <Image
          src="/googleicon.png"
          width={50}
          height={50}
          alt="Google login"
          className="mx-4 md:mx-0"
        />
        <Image
          src="/facebookicon.png"
          width={50}
          height={50}
          alt="Google login"
          className="mx-4 md:mx-0"
        />
        <Image
          src="/githubicon.png"
          width={50}
          height={50}
          alt="Google login"
          className="mx-4 md:mx-0"
        />
      </div>
      <div className="mx-[24px] my-[15px] md:my-[20px] text-[10px] md:text-[13px] flex justify-between items-center">
        <button
          onClick={handleForget}
          className="text-[#1E1E1E] underline underline-offset-4"
        >
          Forgot password?
        </button>
        <button
          onClick={handleRegister}
          className="text-[#1E1E1E] underline underline-offset-4"
        >
          Need an account?
        </button>
      </div>
    </div>
  );
}

export default function LoginPageComponent() {
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();
  const backButtonClicked = window.localStorage.getItem("backButtonClicked");
  let className = `flex flex-col md:flex-row md:justify-around items-center ml-[2%]`;
  if (!!backButtonClicked) {
    className += " slide-from-left";
    setTimeout(() => window.localStorage.removeItem("backButtonClicked"), 100);
  }

  if (slideLeftState.slideLeft) {
    className += " slide-to-left";
  }
  return (
    <div>
      <div className={className}>
        <h1 className="mt-[10%] text-md md:text-6xl text-[#A8A8FF] font-bold md:mt-[4%] md:w-[700px] md:h-[130px] text-md w-[300px] min-h-[55px]">
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
        <Login />
      </div>
    </div>
  );
}
