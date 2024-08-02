"use client";
import { EllipsisVertical, Hash } from "lucide-react";

export default function ChannelHeader({ name }) {
  return (
    <>
      <div className="flex justify-between items-center px-4 lg:py-5 md:py-4 py-3">
        <div className="flex items-center">
          <Hash className="mr-3 md:w-6 md:h-6 w-5 h-5 text-black" />
          <div className="flex flex-col md:text-lg text:md font-bold text-black mt-1">
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
