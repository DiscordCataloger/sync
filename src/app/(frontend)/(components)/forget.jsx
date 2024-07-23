"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Forget() {
  function forgetSubmit() {}
  const [email, setEmail] = useState("");
  function emailOnChange(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="bg-[#F6F6F6] md:mt-8 md:mr-6 w-[300px] md:w-[550px] pt-[24px] rounded-lg">
      <form onSubmit={forgetSubmit}>
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
          <Button
            size="default"
            variant="default"
            className="text-[12px] md:text-[16px] bg-[#1D33A8] text-[#F5F5F5] rounded-md h-[25px] md:h-[40px] w-full"
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
