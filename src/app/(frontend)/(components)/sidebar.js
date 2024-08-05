"use client";

import { AiFillMessage } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import Image from "next/image";
import NotificationButton from "./NotificationButton";
import { useState, useEffect } from "react";

function Sidebar({
  onclickChat,
  onclickServer,
  onclickAddServer,
  onclickNotification,
  onclickProfile,
  selectedLeftComponent,
}) {
  const servers = [
    { serverName: "Server 1", serverIcon: "/chat_bot.png" },
    { serverName: "Server 2", serverIcon: "/chat_bot.png" },
    { serverName: "Server 3", serverIcon: "/chat_bot.png" },
    { serverName: "Server 4", serverIcon: "/chat_bot.png" },
  ];
  const [currentUser, setCurrentUser] = useState({});

  // Fetch current user
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Include the API key in the headers
          },
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const userData = await response.json();
        if (userData) {
          // Check if userData is not null
          console.log("Fetched User Data:", userData); // Log fetched user data
          setCurrentUser(userData);
        } else {
          console.error("User data is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="h-full w-24 min-w-[65px] min-h-[550px] bg-blue-600 flex flex-col gap-5 items-center justify-between py-5 rounded-xl shadow-lg z-10">
      <div
        className={`cursor-pointer hover:bg-blue-700 hover:border-l-4 hover:border-orange-600 w-full flex justify-center py-2 ${
          selectedLeftComponent === "chat"
            ? "bg-blue-700 border-l-4 border-orange-600"
            : ""
        }`}
        onClick={onclickChat}
      >
        <AiFillMessage size={36} className="text-white" />
      </div>

      <div className="flex flex-col items-center h-[60%] flex-1 w-full">
        <style>
          {`
          .serverIconScrollbar::-webkit-scrollbar {
            display: none;
          }
          .serverIconScrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
        </style>
        <div className="flex flex-col items-center -mt-2 cursor-pointer overflow-scroll w-full serverIconScrollbar">
          {servers.map((server, index) => (
            <div
              onClick={() => onclickServer(index)}
              key={index}
              className={`w-full flex justify-center py-2 hover:bg-blue-700 hover:border-l-4 hover:border-orange-600 ${
                selectedLeftComponent === `server-${index}`
                  ? "bg-blue-700 border-l-4 border-orange-600"
                  : ""
              }`}
            >
              <img
                src={server.serverIcon}
                alt={server.serverName}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="text-white -mt-3">
          <IoMdArrowDropdown size={26} />
        </div>

        <div
          className="text-white hover:text-blue-100 mt-3 cursor-pointer"
          onClick={onclickAddServer}
        >
          <FaPlusCircle size={28} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="cursor-pointer" onClick={onclickNotification}>
          <NotificationButton count={1} />
        </div>
        <div className="cursor-pointer" onClick={onclickProfile}>
          <div className="relative top-3 left-7 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          <Image
            src={
              currentUser && currentUser.icon
                ? currentUser.icon
                : "/chat_bot.png"
            }
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
