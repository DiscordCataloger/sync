"use client";
import FriendListItem from "./friendlistitem";

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
      </div>
    </div>
  );
}
