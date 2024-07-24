"use client";
import Image from "next/image";

export default function RegisterSocialMobile() {
  return (
    <div className="bg-[#F6F6F6] w-[283.4px] rounded-b-lg">
      <div className="mx-[24px] flex justify-between items-center">
        <div className="h-0 w-16 md:w-44 border border-gray-300"></div>
        <span className="min-w-[100px] text-[13px] md:text-[13px] text-[#aeb5bf] font-bold">
          or sign up with
        </span>
        <div className="h-0 w-16 md:w-44 border border-gray-300"></div>
      </div>
      <div className="mx-[80px] mt-[10px] pb-[25px] flex md:justify-between justify-center items-center">
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
    </div>
  );
}
