"use client";
import Image from "next/image";

export default function RegisterSocialMobile() {
  return (
    <div className="bg-[#F6F6F6] rounded-b-lg flex-1 w-[80%] pb-[4%]">
      <div className="px-[15%] pb-[4%] flex justify-between items-center">
        <div className="h-0 w-16 border border-gray-300"></div>
        <span className="text-[10px] text-[#aeb5bf] font-semibold">
          or sign up with
        </span>
        <div className="h-0 w-16 border border-gray-300"></div>
      </div>
      <div className="flex justify-center items-center">
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
