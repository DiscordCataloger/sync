"use client";
import FriendListItem from "./FriendListItem";
import Image from "next/image";

export default function BlockedUsers() {
  const buttons = ["Unblock"];
  const blockArr = [
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Online",
    },
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Online",
    },
  ];
  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">BLOCKED USERS</div>
      <div className="flex flex-col gap-3">
        {blockArr.map((block, index) => (
          <FriendListItem
            key={index}
            icon={block.icon}
            name={block.name}
            status={block.status}
            buttons={buttons}
          />
        ))}
        {blockArr.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full">
            <Image
              width={300}
              height={300}
              alt="Sync.dev friend image"
              src="/no_blocked.png"
            />
            <div className="text-gray-400">
              WOW, seems you are pleased with everyone here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
