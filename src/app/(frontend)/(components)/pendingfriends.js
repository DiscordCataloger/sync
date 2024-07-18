"use client";
import FriendListItem from "./friendlistitem";

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
      </div>
    </div>
  );
}
