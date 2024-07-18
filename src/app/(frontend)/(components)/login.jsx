"use client";
import { useState } from "react";
import Switch from "./switch";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOn, setIsOn] = useState(false);

  function emailOnChange(e) {
    setEmail(e.target.value);
  }
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }
  function loginSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-[#FFFFFF] w-[300px] md:w-[550px] pt-[24px] rounded-lg">
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
        <div className="h-0 w-20 md:w-48 border border-gray-300"></div>
        <div className="text-gray-300 text-[13px] md:text-[16px]">
          or log in with
        </div>
        <div className="h-0 w-20 md:w-48 border border-gray-300"></div>
      </div>
      <div className="mx-[80px] mt-[24px] flex md:justify-between justify-center items-center">
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
      <div className="mx-[24px] mt-[20px] mb-[10px] text-[10px] md:text-[13px] flex justify-between items-center">
        <p className="text-[#1E1E1E] underline underline-offset-4">
          Forget email or password?
        </p>
        <p className="text-[#1E1E1E] underline underline-offset-4">
          Need an account?
        </p>
      </div>
    </div>
  );
}
