"use client";
import FriendListItem from "./FriendListItem";
import Image from "next/image";

export default function BlockedUsers() {
  const buttons = ["Unblock"];
  const blockArr = [
    {
      icon: "/chat_bot.png",
      name: "User1",
      status: "Online",
    },
    {
      icon: "/chat_bot.png",
      name: "User2",
      status: "Online",
    },
    {
      icon: "/chat_bot.png",
      name: "User3",
      status: "Online",
    },
  ];
  return (
    <div className="flex flex-col gap-5 px-5 -mb-2 mt-10 h-full overflow-scroll custom-scrollbar">
      <div className="font-bold text-xl">Blocked Users</div>
      <div className="flex flex-col gap-3 h-full overflow-scroll custom-scrollbar">
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
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Image
              width={300}
              height={300}
              alt="Sync.dev friend image"
              src="/no_blocked.png"
            />
            <div className="text-gray-400 text-center w-60">
              WOW, seems you are pleased with everyone here.
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Hide scrollbar for WebKit-based browsers */
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }
      `}</style>
    </div>
  );
}
