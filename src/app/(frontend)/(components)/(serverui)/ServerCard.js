"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdOutlineJoinLeft } from "react-icons/md";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export default function ServerCard({ icon, name, online, members }) {
  return (
    <div className="w-full h-28 bg-white rounded-2xl flex flex-col gap-3 justify-between py-8 px-5 shadow-sm shadow-sky-300/50 relative">
      <div className="bg-white rounded-3xl w-16 h-16 bg-cover absolute -top-8 left-5 flex items-center justify-center">
        <Image
          width={64}
          height={64}
          alt="Sync.dev server image"
          src={isValidUrl(icon) ? icon : "/chat_bot.png"}
          className="w-[90%] h-auto"
        />
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-lg pt-1">{name}</div>
        <div className="cursor-pointer flex items-center gap-2 hover:text-blue-500">
          <MdOutlineJoinLeft className="w-5 h-5" />
          Join
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center gap-2 xl:text-sm text-xs">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          {online} Online
        </div>
        <div className="flex items-center gap-2 xl:text-sm text-xs text-gray-400">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          {members} Members
        </div>
      </div>
    </div>
  );
}
