"use client";
import FriendListItem from "./friendlistitem";
import Image from "next/image";

export default function PendingFriends() {
  const buttons = ["Accept", "Decline", "Block"];
  const friendArr = [
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Online",
    },
    {
      icon: "/chat_bot.png",
      name: "Daniel",
      status: "Offline",
    },
  ];
  return (
    <div className="flex flex-col gap-5 p-5 mt-5 w-full">
      <div className="font-bold text-xl">PENDING FRIENDS</div>
      <div className="flex flex-col gap-3 w-full">
        {friendArr.map((friend, index) => (
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
              src="/no_pending.png"
            />
            <div className="text-gray-400">OOPS, no one finds you yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}
