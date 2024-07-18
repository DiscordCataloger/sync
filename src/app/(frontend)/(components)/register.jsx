"use client";
import { useState } from "react";
import Image from "next/image";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOn, setIsOn] = useState(false);

  function emailOnChange(e) {
    setEmail(e.target.value);
  }
  function passwordOnChange(e) {
    setPassword(e.target.value);
  }
  function registerSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-[#FFFFFF] w-[300px] md:w-[550px] pt-[24px] rounded-lg">
      <form onSubmit={registerSubmit}>
        <p className="text-[#1E1E1E]">Register An Account!</p>
        <div className="grid place-content-center">
          <Image
            src="/chat_bot.png"
            height={100}
            width={100}
            alt="avatar"
            className="rounded-[50%]"
          />
        </div>

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
            className="text-[12px] pl-2 text-gray-950 rounded-md md:h-[40px] h-[25px] w-full border-2 border-[#B3B3B3]"
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
      </form>
    </div>
  );
}
