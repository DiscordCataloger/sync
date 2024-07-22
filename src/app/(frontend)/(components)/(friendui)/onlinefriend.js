"use client";
import FriendListItem from "./friendlistitem";
import Image from "next/image";

export default function OnlineFriend() {
  const buttons = ["DM"];
  const friendArr = [
    // {
    //   icon: "/chat_bot.png",
    //   name: "Daniel",
    //   status: "Online",
    // },
    // {
    //   icon: "/chat_bot.png",
    //   name: "Daniel",
    //   status: "Online",
    // },
  ];
  return (
    <div className="flex flex-col gap-5 p-5 mt-5">
      <div className="font-bold text-xl">ONLINE FRIENDS</div>
      <div className="flex flex-col gap-3">
        {friendArr &&
          friendArr.map((friend, index) => (
            <FriendListItem
              key={index}
              icon={friend.icon}
              name={friend.name}
              status={friend.status}
              buttons={buttons}
            />
          ))}
        {friendArr.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full">
            <Image
              width={300}
              height={300}
              alt="Sync.dev friend image"
              src="/no_online_friends.png"
            />
            <div className="text-gray-400">
              HMM, looks like you're the only one here right now.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
