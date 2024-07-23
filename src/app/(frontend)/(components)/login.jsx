"use client";
import { useState } from "react";
import Switch from "./switch";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Typewriter from "typewriter-effect";
import SlideProvider, {
  useSlide,
} from "../(pages)/(auth)/(slide)/slideProvider";

export function Login() {
  const {
    slideLeftState,
    slideRightState,
    slideLeftDispatch,
    slideRightDispatch,
  } = useSlide();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [required, setRequired] = useState(false);

  function emailOnChange(e) {
    setEmail(e.target.value);
  }
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }
  function loginSubmit(e) {
    e.preventDefault();
  }
  function handleRegister() {
    slideLeftDispatch({ type: "SLIDETOLEFT" });
    setTimeout(() => {
      router.push("/register");
    }, 400);
    window.localStorage.setItem("registerButtonClicked", "true");
  }

  const handleForget = () => {
    slideLeftDispatch({ type: "SLIDETOLEFT" });
    setTimeout(() => {
      router.push("/forget_credentials");
    }, 400);
    window.localStorage.setItem("forgetButtonClicked", "true");
  };

  return (
    <div className="bg-[#F6F6F6] md:mt-8 md:mr-6 w-[300px] md:w-[550px] pt-[24px] rounded-lg">
      <form onSubmit={loginSubmit}>
        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
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
        <div className="flex flex-col justify-start items-start mx-[24px] my-[24px]">
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
        <span className="text-gray-300 min-w-[100px] text-[13px] md:text-[13px] text-[#aeb5bf] font-bold">
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
  let className = `flex flex-col md:flex-row md:justify-center items-center`;
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
        <h1 className="md:ml-4 mt-[70px] text-md md:text-6xl text-[#A8A8FF] font-bold md:my-[200px] md:w-[700px] md:h-[130px] text-md w-[300px] min-h-[55px]">
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
