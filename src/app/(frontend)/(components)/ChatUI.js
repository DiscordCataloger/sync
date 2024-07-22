"use client";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ChatUI({ icon, name, status, lastSeen }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[40%] h-[90%] bg-white rounded-2xl">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <img src={icon} className="mr-3 w-16 h-16" />
            <div className="flex flex-col text-lg font-bold">
              {name}
              {status.toLowerCase() === "online" ? (
                <div className="flex items-center gap-3 font-normal text-xs text-gray-400">
                  <div className="flex items-center justify-center text-green-500 gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Online
                  </div>
                  - last seen, {lastSeen}
                </div>
              ) : (
                <div className="flex items-center gap-3 font-normal text-xs text-gray-400">
                  <div className="flex items-center justify-center text-gray-400 gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    Offline
                  </div>
                  - last seen, {lastSeen}
                </div>
              )}
            </div>
          </div>
          <IoEllipsisVertical />
        </div>
      </div>
    </div>
  );
}
