"use client";
import { EllipsisVertical, Hash } from "lucide-react";

export default function ChannelHeader({ name }) {
  return (
    <>
      <div className="flex justify-between items-center px-10 py-8 pb-5">
        <div className="flex items-center">
          <Hash className="mr-3 w-6 h-6" />
          <div className="flex flex-col text-lg font-bold text-black">
            {name}
          </div>
        </div>
        <EllipsisVertical className="text-blue-500" />
      </div>
      <div className="flex justify-center items-center">
        <hr className="w-[90%]" />
      </div>
    </>
  );
}
